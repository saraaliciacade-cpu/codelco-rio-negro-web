-- Create app_role enum for user roles
create type public.app_role as enum ('admin', 'moderator', 'user');

-- Create user_roles table to store user roles
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default now(),
    unique (user_id, role)
);

-- Enable RLS on user_roles table
alter table public.user_roles enable row level security;

-- Create security definer function to check if a user has a specific role
-- This prevents infinite recursion in RLS policies
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Drop the existing authenticated_can_view_submissions policy
drop policy if exists "authenticated_can_view_submissions" on public.contact_submissions;

-- Create new policy that only allows admins to view contact submissions
create policy "only_admins_can_view_submissions"
on public.contact_submissions
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Create policy to allow users to view their own role
create policy "users_can_view_own_role"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

-- Create policy to prevent users from modifying roles
-- Only service role can insert/update/delete roles
create policy "only_service_role_can_manage_roles"
on public.user_roles
for all
to authenticated
using (false)
with check (false);