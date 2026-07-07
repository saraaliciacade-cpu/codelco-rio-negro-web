// Generates public/sitemap.xml and public/rss.xml from routes and src/data/news.ts.
// Runs via predev/prebuild npm hooks.

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { newsData, type NewsItem } from '../src/data/news';

const BASE_URL = 'https://codelco.com.ar';

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
}

const MONTHS: Record<string, string> = {
  enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
  julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12',
};

// Parse "Junio 2026" -> "2026-06-01"
function parseDate(input: string): Date {
  const parts = input.toLowerCase().trim().split(/\s+/);
  const month = MONTHS[parts[0]] ?? '01';
  const year = parts[1] ?? String(new Date().getFullYear());
  return new Date(`${year}-${month}-01T12:00:00Z`);
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// -------- Sitemap --------

const staticEntries: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/fabrica', changefreq: 'monthly', priority: '0.9' },
  { path: '/metalurgica', changefreq: 'monthly', priority: '0.9' },
  { path: '/rental', changefreq: 'monthly', priority: '0.9' },
  { path: '/grupos-electrogenos', changefreq: 'monthly', priority: '0.9' },
  { path: '/novedades', changefreq: 'weekly', priority: '0.8' },
  { path: '/clientes', changefreq: 'monthly', priority: '0.7' },
];

const newsEntries: SitemapEntry[] = newsData.map((item: NewsItem) => ({
  path: `/novedades/${item.slug}`,
  lastmod: parseDate(item.date).toISOString().slice(0, 10),
  changefreq: 'monthly',
  priority: '0.6',
}));

const allEntries = [...staticEntries, ...newsEntries];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allEntries.map((e) =>
    [
      '  <url>',
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  ),
  '</urlset>',
  '',
].join('\n');

writeFileSync(resolve('public/sitemap.xml'), sitemap);
console.log(`sitemap.xml written (${allEntries.length} entries)`);

// -------- RSS --------

const sortedNews = [...newsData].sort(
  (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
);

const buildDate = new Date().toUTCString();

const rssItems = sortedNews.map((item) => {
  const url = `${BASE_URL}/novedades/${item.slug}`;
  const pubDate = parseDate(item.date).toUTCString();
  const image = item.image?.startsWith('http') ? item.image : `${BASE_URL}${item.image}`;
  return [
    '    <item>',
    `      <title>${escapeXml(item.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${pubDate}</pubDate>`,
    `      <category>${escapeXml(item.category)}</category>`,
    `      <description>${escapeXml(item.summary)}</description>`,
    `      <enclosure url="${escapeXml(image)}" type="image/jpeg" />`,
    '    </item>',
  ].join('\n');
});

const rss = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  '    <title>Codelco S.A. — Novedades</title>',
  `    <link>${BASE_URL}/novedades</link>`,
  '    <description>Novedades, proyectos y actualidad de Codelco S.A. — módulos habitacionales, metalúrgica, rental y grupos electrógenos en Vaca Muerta.</description>',
  '    <language>es-AR</language>',
  `    <lastBuildDate>${buildDate}</lastBuildDate>`,
  `    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
  ...rssItems,
  '  </channel>',
  '</rss>',
  '',
].join('\n');

writeFileSync(resolve('public/rss.xml'), rss);
console.log(`rss.xml written (${sortedNews.length} items)`);
