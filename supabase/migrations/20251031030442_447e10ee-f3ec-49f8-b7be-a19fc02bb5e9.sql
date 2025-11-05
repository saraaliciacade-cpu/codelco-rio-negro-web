-- Create gallery_items table
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('fabrica', 'metalurgica', 'rental')),
  file_path TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  is_video BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view gallery items
CREATE POLICY "Gallery items are viewable by everyone" 
ON public.gallery_items 
FOR SELECT 
USING (true);

-- Policy: Anyone can insert gallery items (can be restricted later with auth)
CREATE POLICY "Anyone can insert gallery items" 
ON public.gallery_items 
FOR INSERT 
WITH CHECK (true);

-- Policy: Anyone can update gallery items (can be restricted later with auth)
CREATE POLICY "Anyone can update gallery items" 
ON public.gallery_items 
FOR UPDATE 
USING (true);

-- Create storage bucket for gallery
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true);

-- Storage policies for gallery bucket
CREATE POLICY "Gallery files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery');

CREATE POLICY "Anyone can upload to gallery" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Anyone can update gallery files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gallery');

-- Function to mark old items as not new when inserting
CREATE OR REPLACE FUNCTION public.mark_old_items_not_new()
RETURNS TRIGGER AS $$
BEGIN
  -- Mark all existing items as not new
  UPDATE public.gallery_items SET is_new = false WHERE is_new = true;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run before insert
CREATE TRIGGER before_gallery_insert
BEFORE INSERT ON public.gallery_items
FOR EACH ROW
EXECUTE FUNCTION public.mark_old_items_not_new();