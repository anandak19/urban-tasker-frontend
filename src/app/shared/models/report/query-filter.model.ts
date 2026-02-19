import { ReportGroupBy } from '@shared/constants/enums/filter-enum';

export interface IReportFilter {
  startDate?: string;
  endDate?: string;
}

export interface IReportGroupByFilter {
  reportGroupBy: ReportGroupBy;
}
