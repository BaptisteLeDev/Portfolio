import fs from "fs"
import path from "path"
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { fullTitle, ogImage, pages, type PageMeta } from "./src/data/pages"
import { SITE_URL } from "./src/data/site"

// Built from pages.ts so a new project is indexed without a manual edit.
function sitemap(): Plugin {
  return {
    name: "sitemap",
    generateBundle() {
      const urls = pages.map((p) => `  <url><loc>${SITE_URL}${p.path}</loc></url>`).join("\n")
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

function withMeta(html: string, p: PageMeta) {
  const title = esc(fullTitle(p.title))
  const set = (attr: string, key: string, value: string) =>
    html = html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*`), `$1${value}`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${SITE_URL}${p.path}`)
  set("name", "description", esc(p.description))
  set("property", "og:title", title)
  set("property", "og:description", esc(p.description))
  set("property", "og:url", SITE_URL + p.path)
  set("property", "og:image", SITE_URL + ogImage(p.path))
  return html
}

// Crawlers (LinkedIn, Discord, X) skip JS: one HTML per route carries its
// own meta. vercel.json cleanUrls serves /portfolio.html at /portfolio.
function prerenderMeta(): Plugin {
  let outDir = "dist"
  return {
    name: "prerender-meta",
    apply: "build",
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir)
    },
    closeBundle() {
      const base = fs.readFileSync(path.join(outDir, "index.html"), "utf8")
      for (const p of pages) {
        const file = path.join(outDir, p.path === "/" ? "index.html" : `${p.path}.html`)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, withMeta(base, p))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap(), prerenderMeta()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
