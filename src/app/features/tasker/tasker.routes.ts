import { Routes } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

export const taskerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },

  {
    path: 'tasks',
    loadComponent: () =>
      import('./pages/tasks/tasks-layout/tasks-layout.component').then(
        (c) => c.TasksLayoutComponent,
      ),
    loadChildren: () =>
      import('./pages/tasks/tasks.routes').then((r) => r.TasksRoutes),
  },

  {
    path: 'availability',
    loadComponent: () =>
      import('./pages/tasker-availbility/tasker-availbility.component').then(
        (c) => c.TaskerAvailbilityComponent,
      ),
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/tasker-profile/tasker-profile.component').then(
        (c) => c.TaskerProfileComponent,
      ),
  },

  {
    path: 'earnings',
    loadComponent: () =>
      import('./pages/earnings/earnings.component').then(
        (c) => c.EarningsComponent,
      ),
  },

  {
    path: 'analytics',
    component: AnalyticsComponent,
  },
];
