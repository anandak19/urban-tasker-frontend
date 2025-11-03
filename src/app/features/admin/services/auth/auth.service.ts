import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from '@core/services/token/token.service';
import { ILoginData, ILoginSuccessResponse } from '@shared/models/auth.model';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiEndPoint = 'auth/admin';

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

  isAdminLogin() {
    return this._http.get(`${this._apiEndPoint}/is-login`).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
