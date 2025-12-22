import { Routes } from '@angular/router';
import { ListBookedTasksComponent } from './pages/list-booked-tasks/list-booked-tasks.component';
import { ViewOneBookedTaskComponent } from './pages/view-one-booked-task/view-one-booked-task.component';

export const BookedTasksRoutes: Routes = [
  {
    path: '',
    component: ListBookedTasksComponent,
  },
  {
    path: ':taskId',
    component: ViewOneBookedTaskComponent,
  },
];
