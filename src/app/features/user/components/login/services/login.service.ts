import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly _apiEndPoint = 'auth/login';

  private _http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login(loginData: any) {
    return this._http.post(this._apiEndPoint, loginData);
  }
}
