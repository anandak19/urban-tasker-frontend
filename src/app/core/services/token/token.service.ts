import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRefreshTokenResponse } from '@features/user/models/auth/token.models';
import { catchError, of, tap } from 'rxjs';

export interface IrefreshBody {
  data: { accessToken: string };
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _accessToken!: string | null;
  private readonly apiEndpoint = 'auth';

  private _http = inject(HttpClient);

  setAccessToken(token: string) {
    this._accessToken = token;
  }

  getAccessToken() {
    return this._accessToken;
  }

  clearAccessToken() {
    this._accessToken = null;
  }

  refreshTokens() {
    return this._http
      .post<IrefreshBody>(
        `${this.apiEndpoint}/refresh`,
        {},
        { withCredentials: true },
      )
      .pipe(
        tap((res) => {
          const response = res as IRefreshTokenResponse;
          this.setAccessToken(response.data.accessToken);
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        }),
      );
  }
}
