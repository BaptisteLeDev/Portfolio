export type ProjectType = "web" | "mobile" | "desktop" | "fullstack" | "design";
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
  thumbnail:
    | { kind: "gradient"; palette: "hero" | "chaud" | "froid" }
    | { kind: "image"; src: string };
  links?: { live?: string; repo?: string; figma?: string };
  versions?: ProjectVersion[];
  screenshots?: string[];
  problem?: string;
  solution?: string;
  outcome?: string;
}

// Ordre = ordre d'affichage (dev-first puis design secondaire).
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
