import path from "path"
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { projects } from "./src/data/projects"
import { SITE_URL } from "./src/data/site"

// Built from projects.ts so a new project is indexed without a manual edit.
function sitemap(): Plugin {
  const paths = ["/", "/portfolio", ...projects.map((p) => `/portfolio/${p.id}`), "/mentions-legales"]
  return {
    name: "sitemap",
    generateBundle() {
      const urls = paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n")
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
