// src/integrations/supabase/projects.ts
import { supabase } from './client';
import { Project, ProjectDetails } from '@/types/schema';

// Fetch all projects
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

// Fetch detailed project information
export const fetchProjectDetails = async (projectId: string): Promise<ProjectDetails | null> => {
  try {
    // Fetch main project details
    const { data: projectDetails, error: detailsError } = await supabase
      .from('project_details')
      .select('*')
      .eq('id', projectId)
      .single();

    if (detailsError) {
      console.error('Error fetching project details:', detailsError);
      throw detailsError;
    }

    if (!projectDetails) {
      return null;
    }

    // Fetch funding breakdown
    const { data: fundingBreakdown, error: fundingError } = await supabase
      .from('funding_breakdown')
      .select('*')
      .eq('project_id', projectId)
      .order('percentage', { ascending: false });

    if (fundingError) {
      console.error('Error fetching funding breakdown:', fundingError);
      throw fundingError;
    }

    // Fetch revenue model
    const { data: revenueModel, error: revenueError } = await supabase
      .from('revenue_model')
      .select('*')
      .eq('project_id', projectId);

    if (revenueError) {
      console.error('Error fetching revenue model:', revenueError);
      throw revenueError;
    }

    // Fetch competitive advantages
    const { data: competitiveAdvantages, error: advantagesError } = await supabase
      .from('competitive_advantages')
      .select('*')
      .eq('project_id', projectId);

    if (advantagesError) {
      console.error('Error fetching competitive advantages:', advantagesError);
      throw advantagesError;
    }

    // Fetch financial projections
    const { data: financialProjections, error: projectionsError } = await supabase
      .from('financial_projections')
      .select('*')
      .eq('project_id', projectId)
      .order('year', { ascending: true });

    if (projectionsError) {
      console.error('Error fetching financial projections:', projectionsError);
      throw projectionsError;
    }

    // Fetch social impact
    const { data: socialImpact, error: impactError } = await supabase
      .from('social_impact')
      .select('*')
      .eq('project_id', projectId);

    if (impactError) {
      console.error('Error fetching social impact:', impactError);
      throw impactError;
    }

    // Transform data to match your ProjectDetails interface
    const transformedDetails: ProjectDetails = {
      id: projectDetails.id,
      name: projectDetails.name,
      executive_summary: projectDetails.executive_summary,
      business_overview: projectDetails.business_overview,
      market_opportunity: projectDetails.market_opportunity,
      production_capacity: projectDetails.production_capacity,
      selling_price: projectDetails.selling_price,
      monthly_revenue_potential: [
        projectDetails.monthly_revenue_potential_min,
        projectDetails.monthly_revenue_potential_max
      ],
      annual_revenue_projection: [
        projectDetails.annual_revenue_projection_min,
        projectDetails.annual_revenue_projection_max
      ],
      equipment_investment: projectDetails.equipment_investment,
      total_funding_needed: projectDetails.total_funding_needed,
      funding_breakdown: (fundingBreakdown || []).map(item => ({
        category: item.category,
        amount: item.amount,
        percentage: item.percentage
      })),
      revenue_model: (revenueModel || []).map(item => ({
        type: item.type,
        description: item.description,
        price_range: [item.price_range_min, item.price_range_max]
      })),
      competitive_advantages: (competitiveAdvantages || []).map(item => item.advantage),
      financial_projections: (financialProjections || []).map(item => ({
        year: item.year,
        revenue: item.revenue,
        operating_expenses: item.operating_expenses,
        net_profit: item.net_profit,
        roi: item.roi
      })),
      breakeven_point: projectDetails.breakeven_point,
      full_roi_period: projectDetails.full_roi_period,
      annual_return_range: [
        projectDetails.annual_return_range_min,
        projectDetails.annual_return_range_max
      ],
      social_impact: (socialImpact || []).map(item => item.impact)
    };

    return transformedDetails;
  } catch (error) {
    console.error('Failed to fetch project details:', error);
    throw error;
  }
};