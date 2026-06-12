# Frontend Refonte — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refonte complète du portfolio Baptiste Dechamp : stack VoidZero, Tailwind 4 tokens, composants maison, animations CSS pures (scroll-driven, conic), Cody SVG animé, 3 nouveaux projets documentés, architecture i18n.

**Architecture:** BMAD — Phase 1 Foundation séquentielle (stack swap + design system + primitives), Phase 2 Pages Sweep (4 sub-agents parallèles, un par page/groupe de pages), Phase 3 Polish (transitions route, perf, a11y).

**Tech Stack:** Vite 7, React 19, react-router 7, Tailwind 4, VoidZero (oxlint + oxc-formatter + Vitest), Geist Variable Fonts (@fontsource-variable), framer-motion (orchestration route + Cody uniquement), i18next, Electron/Expo/Laravel mentionnés dans projets, pnpm, Vercel.

**Spec source:** `docs/superpowers/specs/2026-04-24-frontend-refonte-design.md`

**Working directory:** `frontend/` — toutes les commandes et chemins sont relatifs à ce dossier sauf mention contraire.

---

## File Structure (cible)

```
frontend/
  package.json                                  # Modifié : deps swap
  vite.config.ts                                # Modifié : vitest, vite 7
  vitest.config.ts                              # Créé
  oxlint.json                                   # Créé
  .oxc-formatterrc.json                         # Créé
  tsconfig.app.json                             # Modifié : paths alias
  index.html                                    # Modifié : lang fr, meta
  src/
    main.tsx                                    # Modifié : i18n bootstrap + fonts
    App.tsx                                     # Modifié : route transitions wrapper
    styles/
      index.css                                 # Créé (remplace src/index.css)
      keyframes.css                             # Créé
    lib/
      cn.ts                                     # Créé
      cva.ts                                    # Créé
      motion-variants.ts                        # Créé
    hooks/
      use-eye-tracking.ts                       # Créé
      use-reduced-motion.ts                     # Créé
    i18n/
      index.ts                                  # Créé
      locales/fr/common.json                    # Créé
      locales/fr/home.json                      # Créé
      locales/fr/portfolio.json                 # Créé
      locales/fr/project.json                   # Créé
      locales/en/*.json                         # Créés (stubs)
    components/
      ui/
        button.tsx                              # Réécrit
        card.tsx                                # Créé
        container.tsx                           # Créé
        section.tsx                             # Créé
        bracket.tsx                             # Créé
        label.tsx                               # Créé (eyebrow)
        tag.tsx                                 # Créé
        divider.tsx                             # Créé
        up-arrow.tsx                            # Réécrit (scroll-timeline)
      effects/
        noise-overlay.tsx                       # Créé
        animated-gradient.tsx                   # Créé
        scroll-reveal.tsx                       # Créé
      cody/
        cody.tsx                                # Réécrit (SVG inline + yeux)
        cody-paths.ts                           # Créé (SVG coords)
      nav/
        navbar.tsx                              # Réécrit
        mobile-menu.tsx                         # Créé
      hero/
        hero.tsx                                # Créé
      portfolio/
        project-card.tsx                        # Créé
        project-filters.tsx                     # Créé
      footer.tsx                                # Réécrit
    data/
      projects.ts                               # Réécrit (nouveau shape)
      skills.ts                                 # Créé
      formations.ts                             # Créé
      stack.ts                                  # Créé
    pages/
      Accueil.tsx                               # Réécrit
      Portfolio.tsx                             # Réécrit
      ProjectPage.tsx                           # Réécrit
      Bonus.tsx                                 # Réécrit
      404.tsx                                   # Réécrit
    assets/
      noise.svg                                 # Créé (turbulence grain)
      cody/                                     # Nouveaux SVG si besoin
  src/__tests__/
    components/ui/*.test.tsx                    # Tests primitives
    hooks/use-eye-tracking.test.ts              # Créé
  docs/
    components.md                               # Créé (catalog des primitives)
```

**Assets à supprimer** (fin du plan) : `background_accueil.png`, `background_portfolio.png`, `section_coup-oeil.png`, `section_competences.png`, `forma_1/2/3.svg`, `Cody_Accueil.svg`, `Cody_Portfolio.svg`.

---

# PHASE 1 — FOUNDATION (séquentiel)

## Task 1 : Branch + baseline snapshot

**Files:**
- Workdir: `frontend/`

- [ ] **Step 1 : Create feature branch**

```bash
cd frontend
git checkout -b refonte/foundation
```

- [ ] **Step 2 : Baseline build sanity check**

Run: `pnpm install && pnpm build`
Expected: build succeeds (current state green before we change stack).

- [ ] **Step 3 : Commit baseline marker**

```bash
git commit --allow-empty -m "chore: baseline before refonte foundation"
```

---

## Task 2 : Stack swap — remove ESLint, add VoidZero (oxlint, oxc-formatter, Vitest)

**Files:**
- Modify: `frontend/package.json`
- Delete: `frontend/eslint.config.js`
- Create: `frontend/oxlint.json`
- Create: `frontend/.oxc-formatterrc.json`
- Create: `frontend/vitest.config.ts`

- [ ] **Step 1 : Remove ESLint packages**

```bash
pnpm remove eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint globals tailwindcss-animate shadcn-ui
rm eslint.config.js
```

- [ ] **Step 2 : Install VoidZero toolchain + i18n + fonts**

```bash
pnpm add @fontsource-variable/geist @fontsource-variable/geist-mono i18next react-i18next i18next-browser-languagedetector
pnpm add -D oxlint oxc-formatter vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom @types/node
pnpm add vite@latest @vitejs/plugin-react@latest
```

- [ ] **Step 3 : Update package.json scripts**

Replace `scripts` block with:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "oxlint .",
    "format": "oxc-formatter --write .",
    "format:check": "oxc-formatter --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

- [ ] **Step 4 : Create `oxlint.json`**

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "categories": {
    "correctness": "error",
    "suspicious": "warn",
    "perf": "warn"
  },
  "rules": {
    "no-console": "warn"
  },
  "ignorePatterns": ["dist", "node_modules", "*.config.*"]
}
```

- [ ] **Step 5 : Create `.oxc-formatterrc.json`**

```json
{
  "lineWidth": 100,
  "indentWidth": 2,
  "quoteStyle": "double",
  "trailingComma": "all",
  "semicolons": true
}
```

- [ ] **Step 6 : Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    css: true,
  },
});
```

- [ ] **Step 7 : Create test setup**

File: `frontend/src/__tests__/setup.ts`

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 8 : Update `tsconfig.app.json`** (ensure path alias + include tests)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

- [ ] **Step 9 : Run sanity checks**

```bash
pnpm lint
pnpm build
pnpm test
```

