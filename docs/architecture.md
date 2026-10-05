# English Level Quest — Architecture & Data Model

*Assessment system design for the adaptive CEFR placement test. This document defines the data model, the adaptive engine, and how the starter question bank plugs into it. It is written to be implemented as vanilla JS, single-file-friendly, consistent with the rest of the toolset.*

---

## 1. Core model

```
AGE GROUP  →  CEFR LEVEL  →  SKILL  →  TOPIC  →  QUESTION TYPE  →  QUESTION
```

- **Age group** decides *context* only (`10-12`, `13-17`, `adult`). It never changes language difficulty.
- **CEFR level** (`A1`–`C1`) decides *language difficulty* — vocabulary range, grammatical complexity, inference load.
- **Skill** decides *what ability* is measured: `vocabulary`, `grammar`, `useOfEnglish`, `realLife`, `reading`, `listening`, `speaking`.
- **Topic** and **question type** decide the *flavor* of the interaction, pulled from the age-appropriate topic list.

A B1 11-year-old and a B1 adult should show the same *linguistic* ability, on different *topics*.

---

## 2. Question object schema

### 2.1 Standard (non-speaking) questions

```js
{
  id: "teen_b1_social_004",        // unique, pattern: {age}_{cefr}_{topic}_{index}
  ageGroup: "13-17",               // "10-12" | "13-17" | "adult"
  cefr: "B1",                      // "A1" | "A2" | "B1" | "B2" | "C1"
  skill: "grammar",                // vocabulary | grammar | useOfEnglish | realLife | reading | listening | speaking
  topic: "social-media",           // free-form slug, drawn from the age-appropriate topic list
  concept: "second-conditional",   // the specific linguistic point being tested — used for teacher diagnostics
  questionType: "chat-choice",     // see §3 — reusable interaction types
  difficulty: 3,                   // 1–5 fine-grained difficulty WITHIN the cefr level (for sequencing, not leveling)
  diagnosticWeight: 0.8,           // 0–1, how much this item should influence the level estimate (see §5.3)
  prompt: "...",                   // the question text / stimulus
  passage: null,                   // reading passages / dialogues go here (null when not used)
  audioScript: null,               // text to synthesize via speechSynthesis for listening items (null otherwise)
  options: ["...", "...", "...", "..."],
  correctAnswer: 0,                // index into options
  explanation: "...",              // short teacher/student-facing explanation (UA, since students are UA-speaking)
  tags: ["conditional", "chat"]    // free tags for future filtering/search
}
```

### 2.2 Speaking questions

Speaking has no `options`/`correctAnswer` — it's evaluated against a rubric (§6), not scored right/wrong.

```js
{
  id: "adult_b2_work_002",
  ageGroup: "adult",
  cefr: "B2",
  skill: "speaking",
  topic: "work-life-balance",
  function: "express-and-defend-opinion",   // communicative function, not a grammar concept
  questionType: "voice-response",
  prompt: "Is remote work better for society?",
  followUps: [                              // the adaptive speaking ladder (§5.4)
    "Can you give an example?",
    "What would someone who disagrees with you say?"
  ],
  targetDuration: 40,                       // seconds, expected response length
  tags: ["opinion", "work"]
}
```

### 2.3 Why this shape

