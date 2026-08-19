REVOKE ALL ON FUNCTION public.check_and_increment_rate_limit(inet, integer, integer) FROM anon, authenticated, public;
REVOKE ALL ON FUNCTION public.cleanup_rate_limits() FROM anon, authenticated, public;
REVOKE ALL ON FUNCTION public.mark_old_items_not_new() FROM anon, authenticated, public;
REVOKE ALL ON FUNCTION public.grant_admin_to_allowed_emails() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.check_and_increment_rate_limit(inet, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits() TO service_role;
GRANT EXECUTE ON FUNCTION public.mark_old_items_not_new() TO service_role;
GRANT EXECUTE ON FUNCTION public.grant_admin_to_allowed_emails() TO service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;