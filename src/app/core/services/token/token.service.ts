import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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
  isLoggedIn = signal<boolean>(false);

  private _http = inject(HttpClient);

  setAccessToken(token: string) {
    this._accessToken = token;
    this.isLoggedIn.set(!!token);
  }

  getAccessToken() {
    return this._accessToken;
  }

  clearAccessToken() {
    this._accessToken = null;
    this.isLoggedIn.set(false);
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
