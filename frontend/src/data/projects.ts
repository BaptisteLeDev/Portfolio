export type ProjectType = "web" | "mobile" | "desktop" | "fullstack" | "design";
export type ProjectStatus = "live" | "archived" | "wip";

export interface ProjectVersion {
  label: string;
  stack: string[];
  note: string;
}

export interface SitemapNode {
  label: string;
  path: string;
  children?: SitemapNode[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  period: string;
  stack: string[];
  types: ProjectType[];
  status: ProjectStatus;
  thumbnail:
    | { kind: "gradient"; palette: "hero" | "chaud" | "froid" }
    | { kind: "image"; src: string };
  links?: { live?: string; repo?: string; figma?: string };
  versions?: ProjectVersion[];
  sitemap?: SitemapNode[];
  screenshots?: string[];
  videos?: string[];
  problem?: string;
  solution?: string;
  outcome?: string;
  brief?: { src: string; title: string };
  team?: { name: string; url: string }[];
}

// Ordre = dernier commit du repo source (desc), projets sans repo ranges par periode.
export const projects: Project[] = [
  {
    id: "stream-dashboard",
    title: "StreamooS",
    tagline: "Poste de pilotage desktop pour streameurs.",
    description:
      "Application desktop Electron qui pilote des overlays OBS en local via WebSocket, avec dashboard React, alertes Twitch EventSub, radio KHInsider, timer et Discord RPC. Télécommande mobile PWA sur le LAN (appairage par code PIN) et plugin Stream Deck. React + Vite + Tailwind embarqués, persistance SQLite locale.",
    role: "Développeur principal",
    period: "2025",
    stack: ["Electron", "React", "Vite", "Tailwind", "TypeScript", "Node"],
    types: ["desktop"],
    status: "wip",
    thumbnail: { kind: "gradient", palette: "chaud" },
    screenshots: [
      "/images/streamoos/shot-01.png",
      "/images/streamoos/shot-02.png",
      "/images/streamoos/shot-03.png",
      "/images/streamoos/shot-04.png",
      "/images/streamoos/shot-05.png",
      "/images/streamoos/dashboard-home.png",
      "/images/streamoos/stream-manager.png",
    ],
    problem: "Les outils streameurs sont dispersés entre OBS, plateformes web et scripts - pas de cockpit unifié.",
    solution: "App Electron centralisant overlays, alertes et stats dans une UI moderne et rapide.",
    outcome: "En développement - MVP fonctionnel avec alertes Twitch et overlay config.",
  },
  {
    id: "botdiscordfactory",
    title: "BotDiscordFactory",
    tagline: "Flotte de bots Discord pour communautés de streameurs.",
    description:
      "Méta-workspace qui fédère une flotte de 4 bots Discord pour des communautés de streameurs (ReNamioos, Coverioos, Moodioos, Collabioos), 1 bot = 1 repo. Stack cible Bun + TypeScript + discord.js v14, API Fastify sous contrat publié (/health, /stats) supervisée par bdf-monitor, un projet Neon Postgres par bot, design system Astro (@bdf/design) et portail vitrine. Sites sur Vercel, bots sur VPS dark via Dokploy (aucun port entrant public, tailnet Tailscale).",
    role: "Développeur de la flotte",
    period: "Octobre 2025 - Septembre 2026",
    stack: ["Bun", "TypeScript", "discord.js v14", "Fastify", "Drizzle ORM", "Neon Postgres", "Astro", "Elysia"],
    types: ["fullstack"],
    status: "live",
    thumbnail: { kind: "image", src: "/images/botdiscordfactory/cover.png" },
    screenshots: ["/images/botdiscordfactory/cover.png"],
    problem:
      "Une flotte de bots Discord indépendants (1 bot = 1 repo) : garder cohérence, qualité et supervision sans monorepo ni copier-coller de standards.",
    solution:
      "Méta-workspace fédérateur : langage ubiquitaire, ADR, template partagé, et monitoring de flotte via un contrat /health /stats respecté par chaque bot.",
    outcome:
      "ReNamioos et Coverioos réécrits en Bun/TS, Moodioos aligné (runtime Node 22), Collabioos en conception - le tout supervisé par bdf-monitor, portail vitrine déployé.",
  },
  {
    id: "moodioos",
    title: "Moodioos",
    tagline: "Bot d'humeur : la positivité en une slash command.",
    description:
      "Bot de bien-être de la flotte BotDiscordFactory : votes d'humeur, /hug avec GIF et commandes wellness, stats d'impact par serveur. 20 commandes, présent sur 3 serveurs au moment des captures. Comme chaque bot de la flotte, son site commun est le portail BotDiscordFactory - pas de site standalone. API Fastify sous contrat /health /stats pour le monitoring de flotte, Drizzle + Postgres Neon, runtime Node 22 (la feature vocale reste incompatible Bun).",
    role: "Développeur du bot",
    period: "Juin 2026 - Septembre 2026",
    stack: ["TypeScript", "Node.js 22", "discord.js v14", "Fastify", "Drizzle ORM"],
    types: ["fullstack"],
    status: "live",
    thumbnail: { kind: "image", src: "/images/moodioos/mood-01.png" },
    screenshots: [
      "/images/moodioos/mood-01.png",
      "/images/moodioos/mood-02.png",
      "/images/moodioos/mood-03.png",
    ],
    problem:
      "Maintenir une ambiance positive dans une communauté Discord demande des interactions régulières : votes d'humeur, câlins, petits gestes.",
    solution:
      "Bot wellness : /mood (compliments, musiques, votes d'humeur), /hug, stats d'impact par serveur - supervisé comme le reste de la flotte.",
    outcome:
      "Bot en production sur 3 serveurs, supervisé par bdf-monitor via le contrat /health /stats, onboarding flotte terminé (contrat + Docker + registre).",
  },
  {
    id: "rss-news",
    title: "RSS-News",
    tagline: "Veille RSS multi-sources : reader perso + API pour agent.",
    description:
      "Reader de veille perso organisé en Verticals (Dev, Gaming, Social - une base Neon par univers), Lens IA (vue filtrée) et Directory (annuaire d'outils curés). Reader filtrable par stack, source, lus et sauvegardés, digest, graph des topics, alertes sécurité. Une API on-demand bearer-token alimente AOS, l'agent perso : articles filtrés, live-fetch, taxonomie. Ingestion cron 2x/jour sur Vercel, IA on-demand via OpenRouter.",
    role: "Développeur fullstack",
    period: "Mai 2026 - Juillet 2026",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Drizzle ORM", "Neon Postgres", "rss-parser"],
    types: ["fullstack"],
    status: "live",
    thumbnail: { kind: "image", src: "/images/rss-news/home.png" },
    screenshots: ["/images/rss-news/home.png", "/images/rss-news/security.png"],
    problem:
      "Trop de sources de veille, aucun filtrage par stack - et rien de consommable directement par un agent pour agir sur les news.",
    solution:
      "Verticals isolés (une base Neon par univers), reader filtrable (stack, source, lus, sauvegardés) et API bearer-token on-demand pour AOS.",
    outcome:
      "Reader en usage quotidien, cron d'ingestion 2x/jour sur Vercel, l'API alimente l'agent AOS (advisories sécu, nouvelles features).",
  },
  {
    id: "amigaru",
    title: "Amigaru",
    tagline: "Trois vies d'un même produit, trois stacks.",
    description:
      "Plateforme communautaire de mise en avant des créateurs VTubers francophones, pensée comme un terrain d'évolution technique : v1 PHP/MySQL, v2 React + Vite, v3 Next.js en production. Turborepo monorepo (site public + back-office admin), Supabase pour l'auth et le storage, design system documenté sur Storybook et docs d'architecture actives.",
    role: "Lead développeur",
    period: "2023 - 2025",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Storybook", "Radix UI"],
    types: ["web", "fullstack", "design"],
    status: "live",
    thumbnail: { kind: "image", src: "/images/amigaru/cover.png" },
    links: { live: "https://amigaru.fr" },
    brief: { src: "/docs/amigaru-brief-mds.pdf", title: "Brief du projet - MyDigitalSchool" },
    team: [
      { name: "Baptiste Dechamp", url: "https://www.linkedin.com/in/baptistedechamp/" },
      { name: "Raphaël Launay", url: "https://www.linkedin.com/in/raphaellaunay/" },
      { name: "Léa Chastanier", url: "https://www.linkedin.com/in/lea-chastanier-019537255/" },
      { name: "Alice Goaoc", url: "https://www.linkedin.com/in/alice-goaoc-6135521b8/" },
    ],
    versions: [
      { label: "v1 - MVP", stack: ["PHP", "MySQL", "Tailwind", "jQuery"], note: "Preuve de concept, solo dev, focus sur les flux métier." },
      { label: "v2 - SPA", stack: ["React", "Vite", "Tailwind"], note: "Passage au front réactif, API séparée, premiers composants partagés." },
      { label: "v3 - Prod", stack: ["Next.js", "TypeScript", "Storybook", "Supabase"], note: "App-router, Supabase (auth + storage), design system documenté, dashboard admin." },
    ],
    screenshots: [
      "/images/amigaru/web-home.png",
      "/images/amigaru/web-blog.png",
      "/images/amigaru/web-join.png",
      "/images/amigaru/admin-login.png",
    ],
    sitemap: [
      { label: "Accueil EN", path: "/en", children: [
        { label: "Wishlist", path: "/en/wishlist" },
        { label: "Blog", path: "/en/blog", children: [
          { label: "VTubing : streameurs, audiences, marques", path: "/en/blog/vtubing-streameurs-audiences-marques" },
        ]},
        { label: "Legal", path: "/en/legal", children: [
          { label: "Mentions légales", path: "/en/legal/mentions-legales" },
          { label: "Politique de confidentialité", path: "/en/legal/politique-confidentialite" },
          { label: "RGPD", path: "/en/legal/rgpd" },
          { label: "Cookies", path: "/en/legal/cookies" },
        ]},
        { label: "VTubers", path: "/en/vtubers", children: [
          { label: "Directory", path: "/en/vtubers/directory" },
          { label: "Studi00s", path: "/en/vtubers/studi00s" },
        ]},
        { label: "About", path: "/en/about" },
      ]},
      { label: "VTubers FR", path: "/vtubers" },
      { label: "Legal FR", path: "/legal" },
    ],
    problem: "Une idée qui n'a cessé de grandir ; chaque montée en ambition a poussé la stack à évoluer.",
    solution: "Trois versions successives sans tout jeter - chaque itération résout un problème précis.",
    outcome: "v3 en production, codebase qui incarne un vrai parcours d'apprentissage, sert de vitrine technique.",
  },
  {
    id: "0viewers",
    title: "0Viewers",
    tagline: "Découverte des streamers Twitch à 0 viewers.",
    description:
      "Projet école MDS B3 en binôme : donner de la visibilité aux streamers francophones qui n'ont pas encore d'audience. Back Node/Express qui interroge l'API Twitch Helix (streams FR aux plus petites audiences, cache 10 min, reco quotidienne) et front React + Vite : liste filtrable, embeds Twitch, comptes utilisateurs et profils via Supabase.",
    role: "Développeur fullstack (binôme)",
    period: "Septembre 2025",
    stack: ["React 19", "Vite", "Node", "Express", "Twitch API", "Supabase"],
    types: ["web", "fullstack"],
    status: "wip",
    thumbnail: { kind: "gradient", palette: "chaud" },
    screenshots: ["/images/0viewers/signin.png"],
    problem:
      "Un streamer à 0 viewers reste invisible : sans audience, pas de découverte - et sans découverte, pas d'audience.",
    solution:
      "Filtrage Twitch Helix (FR, 0 viewers, plus petites audiences), recommandation quotidienne, comptes et soutiens communautaires.",
    outcome:
      "Prototype front + back livré en quelques jours dans le cadre MDS B3 ; les données live dépendent du back (cache Twitch) resté local. Prochaine étape : mise en production.",
  },
  {
    id: "seira-like",
    title: "MontoMaster",
    tagline: "Plateforme pédagogique cross-plateforme.",
    description:
      "Inspirée de Seira, plateforme éducative interactive. Web en Angular, mobile en Expo/React Native, backend Laravel pour API et auth. Démonstration de la capacité à orchestrer plusieurs écosystèmes sur un même produit.",
    role: "Développeur fullstack",
    period: "2025",
    stack: ["Angular", "Expo", "React Native", "Laravel", "PHP", "MySQL", "TypeScript"],
    types: ["fullstack"],
    status: "archived",
    thumbnail: { kind: "gradient", palette: "froid" },
    videos: ["/videos/montomaster/demo.mp4", "/videos/montomaster/capture.webm"],
    problem: "Proposer une expérience éducative cohérente web + mobile avec un back solide.",
    solution: "Stack multi-plateforme : Angular (web), Expo/RN (mobile), Laravel (API et auth).",
    outcome: "Architecture validée, API opérationnelle - développement stoppé.",
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
    types: ["design"],
    status: "archived",
    thumbnail: { kind: "image", src: "/images/g-en/cover.png" },
    outcome: "Prototype cliquable, dossier marketing complet, concept validé en jury.",
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
    types: ["web"],
    status: "archived",
    thumbnail: { kind: "image", src: "/images/erwan-ewen/cover.png" },
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
    types: ["design"],
    status: "archived",
    thumbnail: { kind: "image", src: "/images/festival-vibrations/cover.png" },
  },
  {
    id: "devflix",
    title: "DevFlix",
    tagline: "Clone Netflix pédagogique - streaming de cours.",
    description:
      "Exercice d'école : réinventer une interface streaming pour du contenu technique. UI inspirée de la VOD mais pensée pour du cours court - rangées thématiques, player sticky, progression par piste.",
    role: "Développeur front",
    period: "Juin 2024",
    stack: ["React", "Vite", "Node", "Firebase", "TMDB API", "Tailwind"],
    types: ["fullstack"],
    status: "archived",
    thumbnail: { kind: "image", src: "/images/devflix/cover.jpg" },
    problem: "Exercice d'école : réinventer une interface streaming pour du contenu technique.",
    solution: "UI VOD adaptée au cours court, rangées thématiques, player sticky.",
    outcome: "Livré en 10 jours, 18/20, repris en portfolio.",
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
    types: ["design"],
    status: "archived",
    thumbnail: { kind: "image", src: "/images/vannes-agglo/cover.png" },
  },
];
