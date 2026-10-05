/* ============================================================================
   ENGLISH LEVEL QUEST — Adaptive assessment engine
   Pure logic, no DOM. Works in the browser (window.LQEngine) and in Node
   (module.exports) so it can be tested from the command line.

   Implements docs/architecture.md §5:
   - every skill is tracked independently (own level cursor + evidence)
   - each section opens easy and ramps up quickly ("ramp" phase), then, after
     the first mistake, only moves on multiple pieces of evidence ("settle")
   - secret-diagnostic items (diagnosticWeight >= 0.8) count as stronger evidence
   - the final estimate per skill comes from weighted accuracy per level,
     never from a single percentage
   ========================================================================== */
(function (root) {
  "use strict";

  const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
  const SKILLS = ["vocabulary", "grammar", "realLife", "reading", "listening", "speaking"];

  // which bank skills feed which engine skill
  const SKILL_MATCH = {
    vocabulary: ["vocabulary"],
    grammar: ["grammar"],
    realLife: ["realLife"],
    reading: ["reading", "useOfEnglish"],
    listening: ["listening"],
    speaking: ["speaking"]
  };

  const SKILL_LABELS = {
    vocabulary: "Vocabulary",
    grammar: "Grammar",
    realLife: "Real-Life English",
    reading: "Reading & Use of English",
    listening: "Listening",
    speaking: "Speaking"
  };

  // follow-up prompts that stretch a strong speaker one notch up (brief §15)
  const STRETCH_FOLLOWUPS = [
    "Why do you like it? Tell me one more thing about it.",
    "How has this changed for you over time?",
    "Do you think most people feel the same way? Why or why not?",
    "What would someone who completely disagrees with you say — and how would you answer them?",
    "Is there a hidden assumption in the question itself that you would challenge?"
  ];
  const EASY_FOLLOWUP = "Can you tell me a little more? One or two more sentences is fine.";

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function levelLabel(num) {
    if (num === null || num === undefined || isNaN(num)) return "—";
    const n = clamp(num, 0, 4);
    const base = Math.floor(n + 1e-9);
    const plus = (n - base) >= 0.5 && base < 4;
    return LEVELS[base] + (plus ? "+" : "");
  }

  function bucketSkill(bankSkill) {
    for (const s of SKILLS) if (SKILL_MATCH[s].includes(bankSkill)) return s;
    return bankSkill;
  }

  function humanize(slug) {
    if (!slug) return "";
    const s = String(slug).replace(/-/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function countWords(text) {
    if (!text) return 0;
    const m = String(text).trim().match(/[A-Za-z’'-]+/g);
    return m ? m.length : 0;
  }

  // -------------------------------------------------------------------------
  function createSession(opts) {
    const bank = opts.bank;
    const ageGroup = opts.ageGroup;
    const rng = opts.rng || Math.random;
    const pool = bank.filter(q => q.ageGroup === ageGroup);

    const used = new Set();
    const seenPassages = new Set();
    const log = [];          // scored answers
    const speakingLog = [];  // speaking responses
    const startedAt = Date.now();
    let finishedAt = null;
    let speakingOverride = null;

    const state = {};
    SKILLS.forEach(s => {
      state[s] = { level: 1, phase: "ramp", atLevel: [], floor: 0, recentConcepts: [] };
    });

    function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }

    function candidates(skill, levelIdx) {
      const lv = LEVELS[levelIdx];
      return pool.filter(q => SKILL_MATCH[skill].includes(q.skill) && q.cefr === lv && !used.has(q.id));
    }

    function rank(list, skill, firstAtLevel) {
      const recent = state[skill].recentConcepts;
      return list
        .map(q => {
          let score = rng();                                   // variety between learners
          if (recent.includes(q.concept)) score -= 2;          // don't repeat a concept back to back
          if (q.passage && seenPassages.has(q.passage)) score -= 1.5;
          if (firstAtLevel) score -= (q.difficulty || 3) * 0.35; // open a level with an easier item
          return { q, score };
        })
        .sort((a, b) => b.score - a.score)
        .map(x => x.q);
    }

    // nearest level that still has material (lower first on ties)
    function findItem(skill, levelIdx, firstAtLevel) {
      for (let d = 0; d <= 4; d++) {
        for (const L of d === 0 ? [levelIdx] : [levelIdx - d, levelIdx + d]) {
          if (L < 0 || L > 4) continue;
          const list = candidates(skill, L);
          if (list.length) return rank(list, skill, firstAtLevel && d === 0)[0];
        }
      }
      return null;
    }

    function pickItem(skill, levelIdx) {
      const st = state[skill];
      const L = levelIdx === undefined ? st.level : levelIdx;
      const item = findItem(skill, L, st.atLevel.length === 0);
      if (item) reserve(item);
      return item;
    }

    function reserve(item) {
      used.add(item.id);
      if (item.passage) seenPassages.add(item.passage);
      const s = bucketSkill(item.skill);
      if (state[s]) {
        state[s].recentConcepts.push(item.concept || item.function);
        if (state[s].recentConcepts.length > 3) state[s].recentConcepts.shift();
      }
    }

    // ---------------- Quick Start: fixed easy → harder ramp ----------------
    const QUICK_START = [
      { skill: "vocabulary", level: 0 },
      { skill: "grammar", level: 1 },
      { skill: "grammar", level: 2 }
    ];
    function pickQuickStart(i) {
      const spec = QUICK_START[i];
      return spec ? pickItem(spec.skill, spec.level) : null;
    }

    function seedFromQuickStart() {
      const qs = log.filter(e => e.section === "quickstart");
      const correct = qs.filter(e => e.correct).length;
      const seed = correct >= 3 ? 2 : correct === 2 ? 1 : 0;   // B1 / A2 / A1
      const open = Math.max(0, seed - 1);                        // every section opens a notch lower
      SKILLS.forEach(s => {
        state[s].level = open;
        state[s].phase = "ramp";
        state[s].atLevel = [];
      });
      return { correct, seed, open };
    }

    // ---------------- Recording + adaptation ----------------
    function record(item, ans) {
      const levelIdx = LEVELS.indexOf(item.cefr);
      const entry = {
        id: item.id,
        section: ans.section || null,
        skill: bucketSkill(item.skill),
        bankSkill: item.skill,
        cefr: item.cefr,
        levelIdx,
        concept: item.concept,
        questionType: item.questionType,
        weight: item.diagnosticWeight || 0.4,
        correct: !!ans.correct,
        prompt: item.prompt,
        chosen: ans.chosenText !== undefined ? ans.chosenText : null,
        correctText: item.options ? item.options[item.correctAnswer] : null,
        ms: ans.ms || null
      };
      log.push(entry);
      used.add(item.id);
      if (ans.adapt !== false) adapt(entry.skill, entry);
      return entry;
    }

    function adapt(skill, e) {
      const st = state[skill];
      if (!st) return;
      if (st.phase === "ramp") {
        if (e.correct) {
          st.floor = Math.max(st.floor, st.level);
          st.level = Math.min(4, st.level + 1);
          st.atLevel = [];
        } else {
          st.phase = "settle";
          st.atLevel = [{ correct: false, weight: e.weight }];
        }
        return;
      }
      st.atLevel.push({ correct: e.correct, weight: e.weight });
      const c = st.atLevel.filter(x => x.correct).length;
      const w = st.atLevel.length - c;
      const strongHit = e.correct && e.weight >= 0.8 && w === 0;
      if ((c >= 2 && c > w) || strongHit) {
        st.floor = Math.max(st.floor, st.level);
        st.level = Math.min(4, st.level + 1);
        st.atLevel = [];
      } else if (w >= 2 && w >= c) {
        const next = Math.max(0, st.level - 1);
        st.level = next;
        st.atLevel = [];
      }
    }

    // ---------------- Estimates ----------------
    function estimateSkill(skill) {
      const entries = log.filter(e => e.skill === skill);
      if (!entries.length) return null;
      const byL = LEVELS.map(() => ({ c: 0, t: 0, n: 0 }));
      entries.forEach(e => {
        const w = 0.5 + e.weight;
        byL[e.levelIdx].t += w;
        byL[e.levelIdx].n += 1;
        if (e.correct) byL[e.levelIdx].c += w;
      });
      const acc = L => (byL[L].n ? byL[L].c / byL[L].t : null);

      let est = -1;
      for (let L = 0; L < 5; L++) {
        const a = acc(L);
        if (a === null) continue;
        if (a >= 0.6) {
          // a lucky pass above a clearly failed lower level doesn't count
          let blocked = false;
          for (let k = 0; k < L; k++) if (byL[k].n >= 2 && acc(k) < 0.34) blocked = true;
          if (!blocked) est = L;
        }
      }
      if (est === -1) {
        const lowest = byL.findIndex(b => b.n > 0);
        return { num: Math.max(0, lowest - 1), emerging: lowest <= 0, answered: entries.length };
      }
      let num = est;
      if (est < 4 && byL[est + 1].n && acc(est + 1) >= 0.3) num += 0.5;
      return { num, emerging: false, answered: entries.length };
    }

    function speakingProvisional() {
      const done = speakingLog.filter(s => !s.skipped);
      if (!done.length) return null;
      const delta = { weak: -0.5, solid: 0, strong: 0.5 };
      const mean = done.reduce((sum, s) => sum + s.levelIdx + delta[s.heuristic], 0) / done.length;
      return { num: clamp(Math.floor(mean * 2) / 2, 0, 4), provisional: true, answered: done.length };
    }

    function estimates() {
      const skills = {};
      SKILLS.forEach(s => {
        if (s === "speaking") {
          if (speakingOverride !== null) skills.speaking = { num: speakingOverride, provisional: false, answered: speakingLog.length };
          else skills.speaking = speakingProvisional();
        } else {
          skills[s] = estimateSkill(s);
        }
      });
      let sum = 0, wsum = 0;
      SKILLS.forEach(s => {
        const e = skills[s];
        if (!e) return;
        const w = (s === "speaking" && e.provisional) ? 0.6 : 1;
        sum += e.num * w; wsum += w;
      });
      const overallNum = wsum ? Math.floor((sum / wsum) * 2 + 1e-9) / 2 : null;
      Object.keys(skills).forEach(s => { if (skills[s]) skills[s].label = levelLabel(skills[s].num); });
      return { skills, overall: { num: overallNum, label: levelLabel(overallNum) } };
    }

    function nonSpeakingMean() {
      const est = estimates().skills;
      const nums = SKILLS.filter(s => s !== "speaking" && est[s]).map(s => est[s].num);
      return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 1;
    }

    // ---------------- Speaking ladder (brief §15) ----------------
    function speakingBaseLevel() {
      return clamp(Math.round(nonSpeakingMean() - 0.75), 0, 4);
    }

    function pickSpeaking() {
      const L = speakingBaseLevel();
      state.speaking.level = L;
      return pickItem("speaking", L);
    }

    function speakingHeuristic(r, targetSec) {
      const target = targetSec || 30;
      let ratio;
      // ~1.8 words per second is a comfortable, fluent speaking pace
      if (r.words > 0) ratio = r.words / (target * 1.8);
      else ratio = (r.durationSec || 0) / target * 0.8;
      if (ratio < 0.35) return "weak";
      if (ratio < 0.75) return "solid";
      return "strong";
    }

    function followUpFor(baseItem, baseEntry) {
      const L = LEVELS.indexOf(baseItem.cefr);
      if (!baseEntry || baseEntry.skipped || baseEntry.heuristic === "weak") {
        return { prompt: EASY_FOLLOWUP, levelIdx: L, kind: "simplify" };
      }
      if (baseEntry.heuristic === "strong" && L < 4) {
        return { prompt: STRETCH_FOLLOWUPS[L + 1], levelIdx: L + 1, kind: "stretch" };
      }
      const fu = (baseItem.followUps && baseItem.followUps[0]) || STRETCH_FOLLOWUPS[L];
      return { prompt: fu, levelIdx: L, kind: "standard" };
    }

    function recordSpeaking(r) {
      const words = r.words !== undefined ? r.words : countWords(r.transcript || r.typed || "");
      const entry = {
        itemId: r.itemId,
        stage: r.stage,
        kind: r.kind || "base",
        prompt: r.prompt,
        levelIdx: r.levelIdx,
        cefr: LEVELS[r.levelIdx],
        function: r.function || null,
        transcript: r.transcript || "",
        typed: r.typed || "",
        durationSec: Math.round(r.durationSec || 0),
        targetSec: r.targetSec || 30,
        words,
        skipped: !!r.skipped,
        hasAudio: !!r.hasAudio
      };
      entry.heuristic = entry.skipped ? "weak" : speakingHeuristic(entry, entry.targetSec);
      speakingLog.push(entry);
      return entry;
    }

    function setSpeakingOverride(num) { speakingOverride = (num === null || num === "" || isNaN(num)) ? null : Number(num); }

    // ---------------- Level Boss: secret diagnostics just above the estimate ----------------
    function pickBoss(alreadyPicked) {
      const target = clamp(Math.floor(nonSpeakingMean()) + 1, 0, 4);
      const avoidConcepts = (alreadyPicked || []).map(q => q.concept);
      for (let d = 0; d <= 4; d++) {
        for (const L of d === 0 ? [target] : [target + d, target - d]) {
          if (L < 0 || L > 4) continue;
          const list = pool.filter(q => q.skill !== "speaking" && q.cefr === LEVELS[L] && !used.has(q.id) && !avoidConcepts.includes(q.concept));
          if (!list.length) continue;
          const top = Math.max(...list.map(q => q.diagnosticWeight || 0));
          const best = list.filter(q => (q.diagnosticWeight || 0) >= top - 0.05);
          const item = pick(best);
          reserve(item);
          return item;
        }
      }
      return null;
    }

    // ---------------- Teacher diagnostics (brief §24) ----------------
    function diagnostics() {
      const out = {};
      SKILLS.filter(s => s !== "speaking").forEach(s => {
        const byConcept = {};
        log.filter(e => e.skill === s).forEach(e => {
          const k = e.concept || "general";
          byConcept[k] = byConcept[k] || { concept: k, label: humanize(k), correct: 0, total: 0, levels: new Set() };
          byConcept[k].total += 1;
          if (e.correct) byConcept[k].correct += 1;
          byConcept[k].levels.add(e.cefr);
        });
        const strong = [], developing = [], needs = [];
        Object.values(byConcept).forEach(c => {
          const row = { concept: c.concept, label: c.label, correct: c.correct, total: c.total, levels: Array.from(c.levels).sort() };
          if (c.correct === c.total) strong.push(row);
          else if (c.correct === 0) needs.push(row);
          else developing.push(row);
        });
        out[s] = { strong, developing, needs };
      });
      const sp = { strong: [], developing: [], needs: [] };
      speakingLog.forEach(r => {
        const row = { concept: r.function || r.kind, label: humanize(r.function || r.kind) + " (" + r.cefr + ")", heuristic: r.heuristic };
        if (r.skipped || r.heuristic === "weak") sp.needs.push(row);
        else if (r.heuristic === "strong") sp.strong.push(row);
        else sp.developing.push(row);
      });
      out.speaking = sp;
      return out;
    }

    function finish() { finishedAt = Date.now(); }

    function exportData(meta) {
      const est = estimates();
      return {
        app: "English Level Quest",
        version: 1,
        student: Object.assign({ ageGroup }, meta || {}),
        startedAt: new Date(startedAt).toISOString(),
        finishedAt: new Date(finishedAt || Date.now()).toISOString(),
        durationMin: Math.round(((finishedAt || Date.now()) - startedAt) / 60000),
        overall: est.overall.label,
        skills: Object.fromEntries(SKILLS.map(s => [s, est.skills[s] ? est.skills[s].label : null])),
        speakingConfirmedByTeacher: speakingOverride !== null,
        diagnostics: JSON.parse(JSON.stringify(diagnostics())),
        answers: log,
        speaking: speakingLog
      };
    }

    return {
      ageGroup, pool, log, speakingLog, state,
      pickItem, pickQuickStart, seedFromQuickStart, record,
      pickSpeaking, followUpFor, recordSpeaking, setSpeakingOverride,
      pickBoss, estimates, diagnostics, finish, exportData,
      get startedAt() { return startedAt; },
      get finishedAt() { return finishedAt; },
      get speakingOverride() { return speakingOverride; }
    };
  }

  const API = { LEVELS, SKILLS, SKILL_LABELS, createSession, levelLabel, humanize, countWords, bucketSkill };
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  else root.LQEngine = API;
})(typeof window !== "undefined" ? window : this);
