export type ContractStatus = 'draft' | 'sent' | 'signed' | 'expired' | 'terminated';

export interface Contract {
  id: string;
  title: string;
  party: string;
  status: ContractStatus;
  startDate: string;  // ISO date string
  endDate: string;  // ISO date string
  amount: number;
  currency?: string;  // Optional currency code
}

// Query DTO used for list filters & pagination
export interface ListQuery {
  q?: string;   // Search query (title or party)
  status?: ContractStatus[];   // Multiple statuses can be selected
  party?: string;   
  expiringDays?: number;
  page?: number;
  size?: number;
  sort?: string;
}

// Paged response
export interface ContractsPage {
  content: Contract[];  // Current page items 
  totalElements: number;  // Total number of items across all pages
  page: number;      // current page
  size: number;   // size of the page
}

// Dashboard KPIs
export interface ContractSummary {
  // KPIs
  totalSignedCount: number;
  totalSignedValue: number;
  expiringIn30Days: number;

  // mini charts
  countByStatus: Record<string, number>;
  topPartiesByCount: Array<{ party: string; count: number }>;
}
