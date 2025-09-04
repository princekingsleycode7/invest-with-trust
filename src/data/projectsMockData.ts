import { ProjectStatus, ProjectCategory, PayPeriod } from '../types/enums';
import { Project, ProjectDetails } from '../types/schema';

// Mock data for projects list
export const mockProjects: Project[] = [
  {
    id: "9c124a52-2cb8-4166-9636-d3280b4d7986",
    name: "Charcoal Briquette Manufacturing Company",
    description: "Converting sawdust waste into high-quality fuel briquettes for commercial and domestic use in Nigeria",
    category: ProjectCategory.MANUFACTURING as const,
    target_amount: 15000000,
    current_amount: 8500000,
    status: ProjectStatus.ACTIVE as const,
    projected_return: 25.5,
    pay_period: PayPeriod.MONTHLY as const,
    duration_months: 12,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-20T15:30:00Z",
    image_url: "https://images.unsplash.com/photo-1469289759076-d1484757abc3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxmYWN0b3J5JTIwbWFudWZhY3R1cmluZyUyMGluZHVzdHJpYWwlMjBtYWNoaW5lcnl8ZW58MHwwfHx8MTc1NzAwNjY2OHww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "49389018-0f07-446d-aa5d-2c5c27da70e0", 
    name: "Green Energy Solar Farm",
    description: "Large-scale solar energy project with guaranteed government contracts",
    category: ProjectCategory.ENERGY as const,
    target_amount: 50000000,
    current_amount: 42500000,
    status: ProjectStatus.ACTIVE as const,
    projected_return: 18.2,
    pay_period: PayPeriod.QUARTERLY as const,
    duration_months: 24,
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-01-18T12:15:00Z",
    image_url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJlbmV3YWJsZSUyMGVuZXJneSUyMHNvbGFyJTIwZmFybSUyMHBob3Rvdm9sdGFpY3xlbnwwfDB8fGJsdWV8MTc1NzAwNjY2N3ww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: "6b4ef312-9c09-488e-86fa-d0eeaf2a242b",
    name: "Urban Real Estate Development", 
    description: "Mixed-use development in prime downtown location",
    category: ProjectCategory.REAL_ESTATE as const,
    target_amount: 75000000,
    current_amount: 68000000,
    status: ProjectStatus.ACTIVE as const,
    projected_return: 22.8,
    pay_period: PayPeriod.QUARTERLY as const,
    duration_months: 36,
    created_at: "2024-01-05T14:00:00Z",
    updated_at: "2024-01-19T09:45:00Z",
    image_url: "https://images.unsplash.com/photo-1640184713822-174b6e94df51?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxza3lzY3JhcGVycyUyMHVyYmFuJTIwZGV2ZWxvcG1lbnQlMjBjb25zdHJ1Y3Rpb24lMjBkb3dudG93bnxlbnwwfDB8fHwxNzU3MDA2NjY4fDA&ixlib=rb-4.1.0&q=85"
  }
];

// Mock data for detailed project view
export const mockProjectDetails: ProjectDetails = {
  id: "9c124a52-2cb8-4166-9636-d3280b4d7986",
  name: "Charcoal Briquette Manufacturing Company - Nigeria",
  executive_summary: "We are seeking funding to establish a charcoal briquette manufacturing company in Nigeria, converting sawdust waste into high-quality fuel briquettes for commercial and domestic use. This venture addresses Nigeria's growing energy needs while providing a sustainable solution to wood waste management.",
  business_overview: "Our proposed facility will utilize proven Chinese manufacturing technology capable of producing 100-150kg per hour of premium charcoal briquettes using locally sourced sawdust. The operation will serve restaurants, commercial kitchens, industrial heating applications, and households across Nigeria.",
  market_opportunity: "Nigeria's energy sector faces significant challenges with unreliable electricity supply and expensive cooking fuel. Our charcoal briquettes offer a cost-effective, clean-burning alternative for restaurants and commercial kitchens, industrial heating applications, household cooking and heating, and rural communities needing affordable fuel.",
  production_capacity: "100-150kg per hour (28,000-42,000kg monthly)",
  selling_price: 200,
  monthly_revenue_potential: [5600000, 8400000],
  annual_revenue_projection: [67200000, 100800000],
  equipment_investment: 8100000,
  total_funding_needed: 15000000,
  funding_breakdown: [
    { category: "Equipment Purchase", amount: 8100000, percentage: 54 },
    { category: "Shipping", amount: 1000000, percentage: 7 },
    { category: "Facility Setup", amount: 2000000, percentage: 13 },
    { category: "Working Capital", amount: 2000000, percentage: 20 },
    { category: "Raw Materials Inventory", amount: 1000000, percentage: 7 },
    { category: "Contingency", amount: 900000, percentage: 6 }
  ],
  revenue_model: [
    { type: "Commercial Sales", description: "Bulk orders to restaurants and industries", price_range: [180, 190] },
    { type: "Retail Sales", description: "Individual consumers and small businesses", price_range: [200, 200] },
    { type: "Distribution", description: "Wholesale to retailers and fuel distributors", price_range: [170, 180] }
  ],
  competitive_advantages: [
    "Uses abundant sawdust waste from Nigerian timber industry",
    "Lower cost than imported charcoal", 
    "Consistent quality through automated production",
    "Environmentally sustainable production process",
    "Addresses both waste management and energy needs"
  ],
  financial_projections: [
    {
      year: 1,
      revenue: 75000000,
      operating_expenses: 45000000,
      net_profit: 30000000,
      roi: 200
    },
    {
      year: 2,
      revenue: 90000000,
      operating_expenses: 40000000,
      net_profit: 50000000,
      roi: 333
    }
  ],
  breakeven_point: "Month 3-4",
  full_roi_period: "6-8 months",
  annual_return_range: [200, 400],
  social_impact: [
    "Creates 8-10 direct jobs",
    "Converts waste sawdust into valuable energy product", 
    "Reduces deforestation pressure",
    "Provides affordable energy solution for communities",
    "Supports local timber industry waste management"
  ]
};