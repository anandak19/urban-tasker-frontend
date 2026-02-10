import { Routes } from '@angular/router';
import { ListTaskerApplicationsComponent } from './pages/list-tasker-applications/list-tasker-applications.component';
import { ViewOneTaskerApplicationComponent } from './pages/view-one-tasker-application/view-one-tasker-application.component';

export const TaskerApplicationRoutes: Routes = [
  {
    path: '',
    component: ListTaskerApplicationsComponent,
  },
  {
    path: ':applicationId', // add a guard to validate id later
    component: ViewOneTaskerApplicationComponent,
  },
];
