export type StackCategory = "tooling" | "frontend" | "mobile" | "desktop" | "backend" | "data" | "infra" | "design";

export interface StackItem {
  label: string;
  category: StackCategory;
}

export const stackItems: StackItem[] = [
  { label: "Vite",         category: "tooling" },
  { label: "VoidZero",     category: "tooling" },
  { label: "pnpm",         category: "tooling" },
  { label: "React 19",     category: "frontend" },
  { label: "Next.js 16",   category: "frontend" },
  { label: "Angular",      category: "frontend" },
  { label: "Tailwind 4",   category: "frontend" },
  { label: "TypeScript",   category: "frontend" },
  { label: "Expo",         category: "mobile" },
  { label: "React Native", category: "mobile" },
  { label: "Electron",     category: "desktop" },
  { label: "Laravel",      category: "backend" },
  { label: "PHP",          category: "backend" },
  { label: "Node",         category: "backend" },
  { label: "Supabase",     category: "data" },
  { label: "Vercel",       category: "infra" },
  { label: "Storybook",    category: "tooling" },
  { label: "Figma",        category: "design" },
];
