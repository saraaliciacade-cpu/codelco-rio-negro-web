-- Step 6: Schedule rate limit cleanup to run every hour
-- This prevents the rate_limit table from growing indefinitely

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule cleanup_rate_limits to run every hour at minute 0
-- This will remove rate limit records older than 1 hour
SELECT cron.schedule(
  'cleanup-rate-limits-hourly',
  '0 * * * *',  -- Every hour at minute 0
  $$SELECT public.cleanup_rate_limits();$$
);