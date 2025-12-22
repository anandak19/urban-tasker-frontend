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
      console.log('[Interceptor]: Error occured in api call');
      // error is unautherized 401
      if (err.statusCode === 401) {
        console.log('[Interceptor]: Access token expired');
        // refresh the token's
        return _authService.refreshToken().pipe(
          // retry the request with new token
          switchMap(() => {
            console.log('[Interceptor]: Access Token refreshed');
            return next(req);
          }),
          catchError((e) => {
            console.log('[Interceptor]: Refresh token expired or malformed');
            console.log(e);

            // logout user here
            // redirect user to login
            if (!req.url.includes('/login-user')) {
              console.log('[Interceptor]: api is not for finding curret user');
              console.log('[Interceptor]: UrL', req.url);
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
