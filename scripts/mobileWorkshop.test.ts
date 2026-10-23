import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { rowToNewsItem, type NewsRow } from '../src/data/newsRow';
import { sortNewsItems, mergeNewsBySlug } from '../src/data/newsSources';
import { archivedNews } from '../src/data/archivedNews';

const rows: NewsRow[] = JSON.parse(readFileSync('src/data/news.remote.json', 'utf8'));
const slug = 'taller-movil-mantenimiento-industrial';
test('workshop belongs to projects', () => {
  expect(rows.find((row) => row.slug === slug)?.category).toBe('Proyecto');
});
test('October 23 workshop is the single newest public article', () => {
  const news = sortNewsItems(mergeNewsBySlug(rows.map(rowToNewsItem), archivedNews));
  expect(news[0]?.slug).toBe(slug);
  expect(news[0]?.dateIso).toBe('2026-10-23');
  expect(news.filter((item) => item.slug === slug)).toHaveLength(1);
});
test('new workshop has Ignacio Guerra credit', () => {
  expect(rows.find((row) => row.slug === slug)?.author?.name).toBe('Ignacio Guerra');
});