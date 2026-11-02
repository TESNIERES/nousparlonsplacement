// Visuels pédagogiques du site : transforme les blocs ```graphique (JSON) du Markdown en figures HTML/SVG.
// Rendu statique (aucune dépendance côté navigateur), responsive, animé au défilement par un petit script global.
// Types : chiffre, chiffres, barres, empile, ligne, frise, comparaison, tranches, flux.

export const TYPES = {
  chiffre: ['valeur', 'legende'],
  chiffres: ['items'],
  barres: ['items'],
  empile: ['items'],
  ligne: ['labels', 'series'],
  frise: ['etapes'],
  comparaison: ['colonnes'],
  tranches: ['items'],
  flux: ['etapes'],
};

const PALETTE = ['#0F3D2E', '#8DB8A0', '#D6F25E', '#C8B994', '#FF6A4D', '#3E7A62', '#56655C'];
const TONS = { sapin: '#0F3D2E', sauge: '#8DB8A0', lime: '#D6F25E', corail: '#FF6A4D', encre: '#0C1A14', papier: '#EAE2D2' };

const SERIES = ['#0F3D2E', '#FF6A4D', '#3E7A62', '#8DB8A0', '#56655C'];
const couleurSerie = (s, k) => TONS[s.ton] || SERIES[k % SERIES.length];
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Texte enrichi minimal : **gras** et [lien](/chemin/)
const md = (s = '') => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)\s]+)\)/g, '<a href="$2">$1</a>');

export function nombre(v, unite = '', dec) {
  if (v === null || v === undefined || v === '') return '';
  if (typeof v === 'string') return v;
  const d = dec ?? (Number.isInteger(v) ? 0 : Math.min(3, (String(v).split('.')[1] || '').length));
  const n = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  return unite ? `${n} ${unite}` : n;
}

const figure = (type, d, corps, extraClass = '') => {
  const titre = d.titre ? `<p class="viz-titre">${md(d.titre)}</p>` : '';
  const sous = d.sousTitre ? `<p class="viz-sous">${md(d.sousTitre)}</p>` : '';
  const note = d.note ? `<p class="viz-note">${md(d.note)}</p>` : '';
  const source = d.source ? `<figcaption>Source : ${md(d.source)}</figcaption>` : '';
  return `<figure class="viz viz-${type}${extraClass ? ' ' + extraClass : ''}">${titre}${sous}${corps}${note}${source}</figure>`;
};

