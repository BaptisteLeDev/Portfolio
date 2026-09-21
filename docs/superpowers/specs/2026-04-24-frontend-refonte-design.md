# Design System - Portfolio Baptiste Dechamp

> Refonte complète du frontend. Cadre la DA, la stack VoidZero, les composants maison, les animations CSS et la stratégie d'exécution BMAD (foundation first + sweep parallèle via sub-agents).

## 0. Context & Scope

- **Stack cible** : Vite 7 + **VoidZero** (oxlint + oxc-formatter + Vitest), React 19, react-router 7, Tailwind 4, pnpm, framer-motion (orchestration complexe uniquement), CSS moderne (scroll-driven animations, `@property`, conic-gradient, `animation-timeline: scroll()`). Déploiement **Vercel**. Back/data **Supabase** si besoin (form contact, analytics).
- **Pages** : Accueil, Portfolio (liste projets), ProjectPage (détail), Bonus, 404.
- **Liberté créative** : B/C - conserver l'ADN (palette beige/indigo/pink, Cody mascotte, brackets typographiques, gros radius) mais **compléter** la DA avec grain, textures, easter eggs, animations CSS scroll-driven, nouvelle font, et un système de composants maison cohérent.
- **Contenu** : liberté totale pour **retravailler**, réorganiser, ajouter, déplacer. L'essentiel conservé (parcours, compétences, projets existants), mais les formulations, layouts et l'ordre peuvent évoluer.
- **Langue** : FR par défaut, architecture i18n prévue dès le départ (namespace + hook `useT` + fichiers `fr.ts` / `en.ts` lazy).
- **Assets à remplacer** :
  - PNG backgrounds → backgrounds CSS animés
  - PNG "coup d'oeil" / "compétences" → typo géante + textures CSS pures
  - Cody SVG statiques → SVG inline React avec yeux animés et expressions contextuelles
  - `forma_1/2/3.svg` → cards maison avec texture CSS
- **Principes** : composants **maison** (pas de shadcn-ui global, juste primitives), accessibles, responsives mobile-first.

---

## 1. Visual Theme & Atmosphere

