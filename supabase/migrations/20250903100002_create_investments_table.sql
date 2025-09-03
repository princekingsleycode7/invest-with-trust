-- investments table
CREATE TABLE investments (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  project_id INTEGER REFERENCES projects(id),
  amount NUMERIC NOT NULL,
  korapay_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
