
CREATE TABLE public.chat_rate_limits (
  ip_address text NOT NULL,
  request_timestamps timestamptz[] NOT NULL DEFAULT '{}',
  PRIMARY KEY (ip_address)
);

ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- No RLS policies needed - only accessed via service role from edge function

-- Function to check and increment rate limit atomically
CREATE OR REPLACE FUNCTION public.check_chat_rate_limit(p_ip text, p_window_seconds int DEFAULT 60, p_max_requests int DEFAULT 10)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now timestamptz := now();
  v_cutoff timestamptz := v_now - (p_window_seconds || ' seconds')::interval;
  v_timestamps timestamptz[];
  v_count int;
BEGIN
  -- Upsert and prune old timestamps atomically
  INSERT INTO chat_rate_limits (ip_address, request_timestamps)
  VALUES (p_ip, ARRAY[v_now])
  ON CONFLICT (ip_address) DO UPDATE
  SET request_timestamps = array_append(
    array(SELECT unnest(chat_rate_limits.request_timestamps) AS ts WHERE ts > v_cutoff),
    v_now
  )
  RETURNING request_timestamps INTO v_timestamps;

  v_count := array_length(v_timestamps, 1);

  -- If over limit, remove the timestamp we just added and return false
  IF v_count > p_max_requests THEN
    UPDATE chat_rate_limits
    SET request_timestamps = v_timestamps[1:array_length(v_timestamps,1)-1]
    WHERE ip_address = p_ip;
    RETURN false;
  END IF;

  RETURN true;
END;
$$;
