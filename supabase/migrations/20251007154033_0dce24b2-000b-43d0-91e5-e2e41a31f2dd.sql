-- Fix the cleanup_rate_limits function to have a stable search path
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    DELETE FROM public.rate_limit
    WHERE window_start < now() - interval '1 hour';
END;
$$;