Expected: lint passes (may show current code issues — that's fine), build passes, test runs with "no test files".

- [ ] **Step 10 : Commit**

```bash
git add -A && git commit -m "chore: swap eslint for voidzero (oxlint, oxc-formatter, vitest)"
```

---

## Task 3 : Design tokens — refaire `src/styles/index.css` (Tailwind 4 @theme)

**Files:**
- Create: `frontend/src/styles/index.css`
- Create: `frontend/src/styles/keyframes.css`
- Delete: `frontend/src/index.css`
- Modify: `frontend/src/main.tsx` (import path)

- [ ] **Step 1 : Create `src/styles/index.css`**

```css
@import "tailwindcss";
@import "./keyframes.css";

@theme {
  /* === Palette oklch === */
  --color-bg:        oklch(21.61% 0.0061 56.04);
  --color-fg:        oklch(98.69% 0.0214 95.28);
  --color-cream:     oklch(96% 0.02 95);
  --color-cream-2:   oklch(90% 0.025 90);
  --color-indigo:    oklch(45% 0.22 280);
  --color-indigo-2:  oklch(55% 0.24 285);
  --color-pink:      oklch(65% 0.25 0);
  --color-pink-2:    oklch(72% 0.23 10);
  --color-ring:      oklch(75% 0.18 290);
  --color-success:   oklch(70% 0.18 145);
  --color-warn:      oklch(82% 0.18 85);
  --color-danger:    oklch(60% 0.25 25);

  /* === Fonts === */
  --font-display: "Geist Variable", "Geist", "Inter", system-ui, sans-serif;
  --font-body:    "Geist Variable", "Geist", "Inter", system-ui, sans-serif;
  --font-mono:    "Geist Mono Variable", "Geist Mono", ui-monospace, monospace;

  /* === Radius === */
  --radius-sm:  8px;
  --radius-md:  16px;
  --radius-lg:  32px;
  --radius-xl:  64px;
  --radius-2xl: 100px;

  /* === Ease === */
  --ease-signature: cubic-bezier(0.32, 0.72, 0, 1);

  /* === Sizes responsive === */
  --text-display-xxl: clamp(3rem, 10vw, 7.5rem);
  --text-display-xl:  clamp(2.5rem, 7vw, 5rem);
  --text-h1:          clamp(2rem, 5.5vw, 3.75rem);
  --text-h2:          clamp(1.5rem, 3.5vw, 2.5rem);
  --text-bracket:     clamp(4rem, 12vw, 9rem);

  --spacing-section: 8rem;
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@utility noise-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>");
  opacity: 0.04;
  mix-blend-mode: overlay;
}

@utility bracket {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: var(--text-bracket);
  line-height: 1;
}

@utility font-feature-smart {
  font-feature-settings: "kern", "liga", "ss01";
}

@layer base {
  html {
    font-family: var(--font-body);
    font-feature-settings: "kern", "liga";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-fg);
  }

  *:focus-visible {
    outline: 2px dashed var(--color-ring);
    outline-offset: 4px;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

- [ ] **Step 2 : Create `src/styles/keyframes.css`**

```css
@keyframes spin-slow {
  to { --angle: 360deg; }
}

@keyframes drift {
  0%   { transform: translateY(-4px); }
  100% { transform: translateY(4px); }
}

@keyframes blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95%           { transform: scaleY(0.1); }
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
```

- [ ] **Step 3 : Update `src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./styles/index.css";
import App from "./App.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 4 : Delete old CSS**

```bash
rm src/index.css src/App.css
```

- [ ] **Step 5 : Verify build**

Run: `pnpm build`
Expected: success. If `App.css` was imported elsewhere, remove the import.

- [ ] **Step 6 : Commit**

```bash
git add -A && git commit -m "feat(design): Tailwind 4 @theme tokens, Geist fonts, keyframes, noise utility"
```

---

## Task 4 : Utility libs — `cn`, `cva` re-export, motion variants

**Files:**
- Create: `frontend/src/lib/cn.ts`
- Create: `frontend/src/lib/cva.ts`
- Create: `frontend/src/lib/motion-variants.ts`

- [ ] **Step 1 : Test file first**

File: `frontend/src/__tests__/lib/cn.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("merges classes", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("handles conditional", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
  it("merges tailwind conflicts (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
```

- [ ] **Step 2 : Run test — expect fail**

Run: `pnpm test src/__tests__/lib/cn.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3 : Implement `cn`**

File: `frontend/src/lib/cn.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4 : Run test — expect pass**

Run: `pnpm test src/__tests__/lib/cn.test.ts`
Expected: PASS.

- [ ] **Step 5 : Re-export CVA**

File: `frontend/src/lib/cva.ts`

```ts
export { cva, type VariantProps } from "class-variance-authority";
```

- [ ] **Step 6 : Motion variants shared**

File: `frontend/src/lib/motion-variants.ts`

```ts
import type { Variants } from "motion/react";

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

export const staggerParent: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerChild: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
};
```

- [ ] **Step 7 : Commit**

```bash
git add -A && git commit -m "feat(lib): cn, cva, motion variants utilities with tests"
```

---

## Task 5 : i18n bootstrap (FR + EN stub)

**Files:**
- Create: `frontend/src/i18n/index.ts`
- Create: `frontend/src/i18n/locales/fr/{common,home,portfolio,project}.json`
- Create: `frontend/src/i18n/locales/en/{common,home,portfolio,project}.json`

- [ ] **Step 1 : i18n config**

File: `frontend/src/i18n/index.ts`

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonFr from "./locales/fr/common.json";
import homeFr from "./locales/fr/home.json";
import portfolioFr from "./locales/fr/portfolio.json";
import projectFr from "./locales/fr/project.json";
import commonEn from "./locales/en/common.json";
import homeEn from "./locales/en/home.json";
import portfolioEn from "./locales/en/portfolio.json";
import projectEn from "./locales/en/project.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    defaultNS: "common",
    ns: ["common", "home", "portfolio", "project"],
    resources: {
      fr: { common: commonFr, home: homeFr, portfolio: portfolioFr, project: projectFr },
      en: { common: commonEn, home: homeEn, portfolio: portfolioEn, project: projectEn },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
```

- [ ] **Step 2 : Locales FR**

File: `src/i18n/locales/fr/common.json`

```json
{
  "nav": {
    "home": "Accueil",
    "portfolio": "Portfolio",
    "bonus": "Bonus",
    "contact": "Contact"
  },
  "footer": {
    "signature": "/* fin */",
    "made_with": "Fait avec",
    "year": "© 2026 Baptiste Dechamp"
  },
  "cta": {
    "see_projects": "Voir mes projets",
    "back_home": "Retour à l'accueil",
    "read_more": "En savoir plus",
    "curriculum": "Curriculum"
  }
}
```

File: `src/i18n/locales/fr/home.json`

```json
{
  "hero": {
    "greeting_text": "Hello world,",
    "name": "je suis Baptiste",
    "subtitle": "Développeur full-stack — CDA 3e année à MyDigitalSchool Vannes. Je conçois, je code, je recommence — jusqu'à ce que l'interface ait l'air évidente."
  },
  "about": {
    "eyebrow": "// À PROPOS",
    "title": "Coup d'œil",
    "body": "Dev full-stack JS/TS avec une sensibilité produit héritée d'un parcours pluridisciplinaire. Je construis des apps web, mobile et desktop — de l'architecture à la prod — et j'aime garder la main sur toute la chaîne."
  },
  "parcours": {
    "eyebrow": "// PARCOURS",
    "title": "Mes formations"
  },
  "skills": {
    "eyebrow": "// COMPÉTENCES",
    "title": "Hard & Soft Skills",
    "hard": "Hard Skills",
    "soft": "Soft Skills"
  },
  "stack": {
    "eyebrow": "// STACK",
    "title": "Ce avec quoi je construis"
  }
}
```

File: `src/i18n/locales/fr/portfolio.json`

```json
{
  "title": "Portfolio",
  "subtitle": "Projets, expérimentations, apprentissages",
  "filters": {
    "all": "Tous",
    "web": "Web",
    "mobile": "Mobile",
    "desktop": "Desktop",
    "fullstack": "Full-stack"
  },
  "empty": "Aucun projet ne correspond à ce filtre."
}
```

File: `src/i18n/locales/fr/project.json`

```json
{
  "role": "Rôle",
  "period": "Période",
  "stack": "Stack",
  "problem": "Problématique",
  "solution": "Solution",
  "outcome": "Résultat",
  "versions": "Versions",
  "gallery": "Galerie",
  "prev": "Précédent",
  "next": "Suivant",
  "view_live": "Voir le site",
  "view_repo": "Code source"
}
```

- [ ] **Step 3 : Locales EN (stubs)**

Create each `en/*.json` with the same keys but English values. For speed, clone FR structure with English strings (e.g. `"home"` → `"Home"`, `"Voir mes projets"` → `"View my projects"`). Exact content:

File: `src/i18n/locales/en/common.json`

```json
{
  "nav": { "home": "Home", "portfolio": "Portfolio", "bonus": "Bonus", "contact": "Contact" },
  "footer": { "signature": "/* end */", "made_with": "Made with", "year": "© 2026 Baptiste Dechamp" },
  "cta": { "see_projects": "View my projects", "back_home": "Back to home", "read_more": "Learn more", "curriculum": "Curriculum" }
}
```

File: `src/i18n/locales/en/home.json`

```json
{
  "hero": { "greeting_text": "Hello world,", "name": "I'm Baptiste", "subtitle": "Full-stack developer — 3rd year CDA at MyDigitalSchool Vannes. I design, I code, I iterate — until the interface looks obvious." },
  "about": { "eyebrow": "// ABOUT", "title": "At a glance", "body": "Full-stack JS/TS developer with a product sensibility rooted in a multidisciplinary path. I build web, mobile and desktop apps — architecture to production — and I like owning the whole chain." },
  "parcours": { "eyebrow": "// JOURNEY", "title": "My education" },
  "skills": { "eyebrow": "// SKILLS", "title": "Hard & Soft Skills", "hard": "Hard Skills", "soft": "Soft Skills" },
  "stack": { "eyebrow": "// STACK", "title": "What I build with" }
}
```

File: `src/i18n/locales/en/portfolio.json`

```json
{
  "title": "Portfolio",
  "subtitle": "Projects, experiments, learnings",
  "filters": { "all": "All", "web": "Web", "mobile": "Mobile", "desktop": "Desktop", "fullstack": "Full-stack" },
  "empty": "No project matches this filter."
}
```

File: `src/i18n/locales/en/project.json`

```json
{
  "role": "Role",
  "period": "Period",
  "stack": "Stack",
  "problem": "Problem",
  "solution": "Solution",
  "outcome": "Outcome",
  "versions": "Versions",
  "gallery": "Gallery",
  "prev": "Previous",
  "next": "Next",
  "view_live": "View site",
  "view_repo": "Source code"
}
```

- [ ] **Step 4 : Update `index.html`**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1e1a15" />
    <title>Baptiste Dechamp — Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5 : Build check**

Run: `pnpm build`
Expected: success.

- [ ] **Step 6 : Commit**

```bash
git add -A && git commit -m "feat(i18n): i18next bootstrap with FR and EN namespaces"
```

---

## Task 6 : Primitive — `Container`

**Files:**
- Create: `frontend/src/components/ui/container.tsx`
- Test: `frontend/src/__tests__/components/ui/container.test.tsx`

- [ ] **Step 1 : Write failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Container } from "@/components/ui/container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container><span>hi</span></Container>);
    expect(screen.getByText("hi")).toBeInTheDocument();
  });

  it("applies size max-width class", () => {
    const { container } = render(<Container size="sm">x</Container>);
    expect(container.firstChild).toHaveClass("max-w-2xl");
  });

  it("forwards className", () => {
    const { container } = render(<Container className="custom">x</Container>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
```

- [ ] **Step 2 : Run — expect FAIL**

Run: `pnpm test container`
Expected: FAIL (module not found).

- [ ] **Step 3 : Implement**

```tsx
import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";

const containerVariants = cva("mx-auto w-full px-4 md:px-8 lg:px-12", {
  variants: {
    size: {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: { size: "lg" },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({ className, size, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size }), className)} {...props} />;
}
```

- [ ] **Step 4 : Run — expect PASS**

Run: `pnpm test container`

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat(ui): Container primitive with size variants"
```

---

## Task 7 : Primitive — `NoiseOverlay` + `AnimatedGradient`

**Files:**
- Create: `frontend/src/components/effects/noise-overlay.tsx`
- Create: `frontend/src/components/effects/animated-gradient.tsx`

- [ ] **Step 1 : NoiseOverlay**

```tsx
import { cn } from "@/lib/cn";

export function NoiseOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("noise-overlay", className)} />;
}
```

- [ ] **Step 2 : AnimatedGradient**

```tsx
import { cn } from "@/lib/cn";

