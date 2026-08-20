import type { NewsBlock, NewsItem } from '@/data/news';

/** Shape of a row in the Supabase `news` table. */
export interface NewsRow {
  id: number;
  slug: string;
  title: string;
  seo_title: string | null;
  category: string;
  date_label: string;
  date_iso: string | null;
  summary: string;
  meta_description: string | null;
  image: string | null;
  image_position: string | null;
  body: unknown;
  cta_question: string | null;
  source_url: string | null;
  source_label: string | null;
  status: string;
  author?: {
    name: string;
    role: string;
    image: string;
    url: string;
  } | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export const NEWS_COLUMNS =
  'id, slug, title, seo_title, category, date_label, date_iso, summary, meta_description, image, image_position, body, cta_question, source_url, source_label, status, author, created_at, updated_at';

/** Maps a Supabase `news` row to the NewsItem shape the public pages already render. */
export const rowToNewsItem = (row: NewsRow): NewsItem => ({
  id: row.id,
  slug: row.slug,
  category: row.category as NewsItem['category'],
  date: row.date_label,
  title: row.title,
  seoTitle: row.seo_title ?? undefined,
  metaDescription: row.meta_description ?? undefined,
  dateIso: row.date_iso ?? undefined,
  ctaQuestion: row.cta_question ?? undefined,
  summary: row.summary,
  image: row.image ?? '',
  imagePosition: row.image_position ?? undefined,
  body: Array.isArray(row.body) ? (row.body as (string | NewsBlock)[]) : [],
  status: row.status === 'draft' ? 'draft' : 'published',
  sourceUrl: row.source_url ?? undefined,
  sourceLabel: row.source_label ?? undefined,
  author: row.author ?? undefined,
});