Le portfolio de Baptiste est une **scène typographique chaude** où une sans-serif grotesque moderne (**Geist Sans** variable, remplaçant l'ancien Typekit Neue Haas) dialogue avec des crochets `[ ]` géants qui signent l'identité. La palette oscille entre un **crème chaud oklch** et des **gradients indigo→rose électriques**, posés sur des surfaces aux **coins massivement arrondis** (`radius-xl = 100px`). Cody, la mascotte - tête en caractères ASCII transcrite en SVG - regarde, cligne, et réagit au curseur : c'est le point focal émotionnel de chaque page.

La refonte ajoute deux couches qui manquaient : **un grain/noise texture CSS** (fichier SVG inline encodé data-URI, 1-2% opacité) qui unifie toutes les surfaces, et des **backgrounds animés** (conic-gradient en rotation lente via `@property --angle` + `animation-timeline: scroll()`) qui remplacent les PNG lourds. Chaque section devient un tableau : grands aplats chauds, typo sculptée à grands poids (900 display), brackets comme guillemets visuels, et transitions au scroll qui donnent le rythme.

**Key Characteristics :**
- **Geist Sans Variable** (npm `geist`, self-hosted, gratuit, Vercel) avec stops 400 / 500 / 700 / 900 - poids dramatiques, pas de gradient fin comme Figma
- **Geist Mono Variable** pour labels techniques / timestamps / code inline / tags stack
- Brackets `[ ]` géants (96-120px) comme signature typographique (déjà présents, amplifiés)
- Radius scale extrême : `sm: 8px`, `md: 16px`, `lg: 32px`, `xl: 64px`, `2xl: 100px` (hero sections)
- Palette **crème chaud + indigo→pink gradient** + **noir profond warm**
- Grain SVG noise global (1-2% opacity, overlay blend)
- Animations CSS pures pour backgrounds, scroll-driven, parallaxe
- Cody : SVG inline avec yeux animés (pupilles suivant la souris, clignement idle, expressions par page)
- framer-motion : **uniquement** pour transitions de route et orchestrations complexes Cody
- OpenType `"kern"`, `"ss01"` si disponible, `font-feature-settings: "cv02", "cv11"` pour alternate characters

---

## 2. Color Palette & Roles

### Primary (background & foreground)
- **Warm Cream** (`oklch(98.69% 0.0214 95.28)`) - foreground texte sur fond sombre, fond clair des sections blanches
- **Deep Warm Black** (`oklch(21.61% 0.0061 56.04)`) - background principal, texte sur fond clair
- **Soft Cream** (`oklch(96% 0.02 95)`) - surfaces cards sur fond sombre

### Accent (gradient system)
- **Indigo 700** (`oklch(45% 0.22 280)`) - début gradient hero / formation
- **Pink 600** (`oklch(65% 0.25 0)`) - fin gradient
- **Gradient Hero** : `conic-gradient(from var(--angle), indigo-700 0%, pink-600 40%, warm-cream 60%, indigo-700 100%)` animé via `@property --angle` (rotation 40s infinite)
- **Gradient Accent Chaud** : `linear-gradient(135deg, oklch(85% 0.15 65) 0%, oklch(70% 0.22 25) 100%)` pour CTAs secondaires

### Surface & Effects
- **Glass Dark** : `color-mix(in oklch, var(--color-background) 85%, transparent)`
- **Glass Cream** : `color-mix(in oklch, var(--color-foreground) 12%, transparent)`
- **Noise overlay** : SVG turbulence data-URI, `opacity: 0.04`, `mix-blend-mode: overlay`
- **Ring focus** : `oklch(75% 0.18 290)` (indigo clair) - dashed 2px, écho au style éditeur

### Semantic
- **Success** : `oklch(70% 0.18 145)`
- **Warn** : `oklch(82% 0.18 85)`
- **Danger** : `oklch(60% 0.25 25)`

**Règle** : toute couleur déclarée en **oklch**. Pas de HEX, pas de RGB sauf `rgba` pour alpha legacy ou `color-mix` si plus lisible.

---

## 3. Typography Rules

### Font Families (Tailwind 4 `@theme`)

```css
@theme {
  --font-display: "Geist", "Geist Variable", "Inter", system-ui, sans-serif;
  --font-body:    "Geist", "Geist Variable", "Inter", system-ui, sans-serif;
  --font-mono:    "Geist Mono", "Geist Mono Variable", ui-monospace, monospace;
}
```

Install (Vite, sans Next) : `pnpm add @fontsource-variable/geist @fontsource-variable/geist-mono`. Import :
```ts
// src/main.tsx
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
```
(Le package `geist` officiel Vercel est Next.js-only. On passe par Fontsource pour Vite.)

### Hierarchy

| Rôle | Font | Size (rem) | Weight | Line Height | Tracking | Notes |
|------|------|-----------|--------|-------------|----------|-------|
| Display XXL (hero) | display | 7.5 (120px) | 900 | 0.9 | -0.04em | `_Hello world,` + nom |
| Display XL | display | 5 (80px) | 900 | 0.95 | -0.035em | Titres section majeurs |
| H1 | display | 3.75 (60px) | 900 | 1.0 | -0.03em | Titres page |
| H2 | display | 2.5 (40px) | 500 | 1.15 | -0.02em | Sous-titres section |
| H3 | display | 1.875 (30px) | 700 | 1.25 | -0.015em | Cards, blocs |
| Lead | body | 1.5 (24px) | 500 | 1.4 | -0.01em | Intros, descriptions fortes |
| Body L | body | 1.125 (18px) | 500 | 1.55 | normal | Contenu standard |
| Body | body | 1 (16px) | 500 | 1.6 | normal | Texte courant |
| Label | mono | 0.875 (14px) | 500 | 1.3 | 0.08em UPPERCASE | Eyebrows, tags, metadata |
| Micro | mono | 0.75 (12px) | 500 | 1.2 | 0.1em UPPERCASE | Timestamps, versions |
| Bracket Giant | display | 9 (144px) | 400 | 1 | normal | `[` `]` signature visuelle |

### Principles
- **Masse typographique** : le poids 900 est la base des displays - la hiérarchie se fait par taille et tracking, pas par variation fine de poids (contraire de Figma).
- **Tracking négatif** sur tout display/H1-H3, **tracking positif** sur mono uppercase (labels).
- **`_Hello world,`** : prefix underscore en hero - signature du code/dev, à conserver.
- **Brackets** : `[` et `]` traités comme composants typographiques à part entière, pas comme de la ponctuation.
- **Feature settings** global : `font-feature-settings: "kern", "liga", "ss01"` sur `html`.

### Responsive steps (clamp-based)
```css
--text-display-xxl: clamp(3rem, 10vw, 7.5rem);
--text-display-xl:  clamp(2.5rem, 7vw, 5rem);
--text-h1:          clamp(2rem, 5.5vw, 3.75rem);
--text-h2:          clamp(1.5rem, 3.5vw, 2.5rem);
--text-bracket:     clamp(4rem, 12vw, 9rem);
```

---

## 4. Component System (maison)

Tous les composants sont **maison**, typés TypeScript strict, avec `class-variance-authority` pour les variants. Aucun shadcn-ui à l'exception du pattern `Slot` (Radix) si nécessaire.

### 4.1 Primitives (src/components/ui/)

**`<Container>`**
- Props : `size: 'sm' | 'md' | 'lg' | 'xl' | 'full'`
- max-widths : 640 / 768 / 1024 / 1280 / 100%
- Gouttières responsives (px-4 md:px-8 lg:px-12)

**`<Section>`**
- Props : `tone: 'cream' | 'dark' | 'gradient' | 'glass'`, `rounded: 'none' | 'xl' | '2xl'`, `overlap: boolean`
- Gère overlap `-mt-20` entre sections (effet carte empilée)
- Noise overlay auto
- Slot pour background animé optionnel

**`<Bracket>`**
- Props : `side: 'left' | 'right'`, `size: 'md' | 'lg' | 'giant'`
- Rend `[` ou `]` avec la font display, `aria-hidden`
- Peut flotter en absolute (variante `float`)

**`<Button>`** (refait)
- Variants : `solid-dark`, `solid-cream`, `gradient`, `glass-dark`, `glass-cream`, `ghost`, `link`
- Sizes : `sm`, `md`, `lg`, `icon`
- Radius : `pill` par défaut (`rounded-full`), `xl` pour CTAs majeurs
- Focus : `outline-2 outline-dashed outline-offset-4 outline-ring`
- Hover : transition `translate-y-[-2px]` + shadow warm
- Props `asChild` (via Slot)

**`<Card>`**
- Props : `tone: 'cream' | 'glass' | 'outline'`, `interactive: boolean`
- Radius : `rounded-[32px]` (lg), `rounded-[64px]` (xl)
- Hover (si interactive) : scale subtil + lift shadow

**`<Label>` (eyebrow)**
- Mono, uppercase, tracking wide, avec préfixe `//` ou `_` optionnel

**`<Tag>` / `<Chip>`**
- Pill, glass-cream, micro-label
- Utilisé sur ProjectPage pour stack / rôles

**`<Divider>`**
- Ligne ou bracket-divider (avec `[ ]` mini sur les côtés)

**`<NoiseOverlay>`**
- Composant utilitaire qui pose le grain SVG en absolute inset-0, pointer-events-none

**`<AnimatedGradient>`**
- Composant background : conic-gradient animé via `@property --angle`
- Props : `palette: 'hero' | 'chaud' | 'froid'`, `speed: 'slow' | 'normal'`

**`<ScrollReveal>`**
- Wrapper qui applique `animation-timeline: view()` sur un enfant
- Props : `effect: 'fade' | 'rise' | 'slide-left' | 'slide-right' | 'scale'`
- CSS pur, pas de JS

### 4.2 Composants domaine

**`<Cody>`** (refait entièrement)
- SVG inline React, paramétrable
- Props : `variant: 'accueil' | 'portfolio' | 'bonus' | '404'`, `mood: 'idle' | 'curious' | 'happy' | 'confused'`
- **Yeux animés** :
  - Idle : clignement aléatoire toutes 3-6s
  - Pupilles suivant la souris dans un rayon limité (hook `useEyeTracking`)
  - Réduction motion respectée (`prefers-reduced-motion`)
- Taille responsive, auto-scale via container queries

**`<ProjectCard>`**
- Card interactive portefeuille
- Thumbnail en CSS (gradient + texte stack) ou image si fournie
- Hover : lift + reveal arrow
- Link wrap avec transition route

**`<NavBar>`**
- Fixed top, glass effect au scroll (backdrop-filter)
- Logo + nav links + CTA "Contact"
- Mobile : hamburger → overlay plein écran avec nav animée stagger

**`<Footer>`**
- Section finale, dark tone, gradient subtle
- Colonnes : liens / contact / signature `/* fin */`
- Mini Cody easter egg en bas

**`<UpArrow>`**
- Bouton flottant, apparition au scroll via `animation-timeline: scroll()`, pas de JS

**`<Carousel>`**
- Scroll-snap CSS pur (horizontal), flèches optionnelles
- Indicateurs dots

**`<Hero>`**
- Composition : AnimatedGradient + Bracket + Display XXL + Cody
- Scroll-linked parallax Cody (transform via `animation-timeline: scroll()`)

### 4.3 Architecture dossiers

```
src/
  components/
    ui/               # primitives (Button, Card, Section, Container, Label, etc.)
    cody/             # Cody + hooks yeux
    nav/              # NavBar + MobileMenu
    portfolio/        # ProjectCard, ProjectFilters
    hero/             # Hero composable
    effects/          # NoiseOverlay, AnimatedGradient, ScrollReveal
  pages/              # routes react-router
  data/               # contenu projets, parcours, skills (static)
  lib/
    cn.ts             # clsx + tailwind-merge
    cva.ts            # re-export CVA
    motion.ts         # variants framer-motion partagés
  styles/
    index.css         # @theme, utilities, keyframes
  hooks/
    use-eye-tracking.ts
    use-reduced-motion.ts
  assets/
    cody/             # SVG paths/coords
    noise.svg         # grain texture
    logo.svg
```

---

## 5. Animations & Motion

### 5.1 CSS pur (par défaut)

- **Backgrounds animés** : `conic-gradient` + `@property --angle: <angle>; initial-value: 0deg; inherits: false;` puis `animation: spin 40s linear infinite`.
- **Scroll-driven** : `animation-timeline: view()` pour reveal au scroll, `animation-timeline: scroll()` pour parallax + progress bar nav + UpArrow apparition.
- **Hover** : transitions `transform`, `background`, `box-shadow` avec `cubic-bezier(0.32, 0.72, 0, 1)` (ease signature).
- **Bracket drift** : brackets flottants avec `animation: drift 8s ease-in-out infinite alternate` (translation ±4px).
- **Text reveal** : `clip-path` animé au view-timeline.
- **Noise shimmer** : noise overlay avec `transform: translate()` animé 200ms steps infinite (grain qui vibre).

### 5.2 framer-motion (réservé)

Cas d'usage autorisés :
- **Transitions de route** entre pages (`AnimatePresence` + `layout`)
- **Cody expressions** : variants mood + orchestration yeux quand contexte complexe
- **Mobile menu** : stagger children + spring

Interdit : tout ce qui peut être fait en CSS pur (hover, scroll-reveal simple, parallax simple).

### 5.3 `prefers-reduced-motion`

Tous les composants respectent `@media (prefers-reduced-motion: reduce)`. Les animations idle/grain/rotation sont désactivées. Les transitions fonctionnelles (hover states, focus) restent mais instantanées ou très courtes.

### 5.4 Cody eye tracking

```ts
// hooks/use-eye-tracking.ts
// Retourne {x, y} normalisé [-1, 1] basé sur mouse position vs bounding box.
// Appliqué aux pupilles via CSS var --eye-x, --eye-y et transform.
// Throttle via rAF. Désactivé sur touch devices et reduced-motion.
```

---

## 6. Tailwind 4 Configuration

### 6.1 `@theme` central (src/styles/index.css)

```css
@import "tailwindcss";
/* Geist variable fonts loaded via @fontsource-variable/geist in main.tsx */

@theme {
  /* Couleurs - oklch */
  --color-bg:          oklch(21.61% 0.0061 56.04);
  --color-fg:          oklch(98.69% 0.0214 95.28);
  --color-cream:       oklch(96% 0.02 95);
  --color-indigo:      oklch(45% 0.22 280);
  --color-pink:        oklch(65% 0.25 0);
  --color-ring:        oklch(75% 0.18 290);

  /* Fonts */
  --font-display: "Geist Variable", "Geist", "Inter", system-ui, sans-serif;
  --font-body:    "Geist Variable", "Geist", "Inter", system-ui, sans-serif;
  --font-mono:    "Geist Mono Variable", "Geist Mono", ui-monospace, monospace;

  /* Radius */
  --radius-sm:  8px;
  --radius-md:  16px;
  --radius-lg:  32px;
  --radius-xl:  64px;
  --radius-2xl: 100px;

  /* Ease */
  --ease-signature: cubic-bezier(0.32, 0.72, 0, 1);

  /* Spacing supplémentaire */
  --spacing-section: 8rem;
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-slow { to { --angle: 360deg; } }
@keyframes drift    { from { transform: translateY(-4px);} to { transform: translateY(4px);} }
@keyframes blink    { 0%, 92%, 100% { transform: scaleY(1);} 95% { transform: scaleY(0.1);} }

@utility noise-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg...turbulence...>");
  opacity: 0.04; mix-blend-mode: overlay;
}

@utility bracket {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: var(--text-bracket);
  line-height: 1;
}
```

### 6.2 Conventions classes
- Toujours passer par les tokens `@theme` - pas de valeurs arbitraires `[#abc]` sauf exception motivée.
- Utiliser `@utility` pour toute classe custom réutilisable (≥3 usages).
- Container queries (`@container`) privilégiées vs media queries quand pertinent.

---

## 7. Layout Principles

### Spacing scale (Tailwind 4 défaut + extras)
- Base 0.25rem (4px) - scale 1/2/3/4/6/8/12/16/20/24/32/40/48
- Sections : `py-section` = 8rem desktop, clamp-based en responsive.

### Container
- `max-w-6xl` (1152px) par défaut contenu textuel
- `max-w-7xl` (1280px) pour galleries
- Full-bleed uniquement sur Hero et Footer

### Grille Portfolio
- Mobile : 1 col
- Tablet : 2 cols
- Desktop : 3 cols
- Gap : `gap-6` → `gap-10`
- Container queries pour ProjectCard (adapte typo interne selon sa propre largeur)

### Whitespace philosophy
- **Respiration généreuse** : les sections `rounded-[100px]` nécessitent du padding intérieur massif (py-20+) pour respirer.
- **Overlap signature** : sections empilées en négatif (`-mt-20`) pour effet cartes superposées.
- **Brackets comme ancres** : les brackets géants posent le rythme latéral, pas besoin de bordures.

---

## 8. Do's and Don'ts

### Do
- Utiliser les tokens Tailwind 4 via `@theme` - jamais de valeurs hardcodées
- Préférer CSS pur (scroll-driven, conic, `@property`) à framer-motion
- Respecter `prefers-reduced-motion` sur **toute** animation décorative
- Typer strict tous les composants (pas de `any`)
- Composants maison minimal, composables, accessibles (`aria-*`, focus visible dashed)
- Couleurs en **oklch** uniquement
- Responsive mobile-first, container queries quand composant autonome
- Noise overlay présent sur **toutes** les sections principales (unité visuelle)

### Don't
- Ne pas réintroduire de PNG pour décoratif - tout en CSS ou SVG inline
- Ne pas utiliser framer-motion pour du hover simple ou du reveal simple
- Ne pas utiliser shadcn-ui en bulk - uniquement pattern Slot si besoin
- Ne pas hardcoder de couleurs HEX/RGB
- Ne pas oublier focus visible (dashed ring) sur tous les interactifs
- Pas d'images d'arrière-plan PNG/JPG >20KB
- Pas de `!important` (Tailwind 4 les rend inutiles avec layers)
- Ne pas animer `width`/`height`/`top`/`left` - uniquement `transform`/`opacity`

---

## 9. Responsive Behavior

### Breakpoints (Tailwind 4 defaults + `xs`)
| Name | Min-width | Usage |
|------|-----------|-------|
| xs   | 420px | Téléphones standards |
| sm   | 640px | Grands téléphones / phablets |
| md   | 768px | Tablets portrait |
| lg   | 1024px | Tablets landscape / small laptop |
| xl   | 1280px | Desktop |
| 2xl  | 1536px | Large desktop |

### Collapsing strategy
- Hero Display XXL : 120px → 96px → 64px → 48px
- Sections `rounded-[100px]` : réduit à `rounded-[64px]` < md, `rounded-[32px]` < sm
- Overlap `-mt-20` → `-mt-10` < md
- Grille Portfolio : 3 → 2 → 1
- Cody : masqué < md sur Hero (image décorative), visible sur les sections dédiées
- NavBar : horizontal → hamburger fullscreen < md

### Touch considerations
- Tap targets ≥ 44×44px
- Eye-tracking Cody désactivé sur touch (pointer: coarse)
- Hover states alternatifs (tap reveal) sur ProjectCard mobile

---

## 10. Toolchain (VoidZero)

### 10.1 Install
```json
{
  "dependencies": {
    "@fontsource-variable/geist": "latest",
    "@fontsource-variable/geist-mono": "latest",
    "i18next": "latest",
    "react-i18next": "latest",
    "i18next-browser-languagedetector": "latest"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "vitest": "^3.0.0",
    "@vitest/ui": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^25.0.0",
    "oxlint": "^0.15.0",
    "oxc-formatter": "latest"
  }
}
```

Package manager : **pnpm** (lockfile `pnpm-lock.yaml` déjà présent).
Déploiement : **Vercel** (framework detected: Vite, build `pnpm build`, output `dist/`).

### 10.2 Scripts
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

### 10.3 Suppression
- `eslint`, `@eslint/js`, `eslint-plugin-*`, `typescript-eslint` → **supprimés**
- `tailwindcss-animate` → supprimé (remplacé par nos keyframes `@theme`)
- `react-modal` → évalué (remplacé par `<dialog>` natif si possible)

### 10.4 Tests
- Vitest + jsdom + Testing Library
- Tests ciblés : primitives UI (`Button`, `Card`, `Bracket`), hook `useEyeTracking`, composants critiques (`NavBar`, `Cody`)
- Coverage objectif : primitives 80%+, pages non testées (pure composition)

---

## 11. BMAD Execution Plan

### Phase 1 - Foundation (séquentiel, 1 agent = moi)
Blocage : rien ne part en parallèle tant que cette phase n'est pas verte.

1. Upgrade stack (Vite 7, React 19 dernier, remove ESLint, install oxlint + oxc-formatter + Vitest)
2. Setup `@theme` tokens complet dans `index.css`
3. Structure dossiers `components/ui`, `components/effects`, `hooks`, `styles`, `data`
4. Primitives : `cn`, `cva`, `Container`, `Section`, `Bracket`, `NoiseOverlay`, `AnimatedGradient`, `ScrollReveal`
5. Button + Card refaits maison
6. Cody v2 (SVG inline + `useEyeTracking` hook)
7. NavBar + Footer refaits
8. Tests Vitest des primitives
9. ✅ Gate : `pnpm build` vert, `pnpm test` vert, `pnpm lint` vert, screenshot Storybook/dev des primitives

### Phase 2 - Pages Sweep (parallèle, sub-agents dispatch)
Dispatch 1 sub-agent par page via `superpowers:dispatching-parallel-agents`. Chaque sub-agent a :
- Contexte : ce design.md
- Primitives disponibles (phase 1)
- Contrat : structure page, contenu à conserver, composition avec les primitives
- Critère de succès : responsive OK, anims OK, accessible, build/test verts

Pages :
- Agent A : **Accueil** (Hero + Intro + Formation + Compétences réorganisées)
- Agent B : **Portfolio** (grid + filtres)
- Agent C : **ProjectPage** (layout détail)
- Agent D : **Bonus + 404**

### Phase 3 - Polish (séquentiel)
1. Transitions de route framer-motion
2. Perf audit Lighthouse (objectif 95+ mobile)
3. A11y audit (axe)
4. Responsive QA cross-breakpoints
5. Build final, preview

---

## 12. Agent Prompt Guide

### Quick reference
- **Fond principal** : `bg-bg` (warm black oklch 21%)
- **Texte principal** : `text-fg` (warm cream)
- **Gradient hero** : `<AnimatedGradient palette="hero" />` en background absolute
- **Bracket géant** : `<Bracket side="left" size="giant" />`
- **Section**: `<Section tone="cream" rounded="2xl" overlap>`

### Exemples composition

**Hero**
> "Hero plein viewport avec `<AnimatedGradient palette='hero' />` en absolute inset-0, overlay NoiseOverlay, `<Container size='lg'>` centré, Display XXL (`text-[clamp(3rem,10vw,7.5rem)] font-black leading-none tracking-[-0.04em]`) avec `_Hello world,` prefix, sous-titre Lead, `<Cody variant='accueil'>` à droite (hidden md:block), bouton gradient CTA."

**Section compétences**
> "Section tone cream rounded 2xl overlap negative. `<Bracket side='left' size='giant' />` flottant absolute. Label eyebrow mono `// COMPÉTENCES`. H2 'Hard & Soft Skills'. Grid 2 cols md:4, chaque skill dans Card glass avec hover lift. ScrollReveal effect='rise' stagger."

**Bouton CTA principal**
> "`<Button variant='gradient' size='lg'>Voir mes projets →</Button>` - gradient indigo→pink, rounded-full, padding 1.25rem 2.5rem, hover translate-y-[-2px] + shadow warm, focus outline dashed 2px ring."

### Iteration guidelines
1. Si doute sur une valeur : check `@theme` d'abord, token existant probable
2. Si composant répété 3× : promouvoir en primitive `components/ui/`
3. Animation qui clignote / saccade : vérifier que `transform` est utilisé (pas `top/left/width`)
4. Pas de PNG / JPG ajouté, **jamais** (sauf screenshots projets dans `data/`)
5. Vérifier `prefers-reduced-motion` sur chaque animation décorative

---

## 13. Success Criteria

- ✅ Toutes pages responsive de 320px à 2560px sans break
- ✅ Lighthouse mobile ≥ 90 sur toutes les pages (objectif 95)
- ✅ `prefers-reduced-motion` respecté sur 100% des animations décoratives
- ✅ Aucun PNG décoratif (uniquement screenshots projets)
- ✅ Cody yeux animés + clignement + suivi souris
- ✅ Tailwind 4 `@theme` unique source de vérité pour tokens
- ✅ oxlint + oxc-formatter + vitest configurés et verts
- ✅ Tests primitives UI ≥ 80% coverage
- ✅ Build `pnpm build` < 15s
- ✅ Bundle JS initial < 200KB gzip
- ✅ Pas de framer-motion sur hover / scroll-reveal simple

---

## 14. Content Strategy

### 14.1 Principe
Liberté **C** validée : on retravaille contenu, formulations, ordre et layouts. On conserve l'essentiel (identité, parcours, skills, projets historiques) et on enrichit avec nouveaux projets + stack à jour.

### 14.2 Pages & sections (cible)

**Accueil**
1. Hero - `_Hello world, je suis Baptiste` + sous-titre "Développeur full-stack - CDA 3e année" + Cody curious
2. `// À PROPOS` - pitch court **dev-first** : "Dev full-stack JS/TS avec une sensibilité produit héritée d'un parcours pluridisciplinaire."
3. `// PARCOURS` - timeline 3 étapes : CDA (en cours) → BTS SIO → L1 Arts Plastiques
4. `// COMPÉTENCES` - grid : Hard Skills rebalancé (Dev > Conception > Design) / Soft Skills
5. `// STACK` - bande (marquee animée) de tags stack actuelle
6. CTA vers Portfolio

**Portfolio**
- Grid projets + filtre par tag (stack / type)
- Chaque card : titre, description courte, stack tags, thumbnail CSS/gradient ou screenshot

**ProjectPage** (détail)
- Hero projet (titre, rôle, période, stack tags)
- Problématique / Solution / Résultat
- Galerie (screenshots ou GIFs)
- Versions / évolution si pertinent (cas Amigaru)
- Lien live + repo si dispo
- Navigation projet précédent / suivant

**Bonus**
- Easter eggs, expérimentations, side projects courts

**404**
- Cody confused + message fun + lien retour

### 14.3 Profil réel (correction importante)

**Identité** : Baptiste Dechamp, **développeur full-stack** en 3e année du titre **CDA - Concepteur Développeur d'Applications** (RNCP niveau 6, MyDigitalSchool Vannes). Le positionnement est **dev-first** : React/TS/Next.js/Laravel au cœur, avec une sensibilité conception d'application (UX, modélisation, architecture) héritée d'un parcours pluridisciplinaire. Les compétences design existent mais sont **secondaires** - pas un portfolio de designer.

### 14.4 Projets à intégrer (data/projects.ts)

Mix des projets **réels actuels** (depuis `data/projects_mini.json`) + **nouveaux projets** planifiés :

| ID | Nom | Type | Stack | Notes |
|----|-----|------|-------|-------|
| amigaru | Amigaru | Web - 3 versions | v1 PHP/MySQL/Tailwind · v2 React+Vite · v3 Next.js + Storybook + dashboard | Projet phare dev - case study montée en stack |
| devflix | DevFlix | Web fullstack | React + Vite + Node + Firebase + TMDB API | Clone Netflix pédagogique |
| erwan-ewen | Erwan & Ewen | Intégration | WordPress + Kadence + Figma | E-commerce cavistes - mission client |
| stream-dashboard | Stream Dashboard | Desktop app | Electron + React + Vite + Tailwind + TS | **Nouveau** : dashboard streameurs (overlays, alertes, stats) |
| seira-like | App Éducative | Cross-platform | Web **Angular** + Mobile **Expo/RN** + Backend **Laravel** | **Nouveau** : plateforme pédagogique multi-plateforme full-stack |
| festival-vibrations | Festival Vibrations | UX/UI secondaire | Illustrator + Photoshop + Figma | Projet design (garder mais tagger "design") |
| vannes-agglo | Vannes Agglo | UX/UI secondaire | Figma + Marketing | Projet design/chef de projet |
| g-en | G-En | UX/UI & Recherche | Figma + Recherche UX | Projet conception app (met en avant compétences concepteur) |

**Stratégie d'affichage** :
- Filtre par défaut : **tous** (pas "dev" only - on montre la polyvalence)
- **Ordre d'affichage** : dev en premier (Amigaru, DevFlix, Stream Dashboard, Seira-like, Erwan&Ewen) puis design (Festival Vibrations, Vannes Agglo, G-En)
- Tags `type` : `web` | `mobile` | `desktop` | `fullstack` | `design`
- Tags `category` visibles sur card : "Full-stack", "Intégration", "UX/UI & Design", etc.

### 14.5 Formation (CORRECTION)

Timeline réelle :

```ts
[
  { year: "2023 →", place: "MyDigitalSchool Vannes", title: "Titre CDA - Concepteur Développeur d'Applications", note: "3e année, formation en cours. RNCP niveau 6. Full-stack JS/TS, conception app, DevOps." },
  { year: "2022 - 2023", place: "BTS SIO", title: "Services Informatiques aux Organisations - Option SLAM", note: "Solutions logicielles et applications métier." },
  { year: "2021 - 2022", place: "Université Rennes 2", title: "L1 Arts Plastiques", note: "Sémiotique visuelle, bases du design - fondation de la sensibilité produit." }
]
```

### 14.6 Skills (rebalancé dev-first)

**Hard Skills - ordre = priorité affichée :**

```ts
hard: [
  // DEV (en premier, niveau élevé)
  { label: "TypeScript",   level: 90, group: "Dev" },
  { label: "React / RN",   level: 92, group: "Dev" },
  { label: "Next.js",      level: 85, group: "Dev" },
  { label: "Tailwind",     level: 92, group: "Dev" },
  { label: "Node.js",      level: 80, group: "Dev" },
  { label: "Laravel / PHP",level: 78, group: "Dev" },
  { label: "Angular",      level: 70, group: "Dev" },
  { label: "SQL / Supabase", level: 78, group: "Dev" },
  { label: "Git / CI",     level: 85, group: "Dev" },
  // CONCEPTION APP
  { label: "Architecture / Modélisation", level: 80, group: "Conception" },
  { label: "Accessibilité / Perf",        level: 75, group: "Conception" },
  // DESIGN (secondaire, moins haut)
  { label: "Figma",        level: 85, group: "Design" },
  { label: "UX/UI",        level: 75, group: "Design" },
  { label: "Illustrator",  level: 65, group: "Design" },
]
```

**Soft Skills** (conservés, affinés) :

```ts
soft: [
  { label: "Adaptabilité",    note: "Je navigue entre stacks et rôles sans friction." },
  { label: "Esprit d'analyse", note: "Je décortique un problème avant d'écrire du code." },
  { label: "Écoute",          note: "Je reformule plus que je n'impose." },
  { label: "Contexte",        note: "Je cherche le 'pourquoi' avant le 'comment'." },
]
```

Chaque projet doit exposer :
```ts
interface Project {
  id: string;
  title: string;
  tagline: string;           // 1 phrase
  description: string;       // paragraphe
  role: string;
  period: string;            // "2024 - 2025"
  stack: string[];           // tags courts
  type: 'web' | 'mobile' | 'desktop' | 'fullstack';
  status: 'live' | 'archived' | 'wip';
  thumbnail?: { kind: 'gradient'; palette: string } | { kind: 'image'; src: string };
  links?: { live?: string; repo?: string; figma?: string };
  versions?: Array<{ label: string; stack: string[]; note: string }>;  // pour Amigaru
  screenshots?: string[];
  problem?: string;
  solution?: string;
  outcome?: string;
}
```

### 14.4 Stack actuelle à afficher (section Stack Accueil + tags)
**Frontend** : Vite + VoidZero (oxlint/oxc-formatter/vitest), React 19, Next.js 16, Angular, Tailwind 4, TypeScript
**Mobile** : Expo, React Native
**Desktop** : Electron
**Backend** : Laravel, PHP, Node
**Data/Infra** : Supabase, Vercel, pnpm
**Outils** : Figma, Storybook, Git

---

## 15. Internationalisation (i18n)

Architecture prévue dès le départ même si on livre FR uniquement au début.

### 15.1 Choix technique
- **i18next + react-i18next** (robuste, lazy namespaces, pluriels)
- Alternative plus légère : custom hook + JSON si scope reste réduit. **Décision : on part sur i18next** (scale-ready, compatible Next.js si migration future).

### 15.2 Structure
```
src/
  i18n/
    index.ts           # config i18next + detector
    locales/
      fr/
        common.json
        home.json
        portfolio.json
        project.json
      en/
        ...            # stubs vides au début, à remplir plus tard
```

### 15.3 Conventions
- Jamais de string FR en dur dans un composant - toujours `t('home.hero.title')`
- Namespace par page principale + `common` pour nav/footer/CTAs
- Pluriels et interpolations via i18next (`t('projects.count', { count })`)
- Date formatting via `Intl.DateTimeFormat(locale)`

### 15.4 Livraison
- v1 : FR uniquement, EN stub. Lang switcher caché ou désactivé.
- v2 (plus tard) : remplir EN, activer switcher dans NavBar.

---

## 15.4. Décisions UX finales (après itérations Claude Design v2)

Après deux itérations sur le prototype, les choix retenus sont :

### Skills - PAS de graphiques/barres
**Décision** : remplacer les barres `level: 0-100` par une simple **liste groupée** par catégorie (Dev / Conception / Design / Outils). Pas intuitif de se noter sur 100, et visuellement banal.

Rendu cible :
```
Hard skills
  DEV          TypeScript · React / RN · Next.js · Tailwind · Node · Laravel / PHP · Angular · SQL / Supabase
  CONCEPTION   Architecture · Modélisation · A11y / Perf
  DESIGN       Figma · UX/UI · Illustrator
  OUTILS       Git · CI · Storybook · pnpm

Soft skills (cards numérotées 01, 02, 03, 04 avec label + note)
```

### Gestion de projet - light
La compétence existe (expérience Vannes Agglo en "chef de projet") mais n'est pas mise en avant. Pas de section dédiée. Mentionnée en passant si pertinent dans un case study projet.

### Cody v2 - style proche du SVG original, beefier, expressif
Le Cody final du prototype v2 est le bon modèle :
- **Deux variantes** :
  - `variant="portfolio"` (filled) : face cream remplie avec outline noir épais (stroke-width 7), + brackets épais (stroke 9) - **style proche du SVG original de Baptiste**
  - `variant="bracket"` (outline) : juste brackets + yeux/bouche en outline sur le fond (pour nav, footer)
- **Sourcils expressifs** par mood : `idle` / `curious` / `happy` / `confused` / `thinking`
  - `idle`    : `^ ^` neutres
  - `curious` : `^ ^` un peu relevés
  - `happy`   : arcs haussés
  - `confused`: `v v` renversés
  - `thinking`: lignes plates
- **Bouche expressive** par mood (path Bezier variable)
- **Cheek blush** rose quand `mood="happy"` (ellipses transparentes)
- **Brackets statiques** (PAS de drift - user feedback "les accolades bougent trop")
- **Yeux** : tracking via `MouseContext` global, clignement aléatoire 2.5-6s

### Hero - Typewriter + Terminal prompt
- Eyebrow mono : `~/baptiste-dev $ run hello.tsx`
- H1 avec **effet machine à écrire** (composant `<Typewriter>`) sur "Hello world," (55ms/char) puis "Baptiste." (80ms/char, delay 1100ms)
- "Baptiste." en **texte dégradé** (background clip → text, linear-gradient cream→pink)
- Caret clignotant en fin de mot actif (`caret-blink 1s steps(2) infinite`)
- Pas de pill "Dispo en alternance" (supprimée)

### Background Hero - fluid blobs organiques
**Remplace** le simple conic-gradient. Inspiré du background PNG original de Baptiste :
- 4 radial-gradients (indigo, pink, indigo-deep, pink) positionnés en quadrants
- `filter: blur(60px) saturate(1.3)` pour effet fluide/flou
- 2 couches (`::before` + `::after`) avec animation `fluid-morph` (translate + scale + rotate) - durées décalées (22s + 32s reverse) et `mix-blend-mode: screen` sur l'une
- Résultat : flux organique violet/rose, lisibilité préservée sous le texte

### Alternance radius sections
Pas toutes les sections arrondies - **alternance** :
- Impaires (Hero, Timeline, CTA final) : `rounded-[100px]`
- Paires (About, Skills, Marquee) : **plates**
- Header nav : `rounded-[12px]` (pas pill)

### Marquee stack
Tags stack en **display 900** géants, défilement horizontal continu (`animation: marquee 40s linear infinite`), alternance 3 couleurs (pink / cream / muted), séparateurs `·`, mask-image fade sur les bords.

### Status pulse dot
Sur projets `status: "live"` uniquement - petit point qui pulse (opacity + scale).

---

## 15.5. Insights techniques du prototype (patterns réutilisables)

Le prototype HTML généré par Claude Design (`portfolio/project/Portfolio.html`) a validé plusieurs patterns visuels à reprendre :

### Gradient hero multi-couche
Pas un simple conic. **Trois couches superposées** :
```css
background:
  radial-gradient(ellipse 80% 60% at 30% 40%, color-mix(in oklch, var(--color-indigo) 85%, transparent) 0%, transparent 60%),
  radial-gradient(ellipse 70% 50% at 75% 60%, color-mix(in oklch, var(--color-pink) 80%, transparent) 0%, transparent 55%),
  conic-gradient(from var(--angle) at 50% 50%, var(--color-indigo-deep) 0%, var(--color-pink) 30%, var(--color-indigo) 55%, var(--color-indigo-deep) 100%);
animation: spin-slow 40s linear infinite;
filter: saturate(1.05);
```
Plus un overlay radial pour vignette :
```css
.grad-hero::after {
  content: "";
  position: absolute; inset: -10%;
  background: radial-gradient(circle at 50% 50%, transparent 40%, var(--color-bg) 85%);
}
```

### Mouse context global
Pour que Cody suive la souris **partout sur la page** (pas juste dans son propre rect), on expose un `MouseContext` via `MouseProvider` au root de l'app. Chaque instance de Cody consomme ce context et calcule sa position relative à son rect. Évite les `pointermove` multiples.

### Scroll-driven reveals avec fallback
Utiliser `@supports (animation-timeline: view())` pour progressive enhancement. Si le navigateur ne supporte pas, la classe `.reveal` déclenche une animation `rise-in` classique au mount.

### Marquee stack
Bande horizontale de tags stack qui défile (`animation: marquee 40s linear infinite`) avec `mask-image` linear-gradient pour fade sur les bords. Plus élégant qu'une grille statique.

### Pulse dot (status indicator)
Petit point coloré qui pulse à côté des projets `status: "live"` :
```css
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.85); }
}
```

### Tweaks panel (optionnel, dev-only)
Le prototype expose un panneau de tweaks (accent hue, radius, Cody mood) qui modifie les CSS vars en live. **À NE PAS livrer en prod**, mais peut servir de **dev tool** pendant l'intégration : toggle via `?tweaks=1` en query param.

### Scrollbar custom
```css
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-thumb {
  background: color-mix(in oklch, var(--color-fg) 15%, transparent);
  border-radius: 10px;
}
```

### Selection color
```css
::selection { background: var(--color-pink); color: var(--color-bg); }
```

### Font weight display = 900 par défaut
Le prototype utilise `font-weight: 900` pour tous les titres display (cohérent avec notre choix).

---

## 16. Resolved (questions initialement ouvertes)

- ✅ **Contenu** : liberté C, retravaillé, réorganisé, nouveaux projets ajoutés (cf. §14)
- ✅ **Font** : Typekit remplacé par **Geist Sans/Mono Variable** via `@fontsource-variable/geist` (gratuit, self-hosted, parfait dev portfolio)
- ✅ **i18n** : prévu dès le début (i18next), FR livré, EN stub (cf. §15)
- ✅ **Data projets** : nouveau shape `Project` (cf. §14.3), à peupler avec les existants + nouveaux
