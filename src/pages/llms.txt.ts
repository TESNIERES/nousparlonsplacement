import { articles, termes } from '../lib/content';
import { SITE, CATEGORIES, OUTILS } from '../lib/site';
export function GET() {
  const l: string[] = [];
  l.push(`# ${SITE.nom}`, '', `> ${SITE.description}`, '');
  l.push("Média français d'éducation financière. Chaque chiffre est sourcé en note vers une source officielle (service-public.gouv.fr, impots.gouv.fr, Légifrance, Banque de France, AMF, Insee) et chaque page indique sa date de mise à jour. Les contenus sont pédagogiques et ne constituent pas un conseil en investissement personnalisé.", '');
  for (const c of CATEGORIES) {
    const liste = articles.filter((a) => a.frontmatter.categorie === c.id);
    if (!liste.length) continue;
    l.push(`## ${c.nom}`, '');
    for (const a of liste) l.push(`- [${a.frontmatter.title}](${SITE.url}${a.href}): ${a.frontmatter.description}`);
    l.push('');
  }
  l.push('## Outils', '');
  for (const o of OUTILS) l.push(`- [${o.titre}](${SITE.url}${o.href}): ${o.texte}`);
  l.push(`- [Agenda des événements financiers en Europe](${SITE.url}/evenements/): investissement, fintech, crypto, capital-investissement et économie, dates vérifiées.`);
  l.push('', '## Lexique', '');
  for (const t of termes) l.push(`- [${t.frontmatter.terme}](${SITE.url}${t.href}): ${t.frontmatter.definition}`);
  l.push('', '## À propos', '', `- [Notre méthode](${SITE.url}/methode/): sources, vérification, corrections, transparence sur la production des textes.`, `- [Partenariats et transparence](${SITE.url}/partenariats/)`, `- [Avertissement](${SITE.url}/avertissement/)`, '');
  return new Response(l.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
