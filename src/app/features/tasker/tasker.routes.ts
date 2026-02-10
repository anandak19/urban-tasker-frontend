import { Routes } from '@angular/router';
import { TaskerAvailbilityComponent } from './pages/tasker-availbility/tasker-availbility.component';
import { TaskerProfileComponent } from './pages/tasker-profile/tasker-profile.component';
import { EarningsComponent } from './pages/earnings/earnings.component';
import { TasksLayoutComponent } from './pages/tasks/tasks-layout/tasks-layout.component';
import { TasksRoutes } from './pages/tasks/tasks.routes';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

export const taskerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksLayoutComponent,
    children: TasksRoutes,
  },
  {
    path: 'availability',
    component: TaskerAvailbilityComponent,
  },
  {
    path: 'profile',
    component: TaskerProfileComponent,
  },
  {
    path: 'earnings',
    component: EarningsComponent,
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
  },
];
