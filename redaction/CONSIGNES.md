# Consignes de la publication quotidienne

Chaque jour, une session automatique publie **un article** sur nousparlonsplacement.com et entretient les pages existantes. Ces consignes s'appliquent à la lettre. En cas de blocage, ne rien publier et l'expliquer dans le résumé final.

## 0. Préparer

```bash
npm ci
```

Lire en entier : `redaction/CHARTE.md` (règles non négociables), `redaction/VISUELS.md` (visuels), `redaction/PLAN.md` (chemins existants), `redaction/CALENDRIER.md` (sujets), `redaction/JOURNAL.md` (ce qui est déjà publié). Date du jour : heure de Paris.

## 1. Choisir le sujet

1. Si un **rendez-vous daté** du calendrier tombe aujourd'hui ou est passé sans avoir été traité, il est prioritaire.
2. Si une **actualité réglementaire majeure** a été publiée dans les dernières 48 heures sur une source primaire (nouveau taux du Livret A, loi de finances, décision du HCSF, alerte de l'AMF), l'article du jour l'explique (`type: actualite`, catégorie concernée). Mettre aussi à jour les guides touchés (voir 4).
3. Sinon, prendre le **premier sujet « À faire »** du calendrier.
4. Vérifier qu'aucune page existante ne traite déjà la même requête (`grep -ril "<requête>" src/content`). Si un guide la couvre, choisir un angle plus précis qui lui renvoie, ou passer au sujet suivant.

## 2. Rechercher

- Chercher la requête principale (WebSearch) : quelle intention, quelles sous-questions couvrent les premiers résultats, ce qui leur manque.
- Rassembler les **sources primaires** (liste dans la charte) et lire les pages officielles du jour (WebFetch). Chaque chiffre, taux, plafond, date ou règle est vérifié en vigueur aujourd'hui. Ne jamais écrire un chiffre de mémoire.
- Un chiffre non vérifiable sur une source primaire n'est pas écrit.

## 3. Écrire

Fichier `src/content/articles/<categorie>/<slug>.md`, frontmatter complet (charte, section 5), `type: article` (ou `actualite`), `publie` et `misAJour` = date du jour.

- 900 à 1 600 mots, 2 à 3 visuels (`redaction/VISUELS.md`) et un `chiffre` clé dans le frontmatter, chapô qui répond tout de suite, sections `##` en forme de vraies questions, un tableau si l'on compare, encadrés `> **Exemple.**`, notes `[^1]` pour chaque chiffre.
- 4 à 8 liens internes vers des chemins existants (PLAN, articles du JOURNAL, `/lexique/<slug>/`, simulateurs, comparateurs).
- `liens` : 3 chemins existants pour « À lire aussi ».
- Tutoiement, aucun produit commercial nommé, risques dits, aucune recommandation, aucun tiret long ni moyen.

## 4. Entretenir le site

- **Maillage** : ajouter un lien vers le nouvel article depuis 1 ou 2 pages existantes proches (une phrase utile dans le corps d'un guide, ou son champ `liens`). Ne pas réécrire ces pages.
- **Mises à jour** : si une règle ou un chiffre a changé (taux réglementés au 1er février et au 1er août, barème de l'impôt en début d'année, plafonds annuels), corriger toutes les pages concernées, leurs notes et leur `misAJour`. Chercher avec `grep -rn` dans `src/content` et `src/pages`.
- **Tableau de bord de l'accueil** (`src/data/chiffres.json`) : si l'un de ses chiffres a changé (taux des livrets, inflation, PFU, plafonds), le mettre à jour avec sa source et la date `miseAJour`.
- Ajouter une entrée au lexique quand l'article utilise un terme important qui n'y figure pas (`src/content/lexique/<slug>.md`, charte section 6), et l'ajouter à la liste du PLAN.

## 5. Contrôler (obligatoire)

```bash
node scripts/og.mjs && npm run build && npm run verifier
```

(`scripts/og.mjs` crée l'image de partage du nouvel article dans `public/og/`.)

- **Zéro erreur** au vérificateur. Traiter chaque alerte « chiffre sans note » : ajouter la note, ou confirmer que le chiffre est un exemple hypothétique présenté comme tel.
- Relire l'article en entier une dernière fois : exactitude, orthographe, conformité (aucun conseil, aucun produit nommé), clarté. Vérifier que chaque note pointe vers la bonne page et que le chiffre cité y figure.

## 6. Publier

```bash
git add -A
git -c user.name="Parlons Placement" -c user.email="parlonsplacement@users.noreply.github.com" commit -m "Article : <titre>"
git push origin main
```

Le déploiement GitHub Pages part automatiquement. Contrôler qu'il réussit : `gh run list --repo TESNIERES/nousparlonsplacement --limit 1` (attendre « completed success », relancer la vérification au bout de 2 minutes si besoin). En cas d'échec, lire le journal (`gh run view --log-failed`), corriger, republier.

## 7. Tenir le suivi

- `redaction/JOURNAL.md` : ajouter une ligne (date, chemin, requête, sources principales, statut).
- `redaction/CALENDRIER.md` : passer le sujet en « Publié » avec la date. Quand il reste moins de 10 sujets « À faire », en ajouter 20 nouveaux, construits comme les autres : requête réelle, intention claire, rubrique, angle, sans doublon avec l'existant.
- Commit et push.

## 8. Résumé final (5 lignes)

Article publié (titre et URL), sources principales, pages mises à jour, résultat du vérificateur et du déploiement, points d'attention éventuels.
