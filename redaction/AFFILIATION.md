# Activer un lien d'affiliation

Les liens partenaires sont pilotés par `src/data/affiliation.json`. Tant qu'aucun partenaire n'est `actif` avec une `url`, le site affirme qu'il ne contient aucun lien affilié (pages À propos, Méthode, Partenariats, comparateurs). Dès qu'un lien est actif, ces pages passent automatiquement à la phrase de transparence (`PHRASE_LIENS` dans `src/lib/affiliation.ts`), et le lien s'affiche avec `rel="sponsored nofollow noopener"` et la mention « lien partenaire ».

## Avant d'activer XTB (ou tout autre acteur)

1. **Données** : passer l'entrée de l'acteur à `verifie: true` dans `src/data/comparateurs/courtiers.json`, avec tous les tarifs lus dans sa grille officielle (jamais depuis un site tiers). L'entrée XTB est créée, vide, avec `verifie: false`.
2. **CFD** : la publicité directe ou indirecte, par voie électronique, pour certains contrats très risqués (options binaires, CFD, contrats sur devises) est encadrée par la loi Sapin II. Un lien d'affiliation vers un opérateur qui propose des CFD peut relever de ce régime. Faire valider la conformité par la personne compétente (juriste, compliance) avant d'activer, et ne jamais mettre en avant les CFD.
3. **Programme d'affiliation** : s'inscrire auprès de l'acteur ou de son réseau d'affiliation, récupérer l'URL de suivi, vérifier que le programme autorise un site d'éducation financière.
4. **Transparence** : loi du 9 juin 2023 sur l'influence commerciale, mention claire de la relation commerciale. Les mentions légales (société éditrice) doivent être complétées.

## Activer

Dans `src/data/affiliation.json` : renseigner `url`, passer `actif` à `true`. Puis `npm run build && npm run verifier`, puis publier.

## Ce qui ne change jamais

Aucun acteur ne paie pour figurer dans un comparateur ni pour améliorer sa place. L'ordre d'affichage et le « moins cher selon le critère » sont calculés sur les données vérifiées, jamais sur l'existence d'un lien partenaire.
