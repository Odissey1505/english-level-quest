#!/usr/bin/env node
/* Validates js/question-bank.js against the schema in docs/architecture.md.
   Usage:  node tools/validate-bank.js
   Exit code 1 if anything is wrong. */
"use strict";
const path = require("path");
const BANK = require(path.join(__dirname, "..", "js", "question-bank.js"));

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const AGES = ["10-12", "13-17", "adult"];
const SKILLS = ["vocabulary", "grammar", "useOfEnglish", "realLife", "reading", "listening", "speaking"];
const ENGINE_SKILLS = { vocabulary: ["vocabulary"], grammar: ["grammar"], realLife: ["realLife"], reading: ["reading", "useOfEnglish"], listening: ["listening"], speaking: ["speaking"] };
const STD_FIELDS = ["id", "ageGroup", "cefr", "skill", "topic", "concept", "questionType", "difficulty", "diagnosticWeight", "prompt", "options", "correctAnswer", "explanation", "tags"];
const SPEAK_FIELDS = ["id", "ageGroup", "cefr", "skill", "topic", "function", "questionType", "prompt", "followUps", "targetDuration"];

const problems = [];
const bad = (q, msg) => problems.push(`${q && q.id ? q.id : "?"}: ${msg}`);

const seen = new Set();
BANK.forEach(q => {
  if (seen.has(q.id)) bad(q, "duplicate id");
  seen.add(q.id);
  if (!AGES.includes(q.ageGroup)) bad(q, "unknown ageGroup " + q.ageGroup);
  if (!LEVELS.includes(q.cefr)) bad(q, "unknown cefr " + q.cefr);
  if (!SKILLS.includes(q.skill)) bad(q, "unknown skill " + q.skill);
  const fields = q.skill === "speaking" ? SPEAK_FIELDS : STD_FIELDS;
  fields.forEach(f => { if (q[f] === undefined || q[f] === null) bad(q, "missing " + f); });
  if (q.skill !== "speaking") {
    if (!Array.isArray(q.options) || q.options.length !== 4) bad(q, "needs exactly 4 options");
    else if (new Set(q.options).size !== 4) bad(q, "duplicate option text");
    if (!(Number.isInteger(q.correctAnswer) && q.correctAnswer >= 0 && q.correctAnswer < 4)) bad(q, "correctAnswer must be 0–3");
    if (!(q.diagnosticWeight >= 0 && q.diagnosticWeight <= 1)) bad(q, "diagnosticWeight must be 0–1");
    if (q.skill === "listening" && !q.audioScript) bad(q, "listening item without audioScript");
    if (q.skill === "reading" && !q.passage) bad(q, "reading item without passage");
  } else if (!Array.isArray(q.followUps)) bad(q, "followUps must be an array");
});

// coverage: every chapter must have material at every level for every age group
const gaps = [];
AGES.forEach(a => LEVELS.forEach(l => Object.entries(ENGINE_SKILLS).forEach(([s, src]) => {
  const n = BANK.filter(q => q.ageGroup === a && q.cefr === l && src.includes(q.skill)).length;
  if (n === 0) gaps.push(`${a} ${l} ${s}`);
})));

console.log(`Items: ${BANK.length} · unique ids: ${seen.size}`);
console.log("\nPer level × engine skill (13-17 shown; other age groups mirror it):");
LEVELS.forEach(l => {
  console.log("  " + l + "  " + Object.entries(ENGINE_SKILLS).map(([s, src]) =>
    `${s}:${BANK.filter(q => q.ageGroup === "13-17" && q.cefr === l && src.includes(q.skill)).length}`).join("  "));
});
if (gaps.length) console.log("\n⚠ Coverage gaps (chapter would fall back to a neighbouring level):\n  " + gaps.join("\n  "));
if (problems.length) {
  console.log(`\n✗ ${problems.length} problem(s):\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log("\n✓ All checks passed");
