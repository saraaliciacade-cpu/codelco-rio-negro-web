import remoteRows from '@/data/news.remote.json';
import { newsAuthorOverrides } from '@/data/newsAuthors';
import { rowToNewsItem, type NewsRow } from '@/data/newsRow';
import type { NewsItem } from '@/data/news';

/**
 * Published news snapshot fetched at build time by `scripts/sync-news.mjs`.
 * Used as the SSR / prerender fallback so articles that only live in Supabase
 * still produce real HTML for crawlers. Empty array when the sync didn't run.
 */
export const remoteNews: NewsItem[] = ((remoteRows ?? []) as unknown as NewsRow[])
  .filter((row) => row && row.slug && row.status !== 'draft')
  .map(rowToNewsItem)
  .map((item) => {
    const override = newsAuthorOverrides[item.slug];
    return override ? { ...item, author: override } : item;
  });
