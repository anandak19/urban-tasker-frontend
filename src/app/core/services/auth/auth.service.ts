import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiEndPoint = 'auth';

  private _http = inject(HttpClient);

  googleLogin() {
    window.location.href = 'http://localhost:3000/api/auth/google/login';
  }

  logout() {
    return this._http.post(
      `${this._apiEndPoint}/logout`,
      {},
      { withCredentials: true },
    );
  }
}