type Palette = "hero" | "chaud" | "froid";
type Speed = "slow" | "normal";

const palettes: Record<Palette, string> = {
  hero: "var(--color-indigo), var(--color-pink), var(--color-cream), var(--color-indigo)",
  chaud: "oklch(85% 0.15 65), var(--color-pink), oklch(70% 0.22 25), oklch(85% 0.15 65)",
  froid: "var(--color-indigo), oklch(60% 0.2 220), var(--color-cream), var(--color-indigo)",
};

const speeds: Record<Speed, string> = {
  slow: "60s",
  normal: "40s",
};

export function AnimatedGradient({
  palette = "hero",
  speed = "normal",
  className,
}: {
  palette?: Palette;
  speed?: Speed;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: `conic-gradient(from var(--angle), ${palettes[palette]})`,
        animation: `spin-slow ${speeds[speed]} linear infinite`,
      }}
    />
  );
}
```

- [ ] **Step 3 : Smoke test**

File: `src/__tests__/components/effects/animated-gradient.test.tsx`

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AnimatedGradient } from "@/components/effects/animated-gradient";

describe("AnimatedGradient", () => {
  it("renders with default palette", () => {
    const { container } = render(<AnimatedGradient />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
});
```

Run: `pnpm test animated-gradient` → PASS.

- [ ] **Step 4 : Commit**

```bash
git add -A && git commit -m "feat(effects): NoiseOverlay and AnimatedGradient CSS-only components"
```

---

## Task 8 : Primitive — `Section`

**Files:**
- Create: `frontend/src/components/ui/section.tsx`
- Test: `frontend/src/__tests__/components/ui/section.test.tsx`

- [ ] **Step 1 : Test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Section } from "@/components/ui/section";

describe("Section", () => {
  it("renders children in a <section>", () => {
    render(<Section><p>content</p></Section>);
    expect(screen.getByText("content").closest("section")).toBeInTheDocument();
  });
  it("applies tone class", () => {
    const { container } = render(<Section tone="cream">x</Section>);
    expect(container.firstChild).toHaveClass("bg-cream");
  });
  it("includes noise overlay by default", () => {
    const { container } = render(<Section>x</Section>);
    expect(container.querySelector(".noise-overlay")).toBeTruthy();
  });
});
```

- [ ] **Step 2 : Run — expect FAIL**

- [ ] **Step 3 : Implement**

```tsx
import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";
import { NoiseOverlay } from "@/components/effects/noise-overlay";

const sectionVariants = cva("relative overflow-hidden py-20 md:py-[var(--spacing-section)]", {
  variants: {
    tone: {
      cream: "bg-cream text-bg",
      dark: "bg-bg text-fg",
      gradient: "bg-transparent text-fg",
      glass: "bg-fg/5 text-fg backdrop-blur-xl",
    },
    rounded: {
      none: "",
      xl: "rounded-[64px] max-md:rounded-[32px]",
      "2xl": "rounded-[100px] max-md:rounded-[64px] max-sm:rounded-[32px]",
    },
    overlap: {
      true: "-mt-20 max-md:-mt-10",
      false: "",
    },
  },
  defaultVariants: { tone: "dark", rounded: "none", overlap: false },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  noise?: boolean;
}

export function Section({
  className,
  tone,
  rounded,
  overlap,
  noise = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone, rounded, overlap }), className)} {...props}>
      {noise && <NoiseOverlay />}
      {children}
    </section>
  );
}
```

- [ ] **Step 4 : Run — expect PASS**

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat(ui): Section primitive with tone/rounded/overlap variants"
```

---

## Task 9 : Primitives — `Bracket`, `Label`, `Tag`, `Divider`

**Files:**
- Create: `src/components/ui/{bracket,label,tag,divider}.tsx`

- [ ] **Step 1 : Bracket**

File: `src/components/ui/bracket.tsx`

```tsx
import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";

const bracketVariants = cva("bracket select-none", {
  variants: {
    size: {
      md: "text-6xl",
      lg: "text-8xl",
      giant: "text-[var(--text-bracket)]",
    },
    float: { true: "absolute animate-[drift_8s_ease-in-out_infinite_alternate]", false: "" },
  },
  defaultVariants: { size: "md", float: false },
});

export interface BracketProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof bracketVariants> {
  side: "left" | "right";
}

export function Bracket({ side, size, float, className, ...props }: BracketProps) {
  return (
    <span aria-hidden="true" className={cn(bracketVariants({ size, float }), className)} {...props}>
      {side === "left" ? "[" : "]"}
    </span>
  );
}
```

- [ ] **Step 2 : Label (eyebrow)**

File: `src/components/ui/label.tsx`

```tsx
import { cn } from "@/lib/cn";

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefix?: "//" | "_" | "[]";
}

export function Label({ prefix = "//", className, children, ...props }: LabelProps) {
  return (
    <span
      className={cn("font-mono text-sm uppercase tracking-[0.08em] opacity-70", className)}
      {...props}
    >
      {prefix && <span className="mr-2">{prefix}</span>}
      {children}
    </span>
  );
}
```

- [ ] **Step 3 : Tag**

File: `src/components/ui/tag.tsx`

```tsx
import { cn } from "@/lib/cn";

export function Tag({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-fg/15 bg-fg/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-fg/80",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4 : Divider**

File: `src/components/ui/divider.tsx`

```tsx
import { cn } from "@/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "line" | "brackets";
}

export function Divider({ variant = "line", className, ...props }: DividerProps) {
  if (variant === "brackets") {
    return (
      <div
        aria-hidden="true"
        className={cn("flex items-center justify-center gap-4 text-fg/40", className)}
        {...props}
      >
        <span className="font-display text-2xl">[</span>
        <span className="h-px flex-1 bg-fg/20" />
        <span className="font-display text-2xl">]</span>
      </div>
    );
  }
  return <div aria-hidden="true" className={cn("h-px w-full bg-fg/20", className)} {...props} />;
}
```

- [ ] **Step 5 : Test Bracket**

File: `src/__tests__/components/ui/bracket.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Bracket } from "@/components/ui/bracket";

describe("Bracket", () => {
  it("renders left bracket", () => {
    render(<Bracket side="left" />);
    expect(screen.getByText("[")).toBeInTheDocument();
  });
  it("renders right bracket", () => {
    render(<Bracket side="right" />);
    expect(screen.getByText("]")).toBeInTheDocument();
  });
});
```

Run: `pnpm test bracket` → PASS.

- [ ] **Step 6 : Commit**

```bash
git add -A && git commit -m "feat(ui): Bracket, Label, Tag, Divider primitives"
```

---

## Task 10 : Primitive — `Button` (refait maison)

**Files:**
- Rewrite: `frontend/src/components/ui/button.tsx`
- Test: `frontend/src/__tests__/components/ui/button.test.tsx`

- [ ] **Step 1 : Test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders text", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });
  it("applies variant class", () => {
    render(<Button variant="solid-cream">x</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-cream");
  });
  it("supports asChild via Slot", () => {
    render(<Button asChild><a href="/x">link</a></Button>);
    expect(screen.getByRole("link", { name: "link" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2 : Run — expect FAIL**

- [ ] **Step 3 : Implement**

```tsx
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body font-medium transition-[transform,background,box-shadow] duration-200 ease-[var(--ease-signature)] hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "solid-dark": "bg-bg text-fg hover:shadow-lg",
        "solid-cream": "bg-cream text-bg hover:shadow-lg",
        gradient:
          "bg-[linear-gradient(135deg,var(--color-indigo),var(--color-pink))] text-fg shadow-[0_8px_24px_-8px_color-mix(in_oklch,var(--color-pink)_60%,transparent)] hover:shadow-[0_12px_32px_-8px_color-mix(in_oklch,var(--color-pink)_70%,transparent)]",
        "glass-dark": "bg-bg/10 text-bg backdrop-blur-md hover:bg-bg/20",
        "glass-cream": "bg-fg/10 text-fg backdrop-blur-md hover:bg-fg/20",
        ghost: "bg-transparent text-fg hover:bg-fg/10",
        link: "bg-transparent text-fg underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-sm",
        md: "h-11 rounded-full px-6 text-base",
        lg: "h-14 rounded-full px-8 text-lg",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "solid-dark", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
```

- [ ] **Step 4 : Run test — expect PASS**

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat(ui): Button primitive rewritten with 7 variants + asChild"
```

---

## Task 11 : Primitive — `Card`

**Files:**
- Create: `frontend/src/components/ui/card.tsx`

- [ ] **Step 1 : Implement**

```tsx
import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";

const cardVariants = cva(
  "relative overflow-hidden transition-[transform,box-shadow] duration-300 ease-[var(--ease-signature)]",
  {
    variants: {
      tone: {
        cream: "bg-cream text-bg",
        glass: "bg-fg/5 text-fg backdrop-blur-md border border-fg/10",
        outline: "bg-transparent text-fg border border-fg/20",
      },
      radius: {
        md: "rounded-[16px]",
        lg: "rounded-[32px]",
        xl: "rounded-[64px]",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-1 hover:shadow-2xl",
        false: "",
      },
    },
    defaultVariants: { tone: "glass", radius: "lg", interactive: false },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, tone, radius, interactive, ...props }: CardProps) {
  return <div className={cn(cardVariants({ tone, radius, interactive }), className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 md:p-8", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-bold tracking-[-0.015em]", className)} {...props} />;
}
```

- [ ] **Step 2 : Commit**

```bash
git add -A && git commit -m "feat(ui): Card primitive with tone/radius/interactive variants"
```

---

## Task 12 : Effect — `ScrollReveal` (CSS scroll-driven)

**Files:**
- Create: `frontend/src/components/effects/scroll-reveal.tsx`

- [ ] **Step 1 : Implement**

