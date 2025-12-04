import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginData } from '@shared/models/auth.model';
import { catchError, of, tap } from 'rxjs';
import { AuthGuardService } from '../auth-guard-service/auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiEndPoint = 'auth';

  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _authGuardService = inject(AuthGuardService);

  googleLogin() {
    window.open('http://localhost:3000/api/auth/google/login', '_self');
  }

  localLogin(loginData: ILoginData) {
    return this._http
      .post(`${this._apiEndPoint}/login`, loginData)
      .pipe(tap(() => this._authGuardService.fetchLoginUser()));
  }

  logout() {
    return this._http.post(
      `${this._apiEndPoint}/logout`,
      {},
      { withCredentials: true },
    );
  }

  refreshToken() {
    return this._http
      .post(`${this._apiEndPoint}/refresh`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          console.log('Token Refreshed');
          this._authGuardService.fetchLoginUser().subscribe();
        }),
        catchError((err) => {
          console.error('Refresh token failed:', err);
          return of(null);
        }),
      );
  }
}
