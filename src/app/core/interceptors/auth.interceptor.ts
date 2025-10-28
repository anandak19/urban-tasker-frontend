import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@core/services/token/token.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _tokenService = inject(TokenService);
  const _router = inject(Router);

  const token = _tokenService.getAccessToken();
  console.log('Access token in memory: ', token);

  // add token to header
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // error is unautherized 401
      if (err.status === 401) {
        console.log('Access token expired');
        // refresh the token's
        return _tokenService.refreshTokens().pipe(
          // retry the request with new token
          switchMap((res) => {
            console.log('Tokens refreshed');

            _tokenService.setAccessToken(res.data.accessToken);
            const retry = req.clone({
              setHeaders: { Authorization: `Bearer ${res.data.accessToken}` },
            });
            return next(retry);
          }),
          catchError((e) => {
            console.log('Refresh token expired or malformed');
            // logout user here
            _tokenService.clearAccessToken();
            // redirect user to login
            _router.navigateByUrl('/login');
            return throwError(() => e);
          }),
        );
      }

      return throwError(() => err);
    }),
  );
};
