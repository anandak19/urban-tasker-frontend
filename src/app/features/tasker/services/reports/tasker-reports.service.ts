import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGraphDataItem } from '@features/admin/models/reports.mode';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IReportFilter } from '@shared/models/report/query-filter.model';

@Injectable({
  providedIn: 'root',
})
export class TaskerReportsService {
  private API_ENDPOINT = 'tasker/reports';
  private _http = inject(HttpClient);

  getEarningsReportData(filter: IReportFilter) {
    const params = new HttpParams({
      fromObject: { ...filter },
    });

    return this._http.get<IApiResponseSuccess<IGraphDataItem[]>>(
      `${this.API_ENDPOINT}`,
      { params },
    );
  }
}
