import { projects } from "./projects";

// Relative imports only: also loaded by vite.config.ts and scripts/og.ts.
export const SITE_NAME = "Baptiste Dechamp, Développeur";

export interface PageMeta {
  path: string;
  title?: string;
  description: string;
  /** Second line on the OG card. */
  subtitle: string;
  cover?: string;
}

export const pages: PageMeta[] = [
  {
    path: "/",
    description:
      "Baptiste Dechamp, développeur web full-stack (React, TypeScript, Node). Portfolio : projets web, mobile et design, stack technique, CV et contact.",
    subtitle: "Développeur web full-stack",
  },
  {
    path: "/portfolio",
    title: "Portfolio, projets",
    description:
      "Projets de Baptiste Dechamp, développeur web : applications web, mobile, desktop et design, avec stack et rôle pour chacun.",
    subtitle: `${projects.length} projets web, mobile, desktop et design`,
  },
  {
    path: "/mentions-legales",
    title: "Mentions légales",
    description: "Mentions légales et données personnelles du portfolio de Baptiste Dechamp.",
    subtitle: "Éditeur, hébergement, données personnelles",
  },
  ...projects.map((p) => ({
    path: `/portfolio/${p.id}`,
    title: p.title,
    description: `${p.title} : ${p.tagline.replace(/\.$/, "")}. Projet de Baptiste Dechamp, développeur.`,
    subtitle: p.tagline,
    cover: p.thumbnail.kind === "image" ? p.thumbnail.src : undefined,
  })),
];

export const pageMeta = (path: string) => pages.find((p) => p.path === path);

export const fullTitle = (title?: string) =>
  title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Portfolio`;

export const ogImage = (path: string) =>
  `/og/${path === "/" ? "home" : path.slice(1).replaceAll("/", "-")}.png`;