- `concept` / `function` is the field the **teacher report** groups by (✓ Present Simple, ✕ Second Conditional, …) — it must be filled in consistently, not left as a duplicate of `topic`.
- `diagnosticWeight` lets a few carefully chosen items (the "secret diagnostics" from §12 of the brief — e.g. *"I've seen him yesterday"*) count more toward the level estimate than an easy recognition item, without needing a separate code path.
- `difficulty` (1–5) is for **within-level sequencing** (e.g. don't open a fresh B1 probe with the hardest B1 item); it is not used for cross-level movement — that's `cefr` + evidence (§5).

---

## 3. Question types → engine behavior

Each `questionType` maps to one renderer and one scoring rule. All of these are reusable across skills/levels/ages — only the data changes.

| questionType | Renders as | Scored by |
|---|---|---|
| `picture-choice`, `picture-caption` | image/emoji + 4 options | exact match |
| `vocab-in-context`, `odd-one-out`, `collocation`, `phrasal-verb`, `missing-word` | sentence with gap/options | exact match |
| `chat-choice`, `natural-reply`, `fix-the-message` | mini chat log + options | exact match |
| `sentence-builder` | shuffled chunks → 4 pre-built orderings as options | exact match *(kept as 4-option MC for the current engine; true drag-and-drop is a later UI upgrade)* |
| `mini-reading` | short passage (`passage` field) + question | exact match |
| `listening-snapshot` | 🔊 play button (`audioScript` via `speechSynthesis`) + question | exact match |
| `tone-detector`, `formal-neutral-informal` | short stimulus + register/attitude options | exact match |
| `voice-response`, `situational-roleplay`, `story-challenge`, `opinion-challenge` | prompt + optional follow-ups | rubric (§6), not exact match |

Adding a new `questionType` later only needs: (1) a render function, (2) a line in the scoring switch. The question objects themselves don't change shape.

---

## 4. File / module plan (as built)

No build step. The source version runs directly on GitHub Pages; a pre-built single-file copy is shipped in `dist/` for when one file is more convenient.

```
index.html                 → book shell (header, two leaves, footer), loads the three scripts
css/styles.css             → three age themes, page layout, page-turn animation, print styles for the report
js/question-bank.js        → QUESTION_BANK array (pure data, no logic)
js/engine.js               → adaptive engine, estimates, speaking ladder, teacher diagnostics (no DOM; runs in Node too)
js/app.js                  → rendering, page turns, listening (speechSynthesis), speaking (MediaRecorder), results, teacher report
tools/validate-bank.js     → `node tools/validate-bank.js` — schema / uniqueness / coverage checks
tools/build-standalone.js  → `node tools/build-standalone.js` — inlines everything into dist/english-level-quest.html
```

---

## 5. Adaptive engine

### 5.0 Test plan (as built)

The book is a fixed sequence of chapters; *which* item appears on each page is decided by the engine at the moment the page opens.

| Chapter | Skill | Scored pages |
|---|---|---|
| ⚡ Quick Start | vocabulary A1 → grammar A2 → grammar B1 | 3 (seed only) |
| 🗝️ Word World | vocabulary | 4 |
| ⚗️ Grammar Lab | grammar | 4 |
| 💬 Real English | realLife | 4 |
| 📜 Read & Use | reading + useOfEnglish | 4 |
| 🎧 Listen Up | listening | 4 |
| 🎙️ Speak Up | speaking (base prompt + adaptive follow-up) | 2 (rubric, not right/wrong) |
| 🐉 Level Boss | highest-diagnosticWeight items one level above the current estimate | 2 |

= 25 scored interactions + 2 spoken answers, inside the brief's 20–30 range (≈15–20 minutes).

### 5.1 Starting point

Quick Start always runs A1 → A2 → B1. Its result seeds every skill: 3/3 correct → seed B1, 2/3 → A2, otherwise A1. Each chapter then **opens one notch below the seed** (never below A1), so every section starts comfortably and climbs from there.

### 5.2 Per-skill, independent tracking

Each skill keeps its own cursor:

```js
skillState[skill] = {
  currentLevel: "B1",
  history: [],        // [{cefr, correct, diagnosticWeight}, ...]
  stableAt: null       // set once evidence requirement (5.3) is met
}
```

Levels are **never forced to match across skills** — a learner can be Vocabulary B2 / Grammar B1 / Speaking A2+.

### 5.3 Movement: fast ramp, then evidence (as built)

With only four pages per chapter, a pure 2-of-3 window would never get a strong learner past B1, so each skill runs in two phases:

- **Ramp** (from the chapter's opening level): every correct answer moves up one level. The first mistake switches the skill to *settle*.
- **Settle**: answers at the current level are counted since arriving there. Move **up** when ≥2 are correct and correct outnumber wrong — or immediately on a correct secret-diagnostic item (`diagnosticWeight ≥ 0.8`) with no wrong answers at that level. Move **down** when ≥2 are wrong and wrong ≥ correct. Otherwise stay and pull another item at the same level, preferring a different `concept` and an unseen passage.

### 5.3b Estimating each skill

The reported level is **not** the cursor position. For each level the engine computes weighted accuracy (weight = 0.5 + `diagnosticWeight`). The estimate is the highest level with ≥ 60 % weighted accuracy, ignoring a lucky pass above a clearly failed lower level; a "+" is added when the next level up was answered with ≥ 30 %. Overall = weighted mean of all skills (speaking counts 0.6 until the teacher confirms it), rounded down to the nearest half level.

Simulation (`node` + 200 synthetic learners per true level per age group): the estimate lands within ±½ level of the true level in 92–98 % of runs.

### 5.4 Speaking ladder

Speaking doesn't pick new random items — it **deepens the same topic**:

```
prompt (base level)
 → response scored on rubric (§6)
 → weak response:   stay / simplify follow-up
 → solid response:  standard follow-up (+1 notch)
 → strong response: stretch follow-up (+2 notches)
```

`followUps` on the question object already encodes this ladder (easy → harder), so the engine just needs to pick the next entry in the array based on the previous rubric score, rather than pulling a new question object.

As built: the base prompt is chosen one notch below the learner's mean level on the other skills. After the first answer, a provisional length-based signal (words, or recording time when there is no transcript) picks the follow-up: *weak* → an easier "tell me a bit more", *solid* → the item's own follow-up, *strong* → a stretch question from the next level (brief §15). This signal is only provisional — the teacher rubric (§6) in the report overrides it.

### 5.5 Stopping condition

The chapter plan in §5.0 fixes the length (25 scored + 2 spoken). Stopping early when every skill is stable is a possible later optimisation.

---

## 6. Speaking evaluation rubric

Never score speaking as simply right/wrong. Score 0–4 on each, then average:

| Dimension | 0 | 2 | 4 |
|---|---|---|---|
| Task completion | ignores the prompt | partially answers | fully answers + develops |
| Comprehensibility | hard to follow | understandable with effort | easily understood |
| Vocabulary range/appropriacy | very limited/wrong register | adequate, some repetition | varied, precise, register-appropriate |
| Grammatical range/accuracy | frequent breakdowns | mostly accurate simple structures | accurate + varied structures |
| Coherence | disconnected | logically ordered | well-linked, signposted |

Accent/pronunciation only counts as **intelligibility**, never penalized for being non-native. Until real speech-to-text + NLP scoring is wired in, this rubric is designed to be filled in by **teacher review** in the diagnostics report (recorded response + rubric checklist) rather than auto-graded — auto speech scoring is a future upgrade, not a blocker for launch.

---

## 7. Results & teacher diagnostics

### 7.1 Student-facing result

```
Overall: B1
Vocabulary: B1+     Grammar: B1     Reading: B1+
Listening: B1       Speaking: A2+/B1     Real-Life English: B1
```

Never a single "74% → B1" number — always the per-skill breakdown plus 2–3 lines of plain-language description (what you can do at this level).

### 7.2 Teacher diagnostics

Every answered item logs its `concept`/`function` + result:

```js
{ skill: "grammar", cefr: "B1", concept: "present-perfect-vs-past-simple", result: false }
```

The report buckets concepts into three tiers per skill:

- **Strong** — correct every time it was tested (✓)
- **Developing** — mixed results (△)
- **Needs attention** — incorrect every time it was tested (✕)

This is the same shape as the brief's example and slots directly into the existing teacher-report pattern used elsewhere in your tools.

---

## 8. Topic ladder discipline

Reuse the same broad topic family across levels, increasing only the *linguistic* demand (see the brief's Travel/Technology/Education/Money ladders). The starter bank follows this directly — e.g. `technology` appears at every level for every age group, but:

- A1: "What do you use your phone for?" (concrete, present simple)
- B1: "Could you live without your phone for a week?" (conditional, opinion)
- C1: "Has society become excessively dependent on digital technology?" (abstract argumentation)

This keeps topic and difficulty cleanly separated, per the brief's critical principle (§27): **a question is not C1 because the topic sounds complicated — it's C1 because of the linguistic demands placed on the learner.**

---

## 9. Bank coverage

`js/question-bank.js` holds **571 items**:

- **469** taken from the brief itself — every concrete example question, dialogue, reading/listening sample and speaking prompt, plus the §11 topic ladder (travel / technology / education / money × 5 levels) and the §12 secret-diagnostic items. Where the brief's example was age-neutral it is reused for all three age groups; where it gave separate per-age lists (B1/B2/C1 speaking) those exact lists are used.
- **102** in a clearly marked `SUPPLEMENT` block (34 per age group). The brief gives listening examples only for A1, reading examples only for A1/B2/C1 and real-life examples only up to B1 — not enough for every chapter to adapt at every level. The supplement follows the brief's own §16 listening ladder, §17 reading ladder, the B1–C1 communicative functions, and the C1 target-vocabulary list (§10).

Per age group and level (vocabulary / grammar / real-life / reading+UoE / listening / speaking):

| Level | Vocab | Grammar | Real-life | Read & Use | Listening | Speaking |
|---|---|---|---|---|---|---|
| A1 | 10 | 10 | 8 | 3 | 3 | 12 |
| A2 | 8 | 10 | 3 | 3 | 3 | 12 |
| B1 | 8 | 11 | 4 | 3 | 3 | 9 |
| B2 | 9 | 9 | 3 | 6 | 3 | 9 |
| C1 | 6 | 5 | 3 | 3 | 3 | 8–9 |

Long-term target in the brief: A1 100+ / A2 150+ / B1 200+ / B2 200+ / C1 100+. Grow the bank by appending objects with the same shape and running `node tools/validate-bank.js`; nothing else needs to change. The thinnest cells — listening and reading at every level — are the best place to add next, because they limit variety between learners most.
