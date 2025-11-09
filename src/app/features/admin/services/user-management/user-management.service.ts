import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private _apiEndPoint = 'admin/user';
  private _http = inject(HttpClient);

  getAllUsers(page: number, limit = 2) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this._http.get(this._apiEndPoint, { params });
  }
}
