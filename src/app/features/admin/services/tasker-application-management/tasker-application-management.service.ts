import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFindAllTaskerApplicationsResponse } from '@features/admin/models/api-response.model';
import { buildQuery } from '@shared/helpers/query-builder';
import { IBaseFilters } from '@shared/models/request-data.model';

@Injectable({
  providedIn: 'root',
})
export class TaskerApplicationManagementService {
  private readonly API_ENDPOINT = 'admin/tasker-applications';
  private _http = inject(HttpClient);

  getAllApplications(filter: IBaseFilters) {
    return this._http.get<IFindAllTaskerApplicationsResponse>(
      this.API_ENDPOINT,
      {
        params: buildQuery(filter),
      },
    );
  }
}
