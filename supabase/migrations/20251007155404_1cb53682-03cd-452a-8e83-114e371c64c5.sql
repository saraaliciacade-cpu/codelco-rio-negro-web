-- Step 1: Fix Critical RLS Policy on rate_limit table
-- Remove the overly permissive SELECT policy that allows anyone to read all IP addresses

DROP POLICY IF EXISTS "allow_read_own_rate_limit" ON public.rate_limit;

-- The service_role_can_manage_rate_limits policy already handles admin access
-- No public read access is needed for rate limiting to function properly