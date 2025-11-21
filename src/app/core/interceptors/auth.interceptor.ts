import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);

  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((err: IApiResponseError) => {
      // error is unautherized 401
      if (err.statusCode === 401) {
        console.log('Access token expired');
        // refresh the token's
        return _authService.refreshToken().pipe(
          // retry the request with new token
          switchMap(() => {
            console.log('Access Token refreshed');
            return next(req);
          }),
          catchError((e) => {
            console.log('Refresh token expired or malformed');
            // logout user here
            // redirect user to login
            if (!req.url.includes('/login-user')) {
              console.log('api is not for finding curret user');
              _router.navigateByUrl('/login');
            }
            return throwError(() => e);
          }),
        );
      }

      return throwError(() => err);
    }),
  );
};
