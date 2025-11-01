import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@features/user/services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isLoginGuard: CanActivateFn = (_route, _state) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);

  return _authService.isUserLogin().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        return _router.createUrlTree(['/login']);
      }
    }),
    catchError(() => {
      return of(_router.createUrlTree(['/login']));
    }),
  );
};
