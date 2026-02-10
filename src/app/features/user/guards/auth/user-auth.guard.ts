import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { catchError, map, of } from 'rxjs';

export const userAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authGuardService = inject(AuthGuardService);

  if (authGuardService.currentUser()?.email) {
    console.log('User is logged in');
    return true;
  }

  return authGuardService.fetchLoginUser().pipe(
    map((res) => {
      if (res?.data?.email) {
        return true;
      }
      return router.createUrlTree(['/login']);
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    }),
  );
};