```tsx
import { cn } from "@/lib/cn";

type Effect = "fade" | "rise" | "slide-left" | "slide-right" | "scale";

const effectStyles: Record<Effect, React.CSSProperties> = {
  fade: { opacity: 0, animation: "rise-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
  rise: { opacity: 0, transform: "translateY(32px)", animation: "rise-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
  "slide-left": { opacity: 0, transform: "translateX(-32px)", animation: "rise-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
  "slide-right": { opacity: 0, transform: "translateX(32px)", animation: "rise-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
  scale: { opacity: 0, transform: "scale(0.96)", animation: "scale-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
};

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  effect?: Effect;
  delay?: number;
}

export function ScrollReveal({
  effect = "rise",
  delay = 0,
  className,
  style,
  ...props
}: ScrollRevealProps) {
  return (
    <div
      className={cn(className)}
      style={{ ...effectStyles[effect], animationDelay: `${delay}ms`, ...style }}
      {...props}
    />
  );
}
```

**Note:** modern browsers (Chrome 115+, Safari 26+, Firefox nightly) support `animation-timeline: view()`. Older browsers ignore the animation and show content in final state naturally (graceful degrade).

- [ ] **Step 2 : Commit**

```bash
git add -A && git commit -m "feat(effects): ScrollReveal using CSS view-timeline"
```

---

## Task 13 : Hook — `useReducedMotion`

**Files:**
- Create: `frontend/src/hooks/use-reduced-motion.ts`
- Test: `frontend/src/__tests__/hooks/use-reduced-motion.test.ts`

- [ ] **Step 1 : Test**

```ts
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

describe("useReducedMotion", () => {
  it("returns true when media query matches", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({
      matches: q.includes("reduce"),
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

- [ ] **Step 2 : Implement**

```ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 3 : Run test — PASS**

- [ ] **Step 4 : Commit**

```bash
git add -A && git commit -m "feat(hooks): useReducedMotion with media query listener"
```

---

## Task 14 : Hook — `useEyeTracking`

**Files:**
- Create: `frontend/src/hooks/use-eye-tracking.ts`

- [ ] **Step 1 : Implement**

```ts
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface EyePos {
  x: number; // -1 .. 1
  y: number; // -1 .. 1
}

export function useEyeTracking<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState<EyePos>({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    // Skip on touch devices (no hover pointer)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const handler = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const max = Math.max(rect.width, rect.height);
        setPos({
          x: Math.max(-1, Math.min(1, dx / max)),
          y: Math.max(-1, Math.min(1, dy / max)),
        });
      });
    };
    window.addEventListener("pointermove", handler);
    return () => {
      window.removeEventListener("pointermove", handler);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return { ref, pos };
}
```

- [ ] **Step 2 : Commit**

```bash
git add -A && git commit -m "feat(hooks): useEyeTracking with rAF throttle and pointer-coarse skip"
```

---

## Task 15 : Composant `Cody` v2 — expressif, beefier, 2 variantes

**Design reference :** prototype Claude Design v2 (filled cream face + brackets épais + sourcils/bouche expressifs par mood + blush happy + brackets statiques).

**Files:**
- Create: `frontend/src/components/cody/cody.tsx`
- Create: `frontend/src/components/cody/mouse-context.tsx`

- [ ] **Step 1 : MouseContext global**

File: `src/components/cody/mouse-context.tsx`

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface MouseState { clientX: number; clientY: number; x: number; y: number }

const MouseCtx = createContext<MouseState>({ clientX: 0, clientY: 0, x: 0.5, y: 0.5 });

export const useMouseCtx = () => useContext(MouseCtx);

export function MouseProvider({ children }: { children: ReactNode }) {
  const [m, setM] = useState<MouseState>({ clientX: 0, clientY: 0, x: 0.5, y: 0.5 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const handler = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setM({
          clientX: e.clientX,
          clientY: e.clientY,
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      });
    };
    window.addEventListener("pointermove", handler);
    return () => { window.removeEventListener("pointermove", handler); cancelAnimationFrame(raf); };
  }, []);
  return <MouseCtx.Provider value={m}>{children}</MouseCtx.Provider>;
}
```

- [ ] **Step 2 : Cody v2**

File: `src/components/cody/cody.tsx`

```tsx
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useMouseCtx } from "./mouse-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type CodyMood = "idle" | "curious" | "happy" | "confused" | "thinking";
export type CodyVariant = "portfolio" | "bracket";

export interface CodyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  mood?: CodyMood;
  variant?: CodyVariant;
  size?: number;
}

const mouthByMood: Record<CodyMood, string> = {
  idle:     "M 72 128 Q 100 140 128 128",
  curious:  "M 70 128 Q 100 150 130 128",
  happy:    "M 60 120 Q 100 165 140 120",
  confused: "M 70 138 Q 85 124 100 138 Q 115 152 130 138",
  thinking: "M 76 134 L 124 134",
};

const browsByMood: Record<CodyMood, { l: string; r: string }> = {
  idle:     { l: "M 52 56 L 72 50 L 82 58", r: "M 118 58 L 128 50 L 148 56" },
  curious:  { l: "M 52 60 L 72 48 L 82 58", r: "M 118 58 L 128 48 L 148 60" },
  happy:    { l: "M 52 62 Q 68 50 82 62",   r: "M 118 62 Q 132 50 148 62" },
  confused: { l: "M 52 50 L 72 62 L 82 54", r: "M 118 54 L 128 62 L 148 50" },
  thinking: { l: "M 52 58 L 82 54",         r: "M 118 54 L 148 58" },
};

