# nousparlonsplacement.com - site de Parlons Placement

Site statique Astro, déployé sur GitHub Pages par `.github/workflows/deploy.yml` à chaque push sur `main`.

Avant toute rédaction ou publication : lire `redaction/CHARTE.md` et suivre `redaction/CONSIGNES.md` à la lettre. Le contrôle `npm run build && npm run verifier` doit passer sans erreur avant chaque push.

- Contenus : `src/content/articles/<categorie>/<slug>.md`, `src/content/lexique/<slug>.md`
- Données des comparateurs : `src/data/comparateurs/*.json` (relevées sur documents officiels uniquement)
- Gabarits : `src/layouts/`, pages : `src/pages/`, styles : `src/styles/global.css`
- Suivi : `redaction/CALENDRIER.md`, `redaction/JOURNAL.md`
