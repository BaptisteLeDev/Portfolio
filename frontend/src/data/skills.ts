// Pas de level/barre - juste une liste groupée. Ordre = priorité affichage (dev-first).
export type SkillGroup = "Dev" | "Conception" | "Design" | "Outils";

export const hardSkills: Record<SkillGroup, string[]> = {
  Dev: [
    "TypeScript",
    "React / React Native",
    "Next.js",
    "Tailwind",
    "Node.js",
    "Electron",
    "Laravel / PHP",
    "Angular",
    "SQL / Supabase",
  ],
  Conception: ["Architecture", "Modélisation", "Accessibilité / Perf"],
  Design: ["Figma", "UX/UI", "Illustrator", "Photoshop"],
  Outils: ["Git / CI", "Storybook", "pnpm", "Vercel"],
};

export const softSkills = [
  { label: "Adaptabilité",     note: "Je bascule vite entre stacks et rôles sans friction." },
  { label: "Esprit d'analyse", note: "Je décortique un problème avant d'écrire du code." },
  { label: "Écoute",           note: "Je reformule plus que je n'impose." },
  { label: "Contexte",         note: "Je cherche le « pourquoi » avant le « comment »." },
];
