import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import typo from './integrations/typo.mjs';

export default defineConfig({
  site: 'https://www.nousparlonsplacement.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [
    typo(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
    }),
  ],
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['graphique'] },
    processor: satteri({
      features: {
        gfm: { footnotes: { label: 'Sources et notes' } },
        smartPunctuation: false,
      },
    }),
  },
});
