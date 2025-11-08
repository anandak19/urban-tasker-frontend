import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { firstValueFrom, take } from 'rxjs';
import { AuthService } from '@core/services/auth/auth.service';

export function appInitFactory(authservice: AuthService) {
  return firstValueFrom(authservice.refreshToken().pipe(take(1)));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAppInitializer(() => appInitFactory(inject(AuthService))),
    provideHttpClient(withInterceptors([authInterceptor, httpInterceptor])),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: false }), // !isDevMode()
  ],
};
