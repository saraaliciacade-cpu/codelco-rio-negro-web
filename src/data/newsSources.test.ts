import { describe, expect, test } from 'bun:test';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { archivedNews, archivedNewsRows } from './archivedNews';
import { rowToNewsItem, type NewsRow } from './newsRow';
import { mergeNewsBySlug, sortNewsItems } from './newsSources';

const slug = 'vaca-muerta-demanda-infraestructura-habitacional';
const pilot = archivedNews[0];
const snapshot: NewsRow[] = JSON.parse(readFileSync(resolve('src/data/news.remote.json'), 'utf8'));

describe('reversible one-article archive', () => {
  test('keeps every original field, null, timestamp and body value from the snapshot', () => {
    const original = snapshot.find((row) => row.slug === slug);
    expect(original).toBeDefined();
    expect(archivedNewsRows).toHaveLength(1);
    expect(archivedNewsRows[0]).toEqual(original);
    expect(archivedNewsRows[0].author).toBeNull();
    expect(archivedNewsRows[0].date_iso).toBe('2025-11-01');
  });

  test('live CMS edits take precedence and rollback leaves exactly the live article', () => {
    const live = { ...pilot, title: 'CMS edit used to detect archive precedence' };
    expect(mergeNewsBySlug([live], archivedNews)).toEqual([live]);
    expect(mergeNewsBySlug([live], [])).toEqual([live]);
  });

  test('removing only the live original preserves the complete public result and all other news', () => {
    const live = snapshot.map(rowToNewsItem);
    const before = sortNewsItems(mergeNewsBySlug(live, archivedNews));
    const after = sortNewsItems(mergeNewsBySlug(live.filter((row) => row.slug !== slug), archivedNews));
    expect(after).toEqual(before);
    expect(after.filter((row) => row.slug === slug)).toHaveLength(1);
    expect(after.find((row) => row.slug === slug)).toEqual(pilot);
  });

  test('archive wins over stale bundled fallback without rewriting metadata', () => {
    const stale = { ...pilot, dateIso: undefined, summary: 'Stale fallback' };
    expect(mergeNewsBySlug([], archivedNews, [stale])).toEqual([pilot]);
  });

  test('publication order and identity do not depend on a shared numeric ID', () => {
    const newer = { ...pilot, slug: 'newer-same-id', dateIso: '2026-10-15' };
    expect(sortNewsItems(mergeNewsBySlug([pilot, newer], archivedNews)).map((row) => row.slug))
      .toEqual(['newer-same-id', slug]);
  });

  test('SEO generator retains sitemap, RSS, prerender and full text when the live snapshot loses the original', async () => {
    const directory = mkdtempSync(resolve(tmpdir(), 'codelco-archive-seo-'));
    mkdirSync(resolve(directory, 'src/data'), { recursive: true });
    mkdirSync(resolve(directory, 'public'));
    const generate = async (rows: NewsRow[]) => {
      writeFileSync(resolve(directory, 'src/data/news.remote.json'), JSON.stringify(rows));
      const process = Bun.spawn(['bun', resolve('scripts/generate-seo.ts')], { cwd: directory, stdout: 'pipe', stderr: 'pipe' });
      const exit = await process.exited;
      if (exit !== 0) throw new Error(await new Response(process.stderr).text());
      return ['public/sitemap.xml', 'public/rss.xml', 'src/data/prerender-routes.json', 'public/llms.txt', 'public/llms-full.txt']
        .map((file) => readFileSync(resolve(directory, file), 'utf8').replace(/<lastBuildDate>.*?<\/lastBuildDate>/, ''));
    };
    try {
      const before = await generate(snapshot);
      const after = await generate(snapshot.filter((row) => row.slug !== slug));
      expect(after).toEqual(before);
      expect(JSON.parse(after[2]).filter((path: string) => path === `/novedades/${slug}`)).toHaveLength(1);
      expect(after[0].split(`<loc>https://codelco.com.ar/novedades/${slug}</loc>`)).toHaveLength(2);
      expect(after[1].split(`<guid isPermaLink="true">https://codelco.com.ar/novedades/${slug}</guid>`)).toHaveLength(2);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});