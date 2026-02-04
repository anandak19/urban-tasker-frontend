import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGraphDataItem } from '@features/admin/models/reports.mode';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class TaskerReportsService {
  private API_ENDPOINT = 'tasker/reports';
  private _http = inject(HttpClient);

  getEarningsReportData() {
    return this._http.get<IApiResponseSuccess<IGraphDataItem[]>>(
      `${this.API_ENDPOINT}`,
    );
  }
}
