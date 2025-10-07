-- Remove public read access to contact submissions
-- This protects customer PII (names, emails, phones, messages, IP addresses)
-- Data can still be viewed by admins through the Supabase dashboard
DROP POLICY IF EXISTS "public_can_view_contact_submissions" ON public.contact_submissions;