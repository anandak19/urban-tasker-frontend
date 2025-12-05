import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskerAvailbilityComponent } from './pages/tasker-availbility/tasker-availbility.component';
import { TaskerProfileComponent } from './pages/tasker-profile/tasker-profile.component';
import { EarningsComponent } from './pages/earnings/earnings.component';

export const taskerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'availability',
    component: TaskerAvailbilityComponent,
  },
  {
    path: 'tasker-profile',
    component: TaskerProfileComponent,
  },
  {
    path: 'earnings',
    component: EarningsComponent,
  },
];
