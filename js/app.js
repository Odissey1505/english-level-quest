/* ============================================================================
   ENGLISH LEVEL QUEST — app (UI, rendering, page turns, speaking, report)
   Depends on: js/question-bank.js (QUESTION_BANK), js/engine.js (LQEngine)
   ========================================================================== */
(function () {
  "use strict";

  const E = window.LQEngine;
  const BANK = (typeof QUESTION_BANK !== "undefined") ? QUESTION_BANK : [];
  const LEVELS = E.LEVELS;

  // ---------------------------------------------------------------- helpers
  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const pickOne = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const gapify = html => html.replace(/_{3,}/g, '<span class="gap" aria-label="blank"></span>');
  const fmtTime = s => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  const slug = s => String(s || "student").toLowerCase().replace(/[^a-z0-9а-яіїєґ]+/gi, "-").replace(/^-|-$/g, "") || "student";

  // ---------------------------------------------------------------- content
  const AGES = {
    "10-12": { theme: "kid",   title: "Young Explorer", ua: "10–12 років", icon: "🦊", blurb: "Adventure with Lex the fox", emblem: "🦊" },
    "13-17": { theme: "teen",  title: "Challenger",     ua: "13–17 років", icon: "⚡", blurb: "Comic-style missions",        emblem: "⚡" },
    "adult": { theme: "adult", title: "Traveller",      ua: "Дорослі",     icon: "🧭", blurb: "Calm, practical, real-life",  emblem: "🧭" }
  };

  const CHAPTERS = [
    { id: "quickstart", icon: "⚡", title: "Quick Start",  ua: "Швидкий старт",        n: 3, en: "3 quick warm-up tasks",                              uaDesc: "3 швидкі завдання для розминки" },
    { id: "vocabulary", icon: "🗝️", title: "Word World",   ua: "Світ слів",            n: 4, en: "Words in context, collocations and odd ones out",     uaDesc: "Слова в контексті, сполучення, «зайве слово»" },
    { id: "grammar",    icon: "⚗️", title: "Grammar Lab",  ua: "Граматична лабораторія", n: 4, en: "Choose, fix and build sentences",                 uaDesc: "Обирай, виправляй і будуй речення" },
    { id: "realLife",   icon: "💬", title: "Real English", ua: "Англійська в житті",   n: 4, en: "Chats and everyday situations",                      uaDesc: "Чати та життєві ситуації" },
    { id: "reading",    icon: "📜", title: "Read & Use",   ua: "Читаємо й застосовуємо", n: 4, en: "Short messages, notices, reviews and posts",       uaDesc: "Короткі повідомлення, оголошення, відгуки" },
    { id: "listening",  icon: "🎧", title: "Listen Up",    ua: "Слухаємо",             n: 4, en: "Short recordings — you can play each one twice",     uaDesc: "Короткі записи — кожен можна прослухати двічі" },
    { id: "speaking",   icon: "🎙️", title: "Speak Up",     ua: "Говоримо",             n: 2, en: "Answer two questions out loud (or type)",            uaDesc: "Дай усну відповідь на два запитання (або напиши)" },
    { id: "boss",       icon: "🐉", title: "Level Boss",   ua: "Фінальний бос",        n: 2, en: "Two tricky challenges to confirm your level",        uaDesc: "Два складні завдання, щоб підтвердити рівень" }
  ];
  const BOSS_ICON = { default: "🐉", kid: "🐉", teen: "⚔️", adult: "🏆" };

  const LEX = {
    quickstart: "Hi, I'm Lex! Let's warm up with three quick tasks.",
    vocabulary: "Words are keys. Let's see how many doors you can open!",
    grammar: "Experiment time! Mix the right words together.",
    realLife: "Imagine you're really there. What would you say?",
    reading: "Short texts, big clues. Read like a detective!",
    listening: "Ears ready? You can listen twice.",
    speaking: "Your turn to talk! Say as much as you can.",
    boss: "The Level Boss! Two tricky challenges — you can do it!"
  };
  const TEEN_CAPTION = {
    quickstart: "Warm-up. Three quick ones.",
    vocabulary: "Words in the wild. Context is everything.",
    grammar: "Break it. Fix it. Build it.",
    realLife: "Real chats. Pick what you'd actually say.",
    reading: "Posts, reviews, notices — read between the lines.",
    listening: "Headphones on. Two plays max.",
    speaking: "Mic check. Say what you really think.",
    boss: "Final boss. Two hard ones. No pressure."
  };

  const SKILL_UI = {
    vocabulary: { icon: "🗝️", name: "Word World" },
    grammar: { icon: "⚗️", name: "Grammar Lab" },
    realLife: { icon: "💬", name: "Real English" },
    reading: { icon: "📜", name: "Read & Use" },
    listening: { icon: "🎧", name: "Listen Up" },
    speaking: { icon: "🎙️", name: "Speak Up" }
  };

  const HINTS = {
    "missing-word": ["Choose the word that fits.", "Обери слово, яке підходить."],
    "vocab-in-context": ["Choose the best answer.", "Обери найкращу відповідь."],
    "odd-one-out": ["Look carefully at all four.", "Уважно подивись на всі чотири."],
    "collocation": ["Which words go together?", "Які слова поєднуються?"],
    "picture-choice": ["Look and choose.", "Подивись і обери."],
    "fix-the-message": ["Which version is correct?", "Який варіант правильний?"],
    "sentence-builder": ["Which order is correct?", "Який порядок правильний?"],
    "finish-the-chat": ["Complete the conversation.", "Заверши розмову."],
    "natural-reply": ["Choose the most natural reply.", "Обери найприроднішу відповідь."],
    "choose-natural-reply": ["Choose the most natural reply.", "Обери найприроднішу відповідь."],
    "mini-reading": ["Read and answer.", "Прочитай і дай відповідь."],
    "listening-snapshot": ["Listen and answer. You can play it twice.", "Послухай і дай відповідь. Можна двічі."],
    "tone-detector": ["What does the speaker really mean?", "Що мовець має на увазі насправді?"],
    "formal-neutral-informal": ["Think about the situation.", "Подумай про ситуацію."],
    "meaning-from-context": ["Use the context.", "Використай контекст."]
  };

  const TOPIC_EMOJI = {
    family: "👨‍👩‍👧", friends: "🤝", friendships: "🤝", school: "🏫", education: "🎓", food: "🍽️", restaurants: "🍽️",
    travel: "✈️", holidays: "🏖️", shopping: "🛍️", money: "💰", health: "🩺", weather: "🌦️", home: "🏠", sports: "⚽",
    hobbies: "🎨", technology: "📱", "social-media": "📲", media: "📰", career: "💼", emotions: "💭", "basic-feelings": "💭",
    animals: "🐾", city: "🏙️", transport: "🚌", "daily-routine": "⏰", "personal-information": "🪪", films: "🎬", music: "🎵",
    environment: "🌍", society: "🏛️", ethics: "⚖️", communication: "💬", privacy: "🔒", consumerism: "🛒", decisions: "🧭",
    relationships: "💞", psychology: "🧠", innovation: "💡", "personal-goals": "🎯", childhood: "🧸", entertainment: "🎮",
    "personal-responsibility": "🤲", appearance: "🪞", personality: "🙂", plans: "🗓️", weekends: "🗓️", debate: "🗣️",
    science: "🔬", "daily-life": "☕", "work-life-balance": "⚖️"
  };

  const CANDO = {
    A1: ["Introduce yourself and talk about your family", "Understand simple everyday words and phrases", "Ask and answer very simple questions"],
    A2: ["Talk about your day, plans and past events", "Handle shopping, travel and ordering food", "Understand short, simple messages and notices"],
    B1: ["Explain experiences and give reasons for opinions", "Understand the main points of clear texts and talk", "Deal with most everyday situations on your own"],
    B2: ["Argue a point and support it with examples", "Understand attitude and implied meaning", "Speak naturally on a wide range of topics"],
    C1: ["Express complex ideas precisely and flexibly", "Notice nuance, register, irony and bias", "Build clear, well-structured arguments"]
  };
  const LEVEL_UA = {
    A1: "Розумієш і використовуєш прості знайомі фрази: про себе, родину, щоденні речі.",
    A2: "Спілкуєшся в простих повсякденних ситуаціях: покупки, подорожі, плани, минулі події.",
    B1: "Можеш самостійно розповісти про досвід, висловити й обґрунтувати думку на знайомі теми.",
    B2: "Вільно аргументуєш, розумієш підтекст і ставлення автора, говориш природно на широке коло тем.",
    C1: "Гнучко й точно висловлюєш складні ідеї, відчуваєш нюанси, регістр та іронію."
  };
  const GROUPS = { A1: "Beginner – Elementary", A2: "Elementary – Pre-Intermediate", B1: "Intermediate", B2: "Upper-Intermediate", C1: "Advanced" };

  const PRAISE = {
    kid: ["Brilliant! ✨", "You got it! 🎉", "Super! ⭐", "Lex is impressed! 🦊"],
    teen: ["Correct.", "Nailed it.", "Yes — that's it."],
    adult: ["Correct.", "Well done.", "That's right."]
  };
  const MISS = { kid: "Nice try!", teen: "Not this one.", adult: "Not quite." };

  // ---------------------------------------------------------------- state
  const app = {
    name: "",
    age: null,
    S: null,              // engine session
    plan: [],
    pages: [],
    spreadStart: 0,
    mode: "double",
    turning: false,
    rubric: {},           // teacher rubric per speaking entry index
    audio: {},            // speaking entry index -> {url, mime}
    resultsDirty: false
  };

  function theme() { return app.age ? AGES[app.age].theme : "default"; }
  function computeMode() {
    const w = window.innerWidth, h = window.innerHeight;
    return (w >= 860 && w / h >= 1.05) ? "double" : "single";
  }
  function per() { return app.mode === "double" ? 2 : 1; }
  function chapterIcon(ch) { return ch.id === "boss" ? (BOSS_ICON[theme()] || "🐉") : ch.icon; }

  function buildPlan() {
    const p = [{ kind: "cover" }, { kind: "form" }, { kind: "howto" }];
    CHAPTERS.forEach((ch, ci) => {
      p.push({ kind: "opener", chapter: ci });
      for (let i = 0; i < ch.n; i++) p.push({ kind: ch.id === "speaking" ? "speak" : "task", chapter: ci, idx: i });
    });
    p.push({ kind: "passport" }, { kind: "summary" });
    return p;
  }

  // ---------------------------------------------------------------- materialise pages lazily
  // Tasks are chosen only when their page is about to appear, so every page
  // benefits from all answers given before it (that's what makes it adaptive).
  function ensure(i) {
    if (i < 0 || i >= app.plan.length) return null;
    if (app.pages[i]) return app.pages[i];
    let d = app.plan[i];

    // keep the passport on a left page in two-page mode
    if (d.kind === "passport" && app.mode === "double" && i === app.spreadStart + 1) {
      app.plan.splice(i, 0, { kind: "filler" });
      d = app.plan[i];
    }

    const page = { i, d, done: false };
    const S = app.S;
    if (["cover", "howto", "opener", "filler", "summary"].includes(d.kind)) page.done = true;
    if (d.kind === "form") page.done = formValid();
    if (d.kind === "passport") {
      page.done = true;
      if (S && !S.finishedAt) { S.finish(); stopMic(); }
    }

    if ((d.kind === "task" || d.kind === "speak") && !S) { page.d = { kind: "filler", chapter: d.chapter }; page.done = true; }

    if (d.kind === "task" && S) {
      const ch = CHAPTERS[d.chapter];
      let item = null;
      if (ch.id === "quickstart") item = S.pickQuickStart(d.idx);
      else if (ch.id === "boss") {
        const prev = app.pages.filter(p => p && p.d.kind === "task" && CHAPTERS[p.d.chapter].id === "boss" && p.item).map(p => p.item);
        item = S.pickBoss(prev);
      } else item = S.pickItem(ch.id);
      if (!item) { page.d = { kind: "filler", chapter: d.chapter }; page.done = true; }
      else {
        page.item = item;
        page.order = shuffle(item.options.map((_, k) => k));
        page.plays = 0;
        page.noAudio = item.skill === "listening" && !("speechSynthesis" in window);
      }
    }

    if (d.kind === "speak" && S) {
      if (d.idx === 0) {
        const item = S.pickSpeaking();
        if (!item) { page.d = { kind: "filler", chapter: d.chapter }; page.done = true; }
        else Object.assign(page, { item, prompt: item.prompt, levelIdx: LEVELS.indexOf(item.cefr), target: item.targetDuration || 30, stage: "base", kind: "base" });
      } else {
        const base = app.pages.find(p => p && p.d.kind === "speak" && p.d.idx === 0);
        if (!base || !base.item) { page.d = { kind: "filler", chapter: d.chapter }; page.done = true; }
        else {
          const fu = S.followUpFor(base.item, base.entry);
          Object.assign(page, { item: base.item, prompt: fu.prompt, levelIdx: fu.levelIdx, target: base.item.targetDuration || 30, stage: "follow", kind: fu.kind, basePrompt: base.prompt });
        }
      }
      page.sp = { mode: "idle", transcript: "", interim: "", typed: "", durationSec: 0, rerecords: 0 };
    }

    app.pages[i] = page;
    return page;
  }

  function formValid() { return app.name.trim().length > 0 && !!app.age; }

  // ---------------------------------------------------------------- page HTML
  function pageHTML(page) {
    if (!page) return placeholderHTML();
    switch (page.d.kind) {
      case "cover": return coverHTML();
      case "form": return formHTML();
      case "howto": return howtoHTML();
      case "opener": return openerHTML(page);
      case "task": return taskHTML(page);
      case "speak": return speakHTML(page);
      case "filler": return fillerHTML();
      case "passport": return passportHTML();
      case "summary": return summaryHTML();
    }
    return "";
  }

  function placeholderHTML() {
    return `<div class="pg pg-center"><div class="pg-body pg-center placeholder">
      <div class="orn">✦ ✦ ✦</div>
      <div>Your next challenge appears here</div>
      <div class="ua">Спершу дай відповідь на лівій сторінці</div>
    </div></div>`;
  }

  function coverHTML() {
    const em = app.age ? AGES[app.age].emblem : "📖";
    return `<div class="pg pg-center"><div class="pg-body pg-center">
      <div class="eyebrow">An interactive English placement book</div>
      <div class="cover-emblem" aria-hidden="true">${em}</div>
      <h1 class="cover-title">English Level Quest</h1>
      <div class="cover-sub">Discover your English level — one page at a time.</div>
      <div class="ua">Дізнайся свій рівень англійської — сторінка за сторінкою.</div>
      <div class="cover-stars" aria-hidden="true"><span>✦</span><span>★</span><span>✦</span></div>
      <div class="cover-meta"><span>A1 → C1</span><span>⏱ 15–20 min</span><span>7 chapters + boss</span></div>
    </div></div>`;
  }

  function formHTML() {
    const cards = Object.entries(AGES).map(([key, a]) => `
      <button type="button" class="age-card ${app.age === key ? "selected" : ""}" data-action="age" data-age="${key}" aria-pressed="${app.age === key}">
        <span class="age-ico" aria-hidden="true">${a.icon}</span>
        <span><b>${key === "adult" ? "Adult" : key.replace("-", "–")} · ${a.title}</b><small>${a.ua} · ${a.blurb}</small></span>
      </button>`).join("");
    return `<div class="pg"><div class="pg-body">
      <div><div class="eyebrow">Before we start</div><h2>Who is reading this book?</h2><div class="ua">Хто проходить квест?</div></div>
      <label class="field"><span style="display:block;font-weight:800;margin-bottom:.35em">Your name <span class="ua">· Ім'я</span></span>
        <input class="text-input" data-field="name" maxlength="40" autocomplete="off" placeholder="e.g. Sofia" value="${esc(app.name)}"></label>
      <div class="field"><label>Choose your track <span class="ua">· Обери вікову групу</span></label><div class="age-cards">${cards}</div></div>
      <div class="form-note">🎙️ Speak Up uses your microphone — or you can type. Nothing is uploaded: results stay on this device.<br><span class="ua">Відповіді нікуди не надсилаються — усе залишається на цьому пристрої.</span></div>
    </div></div>`;
  }

  function howtoHTML() {
    const rows = [
      ["📖", "One task per page. Answer, then turn the page.", "Одне завдання на сторінці. Відповідай і гортай далі."],
      ["🧭", "The book adapts to you — tasks get easier or harder. It's normal if some feel difficult.", "Книжка підлаштовується під тебе — складні завдання є нормою."],
      ["🎧", "Listening: you can play each recording twice.", "Аудіо можна прослухати двічі."],
      ["🎙️", "Speaking: record your answer or type it. Your teacher will listen.", "Говоріння: запиши відповідь або напиши її."],
      ["⏱️", "About 15–20 minutes. No timer on tasks.", "Приблизно 15–20 хвилин, без таймера."],
      ["🏅", "At the end you get your English Level Passport.", "У кінці — твій паспорт рівня англійської."]
    ].map(r => `<li><span class="ico" aria-hidden="true">${r[0]}</span><span>${esc(r[1])}<small>${esc(r[2])}</small></span></li>`).join("");
    return `<div class="pg"><div class="pg-body">
      <div><div class="eyebrow">How it works</div><h2>How the quest works</h2><div class="ua">Як проходить квест</div></div>
      <ul class="howto-list">${rows}</ul>
    </div></div>`;
  }

  function openerHTML(page) {
    const ch = CHAPTERS[page.d.chapter];
    const t = theme();
    let voice = "";
    if (t === "kid") voice = `<div class="mascot"><span class="face" aria-hidden="true">🦊</span><div class="bubble them"><span class="who">Lex</span>${esc(LEX[ch.id])}</div></div>`;
    else if (t === "teen") voice = `<div class="bubble them big" style="align-self:center;text-align:center">${esc(TEEN_CAPTION[ch.id])}</div>`;
    return `<div class="pg pg-center"><div class="pg-body pg-center">
      <div class="eyebrow">Chapter ${page.d.chapter + 1} of ${CHAPTERS.length}</div>
      <div class="opener-ico" aria-hidden="true">${chapterIcon(ch)}</div>
      <h2 class="opener-title">${esc(ch.title)}</h2>
      <div class="ua">${esc(ch.ua)}</div>
      <ul class="opener-list"><li>${esc(ch.en)}</li><li class="ua">${esc(ch.uaDesc)}</li></ul>
      ${voice}
    </div></div>`;
  }

  function fillerHTML() {
    return `<div class="pg pg-center"><div class="pg-body pg-center">
      <div class="cover-emblem" aria-hidden="true">${theme() === "kid" ? "🦊" : "✦"}</div>
      <h2>Quest complete!</h2>
      <div class="ua">Квест завершено!</div>
      <p>Turn the page to open your Level Passport.</p>
    </div></div>`;
  }

  // ---- task stimulus parsing -------------------------------------------------
  function parseChat(text) {
    const bubbles = [], rest = [];
    String(text).split("\n").forEach(line => {
      const l = line.trim();
      if (!l) return;
      let m = l.match(/^([A-Z][A-Za-z ]{0,24}):\s*"?(.*?)"?\s*$/);
      if (m && !/^(Fix|Build|Finish|Rewrite)/.test(m[1])) { bubbles.push({ who: m[1], text: m[2] }); return; }
      m = l.match(/^"(.+)"$/);
      if (m) { bubbles.push({ who: "", text: m[1] }); return; }
      rest.push(l);
    });
    return { bubbles, rest: rest.join(" ") };
  }

  function chatHTML(bubbles) {
    return `<div class="chat">${bubbles.map(b => {
      const me = b.who === "B";
      const who = (b.who && b.who !== "A" && b.who !== "B") ? `<span class="who">${esc(b.who)}</span>` : "";
      return `<div class="bubble ${me ? "me" : "them"}">${who}${gapify(esc(b.text))}</div>`;
    }).join("")}</div>`;
  }

  function stimulusHTML(page) {
    const it = page.item, p = it.prompt || "", t = it.questionType;
    let m;
    const emoji = TOPIC_EMOJI[it.topic];

    if (t === "mini-reading" || (it.passage && t !== "listening-snapshot")) {
      const notice = /^[A-Z][A-Z ]{3,}/.test(it.passage || "");
      return `<div class="passage ${notice ? "notice" : ""}">${gapify(esc(it.passage || ""))}</div><div class="q-text">${gapify(esc(p))}</div>`;
    }
    if (t === "listening-snapshot") {
      const left = Math.max(0, 2 - page.plays);
      const audio = page.noAudio
        ? `<div class="passage">${esc(it.audioScript)}</div><div class="q-hint">Audio isn't available in this browser — read the text instead.</div>`
        : `<div class="audio-panel ${page.playing ? "playing-wave" : ""}">
            <button class="play-btn ${page.playing ? "playing" : ""}" data-action="play" ${left === 0 || page.playing ? "disabled" : ""} aria-label="Play recording">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
            <div class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
            <div class="plays-left">${page.plays === 0 ? "Press play to listen" : left > 0 ? `${left} play left` : "No plays left"}</div>
          </div>`;
      const reveal = page.done && !page.noAudio ? `<div class="transcript-reveal">“${esc(it.audioScript)}”</div>` : "";
      return `${audio}<div class="q-text">${esc(p)}</div>${reveal}`;
    }
    if ((m = p.match(/^Fix:\s*"(.*)"$/))) {
      return `<div class="sentence-card error"><span class="from">Message</span>${esc(m[1])}</div><div class="q-text">Which version is correct?</div>`;
    }
    if ((m = p.match(/^Build:\s*"(.*)"$/))) {
      const chips = m[1].split("/").map(w => `<span class="chip-word">${esc(w.trim())}</span>`).join("");
      return `<div class="chips">${chips}</div><div class="q-text">Which order is correct?</div>`;
    }
    if ((m = p.match(/^(Rewrite[^:]*):\s*"(.*)"$/))) {
      return `<div class="sentence-card"><span class="from">${esc(m[1])}</span>${esc(m[2])}</div><div class="q-text">Choose the best version.</div>`;
    }
    if ((m = p.match(/^Finish:\s*"(.*)"$/))) {
      return `<div class="sentence-card">${gapify(esc(m[1]))}</div><div class="q-text">How does it continue?</div>`;
    }
    if (["natural-reply", "choose-natural-reply", "finish-the-chat", "chat-choice"].includes(t)) {
      const c = parseChat(p);
      if (c.bubbles.length) {
        return `${chatHTML(c.bubbles)}<div class="q-text">${gapify(esc(c.rest || (t === "finish-the-chat" ? "Complete the chat." : "What's the most natural reply?")))}</div>`;
      }
    }
    if (t === "tone-detector" && (m = p.match(/^"([^"]+)"\s*([\s\S]+)$/))) {
      return `${chatHTML([{ who: "", text: m[1] }])}<div class="q-text">${esc(m[2])}</div>`;
    }
    if (t === "picture-choice") {
      const em = (p.match(/^(\p{Extended_Pictographic}(?:‍\p{Extended_Pictographic}|️|\p{Emoji_Modifier})*)\s*/u) || [])[1];
      const rest = em ? p.slice(p.indexOf(em) + em.length).trim() : p;
      const optHasEmoji = it.options.some(o => em && o.startsWith(em));
      return `${em && !optHasEmoji ? `<div class="illus" style="font-size:4.4em">${em}</div>` : ""}<div class="q-text">${esc(rest)}</div>`;
    }
    if (p.includes("→")) {
      const [a, b] = p.split("→");
      return `<div class="sentence-card"><span class="from">${esc(a.trim())}</span>${gapify(esc(b.trim()))}</div>`;
    }
    if (/^"/.test(p) && /_{3,}/.test(p)) {
      return `${emoji ? `<div class="illus">${emoji}</div>` : ""}<div class="sentence-card">${gapify(esc(p))}</div>`;
    }
    return `${emoji ? `<div class="illus">${emoji}</div>` : ""}<div class="q-text">${gapify(esc(p))}</div>`;
  }

  function taskHTML(page) {
    const it = page.item;
    const ch = CHAPTERS[page.d.chapter];
    const sk = E.bucketSkill(it.skill);
    const ui = SKILL_UI[sk] || { icon: "✦", name: sk };
    // patterns whose stimulus already carries its own instruction don't need a second hint
    const selfExplained = /^(Fix|Build|Finish|Rewrite)/.test(it.prompt || "");
    const hint = selfExplained ? null : HINTS[it.questionType];
    const longOpts = it.options.some(o => o.length > 32);
    const locked = it.skill === "listening" && !page.noAudio && page.plays === 0;

    const opts = page.order.map((orig, k) => {
      let cls = "opt-btn";
      if (page.done) {
        if (orig === it.correctAnswer) cls += " is-correct";
        else if (k === page.chosenK) cls += " is-wrong";
        else cls += " dim";
      }
      return `<button type="button" class="${cls}" data-action="answer" data-k="${k}" ${page.done || locked ? "disabled" : ""}>
        <span class="letter">${"ABCD"[k]}</span><span>${esc(it.options[orig])}</span></button>`;
    }).join("");

    let fb = `<div class="feedback"></div>`;
    if (page.done) {
      const t = theme() === "default" ? "kid" : theme();
      if (page.correct) {
        fb = `<div class="feedback show good"><span class="fb-icon">✓</span><span><b>${esc(page.praise)}</b>${esc(it.explanation || "")}</span></div>`;
      } else {
        fb = `<div class="feedback show bad"><span class="fb-icon">✗</span><span><b>${esc(MISS[t])} Answer: ${esc(it.options[it.correctAnswer])}</b>${esc(it.explanation || "")}</span></div>`;
      }
    }

    const label = ch.id === "boss" ? `${chapterIcon(ch)} Boss challenge` : ch.id === "quickstart" ? "⚡ Quick Start" : esc(ch.title);
    return `<div class="pg">
      <div class="pg-top"><span class="skill-badge">${ui.icon} ${esc(ui.name)}</span><span class="q-type">${label}</span></div>
      <div class="pg-body">
        ${stimulusHTML(page)}
        ${hint ? `<div class="q-hint">${esc(hint[0])} <span class="ua">· ${esc(hint[1])}</span></div>` : ""}
      </div>
      <div class="options ${longOpts ? "one-col" : ""}">${opts}</div>
      ${fb}
    </div>`;
  }

  // ---- speaking ----------------------------------------------------------------
  const MIC_OK = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  function speakHTML(page) {
    const sp = page.sp;
    const avatar = theme() === "kid" ? "🦊" : "🎙️";
    const stageLbl = page.stage === "base" ? "Question 1 of 2" : "Follow-up · 2 of 2";
    const maxSec = recLimit(page);
    const R = 44, C = 2 * Math.PI * R;
    const prog = sp.mode === "recording" ? clamp(sp.elapsed / page.target, 0, 1) : 0;

    let area = "";
    if (sp.mode === "idle") {
      area = `<button type="button" class="rec-btn" data-action="rec-start" aria-label="Start recording">
          <svg viewBox="0 0 100 100" aria-hidden="true"><circle class="ring-bg" cx="50" cy="50" r="${R}"/></svg><span class="core"></span></button>
        <div class="rec-hint">Tap to record · aim for about ${page.target} seconds<br><span class="ua">Натисни, щоб записати відповідь</span></div>
        ${sp.error ? `<div class="rec-hint" style="color:var(--bad)">${esc(sp.error)}</div>` : ""}`;
    } else if (sp.mode === "recording") {
      area = `<button type="button" class="rec-btn recording" data-action="rec-stop" aria-label="Stop recording">
          <svg viewBox="0 0 100 100" aria-hidden="true"><circle class="ring-bg" cx="50" cy="50" r="${R}"/>
          <circle class="ring-fg" cx="50" cy="50" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - prog)).toFixed(1)}"/></svg><span class="core"></span></button>
        <div class="rec-time">${fmtTime(sp.elapsed || 0)} <span class="ua">/ ~${fmtTime(page.target)} · max ${fmtTime(maxSec)}</span></div>
        ${SR ? `<div class="live-transcript">${esc(sp.transcript)} <span class="interim">${esc(sp.interim)}</span></div>` : `<div class="rec-hint">Recording… tap the square to stop.</div>`}`;
    } else if (sp.mode === "recorded") {
      const a = app.audioTemp && app.audioTemp[page.i];
      area = `${a ? `<audio controls src="${a.url}"></audio>` : ""}
        ${sp.transcript ? `<div class="live-transcript">${esc(sp.transcript)}</div>` : ""}
        <div class="rec-hint">${fmtTime(sp.durationSec)} recorded. Happy with it?</div>
        <div class="speak-row">
          ${sp.rerecords < 1 ? `<button type="button" class="mini-btn" data-action="rec-again">↺ Record again</button>` : ""}
          <button type="button" class="mini-btn primary" data-action="speak-done">Done ✓</button></div>`;
    } else if (sp.mode === "typing") {
      area = `<textarea class="typed-answer" data-field="typed" placeholder="Write your answer in English…" aria-label="Your answer">${esc(sp.typed)}</textarea>
        <div class="speak-row"><button type="button" class="mini-btn primary" data-action="speak-done" ${sp.typed.trim() ? "" : "disabled"}>Done ✓</button></div>`;
    } else if (sp.mode === "done") {
      const a = app.audioTemp && app.audioTemp[page.i];
      area = `<div class="saved-note">✓ ${sp.skipped ? "Skipped" : "Saved for your teacher"}</div>
        ${a ? `<audio controls src="${a.url}"></audio>` : ""}
        ${sp.typed ? `<div class="live-transcript">${esc(sp.typed)}</div>` : ""}`;
    }

    let alt = "";
    if (sp.mode === "idle") alt = `<div class="speak-row"><button type="button" class="mini-btn link" data-action="speak-type">⌨ Type instead</button><button type="button" class="mini-btn link" data-action="speak-skip">Skip</button></div>`;
    if (sp.mode === "typing") alt = `<div class="speak-row">${MIC_OK ? `<button type="button" class="mini-btn link" data-action="speak-mic">🎙 Record instead</button>` : ""}<button type="button" class="mini-btn link" data-action="speak-skip">Skip</button></div>`;

    return `<div class="pg">
      <div class="pg-top"><span class="skill-badge">🎙️ Speak Up</span><span class="q-type">${stageLbl}</span></div>
      <div class="pg-body">
        ${page.basePrompt ? `<div class="q-hint">About: ${esc(page.basePrompt)}</div>` : ""}
        <div class="interviewer"><span class="avatar" aria-hidden="true">${avatar}</span><div class="bubble them big">${esc(page.prompt)}</div></div>
        <div class="rec-area">${area}</div>
      </div>
      ${alt}
    </div>`;
  }

  // ---- results -----------------------------------------------------------------
  function passportHTML() {
    const S = app.S;
    const est = S.estimates();
    const lbl = est.overall.label;
    const base = lbl.replace("+", "");
    const a = AGES[app.age];
    const stamp = { kid: "🦊", teen: "⚡", adult: "🎓" }[a.theme];
    const mins = Math.max(1, Math.round(((S.finishedAt || Date.now()) - S.startedAt) / 60000));
    return `<div class="pg"><div class="pg-body">
      <div class="eyebrow">English Level Passport</div>
      <div class="passport">
        <div class="passport-head"><span class="passport-stamp" aria-hidden="true">${stamp}</span>
          <div><div class="passport-name">${esc(app.name)}</div><div class="ua">${esc(a.title)} · ${new Date().toLocaleDateString()}</div></div></div>
        <div class="level-big">${esc(lbl)} <small>${esc(GROUPS[base] || "")}</small></div>
        <p>${lbl.includes("+") ? "Strong " + base + " — moving towards the next level." : "You can:"}</p>
        <ul class="cando">${(CANDO[base] || []).map(c => `<li>${esc(c)}</li>`).join("")}</ul>
        <p class="ua">${esc(LEVEL_UA[base] || "")}</p>
      </div>
      <div class="q-hint">⏱ ${mins} min · ${S.log.length} challenges · ${S.speakingLog.filter(s => !s.skipped).length} spoken answers</div>
    </div></div>`;
  }

  function summaryHTML() {
    const S = app.S;
    const est = S.estimates();
    const rows = E.SKILLS.map(s => {
      const e = est.skills[s];
      const num = e ? e.num : null;
      const cells = [0, 1, 2, 3, 4].map(L => {
        let c = "";
        if (num !== null) {
          const base = Math.floor(num), plus = num - base >= 0.5;
          if (L <= base) c = "full";
          else if (L === base + 1 && plus) c = "half";
        }
        return `<span class="${c}"></span>`;
      }).join("");
      const note = s === "speaking" && e ? (e.provisional ? "provisional" : "teacher") : (!e ? "not tested" : "");
      return `<div class="skill-row"><span class="lbl">${SKILL_UI[s].icon} ${esc(E.SKILL_LABELS[s].replace(" & Use of English", " & Use"))}</span>
        <div class="ladder" aria-label="${esc(E.SKILL_LABELS[s])}: ${e ? e.label : "not tested"}">${cells}</div>
        <span class="val">${e ? esc(e.label) : "—"}${note ? `<small>${note}</small>` : ""}</span></div>`;
    }).join("");

    const tested = E.SKILLS.filter(s => est.skills[s]);
    const best = tested.slice().sort((a, b) => est.skills[b].num - est.skills[a].num)[0];
    const low = tested.slice().sort((a, b) => est.skills[a].num - est.skills[b].num)[0];
    const base = est.overall.label.replace("+", "");
    const reco = `⭐ Strongest: <b>${esc(E.SKILL_LABELS[best])}</b> (${est.skills[best].label}). 🎯 Next quest: <b>${esc(E.SKILL_LABELS[low])}</b> (${est.skills[low].label}).<br>
      Recommended group: <b>${esc(GROUPS[base])}</b>${est.overall.label.includes("+") ? " — upper end, ready to move up soon." : "."}`;

    return `<div class="pg"><div class="pg-body">
      <div><div class="eyebrow">Your skills today</div><h2>How your English looks</h2><div class="ua">Твої навички — кожна окремо</div></div>
      <div class="ladder-scale"><span></span><div class="marks"><span>A1</span><span>A2</span><span>B1</span><span>B2</span><span>C1</span></div><span></span></div>
      <div class="skill-rows">${rows}</div>
      <div class="reco">${reco}</div>
      ${app.confirmRestart ? `
      <div class="reco" style="border-left-color:var(--bad)">Start a new quest? These results will be cleared — save the teacher report first if you need it.<br><span class="ua">Почати новий квест? Поточні результати зникнуть.</span></div>
      <div class="result-actions">
        <button type="button" class="btn" data-action="restart-yes">Yes, start over</button>
        <button type="button" class="btn secondary" data-action="restart-no">Cancel</button>
      </div>` : `
      <div class="result-actions">
        <button type="button" class="btn" data-action="report">📋 Teacher report</button>
        <button type="button" class="btn secondary" data-action="restart">↺ New quest</button>
      </div>`}
    </div></div>`;
  }

  // ---------------------------------------------------------------- rendering
  function leafEl(slot) { return document.getElementById("leaf-" + slot); }

  function renderLeaf(slot, i, opts) {
    const leaf = leafEl(slot);
    const inner = leaf.querySelector(".leaf-inner");
    const page = (i === null || i === undefined) ? null : ensure(i);
    leaf.dataset.page = page ? String(page.i) : "";
    if (i !== null && i !== undefined && !page) { inner.innerHTML = ""; leaf.querySelector(".page-num").textContent = ""; return; }
    inner.innerHTML = pageHTML(page);
    if (opts && opts.inkIn) { inner.classList.remove("ink-in"); void inner.offsetWidth; inner.classList.add("ink-in"); }
    leaf.querySelector(".page-num").textContent = page && page.i > 0 ? "— " + page.i + " —" : "";
    if (page && (page.d.kind === "task" || page.d.kind === "speak") && !page.shownAt) page.shownAt = Date.now();
    fitLeaf(leaf);
  }

  // Shrinks a page's content until it fits (no scrolling, ever).
  // fresh=true starts from full size; fresh=false only tightens further —
  // used for the follow-up checks after animations have settled.
  function fitLeaf(container, fresh) {
    const inner = container.querySelector(".leaf-inner");
    if (!inner) return;
    let f = fresh === false ? (parseFloat(inner.style.getPropertyValue("--fit")) || 1) : 1;
    let guard = 0;
    inner.style.setProperty("--fit", f.toFixed(2));
    while (inner.scrollHeight > inner.clientHeight && f > 0.56 && guard++ < 14) {
      f -= 0.04;
      inner.style.setProperty("--fit", f.toFixed(2));
    }
    if (fresh !== false) {
      requestAnimationFrame(() => fitLeaf(container, false));
      setTimeout(() => fitLeaf(container, false), 700);
      const pg = inner.firstElementChild;
      if (pg && sizeWatcher) sizeWatcher.observe(pg);
    }
  }
  // anything that grows a page later (late layout, a revealed transcript, a smaller footer) re-tightens it
  const sizeWatcher = window.ResizeObserver ? new ResizeObserver(entries => {
    entries.forEach(en => {
      const leaf = en.target.closest && en.target.closest(".leaf");
      if (leaf) fitLeaf(leaf, false);
    });
  }) : null;
  if (sizeWatcher) [0, 1].forEach(s => { const l = document.getElementById("leaf-" + s); if (l) sizeWatcher.observe(l); });

  function rerenderPage(page, opts) {
    [0, 1].forEach(slot => { if (leafEl(slot).dataset.page === String(page.i)) renderLeaf(slot, page.i, opts); });
  }

  function renderSpread() {
    const spread = $("#book-spread");
    spread.classList.toggle("single", app.mode === "single");
    const L = app.spreadStart;
    renderLeaf(0, L);
    if (app.mode === "double") {
      const left = app.pages[L];
      if (left && left.done) renderLeaf(1, L + 1 < app.plan.length ? L + 1 : null);
      else renderLeaf(1, null);
    }
    updateChrome();
  }

  function visiblePages() {
    const out = [];
    [0, 1].forEach(slot => {
      if (slot === 1 && app.mode === "single") return;
      const v = leafEl(slot).dataset.page;
      if (v !== "" && v !== undefined) out.push(app.pages[Number(v)]);
    });
    return out;
  }

  function canTurn() {
    if (app.turning) return false;
    const L = app.spreadStart;
    if (L + per() >= app.plan.length) return false;
    const vis = visiblePages();
    if (!vis.length) return false;
    if (vis.some(p => p.d.kind === "summary")) return false;
    if (app.mode === "double" && L + 1 < app.plan.length && vis.length < 2) return false;
    return vis.every(p => p.done);
  }

  function updateChrome() {
    const vis = visiblePages();
    const first = vis[0];
    const chIdx = first && first.d.chapter !== undefined ? first.d.chapter
      : (vis[1] && vis[1].d.chapter !== undefined ? vis[1].d.chapter : null);

    // header
    const isResults = vis.some(p => p.d.kind === "passport" || p.d.kind === "summary" || p.d.kind === "filler" && p.d.chapter === undefined);
    if (chIdx !== null && !isResults) {
      const ch = CHAPTERS[chIdx];
      $("#chapter-icon").textContent = chapterIcon(ch);
      $("#chapter-name").textContent = ch.title;
    } else {
      $("#chapter-icon").textContent = isResults ? "🏅" : "📖";
      $("#chapter-name").textContent = isResults ? "Level Passport" : "English Level Quest";
    }
    $("#chapter-track").innerHTML = app.S ? CHAPTERS.map((ch, ci) => {
      const cls = isResults || (chIdx !== null && ci < chIdx) ? "done" : (ci === chIdx ? "current" : "");
      return `<span class="track-dot ${cls}" title="${esc(ch.title)}">${chapterIcon(ch)}</span>`;
    }).join("") : "";
    const chip = $("#student-chip");
    if (app.S) { chip.classList.remove("hidden"); chip.textContent = `${AGES[app.age].icon} ${app.name}`; }
    else chip.classList.add("hidden");

    // footer
    const interactive = vis.filter(p => p.d.kind === "task" || p.d.kind === "speak");
    let status = "";
    if (isResults) status = "✦ Quest complete";
    else if (chIdx !== null) status = `<span>Chapter ${chIdx + 1}/${CHAPTERS.length}</span>`;
    else status = `<span>${app.S ? "Ready?" : "📖 Welcome"}</span>`;
    if (interactive.length) status += `<span class="dots">${interactive.map(p => `<i class="${p.done ? "done" : ""}"></i>`).join("")}</span>`;
    $("#footer-status").innerHTML = status;

    const btn = $("#turn-btn");
    const atEnd = vis.some(p => p.d.kind === "summary");
    btn.classList.toggle("hidden", atEnd);
    const onForm = vis.some(p => p.d.kind === "form");
    const onPassportSingle = app.mode === "single" && vis.some(p => p.d.kind === "passport");
    btn.innerHTML = onForm ? 'Open the book <span aria-hidden="true">➜</span>'
      : onPassportSingle ? 'See your skills <span aria-hidden="true">➜</span>'
      : 'Turn the page <span aria-hidden="true">➜</span>';
    const ready = canTurn();
    btn.classList.toggle("ready", ready);
    btn.setAttribute("aria-disabled", String(!ready));
    // header/footer text can change their height — re-fit the pages afterwards
    [0, 1].forEach(s => { const l = leafEl(s); if (l.offsetParent) fitLeaf(l); });
  }

  // ---------------------------------------------------------------- page turn
  function leaveSpread() {
    const vis = visiblePages();
    if (vis.some(p => p.d.kind === "form") && !app.S) {
      app.S = E.createSession({ bank: BANK, ageGroup: app.age });
      window.addEventListener("beforeunload", beforeUnload);
    }
    cancelSpeech();
  }

  function beforeUnload(e) {
    if (app.S && !app.S.finishedAt) { e.preventDefault(); e.returnValue = ""; }
  }

  function turn() {
    if (!canTurn()) return;
    leaveSpread();
    const newStart = app.spreadStart + per();
    const scene = $("#spread-scene");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    app.turning = true;
    $("#turn-btn").classList.remove("ready");

    if (reduce) { app.spreadStart = newStart; renderSpread(); app.turning = false; updateChrome(); return; }

    const sceneRect = scene.getBoundingClientRect();
    const sheet = document.createElement("div");
    const finish = () => {
      if (!sheet.isConnected) return;
      if (app.mode === "double") renderLeaf(0, app.spreadStart);
      sheet.remove();
      const sh = scene.querySelector(".cast-shadow"); if (sh) sh.remove();
      app.turning = false;
      updateChrome();
    };

    if (app.mode === "double") {
      const right = leafEl(1), left = leafEl(0);
      const rr = right.getBoundingClientRect(), lr = left.getBoundingClientRect();
      sheet.className = "turn-sheet";
      Object.assign(sheet.style, { left: (rr.left - sceneRect.left) + "px", top: (rr.top - sceneRect.top) + "px", width: rr.width + "px", height: rr.height + "px" });
      const front = document.createElement("div"); front.className = "face front";
      front.appendChild(right.querySelector(".leaf-inner").cloneNode(true));
      front.appendChild(right.querySelector(".page-num").cloneNode(true));
      app.spreadStart = newStart;
      const newLeft = ensure(newStart);
      const back = document.createElement("div"); back.className = "face back";
      back.innerHTML = `<div class="leaf-inner">${pageHTML(newLeft)}</div><div class="page-num">${newLeft && newLeft.i > 0 ? "— " + newLeft.i + " —" : ""}</div>`;
      sheet.appendChild(front); sheet.appendChild(back);
      scene.appendChild(sheet);
      fitLeaf(back);
      // the page underneath the lifting sheet is already the new right page
      if (newLeft && newLeft.done) renderLeaf(1, newStart + 1 < app.plan.length ? newStart + 1 : null);
      else renderLeaf(1, null);
      const shadow = document.createElement("div");
      shadow.className = "cast-shadow";
      Object.assign(shadow.style, { left: (lr.left - sceneRect.left) + "px", top: (lr.top - sceneRect.top) + "px", width: lr.width + "px", height: lr.height + "px" });
      scene.appendChild(shadow);
      requestAnimationFrame(() => { sheet.classList.add("turning"); shadow.classList.add("on"); });
    } else {
      const leaf = leafEl(0);
      const r = leaf.getBoundingClientRect();
      sheet.className = "turn-sheet single";
      Object.assign(sheet.style, { left: (r.left - sceneRect.left) + "px", top: (r.top - sceneRect.top) + "px", width: r.width + "px", height: r.height + "px" });
      const front = document.createElement("div"); front.className = "face front";
      front.appendChild(leaf.querySelector(".leaf-inner").cloneNode(true));
      front.appendChild(leaf.querySelector(".page-num").cloneNode(true));
      sheet.appendChild(front);
      scene.appendChild(sheet);
      app.spreadStart = newStart;
      renderLeaf(0, newStart);
      requestAnimationFrame(() => sheet.classList.add("turning"));
    }
    sheet.addEventListener("animationend", e => { if (e.target === sheet) finish(); });
    setTimeout(finish, 1400);
    updateChrome();
  }

  // ---------------------------------------------------------------- answering
  function afterPageDone(page) {
    if (app.mode === "double" && page.i === app.spreadStart) {
      const nextI = app.spreadStart + 1;
      if (nextI < app.plan.length && leafEl(1).dataset.page === "") renderLeaf(1, nextI, { inkIn: true });
    }
    updateChrome();
  }

  function answer(page, k, evt) {
    if (!page || page.done || page.d.kind !== "task") return;
    const it = page.item;
    if (it.skill === "listening" && !page.noAudio && page.plays === 0) return;
    const orig = page.order[k];
    const correct = orig === it.correctAnswer;
    const section = CHAPTERS[page.d.chapter].id;
    page.done = true; page.chosenK = k; page.correct = correct;
    const t = theme() === "default" ? "kid" : theme();
    page.praise = pickOne(PRAISE[t]);
    app.S.record(it, {
      correct, chosenText: it.options[orig], ms: Date.now() - (page.shownAt || Date.now()),
      section, adapt: section !== "quickstart" && section !== "boss"
    });
    if (section === "quickstart" && page.d.idx === CHAPTERS[0].n - 1) app.S.seedFromQuickStart();
    cancelSpeech();
    page.playing = false;
    rerenderPage(page);
    if (correct && evt) burst(evt.clientX, evt.clientY);
    afterPageDone(page);
  }

  function burst(x, y) {
    if (!x && !y) return;
    const glyphs = theme() === "teen" ? ["★", "✦", "⚡"] : theme() === "adult" ? ["✓", "·", "✦"] : ["✨", "⭐", "🌟"];
    for (let n = 0; n < 6; n++) {
      const s = document.createElement("span");
      s.className = "burst"; s.textContent = pickOne(glyphs);
      s.style.left = (x - 10) + "px"; s.style.top = (y - 10) + "px";
      s.style.setProperty("--dx", ((Math.random() - .5) * 120).toFixed(0) + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 950);
    }
  }

  // ---------------------------------------------------------------- listening (speechSynthesis)
  let voices = [];
  function loadVoices() { try { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch (e) { voices = []; } }
  if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function pickVoice() {
    const en = voices.filter(v => /^en(-|_)/i.test(v.lang));
    return en.find(v => /en.GB/i.test(v.lang) && /google|natural|daniel|serena|libby|sonia/i.test(v.name))
      || en.find(v => /en.GB/i.test(v.lang)) || en.find(v => /en.US/i.test(v.lang)) || en[0] || null;
  }
  function cancelSpeech() { try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { /* ignore */ } }

  function play(page) {
    if (!page || page.playing || page.plays >= 2 || !window.speechSynthesis) return;
    const it = page.item;
    const u = new SpeechSynthesisUtterance(it.audioScript);
    u.lang = "en-GB";
    const v = pickVoice(); if (v) u.voice = v;
    u.rate = [0.82, 0.88, 0.94, 1, 1.02][LEVELS.indexOf(it.cefr)] || 0.95;
    const token = (page.playToken = (page.playToken || 0) + 1);
    const end = () => { if (!page.playing || page.playToken !== token) return; page.playing = false; rerenderPage(page); updateChrome(); };
    u.onend = end; u.onerror = end;
    page.playing = true; page.plays += 1;
    cancelSpeech();
    speechSynthesis.speak(u);
    rerenderPage(page);
    // safety net in case onend never fires
    setTimeout(end, Math.max(4000, it.audioScript.length * 110));
  }

  // ---------------------------------------------------------------- speaking (MediaRecorder + optional SpeechRecognition)
  const rec = { stream: null, mr: null, chunks: [], start: 0, timer: null, recog: null, page: null };
  app.audioTemp = {};

  function recLimit(page) { return Math.min(120, Math.max(60, (page.target || 30) * 2)); }

  async function startRecording(page) {
    const sp = page.sp;
    sp.error = "";
    if (!MIC_OK) { sp.mode = "typing"; sp.error = ""; rerenderPage(page); return; }
    try {
      if (!rec.stream) rec.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      sp.mode = "typing";
      sp.error = "Microphone is not available — you can type your answer.";
      rerenderPage(page);
      toast("🎙️ Microphone not available — type your answer instead");
      return;
    }
    const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
    const mime = types.find(t => window.MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || "";
    rec.chunks = [];
    rec.mr = mime ? new MediaRecorder(rec.stream, { mimeType: mime }) : new MediaRecorder(rec.stream);
    rec.mr.ondataavailable = e => { if (e.data && e.data.size) rec.chunks.push(e.data); };
    rec.mr.onstop = () => {
      const type = rec.mr.mimeType || mime || "audio/webm";
      const blob = new Blob(rec.chunks, { type });
      const old = app.audioTemp[page.i];
      if (old) URL.revokeObjectURL(old.url);
      app.audioTemp[page.i] = { url: URL.createObjectURL(blob), mime: type, size: blob.size };
      rerenderPage(page);
    };
    rec.page = page;
    rec.start = Date.now();
    sp.transcript = ""; sp.interim = ""; sp.elapsed = 0;
    sp.mode = "recording";
    rec.mr.start(250);

    if (SR) {
      try {
        const r = new SR();
        r.lang = "en-GB"; r.continuous = true; r.interimResults = true;
        r.onresult = ev => {
          let fin = "", interim = "";
          for (let k = 0; k < ev.results.length; k++) {
            if (ev.results[k].isFinal) fin += ev.results[k][0].transcript + " ";
            else interim += ev.results[k][0].transcript;
          }
          sp.transcriptBase = sp.transcriptBase || "";
          sp.transcript = (sp.transcriptBase + fin).trim();
          sp.interim = interim;
          updateLiveTranscript(page);
        };
        r.onend = () => {
          if (sp.mode === "recording" && rec.recog === r) {
            sp.transcriptBase = sp.transcript + " ";
            try { r.start(); } catch (e) { /* ignore */ }
          }
        };
        r.onerror = () => { /* transcript is optional */ };
        sp.transcriptBase = "";
        rec.recog = r;
        r.start();
      } catch (e) { rec.recog = null; }
    }

    rerenderPage(page);
    rec.timer = setInterval(() => {
      sp.elapsed = (Date.now() - rec.start) / 1000;
      updateRecordingUI(page);
      if (sp.elapsed >= recLimit(page)) stopRecording(page);
    }, 250);
  }

  function updateRecordingUI(page) {
    const leaf = document.querySelector(`.leaf[data-page="${page.i}"]`);
    if (!leaf) return;
    const t = leaf.querySelector(".rec-time");
    if (t) t.innerHTML = `${fmtTime(page.sp.elapsed)} <span class="ua">/ ~${fmtTime(page.target)} · max ${fmtTime(recLimit(page))}</span>`;
    const fg = leaf.querySelector(".ring-fg");
    if (fg) {
      const C = 2 * Math.PI * 44;
      fg.setAttribute("stroke-dashoffset", (C * (1 - clamp(page.sp.elapsed / page.target, 0, 1))).toFixed(1));
    }
  }

  function updateLiveTranscript(page) {
    const leaf = document.querySelector(`.leaf[data-page="${page.i}"]`);
    const box = leaf && leaf.querySelector(".live-transcript");
    if (box) box.innerHTML = `${esc(page.sp.transcript)} <span class="interim">${esc(page.sp.interim)}</span>`;
  }

  function stopRecording(page) {
    const sp = page.sp;
    if (sp.mode !== "recording") return;
    clearInterval(rec.timer);
    sp.durationSec = (Date.now() - rec.start) / 1000;
    sp.mode = "recorded";
    sp.interim = "";
    const r = rec.recog; rec.recog = null;
    if (r) { try { r.stop(); } catch (e) { /* ignore */ } }
    try { if (rec.mr && rec.mr.state !== "inactive") rec.mr.stop(); } catch (e) { /* ignore */ }
    rerenderPage(page);
  }

  function stopMic() {
    if (rec.stream) { rec.stream.getTracks().forEach(t => t.stop()); rec.stream = null; }
  }

  function finishSpeaking(page, skipped) {
    const sp = page.sp;
    if (sp.mode === "recording") stopRecording(page);
    const hasAudio = !skipped && !!app.audioTemp[page.i];
    const entry = app.S.recordSpeaking({
      itemId: page.item.id, stage: page.stage, kind: page.kind, prompt: page.prompt, levelIdx: page.levelIdx,
      function: page.item.function, transcript: skipped ? "" : sp.transcript, typed: skipped ? "" : sp.typed,
      durationSec: skipped ? 0 : sp.durationSec, targetSec: page.target, skipped: !!skipped, hasAudio
    });
    const idx = app.S.speakingLog.length - 1;
    if (hasAudio) app.audio[idx] = app.audioTemp[page.i];
    page.entry = entry;
    sp.skipped = !!skipped;
    sp.mode = "done";
    page.done = true;
    rerenderPage(page);
    afterPageDone(page);
  }

  // ---------------------------------------------------------------- events
  function pageFromEl(el) {
    const leaf = el.closest(".leaf");
    if (!leaf || leaf.dataset.page === "") return null;
    return app.pages[Number(leaf.dataset.page)];
  }

  function onLeafClick(e) {
    const btn = e.target.closest("[data-action]");
    if (!btn || btn.disabled || app.turning) return;
    const page = pageFromEl(btn);
    const act = btn.dataset.action;
    switch (act) {
      case "age": {
        app.age = btn.dataset.age;
        document.body.dataset.theme = AGES[app.age].theme;
        ambient();
        if (page) page.done = formValid();
        renderSpread();
        break;
      }
      case "answer": answer(page, Number(btn.dataset.k), e); break;
      case "play": play(page); break;
      case "rec-start": startRecording(page); break;
      case "rec-stop": stopRecording(page); break;
      case "rec-again": page.sp.rerecords += 1; page.sp.transcript = ""; startRecording(page); break;
      case "speak-type": page.sp.mode = "typing"; rerenderPage(page); focusTyped(page); break;
      case "speak-mic": page.sp.mode = "idle"; rerenderPage(page); break;
      case "speak-skip": finishSpeaking(page, true); break;
      case "speak-done": finishSpeaking(page, false); break;
      case "report": openReport(); break;
      case "restart": app.confirmRestart = true; rerenderPage(page); break;
      case "restart-no": app.confirmRestart = false; rerenderPage(page); break;
      case "restart-yes": restart(); break;
    }
  }

  function focusTyped(page) {
    const leaf = document.querySelector(`.leaf[data-page="${page.i}"]`);
    const ta = leaf && leaf.querySelector("textarea");
    if (ta) ta.focus();
  }

  function onLeafInput(e) {
    const f = e.target.dataset.field;
    if (!f) return;
    const page = pageFromEl(e.target);
    if (f === "name") {
      app.name = e.target.value;
      if (page) page.done = formValid();
      // reveal the right page or enable the button without re-rendering the input
      updateChrome();
    }
    if (f === "typed" && page) {
      page.sp.typed = e.target.value;
      const done = e.target.closest(".pg").querySelector('[data-action="speak-done"]');
      if (done) done.disabled = !page.sp.typed.trim();
    }
  }

  function onKey(e) {
    if (!$("#report-overlay").classList.contains("hidden")) { if (e.key === "Escape") closeReport(); return; }
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "textarea") return;
    if (e.key === "Enter") {
      const okTarget = tag !== "button" || e.target.disabled || e.target.id === "turn-btn";
      if (okTarget && canTurn()) { e.preventDefault(); turn(); }
      return;
    }
    if (tag === "input") return;
    const map = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
    const k = map[e.key.toLowerCase()];
    if (k === undefined) return;
    const target = visiblePages().find(p => p.d.kind === "task" && !p.done);
    if (target) answer(target, k, null);
  }

  let resizeT = null;
  function onResize() {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      if (app.turning) return;
      const m = computeMode();
      if (m !== app.mode) {
        if (m === "single") {
          const L = app.spreadStart, left = app.pages[L], right = app.pages[L + 1];
          if (left && left.done && right && leafEl(1).dataset.page !== "") app.spreadStart = L + 1;
        }
        app.mode = m;
        renderSpread();
      } else {
        [0, 1].forEach(s => fitLeaf(leafEl(s)));
      }
    }, 160);
  }

  // ---------------------------------------------------------------- teacher report
  const RUBRIC = [
    ["task", "Виконання завдання"],
    ["compr", "Зрозумілість (вимова — лише розбірливість)"],
    ["vocab", "Словниковий запас"],
    ["gram", "Граматика"],
    ["coh", "Зв'язність і плавність"]
  ];
  const SKILL_UA = { vocabulary: "Лексика", grammar: "Граматика", realLife: "Англійська в житті", reading: "Читання / Use of English", listening: "Аудіювання", speaking: "Говоріння" };
  const HEUR_UA = { weak: "коротко", solid: "достатньо", strong: "розгорнуто" };

  function rubricSuggestion() {
    const vals = [];
    app.S.speakingLog.forEach((r, ix) => {
      if (r.skipped) return;
      const rb = app.rubric[ix];
      if (!rb) return;
      const nums = RUBRIC.map(d => rb[d[0]]).filter(x => x !== "" && x !== undefined).map(Number);
      if (nums.length < RUBRIC.length) return;
      const m = nums.reduce((a, b) => a + b, 0) / nums.length;
      const delta = m >= 3.2 ? 0.5 : m >= 2.2 ? 0 : m >= 1.2 ? -0.5 : -1;
      vals.push(r.levelIdx + delta);
    });
    if (!vals.length) return null;
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    return clamp(Math.floor(mean * 2) / 2, 0, 4);
  }

  function reportHTML() {
    const S = app.S;
    const est = S.estimates();
    const diag = S.diagnostics();
    const a = AGES[app.age];
    const mins = Math.max(1, Math.round(((S.finishedAt || Date.now()) - S.startedAt) / 60000));
    const sugg = rubricSuggestion();
    const levelOpts = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];

    const skillRows = E.SKILLS.map(s => {
      const e = est.skills[s];
      const n = s === "speaking" ? S.speakingLog.filter(x => !x.skipped).length : S.log.filter(x => x.skill === s).length;
      const note = s === "speaking" ? (S.speakingOverride !== null ? "підтверджено вчителем" : "попередньо (автооцінка за обсягом відповіді)") : "";
      return `<tr><td>${SKILL_UI[s].icon} ${esc(SKILL_UA[s])}</td><td><b>${e ? e.label : "—"}</b></td><td>${n}</td><td class="r-note">${note}</td></tr>`;
    }).join("");

    const diagBlocks = E.SKILLS.map(s => {
      const d = diag[s];
      if (!d || (!d.strong.length && !d.developing.length && !d.needs.length)) return "";
      const li = rows => rows.length ? `<ul>${rows.map(r => `<li>${esc(r.label)}${r.levels ? ` <span class="r-note">(${r.levels.join(", ")}${r.total > 1 ? `, ${r.correct}/${r.total}` : ""})</span>` : ""}</li>`).join("")}</ul>` : `<div class="r-note">—</div>`;
      return `<h3>${SKILL_UI[s].icon} ${esc(SKILL_UA[s])}</h3>
        <div class="r-diag">
          <div class="r-col s"><h4>✓ Сильні сторони</h4>${li(d.strong)}</div>
          <div class="r-col d"><h4>△ У процесі</h4>${li(d.developing)}</div>
          <div class="r-col n"><h4>✕ Потребує уваги</h4>${li(d.needs)}</div>
        </div>`;
    }).join("");

    const speakBlocks = S.speakingLog.map((r, ix) => {
      const rb = app.rubric[ix] || {};
      const au = app.audio[ix];
      const text = r.transcript || r.typed;
      const selects = RUBRIC.map(([k, lbl]) => `<label>${esc(lbl)}<select data-rub="${ix}" data-dim="${k}">
          <option value="">—</option>${[0, 1, 2, 3, 4].map(v => `<option value="${v}" ${String(rb[k]) === String(v) ? "selected" : ""}>${v}</option>`).join("")}</select></label>`).join("");
      return `<div class="r-speak">
        <div class="r-note">${r.stage === "base" ? "Основне питання" : "Уточнювальне питання"} · рівень питання ${r.cefr} · ${r.kind === "stretch" ? "ускладнене" : r.kind === "simplify" ? "спрощене" : "стандартне"}</div>
        <div class="p">“${esc(r.prompt)}”</div>
        ${r.skipped ? `<div class="r-note">Учень пропустив це питання.</div>` : `
          ${au ? `<audio controls src="${au.url}"></audio> <a class="r-note" href="${au.url}" download="${slug(app.name)}-speaking-${ix + 1}.${/mp4/.test(au.mime) ? "m4a" : /ogg/.test(au.mime) ? "ogg" : "webm"}">⬇ завантажити аудіо</a>` : ""}
          <div class="t">${text ? esc(text) : "<i>Немає тексту (лише аудіо).</i>"}</div>
          <div class="r-note">${r.typed ? "Письмова відповідь" : r.transcript ? "Автотранскрипт (приблизний)" : ""} · ${r.durationSec ? r.durationSec + " с / ціль ~" + r.targetSec + " с · " : ""}${r.words} слів · обсяг: <span class="r-pill ${r.heuristic}">${HEUR_UA[r.heuristic]}</span></div>
          <div class="r-rubric">${selects}</div>`}
      </div>`;
    }).join("") || `<p class="r-note">Відповідей на говоріння немає.</p>`;

    const answerRows = S.log.map((e, ix) => {
      const ch = CHAPTERS.find(c => c.id === e.section);
      const prompt = String(e.prompt || "").replace(/\s+/g, " ");
      return `<tr><td>${ix + 1}</td><td>${ch ? esc(ch.title) : ""}</td><td>${e.cefr}</td><td>${esc(E.humanize(e.concept))}${e.weight >= 0.75 ? ' <span class="r-pill">діагн.</span>' : ""}</td>
        <td>${esc(prompt.length > 90 ? prompt.slice(0, 88) + "…" : prompt)}</td><td>${esc(e.chosen)}</td><td>${e.correct ? "" : esc(e.correctText)}</td>
        <td class="${e.correct ? "ok" : "no"}">${e.correct ? "✓" : "✕"}</td><td>${e.ms ? Math.round(e.ms / 1000) + " с" : ""}</td></tr>`;
    }).join("");

    return `<div class="r-toolbar">
        <button class="r-btn" data-r="copy">📋 Копіювати підсумок</button>
        <button class="r-btn" data-r="json">⬇ JSON</button>
        <button class="r-btn primary" data-r="print">🖨 Друк / PDF</button>
        <button class="r-btn" data-r="close">✕ Закрити</button>
      </div>
      <h1>Звіт для вчителя · English Level Quest</h1>
      <div class="r-meta"><span><b>${esc(app.name)}</b></span><span>${esc(a.ua)} (${esc(a.title)})</span><span>${new Date(S.startedAt).toLocaleString()}</span><span>⏱ ${mins} хв</span><span>${S.log.length} завдань + ${S.speakingLog.length} усних відповідей</span></div>
      <div class="r-summary">
        <div class="r-overall"><div class="r-note">Загальний рівень</div><div class="big">${est.overall.label}</div><div class="r-note">${esc(GROUPS[est.overall.label.replace("+", "")] || "")}</div></div>
        <table class="r-table"><thead><tr><th>Навичка</th><th>Рівень</th><th>Завдань</th><th></th></tr></thead><tbody>${skillRows}</tbody></table>
      </div>
      <p class="r-note">Загальний рівень — зважене середнє всіх навичок (не лише граматики). «+» означає впевнений рівень із частковим успіхом на наступному. Говоріння без оцінки вчителя враховується з меншою вагою.</p>

      <h2>🎙️ Говоріння — оцінка вчителя</h2>
      <p class="r-note">Оцініть кожну відповідь за шкалою 0–4. Акцент не знижує оцінку — враховується лише розбірливість.</p>
      ${speakBlocks}
      <div class="r-final">
        <b>Рівень говоріння:</b>
        <select data-final="1">
          <option value="">Авто (${S.speakingLog.some(s => !s.skipped) ? "попередньо" : "немає даних"})</option>
          ${levelOpts.map(v => `<option value="${v}" ${S.speakingOverride === v ? "selected" : ""}>${E.levelLabel(v)}</option>`).join("")}
        </select>
        <span class="r-note">${sugg !== null ? `Підказка за рубрикою: <b>${E.levelLabel(sugg)}</b> <button class="r-btn" data-r="apply-sugg" data-v="${sugg}">Застосувати</button>` : "Заповніть рубрику, щоб отримати підказку."}</span>
      </div>

      <h2>🔎 Діагностика за поняттями</h2>
      ${diagBlocks}

      <h2>📒 Усі відповіді</h2>
      <table class="r-table"><thead><tr><th>#</th><th>Розділ</th><th>Рів.</th><th>Поняття</th><th>Завдання</th><th>Відповідь</th><th>Правильно</th><th></th><th>Час</th></tr></thead><tbody>${answerRows}</tbody></table>`;
  }

  function openReport() {
    const ov = $("#report-overlay");
    $("#report-doc").innerHTML = reportHTML();
    ov.classList.remove("hidden");
    ov.scrollTop = 0;
  }
  function refreshReport() {
    const ov = $("#report-overlay");
    const top = ov.scrollTop;
    $("#report-doc").innerHTML = reportHTML();
    ov.scrollTop = top;
    app.resultsDirty = true;
  }
  function closeReport() {
    $("#report-overlay").classList.add("hidden");
    if (app.resultsDirty) { app.resultsDirty = false; renderSpread(); }
  }

  function summaryText() {
    const S = app.S, est = S.estimates(), diag = S.diagnostics();
    const sk = E.SKILLS.map(s => `${E.SKILL_LABELS[s]}: ${est.skills[s] ? est.skills[s].label : "—"}${s === "speaking" && est.skills[s] && est.skills[s].provisional ? " (provisional)" : ""}`).join(" · ");
    const needs = [], strong = [];
    E.SKILLS.forEach(s => { if (diag[s]) { diag[s].needs.forEach(r => needs.push(r.label)); diag[s].strong.forEach(r => strong.push(r.label)); } });
    return [
      `English Level Quest — ${app.name} (${AGES[app.age].ua}) — ${new Date(S.startedAt).toLocaleDateString()}`,
      `Overall: ${est.overall.label} · ${GROUPS[est.overall.label.replace("+", "")] || ""}`,
      sk,
      strong.length ? `Strong: ${strong.slice(0, 8).join(", ")}` : "",
      needs.length ? `Needs attention: ${needs.slice(0, 8).join(", ")}` : ""
    ].filter(Boolean).join("\n");
  }

  function download(name, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function copyText(text) {
    const done = () => toast("Скопійовано ✓");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { toast("Не вдалося скопіювати"); }
    ta.remove();
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  function onReportClick(e) {
    if (e.target === $("#report-overlay")) { closeReport(); return; }
    const b = e.target.closest("[data-r]");
    if (!b) return;
    const act = b.dataset.r;
    if (act === "close") closeReport();
    if (act === "print") window.print();
    if (act === "copy") copyText(summaryText());
    if (act === "json") {
      const data = app.S.exportData({ name: app.name, track: AGES[app.age].title });
      data.teacherRubric = app.rubric;
      const d = new Date(app.S.startedAt).toISOString().slice(0, 10);
      download(`level-quest_${slug(app.name)}_${d}.json`, JSON.stringify(data, null, 2), "application/json");
    }
    if (act === "apply-sugg") { app.S.setSpeakingOverride(Number(b.dataset.v)); refreshReport(); }
  }

  function onReportChange(e) {
    const t = e.target;
    if (t.dataset.rub !== undefined) {
      const ix = t.dataset.rub;
      app.rubric[ix] = app.rubric[ix] || {};
      app.rubric[ix][t.dataset.dim] = t.value;
      refreshReport();
    }
    if (t.dataset.final) {
      app.S.setSpeakingOverride(t.value === "" ? null : Number(t.value));
      refreshReport();
    }
  }

  function restart() {
    app.confirmRestart = false;
    window.removeEventListener("beforeunload", beforeUnload);
    Object.values(app.audioTemp).forEach(a => { try { URL.revokeObjectURL(a.url); } catch (e) { /* ignore */ } });
    stopMic();
    Object.assign(app, { name: "", age: null, S: null, pages: [], spreadStart: 0, rubric: {}, audio: {}, audioTemp: {}, turning: false });
    app.plan = buildPlan();
    document.body.dataset.theme = "default";
    ambient();
    renderSpread();
  }

  // ---------------------------------------------------------------- ambient sparkles (kid / default theme)
  function ambient() {
    const box = $("#ambient");
    if (box.childElementCount) return;
    for (let n = 0; n < 18; n++) {
      const s = document.createElement("span");
      s.className = "spark";
      s.style.left = (Math.random() * 100).toFixed(1) + "vw";
      s.style.top = (60 + Math.random() * 50).toFixed(1) + "vh";
      s.style.animationDuration = (9 + Math.random() * 10).toFixed(1) + "s";
      s.style.animationDelay = (-Math.random() * 15).toFixed(1) + "s";
      box.appendChild(s);
    }
  }

  // ---------------------------------------------------------------- boot
  function boot() {
    if (!document.body.dataset.theme) document.body.dataset.theme = "default";
    app.plan = buildPlan();
    app.mode = computeMode();
    ambient();
    const spread = $("#book-spread");
    spread.addEventListener("click", onLeafClick);
    spread.addEventListener("input", onLeafInput);
    $("#turn-btn").addEventListener("click", turn);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    $("#report-overlay").addEventListener("click", onReportClick);
    $("#report-overlay").addEventListener("change", onReportChange);
    renderSpread();
    if (!BANK.length) toast("Question bank not found (js/question-bank.js)");
  }

  // exposed for automated testing only
  window.LQApp = { app, turn, canTurn, answer: (i, k) => answer(app.pages[i], k, null), visiblePages, finishSpeaking: i => finishSpeaking(app.pages[i], false), skipSpeaking: i => finishSpeaking(app.pages[i], true) };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
