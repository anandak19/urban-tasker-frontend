import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFindAllComplaintsResponse } from '@features/admin/models/api-response.model';
import { buildQuery } from '@shared/helpers/query-builder';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IComplaintDetails } from '@shared/models/complaint/complaint.model';
import { IBaseFilters } from '@shared/models/request-data.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintManagementService {
  private readonly API_ENDPOINT = 'admin/complaints';
  private _http = inject(HttpClient);

  findAllComplaints(filter: IBaseFilters) {
    return this._http.get<IFindAllComplaintsResponse>(this.API_ENDPOINT, {
      params: buildQuery(filter),
    });
  }

  findOneComplaintById(id: string) {
    return this._http.get<IApiResponseSuccess<IComplaintDetails>>(
      `${this.API_ENDPOINT}/${id}`,
    );
  }
}
