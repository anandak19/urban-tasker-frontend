import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { catchError, map, of } from 'rxjs';

export const isTaskerGuard: CanActivateFn = () => {
  const _authGuardService = inject(AuthGuardService);
  const _router = inject(Router);

  const currentUser = _authGuardService.currentUser();

  if (currentUser && currentUser.userRole !== UserRoles.TASKER) {
    return _router.createUrlTree(['/']);
  }

  return _authGuardService.fetchLoginUser().pipe(
    map((res) => {
      const user = res?.data?.user;

      if (user && user.userRole !== UserRoles.TASKER) {
        _authGuardService.currentUser.set(user);
        return _router.createUrlTree(['/']);
      } else {
        return true;
      }
    }),
    catchError(() => {
      return of(true);
    }),
  );
};
