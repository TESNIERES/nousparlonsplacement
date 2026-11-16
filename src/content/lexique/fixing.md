---
terme: "Fixing"
nomComplet: "Cotation au fixing"
definition: "Mode de cotation où les ordres s'accumulent pendant un temps, puis sont exécutés ensemble à un prix unique, celui qui permet d'échanger le plus de titres."
description: "Définition du fixing en bourse : comment son prix unique est calculé, fixings d'ouverture et de clôture, titres cotés au fixing et effet sur tes ordres."
categorie: bourse
misAJour: 2026-11-16
voirAussi: [action, volatilite, frais-de-courtage]
guide: /bourse/ordres-de-bourse/
---

En bourse, un titre peut s'échanger de deux façons. En continu, chaque ordre est exécuté dès qu'il trouve une contrepartie. Au fixing, les ordres s'accumulent d'abord dans le carnet sans être exécutés, puis sont confrontés en une seule fois : le prix retenu est celui qui permet d'échanger le plus grand nombre de titres[^1]. Tous les ordres exécutés le sont à ce prix unique.

## Quand y a-t-il un fixing ?

Les titres cotés en continu passent eux aussi par des fixings, à l'ouverture et à la clôture. Sur Euronext Paris, les ordres s'accumulent à partir de 17 h 30 et le fixing de clôture a lieu à un instant tiré au hasard entre 17 h 35 et 17 h 35 min 30 s[^2]. Ce fixing a pris du poids : il représentait 52,8 % des montants échangés sur les actions du CAC 40 dans le carnet d'ordres d'Euronext au quatrième trimestre 2025[^2].

Les titres moins échangés ne cotent qu'au fixing, au moins une fois et le plus souvent deux fois par jour[^1]. Après une interruption temporaire de la cotation (la réservation), la reprise se fait aussi par un fixing[^1].

## Ce que ça change pour tes ordres

- Un ordre passé pendant la phase d'accumulation attend le prix du fixing.
- Entre deux fixings, le prix peut beaucoup bouger. Un ordre sans limite de prix, comme un ordre au marché ou un ordre à seuil de déclenchement une fois déclenché, s'exécute au prix du fixing, même s'il est loin du dernier cours affiché[^3].
- Un ordre à cours limité n'est exécuté que si le prix du fixing respecte ta limite[^4].

Le fonctionnement de chaque type d'ordre, au fixing comme en continu, est détaillé dans notre article sur [les types d'ordres de bourse](/bourse/ordres-de-bourse/).

[^1]: [Trading Manual for the Optiq Trading Platform](https://www.euronext.com/sites/default/files/2025-10/trading_manual_-_311025_-_avd_ordersdark_post-onlyhybrid_model__0.pdf), Euronext, version publiée le 31 octobre 2025, consultée le 16 novembre 2026.
[^2]: [Évolution des échanges à la clôture sur le marché actions français](https://www.amf-france.org/sites/institutionnel/files/private/2026-07/RSA%20-%202026%20%20Evolution%20des%20%C3%A9changes%20%C3%A0%20la%20cl%C3%B4ture%20sur%20le%20march%C3%A9%20actions%20francais_0.pdf), Autorité des marchés financiers (AMF), juillet 2026, consulté le 16 novembre 2026.
[^3]: [Un ordre à seuil de déclenchement ne permet pas de maîtriser le prix d'exécution](https://www.amf-france.org/fr/le-mediateur/journal-de-bord-du-mediateur/dossiers-du-mois/un-ordre-seuil-de-declenchement-ne-permet-pas-de-maitriser-le-prix-dexecution), AMF, journal de bord du médiateur, 1er avril 2022, page consultée le 16 novembre 2026.
[^4]: [Choisir et passer un ordre de bourse : ce qu'il faut savoir](https://www.amf-france.org/fr/espace-epargnants/comprendre-les-marches-financiers/les-ordres-de-bourse/choisir-et-passer-un-ordre-de-bourse-ce-quil-faut-savoir), Autorité des marchés financiers (AMF), mise à jour le 22 décembre 2021, page consultée le 16 novembre 2026.
