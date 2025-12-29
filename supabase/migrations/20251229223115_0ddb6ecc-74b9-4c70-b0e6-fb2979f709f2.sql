-- First remove all policies that depend on has_role function

-- Remove admin policy from contact_submissions
DROP POLICY IF EXISTS "admins_can_view_contact_submissions" ON public.contact_submissions;

-- Remove admin policies from gallery_items
DROP POLICY IF EXISTS "Admins can insert gallery items" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can update gallery items" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins can delete gallery items" ON public.gallery_items;

-- Remove admin policies from storage.objects
DROP POLICY IF EXISTS "Admins can upload to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update gallery files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete gallery files" ON storage.objects;

-- Remove user_roles table policies
DROP POLICY IF EXISTS "users_can_view_own_role" ON public.user_roles;
DROP POLICY IF EXISTS "only_service_role_can_manage_roles" ON public.user_roles;

-- Now we can drop the user_roles table
DROP TABLE IF EXISTS public.user_roles;

-- Now drop the has_role function
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

-- Drop the app_role enum type
DROP TYPE IF EXISTS public.app_role;