-- Remove the permissive storage policy that allows anyone to update gallery files
DROP POLICY IF EXISTS "Anyone can update gallery files" ON storage.objects;

-- The secure "Admins can update gallery files" policy is already in place
-- This ensures only authenticated admin users can modify gallery files