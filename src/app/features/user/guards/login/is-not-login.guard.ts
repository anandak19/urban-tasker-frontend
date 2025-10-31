import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@features/user/services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const isNotLoginGuard: CanActivateFn = () => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  return _authService.isUserLogin().pipe(
    map((isLoggedIn) => {
      console.log('Is user loggedin', isLoggedIn);
      if (!isLoggedIn) {
        return true;
      } else {
        return _router.createUrlTree(['/']);
      }
    }),
    catchError(() => {
      return of(true);
    }),
  );
};
