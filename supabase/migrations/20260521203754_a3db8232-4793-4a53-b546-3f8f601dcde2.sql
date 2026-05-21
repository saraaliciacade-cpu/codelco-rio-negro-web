-- 1. Replace permissive deny policies with RESTRICTIVE on contact_submissions
DROP POLICY IF EXISTS deny_public_select_contact_submissions ON public.contact_submissions;
DROP POLICY IF EXISTS deny_update_contact_submissions ON public.contact_submissions;
DROP POLICY IF EXISTS deny_delete_contact_submissions ON public.contact_submissions;

CREATE POLICY deny_public_select_contact_submissions ON public.contact_submissions
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY deny_public_update_contact_submissions ON public.contact_submissions
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY deny_public_delete_contact_submissions ON public.contact_submissions
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- 2. Replace permissive deny policies with RESTRICTIVE on gallery_items
DROP POLICY IF EXISTS deny_public_insert_gallery_items ON public.gallery_items;
DROP POLICY IF EXISTS deny_public_update_gallery_items ON public.gallery_items;
DROP POLICY IF EXISTS deny_public_delete_gallery_items ON public.gallery_items;

CREATE POLICY deny_public_insert_gallery_items ON public.gallery_items
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY deny_public_update_gallery_items ON public.gallery_items
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY deny_public_delete_gallery_items ON public.gallery_items
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- 3. Replace permissive deny policies with RESTRICTIVE on rate_limit
DROP POLICY IF EXISTS service_role_can_manage_rate_limits ON public.rate_limit;
DROP POLICY IF EXISTS deny_public_select_rate_limit ON public.rate_limit;
DROP POLICY IF EXISTS deny_public_insert_rate_limit ON public.rate_limit;
DROP POLICY IF EXISTS deny_public_update_rate_limit ON public.rate_limit;
DROP POLICY IF EXISTS deny_public_delete_rate_limit ON public.rate_limit;

CREATE POLICY deny_public_select_rate_limit ON public.rate_limit
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY deny_public_insert_rate_limit ON public.rate_limit
  AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY deny_public_update_rate_limit ON public.rate_limit
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY deny_public_delete_rate_limit ON public.rate_limit
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- 4. Add restrictive write deny on the gallery storage bucket for public roles
DROP POLICY IF EXISTS deny_public_insert_gallery_bucket ON storage.objects;
DROP POLICY IF EXISTS deny_public_update_gallery_bucket ON storage.objects;
DROP POLICY IF EXISTS deny_public_delete_gallery_bucket ON storage.objects;

CREATE POLICY deny_public_insert_gallery_bucket ON storage.objects
  AS RESTRICTIVE FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id <> 'gallery');
CREATE POLICY deny_public_update_gallery_bucket ON storage.objects
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated
  USING (bucket_id <> 'gallery');
CREATE POLICY deny_public_delete_gallery_bucket ON storage.objects
  AS RESTRICTIVE FOR DELETE TO anon, authenticated
  USING (bucket_id <> 'gallery');

-- 5. Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.check_and_increment_rate_limit(inet, integer, integer) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.mark_old_items_not_new() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.check_and_increment_rate_limit(inet, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits() TO service_role;