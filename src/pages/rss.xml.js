import rss from '@astrojs/rss';
import { articles } from '../lib/content';
import { SITE } from '../lib/site';
export function GET(context) {
  return rss({
    title: `${SITE.nom} : l'argent, expliqué simplement`,
    description: SITE.description,
    site: context.site,
    customData: '<language>fr-FR</language>',
    items: articles.slice(0, 50).map((a) => ({
      title: a.frontmatter.title,
      description: a.frontmatter.description,
      pubDate: new Date(a.frontmatter.publie),
      link: a.href,
    })),
  });
}
