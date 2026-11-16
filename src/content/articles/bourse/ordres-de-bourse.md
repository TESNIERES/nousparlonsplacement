---
title: "Types d'ordres de bourse : ce qui se passe vraiment à l'exécution"
seoTitle: "Types d'ordres de bourse : au marché, limité, stop"
description: "Ordre au marché, à cours limité, à seuil ou à plage de déclenchement : ce qui se passe vraiment à l'exécution, au fixing et pendant une réservation."
categorie: bourse
type: article
publie: 2026-11-16
misAJour: 2026-11-16
motCle: "types d'ordres de bourse"
chiffre:
  valeur: "52,8 %"
  legende: "C'est la part des montants échangés sur les actions du CAC 40, dans le carnet d'ordres d'Euronext, conclue au fixing de clôture au quatrième trimestre 2025."
essentiel:
  - "Un ordre au marché passe avant tous les autres et s'exécute dès qu'il trouve preneur, à un prix que tu ne maîtrises pas."
  - "Un ordre à cours limité fixe ton prix maximum à l'achat ou minimum à la vente, sans garantie d'être exécuté en totalité."
  - "Un ordre à seuil de déclenchement devient un ordre au marché une fois le seuil atteint : il peut s'exécuter loin de ce seuil."
  - "Par défaut, un ordre ne vaut que pour la séance du jour ; « à révocation », il peut rester valable jusqu'à 365 jours."
  - "Au fixing ou à la reprise après une réservation, le prix d'exécution peut être très éloigné du dernier cours affiché."
faq:
  - q: "Quelle différence entre un ordre au marché et un ordre à cours limité ?"
    r: "L'ordre au marché n'a pas de limite de prix : il est prioritaire et s'exécute dès qu'il trouve une contrepartie, au prix disponible. L'ordre à cours limité fixe un prix maximum à l'achat ou minimum à la vente : il ne s'exécute qu'à ce prix ou mieux, parfois en partie seulement, parfois pas du tout. Le premier privilégie l'exécution, le second le prix. Sur un titre peu échangé ou agité, l'écart entre les deux peut être important."
  - q: "Un ordre stop garantit-il de vendre au prix du seuil ?"
    r: "Non. Un ordre à seuil de déclenchement se transforme en ordre au marché dès que le seuil est atteint : il s'exécute au prix disponible, qui peut être nettement plus bas en cas de forte baisse ou de fixing. Un ordre à plage de déclenchement ajoute une limite de prix au seuil : il évite une exécution trop éloignée, mais peut ne pas être exécuté, ou seulement en partie."
  - q: "Combien de temps un ordre de bourse reste-t-il valable ?"
    r: "Par défaut, un ordre ne vaut que pour la séance du jour. Tu peux aussi choisir une date d'échéance, ou un ordre « à révocation », valable jusqu'à 365 jours. Les durées proposées figurent dans ta convention de compte. Sur Euronext, le détachement d'un dividende entraîne en principe l'annulation des ordres en attente : un ordre de longue durée se surveille."
  - q: "Peut-on annuler un ordre de bourse ?"
    r: "Oui, tant qu'il n'est pas exécuté : un ordre en attente dans le carnet peut être modifié ou annulé, y compris pendant une réservation de cotation sur Euronext. Une fois exécuté, il t'engage et les titres achetés sont à payer. Ton intermédiaire t'adresse alors un avis d'opéré qui détaille le prix, la quantité et les frais. Selon l'AMF, tu disposes de 30 jours pour contester la passation de l'ordre."
  - q: "Qu'est-ce qu'une réservation de cotation ?"
    r: "C'est une interruption temporaire de la cotation d'un titre dont le prix varie trop vite. Sur Euronext, elle se déclenche par exemple quand une action du CAC 40 s'écarte de plus de 3 % de son dernier cours ou de plus de 8 % de son cours de référence du jour. Elle dure au moins 3 minutes. Les ordres continuent d'être enregistrés, puis la cotation reprend par un fixing, parfois à un prix très éloigné."
liens:
  - /bourse/investir-en-bourse/
  - /bourse/compte-titres-ordinaire/
  - /bourse/etf/
---

Un ordre de bourse dit à ton intermédiaire quoi acheter ou vendre, en quelle quantité, à quelles conditions de prix et jusqu'à quand. Les principaux types d'ordres de bourse sont l'ordre au marché, l'ordre à cours limité, l'ordre à la meilleure limite et les ordres à seuil ou à plage de déclenchement[^1]. Chacun arbitre à sa façon entre la certitude d'être exécuté et la maîtrise du prix, et l'écart se voit surtout sur un titre peu échangé ou un jour agité.

