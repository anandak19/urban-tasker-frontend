import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFindAllBookingSummery } from '@features/admin/models/api-response.model';
import {
  IDashboardSummary,
  IGraphDataItem,
  IPaymentStatusData,
  IStatusGraphData,
} from '@features/admin/models/reports.mode';
import { IBookingSummeryFilter } from '@features/admin/pages/reports/reports.component';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IReportFilter } from '@shared/models/report/query-filter.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly API_ENDPOINT = 'admin/reports';
  private _http = inject(HttpClient);

  getDashboardSummery() {
    return this._http.get<IApiResponseSuccess<IDashboardSummary>>(
      `${this.API_ENDPOINT}/summary`,
    );
  }

  getBookingsSummary(query: IBookingSummeryFilter) {
    const params = new HttpParams({
      fromObject: {
        ...query,
      },
    });

    return this._http.get<IFindAllBookingSummery>(
      `${this.API_ENDPOINT}/bookings`,
      { params },
    );
  }

  getGraphData(filter: IReportFilter) {
    const params = new HttpParams({
      fromObject: { ...filter },
    });
    return this._http.get<IApiResponseSuccess<IGraphDataItem[]>>(
      `${this.API_ENDPOINT}/graph-data`,
      { params },
    );
  }

  getStatusGraphData() {
    return this._http.get<IApiResponseSuccess<IStatusGraphData>>(
      `${this.API_ENDPOINT}/status-graph`,
    );
  }

  getPaymentStatusGraphData() {
    return this._http.get<IApiResponseSuccess<IPaymentStatusData>>(
      `${this.API_ENDPOINT}/payment-status-graph`,
    );
  }
}
