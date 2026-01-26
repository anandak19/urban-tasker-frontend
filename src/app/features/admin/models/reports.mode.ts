export interface IDashboardSummary {
  totalEarnings: number;
  totalIncomingAmount: number;
  totalTasksCompleted: number;
  totalUsers: number;
  totalTaskers: number;
}

export interface IBookingSummaryListItem {
  city?: string;
  categoryName?: string;

  bookingsCount: number;
  completedCount: number;
  earnings: number;
}

export interface IGraphDataItem {
  totalEarnings: number;
  month: string;
}

export interface INgxGraphDataItem {
  name: string;
  value: number;
}
