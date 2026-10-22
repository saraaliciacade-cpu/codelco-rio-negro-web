import pilotRow from './archived-news/vaca-muerta-demanda-infraestructura-habitacional.json';
import { rowToNewsItem, type NewsRow } from './newsRow';

/** Lossless source rows stay in separate versioned files; register future validated copies here. */
export const archivedNewsRows: NewsRow[] = [pilotRow];
export const archivedNews = archivedNewsRows
  .filter((row) => row.status === 'published')
  .map(rowToNewsItem);