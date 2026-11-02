# Visuels pédagogiques

Le site doit se lire autant avec les yeux qu'avec les mots. Chaque guide porte **3 à 5 visuels**, chaque article **2 à 3**. Un visuel remplace un paragraphe de chiffres, une liste de dates, une comparaison : le lecteur comprend en trois secondes ce qu'il aurait lu en une minute. Le texte reste (il sert le référencement et la précision), mais il ne répète pas le visuel : il l'explique.

## Règles

- **Mêmes exigences que le texte** : chaque valeur vient d'une source primaire déjà citée en note dans la page (ou d'un calcul fait à partir d'elle, présenté comme un exemple). Le champ `source` reprend la source en clair et courte : « Service-Public.fr, fiche F2385, mai 2026 ». Un exemple hypothétique le dit : « Exemple hypothétique, barème Service-Public.fr F1419 ».
- **Un message par visuel**, dit dans le `titre` : une phrase courte qui donne la conclusion (« Le Livret A rapporte moins que l'inflation depuis l'été »), pas seulement le sujet.
- **Pas de décoration** : pas d'icône, pas d'emoji, pas de dégradé. Le site dessine les visuels dans sa propre charte.
- Aucun produit commercial, aucune recommandation, aucun tiret long ou moyen, comme dans le texte.
- Placer le visuel juste après le paragraphe qui l'introduit, jamais deux visuels d'affilée sans texte entre eux.
- `chiffre` dans le frontmatter : le chiffre clé du guide, affiché en grand dans l'en-tête. `{ valeur, legende }`, sourcé dans le corps.

## Syntaxe

Un visuel est un bloc de code `graphique` contenant un objet JSON valide (guillemets droits doubles, pas de virgule finale). Texte enrichi possible dans les libellés : `**gras**` et `[lien](/chemin/)`.

### chiffre : un chiffre qui marque

```graphique
{"type":"chiffre","titre":"Le chiffre","valeur":"150 000 €","legende":"C'est le plafond de versements d'un PEA classique.","source":"Service-Public.fr, fiche F2385, mai 2026"}
```

Option `"ton"` : `"sapin"` (par défaut), `"papier"`, `"corail"` (pour un risque).

### chiffres : 2 à 4 chiffres côte à côte

```graphique
{"type":"chiffres","titre":"Les livrets réglementés au 1er novembre 2026","items":[{"valeur":"1,7 %","legende":"Livret A"},{"valeur":"1,7 %","legende":"LDDS"},{"valeur":"2,5 %","legende":"LEP","lien":"/epargne/livret-a-ldds-lep/"}],"source":"Service-Public.fr, fiches F2365, F2368, F2367"}
```

### barres : comparer des montants ou des taux

```graphique
{"type":"barres","titre":"Le LEP rapporte 0,8 point de plus que le Livret A","unite":"%","decimales":1,"items":[{"label":"LEP","valeur":2.5},{"label":"Livret A","valeur":1.7},{"label":"Inflation sur un an","valeur":3.1,"note":"septembre 2026"}],"accent":0,"source":"Service-Public.fr ; Insee, octobre 2026"}
```

`accent` : index de la barre à mettre en avant. Valeur négative possible (affichée en corail). `affichage` remplace le texte de la valeur si besoin.

### empile : de quoi se compose un total

```graphique
{"type":"empile","titre":"Sur 31,4 % de PFU, 18,6 points sont des prélèvements sociaux","unite":"%","decimales":1,"items":[{"label":"Impôt sur le revenu","valeur":12.8},{"label":"Prélèvements sociaux","valeur":18.6}],"totalLabel":"PFU","source":"impots.gouv.fr, mars 2026"}
```

### ligne : une évolution dans le temps

```graphique
{"type":"ligne","titre":"Le taux du Livret A depuis 2025","unite":"%","decimales":1,"escalier":true,"labels":["févr. 2025","août 2025","févr. 2026","août 2026"],"series":[{"nom":"LEP","valeurs":[3.5,2.7,2.5,2.5]},{"nom":"Livret A","valeurs":[2.4,1.7,1.5,1.7]}],"source":"Banque de France ; Service-Public.fr"}
```

`escalier: true` pour des taux qui changent par paliers. Autant de valeurs que de `labels` (mettre `null` pour une valeur absente). `min` et `max` facultatifs.

### frise : des étapes dans le temps

```graphique
{"type":"frise","titre":"Ce que change l'âge du PEA","etapes":[{"quand":"Ouverture","titre":"Le compteur démarre","texte":"Au premier versement."},{"quand":"Avant 5 ans","titre":"Un retrait clôture le plan","texte":"Gain taxé à 31,4 %, sauf exceptions.","ton":"alerte"},{"quand":"Après 5 ans","titre":"Retraits possibles sans clôture","texte":"Gains exonérés d'impôt, prélèvements sociaux dus.","ton":"ok"}],"source":"Service-Public.fr, fiche F2385"}
```

2 à 6 étapes. `ton` : `"alerte"` ou `"ok"`.

### comparaison : deux à quatre options côte à côte

```graphique
{"type":"comparaison","titre":"Fonds euros et unités de compte ne portent pas le même risque","colonnes":[{"titre":"Fonds euros","points":["Capital garanti par l'assureur","Rendement 2025 moyen : **2,63 %**"]},{"titre":"Unités de compte","ton":"corail","points":["Capital non garanti","Valeur qui varie à la hausse comme à la baisse"]}],"source":"ACPR, 2026"}
```

`ton` d'une colonne : `"sapin"`, `"sauge"`, `"corail"`, `"lime"`.

### tranches : un barème progressif

```graphique
{"type":"tranches","titre":"Le barème 2026 de l'impôt sur le revenu, par part","unite":"€","items":[{"de":0,"a":11600,"taux":0},{"de":11601,"a":29579,"taux":11},{"de":29580,"a":84577,"taux":30},{"de":84578,"a":181917,"taux":41},{"de":181918,"a":null,"taux":45}],"source":"Service-Public.fr, fiche F1419, avril 2026"}
```

### flux : un mécanisme en étapes

```graphique
{"type":"flux","titre":"Comment fonctionne un ETF","etapes":[{"titre":"Tu achètes une part","texte":"En bourse, comme une action."},{"titre":"L'ETF détient les titres de l'indice","texte":"Des dizaines ou des centaines de sociétés."},{"titre":"La part suit l'indice","texte":"À la hausse comme à la baisse, frais déduits."}]}
```

2 à 5 étapes.

## Contrôle

`npm run verifier` valide chaque bloc (JSON, type, champs obligatoires, source). `npm run build` le dessine ; un bloc invalide fait échouer le build.
