import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginData } from '@shared/models/auth.model';
import { catchError, of, tap } from 'rxjs';
import { AuthGuardService } from '../auth-guard-service/auth-guard.service';
import { IisLoginResponse } from '@features/user/models/auth/login.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiEndPoint = 'auth';

  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _authGuardService = inject(AuthGuardService);
  private _destroyRef = inject(DestroyRef);

  googleLogin() {
    window.open('http://localhost:3000/api/auth/google/login', '_self');
  }

  localLogin(loginData: ILoginData) {
    return this._http
      .post<IisLoginResponse>(`${this._apiEndPoint}/login`, loginData)
      .pipe(tap(() => this._authGuardService.fetchLoginUser()));
  }

  logout() {
    return this._http
      .post(`${this._apiEndPoint}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this._router.navigate(['/'])));
  }

  refreshToken() {
    return this._http
      .post(`${this._apiEndPoint}/refresh`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          console.log('Token Refreshed');
          this._authGuardService
            .fetchLoginUser()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe();
        }),
        catchError((err) => {
          console.error('Refresh token failed:', err);
          return of(null);
        }),
      );
  }
}
