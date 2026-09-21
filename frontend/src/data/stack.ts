import { projects } from "./projects";
import type { Project } from "./projects";

// Icons: https://icon-sets.iconify.design/devicon/ served via jsdelivr. Missing icon = text only.
const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const ic = (path: string) => `${ICON_BASE}/${path}.svg`;

export interface StackItem {
  label: string;
  icon: string | null;
}

// Daily software, curated by the owner.
export const logiciels: StackItem[] = [
  { label: "Figma",     icon: ic("figma/figma-original") },
  { label: "Canva",     icon: ic("canva/canva-original") },
  { label: "VS Code",   icon: ic("vscode/vscode-original") },
  { label: "VSCodium",  icon: ic("vscodium/vscodium-original") },
  { label: "SonarQube", icon: ic("sonarqube/sonarqube-original") },
  { label: "Postman",   icon: ic("postman/postman-original") },
  { label: "GitHub",    icon: ic("github/github-original") },
  { label: "GitLab",    icon: ic("gitlab/gitlab-original") },
  { label: "Trello",    icon: ic("trello/trello-original") },
];

export interface StackStat {
  key: string;
  label: string;
  icon: string | null;
  count: number;
}

const CATALOG: Record<string, { label: string; icon: string | null }> = {
  react: { label: "React", icon: ic("react/react-original") },
  "next.js": { label: "Next.js", icon: ic("nextjs/nextjs-original") },
  typescript: { label: "TypeScript", icon: ic("typescript/typescript-original") },
  tailwind: { label: "Tailwind", icon: ic("tailwindcss/tailwindcss-original") },
  vite: { label: "Vite", icon: ic("vitejs/vitejs-original") },
  "node.js": { label: "Node.js", icon: ic("nodejs/nodejs-original") },
  express: { label: "Express", icon: ic("express/express-original") },
  electron: { label: "Electron", icon: ic("electron/electron-original") },
  angular: { label: "Angular", icon: ic("angular/angular-original") },
  expo: { label: "Expo", icon: ic("expo/expo-original") },
  laravel: { label: "Laravel", icon: ic("laravel/laravel-original") },
  php: { label: "PHP", icon: ic("php/php-original") },
  mysql: { label: "MySQL", icon: ic("mysql/mysql-original") },
  supabase: { label: "Supabase", icon: ic("supabase/supabase-original") },
  postgres: { label: "Postgres", icon: ic("postgresql/postgresql-original") },
  "neon postgres": { label: "Neon Postgres", icon: ic("postgresql/postgresql-original") },
  figma: { label: "Figma", icon: ic("figma/figma-original") },
  photoshop: { label: "Photoshop", icon: ic("photoshop/photoshop-original") },
  illustrator: { label: "Illustrator", icon: ic("illustrator/illustrator-original") },
  wordpress: { label: "WordPress", icon: ic("wordpress/wordpress-original") },
  jquery: { label: "jQuery", icon: ic("jquery/jquery-original") },
  astro: { label: "Astro", icon: ic("astro/astro-original") },
  bun: { label: "Bun", icon: ic("bun/bun-original") },
  "discord.js": { label: "discord.js", icon: ic("discordjs/discordjs-original") },
  fastify: { label: "Fastify", icon: ic("fastify/fastify-original") },
  "react native": { label: "React Native", icon: ic("reactnative/reactnative-original") },
};

// "React 19", "Node.js 22", "discord.js v14", "Tailwind v4" -> "react", "node.js", ...
function normalize(raw: string): string {
  const key = raw.toLowerCase().replace(/\s*v?[\d.]+$/, "").trim();
  return key === "node" ? "node.js" : key;
}

// A stack counts once per project, even when used in several versions (amigaru 3 phases).
function stacksOf(p: Project): string[] {
  const all = [...p.stack, ...(p.versions?.flatMap((v) => v.stack) ?? [])];
  return [...new Set(all.map(normalize))].filter(Boolean);
}

// ponytail: counts scanned in the repos' package.json on 2026-09-21; re-scan to refresh.
const EXTRA: StackStat[] = [
  { key: "zod", label: "Zod", icon: null, count: 5 },
  { key: "vitest", label: "Vitest", icon: ic("vitest/vitest-original"), count: 4 },
  { key: "playwright", label: "Playwright", icon: ic("playwright/playwright-original"), count: 3 },
  { key: "zustand", label: "Zustand", icon: ic("zustand/zustand-original"), count: 1 },
  { key: "turborepo", label: "Turborepo", icon: ic("turbo/turbo-original"), count: 1 },
];

const derived: StackStat[] = (() => {
  const seen = new Map<string, { label: string; count: number }>();
  for (const p of projects) {
    for (const key of stacksOf(p)) {
      const cur = seen.get(key);
      const label = cur?.label ?? p.stack.find((s) => normalize(s) === key) ?? key;
      seen.set(key, { label, count: (cur?.count ?? 0) + 1 });
    }
  }
  return [...seen.entries()].map(([key, { label, count }]) => ({
    key,
    label: CATALOG[key]?.label ?? label,
    icon: CATALOG[key]?.icon ?? null,
    count,
  }));
})();

export const stackStats: StackStat[] = [...derived, ...EXTRA].sort(
  (a, b) => b.count - a.count || a.label.localeCompare(b.label),
);