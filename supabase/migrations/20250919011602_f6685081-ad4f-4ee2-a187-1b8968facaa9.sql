-- Fix column name typo and improve security
ALTER TABLE "Codelco Mapa SA" RENAME COLUMN adress TO address;

-- Add better indexing for performance  
CREATE INDEX IF NOT EXISTS idx_codelco_mapa_location ON "Codelco Mapa SA" (latitude, longitude);

-- Update RLS policy to be more explicit about public access
DROP POLICY IF EXISTS "public_read_access" ON "Codelco Mapa SA";
CREATE POLICY "public_location_access" ON "Codelco Mapa SA"
FOR SELECT USING (true);

-- Create contact submissions table for form handling
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);

-- Enable RLS on contact submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact submissions (public form)
CREATE POLICY "allow_public_contact_submissions" ON public.contact_submissions
FOR INSERT WITH CHECK (true);

-- Only authenticated users can view submissions (for admin purposes later)
CREATE POLICY "authenticated_can_view_submissions" ON public.contact_submissions
FOR SELECT USING (auth.role() = 'authenticated');