Tu viens d'ouvrir un [compte-titres](/bourse/compte-titres-ordinaire/) ou un [PEA](/bourse/pea/) et, pour ton premier achat, l'écran te demande un type d'ordre et une durée de validité. Ce choix décide du prix que tu paieras vraiment. Il ne change rien au risque du titre : une action ou un ETF peut perdre tout ou partie de sa valeur, quel que soit l'ordre utilisé.

## Comment un ordre de bourse est-il exécuté ?

Un ordre précise le sens (achat ou vente), le titre (nom ou code ISIN), la quantité, le type d'ordre, la limite de prix éventuelle et la durée de validité[^1]. Il rejoint le carnet d'ordres, qui confronte les ordres d'achat et de vente en attente sur ce titre[^2].

Le carnet classe les ordres par prix : à l'achat, le prix le plus élevé passe en premier ; à la vente, le plus bas. À prix égal, le premier arrivé est servi le premier[^1]. Si tu modifies un ordre en attente, tu gardes ta place en réduisant la quantité, mais tu la perds en changeant la limite ou en augmentant la quantité[^3].

Notre guide pour [investir en bourse](/bourse/investir-en-bourse/) résume ces types d'ordres dans un tableau. Voici ce que chacun garantit, et ce qu'il laisse au marché.

```graphique
{"type":"comparaison","titre":"Chaque type d'ordre choisit entre la certitude d'être exécuté et la maîtrise du prix","colonnes":[{"titre":"Au marché","ton":"corail","points":["Exécuté en priorité dès qu'une contrepartie existe","**Prix non maîtrisé**"]},{"titre":"À cours limité","ton":"sapin","points":["Prix maximum à l'achat, minimum à la vente","**Exécution partielle ou nulle possible**"]},{"titre":"À seuil de déclenchement","ton":"corail","points":["En attente jusqu'au seuil, puis au marché","**Prix non maîtrisé une fois déclenché**"]},{"titre":"À plage de déclenchement","ton":"sauge","points":["En attente jusqu'au seuil, puis à cours limité","**Exécution partielle ou nulle possible**"]}],"source":"AMF, « Choisir et passer un ordre de bourse : ce qu'il faut savoir », décembre 2021"}
```

## Que se passe-t-il quand tu passes un ordre au marché ?

L'ordre au marché n'a pas de limite de prix. Il passe avant tous les autres ordres et s'exécute dès qu'il trouve une contrepartie[^1]. Passé avant 9 heures, il est exécuté au cours d'ouverture[^2]. La partie qui ne trouve pas preneur reste dans le carnet, toujours au marché[^3].

Sur un titre peu échangé, l'écart avec le dernier cours affiché peut être énorme. Le médiateur de l'AMF a examiné un ordre d'achat au marché de 48 000 actions très peu liquides, affichées à 0,19 € : la taille de l'ordre a fait monter le prix, et il a été exécuté à 0,34 €, pour 16 627 €, sur un compte qui contenait environ 9 000 €[^4]. Le médiateur n'a relevé aucune faute : l'ordre au marché garantit la quantité, pas le prix[^4].

