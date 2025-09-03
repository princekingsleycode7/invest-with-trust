-- projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  current_amount NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert mock data into projects table
INSERT INTO projects (name, description, target_amount)
VALUES 
  ('Project A', 'Description for Project A', 10000),
  ('Project B', 'Description for Project B', 20000),
  ('Project C', 'Description for Project C', 30000);
