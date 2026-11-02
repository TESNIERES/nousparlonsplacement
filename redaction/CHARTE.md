# Charte éditoriale - nousparlonsplacement.com

Le site de Parlons Placement explique l'argent simplement : épargne, bourse, immobilier, retraite, fiscalité, crédit. Il guide, il ne conseille pas. Chaque page doit être la meilleure réponse en français à la question qu'elle traite : la plus juste, la plus claire, la mieux sourcée.

Lecteurs : jeunes actifs et trentenaires qui veulent comprendre, épargnants qui se lancent, conseillers en gestion de patrimoine (CGP) qui veulent une référence fiable à partager.

## 1. Conformité (non négociable)

Le site fait de l'éducation financière. Il ne fournit jamais de conseil en investissement personnalisé.

- **Décrire, jamais prescrire.** Interdit : « tu devrais », « nous recommandons », « le meilleur placement », « investis dans », « fonce », « à saisir », toute promesse de rendement, « sans risque » pour un actif risqué.
- **Aucun produit commercial nommé dans les guides et articles** (banque, courtier, assureur, contrat, fonds, SCPI, plateforme). Les indices (CAC 40, MSCI World, S&P 500), les institutions publiques et les dispositifs légaux se nomment normalement. Les acteurs commerciaux n'apparaissent que dans les comparateurs, selon leur méthode.
- **Risques toujours dits.** Actions, ETF, unités de compte, SCPI, private equity, crypto-actifs : rappeler le risque de perte en capital, totale ou partielle. Toute performance passée citée est suivie de : « Les performances passées ne préjugent pas des performances futures. »
- **Renvoyer vers un professionnel habilité** pour toute situation personnelle : conseiller en investissements financiers (CIF), courtier, notaire, expert-comptable, avocat fiscaliste. Une phrase suffit, à l'endroit où le lecteur en a besoin.
- **Crypto-actifs** : factuel uniquement (fonctionnement, risques, cadre MiCA et liste des prestataires agréés de l'AMF). Jamais de plateforme nommée.
- **Exemples** : chiffrés, hypothétiques, toujours présentés comme tels (« Exemple : tu verses 100 € par mois… »). Jamais de faux témoignage, jamais de citation inventée, jamais de personne réelle présentée sans source.

## 2. Exactitude et sources

- **Chaque chiffre, taux, plafond, seuil, date ou règle de droit porte une note de bas de page** vers une source primaire.
- Sources primaires acceptées : service-public.gouv.fr, impots.gouv.fr et bofip.impots.gouv.fr, legifrance.gouv.fr, economie.gouv.fr, info.gouv.fr, amf-france.org, banque-france.fr, acpr.banque-france.fr, insee.fr, drees.solidarites-sante.gouv.fr, info-retraite.fr, anil.org, notaires.fr, france-assureurs.org, aspim.fr, euronext.com, esma.europa.eu, ecb.europa.eu, ec.europa.eu.
- Jamais de blog, de comparateur commercial ou de média comme source d'une règle ou d'un chiffre officiel. Un média peut être cité pour une actualité, nommé et daté.
- **Vérifier que chaque chiffre est en vigueur à la date de rédaction.** Les taux réglementés, le barème de l'impôt, les plafonds et les prélèvements sociaux changent : relire la page officielle du jour, pas sa mémoire.
- En cas de doute non levé par une source primaire : ne pas écrire le chiffre.
- Format d'une note : `[^1]: [Titre exact de la page](URL), éditeur, page consultée le 1er novembre 2026.` (ou « mise à jour le … » si la page affiche une date).

## 3. Écriture

- **Tutoiement**, comme sur Instagram. Ton d'un ami compétent : sérieux, chaleureux, jamais condescendant, jamais vendeur.
- **Humaniser** : partir d'une situation concrète de la vie (un premier salaire, un achat immobilier, un héritage, une question de retraite). L'argent sert des projets, on parle des projets.
- Phrases courtes. Paragraphes de 4 lignes maximum. Un mot technique est expliqué la première fois qu'il apparaît, ou lié à sa définition du lexique.
- **Typographie** : guillemets « », espace avant `:` `;` `?` `!`, nombres « 1 000 € », « 3,5 % ». **Jamais de tiret long (—) ni de tiret moyen (–)** : virgule, deux-points, parenthèses ou trait d'union court.
- Zéro faute. Relire chaque texte en entier avant de le livrer.
- Pas de formules creuses (« dans un monde en constante évolution », « il est important de noter que », « en conclusion »), pas de listes à rallonge, pas d'emoji, pas de titres en majuscules.

## 4. Structure d'une page (guide ou article)

1. **Chapô** (premier paragraphe, sans titre) : répond directement à la question en 2 ou 3 phrases. Contient la requête principale.
2. **Sections `##`** formulées comme les vraies questions des internautes (« Comment fonctionne… ? », « Combien coûte… ? », « Quels sont les risques… ? »). Sous-sections `###` si besoin. Pas de `#` dans le corps : le titre H1 vient du frontmatter.
3. Un **tableau** dès qu'on compare plusieurs options ou plusieurs chiffres.
4. Des **encadrés** sous forme de citation Markdown, toujours introduits par un mot en gras :
   `> **Exemple.** …` pour un cas chiffré, `> **À savoir.** …` pour un point d'attention, `> **Idée reçue.** …` pour corriger une croyance.
5. **Visuels** : 3 à 5 par guide, 2 à 3 par article, selon `redaction/VISUELS.md` (blocs ```graphique). Un visuel par idée chiffrée, placé juste après le paragraphe qu'il illustre ; le texte explique le visuel au lieu de le répéter. Plus un `chiffre` clé dans le frontmatter.
6. **Liens internes** : 4 à 8 liens vers d'autres pages du site (voir `redaction/PLAN.md`), avec une ancre descriptive (`[le fonctionnement du PEA](/bourse/pea/)`). Lier les simulateurs quand c'est utile.
7. **Notes de bas de page** `[^1]` pour toutes les sources. Elles s'affichent automatiquement sous le titre « Sources et notes ».
8. Pas de conclusion générique. La dernière section peut être « Ce qu'il faut retenir pour ta situation » : les questions à se poser, sans recommandation.

Longueur : 1 800 à 3 000 mots pour un guide pilier, 900 à 1 600 mots pour un article, 150 à 350 mots pour une entrée de lexique. La longueur suit le besoin du lecteur, jamais le remplissage.

## 5. Frontmatter d'un guide ou article

Fichier : `src/content/articles/<categorie>/<slug>.md`. L'URL publique est `/<categorie>/<slug>/`.

```yaml
---
title: "PEA : fonctionnement, plafonds et fiscalité"          # H1, 70 caractères max
seoTitle: "PEA : plafond, fiscalité et retraits, le guide 2026" # balise <title>, 60 caractères max (facultatif)
description: "Comment fonctionne le PEA, combien on peut y verser, quand retirer sans perdre l'avantage fiscal : le guide complet et sourcé."  # 140 à 160 caractères
categorie: bourse        # epargne | bourse | immobilier | retraite | fiscalite | credit | protection
type: guide              # guide | article | actualite
publie: 2026-11-02
misAJour: 2026-11-02
motCle: "pea"            # requête principale visée
essentiel:               # « L'essentiel », 3 à 5 phrases autonomes de 25 mots max
  - "…"
faq:                     # 4 à 6 vraies questions, réponses autonomes de 40 à 80 mots
  - q: "…"
    r: "…"
liens:                   # 3 pages « À lire aussi », chemins du PLAN
  - /bourse/etf/
chiffre:                 # chiffre clé affiché en grand dans l'en-tête, sourcé dans le corps
  valeur: "150 000 €"
  legende: "C'est le plafond de versements d'un PEA classique."
---
```

Les réponses de la FAQ et les phrases de « L'essentiel » ne portent pas de note de bas de page : leurs chiffres doivent déjà être sourcés dans le corps.

## 6. Entrée de lexique

Fichier : `src/content/lexique/<slug>.md`, URL `/lexique/<slug>/`.

```yaml
---
terme: "PEA"
nomComplet: "Plan d'épargne en actions"   # facultatif
definition: "Enveloppe d'épargne qui permet d'investir en actions européennes avec une fiscalité allégée après cinq ans de détention."  # 30 mots max, autonome
description: "Définition du PEA : fonctionnement, plafond de versement, fiscalité après cinq ans."  # 140 à 160 caractères
categorie: bourse
misAJour: 2026-11-02
voirAussi: [etf, compte-titres, pfu]       # slugs d'autres entrées du lexique
guide: /bourse/pea/                        # facultatif, guide lié
---
```

Corps : 150 à 350 mots, mêmes règles (notes de bas de page pour tout chiffre, aucun produit commercial).

## 7. Auteur et transparence

Les textes sont signés « La rédaction Parlons Placement ». La page `/methode/` explique comment ils sont produits et vérifiés. Ne jamais mentionner d'outil de rédaction dans le corps d'un texte.

## 8. Contenus partenaires (plus tard)

Un contenu financé par une marque porte la mention « Partenariat » en tête de page et dans le titre de la carte, et respecte la loi du 9 juin 2023 sur l'influence commerciale. Il reste soumis à cette charte : sources, risques, aucune promesse. Un partenaire ne relit jamais un guide ou un comparateur, il n'achète jamais une place dans un classement.
