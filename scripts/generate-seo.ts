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

interface SitemapImage {
  loc: string; // absolute URL
  title?: string;
  caption?: string;
}

interface FullEntry extends SitemapEntry {
  images?: SitemapImage[];
}

const abs = (path: string) => (path.startsWith('http') ? path : `${BASE_URL}${path}`);

const fabricaImages: SitemapImage[] = [
  { loc: abs('/fabrica-01.jpg'), title: 'Módulo Company Man Codelco', caption: 'Módulo habitacional Company Man fabricado por Codelco para operadoras en Vaca Muerta.' },
  { loc: abs('/fabrica-05.jpg'), title: 'Módulos habitacionales en planta Cipolletti', caption: 'Fabricación de módulos habitacionales industriales en la planta de Codelco en Cipolletti, Río Negro.' },
  { loc: abs('/fabrica-08.jpg'), title: 'Campamento habitacional llave en mano', caption: 'Campamento habitacional llave en mano entregado por Codelco S.A.' },
  { loc: abs('/fabrica-12.jpg'), title: 'Oficinas y comedores modulares', caption: 'Oficinas, comedores y laboratorios modulares Codelco para la industria energética.' },
  { loc: abs('/fabrica-18.jpg'), title: 'Interior de módulo habitacional Codelco', caption: 'Interior equipado de un módulo habitacional Codelco.' },
];

const metalurgicaImages: SitemapImage[] = [
  { loc: abs('/metalurgica-01.jpg'), title: 'Tanques industriales Codelco', caption: 'Tanques metálicos fabricados por Codelco para la industria petrolera.' },
  { loc: abs('/metalurgica-05.jpg'), title: 'Piletas y estructuras metálicas', caption: 'Piletas, estructuras metálicas y equipos a medida para Vaca Muerta.' },
  { loc: abs('/metalurgica-10.jpg'), title: 'Taller metalúrgico Codelco Cipolletti', caption: 'Taller metalúrgico Codelco S.A. en Cipolletti, Río Negro.' },
  { loc: abs('/metalurgica-15.jpg'), title: 'Corte y plegado de chapas CNC', caption: 'Servicio de corte y plegado de chapas con plegadora CNC.' },
];

const rentalImages: SitemapImage[] = [
  { loc: abs('/rental-01.jpg'), title: 'Flota Toyota Hilux Codelco', caption: 'Flota de camionetas Toyota Hilux en alquiler para Vaca Muerta.' },
  { loc: abs('/rental-02.jpg'), title: 'Camionetas VW Amarok en alquiler', caption: 'Camionetas Volkswagen Amarok en alquiler operativo Codelco.' },
  { loc: abs('/rental-03.jpg'), title: 'Trailers rodantes de gran porte', caption: 'Trailers rodantes de 6, 9 y 12 metros disponibles en rental Codelco.' },
  { loc: abs('/rental-04.jpg'), title: 'Torres de iluminación LED en yacimiento', caption: 'Torres de iluminación LED con stock inmediato para operaciones en Vaca Muerta.' },
  { loc: abs('/rental-07.jpg'), title: 'Equipos de iluminación autónoma', caption: 'Equipos de iluminación autónoma para obras y yacimientos.' },
  { loc: abs('/rental-08.jpg'), title: 'Camionetas y trailers en base Codelco', caption: 'Camionetas y trailers en base operativa Codelco.' },
];

const gruposImages: SitemapImage[] = [
  { loc: abs('/generadores.png'), title: 'Grupos electrógenos Codelco', caption: 'Grupos electrógenos en alquiler con mantenimiento y soporte 24/7.' },
  { loc: abs('/images/novedad/grupo-electrogeno.jpg'), title: 'Grupo electrógeno entregado a cliente', caption: 'Grupo electrógeno Codelco entregado y puesto en marcha para cliente del sector energético.' },
];

const homeImages: SitemapImage[] = [
  ...fabricaImages.slice(0, 2),
  ...metalurgicaImages.slice(0, 2),
  ...rentalImages.slice(0, 2),
  ...gruposImages.slice(0, 1),
];

const staticEntries: FullEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0', images: homeImages },
  { path: '/fabrica', changefreq: 'monthly', priority: '0.9', images: fabricaImages },
  { path: '/metalurgica', changefreq: 'monthly', priority: '0.9', images: metalurgicaImages },
  { path: '/rental', changefreq: 'monthly', priority: '0.9', images: rentalImages },
  { path: '/grupos-electrogenos', changefreq: 'monthly', priority: '0.9', images: gruposImages },
  { path: '/novedades', changefreq: 'weekly', priority: '0.8' },
  { path: '/clientes', changefreq: 'monthly', priority: '0.7' },
];

const newsEntries: FullEntry[] = newsData.map((item: NewsItem) => ({
  path: `/novedades/${item.slug}`,
  lastmod: parseDate(item.date).toISOString().slice(0, 10),
  changefreq: 'monthly',
  priority: '0.6',
  images: item.image
    ? [{ loc: abs(item.image), title: item.title, caption: item.summary }]
    : undefined,
}));

const allEntries: FullEntry[] = [...staticEntries, ...newsEntries];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...allEntries.map((e) =>
    [
      '  <url>',
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      ...(e.images ?? []).map((img) =>
        [
          '    <image:image>',
          `      <image:loc>${escapeXml(img.loc)}</image:loc>`,
          img.title ? `      <image:title>${escapeXml(img.title)}</image:title>` : null,
          img.caption ? `      <image:caption>${escapeXml(img.caption)}</image:caption>` : null,
          '    </image:image>',
        ]
          .filter(Boolean)
          .join('\n'),
      ),
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  ),
  '</urlset>',
  '',
].join('\n');

writeFileSync(resolve('public/sitemap.xml'), sitemap);
const totalImages = allEntries.reduce((n, e) => n + (e.images?.length ?? 0), 0);
console.log(`sitemap.xml written (${allEntries.length} entries, ${totalImages} images)`);


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
