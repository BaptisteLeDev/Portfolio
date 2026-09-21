# Document BDDev - PDF + Google Docs

Deux sorties depuis **un seul** `document.md` :

1. **PDF** à la DA BDDev (fond sombre, Geist, accents pink) via `theme.css`.
2. **Google Docs** : le même markdown s'importe directement dans Docs.

C'est le pendant « document » des slides Slidev (voir [`../slidev/`](../slidev/)).
Pour la charte complète : [`../SLIDES-DESIGN.md`](../SLIDES-DESIGN.md).

## 1. Générer le PDF (DA sombre)

Pré-requis : [pandoc](https://pandoc.org/) + [weasyprint](https://weasyprint.org/)
(`pip install weasyprint`). weasyprint applique correctement le CSS (fond, fonts, couleurs).

```bash
cd docs/document
pandoc document.md --standalone --pdf-engine=weasyprint --css=theme.css --metadata=lang:fr -o document.pdf
```

Variante HTML (aperçu navigateur, mêmes styles) :

```bash
pandoc document.md -s --css=theme.css --embed-resources -o document.html
```

## 2. Migrer vers Google Docs

Le markdown est **standard** (pas de syntaxe exotique), donc il s'importe tel quel :

- **Drive** : Nouveau → Importer `document.md` → clic droit → *Ouvrir avec Google Docs*.
- ou **Docs** : Outils → Paramètres → activer *Markdown*, puis coller le contenu.

> Google Docs est un éditeur **clair** : il ne reprend pas le fond sombre. Il garde la
> **structure** (titres, listes, tableaux, gras/italique, liens). La DA s'y applique en
> version claire, à la main, une fois importé.

### DA dans Google Docs (checklist rapide)

- **Polices** : titres et corps en **Geist**, code/labels en **Geist Mono**
  (Docs → menu police → *Plus de polices*… si Geist absent : **Inter** + **JetBrains Mono**).
- **Couleur d'accent** : appliquer le **pink `#F9487F`** aux titres H1/H2 ou aux mots forts.
- **Kicker** : les `###### // SECTION` deviennent un petit texte ; passe-le en Geist Mono,
  majuscules, gris, au-dessus du titre.
- **Mascotte** : garder Cody en texte mono, ex. `[ ^‿^ ]`, pas en image.
- Fond clair recommandé pour un doc Docs ; garde le PDF sombre pour la version « brandée ».

## Fichiers

| Fichier | Rôle |
|---|---|
| `document.md` | Contenu (modèle). À dupliquer/éditer. |
| `theme.css` | DA sombre pour le PDF/HTML (pandoc + weasyprint). |
