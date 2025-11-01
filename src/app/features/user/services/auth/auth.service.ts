import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '@core/services/token/token.service';
import { IisLoginResponse } from '@features/user/models/auth/login.model';
import { ILoginData, ILoginSuccessResponse } from '@shared/models/auth.model';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiEndPoint = 'auth';

  private _http = inject(HttpClient);
  private _tokenService = inject(TokenService);

  login(loginData: ILoginData) {
    return this._http.post(`${this._apiEndPoint}/login`, loginData).pipe(
      tap((res) => {
        const response = res as ILoginSuccessResponse;
        this._tokenService.setAccessToken(response?.data.accessToken);
      }),
    );
  }

  logout() {
    throw new Error('Method not implemented');
  }

  isUserLogin() {
    return this._http.get(`${this._apiEndPoint}/is-login`).pipe(
      map((res) => {
        const response = res as IisLoginResponse;
        return !!response.data.user.email;
      }),
      catchError(() => of(false)),
    );
  }
}
