-- Enable RLS on all missing tables
ALTER TABLE public.competitive_advantages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_projections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funding_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_model ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_impact ENABLE ROW LEVEL SECURITY;

-- Fix search path for existing functions
ALTER FUNCTION public.increment_total_invested(uuid, numeric) SET search_path = public;
ALTER FUNCTION public.increment_user_total_invested(uuid, numeric) SET search_path = public;
ALTER FUNCTION public.increment_project_amount(uuid, numeric) SET search_path = public;