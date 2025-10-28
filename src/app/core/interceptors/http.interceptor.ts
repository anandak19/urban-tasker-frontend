import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
    withCredentials: true,
  });
  console.log(newReq.url);
  return next(newReq);
};
