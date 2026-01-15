import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { IApiResponseError } from '@shared/models/api-response.model';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.error('[ERROR Interceptor]: ', err);
      const error = err.error as IApiResponseError;
      return throwError(() => error);
    }),
  );
};
