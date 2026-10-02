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
const { darkest } = (await runnerImport(path.join(root, "src/lib/color.ts"))).module;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// ~0.6em per glyph in Geist Black: shrink long titles to fit their column.
const titleSize = (p) =>
  Math.min(96, Math.floor((p.cover ? 640 : 1050) / ((p.title ?? "Baptiste Dechamp").length * 0.6)));

// Site palette when the project has no brand colors.
const SITE_COLORS = ["#1e1a15", "#6b3fd8", "#e0479e"];

const html = (p) => {
  const [c0, c1 = c0, c2 = c1] = p.colors?.length ? p.colors : SITE_COLORS;
  const base = `color-mix(in oklch, ${darkest(p.colors ?? [c0])} 30%, #1e1a15)`;
  const cover = p.cover && pathToFileURL(path.join(root, "public", p.cover)).href;
  return `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url(${font("geist", "geist-latin-wght-normal.woff2")}); font-weight: 100 900; }
@font-face { font-family: GeistMono; src: url(${font("geist-mono", "geist-mono-latin-wght-normal.woff2")}); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: ${base}; color: #fbf7ea;
  font-family: Geist; position: relative; }
.glow { position: absolute; inset: 0;
  background: radial-gradient(circle at 10% 110%, ${c1} 0%, transparent 45%),
    radial-gradient(circle at 55% -10%, ${c2} 0%, transparent 40%); opacity: .45; }
.cover { position: absolute; top: 0; right: 0; bottom: 0; width: 64%;
  background: center / cover no-repeat url(${cover});
  filter: brightness(.8);
  -webkit-mask-image: linear-gradient(to right, transparent 10%, #000 70%);
  mask-image: linear-gradient(to right, transparent 10%, #000 70%); }
.scrim { position: absolute; inset: 0;
  background: linear-gradient(90deg, ${base} 25%, color-mix(in oklch, ${base} 55%, transparent) 55%, transparent 80%); }
main { position: relative; height: 100%; padding: 72px; display: flex; flex-direction: column; max-width: 780px; }
.tag { font-family: GeistMono; font-size: 24px; letter-spacing: .12em; text-transform: uppercase; opacity: .7; }
h1 { margin-top: auto; font-size: ${titleSize(p)}px; font-weight: 900; line-height: .95; letter-spacing: -.035em;
  text-shadow: 0 4px 32px ${base}; }
p { margin-top: 24px; font-size: 32px; line-height: 1.3; opacity: .9; max-width: 20em; text-shadow: 0 2px 20px ${base}; }
footer { margin-top: 48px; font-family: GeistMono; font-size: 24px; opacity: .75; }
</style>
<div class="glow"></div>
${cover ? '<div class="cover"></div><div class="scrim"></div>' : ""}
<main>
  <div class="tag">{ ${p.path === "/" ? "portfolio" : esc(p.path.split("/")[1])} }</div>
  <h1>${esc(p.title ?? "Baptiste Dechamp")}</h1>
  <p>${esc(p.subtitle)}</p>
  <footer>baptisteledev.fr</footer>
</main>`;
};

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
