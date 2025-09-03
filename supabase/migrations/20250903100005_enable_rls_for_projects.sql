-- Enable RLS for the projects table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow all users to read from the projects table
CREATE POLICY "Allow read access to all users"
ON public.projects
FOR SELECT
USING (true);
