import type { MarkdownInstance } from 'astro';

export type Faq = { q: string; r: string };

export type ArticleData = {
  title: string;
  seoTitle?: string;
  description: string;
  categorie: string;
  type: 'guide' | 'article' | 'actualite' | 'partenariat';
  publie: string;
  misAJour?: string;
  motCle?: string;
  essentiel?: string[];
  faq?: Faq[];
  liens?: string[];
  brouillon?: boolean;
  chiffre?: { valeur: string; legende: string };
};

export type LexiqueData = {
  terme: string;
  nomComplet?: string;
  definition: string;
  description: string;
  categorie: string;
  misAJour: string;
  voirAussi?: string[];
  guide?: string;
};

export type Article = MarkdownInstance<ArticleData> & { slug: string; href: string; mots: number };
export type Terme = MarkdownInstance<LexiqueData> & { slug: string; href: string };

const toDate = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v ?? '')).slice(0, 10);

const articleModules = import.meta.glob<MarkdownInstance<ArticleData>>('/src/content/articles/**/*.md', { eager: true });
const lexiqueModules = import.meta.glob<MarkdownInstance<LexiqueData>>('/src/content/lexique/*.md', { eager: true });
const rawArticles = import.meta.glob<string>('/src/content/articles/**/*.md', { eager: true, query: '?raw', import: 'default' });

const today = new Date().toISOString().slice(0, 10);

export const articles: Article[] = Object.entries(articleModules)
  .map(([path, mod]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const fm = mod.frontmatter;
    fm.publie = toDate(fm.publie);
    fm.misAJour = toDate(fm.misAJour || fm.publie);
    const raw = (rawArticles[path] || '').replace(/^---[\s\S]*?---/, '');
    const mots = raw.split(/\s+/).filter(Boolean).length;
    return Object.assign(mod, { slug, href: `/${fm.categorie}/${slug}/`, mots });
  })
  .filter((a) => !a.frontmatter.brouillon && a.frontmatter.publie <= today)
  .sort((a, b) => (b.frontmatter.publie + b.slug).localeCompare(a.frontmatter.publie + a.slug));

export const termes: Terme[] = Object.entries(lexiqueModules)
  .map(([path, mod]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    mod.frontmatter.misAJour = toDate(mod.frontmatter.misAJour);
    return Object.assign(mod, { slug, href: `/lexique/${slug}/` });
  })
  .sort((a, b) => a.frontmatter.terme.localeCompare(b.frontmatter.terme, 'fr', { sensitivity: 'base' }));

export const parCategorie = (id: string) => articles.filter((a) => a.frontmatter.categorie === id);
export const guides = () => articles.filter((a) => a.frontmatter.type === 'guide');
export const parHref = (href: string) => articles.find((a) => a.href === href);
export const terme = (slug: string) => termes.find((t) => t.slug === slug);
export const tempsLecture = (mots: number) => Math.max(1, Math.round(mots / 230));
