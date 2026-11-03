import data from '../data/affiliation.json';

type Partenaire = { nom: string; url: string | null; actif: boolean };
const partenaires = data.partenaires as Record<string, Partenaire>;

/** Lien partenaire d'un acteur, ou null s'il n'est pas actif. */
export const lienPartenaire = (id: string): string | null => {
  const p = partenaires[id];
  return p && p.actif && p.url ? p.url : null;
};

/** Vrai dès qu'au moins un lien partenaire est actif sur le site. */
export const affiliationActive = Object.values(partenaires).some((p) => p.actif && !!p.url);

export const REL_PARTENAIRE = 'sponsored nofollow noopener';

/** Phrase de transparence, vraie dans les deux cas (avec ou sans lien actif). */
export const PHRASE_LIENS = affiliationActive
  ? "Certains liens de ce site sont des liens partenaires, signalés comme tels : si tu ouvres un compte par ce lien, Parlons Placement peut percevoir une rémunération, sans surcoût pour toi. Cela ne change ni les tarifs relevés, ni l'ordre d'affichage, qui dépend uniquement du critère que tu choisis."
  : "Aucun lien n'est affilié.";
