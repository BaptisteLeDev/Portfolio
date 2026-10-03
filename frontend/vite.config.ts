import fs from "fs"
import path from "path"
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { fullTitle, ogImage, pageMeta, pages, SITE_NAME, type PageMeta } from "./src/data/pages"
import { projects } from "./src/data/projects"
import { contactLinks, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "./src/data/site"
import home from "./src/i18n/locales/fr/home.json"

// https://llmstxt.org
function llmsTxt() {
  const link = (path: string) => {
    const p = pageMeta(path)!
    return `- [${p.title ?? "Accueil"}](${SITE_URL}${path}): ${p.description}`
  }
  return [
    `# ${SITE_NAME}`,
    "",
    `> ${pageMeta("/")!.description}`,
    "",
    home.about.body,
    "",
    "Portfolio statique (React, Vite). Chaque projet a sa page avec rôle, période, stack et contexte.",
    "",
    "## Pages",
    link("/"),
    link("/portfolio"),
    "",
    "## Projets",
    ...projects.map(
      (p) => `- [${p.title}](${SITE_URL}/portfolio/${p.id}): ${p.tagline} Rôle : ${p.role}. Stack : ${p.stack.join(", ")}.`,
    ),
    "",
    "## Contact",
    ...contactLinks.map((c) => `- [${c.label}](${c.href})`),
    "",
    "## Optional",
    link("/mentions-legales"),
    `- [CV (PDF)](${SITE_URL}/TheCV_Baptiste-DECHAMP.pdf): CV de Baptiste Dechamp`,
    "",
  ].join("\n")
}

// Built from pages.ts so a new project is indexed without a manual edit.
function sitemap(): Plugin {
  return {
    name: "sitemap",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llmsTxt() })
      const img = (src: string) => `<image:image><image:loc>${SITE_URL}${src}</image:loc></image:image>`
      const urls = pages
        .map((p) => {
          const pr = projectOf(p.path)
          const imgs = pr ? [...new Set([...(p.cover ? [p.cover] : []), ...(pr.screenshots ?? [])])] : []
          return `  <url><loc>${SITE_URL}${p.path}</loc>${imgs.map(img).join("")}</url>`
        })
        .join("\n")
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

const projectOf = (path: string) => projects.find((pr) => path === `/portfolio/${pr.id}`)

const projectList = () =>
  `<ul>${projects.map((pr) => `<li><a href="/portfolio/${pr.id}">${esc(pr.title)}</a> : ${esc(pr.tagline)}</li>`).join("")}</ul>`

// Same text React renders, served in the HTML: AI crawlers (GPTBot,
// ClaudeBot, Perplexity) do not run JS. createRoot() replaces it on mount.
function staticBody(p: PageMeta) {
  const pr = projectOf(p.path)
  if (pr) {
    const item = (k: string, v?: string) => (v ? `<p><strong>${k} :</strong> ${esc(v)}</p>` : "")
    return `<article><h1>${esc(pr.title)}</h1><p>${esc(pr.tagline)}</p><p>${esc(pr.description)}</p>${item("Rôle", pr.role)}${item("Période", pr.period)}${item("Stack", pr.stack.join(", "))}${item("Problème", pr.problem)}${item("Solution", pr.solution)}${item("Résultat", pr.outcome)}<p><a href="/portfolio">Tous les projets de Baptiste Dechamp</a></p></article>`
  }
  if (p.path === "/")
    return `<h1>Baptiste Dechamp, développeur web full-stack</h1><p>${esc(home.about.body)}</p><h2>Projets</h2>${projectList()}<p><a href="/TheCV_Baptiste-DECHAMP.pdf">CV de Baptiste Dechamp (PDF)</a></p>`
  if (p.path === "/portfolio") return `<h1>Projets de Baptiste Dechamp</h1><p>${esc(p.description)}</p>${projectList()}`
  return `<h1>${esc(p.title ?? SITE_NAME)}</h1><p>${esc(p.description)}</p>`
}

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Baptiste Dechamp",
  alternateName: "BaptisteLeDev",
  url: `${SITE_URL}/`,
  jobTitle: "Développeur web full-stack",
  description: home.about.body,
  knowsAbout: ["React", "React Native", "TypeScript", "Node.js", "Next.js", "Electron", "Laravel", "UX/UI", "Accessibilité web"],
  alumniOf: { "@type": "EducationalOrganization", name: "MyDigitalSchool Vannes" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Titre professionnel Concepteur Développeur d'Applications (RNCP niveau 6)",
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL, "https://baptisteledev.github.io/"],
}
const personRef = { "@type": "Person", "@id": person["@id"], name: person.name }

// ProfilePage on "/" only (Google: one page per person). Elsewhere a
// breadcrumb, plus creator credit on project screenshots (Google Images).
function jsonLd(p: PageMeta) {
  if (p.path === "/") return { "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: person }
  const crumbs = [{ name: "Accueil", path: "/" }]
  if (p.path.startsWith("/portfolio/")) crumbs.push({ name: "Projets", path: "/portfolio" })
  crumbs.push({ name: p.path === "/portfolio" ? "Projets" : p.title!, path: p.path })
  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: SITE_URL + c.path })),
    },
  ]
  const pr = projectOf(p.path)
  if (!pr) return { "@context": "https://schema.org", "@graph": graph }
  // Team projects belong to all their authors (see /mentions-legales).
  const credit = [...new Set([person.name, ...(pr.team ?? []).map((m) => m.name)])].join(", ")
  const images = [...new Set([...(p.cover ? [p.cover] : []), ...(pr.screenshots ?? [])])]
  for (const src of images)
    graph.push({
      "@type": "ImageObject",
      contentUrl: SITE_URL + src,
      name: `Capture d'écran du projet ${pr.title}`,
      creator: personRef,
      creditText: credit,
      copyrightNotice: `© ${credit}`,
      license: `${SITE_URL}/mentions-legales`,
      acquireLicensePage: `${SITE_URL}/mentions-legales`,
    })
  // No offers/aggregateRating: no real price or reviews, so no rich result,
  // but the app is still described for Google and AI answers.
  if (pr.types.some((t) => t !== "design"))
    graph.push({
      "@type": pr.types.includes("mobile") ? "MobileApplication" : pr.types.includes("desktop") ? "SoftwareApplication" : "WebApplication",
      name: pr.title,
      description: pr.description,
      url: pr.links?.live ?? SITE_URL + p.path,
      ...(images[0] && { image: SITE_URL + images[0] }),
      author: personRef,
      keywords: pr.stack.join(", "),
      ...(!pr.types.includes("mobile") && !pr.types.includes("desktop") && { operatingSystem: "Web" }),
    })
  return { "@context": "https://schema.org", "@graph": graph }
}

function withMeta(html: string, p: PageMeta) {
  const ld = JSON.stringify(jsonLd(p)).replace(/</g, "\\u003c")
  html = html.replace("</head>", `  <script type="application/ld+json">${ld}</script>\n  </head>`)
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
  return html.replace('<div id="root"></div>', `<div id="root">${staticBody(p)}</div>`)
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
      // Real 404 status for unknown URLs (no SPA catch-all in vercel.json):
      // no soft 404 duplicating the home page in the index.
      fs.writeFileSync(
        path.join(outDir, "404.html"),
        base
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle("Page introuvable"))}</title>`)
          .replace(/(<meta name="robots" content=")[^"]*/, "$1noindex")
          .replace(/\s*<link rel="canonical"[^>]*>/, ""),
      )
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
