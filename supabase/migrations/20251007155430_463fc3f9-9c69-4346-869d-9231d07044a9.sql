-- Step 2: Simplify contact_submissions RLS policies
-- Since no admin panel is needed, we'll remove admin-only policies and make SELECT public

-- Drop existing admin-only policies
DROP POLICY IF EXISTS "only_admins_can_view_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "only_admins_can_update_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "only_admins_can_delete_submissions" ON public.contact_submissions;

-- Create a public SELECT policy so submissions can be viewed
-- Note: In a real production app, you might want to restrict this further
-- For now, making it public as per user requirements
CREATE POLICY "public_can_view_contact_submissions"
ON public.contact_submissions
FOR SELECT
USING (true);

-- Keep the public INSERT policy (already exists as allow_public_contact_submissions)
-- No UPDATE or DELETE policies = these operations are denied by default