-- Create an atomic rate limit check and increment function
-- This prevents race conditions by using SELECT FOR UPDATE and doing everything in one transaction
CREATE OR REPLACE FUNCTION public.check_and_increment_rate_limit(
  p_ip_address inet,
  p_max_requests integer DEFAULT 5,
  p_window_seconds integer DEFAULT 3600
)
RETURNS TABLE (
  allowed boolean,
  current_count integer,
  retry_after integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_window_start timestamptz;
  v_count integer;
  v_time_diff integer;
BEGIN
  -- Lock the row for this IP to prevent race conditions
  SELECT rl.submission_count, rl.window_start
  INTO v_count, v_window_start
  FROM rate_limit rl
  WHERE rl.ip_address = p_ip_address
  FOR UPDATE;
  
  IF FOUND THEN
    -- Calculate time since window started
    v_time_diff := EXTRACT(EPOCH FROM (now() - v_window_start))::integer;
    
    IF v_time_diff < p_window_seconds THEN
      -- Within current window
      IF v_count >= p_max_requests THEN
        -- Rate limit exceeded
        RETURN QUERY SELECT 
          false::boolean AS allowed,
          v_count AS current_count,
          (p_window_seconds - v_time_diff)::integer AS retry_after;
        RETURN;
      ELSE
        -- Increment counter
        UPDATE rate_limit 
        SET submission_count = submission_count + 1
        WHERE ip_address = p_ip_address;
        
        RETURN QUERY SELECT 
          true::boolean AS allowed,
          (v_count + 1)::integer AS current_count,
          0::integer AS retry_after;
        RETURN;
      END IF;
    ELSE
      -- Window expired, reset counter
      UPDATE rate_limit 
      SET submission_count = 1, window_start = now()
      WHERE ip_address = p_ip_address;
      
      RETURN QUERY SELECT 
        true::boolean AS allowed,
        1::integer AS current_count,
        0::integer AS retry_after;
      RETURN;
    END IF;
  ELSE
    -- First request from this IP, create entry
    INSERT INTO rate_limit (ip_address, submission_count, window_start)
    VALUES (p_ip_address, 1, now());
    
    RETURN QUERY SELECT 
      true::boolean AS allowed,
      1::integer AS current_count,
      0::integer AS retry_after;
    RETURN;
  END IF;
END;
$$;