const R = {
  chiffre(d) {
    const ton = TONS[d.ton] ? ` ton-${d.ton}` : ' ton-sapin';
    return figure('chiffre', { ...d, titre: undefined }, `${d.titre ? `<p class="viz-sur">${md(d.titre)}</p>` : ''}<p class="v" data-compte>${esc(d.valeur)}</p><p class="l">${md(d.legende)}</p>`, ton.trim());
  },
  chiffres(d) {
    const items = d.items.map((i) => `<div class="c">${i.lien ? `<a href="${esc(i.lien)}">` : ''}<p class="v" data-compte>${esc(i.valeur)}</p><p class="l">${md(i.legende)}</p>${i.lien ? '</a>' : ''}</div>`).join('');
    return figure('chiffres', d, `<div class="grille-c n${Math.min(d.items.length, 4)}">${items}</div>`);
  },
  barres(d) {
    const max = d.max ?? Math.max(...d.items.map((i) => Math.abs(i.valeur)));
    const accent = typeof d.accent === 'number' ? d.accent : d.items.findIndex((i) => i.label === d.accent);
    const rows = d.items.map((i, k) => {
      const w = max ? Math.max(1.5, (Math.abs(i.valeur) / max) * 100) : 0;
      const cls = [k === accent ? 'accent' : '', i.valeur < 0 ? 'neg' : ''].filter(Boolean).join(' ');
      const val = i.affichage ?? (i.valeur < 0 ? '−' : '') + nombre(Math.abs(i.valeur), d.unite, d.decimales);
      return `<div class="b ${cls}"><span class="lab">${md(i.label)}${i.note ? `<small>${md(i.note)}</small>` : ''}</span><span class="piste"><span class="rempli" style="--w:${w.toFixed(1)}%"></span></span><span class="val">${esc(val)}</span></div>`;
    }).join('');
    return figure('barres', d, `<div class="barres">${rows}</div>`);
  },
  empile(d) {
    const total = d.items.reduce((s, i) => s + i.valeur, 0);
    const seg = d.items.map((i, k) => `<span class="seg" style="--w:${((i.valeur / total) * 100).toFixed(2)}%;--c:${TONS[i.ton] || PALETTE[k % PALETTE.length]}" title="${esc(i.label)}"></span>`).join('');
    const leg = d.items.map((i, k) => `<li><i style="--c:${TONS[i.ton] || PALETTE[k % PALETTE.length]}"></i><span class="lab">${md(i.label)}</span><span class="val">${esc(i.affichage ?? nombre(i.valeur, d.unite, d.decimales))}</span><span class="pct">${nombre((i.valeur / total) * 100, '%', 0)}</span></li>`).join('');
    const tot = d.totalLabel !== false ? `<li class="total"><i></i><span class="lab">${md(d.totalLabel || 'Total')}</span><span class="val">${esc(d.totalAffichage ?? nombre(total, d.unite, d.decimales))}</span><span class="pct">100 %</span></li>` : '';
    return figure('empile', d, `<div class="pile">${seg}</div><ul class="leg">${leg}${tot}</ul>`);
  },
  ligne(d) {
    const series = d.series;
    const n = d.labels.length;
    const toutes = series.flatMap((s) => s.valeurs.filter((v) => v !== null));
    let min = d.min ?? Math.min(0, ...toutes);
    let max = d.max ?? Math.max(...toutes);
    const pas = (() => { const brut = (max - min) / 4 || 1; const p = Math.pow(10, Math.floor(Math.log10(brut))); const r = brut / p; return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10) * p; })();
    min = Math.floor(min / pas) * pas; max = Math.ceil(max / pas) * pas;
    const X = (k) => (n === 1 ? 50 : (k / (n - 1)) * 100);
    const Y = (v) => 100 - ((v - min) / (max - min)) * 100;
    const grille = [];
    for (let v = min; v <= max + pas / 1000; v += pas) grille.push(`<span class="gy" style="top:${Y(v).toFixed(2)}%"><em>${esc(nombre(Math.round(v * 1000) / 1000, d.unite, d.decimales))}</em></span>`);
    const traits = series.map((s, k) => {
      const c = couleurSerie(s, k);
      const pts = [];
      s.valeurs.forEach((v, i) => {
        if (v === null) return;
        if (d.escalier && pts.length) pts.push(`${(X(i) * 10).toFixed(1)},${(Y(s.valeurs[i - 1]) * 10).toFixed(1)}`);
        pts.push(`${(X(i) * 10).toFixed(1)},${(Y(v) * 10).toFixed(1)}`);
      });
      return `<polyline points="${pts.join(' ')}" fill="none" stroke="${c}" stroke-width="${k === 0 ? 3 : 2.5}" vector-effect="non-scaling-stroke" stroke-linejoin="round"${s.pointille ? ' stroke-dasharray="6 5"' : ''}/>`;
    }).join('');
    const fins = series.map((s, k) => {
      const c = couleurSerie(s, k);
      const i = s.valeurs.map((v, j) => (v === null ? -1 : j)).filter((j) => j >= 0).pop();
      return `<span class="pt" style="left:${X(i).toFixed(2)}%;top:${Y(s.valeurs[i]).toFixed(2)}%;--c:${c}"><b>${esc(nombre(s.valeurs[i], d.unite, d.decimales))}</b></span>`;
    }).join('');
    const tous = Math.max(1, Math.ceil(n / 6));
    const ax = d.labels.map((l, i) => (i % tous === 0 || i === n - 1) ? `<span style="left:${X(i).toFixed(2)}%" class="${i === 0 ? 'g' : i === n - 1 ? 'd' : ''}">${esc(l)}</span>` : '').join('');
    const leg = series.length > 1 || series[0].nom ? `<p class="leg-l">${series.map((s, k) => `<span><i style="--c:${couleurSerie(s, k)}"></i>${esc(s.nom || '')}</span>`).join('')}</p>` : '';
    const table = `<table class="sr-only"><caption>${esc(d.titre || '')}</caption><thead><tr><th>Période</th>${series.map((s) => `<th>${esc(s.nom || 'Valeur')}</th>`).join('')}</tr></thead><tbody>${d.labels.map((l, i) => `<tr><td>${esc(l)}</td>${series.map((s) => `<td>${esc(nombre(s.valeurs[i], d.unite, d.decimales))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    return figure('ligne', d, `${leg}<div class="cadre-plot"><div class="plot">${grille.join('')}<svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">${traits}</svg>${fins}</div><div class="axe-x">${ax}</div></div>${table}`);
  },
  frise(d) {
    const e = d.etapes.map((s, k) => `<li class="${s.ton ? 'ton-' + s.ton : ''}" style="--k:${k}"><span class="quand">${md(s.quand || '')}</span><span class="point"></span><strong>${md(s.titre)}</strong>${s.texte ? `<span class="t">${md(s.texte)}</span>` : ''}</li>`).join('');
    return figure('frise', d, `<ol class="frise n${Math.min(d.etapes.length, 6)}">${e}</ol>`);
  },
  comparaison(d) {
    const cols = d.colonnes.map((c, k) => `<div class="col ton-${c.ton || ['sapin', 'sauge', 'corail', 'lime'][k % 4]}"><p class="h">${md(c.titre)}${c.sousTitre ? `<small>${md(c.sousTitre)}</small>` : ''}</p><ul>${c.points.map((p) => `<li>${md(p)}</li>`).join('')}</ul></div>`).join('');
    return figure('comparaison', d, `<div class="cols n${Math.min(d.colonnes.length, 4)}">${cols}</div>`);
  },
  tranches(d) {
    const max = Math.max(...d.items.map((i) => i.taux));
    const marche = d.items.map((i, k) => {
      const h = 14 + (i.taux / (max || 1)) * 86;
      const plage = i.a === null || i.a === undefined ? `au-delà de ${nombre(i.de, d.unite || '€')}` : `${nombre(i.de, '')} à ${nombre(i.a, d.unite || '€')}`;
      return `<div class="m${k === d.accent ? ' accent' : ''}" style="--h:${h.toFixed(1)}%;--k:${k}"><span class="marche"><b>${nombre(i.taux, '%')}</b></span><span class="plage">${esc(plage)}</span></div>`;
    }).join('');
    return figure('tranches', d, `<div class="escalier n${d.items.length}">${marche}</div>`);
  },
  flux(d) {
    const e = d.etapes.map((s, k) => {
      const o = typeof s === 'string' ? { titre: s } : s;
      return `<li style="--k:${k}"><span class="num">${k + 1}</span><strong>${md(o.titre)}</strong>${o.texte ? `<span class="t">${md(o.texte)}</span>` : ''}</li>`;
    }).join('');
    return figure('flux', d, `<ol class="flux n${Math.min(d.etapes.length, 5)}">${e}</ol>`);
  },
};

const unesc = (s) => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&amp;/g, '&');

export function valider(d) {
  if (!d || typeof d !== 'object') return 'bloc vide ou invalide';
  if (!TYPES[d.type]) return `type inconnu « ${d.type} » (types : ${Object.keys(TYPES).join(', ')})`;
  for (const k of TYPES[d.type]) if (d[k] === undefined) return `champ « ${k} » manquant pour le type ${d.type}`;
  if (!d.source && !['flux', 'frise', 'comparaison'].includes(d.type)) return `champ « source » manquant pour le type ${d.type}`;
  if (d.type === 'ligne' && d.series.some((s) => s.valeurs.length !== d.labels.length)) return 'ligne : chaque série doit avoir autant de valeurs que de labels';
  return null;
}

export function rendreVisuels(html, fichier = '') {
  return html.replace(/<pre><code class="language-graphique">([\s\S]*?)<\/code><\/pre>/g, (_, brut) => {
    let d;
    try { d = JSON.parse(unesc(brut)); } catch (e) { throw new Error(`[visuels] JSON invalide dans ${fichier} : ${e.message}\n${unesc(brut).slice(0, 200)}`); }
    const erreur = valider(d);
    if (erreur) throw new Error(`[visuels] ${fichier} : ${erreur}`);
    return R[d.type](d);
  });
}
