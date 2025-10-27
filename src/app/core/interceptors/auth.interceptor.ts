import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/token/token.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _tokenService = inject(TokenService);

  const token = _tokenService.getAccessToken();
  console.log('Access token in memory: ', token);

  // add token to header
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err) => {
      console.log('Error in guard: ', err);

      // error is unautherized 401
      if (err.status === 401) {
        // refresh the token's
        return _tokenService.refreshTokens().pipe(
          // retry the request with new token
          switchMap((res) => {
            console.log('Refresh Res', res);

            _tokenService.setAccessToken(res.data.accessToken);
            // again add token to header
            const retry = req.clone({
              setHeaders: { Authorization: `Bearer ${res.data.accessToken}` },
            });
            return next(retry);
          }),
          catchError((e) => {
            _tokenService.clearAccessToken();
            // redirect user to login
            console.log('Redirect to login');
            return throwError(() => new Error(e));
          }),
        );
      }
      console.log('Not 401 error');

      return throwError(() => new Error(err));
    }),
  );
};