export function Cody({
  mood = "curious",
  variant = "bracket",
  size = 300,
  className,
  ...props
}: CodyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftEyeRef = useRef<SVGGElement | null>(null);
  const rightEyeRef = useRef<SVGGElement | null>(null);
  const mouse = useMouseCtx();
  const reduce = useReducedMotion();
  const [blink, setBlink] = useState(false);

  // Random blink loop
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = 2500 + Math.random() * 3500;
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, delay);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  // Eye tracking from global MouseCtx (per-eye rect)
  useEffect(() => {
    if (reduce) return;
    const apply = (eyeEl: SVGGElement | null) => {
      if (!eyeEl) return;
      const r = eyeEl.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = mouse.clientX - cx;
      const dy = mouse.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const radius = Math.min(r.width, r.height) * 0.22;
      const nx = (dx / dist) * Math.min(radius, dist / 30);
      const ny = (dy / dist) * Math.min(radius, dist / 30);
      eyeEl.style.setProperty("--ex", `${nx.toFixed(2)}px`);
      eyeEl.style.setProperty("--ey", `${ny.toFixed(2)}px`);
    };
    apply(leftEyeRef.current);
    apply(rightEyeRef.current);
  }, [mouse.clientX, mouse.clientY, reduce]);

  const filled = variant === "portfolio";
  const strokeColor = filled ? "var(--color-bg)" : "currentColor";
  const mouth = mouthByMood[mood];
  const brows = browsByMood[mood];

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      style={{ width: size, aspectRatio: "1 / 0.85" }}
      {...props}
    >
      <svg viewBox="0 0 200 170" width="100%" height="100%" aria-hidden="true" style={{ overflow: "visible" }}>
        {filled && (
          <rect x="20" y="18" width="160" height="136" rx="36" fill="var(--color-cream)" stroke="var(--color-bg)" strokeWidth="7" />
        )}
        {/* Brackets (STATIC — no drift) */}
        <path d="M 32 16 L 10 16 L 10 154 L 32 154" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 168 16 L 190 16 L 190 154 L 168 154" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

        {/* Brows */}
        <path d={brows.l} fill="none" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d={brows.r} fill="none" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

        {/* Eyes */}
        <g>
          <g ref={leftEyeRef} style={{ transform: "translate(var(--ex,0), var(--ey,0))", transition: "transform 90ms linear" }}>
            <circle cx="70" cy="92" r="16" fill={filled ? "var(--color-cream)" : "none"} stroke={strokeColor} strokeWidth="7" style={{ transformBox: "fill-box", transformOrigin: "center", transform: blink ? "scaleY(0.1)" : "scaleY(1)", transition: "transform 90ms ease" }} />
            <circle cx="70" cy="92" r="5.5" fill={strokeColor} style={{ transform: "translate(var(--ex,0), var(--ey,0))" }} />
          </g>
          <g ref={rightEyeRef} style={{ transform: "translate(var(--ex,0), var(--ey,0))", transition: "transform 90ms linear" }}>
            <circle cx="130" cy="92" r="16" fill={filled ? "var(--color-cream)" : "none"} stroke={strokeColor} strokeWidth="7" style={{ transformBox: "fill-box", transformOrigin: "center", transform: blink ? "scaleY(0.1)" : "scaleY(1)", transition: "transform 90ms ease" }} />
            <circle cx="130" cy="92" r="5.5" fill={strokeColor} style={{ transform: "translate(var(--ex,0), var(--ey,0))" }} />
          </g>
        </g>

        {/* Blush — only when happy */}
        {mood === "happy" && (
          <g opacity="0.55">
            <ellipse cx="52" cy="118" rx="9" ry="5" fill="var(--color-pink)" />
            <ellipse cx="148" cy="118" rx="9" ry="5" fill="var(--color-pink)" />
          </g>
        )}

        {/* Mouth */}
        <path d={mouth} fill="none" stroke={strokeColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 3 : Wire `MouseProvider` at App root**

Add in `App.tsx` :

```tsx
import { MouseProvider } from "./components/cody/mouse-context";

function App() {
  return (
    <MouseProvider>
      <BrowserRouter>
        <NavBar />
        <main className="pt-24">
          <AnimatedRoutes />
        </main>
      </BrowserRouter>
    </MouseProvider>
  );
}
```

- [ ] **Step 4 : Remove `useEyeTracking` hook** (obsolete — replaced by MouseCtx consumption inside Cody)

```bash
rm src/hooks/use-eye-tracking.ts src/__tests__/hooks/use-eye-tracking.test.ts 2>/dev/null || true
```

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat(cody): v2 beefier Cody with expressive brows/mouth, blush, MouseProvider global"
```

---

## Task 16 : `UpArrow` réécrit (scroll-timeline CSS pur)

**Files:**
- Rewrite: `frontend/src/components/ui/up-arrow.tsx`

- [ ] **Step 1 : Implement**

```tsx
import { Button } from "./button";

export function UpArrow() {
  return (
    <Button
      variant="glass-cream"
      size="icon"
      aria-label="Retour en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 opacity-0"
      style={{
        animation: "rise-in linear both",
        animationTimeline: "scroll(root)",
        animationRange: "20vh 40vh",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  );
}
```

- [ ] **Step 2 : Commit**

```bash
git add -A && git commit -m "feat(ui): UpArrow with CSS scroll-timeline visibility"
```

---

## Task 17 : Data — `projects.ts`, `skills.ts`, `formations.ts`, `stack.ts`

> **IMPORTANT — profil réel** : Baptiste est **dev full-stack** en **3e année du titre CDA (Concepteur Développeur d'Applications, RNCP 6)** à MyDigitalSchool Vannes. Positionnement **dev-first**, avec compétences conception d'app et design secondaires. Ne PAS afficher "Mastère Design" ou présenter comme designer.

**Files:**
- Create: `frontend/src/data/projects.ts`
- Create: `frontend/src/data/skills.ts`
- Create: `frontend/src/data/formations.ts`
- Create: `frontend/src/data/stack.ts`

- [ ] **Step 1 : Types + projects**

File: `src/data/projects.ts`

```ts
export type ProjectType = "web" | "mobile" | "desktop" | "fullstack";
export type ProjectStatus = "live" | "archived" | "wip";

export interface ProjectVersion {
  label: string;
  stack: string[];
  note: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  period: string;
  stack: string[];
  type: ProjectType;
  status: ProjectStatus;
  thumbnail: { kind: "gradient"; palette: "hero" | "chaud" | "froid" } | { kind: "image"; src: string };
  links?: { live?: string; repo?: string; figma?: string };
  versions?: ProjectVersion[];
  screenshots?: string[];
  problem?: string;
  solution?: string;
  outcome?: string;
}

// Ordre = ordre d'affichage (dev-first).
export const projects: Project[] = [
  {
    id: "amigaru",
    title: "Amigaru",
    tagline: "Trois vies d'un même produit, trois stacks.",
    description:
      "Site d'agence pour VTubers francophones, pensé comme un terrain d'évolution technique. v1 PHP/MySQL/Tailwind pour valider le concept, v2 React + Vite pour un front réactif, v3 Next.js avec dashboard pro et design system documenté sur Storybook.",
    role: "Lead développeur",
    period: "2023 — 2025",
    stack: ["Next.js", "React", "TypeScript", "Storybook", "Tailwind", "PHP"],
    type: "fullstack",
    status: "live",
    thumbnail: { kind: "gradient", palette: "hero" },
    versions: [
      { label: "v1 — MVP", stack: ["PHP", "MySQL", "Tailwind", "jQuery"], note: "Preuve de concept, solo dev, focus sur les flux métier." },
      { label: "v2 — SPA", stack: ["React", "Vite", "Tailwind"], note: "Passage au front réactif, API séparée, premiers composants partagés." },
      { label: "v3 — Prod", stack: ["Next.js", "TypeScript", "Storybook"], note: "App-router, design system documenté, dashboard interne." },
    ],
    problem: "Une idée qui n'a cessé de grandir ; chaque montée en ambition a poussé la stack à évoluer.",
    solution: "Trois versions successives sans tout jeter — chaque itération résout un problème précis.",
    outcome: "v3 en production, codebase qui incarne un vrai parcours d'apprentissage, sert de vitrine technique.",
  },
  {
    id: "stream-dashboard",
    title: "Stream Dashboard",
    tagline: "Poste de pilotage desktop pour streameurs.",
    description:
      "Application desktop cross-platform (Electron) pour streameurs : overlays personnalisables, alertes temps réel, statistiques, intégrations Twitch/YouTube. Architecture React + Vite + Tailwind embarquée, persistance locale.",
    role: "Développeur principal",
    period: "2025",
    stack: ["Electron", "React", "Vite", "Tailwind", "TypeScript", "Node"],
    type: "desktop",
    status: "wip",
    thumbnail: { kind: "gradient", palette: "chaud" },
    problem: "Les outils streameurs sont dispersés entre OBS, plateformes web et scripts — pas de cockpit unifié.",
    solution: "App Electron centralisant overlays, alertes et stats dans une UI moderne et rapide.",
    outcome: "En développement — MVP fonctionnel avec alertes Twitch et overlay config.",
  },
  {
    id: "seira-like",
    title: "App Éducative",
    tagline: "Plateforme pédagogique cross-plateforme.",
    description:
      "Inspirée de Seira, plateforme éducative interactive. Web en Angular, mobile en Expo/React Native, backend Laravel pour API et auth. Démonstration de la capacité à orchestrer plusieurs écosystèmes sur un même produit.",
    role: "Développeur fullstack",
    period: "2025",
    stack: ["Angular", "Expo", "React Native", "Laravel", "PHP", "MySQL", "TypeScript"],
    type: "fullstack",
    status: "wip",
    thumbnail: { kind: "gradient", palette: "froid" },
    problem: "Proposer une expérience éducative cohérente web + mobile avec un back solide.",
    solution: "Stack multi-plateforme : Angular (web), Expo/RN (mobile), Laravel (API et auth).",
    outcome: "En construction — architecture validée, API opérationnelle.",
  },
  {
    id: "devflix",
    title: "DevFlix",
    tagline: "Clone Netflix pédagogique — streaming de cours.",
    description:
      "Exercice d'école : réinventer une interface streaming pour du contenu technique. UI inspirée de la VOD mais pensée pour du cours court — rangées thématiques, player sticky, progression par piste.",
    role: "Développeur front",
    period: "Juin 2024",
    stack: ["React", "Vite", "Node", "Firebase", "TMDB API", "Tailwind"],
    type: "fullstack",
    status: "archived",
    thumbnail: { kind: "gradient", palette: "hero" },
    problem: "Exercice d'école : réinventer une interface streaming pour du contenu technique.",
    solution: "UI VOD adaptée au cours court, rangées thématiques, player sticky.",
    outcome: "Livré en 10 jours, 18/20, repris en portfolio.",
  },
  {
    id: "erwan-ewen",
    title: "Erwan & Ewen",
    tagline: "E-commerce WordPress pour cavistes bretons.",
    description:
      "Catalogue et boutique montés vite pour une marque fictive, éditable par des non-devs. WordPress + Kadence, maquette Figma en amont pour verrouiller la hiérarchie, blocs custom pour les fiches produits.",
    role: "Intégrateur WordPress",
    period: "Novembre 2024",
    stack: ["WordPress", "Kadence", "Figma", "WinSCP"],
    type: "web",
    status: "live",
    thumbnail: { kind: "gradient", palette: "chaud" },
  },
  // --- Projets à tonalité design/conception (secondaires dans l'affichage) ---
  {
    id: "g-en",
    title: "G-En",
    tagline: "Inclusion intergénérationnelle en B2B.",
    description:
      "Solution B2B favorisant la cohésion intergénérationnelle en entreprise. Plateforme collaborative + module de formation, parcours double (RH / collaborateurs), interviews terrain pour valider le problème.",
    role: "UX Designer / Concepteur",
    period: "Janvier 2025",
    stack: ["Figma", "Adobe XD", "Recherche UX"],
    type: "design",
    status: "archived",
    thumbnail: { kind: "gradient", palette: "froid" },
    outcome: "Prototype cliquable, dossier marketing complet, concept validé en jury.",
  },
  {
    id: "festival-vibrations",
    title: "Festival Vibrations",
    tagline: "Identité visuelle et site pour un festival.",
    description:
      "Direction inspirée des ondes sonores, palette vive contre fond profond, typographie découpée. Le site prolonge l'affiche plutôt que l'inverse.",
    role: "Designer graphique",
    period: "Octobre 2024",
    stack: ["Illustrator", "Photoshop", "Figma"],
    type: "design",
    status: "archived",
    thumbnail: { kind: "gradient", palette: "hero" },
  },
  {
    id: "vannes-agglo",
    title: "Vannes Agglo",
    tagline: "Marketing de territoire pour étudiants.",
    description:
      "Déclinaison jeune d'une identité institutionnelle : typographie plus directe, accents vifs, tunnel clair (arriver → s'installer → économiser).",
    role: "Chef de projet · UX/UI",
    period: "Mars 2024",
    stack: ["Figma", "Photoshop", "Marketing digital"],
    type: "design",
    status: "archived",
    thumbnail: { kind: "gradient", palette: "chaud" },
  },
];
```

- [ ] **Step 2 : Skills**

File: `src/data/skills.ts`

```ts
// Pas de level/barre — juste une liste groupée. Ordre = priorité affichage (dev-first).
export type SkillGroup = "Dev" | "Conception" | "Design" | "Outils";

export const hardSkills: Record<SkillGroup, string[]> = {
  Dev: [
    "TypeScript",
    "React / React Native",
    "Next.js",
    "Tailwind",
    "Node.js",
    "Laravel / PHP",
    "Angular",
    "SQL / Supabase",
  ],
  Conception: ["Architecture", "Modélisation", "Accessibilité / Perf"],
  Design: ["Figma", "UX/UI", "Illustrator"],
  Outils: ["Git / CI", "Storybook", "pnpm", "Vercel"],
};

// Soft skills : cards numérotées 01..04, pas de notes quantifiées.
export const softSkills = [
  { label: "Adaptabilité",     note: "Je bascule vite entre stacks et rôles sans friction." },
  { label: "Esprit d'analyse", note: "Je décortique un problème avant d'écrire du code." },
  { label: "Écoute",           note: "Je reformule plus que je n'impose." },
  { label: "Contexte",         note: "Je cherche le « pourquoi » avant le « comment »." },
];
```

- [ ] **Step 3 : Formations**

File: `src/data/formations.ts`

```ts
export interface Formation {
  year: string;
  title: string;
  school: string;
  note?: string;
}

export const formations: Formation[] = [
  {
    year: "2023 →",
    title: "Titre CDA — Concepteur Développeur d'Applications",
    school: "MyDigitalSchool Vannes",
    note: "3e année en cours. RNCP niveau 6. Full-stack JS/TS, conception applicative, DevOps.",
  },
  {
    year: "2022 — 2023",
    title: "BTS SIO — Option SLAM",
    school: "Services Informatiques aux Organisations",
    note: "Solutions logicielles et applications métier.",
  },
  {
    year: "2021 — 2022",
    title: "L1 Arts Plastiques",
    school: "Université Rennes 2",
    note: "Sémiotique visuelle, pratique plastique — fondation de la sensibilité produit.",
  },
];
```

- [ ] **Step 4 : Stack**

File: `src/data/stack.ts`

```ts
export const stackItems = [
  { label: "Vite", category: "tooling" },
  { label: "VoidZero", category: "tooling" },
  { label: "pnpm", category: "tooling" },
  { label: "React 19", category: "frontend" },
  { label: "Next.js 16", category: "frontend" },
  { label: "Angular", category: "frontend" },
  { label: "Tailwind 4", category: "frontend" },
  { label: "TypeScript", category: "frontend" },
  { label: "Expo", category: "mobile" },
  { label: "React Native", category: "mobile" },
  { label: "Electron", category: "desktop" },
  { label: "Laravel", category: "backend" },
  { label: "PHP", category: "backend" },
  { label: "Node", category: "backend" },
  { label: "Supabase", category: "data" },
  { label: "Vercel", category: "infra" },
  { label: "Storybook", category: "tooling" },
  { label: "Figma", category: "design" },
];
```

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat(data): projects, skills, formations, stack with Amigaru 3 versions"
```

---

## Task 18 : Composants `NavBar` + `MobileMenu`

**Files:**
- Rewrite: `frontend/src/components/nav/navbar.tsx`
- Create: `frontend/src/components/nav/mobile-menu.tsx`
- Delete: `frontend/src/components/Navbar.tsx`

- [ ] **Step 1 : NavBar**

File: `src/components/nav/navbar.tsx`

```tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/cn";

export function NavBar() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/portfolio", label: t("nav.portfolio") },
    { to: "/bonus", label: t("nav.bonus") },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-md bg-bg/60 border-b border-fg/10">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="font-mono text-lg font-bold tracking-tight">
            _baptiste
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn("font-body text-sm transition-opacity", isActive ? "opacity-100" : "opacity-60 hover:opacity-100")
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button size="sm" variant="solid-cream" asChild>
              <a href="mailto:baptiste.dechamp@tomexplore.com">{t("nav.contact")}</a>
            </Button>
          </div>
          <button
            className="md:hidden font-mono text-sm"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            [menu]
          </button>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
```

- [ ] **Step 2 : MobileMenu**

File: `src/components/nav/mobile-menu.tsx`

```tsx
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { staggerChild, staggerParent } from "@/lib/motion-variants";

interface Props {
  open: boolean;
  onClose: () => void;
  links: { to: string; label: string }[];
}

export function MobileMenu({ open, onClose, links }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-bg flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex h-16 items-center justify-end px-4">
            <button className="font-mono text-sm" aria-label="Fermer" onClick={onClose}>
              [close]
            </button>
          </div>
          <motion.ul
            className="flex flex-1 flex-col items-center justify-center gap-8"
            variants={staggerParent}
            initial="initial"
            animate="animate"
          >
            {links.map((l) => (
              <motion.li key={l.to} variants={staggerChild}>
                <Link to={l.to} onClick={onClose} className="font-display text-5xl font-black">
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3 : Remove old Navbar**

```bash
rm src/components/Navbar.tsx
```

- [ ] **Step 4 : Update `App.tsx`** (new import path)

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/nav/navbar";
import Accueil from "./pages/Accueil";
import Portfolio from "./pages/Portfolio";
import ProjectPage from "./pages/ProjectPage";
import Bonus from "./pages/Bonus";
import NotFound from "./pages/404";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectPage />} />
          <Route path="/bonus" element={<Bonus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "feat(nav): rewrite NavBar + MobileMenu with i18n and new structure"
```

---

## Task 19 : `Footer` réécrit

**Files:**
- Rewrite: `frontend/src/components/footer.tsx`
- Delete: `frontend/src/components/Footer.tsx`

- [ ] **Step 1 : Implement**

```tsx
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Cody } from "@/components/cody/cody";
import { Divider } from "@/components/ui/divider";

export function Footer() {
  const { t } = useTranslation("common");
  return (
    <footer className="relative bg-bg text-fg py-20">
      <Container size="lg">
        <Divider variant="brackets" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">// Liens</p>
            <ul className="mt-4 space-y-2">
              <li><Link to="/">{t("nav.home")}</Link></li>
              <li><Link to="/portfolio">{t("nav.portfolio")}</Link></li>
              <li><Link to="/bonus">{t("nav.bonus")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">// Contact</p>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:baptiste.dechamp@tomexplore.com">Email</a></li>
              <li><a href="https://github.com/BaptisteLeDev" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="flex md:justify-end">
            <Cody variant="bonus" mood="happy" size={120} />
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between text-xs opacity-60 font-mono">
          <span>{t("footer.year")}</span>
          <span>{t("footer.signature")}</span>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2 : Delete old + update imports**

```bash
rm src/components/Footer.tsx
```

Update any remaining imports from `../components/Footer` to `../components/footer` in pages.

- [ ] **Step 3 : Commit**

```bash
git add -A && git commit -m "feat(footer): rewritten with Cody + i18n"
```

---

## Task 19.5 : Effects — `Typewriter` + `FluidBlobs`

**Files:**
- Create: `frontend/src/components/effects/typewriter.tsx`
- Create: `frontend/src/components/effects/fluid-blobs.tsx`
- Modify: `frontend/src/styles/keyframes.css` (add fluid-morph + caret-blink)

- [ ] **Step 1 : Add keyframes**

Append to `src/styles/keyframes.css` :

```css
@keyframes caret-blink {
  50% { opacity: 0; }
}

@keyframes fluid-morph {
  0%, 100% { transform: translate3d(0,0,0) scale(1) rotate(0deg); }
  25%      { transform: translate3d(3%,-2%,0) scale(1.08) rotate(8deg); }
  50%      { transform: translate3d(-2%,3%,0) scale(0.95) rotate(-6deg); }
  75%      { transform: translate3d(-3%,-1%,0) scale(1.05) rotate(4deg); }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.85); }
}
```

Add `@utility` in `src/styles/index.css` :

```css
@utility fluid-blobs {
  position: absolute;
  inset: -10%;
  pointer-events: none;
  z-index: 1;
  filter: blur(60px) saturate(1.3);
  opacity: 0.85;
}

@utility mask-fade-x {
  -webkit-mask-image: linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%);
}
```

- [ ] **Step 2 : Typewriter**

File: `src/components/effects/typewriter.tsx`

```tsx
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  caret?: boolean;
}

