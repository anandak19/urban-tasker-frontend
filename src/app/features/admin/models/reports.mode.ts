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

// move this to shared folder later
export interface IGraphDataItem {
  totalEarnings: number;
  month: string;
}

export interface INgxGraphDataItem {
  name: string;
  value: number;
}

export interface IStatusGraphData {
  pending: number;
  inProgress: number;
  completed: number;
  rejected: number;
  cancelled: number;
  overdue: number;
}

export interface IPaymentStatusData {
  created: number;
  attempted: number;
  paid: number;
  faild: number;
  pending: number;
}
