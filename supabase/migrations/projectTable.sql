-- Create project_details table
CREATE TABLE public.project_details (
  id UUID NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  executive_summary TEXT NOT NULL,
  business_overview TEXT NOT NULL,
  market_opportunity TEXT NOT NULL,
  production_capacity TEXT,
  selling_price NUMERIC,
  monthly_revenue_potential_min NUMERIC,
  monthly_revenue_potential_max NUMERIC,
  annual_revenue_projection_min NUMERIC,
  annual_revenue_projection_max NUMERIC,
  equipment_investment NUMERIC,
  total_funding_needed NUMERIC,
  breakeven_point TEXT,
  full_roi_period TEXT,
  annual_return_range_min NUMERIC,
  annual_return_range_max NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (id) REFERENCES public.projects(id) ON DELETE CASCADE
);

-- Create funding_breakdown table
CREATE TABLE public.funding_breakdown (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  percentage NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

-- Create revenue_model table
CREATE TABLE public.revenue_model (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  price_range_min NUMERIC NOT NULL,
  price_range_max NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

-- Create competitive_advantages table
CREATE TABLE public.competitive_advantages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  advantage TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

-- Create financial_projections table
CREATE TABLE public.financial_projections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  year INTEGER NOT NULL,
  revenue NUMERIC NOT NULL,
  operating_expenses NUMERIC NOT NULL,
  net_profit NUMERIC NOT NULL,
  roi NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

-- Create social_impact table
CREATE TABLE public.social_impact (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL,
  impact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

-- Get the project ID for Charcoal Briquette Manufacturing Company
-- We'll use this in our subsequent inserts
DO $$
DECLARE
    project_uuid UUID;
BEGIN
    -- Get the project ID for the charcoal briquette project
    SELECT id INTO project_uuid 
    FROM public.projects 
    WHERE name = 'Charcoal Briquette Manufacturing Company';
    
    -- Insert project details
    INSERT INTO public.project_details (
        id, name, executive_summary, business_overview, market_opportunity,
        production_capacity, selling_price, monthly_revenue_potential_min, monthly_revenue_potential_max,
        annual_revenue_projection_min, annual_revenue_projection_max, equipment_investment,
        total_funding_needed, breakeven_point, full_roi_period, annual_return_range_min, annual_return_range_max
    ) VALUES (
        project_uuid,
        'Charcoal Briquette Manufacturing Company - Nigeria',
        'We are seeking funding to establish a charcoal briquette manufacturing company in Nigeria, converting sawdust waste into high-quality fuel briquettes for commercial and domestic use. This venture addresses Nigeria''s growing energy needs while providing a sustainable solution to wood waste management.',
        'Our proposed facility will utilize proven Chinese manufacturing technology capable of producing 100-150kg per hour of premium charcoal briquettes using locally sourced sawdust. The operation will serve restaurants, commercial kitchens, industrial heating applications, and households across Nigeria.',
        'Nigeria''s energy sector faces significant challenges with unreliable electricity supply and expensive cooking fuel. Our charcoal briquettes offer a cost-effective, clean-burning alternative for restaurants and commercial kitchens, industrial heating applications, household cooking and heating, and rural communities needing affordable fuel.',
        '100-150kg per hour (28,000-42,000kg monthly)',
        200,
        5600000,
        8400000,
        67200000,
        100800000,
        8100000,
        15000000,
        'Month 3-4',
        '6-8 months',
        200,
        400
    );
    
    -- Insert funding breakdown
    INSERT INTO public.funding_breakdown (project_id, category, amount, percentage) VALUES
    (project_uuid, 'Equipment Purchase', 8100000, 54),
    (project_uuid, 'Shipping', 1000000, 7),
    (project_uuid, 'Facility Setup', 2000000, 13),
    (project_uuid, 'Working Capital', 2000000, 20),
    (project_uuid, 'Raw Materials Inventory', 1000000, 7),
    (project_uuid, 'Contingency', 900000, 6);
    
    -- Insert revenue model
    INSERT INTO public.revenue_model (project_id, type, description, price_range_min, price_range_max) VALUES
    (project_uuid, 'Commercial Sales', 'Bulk orders to restaurants and industries', 180, 190),
    (project_uuid, 'Retail Sales', 'Individual consumers and small businesses', 200, 200),
    (project_uuid, 'Distribution', 'Wholesale to retailers and fuel distributors', 170, 180);
    
    -- Insert competitive advantages
    INSERT INTO public.competitive_advantages (project_id, advantage) VALUES
    (project_uuid, 'Uses abundant sawdust waste from Nigerian timber industry'),
    (project_uuid, 'Lower cost than imported charcoal'),
    (project_uuid, 'Consistent quality through automated production'),
    (project_uuid, 'Environmentally sustainable production process'),
    (project_uuid, 'Addresses both waste management and energy needs');
    
    -- Insert financial projections
    INSERT INTO public.financial_projections (project_id, year, revenue, operating_expenses, net_profit, roi) VALUES
    (project_uuid, 1, 75000000, 45000000, 30000000, 200),
    (project_uuid, 2, 90000000, 40000000, 50000000, 333);
    
    -- Insert social impact
    INSERT INTO public.social_impact (project_id, impact) VALUES
    (project_uuid, 'Creates 8-10 direct jobs'),
    (project_uuid, 'Converts waste sawdust into valuable energy product'),
    (project_uuid, 'Reduces deforestation pressure'),
    (project_uuid, 'Provides affordable energy solution for communities'),
    (project_uuid, 'Supports local timber industry waste management');
    
END $$;