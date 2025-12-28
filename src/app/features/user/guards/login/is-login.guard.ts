import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { catchError, map, of } from 'rxjs';

export const isLoginGuard: CanActivateFn = () => {
  const _router = inject(Router);
  const _authGuardService = inject(AuthGuardService);

  console.log('Is login guard', _authGuardService.currentUser());

  const currentUser = _authGuardService.currentUser();

  if (currentUser && currentUser.email) {
    return _router.createUrlTree(['/']);
  }

  return _authGuardService.fetchLoginUser().pipe(
    takeUntilDestroyed(),
    map((res) => {
      const user = res?.data;
      console.log('User in guard after call', user);

      if (user && user.email) {
        _authGuardService.currentUser.set(user);
        return _router.createUrlTree(['/']);
      } else {
        return true;
      }
    }),
    catchError(() => {
      console.log('error in not login guard');
      return of(true);
    }),
  );
};
