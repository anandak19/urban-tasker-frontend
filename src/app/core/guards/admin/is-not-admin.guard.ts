import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { catchError, map, of } from 'rxjs';

export const isNotAdminGuard: CanActivateFn = () => {
  const _authGuardService = inject(AuthGuardService);
  const router = inject(Router);

  const currentUser = _authGuardService.currentUser();

  if (currentUser && currentUser.userRole !== UserRoles.ADMIN) {
    return true;
  }

  return _authGuardService.fetchLoginUser().pipe(
    takeUntilDestroyed(),
    map((res) => {
      const user = res?.data;

      if (user && user.userRole !== UserRoles.ADMIN) {
        _authGuardService.currentUser.set(user);
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    }),
    catchError(() => {
      router.createUrlTree(['/']);
      return of(false);
    }),
  );
};
