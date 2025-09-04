import { ProjectStatus, ProjectCategory, PayPeriod, SortOption } from './enums';

// Project and related types
export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  target_amount: number;
  current_amount: number;
  status: ProjectStatus;
  projected_return: number;
  pay_period: PayPeriod;
  duration_months: number;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export interface ProjectDetails {
  id: string;
  name: string;
  executive_summary: string;
  business_overview: string;
  market_opportunity: string;
  production_capacity: string;
  selling_price: number;
  monthly_revenue_potential: [number, number];
  annual_revenue_projection: [number, number];
  equipment_investment: number;
  total_funding_needed: number;
  funding_breakdown: FundingBreakdownItem[];
  revenue_model: RevenueModelItem[];
  competitive_advantages: string[];
  financial_projections: FinancialProjection[];
  breakeven_point: string;
  full_roi_period: string;
  annual_return_range: [number, number];
  social_impact: string[];
}

export interface FundingBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
}

export interface RevenueModelItem {
  type: string;
  description: string;
  price_range: [number, number];
}

export interface FinancialProjection {
  year: number;
  revenue: number;
  operating_expenses: number;
  net_profit: number;
  roi: number;
}

// Props types
export interface ProjectsPageProps {
  initialProjects?: Project[];
}

export interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
}

export interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
}

// Query hooks for fetching projects data
export interface ProjectsAPI {
  useProjectsQuery: (filters?: ProjectFilters) => QueryResult<Project[]>;
  useProjectDetailsQuery: (projectId: string) => QueryResult<ProjectDetails>;
  useProjectCategoriesQuery: () => QueryResult<ProjectCategory[]>;
}

export interface ProjectFilters {
  category?: ProjectCategory;
  status?: ProjectStatus;
  search?: string;
  sortBy?: SortOption;
}

export interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}