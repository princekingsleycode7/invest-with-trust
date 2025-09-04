-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  current_amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to projects (everyone can view)
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

-- Add project_id to investments table (if not already exists)
ALTER TABLE public.investments 
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id);

-- Create trigger for automatic timestamp updates on projects
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert mock project data
INSERT INTO public.projects (name, description, target_amount, current_amount, status) VALUES
('Tech Growth Fund', 'Invest in emerging technology companies with high growth potential', 1000000, 750000, 'active'),
('Real Estate Development', 'Commercial real estate development project in prime location', 2500000, 1200000, 'active'),
('Green Energy Initiative', 'Renewable energy projects focused on solar and wind power', 1500000, 450000, 'active'),
('Healthcare Innovation', 'Medical technology and pharmaceutical research investments', 800000, 320000, 'active');
