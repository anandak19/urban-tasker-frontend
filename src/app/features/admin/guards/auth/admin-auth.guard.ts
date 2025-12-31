import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { catchError, map, of } from 'rxjs';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  const _authGuardService = inject(AuthGuardService);

  const currentUser = _authGuardService.currentUser();

  if (currentUser?.userRole === UserRoles.ADMIN) {
    return true;
  }

  return _authGuardService.fetchLoginUser().pipe(
    map((res) => {
      const user = res?.data;
      console.log('Admin auth guard user,', user);
      if (user && user.userRole === UserRoles.ADMIN) {
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
