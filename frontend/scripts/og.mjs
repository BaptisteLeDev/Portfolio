// Renders public/og/*.png (1200x630), one per entry of src/data/pages.ts.
// Usage: npm run og  (CHROME_PATH overrides the Chrome binary)
// ponytail: local Chrome headless, no deps. Output is committed, so the
// script only reruns when a page or project changes.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { runnerImport } from "vite";

const root = path.resolve(import.meta.dirname, "..");
const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const require = createRequire(import.meta.url);
const font = (pkg, file) => pathToFileURL(require.resolve(`@fontsource-variable/${pkg}/files/${file}`)).href;

const { module } = await runnerImport(path.join(root, "src/data/pages.ts"));
const { pages, ogImage } = module;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// ~0.6em per glyph in Geist Black: shrink long titles to fit their column.
const titleSize = (p) =>
  Math.min(96, Math.floor((p.cover ? 600 : 1050) / ((p.title ?? "Baptiste Dechamp").length * 0.6)));

const html = (p) => `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url(${font("geist", "geist-latin-wght-normal.woff2")}); font-weight: 100 900; }
@font-face { font-family: GeistMono; src: url(${font("geist-mono", "geist-mono-latin-wght-normal.woff2")}); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #1e1a15; color: #fbf7ea;
  font-family: Geist; display: flex; position: relative; }
body::before { content: ""; position: absolute; inset: -40% -10% auto auto; width: 900px; height: 900px;
  background: radial-gradient(circle, #6b3fd8 0%, #e0479e55 40%, transparent 70%); opacity: .55; }
main { position: relative; flex: 1; min-width: 0; padding: 72px; display: flex; flex-direction: column; }
.tag { font-family: GeistMono; font-size: 24px; letter-spacing: .12em; text-transform: uppercase; opacity: .6; }
h1 { margin-top: auto; font-size: ${titleSize(p)}px; font-weight: 900; line-height: .95; letter-spacing: -.035em; }
p { margin-top: 24px; font-size: 32px; line-height: 1.3; opacity: .85; max-width: 22em; }
footer { margin-top: 48px; font-family: GeistMono; font-size: 24px; opacity: .7; }
.cover { position: relative; flex: none; width: 420px; margin: 48px 48px 48px 0; border-radius: 32px;
  background: center / cover no-repeat url(${p.cover ? pathToFileURL(path.join(root, "public", p.cover)).href : ""}); }
</style>
<main>
  <div class="tag">{ ${p.path === "/" ? "portfolio" : esc(p.path.split("/")[1])} }</div>
  <h1>${esc(p.title ?? "Baptiste Dechamp")}</h1>
  <p>${esc(p.subtitle)}</p>
  <footer>baptisteledev.fr</footer>
</main>
${p.cover ? '<div class="cover"></div>' : ""}`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "og-"));
fs.mkdirSync(path.join(root, "public/og"), { recursive: true });
for (const p of pages) {
  const src = path.join(tmp, "page.html");
  const out = path.join(root, "public", ogImage(p.path));
  fs.writeFileSync(src, html(p));
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
    "--window-size=1200,630", `--screenshot=${out}`, pathToFileURL(src).href,
  ], { stdio: "ignore" });
  console.log(path.relative(root, out));
}
fs.rmSync(tmp, { recursive: true });
