// Typographie française appliquée au HTML généré : espaces insécables avant : ; ? ! », après «,
// et dans les nombres (1 000 €, 3,5 %). Le contenu des balises script et style n'est jamais modifié.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rendreVisuels } from './visuels.mjs';

const NBSP = ' ', NNBSP = ' ';
const texte = (s) => s
  .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${NNBSP}`)
  .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${NNBSP}`)
  .replace(/(\d) (€|%|k€|M€|ans?\b|mois\b|jours?\b|fois\b)/g, `$1${NBSP}$2`)
  .replace(/ ([:;?!»])/g, `${NBSP}$1`)
  .replace(/« /g, `«${NBSP}`)
  .replace(/\b(n°|art\.|p\.) (?=\d)/g, `$1${NBSP}`)
  .replace(/\b1er\b/g, '1<sup class="ord">er</sup>')
  .replace(/\b1re\b/g, '1<sup class="ord">re</sup>');

export function corriger(html) {
  return html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<title>[\s\S]*?<\/title>|<svg[\s\S]*?<\/svg>|<[^>]+>)/g)
    .map((part, i) => (i % 2 === 1 ? part : texte(part)))
    .join('')
    .replace(/[ \u00a0\u202f]+(<sup><a [^>]*data-footnote-ref)/g, '$1');
}

async function* fichiers(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* fichiers(p);
    else if (p.endsWith('.html')) yield p;
  }
}

export default function typo() {
  return {
    name: 'typo-fr-et-visuels',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        let n = 0;
        for await (const f of fichiers(fileURLToPath(dir))) {
          const avant = await readFile(f, 'utf8');
          const apres = corriger(rendreVisuels(avant, f));
          if (apres !== avant) { await writeFile(f, apres); n++; }
        }
        console.log(`[typo-fr] ${n} pages corrigées`);
      },
    },
  };
}
