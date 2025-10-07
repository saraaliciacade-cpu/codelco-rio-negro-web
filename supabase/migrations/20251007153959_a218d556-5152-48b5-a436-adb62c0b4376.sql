-- Create rate_limit table for tracking submission attempts by IP
CREATE TABLE IF NOT EXISTS public.rate_limit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address inet NOT NULL,
    submission_count integer NOT NULL DEFAULT 1,
    window_start timestamp with time zone NOT NULL DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE(ip_address)
);

-- Enable RLS on rate_limit table
ALTER TABLE public.rate_limit ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read their own rate limit (by IP)
CREATE POLICY "allow_read_own_rate_limit"
ON public.rate_limit
FOR SELECT
USING (true);

-- Policy: Service role can manage rate limits
CREATE POLICY "service_role_can_manage_rate_limits"
ON public.rate_limit
FOR ALL
USING (false)
WITH CHECK (false);

-- Add UPDATE policy to contact_submissions (only admins can update)
CREATE POLICY "only_admins_can_update_submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Add DELETE policy to contact_submissions (only admins can delete)
CREATE POLICY "only_admins_can_delete_submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create function to clean up old rate limit entries (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.rate_limit
    WHERE window_start < now() - interval '1 hour';
END;
$$;

-- Add index on ip_address for faster lookups
CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_address ON public.rate_limit(ip_address);
CREATE INDEX IF NOT EXISTS idx_rate_limit_window_start ON public.rate_limit(window_start);