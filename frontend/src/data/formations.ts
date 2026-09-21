export interface Formation {
  year: string;
  title: string;
  school: string;
  note?: string;
}

export const formations: Formation[] = [
  {
    year: "2023 - 2026",
    title: "Titre professionnel CDA - Concepteur Développeur Web et Mobile",
    school: "MyDigitalSchool Vannes",
    note: "RNCP niveau 6, obtenu sur 3 ans. Full-stack JS/TS, conception applicative, alternance chez Tom Explore en 3e année.",
  },
  {
    year: "2021 - 2023",
    title: "Baccalauréat STI2D",
    school: "Lycée Polyvalent Chaptal",
    note: "Sciences et technologies de l'industrie et du développement durable.",
  },
  {
    year: "2019 - 2021",
    title: "Études générales",
    school: "Lycée Henri Avril, Lamballe",
  },
];
