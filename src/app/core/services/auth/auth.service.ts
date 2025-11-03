import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiEndPoints = 'auth';

  private _http = inject(HttpClient);

  logout() {
    return this._http.post(
      `${this._apiEndPoints}/logout`,
      {},
      { withCredentials: true },
    );
  }
}
