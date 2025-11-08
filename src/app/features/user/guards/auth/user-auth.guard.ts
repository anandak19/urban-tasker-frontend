import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';

export const userAuthGuard: CanActivateFn = () => {
  const _router = inject(Router);
  const _authGuardService = inject(AuthGuardService);

  console.log('Is login guard', _authGuardService.currentUser());

  if (_authGuardService.currentUser()?.email) {
    return true;
  } else {
    return _router.createUrlTree(['/login']);
  }
};
