-- Fix unrestricted gallery content upload vulnerability
-- Replace insecure public policies with admin-only policies

-- Drop existing insecure policies
DROP POLICY IF EXISTS "Anyone can insert gallery items" ON public.gallery_items;
DROP POLICY IF EXISTS "Anyone can update gallery items" ON public.gallery_items;

-- The admin policies already exist, so we'll recreate them to ensure they're correct
DROP POLICY IF EXISTS "Admins can insert gallery items" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can update gallery items" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can delete gallery items" ON public.gallery_items;

-- Create secure admin-only policies
CREATE POLICY "Admins can insert gallery items" 
ON public.gallery_items FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery items" 
ON public.gallery_items FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery items" 
ON public.gallery_items FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Add storage policies for the gallery bucket
DROP POLICY IF EXISTS "Public read access to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update gallery files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete gallery files" ON storage.objects;

-- Allow public read access to gallery files
CREATE POLICY "Public read access to gallery"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- Restrict uploads to admins only
CREATE POLICY "Admins can upload to gallery"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Restrict updates to admins only
CREATE POLICY "Admins can update gallery files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gallery' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Restrict deletes to admins only
CREATE POLICY "Admins can delete gallery files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gallery' 
  AND public.has_role(auth.uid(), 'admin')
);