export function Typewriter({ text, speed = 45, startDelay = 200, caret = true }: TypewriterProps) {
  const [shown, setShown] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setShown(text); return; }
    setShown("");
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => { clearTimeout(start); if (id!) clearInterval(id); };
  }, [text, speed, startDelay, reduce]);

  return (
    <>
      {shown}
      {caret && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "0.06em",
            height: "0.9em",
            marginLeft: "0.04em",
            verticalAlign: "-0.08em",
            background: "currentColor",
            animation: "caret-blink 1s steps(2) infinite",
          }}
        />
      )}
    </>
  );
}
```

- [ ] **Step 3 : FluidBlobs**

File: `src/components/effects/fluid-blobs.tsx`

```tsx
import { cn } from "@/lib/cn";

export function FluidBlobs({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("fluid-blobs", className)}>
      <style>{`
        .fluid-blobs::before,
        .fluid-blobs::after {
          content: "";
          position: absolute; inset: 0;
          background:
            radial-gradient(circle at 20% 30%, color-mix(in oklch, var(--color-indigo) 70%, transparent) 0 20%, transparent 40%),
            radial-gradient(circle at 75% 65%, color-mix(in oklch, var(--color-pink) 55%, transparent) 0 18%, transparent 38%),
            radial-gradient(circle at 50% 90%, color-mix(in oklch, var(--color-indigo) 55% dkcn transparent) 0 20%, transparent 42%),
            radial-gradient(circle at 85% 15%, color-mix(in oklch, var(--color-pink) 60%, transparent) 0 15%, transparent 35%);
          animation: fluid-morph 22s ease-in-out infinite;
        }
        .fluid-blobs::after {
          animation-duration: 32s;
          animation-direction: reverse;
          opacity: 0.7;
          mix-blend-mode: screen;
        }
      `}</style>
    </div>
  );
}
```

**Note:** since Tailwind 4 doesn't support pseudo-elements on `@utility` easily with gradient backgrounds, the `::before`/`::after` CSS is inlined via `<style>` scoped to the component. Alternative : move into `keyframes.css` as plain CSS class. Pick the one that feels cleaner in the codebase.

- [ ] **Step 4 : Commit**

```bash
git add -A && git commit -m "feat(effects): Typewriter and FluidBlobs components"
```

---

## Task 20 : `Hero` composable

**Files:**
- Create: `frontend/src/components/hero/hero.tsx`

- [ ] **Step 1 : Implement**

```tsx
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import { FluidBlobs } from "@/components/effects/fluid-blobs";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { Typewriter } from "@/components/effects/typewriter";
import { Cody } from "@/components/cody/cody";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center rounded-b-[100px] max-md:rounded-b-[64px] px-8 py-28">
      <AnimatedGradient palette="hero" />
      <FluidBlobs />
      <NoiseOverlay />
      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center gap-12">
          <div>
            {/* Terminal prompt */}
            <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-70 mb-5">
              ~/baptiste-dev $ run hello.tsx
            </p>

            {/* Typewriter headline */}
            <h1
              className="font-display font-black leading-[0.88] tracking-[-0.045em] text-balance"
              style={{ fontSize: "var(--text-display-xxl)" }}
            >
              <span className="opacity-55">_</span>
              <Typewriter text={t("hero.greeting_text")} speed={55} startDelay={300} caret={false} />
              <br />
              je&nbsp;suis{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, var(--color-cream) 0%, color-mix(in oklch, var(--color-pink) 60%, var(--color-cream)) 100%)",
                }}
              >
                <Typewriter text="Baptiste." speed={80} startDelay={1100} />
              </span>
            </h1>

            <p className="mt-7 max-w-[48ch] text-lg md:text-xl opacity-88">
              {t("hero.subtitle")}
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/portfolio">{tc("cta.see_projects")} →</Link>
              </Button>
              <Button variant="glass-cream" size="lg" asChild>
                <Link to="/bonus">{tc("cta.curriculum")}</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center text-fg">
            <Cody mood="curious" variant="portfolio" size={380} />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

