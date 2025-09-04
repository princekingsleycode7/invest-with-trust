-- Fix the search path for the function
CREATE OR REPLACE FUNCTION increment_total_invested(user_id_param UUID, amount_param NUMERIC)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles 
  SET total_invested = COALESCE(total_invested, 0) + amount_param,
      updated_at = now()
  WHERE user_id = user_id_param;
  
  -- If no profile exists, create one
  IF NOT FOUND THEN
    INSERT INTO profiles (user_id, total_invested, created_at, updated_at)
    VALUES (user_id_param, amount_param, now(), now());
  END IF;
END;
$$;