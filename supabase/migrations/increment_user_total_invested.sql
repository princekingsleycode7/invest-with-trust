CREATE OR REPLACE FUNCTION increment_user_total_invested(
  p_user_id UUID,
  amount_to_add NUMERIC
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET total_invested = total_invested + amount_to_add,
      updated_at = NOW() -- It's good practice to update a timestamp
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;