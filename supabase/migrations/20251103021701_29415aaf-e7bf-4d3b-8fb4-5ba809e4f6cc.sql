-- Fix security settings for mark_old_items_not_new function
-- Add SECURITY DEFINER and SET search_path to prevent search_path manipulation attacks

CREATE OR REPLACE FUNCTION public.mark_old_items_not_new()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Mark all existing items as not new
  UPDATE public.gallery_items SET is_new = false WHERE is_new = true;
  RETURN NEW;
END;
$$;