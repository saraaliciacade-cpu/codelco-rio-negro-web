-- Add explicit DENY policy for public SELECT on contact_submissions
-- This provides defense-in-depth alongside the existing admin-only policy
CREATE POLICY "deny_public_select_contact_submissions"
ON public.contact_submissions
FOR SELECT
TO public
USING (false);

-- Add explicit DENY policies for all CRUD operations on rate_limit table
-- This makes security intentions explicit and prevents table structure probing
CREATE POLICY "deny_public_select_rate_limit"
ON public.rate_limit
FOR SELECT
TO public
USING (false);

CREATE POLICY "deny_public_insert_rate_limit"
ON public.rate_limit
FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "deny_public_update_rate_limit"
ON public.rate_limit
FOR UPDATE
TO public
USING (false);

CREATE POLICY "deny_public_delete_rate_limit"
ON public.rate_limit
FOR DELETE
TO public
USING (false);