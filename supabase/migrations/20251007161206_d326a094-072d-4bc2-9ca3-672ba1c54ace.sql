-- Enable pg_cron extension for scheduled jobs
create extension if not exists pg_cron with schema extensions;

-- Schedule hourly cleanup of rate limit records older than 1 hour
-- This prevents the rate_limit table from growing indefinitely
select cron.schedule(
  'cleanup-rate-limits-hourly',
  '0 * * * *', -- Every hour at minute 0
  $$
  select public.cleanup_rate_limits();
  $$
);