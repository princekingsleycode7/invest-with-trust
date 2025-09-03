CREATE OR REPLACE FUNCTION increment_project_amount(p_id INTEGER, amount_to_add NUMERIC)
RETURNS void AS $$
BEGIN
  UPDATE projects
  SET current_amount = current_amount + amount_to_add
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;
