import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { catchError, map, of } from 'rxjs';

export const isTaskerGuard: CanActivateFn = () => {
  const _authGuardService = inject(AuthGuardService);
  const _router = inject(Router);

  const currentUser = _authGuardService.currentUser();

  if (currentUser && currentUser.userRole === UserRoles.TASKER) {
    return true;
  }

  return _authGuardService.fetchLoginUser().pipe(
    takeUntilDestroyed(),
    map((res) => {
      const user = res?.data;

      if (user && user.userRole === UserRoles.TASKER) {
        _authGuardService.currentUser.set(user);
        return true;
      } else {
        return _router.createUrlTree(['/']);
      }
    }),
    catchError(() => {
      return of(false);
    }),
  );
};
