DROP POLICY IF EXISTS "allow_public_contact_submissions" ON public.contact_submissions;
CREATE POLICY "allow_public_contact_submissions" ON public.contact_submissions
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
  AND (phone IS NULL OR char_length(phone) <= 50)
  AND (subject IS NULL OR char_length(subject) <= 300)
  AND (company IS NULL OR char_length(company) <= 200)
);
DROP POLICY IF EXISTS "Gallery files are publicly accessible" ON storage.objects;