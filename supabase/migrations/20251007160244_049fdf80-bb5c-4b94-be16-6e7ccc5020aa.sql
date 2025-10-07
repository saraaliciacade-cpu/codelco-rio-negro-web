-- Add admin-only SELECT policy for contact submissions
-- This allows authenticated admins to view submissions while maintaining security
CREATE POLICY "admins_can_view_contact_submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));