> **À savoir.** Avant d'accepter un ordre d'achat, ton teneur de compte contrôle ta provision (l'argent disponible) au moment où tu passes l'ordre, sur la base du dernier cours connu[^5]. Sans limite de prix, le montant payé peut dépasser ce calcul, et l'ordre exécuté t'engage définitivement : les titres sont à payer[^5].

## Que se passe-t-il avec un ordre à cours limité ?

Tu fixes un prix maximum à l'achat ou un prix minimum à la vente. L'ordre ne s'exécute qu'à ce prix ou mieux. Sur un titre peu échangé, il peut être exécuté en plusieurs fois, ou pas du tout[^1]. Tant qu'il n'est pas exécuté, il attend dans le carnet jusqu'à la fin de sa validité.

> **Exemple.** Hypothèse : tu veux acheter 50 parts d'un ETF à 40 € au maximum, et le vendeur le moins cher demande 40,20 €. Rien ne se passe. Si, plus tard, un vendeur propose 30 parts à 40 €, tu en achètes 30 ; les 20 autres attendent un vendeur à 40 € ou moins. Tu ne paies jamais plus que ta limite, mais tu n'es pas sûr d'acheter tout ce que tu voulais.

L'ordre à la meilleure limite prend pour limite le meilleur prix proposé en face à son arrivée, ou le cours d'ouverture s'il est passé avant l'ouverture[^2]. S'il n'est exécuté qu'en partie, le solde reste à cours limité, au prix de la première exécution[^1]. En séance, il est rejeté s'il n'y a aucun ordre en face[^3].

## Ordre à seuil ou à plage : que se passe-t-il au déclenchement ?

Ces ordres, souvent appelés « stop », restent en attente tant que le cours n'a pas atteint le seuil que tu as choisi. Ils servent surtout à limiter une perte sur une vente[^1]. Une fois le seuil atteint :

- l'ordre **à seuil de déclenchement** devient un ordre au marché, exécuté au prix disponible, qui peut être différent du seuil[^2] ;
- l'ordre **à plage de déclenchement** devient un ordre à cours limité : tu indiques deux prix, un seuil et une limite[^2].

Sur Euronext, le déclenchement se fait sur le dernier cours traité ou sur le prix d'un fixing[^3]. Dans un dossier du médiateur de l'AMF, un épargnant avait placé deux ordres de vente à seuil, à 12,03 € et 11,98 €, sur une action cotée au fixing dont le fixing précédent était de 12,05 €. Le fixing suivant est sorti à 11,34 € : les deux seuils ont été franchis d'un coup, et les ordres, devenus au marché, ont été exécutés au fixing d'après, à 11,42 €[^6].

```graphique
{"type":"chiffres","titre":"Les deux ordres de vente à seuil ont été exécutés à 11,42 €, sous leurs seuils","items":[{"valeur":"12,03 €","legende":"Seuil du premier ordre de vente"},{"valeur":"11,34 €","legende":"Fixing qui a franchi les deux seuils"},{"valeur":"11,42 €","legende":"Prix d'exécution, au fixing suivant"}],"source":"AMF, journal de bord du médiateur, dossier du 1er avril 2022"}
```

Pour le médiateur, ce type d'ordre « assure par conséquent une exécution maximale de l'achat ou de la vente mais ne permet pas d'en maîtriser le prix »[^6]. Il n'a relevé aucune faute : pour fixer un prix plancher, il fallait un ordre à plage de déclenchement ou à cours limité[^6].

> **Idée reçue.** « Mon ordre stop me garantit de vendre à mon seuil. » Non : le seuil déclenche l'ordre, il ne fixe pas son prix. Le médiateur de l'AMF a clos 73 dossiers sur des ordres de bourse en 2025, et note que le rappel des règles fondamentales « s'impose dans la plupart des cas »[^7].

## Pourquoi l'heure et le mode de cotation changent-ils le prix ?

Avant l'ouverture, les ordres s'accumulent dans le carnet sans être exécutés, puis un fixing les confronte : le prix retenu est celui qui permet d'échanger le plus grand nombre de titres[^3]. La cotation en continu prend ensuite le relais jusqu'à 17 h 30, puis les ordres s'accumulent à nouveau pour le fixing de clôture, qui a lieu à un instant tiré au hasard entre 17 h 35 et 17 h 35 min 30 s[^8].

```graphique
{"type":"frise","titre":"Une séance sur Euronext Paris alterne fixings et cotation en continu","etapes":[{"quand":"Avant 9 h","titre":"Les ordres s'accumulent","texte":"Aucune exécution : le carnet se remplit."},{"quand":"9 h","titre":"Fixing d'ouverture","texte":"Un prix unique pour tous les ordres exécutés."},{"quand":"De 9 h à 17 h 30","titre":"Cotation en continu","texte":"Chaque ordre s'exécute dès qu'il trouve une contrepartie."},{"quand":"À partir de 17 h 30","titre":"Accumulation avant la clôture","texte":"Les ordres attendent le fixing de clôture."},{"quand":"Vers 17 h 35","titre":"Fixing de clôture","texte":"Un prix unique, à un instant tiré au hasard dans les 30 secondes."}],"source":"AMF, étude sur les échanges à la clôture, juillet 2026, et page « De l'achat à la vente », 2020 ; Euronext, Trading Manual, octobre 2025"}
```

Ce fixing pèse lourd : selon une étude de l'AMF publiée en juillet 2026, il représentait 52,8 % des montants échangés sur les actions du CAC 40 dans le carnet d'ordres d'Euronext au quatrième trimestre 2025, contre 36,4 % au troisième trimestre 2018[^8]. Un ordre transmis après 17 h 30 attend ce prix unique.

Certains titres moins échangés ne cotent qu'au [fixing](/lexique/fixing/), au moins une fois et le plus souvent deux fois par jour[^3]. Entre deux fixings, le prix peut nettement bouger, comme dans le dossier de l'ordre à seuil[^6].

### Que se passe-t-il quand la cotation est « réservée » ?

Pour éviter les emballements, Euronext interrompt la cotation d'un titre dont le prix s'écarte trop vite d'un prix de référence : c'est la réservation. Elle dure au moins 3 minutes[^9]. Le cours de référence du jour est le cours d'ouverture, ou à défaut le dernier cours de référence de la veille[^9].

| Titres | Écart maximal avec le dernier cours | Écart maximal avec le cours de référence du jour |
|---|---|---|
| Actions des grands indices, dont le CAC 40 | 3 % | 8 % |
| Autres actions | 5 % | 10 % |

Pendant la réservation, tu peux saisir, modifier ou annuler un ordre, mais rien n'est exécuté avant le fixing de reprise[^3]. Dans un autre dossier du médiateur, un épargnant avait vu un cours de 15,60 € et passé un ordre de vente au marché pendant une réservation : il a été exécuté à la reprise, à 14,44 €[^10]. Le médiateur rappelle qu'un ordre à cours limité permet alors de maîtriser le prix d'exécution[^10].

## Combien de temps ton ordre reste-t-il valable ?

Par défaut, un ordre ne vaut que pour la séance du jour. Tu peux aussi le rendre valable jusqu'à une date choisie, ou « à révocation », jusqu'à 365 jours[^1]. Les durées possibles figurent dans ta convention de compte[^1].

La durée joue sur tes chances d'être exécuté : pour le médiateur de l'AMF, « la durée de vie de l'ordre n'est évidemment pas sans incidence sur sa probabilité d'exécution »[^11]. Mais un ordre de longue durée se surveille. Sur Euronext, le détachement d'un [dividende](/lexique/dividende/) d'une action ou d'un ETF entraîne en principe l'annulation des ordres en attente dans le carnet, et un ordre à révocation encore ouvert au bout d'un an est annulé automatiquement[^3].

## Que se passe-t-il après l'exécution ?

Ton intermédiaire t'adresse obligatoirement un avis d'opéré : sens, quantité, cours, heure, frais, montants brut et net. Selon l'AMF, tu as alors 30 jours pour contester la passation de l'ordre[^2].

Le règlement-livraison, qui échange titres et argent, prend aujourd'hui deux jours de négociation au plus[^1]. Il passera à un jour le 11 octobre 2027 pour les transactions exécutées sur une plateforme de négociation de l'Union européenne[^12].

Chaque exécution a aussi un coût, les [frais de courtage](/lexique/frais-de-courtage/), que le [comparateur des courtiers en bourse](/comparateurs/courtiers-en-bourse/) met en regard.

## Ce qu'il faut retenir pour ta situation

Aucun type d'ordre n'est bon en soi : chacun répond à une priorité différente. Avant de valider, quelques questions aident à y voir clair :

- Le titre est-il très échangé, ou coté seulement au fixing ?
- Sur cet ordre, qu'est-ce qui compte le plus pour toi : être exécuté, ou maîtriser le prix ?
- Si tu poses un seuil de déclenchement, accepterais-tu une exécution nettement en dessous ?
- Jusqu'à quand ton ordre doit-il rester valable, et vas-tu le surveiller ?
- As-tu lu, dans ta convention de compte, les types d'ordres et les durées proposés ?

Pour une stratégie adaptée à ta situation, un conseiller en investissements financiers ([CIF](/lexique/cif/)) peut t'accompagner.

[^1]: [Choisir et passer un ordre de bourse : ce qu'il faut savoir](https://www.amf-france.org/fr/espace-epargnants/comprendre-les-marches-financiers/les-ordres-de-bourse/choisir-et-passer-un-ordre-de-bourse-ce-quil-faut-savoir), Autorité des marchés financiers (AMF), mise à jour le 22 décembre 2021, page consultée le 16 novembre 2026.
[^2]: [De l'achat à la vente de votre titre coté en bourse](https://www.amf-france.org/fr/espace-epargnants/comprendre-les-marches-financiers/les-ordres-de-bourse/acheter-et-vendre-un-titre-cote-en-bourse), Autorité des marchés financiers (AMF), publiée le 14 avril 2020, page consultée le 16 novembre 2026.
[^3]: [Trading Manual for the Optiq Trading Platform](https://www.euronext.com/sites/default/files/2025-10/trading_manual_-_311025_-_avd_ordersdark_post-onlyhybrid_model__0.pdf), Euronext, version publiée le 31 octobre 2025, consultée le 16 novembre 2026. Ordres au marché et à la meilleure limite (« market to limit »), ordres à déclenchement, priorité et modification des ordres, durées de validité, opérations sur titres, réservation, valeurs cotées au fixing.
[^4]: [« Penny stock » et ordre « au marché » : attention au décalage de cours possible lors du passage d'un ordre sur des actions dont la valeur est très faible](https://www.amf-france.org/fr/le-mediateur-de-lamf/journal-de-bord-du-mediateur/dossiers-du-mois/penny-stock-et-ordre-au-marche-attention-au-decalage-de-cours-possible-lors-du-passage-dun-ordre-sur), AMF, journal de bord du médiateur, 3 mai 2017, page consultée le 16 novembre 2026.
[^5]: [Ordre de bourse : le cours retenu pour le contrôle de provision ne doit pas être obsolète](https://www.amf-france.org/fr/le-mediateur/journal-de-bord-du-mediateur/dossiers-du-mois/ordre-de-bourse-le-cours-retenu-pour-le-controle-de-provision-ne-doit-pas-etre-obsolete), AMF, journal de bord du médiateur, 2 juin 2023, page consultée le 16 novembre 2026.
[^6]: [Un ordre à seuil de déclenchement ne permet pas de maîtriser le prix d'exécution](https://www.amf-france.org/fr/le-mediateur/journal-de-bord-du-mediateur/dossiers-du-mois/un-ordre-seuil-de-declenchement-ne-permet-pas-de-maitriser-le-prix-dexecution), AMF, journal de bord du médiateur, 1er avril 2022, page consultée le 16 novembre 2026.
[^7]: [Rapport du médiateur 2025](https://www.amf-france.org/sites/institutionnel/files/private/2026-09/Rapport+du+mediateur+-AMF+-+Web.pdf), Autorité des marchés financiers (AMF), 2026, page 20, consulté le 16 novembre 2026.
[^8]: [Évolution des échanges à la clôture sur le marché actions français](https://www.amf-france.org/sites/institutionnel/files/private/2026-07/RSA%20-%202026%20%20Evolution%20des%20%C3%A9changes%20%C3%A0%20la%20cl%C3%B4ture%20sur%20le%20march%C3%A9%20actions%20francais_0.pdf), Autorité des marchés financiers (AMF), juillet 2026, consulté le 16 novembre 2026. Part du fixing de clôture dans les montants échangés sur les actions du CAC 40, carnet d'ordres d'Euronext (tableau 1).
[^9]: [Trading safeguards on the Euronext markets](https://www.euronext.com/en/for-investors/market-quality/trading-safeguards), Euronext, page consultée le 16 novembre 2026. Seuils dynamiques (par rapport au dernier cours traité) et statiques (par rapport au cours de référence) des marchés au comptant.
[^10]: [Ordre de bourse : quand la réservation de cotation... réserve des surprises...](https://www.amf-france.org/fr/le-mediateur/journal-de-bord-du-mediateur/dossiers-du-mois/ordre-de-bourse-quand-la-reservation-de-cotation-reserve-des-surprises), AMF, journal de bord du médiateur, 1er juillet 2021, page consultée le 16 novembre 2026.
[^11]: [Ordre de bourse : quand la durée de validité de l'ordre influence sa probabilité d'exécution](https://www.amf-france.org/fr/le-mediateur/journal-de-bord-du-mediateur/dossiers-du-mois/ordre-de-bourse-quand-la-duree-de-validite-de-lordre-influence-sa-probabilite-dexecution), AMF, journal de bord du médiateur, 1er avril 2021, page consultée le 16 novembre 2026.
[^12]: [Transition vers T+1 du dénouement des transactions](https://www.amf-france.org/fr/actualites-publications/dossiers-thematiques/le-reglement-livraison-t1), Autorité des marchés financiers (AMF), mise à jour le 9 février 2026, page consultée le 16 novembre 2026. Règlement (UE) 2025/2075 du 8 octobre 2025.
