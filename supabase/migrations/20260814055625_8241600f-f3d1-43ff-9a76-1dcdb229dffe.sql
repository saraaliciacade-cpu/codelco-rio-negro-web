CREATE TABLE public.news (
  id bigserial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  seo_title text,
  category text NOT NULL,
  date_label text NOT NULL,
  date_iso date,
  summary text NOT NULL,
  meta_description text,
  image text,
  image_position text,
  body jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_question text,
  source_url text,
  source_label text,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.news_validate()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status NOT IN ('draft', 'published') THEN
    RAISE EXCEPTION 'invalid status: %', NEW.status;
  END IF;
  IF NEW.category NOT IN ('Flota', 'Proyecto', 'Planta', 'Clientes', 'Sector') THEN
    RAISE EXCEPTION 'invalid category: %', NEW.category;
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER news_validate_trigger
BEFORE INSERT OR UPDATE ON public.news
FOR EACH ROW EXECUTE FUNCTION public.news_validate();

CREATE INDEX news_status_date_idx ON public.news (status, date_iso DESC);

GRANT SELECT ON public.news TO anon;
GRANT SELECT ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published news are viewable by everyone"
ON public.news FOR SELECT
USING (status = 'published');

CREATE POLICY "deny_public_insert_news"
ON public.news AS RESTRICTIVE FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "deny_public_update_news"
ON public.news AS RESTRICTIVE FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "deny_public_delete_news"
ON public.news AS RESTRICTIVE FOR DELETE
TO anon, authenticated
USING (false);