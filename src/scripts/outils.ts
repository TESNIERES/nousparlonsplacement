// Outils partagés des simulateurs : lecture des champs, formats, graphique SVG sans dépendance.

export const euros = (v: number) =>
  Number.isFinite(v) ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(v)) : '-';
export const pct = (v: number, d = 1) =>
  Number.isFinite(v) ? new Intl.NumberFormat('fr-FR', { maximumFractionDigits: d, minimumFractionDigits: 0 }).format(v) + ' %' : '-';

export function lire(form: HTMLFormElement, nom: string): number {
  const el = form.elements.namedItem(nom) as HTMLInputElement | null;
  if (!el) return 0;
  const v = parseFloat(String(el.value).replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(v) ? v : 0;
}

export function ecrire(id: string, texte: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = texte;
}

export type Serie = { nom: string; valeurs: number[]; couleur: string; aire?: boolean; pointille?: boolean };

const SVGNS = 'http://www.w3.org/2000/svg';
const el = (tag: string, attrs: Record<string, string | number>) => {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
  return n;
};

function pasRond(max: number) {
  const brut = max / 4;
  const p = Math.pow(10, Math.floor(Math.log10(brut || 1)));
  const n = brut / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

const court = (v: number) =>
  v >= 1e6 ? `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(v / 1e6)} M€` : v >= 1e3 ? `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(v / 1e3)} k€` : `${Math.round(v)} €`;

export function graphique(conteneur: HTMLElement, series: Serie[], etiquettes: string[], titre: string) {
  const W = 720, H = 320, g = 56, d = 12, h = 14, b = 34;
  const n = Math.max(...series.map((s) => s.valeurs.length));
  const max = Math.max(1, ...series.flatMap((s) => s.valeurs));
  const pas = pasRond(max);
  const haut = Math.ceil(max / pas) * pas;
  const x = (i: number) => g + (n <= 1 ? 0 : (i / (n - 1)) * (W - g - d));
  const y = (v: number) => h + (1 - v / haut) * (H - h - b);
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': titre });
  const axe = el('g', { class: 'axe' });
  for (let v = 0; v <= haut + 1e-9; v += pas) {
    axe.appendChild(el('line', { x1: g, x2: W - d, y1: y(v), y2: y(v), stroke: v === 0 ? '#0C1A14' : 'rgba(12,26,20,.12)', 'stroke-width': v === 0 ? 1.2 : 1 }));
    const t = el('text', { x: g - 8, y: y(v) + 4, 'text-anchor': 'end' });
    t.textContent = court(v);
    axe.appendChild(t);
  }
  const tous = Math.max(1, Math.ceil(n / 8));
  etiquettes.forEach((e, i) => {
    if (i % tous !== 0 && i !== n - 1) return;
    const t = el('text', { x: x(i), y: H - 12, 'text-anchor': i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle' });
    t.textContent = e;
    axe.appendChild(t);
  });
  svg.appendChild(axe);
  for (const s of series) {
    const pts = s.valeurs.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    if (s.aire) {
      svg.appendChild(el('polygon', { points: `${x(0)},${y(0)} ${pts} ${x(s.valeurs.length - 1)},${y(0)}`, fill: s.couleur, opacity: 0.9 }));
    } else {
      svg.appendChild(el('polyline', { points: pts, fill: 'none', stroke: s.couleur, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-dasharray': s.pointille ? '6 5' : '0' }));
    }
  }
  conteneur.replaceChildren(svg);
  const leg = document.createElement('div');
  leg.className = 'legende';
  for (const s of series) {
    const span = document.createElement('span');
    const i = document.createElement('i');
    i.style.background = s.couleur;
    if (s.pointille) i.style.background = `repeating-linear-gradient(90deg, ${s.couleur} 0 5px, transparent 5px 9px)`;
    span.append(i, s.nom);
    leg.appendChild(span);
  }
  conteneur.appendChild(leg);
}

export function brancher(form: HTMLFormElement, calcul: () => void) {
  form.addEventListener('input', calcul);
  form.addEventListener('submit', (e) => { e.preventDefault(); calcul(); });
  calcul();
}

/** Simule une épargne mensuelle : versements en début de mois, rendement et frais annuels convertis en taux mensuels. */
export function projection(o: { initial: number; mensuel: number; annees: number; rendement: number; fraisAnnuels?: number; fraisVersement?: number }) {
  const mois = Math.round(o.annees * 12);
  const net = (1 + o.rendement / 100) * (1 - (o.fraisAnnuels || 0) / 100) - 1;
  const rm = Math.pow(1 + net, 1 / 12) - 1;
  const fv = 1 - (o.fraisVersement || 0) / 100;
  let v = o.initial * fv;
  let verse = o.initial;
  const valeurs = [v], verses = [verse];
  for (let m = 1; m <= mois; m++) {
    v = (v + (m > 0 ? o.mensuel * fv : 0)) * (1 + rm);
    verse += o.mensuel;
    if (m % 12 === 0) { valeurs.push(v); verses.push(verse); }
  }
  return { final: v, verse, valeurs, verses };
}
