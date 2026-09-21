# Design System - Slides (DA Portfolio BDDev)

> Guide de rédaction visuelle pour tes slides (Keynote / PowerPoint / Canva / Google Slides).
> Source de vérité : la DA réelle du portfolio (`frontend/src/styles/index.css`).
> Ambiance : **sombre, chaud, typographique, code-first**, avec la mascotte ASCII **Cody** `[ o_o ]`.

---

## 1. Couleurs

Les couleurs canoniques du site sont en **oklch**. Les **hex** ci-dessous sont des équivalents
approximatifs pour les outils qui ne gèrent pas oklch (PowerPoint, Canva). Si l'outil supporte
oklch, prends la colonne oklch.

### Fonds (sombre) - à privilégier

| Rôle | oklch (canonique) | Hex approx | Usage slide |
|---|---|---|---|
| **BG principal** | `oklch(21.61% 0.0061 56.04)` | `#2A2522` | Fond de toutes les slides. Noir chaud, pas un noir pur. |
| BG froid (variante) | `var(--color-bg)` | `#2A2522` | Sections « tech / froid ». |
| BG chaud (variante) | `oklch(28% 0.10 30)` | `#4A2E26` | Section accent chaude (1 slide max, pour casser le rythme). |

> Règle : **jamais de slide blanche**. Le fond reste sombre, le contenu respire dessus.

### Texte

| Rôle | oklch | Hex approx | Usage |
|---|---|---|---|
| **FG (texte principal)** | `oklch(98.69% 0.0214 95.28)` | `#FDFBF3` | Titres + corps sur fond sombre. Blanc crème, jamais blanc pur. |
| Cream | `oklch(96% 0.02 95)` | `#F6F1E6` | Cartes claires, fond inversé ponctuel. |
| Cream-2 | `oklch(90% 0.025 90)` | `#E7E0CF` | Texte secondaire sur carte claire. |
| Texte atténué | `FG @ 70%` | `#FDFBF3` à 70% | Légendes, labels, sous-titres. |

### Accents (les 2 couleurs signature)

| Rôle | oklch | Hex approx | Usage |
|---|---|---|---|
| **Indigo** | `oklch(45% 0.22 280)` | `#4A35B8` | Accent froid, début de dégradé. |
| Indigo-2 | `oklch(55% 0.24 285)` | `#6347D9` | Indigo plus lumineux (blobs). |
| **Pink** | `oklch(65% 0.25 0)` | `#F9487F` | Accent chaud, fin de dégradé, sélection, mots-clés. |
| Pink-2 | `oklch(72% 0.23 10)` | `#FF6E97` | Pink plus clair (blobs, hover). |
| Ring (focus) | `oklch(75% 0.18 290)` | `#AB8EF0` | Contour de focus, surlignage léger. |

**Dégradé signature** (le geste fort de la marque) :
`linear-gradient(135deg, Indigo → Pink)` soit `#4A35B8 → #F9487F`.
À réserver aux boutons, à un mot-clé important, ou à un trait de soulignement. Pas en fond plein.

### Sémantique (rare en slide, pour data/statuts)

| Rôle | oklch | Hex approx |
|---|---|---|
| Success | `oklch(70% 0.18 145)` | `#3FBE7A` |
| Warn | `oklch(82% 0.18 85)` | `#F0B433` |
| Danger | `oklch(60% 0.25 25)` | `#E5402E` |

---

## 2. Typographie - 2 polices uniquement

| Famille | Police | Rôle | Où |
|---|---|---|---|
| **Principale** | **Geist** (variable) | Titres + corps de texte | Tout le texte « humain ». |
| **Secondaire** | **Geist Mono** (variable) | Labels, code, mascotte, brackets, chiffres techniques | Détails, tech, accents typographiques. |

> Geist est gratuite (Vercel). Si indisponible dans l'outil : fallback **Inter** (principale)
> et **JetBrains Mono** ou **IBM Plex Mono** (secondaire).

### Échelle de tailles (reprise du site, adaptée slide 16:9)

