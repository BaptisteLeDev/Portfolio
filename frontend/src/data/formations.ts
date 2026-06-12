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
