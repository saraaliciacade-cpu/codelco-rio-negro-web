import type { NewsItem } from './news';

/** First source wins: live/snapshot, archive, then existing bundled fallback. Identity is the slug. */
export const mergeNewsBySlug = (...sources: NewsItem[][]): NewsItem[] => {
  const bySlug = new Map<string, NewsItem>();
  for (const source of sources) {
    for (const item of source) {
      if (!bySlug.has(item.slug)) bySlug.set(item.slug, item);
    }
  }
  return [...bySlug.values()];
};

const publicationTime = (item: NewsItem): number => {
  if (item.dateIso) {
    const timestamp = Date.parse(item.dateIso);
    if (Number.isFinite(timestamp)) return timestamp;
  }
  const numeric = item.date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (numeric) return Date.UTC(Number(numeric[3]), Number(numeric[2]) - 1, Number(numeric[1]));
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const label = item.date.toLowerCase();
  const month = months.findIndex((name) => label.includes(name));
  const year = label.match(/\b(\d{4})\b/);
  const day = label.match(/^(\d{1,2})\s/);
  return month >= 0 && year ? Date.UTC(Number(year[1]), month, day ? Number(day[1]) : 1) : 0;
};

export const sortNewsItems = (items: NewsItem[]): NewsItem[] =>
  [...items].sort((a, b) => publicationTime(b) - publicationTime(a) || b.id - a.id || a.slug.localeCompare(b.slug));