| Niveau | Taille de référence | Poids | Police |
|---|---|---|---|
| Display XXL (titre d'ouverture) | 96–120 pt | 700 (Bold) | Geist |
| Display XL (titre de section) | 56–72 pt | 700 | Geist |
| H1 (titre de slide) | 36–48 pt | 700 | Geist |
| H2 (sous-titre) | 24–32 pt | 600 (Semibold) | Geist |
| Corps | 18–22 pt | 400–500 | Geist |
| Label / kicker | 12–14 pt | 500, **UPPERCASE**, `letter-spacing 0.08–0.1em` | Geist **Mono** |
| Code / data | 14–18 pt | 400 | Geist Mono |

### Réglages fins
- Titres : `letter-spacing` légèrement négatif (`-0.015em`), interligne serré (`line-height 1`).
- Corps : interligne aéré (1.4–1.5).
- Activer les ligatures / kerning si l'outil le permet (`ss01` sur le site).
- **Pas de tiret cadratin (-)**, ni dans les titres ni dans le texte. Virgule, deux-points ou parenthèses.

---

## 3. La mascotte - Cody

Cody n'est **pas un dessin** : c'est un visage **ASCII en Geist Mono**, encadré par des brackets.

```
[ o_o ]
```

### Anatomie
`bracket gauche` + `œil gauche` + `bouche` (à 70% d'opacité) + `œil droit` + `bracket droit`.

### Brackets disponibles
`[ ]` square (défaut) · `( )` round · `{ }` curly · `< >` angle.

### Humeurs (yeux / bouche) - pioche selon le contexte de la slide

| Mood | Visage | Quand l'utiliser |
|---|---|---|
| idle | `[ o_o ]` | Neutre, transition. |
| curious | `[ o_O ]` | Question, ouverture. |
| happy | `[ ^‿^ ]` | Résultat positif, win. |
| confused | `[ ?~? ]` | Problème, « avant ». |
| thinking | `[ -.- ]` | Réflexion, process. |
| star | `[ ✦‿✦ ]` | Highlight, démo. |
| wow | `[ ✦o✦ ]` | Effet « waouh », big reveal. |
| code | `[ </> ]` | Slide technique. |
| wink | `[ -‿o ]` | Aparté, clin d'œil. |
| love | `[ ♥‿♥ ]` | Passion, projet perso. |
| sleep | `[ z~z ]` | Pause, fin. |
| brand | `[ B_D ]` | Logo / signature BDDev. |

### Règles d'emploi
- Cody est en **Geist Mono, gras**, couleur **FG** (`#FDFBF3`) sur fond sombre.
- Sur fond clair (carte cream) → couleur **BG** (`#2A2522`).
- Le burst d'attention = particules `✦` en **Pink**.
- 1 Cody par slide maximum. Il **ponctue**, il ne décore pas partout.
- Taille : assez gros pour être lisible (les brackets font l'identité), pas un mini-logo.

---

## 4. Petits éléments signature (le détail qui fait la DA)

Ce sont eux qui rendent une slide « BDDev » plutôt que générique.

- **Brackets `[ ]`** partout : encadrer un titre fort, un chiffre clé, un mot. C'est le motif central.
- **Kicker mono** au-dessus des titres : `// SECTION` ou `_LABEL` en Geist Mono uppercase, opacité 70%.
  Préfixes possibles : `//`, `_`, `[]`.
- **Tag / pill** : texte mono uppercase, `letter-spacing 0.1em`, dans une pilule à coins ronds
  (`border-radius: 9999px`), bordure fine `FG @ 15%`, fond `FG @ 5%`. Pour les techno / tags.
- **Divider à brackets** : `[ ───────── ]` (un crochet, une ligne fine `FG @ 20%`, un crochet)
  pour séparer deux blocs.
- **Coins arrondis généreux** : 16px (cartes std), 32px (grandes cartes), 64px (blocs héro).
  Boutons et pills = **totalement arrondis** (pilule).
- **Cartes** : 3 tons → `cream` (claire, texte sombre), `glass` (fond `FG @ 5%` + flou, bordure `FG @ 10%`),
  `outline` (transparent, bordure `FG @ 20%`). Sur slide, privilégier **glass** et **outline**.
- **Curseur / caret** clignotant pour un effet « typewriter » sur un mot révélé.
- **Marquee / bandeau défilant** en mono pour une liste de technos (si l'outil l'autorise en anim).

---

## 5. Fonds & ambiance

Le fond du site n'est pas plat : ce sont des **blobs flous** qui dérivent lentement.
Pour reproduire l'ambiance sur une slide d'ouverture / section :

- Base : fond sombre `#2A2522`.
- 3 à 5 **taches radiales floues** (gros flou, ~80px), en **mode fusion `screen`**, faible opacité (0.3–0.85) :
  Indigo, Indigo-2, Pink, Pink-2, et une touche **Cream** en `overlay` (opacité ~0.35).
- Disposition asymétrique (coins opposés), tailles variées.
- Optionnel : **overlay de bruit** (`noise`) à très faible opacité (~4%, blend `overlay`) pour la texture.

Palettes prêtes :
- **hero** : indigo + pink + cream → slide de titre / ouverture.
- **froid** : indigos + bleus (`oklch(60% 0.2 220)`) → sections tech.
- **chaud** : pinks + ambres (`oklch(78% 0.18 60)`) → 1 slide accent, à doser.

> Pour les slides de contenu dense : fond sombre **uni** (`#2A2522`), garder les blobs pour titre/section.

---

## 6. Mouvement (si l'outil anime)

- **Ease signature** : `cubic-bezier(0.32, 0.72, 0, 1)` (départ vif, fin douce). À utiliser sur toutes
  les transitions d'éléments.
- Entrées : `rise-in` (monte de ~32px + fade) ou `scale-in` (de 0.96 à 1 + fade), ~300–400ms.
- Hover/clic : léger soulèvement (`translateY -2 à -4px`) + ombre douce.
- Cody : cligne des yeux aléatoirement, regarde le curseur, « pulse » + burst `✦` au clic.
- **Reduced motion** : prévoir une version sans anim (le site respecte `prefers-reduced-motion`).

---

## 7. Règles d'or (récap)

1. Fond **toujours sombre et chaud** (`#2A2522`), texte **crème** (`#FDFBF3`), jamais de noir/blanc purs.
2. **2 polices** : Geist (texte) + Geist Mono (détails/tech/Cody). Pas une troisième.
3. Accents = **Indigo + Pink**, surtout en **dégradé 135°**. Réservés aux moments forts.
4. Le motif **`[ ]`** structure tout : titres, chiffres, dividers, et Cody.
5. **Cody une fois par slide**, humeur choisie selon le propos.
6. Coins **très arrondis**, pills totalement rondes, cartes glass/outline.
7. Espaces généreux, hiérarchie typo nette, **pas de tiret cadratin**.
8. Mouvement discret avec l'**ease signature**, jamais clinquant.

---

## 8. Appliquer cette DA

- **Slides** : utilise cette charte comme référence pour monter tes diapos toi-même
  (Keynote / PowerPoint / Canva / Google Slides). Tout est dans les sections 1 à 7.
- **Document / PDF / Google Docs** → [`document/`](./document/) : un `document.md` unique qui
  génère un PDF à la DA sombre (pandoc + weasyprint) et s'importe dans Google Docs.
