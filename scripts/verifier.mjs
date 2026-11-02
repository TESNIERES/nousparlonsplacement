// Contrôle qualité avant publication : node scripts/verifier.mjs (après npm run build)
// Erreurs bloquantes : frontmatter incomplet, tirets longs, formules de conseil, marques commerciales
// dans les guides, liens internes cassés. Avertissements : chiffres sans note, longueurs SEO.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { valider } from '../integrations/visuels.mjs';

const racine = new URL('..', import.meta.url).pathname;
const erreurs = [], alertes = [];
const err = (f, m) => erreurs.push(`${f} : ${m}`);
const warn = (f, m) => alertes.push(`${f} : ${m}`);

async function* liste(dir, ext) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* liste(p, ext);
    else if (p.endsWith(ext)) yield p;
  }
}

const CATS = ['epargne', 'bourse', 'immobilier', 'retraite', 'fiscalite', 'credit', 'protection'];
const CONSEIL = [/\btu devrais\b/i, /\bnous (te )?recommandons\b/i, /\bje (te )?recommande\b/i, /\ble meilleur placement\b/i, /\bfonce\b/i, /\bà saisir\b/i, /(^|[.!?:]\s+|\n\s*[-*]\s+)investis (dans|en)\b/im, /\brendement garanti\b/i];
const MARQUES = ['BoursoBank', 'Boursorama', 'Fortuneo', 'Bourse Direct', 'Saxo', 'Trade Republic', 'DEGIRO', 'Degiro', 'Interactive Brokers', 'Linxea', 'Lucya', 'Yomoni', 'Nalo', 'Ramify', 'Corum', 'Amundi', 'BlackRock', 'iShares', 'Lyxor', 'Vanguard', 'BNP Paribas', 'Société Générale', 'Crédit Agricole', 'LCL', "Caisse d'Épargne", 'Banque Populaire', 'Crédit Mutuel', 'La Banque Postale', 'AXA', 'Generali', 'Allianz', 'Spirica', 'Suravenir', 'Binance', 'Coinbase', 'Revolut', 'Meilleurtaux', 'Altaprofits', 'Placement-direct', 'Netlife', 'Primonial', 'Sofidy', 'Perial', 'Iroko', 'Remake', 'Epargnissimo'];

function frontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { fm: m[1], corps: m[2] } : { fm: '', corps: src };
}
const champ = (fm, k) => { const m = fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm')); return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined; };

async function controlerContenu(dir, type) {
  for await (const f of liste(join(racine, dir), '.md')) {
    const nom = relative(racine, f);
    const src = await readFile(f, 'utf8');
    const { fm, corps } = frontmatter(src);
    if (/[—–]/.test(src)) err(nom, 'tiret long ou moyen interdit (— ou –)');
    for (const r of CONSEIL) if (r.test(corps)) err(nom, `formule de conseil interdite : ${r}`);
    for (const m of MARQUES) if (new RegExp(`\\b${m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(src)) err(nom, `produit ou acteur commercial nommé : ${m}`);
    const desc = champ(fm, 'description');
    if (!desc) err(nom, 'description manquante');
    else if (desc.length < 110 || desc.length > 175) warn(nom, `description de ${desc.length} caractères (viser 140 à 160)`);
    const cat = champ(fm, 'categorie');
    if (!CATS.includes(cat)) err(nom, `categorie invalide : ${cat}`);
    if (type === 'article') {
      const titre = champ(fm, 'title');
      if (!titre) err(nom, 'title manquant');
      else if (titre.length > 75) warn(nom, `title de ${titre.length} caractères`);
      if (!champ(fm, 'publie')) err(nom, 'publie manquant');
      if (!/^essentiel:/m.test(fm)) warn(nom, "pas de bloc « L'essentiel »");
      if (!/^faq:/m.test(fm)) warn(nom, 'pas de FAQ');
      if (/^# /m.test(corps)) err(nom, 'titre H1 dans le corps');
      const mots = corps.split(/\s+/).length;
      if (mots < 700) warn(nom, `${mots} mots seulement`);
      const appels = new Set([...corps.matchAll(/\[\^([^\]]+)\](?!:)/g)].map((m) => m[1]));
      const defs = new Set([...corps.matchAll(/^\[\^([^\]]+)\]:/gm)].map((m) => m[1]));
      for (const a of appels) if (!defs.has(a)) err(nom, `note [^${a}] sans définition`);
      for (const d of defs) if (!appels.has(d)) warn(nom, `note [^${d}] définie mais jamais appelée`);
      if (defs.size < 3) warn(nom, `seulement ${defs.size} sources en note`);
    } else {
      if (!champ(fm, 'terme')) err(nom, 'terme manquant');
      if (!champ(fm, 'definition')) err(nom, 'definition manquante');
    }
    for (const m of corps.matchAll(/```graphique\n([\s\S]*?)```/g)) {
      let d;
      try { d = JSON.parse(m[1]); } catch (e) { err(nom, `bloc graphique : JSON invalide (${e.message})`); continue; }
      const e = valider(d);
      if (e) err(nom, `bloc graphique : ${e}`);
      if (/[—–]/.test(m[1])) err(nom, 'bloc graphique : tiret long ou moyen');
    }
    const sansBlocs = corps.replace(/```[\s\S]*?```/g, '');
    for (const p of sansBlocs.split(/\n\s*\n/)) {
      if (/^\s*(>|\||\[\^)/.test(p)) continue;
      if (/\d[\d  ,.]*\s?(%|€)/.test(p) && !/\[\^/.test(p) && !/exemple/i.test(p)) warn(nom, `chiffre sans note : « ${p.trim().slice(0, 80)}… »`);
    }
  }
}

async function controlerLiens() {
  const dist = join(racine, 'dist');
  try { await stat(dist); } catch { warn('dist', 'pas de build, liens non vérifiés (lancer npm run build)'); return; }
  const existe = async (chemin) => {
    const propre = decodeURI(chemin.split('#')[0].split('?')[0]);
    for (const c of [join(dist, propre), join(dist, propre, 'index.html')]) {
      try { if ((await stat(c)).isFile()) return true; } catch {}
    }
    return false;
  };
  for await (const f of liste(dist, '.html')) {
    const html = await readFile(f, 'utf8');
    for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
      const h = m[1];
      if (h.startsWith('//') || h === '/') continue;
      if (!(await existe(h))) err(relative(dist, f), `lien interne cassé : ${h}`);
    }
  }
}

await controlerContenu('src/content/articles', 'article');
await controlerContenu('src/content/lexique', 'lexique');
await controlerLiens();
const uniques = (t) => [...new Set(t)];
for (const a of uniques(alertes)) console.log('  alerte  ' + a);
for (const e of uniques(erreurs)) console.log('  ERREUR  ' + e);
console.log(`\n${uniques(erreurs).length} erreur(s), ${uniques(alertes).length} alerte(s)`);
process.exit(erreurs.length ? 1 : 0);
