import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  publishedNews as staticPublishedNews,
  newsData as staticNewsData,
  type NewsItem,
  type NewsBlock,
} from '@/data/news';

/** Row shape of public.news */
interface NewsRow {
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
}

const mapRow = (row: NewsRow): NewsItem => ({
  id: row.id,
  slug: row.slug,
  category: row.category as NewsItem['category'],
  date: row.date_label,
  dateIso: row.date_iso ?? undefined,
  title: row.title,
  seoTitle: row.seo_title ?? undefined,
  metaDescription: row.meta_description ?? undefined,
  summary: row.summary,
  image: row.image ?? '',
  imagePosition: row.image_position ?? undefined,
  body: (Array.isArray(row.body) ? row.body : []) as (string | NewsBlock)[],
  ctaQuestion: row.cta_question ?? undefined,
  sourceUrl: row.source_url ?? undefined,
  sourceLabel: row.source_label ?? undefined,
  status: row.status === 'draft' ? 'draft' : 'published',
});

/** Published news, newest first. Falls back to the bundled data during SSR / first paint. */
export const usePublishedNews = () => {
  const query = useQuery({
    queryKey: ['news', 'published'],
    queryFn: async (): Promise<NewsItem[]> => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .order('date_iso', { ascending: false })
        .order('id', { ascending: false });

      if (error) throw error;
      return (data as unknown as NewsRow[]).map(mapRow);
    },
    initialData: staticPublishedNews,
    staleTime: 60_000,
  });

  const news = query.data?.length ? query.data : staticPublishedNews;
  return { news, latestNewsId: news[0]?.id, isLoading: query.isLoading };
};

/** Single article by slug (published or draft — drafts stay reachable by direct link). */
export const useNewsBySlug = (slug?: string) => {
  const fallback = slug ? staticNewsData.find((n) => n.slug === slug) : undefined;

  const query = useQuery({
    queryKey: ['news', 'slug', slug],
    enabled: !!slug,
    queryFn: async (): Promise<NewsItem | null> => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug!)
        .maybeSingle();

      if (error) throw error;
      return data ? mapRow(data as unknown as NewsRow) : null;
    },
    initialData: fallback ?? undefined,
    staleTime: 60_000,
  });

  return {
    item: query.data ?? fallback,
    isLoading: query.isLoading && !fallback,
    notFound: !query.isLoading && !query.data && !fallback,
  };
};
