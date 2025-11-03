-- Fix unrestricted gallery content upload vulnerability
-- Restrict gallery_items table operations to admins only

-- Drop the insecure public policies
DROP POLICY IF EXISTS "Anyone can insert gallery items" ON public.gallery_items;
DROP POLICY IF EXISTS "Anyone can update gallery items" ON public.gallery_items;

-- Create admin-only policies for gallery_items table
CREATE POLICY "Admins can insert gallery items" 
ON public.gallery_items FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery items" 
ON public.gallery_items FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery items" 
ON public.gallery_items FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Keep the public SELECT policy for viewing gallery
-- (Gallery items are viewable by everyone policy already exists)

-- Add storage policies for the gallery bucket to restrict uploads/updates/deletes
-- First, check if policies exist and drop them if needed
DROP POLICY IF EXISTS "Public can upload to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Public can update gallery files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update gallery" ON storage.objects;

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