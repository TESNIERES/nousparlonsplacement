export const SITE = {
  nom: 'Parlons Placement',
  url: 'https://www.nousparlonsplacement.com',
  baseline: "L'argent, expliqué simplement.",
  description:
    "Épargne, bourse, immobilier, retraite, fiscalité : des guides clairs, sourcés sur les textes officiels, des comparateurs neutres et des simulateurs. Jamais de conseil personnalisé.",
  instagram: 'https://www.instagram.com/parlonsplacement/',
  instagramHandle: '@parlonsplacement',
  directeurPublication: 'Paul Tesnières-Ouine',
  langue: 'fr-FR',
};

export type Categorie = {
  id: string;
  nom: string;
  titre: string;
  intro: string;
  description: string;
};

export const CATEGORIES: Categorie[] = [
  {
    id: 'epargne',
    nom: 'Épargne',
    titre: "Épargner : livrets, assurance-vie, épargne de précaution",
    intro: "Mettre de côté, c'est la base. Où placer l'argent dont tu peux avoir besoin demain, et celui qui peut attendre des années.",
    description: "Livret A, LEP, assurance-vie, épargne de précaution : comment fonctionne chaque solution d'épargne, ce qu'elle rapporte et ce qu'elle coûte.",
  },
  {
    id: 'bourse',
    nom: 'Bourse',
    titre: 'Investir en bourse : actions, ETF, PEA, compte-titres',
    intro: "La bourse fait peur parce qu'on en parle mal. Ici, on explique comment elle fonctionne, ce qu'elle coûte et les risques qu'elle comporte.",
    description: "Comprendre la bourse avant d'investir : actions, ETF, PEA, compte-titres, frais, fiscalité et risques, expliqués simplement et sourcés.",
  },
  {
    id: 'immobilier',
    nom: 'Immobilier',
    titre: 'Immobilier : acheter, louer, investir',
    intro: "Résidence principale, investissement locatif, SCPI : ce que coûte vraiment la pierre, comment on la finance et ce qu'elle rapporte.",
    description: "Acheter sa résidence principale, investir dans le locatif ou en SCPI : frais, crédit, fiscalité et risques de l'immobilier, expliqués et sourcés.",
  },
  {
    id: 'retraite',
    nom: 'Retraite',
    titre: 'Retraite : comprendre sa pension et préparer la suite',
    intro: "Combien touchera-t-on, et comment compléter ? Le PER, les régimes, les chiffres officiels, sans jargon.",
    description: "Pension, PER, épargne retraite : comment fonctionne la retraite en France et les solutions pour la préparer, expliquées avec les chiffres officiels.",
  },
  {
    id: 'fiscalite',
    nom: 'Fiscalité',
    titre: 'Fiscalité : impôts, placements, transmission',
    intro: "Ce que l'on paie sur ses revenus, ses intérêts, ses plus-values et ce que l'on transmet. Le barème, le PFU, les abattements, avec les textes.",
    description: "Impôt sur le revenu, flat tax, prélèvements sociaux, transmission : la fiscalité des particuliers et des placements, expliquée et sourcée.",
  },
  {
    id: 'credit',
    nom: 'Crédit',
    titre: 'Crédit : emprunter en connaissant les règles',
    intro: "Crédit immobilier, crédit à la consommation, TAEG, assurance emprunteur : les règles du jeu et tes droits.",
    description: "Crédit immobilier et crédit à la consommation : TAEG, taux d'usure, capacité d'emprunt, assurance emprunteur et droits de l'emprunteur.",
  },
  {
    id: 'protection',
    nom: 'Se protéger',
    titre: 'Se protéger : arnaques, frais, droits',
    intro: "Reconnaître une arnaque, vérifier un intermédiaire, connaître ses droits face à sa banque. Les réflexes qui évitent les pertes.",
    description: "Arnaques financières, frais bancaires, droits du consommateur : les signaux d'alerte, les vérifications à faire et les recours officiels.",
  },
];

export const categorie = (id: string) => CATEGORIES.find((c) => c.id === id);

export const OUTILS = [
  { href: '/comparateurs/courtiers-en-bourse/', type: 'Comparateur', titre: 'Courtiers en bourse', texte: "Frais d'ordre, droits de garde, PEA : les grilles tarifaires officielles, côte à côte." },
  { href: '/comparateurs/meilleur-courtier-en-bourse/', type: 'Comparateur', titre: 'Meilleur courtier en bourse', texte: "Le courtier le moins cher selon ton critère, et les points à vérifier avant d'ouvrir un compte." },
  { href: '/comparateurs/assurance-vie-en-ligne/', type: 'Comparateur', titre: 'Assurance-vie en ligne', texte: 'Frais, fonds euros, supports : les contrats en ligne relevés sur leurs documents officiels.' },
  { href: '/simulateurs/interets-composes/', type: 'Simulateur', titre: 'Intérêts composés', texte: 'Ce que deviennent des versements réguliers selon la durée et le rendement supposé.' },
  { href: '/simulateurs/impact-des-frais/', type: 'Simulateur', titre: 'Impact des frais', texte: "Un point de frais par an, combien ça coûte sur 10, 20 ou 30 ans." },
  { href: '/simulateurs/inflation/', type: 'Simulateur', titre: 'Inflation', texte: "Ce que vaudra une somme demain, selon l'inflation supposée." },
  { href: '/simulateurs/capacite-d-emprunt/', type: 'Simulateur', titre: "Capacité d'emprunt", texte: "Le montant empruntable selon tes revenus et les règles du HCSF." },
];

export const AVERTISSEMENT =
  "Contenu pédagogique. Ne constitue pas un conseil en investissement personnalisé. Investir comporte des risques, dont la perte en capital.";

export const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).replace(/^1 /, '1er ');
