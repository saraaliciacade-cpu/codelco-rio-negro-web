-- 1. Role enum
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "deny_public_insert_user_roles"
ON public.user_roles AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny_public_update_user_roles"
ON public.user_roles AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "deny_public_delete_user_roles"
ON public.user_roles AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

-- 3. has_role helper (security definer, avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 4. Auto-grant admin only to the 3 allowed emails
CREATE OR REPLACE FUNCTION public.grant_admin_to_allowed_emails()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(NEW.email) IN (
    'codelcoweb@gmail.com',
    'hola@organicdesign.com.ar',
    'guerraignaciojavier@gmail.com'
  ) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_grant_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_grant_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_admin_to_allowed_emails();

-- Backfill for users that already exist
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
WHERE lower(u.email) IN (
  'codelcoweb@gmail.com',
  'hola@organicdesign.com.ar',
  'guerraignaciojavier@gmail.com'
)
ON CONFLICT (user_id, role) DO NOTHING;

-- 5. Admin policies on contact_submissions (read only)
CREATE POLICY "Admins can read contact submissions"
ON public.contact_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "deny_public_select_contact_submissions" ON public.contact_submissions;
CREATE POLICY "deny_anon_select_contact_submissions"
ON public.contact_submissions AS RESTRICTIVE FOR SELECT TO anon USING (false);

-- 6. Admin policies on news (full management)
CREATE POLICY "Admins can read all news"
ON public.news FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "deny_public_insert_news" ON public.news;
DROP POLICY IF EXISTS "deny_public_update_news" ON public.news;
DROP POLICY IF EXISTS "deny_public_delete_news" ON public.news;

CREATE POLICY "Admins can insert news"
ON public.news FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update news"
ON public.news FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete news"
ON public.news FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "deny_anon_write_news_insert"
ON public.news AS RESTRICTIVE FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "deny_anon_write_news_update"
ON public.news AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "deny_anon_write_news_delete"
ON public.news AS RESTRICTIVE FOR DELETE TO anon USING (false);