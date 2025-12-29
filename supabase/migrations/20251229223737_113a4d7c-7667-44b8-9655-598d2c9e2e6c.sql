-- Add explicit DENY policies for UPDATE and DELETE on contact_submissions
-- This provides defense-in-depth and makes security intentions explicit

CREATE POLICY "deny_update_contact_submissions"
ON public.contact_submissions
FOR UPDATE
TO public
USING (false);

CREATE POLICY "deny_delete_contact_submissions"
ON public.contact_submissions
FOR DELETE
TO public
USING (false);