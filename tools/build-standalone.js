#!/usr/bin/env node
/* Builds dist/english-level-quest.html — the whole app in one file
   (styles and scripts inlined). Not required for GitHub Pages; useful for
   sending the test as a single file or opening it offline.
   Usage:  node tools/build-standalone.js */
"use strict";
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = p => fs.readFileSync(path.join(root, p), "utf8");
// "</script" inside inlined JS would close the tag early
const safeJs = s => s.replace(/<\/script/gi, "<\\/script");

let html = read("index.html");
html = html.replace('<link rel="stylesheet" href="css/styles.css">', () => `<style>\n${read("css/styles.css")}\n</style>`);
["js/question-bank.js", "js/engine.js", "js/app.js"].forEach(src => {
  html = html.replace(`<script src="${src}"></script>`, () => `<script>\n${safeJs(read(src))}\n</script>`);
});
if (/<script src=|<link rel="stylesheet"/.test(html)) {
  console.error("✗ Some external references were not inlined");
  process.exit(1);
}
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
const out = path.join(root, "dist", "english-level-quest.html");
fs.writeFileSync(out, html);
console.log(`✓ ${path.relative(root, out)} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
