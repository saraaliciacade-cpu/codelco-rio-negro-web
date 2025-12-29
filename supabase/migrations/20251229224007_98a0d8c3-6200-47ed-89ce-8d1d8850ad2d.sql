-- Add explicit DENY policies for gallery_items modifications
-- Only service_role (via Supabase dashboard/edge functions) can modify gallery items

CREATE POLICY "deny_public_insert_gallery_items"
ON public.gallery_items
FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "deny_public_update_gallery_items"
ON public.gallery_items
FOR UPDATE
TO public
USING (false);

CREATE POLICY "deny_public_delete_gallery_items"
ON public.gallery_items
FOR DELETE
TO public
USING (false);