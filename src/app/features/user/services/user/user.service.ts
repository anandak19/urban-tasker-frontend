import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOneUserResponse } from '@features/admin/models/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected API_ENDPOINT = 'user';

  private _http = inject(HttpClient);

  getUserData() {
    return this._http.get<IOneUserResponse>(this.API_ENDPOINT);
  }
}
