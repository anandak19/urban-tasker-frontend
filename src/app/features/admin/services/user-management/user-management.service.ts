import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOneUserResponse } from '@features/admin/models/user-data.interface';
import { buildQuery } from '@shared/helpers/query-builder';
import { IBaseFilters } from '@shared/models/request-data.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private _apiEndPoint = 'admin/user';
  private _http = inject(HttpClient);

  getAllUsers(query: IBaseFilters) {
    return this._http.get(this._apiEndPoint, { params: buildQuery(query) });
  }

  getUserById(id: string) {
    return this._http.get<IOneUserResponse>(`${this._apiEndPoint}/${id}`);
  }

  suspendUser(id: string, reason: string) {
    console.log(`${id} - ${reason}`);
    return this._http.patch<IOneUserResponse>(
      `${this._apiEndPoint}/${id}/suspend`,
      { suspendedReason: reason },
    );
  }

  unsuspendUser(id: string) {
    console.log(`${id}`);
    return this._http.patch<IOneUserResponse>(
      `${this._apiEndPoint}/${id}/unsuspend`,
      {},
    );
  }
}
