// Project status and category enums
export enum ProjectStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CLOSED = 'closed'
}

export enum ProjectCategory {
  ENERGY = 'energy',
  REAL_ESTATE = 'real_estate',
  AGRICULTURE = 'agriculture',
  TECHNOLOGY = 'technology',
  MANUFACTURING = 'manufacturing',
  HEALTHCARE = 'healthcare'
}

export enum PayPeriod {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually'
}

export enum SortOption {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  FUNDING_GOAL_HIGH = 'funding_goal_high',
  FUNDING_GOAL_LOW = 'funding_goal_low',
  PROGRESS_HIGH = 'progress_high',
  PROGRESS_LOW = 'progress_low'
}