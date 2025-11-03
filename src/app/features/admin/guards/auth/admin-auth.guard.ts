import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@features/admin/services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const adminAuthGuard: CanActivateFn = () => {
  const _adminAuthService = inject(AuthService);
  const router = inject(Router);

  return _adminAuthService.isAdminLogin().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['/admin/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/admin/login']);
      return of(false);
    }),
  );
};