**i18n update required** : in `src/i18n/locales/fr/home.json`, replace `greeting` key with `greeting_text` set to `"Hello world,"` (without the underscore prefix — it's rendered separately in the JSX). Same in EN.

Add to `common.json` `cta`: `"curriculum": "Curriculum"`.

- [ ] **Step 2 : Commit**

```bash
git add -A && git commit -m "feat(hero): composable Hero with animated gradient + Cody"
```

---

## Task 21 : `ProjectCard` + `ProjectFilters`

**Files:**
- Create: `frontend/src/components/portfolio/project-card.tsx`
- Create: `frontend/src/components/portfolio/project-filters.tsx`

- [ ] **Step 1 : ProjectCard**

```tsx
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { AnimatedGradient } from "@/components/effects/animated-gradient";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/portfolio/${project.id}`} className="block">
      <Card tone="glass" radius="lg" interactive>
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.thumbnail.kind === "gradient" ? (
            <AnimatedGradient palette={project.thumbnail.palette} />
          ) : (
            <img src={project.thumbnail.src} alt="" className="size-full object-cover" />
          )}
          <div className="absolute inset-0 bg-bg/30" />
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            {project.stack.slice(0, 3).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
        <CardBody>
          <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60 mb-2">
            // {project.type}
          </p>
          <CardTitle>{project.title}</CardTitle>
          <p className="mt-2 opacity-80 text-sm">{project.tagline}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2 : ProjectFilters**

```tsx
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { ProjectType } from "@/data/projects";

type Filter = "all" | ProjectType;

export function ProjectFilters({
  active,
  onChange,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
}) {
  const { t } = useTranslation("portfolio");
  const filters: Filter[] = ["all", "web", "mobile", "desktop", "fullstack"];
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <Button
          key={f}
          size="sm"
          variant={active === f ? "solid-cream" : "glass-cream"}
          onClick={() => onChange(f)}
        >
          {t(`filters.${f}`)}
        </Button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3 : Commit**

```bash
git add -A && git commit -m "feat(portfolio): ProjectCard and ProjectFilters components"
```

---

## Task 22 : Phase 1 Gate — build + test + lint verts

- [ ] **Step 1 : Run all checks**

```bash
pnpm lint
pnpm format:check || pnpm format
pnpm test
pnpm build
```

All must be green. If lint fails on old page code, that's expected — pages are still old and will be replaced in Phase 2. You can add `pages/` to `oxlint.json` `ignorePatterns` temporarily:

```json
"ignorePatterns": ["dist", "node_modules", "*.config.*", "src/pages/**"]
```

- [ ] **Step 2 : Dev server smoke**

Run: `pnpm dev`
Open localhost, verify:
- Page charges (même si pages pas refaites)
- NavBar affichée
- Console sans erreur JS critique

- [ ] **Step 3 : Commit gate marker**

```bash
git commit --allow-empty -m "chore: phase 1 foundation gate passed"
```

---

# PHASE 2 — PAGES SWEEP (parallèle via sub-agents)

> **Instructions for executor:** Use `superpowers:dispatching-parallel-agents` skill. Dispatch these 4 sub-agents **in parallel** (single message, multiple Agent tool calls). Each agent works in the same branch on **disjoint files** (different page). Coordinate before merging.

**Shared context every sub-agent MUST receive:**
- This plan file path
- Design spec path
- Phase 1 primitives are **available** under `@/components/ui/*`, `@/components/effects/*`, `@/components/cody`, `@/components/hero`, `@/components/nav`, `@/components/portfolio`
- Data available at `@/data/{projects,skills,formations,stack}`
- i18n namespaces ready: `common`, `home`, `portfolio`, `project`
- Use `framer-motion` ONLY if explicitly needed; prefer CSS + ScrollReveal
- Must run `pnpm lint && pnpm build && pnpm test` green before committing
- Must commit with conventional commits (`feat(page-name):`, etc.)

> **Insights visuels du prototype Claude Design à appliquer** (cf. spec §15.5) :
> - Gradient hero = **3 couches** (2 radial ellipses + 1 conic animé) + vignette radial overlay — pas un simple conic
> - `MouseProvider` context global à monter dans `App.tsx` pour Cody tracking partout
> - Marquee stack (bande défilante avec mask linear-gradient)
> - Pulse dot sur projets `status: "live"`
> - Scrollbar custom + `::selection` colorée
> - `useEyeTracking` doit consommer le `MouseContext` (pas son propre `pointermove`) — refactor à prévoir
> - Prévoir un gradient component plus riche : `<AnimatedGradient palette="hero" layers="full" />` avec variantes

## Agent A — Page Accueil

**Files:**
- Rewrite: `frontend/src/pages/Accueil.tsx`

**Contract:**

Structure attendue (utilise **exclusivement** les primitives Phase 1) :

1. `<Hero />` — Hero avec sous-titre exact : **"Développeur full-stack — CDA 3e année à MyDigitalSchool Vannes"**
2. `<Section tone="cream" rounded="2xl" overlap>` — À propos (pitch **dev-first** : "Dev full-stack JS/TS avec une sensibilité produit. Je construis des apps web, mobile et desktop, de l'architecture à la prod.")
   - `<Container size="md">` centré
   - `<Label prefix="//">` : `t('home.about.eyebrow')`
   - `<Bracket side="left" size="giant" float />` + `<Bracket side="right" size="giant" float />` positionnés absolute aux coins
   - `<h2>` : `t('home.about.title')` — `text-[var(--text-h1)]` `font-black`
   - `<p>` : `t('home.about.body')` — `text-xl`
   - Wrapped in `<ScrollReveal effect="rise">`
3. `<Section tone="gradient" rounded="2xl" overlap>` — Parcours
   - `<AnimatedGradient palette="chaud" />` en background
   - Label + H2 (`t('home.parcours.*')`)
   - Grid 3 cols md (`grid-cols-1 md:grid-cols-3 gap-6`) avec `formations` mappées dans des `<Card tone="glass" radius="lg">`
   - Chaque Card : year en `<Label>`, title en `<CardTitle>`, school en `<p>`
4. `<Section tone="cream" rounded="none" overlap>` — Compétences (PLAT, pas de grand radius — alternance)
   - Label + H2 (`t('home.skills.*')`) "Hard & Soft Skills."
   - Grid 2 cols (1.2fr / 1fr) : Hard (gauche) / Soft (droite)
   - **Hard — liste groupée, PAS de barres, PAS de levels** : pour chaque groupe dans `hardSkills` (Dev, Conception, Design, Outils), un mini-titre mono uppercase + liste de `<Tag>` flex-wrap
   - **Soft — 4 cards numérotées 01/02/03/04** : `<div>` avec header flex (label `<span font-bold text-lg>` + numéro mono opacity-50) + note `<p opacity-85>`
5. `<StackMarquee />` — section bg-bg, display font 900 géant
   - Label + H2 "Ce que j'utilise, aujourd'hui."
   - Duplique `stackItems` 2× pour loop seamless
   - Track avec `animation: marquee 40s linear infinite`, `mask-fade-x` sur container, alternance couleurs pink/cream/muted, séparateurs `·`
6. CTA final avec Cody happy vers Portfolio

**Alternance radius** : sections 1 (Hero), 3 (Parcours) avec `rounded-[100px]` (class `rounded="2xl"`) ; sections 2 (About), 4 (Skills), 5 (Marquee) PLATES (`rounded="none"`).

**Constraints :**
- Aucun `<img>` pour les backgrounds / décorations
- Tout texte via `useTranslation`
- Responsive mobile-first : Cody masqué < md dans Hero, grids collapse à 1 col < md

**Gate :** build vert, page visuellement cohérente dev server.

---

## Agent B — Page Portfolio

**Files:**
- Rewrite: `frontend/src/pages/Portfolio.tsx`

**Contract:**

```tsx
// skeleton
const Portfolio = () => {
  const { t } = useTranslation("portfolio");
  const [filter, setFilter] = useState<"all" | ProjectType>("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <Section tone="dark" rounded="none">
        <Container size="xl">
          <Label>// PORTFOLIO</Label>
          <h1 className="..."> {t("title")} </h1>
          <p className="..."> {t("subtitle")} </p>
          <div className="mt-10">
            <ProjectFilters active={filter} onChange={setFilter} />
          </div>
        </Container>
      </Section>
      <Section tone="cream" rounded="2xl" overlap>
        <Container size="xl">
          {filtered.length === 0 ? (
            <p>{t("empty")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </Container>
      </Section>
      <Footer />
    </>
  );
};
```

**Constraints :**
- `ProjectCard` + `ProjectFilters` imported from `@/components/portfolio/*`
- Titre grand display style (`text-[var(--text-display-xl)] font-black`)
- Filter state local avec `useState`
- Grid responsive 1/2/3

---

## Agent C — Page ProjectPage (détail)

**Files:**
- Rewrite: `frontend/src/pages/ProjectPage.tsx`

**Contract:**

Utilise `useParams` pour récupérer `id`, trouve le projet dans `projects`, 404 si pas trouvé.

Structure :
1. **Hero projet** — `<Section tone="gradient" rounded="none">` avec `AnimatedGradient` palette du thumbnail (si gradient) sinon chaud
   - `<Container size="lg">`
   - `<Label>// {project.type}</Label>`
   - `<h1 text-display-xl font-black>{project.title}</h1>`
   - `<p text-2xl opacity-80>{project.tagline}</p>`
   - Meta row : `{project.role} · {project.period}`
   - Stack tags
   - Links (live, repo) si présents
2. **Description** — `<Section tone="cream" rounded="2xl" overlap>`
   - `<Container size="md">{project.description}</Container>`
3. **Problem / Solution / Outcome** (si présents) — `<Section tone="dark">` avec grid 3 cols de `<Card tone="glass">` pour chaque bloc
4. **Versions** (si `project.versions` présent — cas Amigaru) — `<Section tone="gradient" rounded="2xl" overlap>`
   - Timeline verticale avec chaque version dans un `<Card>`, stack tags + note
5. **Galerie** (si `project.screenshots`) — grid images
6. **Nav prev/next** — liens `/portfolio/<prev-id>` et `/portfolio/<next-id>` basés sur l'ordre dans `projects`
7. `<Footer />`

**Constraints :**
- 404 renvoie `<Navigate to="/404" />` si projet non trouvé
- Tous labels via `useTranslation("project")`
- Images galerie avec `loading="lazy"`

---

## Agent D — Pages Bonus + 404

**Files:**
- Rewrite: `frontend/src/pages/Bonus.tsx`
- Rewrite: `frontend/src/pages/404.tsx`

**Contract Bonus:**

Structure simple, ton expérimental :
1. `<Section tone="dark" rounded="none">` avec `<AnimatedGradient palette="hero" />`
2. `<Container size="lg">`
   - Titre display XXL : "Bonus"
   - Sous-titre : "Expérimentations & easter eggs"
3. Grid 2 cols de Cards "expériences" — placeholder data (3-4 items fictifs inline : "Curseur custom", "Test WebGL", "Générateur de brackets", "Easter egg terminal")
4. Easter egg : Cody avec mood="happy" qui réagit au clic (`useState` + toggle mood)
5. `<Footer />`

**Contract 404:**

1. `<Section tone="dark" rounded="none">` plein viewport
2. `<Container size="md">` centré
   - `<Bracket side="left" size="giant" />` `404` `<Bracket side="right" size="giant" />`
   - Display XL : "Page introuvable"
   - `<Cody variant="404" mood="confused" size={200} />`
   - Sous-texte + bouton `<Button asChild><Link to="/">{t('cta.back_home')}</Link></Button>`

**Constraints :**
- Bonus : Cody interactif OK à utiliser framer-motion pour le wiggle au clic
- 404 : pur CSS, pas de motion

---

## Task 23 (post-sweep) : Merge sub-agents + cleanup assets

- [ ] **Step 1 : Review each page on dev server**

Run: `pnpm dev`, naviguer `/`, `/portfolio`, `/portfolio/amigaru`, `/portfolio/stream-dashboard`, `/portfolio/seira-like`, `/bonus`, `/404-test-route`.

Checklist par page :
- Pas d'erreur console
- Responsive 320, 768, 1280, 1920
- Animations fonctionnent
- i18n keys résolues (pas de `home.xxx` affiché tel quel)

- [ ] **Step 2 : Remove obsolete assets**

```bash
rm src/assets/background_accueil.png
rm src/assets/background_portfolio.png
rm src/assets/section_coup-oeil.png
rm src/assets/section_competences.png
rm src/assets/forma_1.svg src/assets/forma_2.svg src/assets/forma_3.svg
rm src/assets/Cody_Accueil.svg src/assets/Cody_Portfolio.svg
```

Keep: `src/assets/Logo.svg`.

- [ ] **Step 3 : Remove `project.tsx` and `Carousel.tsx` legacy (si non utilisés après sweep)**

Check: `rtk rg -l "from.*components/project" src/ && rtk rg -l "from.*components/Carousel" src/`

Si aucun import : `rm src/components/project.tsx src/components/Carousel.tsx`.

Sinon, refactor ou migrer vers `@/components/portfolio/project-card.tsx`.

- [ ] **Step 4 : Re-enable pages in oxlint**

Remove `src/pages/**` from `oxlint.json` `ignorePatterns`.

Run: `pnpm lint` — must pass.

- [ ] **Step 5 : Commit**

```bash
git add -A && git commit -m "chore: remove obsolete assets and legacy components"
```

---

# PHASE 3 — POLISH

## Task 24 : Route transitions avec framer-motion

**Files:**
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1 : Wrap routes with AnimatePresence**

```tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { NavBar } from "./components/nav/navbar";
import { pageVariants } from "./lib/motion-variants";
import Accueil from "./pages/Accueil";
import Portfolio from "./pages/Portfolio";
import ProjectPage from "./pages/ProjectPage";
import Bonus from "./pages/Bonus";
import NotFound from "./pages/404";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Accueil />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectPage />} />
          <Route path="/bonus" element={<Bonus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="pt-24">
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 2 : Verify**

`pnpm dev` → naviguer entre pages → transitions visibles.

- [ ] **Step 3 : Commit**

```bash
git add -A && git commit -m "feat(transitions): route transitions via AnimatePresence"
```

---

## Task 25 : Perf audit Lighthouse

- [ ] **Step 1 : Build production + preview**

```bash
pnpm build
pnpm preview
```

- [ ] **Step 2 : Run Lighthouse mobile**

Chrome DevTools → Lighthouse → Mobile → Performance + Accessibility + Best Practices + SEO.

Target scores : Performance ≥ 90 (goal 95), A11y ≥ 95, BP ≥ 95, SEO ≥ 90.

- [ ] **Step 3 : Fix issues typiques**

- Images trop lourdes : passer en WebP / lazy loading
- Polices : vérifier `font-display: swap` (Fontsource le fait par défaut — confirmer)
- CLS : réserver espace Cody SVG, aspect-ratio sur cards
- LCP : hero text immédiat, gradient en background non-blocking

Documenter les fixes dans commits atomiques.

- [ ] **Step 4 : Commit final**

```bash
git commit -am "perf: Lighthouse fixes — target 95+ mobile"
```

---

## Task 26 : A11y audit

- [ ] **Step 1 : Install axe DevTools extension + run on each page**

Pour chaque route : audit axe, corriger violations critiques / serious.

Points à vérifier :
- Contrast ratio sur texte `opacity-60/70` (peut descendre sous AA — tester)
- Focus visible (dashed ring) sur tous interactifs
- Skip link "Aller au contenu" en haut de page
- `aria-label` sur boutons icon-only (UpArrow, burger menu)
- Alt text sur images projets
- `<main>` + `<nav>` + `<footer>` sémantiques OK

- [ ] **Step 2 : Ajouter skip link**

Dans `App.tsx`, avant `<NavBar>` :

```tsx
<a href="#content" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-fg text-bg px-4 py-2 rounded-full">
  Aller au contenu
</a>
```

Et `<main id="content" className="pt-24">`.

- [ ] **Step 3 : Commit**

```bash
git add -A && git commit -m "a11y: skip link, focus states, aria labels"
```

---

## Task 27 : Final gate + merge

- [ ] **Step 1 : All green**

```bash
pnpm lint && pnpm format:check && pnpm test && pnpm build
```

- [ ] **Step 2 : Responsive QA manuel**

Dev server ouvert, resize window : 320 / 420 / 768 / 1024 / 1280 / 1920 / 2560.
Toutes pages testées.

- [ ] **Step 3 : Merge vers main**

```bash
git checkout main
git merge --no-ff refonte/foundation -m "feat: frontend refonte — design system, VoidZero, Cody v2, nouveaux projets"
```

- [ ] **Step 4 : Deploy Vercel**

```bash
# If vercel CLI installed:
vercel --prod
# Otherwise push to main and let Vercel git integration deploy.
git push origin main
```

---

# Success Criteria (du spec §13, à vérifier avant fin)

- [ ] Toutes pages responsive 320–2560px sans break
- [ ] Lighthouse mobile ≥ 90 toutes pages
- [ ] `prefers-reduced-motion` respecté (tested via DevTools Rendering panel)
- [ ] Aucun PNG décoratif dans `src/assets`
- [ ] Cody yeux animés fonctionnels (souris + clignement)
- [ ] Tailwind 4 `@theme` = source unique de vérité tokens
- [ ] oxlint + oxc-formatter + vitest verts
- [ ] Tests primitives UI (Container, Button, Bracket, Cody hook) verts
- [ ] `pnpm build` < 15s
- [ ] Bundle JS initial < 200KB gzip (vérifier via `vite build --report` ou analyse `dist/`)
- [ ] Pas de framer-motion sur hover / reveal simple
