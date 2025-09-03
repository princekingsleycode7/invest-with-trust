-- transactions table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  amount NUMERIC NOT NULL,
  korapay_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
