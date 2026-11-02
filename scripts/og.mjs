// Génère l'image de partage (1200 x 630) de chaque guide et article qui n'en a pas encore.
// Usage : node scripts/og.mjs   (Playwright et Chromium doivent être disponibles)
import { readdir, readFile, writeFile, access, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const racine = new URL('..', import.meta.url).pathname;
const sortie = join(racine, 'public/og');
await mkdir(sortie, { recursive: true });

const NOMS = { epargne: 'Épargne', bourse: 'Bourse', immobilier: 'Immobilier', retraite: 'Retraite', fiscalite: 'Fiscalité', credit: 'Crédit', protection: 'Se protéger' };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const champ = (fm, k) => { const m = fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm')); return m ? m[1].trim().replace(/^["']|["']$/g, '') : ''; };

async function* md(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* md(p); else if (p.endsWith('.md')) yield p;
  }
}

const a_faire = [];
for await (const f of md(join(racine, 'src/content/articles'))) {
  const src = await readFile(f, 'utf8');
  const fm = (src.match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
  const cat = champ(fm, 'categorie');
  const slug = f.split('/').pop().replace(/\.md$/, '');
  const cible = join(sortie, `${cat}-${slug}.png`);
  try { await access(cible); continue; } catch {}
  a_faire.push({ cat, slug, titre: champ(fm, 'title'), type: champ(fm, 'type'), cible });
}

if (!a_faire.length) { console.log('[og] rien à générer'); process.exit(0); }
const f = (n) => `file://${join(racine, 'public/fonts', n)}`;
const navigateur = await chromium.launch();
const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
for (const a of a_faire) {
  const taille = a.titre.length > 70 ? 64 : a.titre.length > 48 ? 76 : 90;
  const html = `<!doctype html><html><head><style>
  @font-face{font-family:IS;src:url(${f('InstrumentSerif-Regular.woff2')})}
  @font-face{font-family:In;src:url(${f('Inter-Variable.woff2')});font-weight:100 900}
  body{margin:0;width:1200px;height:630px;background:#F4EFE4;color:#0C1A14;font-family:In;position:relative;overflow:hidden}
  .t{position:absolute;left:80px;right:80px;top:64px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px double #0C1A14;padding-bottom:22px}
  .t img{width:300px}.r{font-weight:600;font-size:19px;letter-spacing:.09em;text-transform:uppercase;color:#0F3D2E}
  h1{position:absolute;left:76px;right:90px;top:190px;margin:0;font-family:IS;font-weight:400;font-size:${taille}px;line-height:1.02;letter-spacing:-.01em}
  .b{position:absolute;left:0;right:0;bottom:0;height:86px;background:#0F3D2E;color:#F4EFE4;display:flex;align-items:center;justify-content:space-between;padding:0 80px;font-size:20px}
  .b b{color:#D6F25E;font-weight:600}
  </style></head><body>
  <div class="t"><img src="file://${join(racine, 'public/img/pp-logo-horizontal-transparent-sapin.svg')}"><span class="r">${esc(NOMS[a.cat] || '')}${a.type === 'guide' ? ' · Le guide' : ''}</span></div>
  <h1>${esc(a.titre)}</h1>
  <div class="b"><span>Sources officielles en note · Sans conseil personnalisé</span><b>nousparlonsplacement.com</b></div>
  </body></html>`;
  const fichier = join(tmpdir(), `og-${a.cat}-${a.slug}.html`);
  await writeFile(fichier, html);
  await page.goto(`file://${fichier}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: a.cible });
  console.log(`[og] ${a.cat}-${a.slug}.png`);
}
await navigateur.close();
