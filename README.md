# Portfolio, Baptiste Dechamp

Portfolio de Baptiste Dechamp, développeur web full-stack : projets, stack technique, CV et contact.

**Site : [baptisteledev.fr](https://baptisteledev.fr)** · miroir : [baptisteledev.github.io](https://baptisteledev.github.io)

## Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Motion](https://img.shields.io/badge/motion-%23000000.svg?style=for-the-badge&logo=framer&logoColor=%23FFF200)
![React Router](https://img.shields.io/badge/React_Router-%23CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-%2326A69A.svg?style=for-the-badge&logo=i18next&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-%236E9F18.svg?style=for-the-badge&logo=vitest&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Lancer en local

```bash
cd frontend
pnpm install
pnpm dev        # serveur de dev
pnpm build      # build de prod dans frontend/dist (sitemap.xml inclus)
pnpm test       # tests Vitest
pnpm lint       # oxlint
```

## Structure

```
frontend/
  public/          fichiers statiques (CV, images, vidéos, robots.txt)
  src/
    pages/         Accueil, Portfolio, ProjectPage, 404
    components/    UI, effets, navigation, mascotte Cody
    data/          projets, stack, compétences, formations
    i18n/          traductions fr / en
    lib/           utilitaires, SEO (titre, description, canonical par page)
```

Ajouter un projet = une entrée dans `frontend/src/data/projects.ts` : sa page et son entrée dans le sitemap suivent toutes seules.

## Déploiement

- **Vercel** : `main` part en production sur baptisteledev.fr, les autres branches en preview (non indexées).
- **GitHub Pages** : copier `frontend/dist/` dans le repo [BaptisteLeDev.github.io](https://github.com/BaptisteLeDev/BaptisteLeDev.github.io), puis copier `index.html` en `404.html` (sinon les liens directs vers `/portfolio/...` tombent en 404).
