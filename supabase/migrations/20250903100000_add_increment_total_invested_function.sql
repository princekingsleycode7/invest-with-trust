-- Function to increment total_invested in the profiles table
CREATE OR REPLACE FUNCTION public.increment_total_invested(
  user_id_param UUID,
  amount_param DECIMAL
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET total_invested = total_invested + amount_param
  WHERE user_id = user_id_param;
END;
$$ LANGUAGE plpgsql;
