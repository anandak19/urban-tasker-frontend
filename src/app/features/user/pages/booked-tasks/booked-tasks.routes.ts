import { Routes } from '@angular/router';
import { ListBookedTasksComponent } from './pages/list-booked-tasks/list-booked-tasks.component';
import { ViewOneBookedTaskComponent } from './pages/view-one-booked-task/view-one-booked-task.component';
import { TasksComplaintComponent } from './pages/tasks-complaint/tasks-complaint.component';
import { PaymentComponent } from './pages/payment/payment.component';

export const BookedTasksRoutes: Routes = [
  {
    path: '',
    component: ListBookedTasksComponent,
  },
  {
    path: ':taskId',
    component: ViewOneBookedTaskComponent,
  },
  {
    path: ':taskId/payment',
    component: PaymentComponent,
  },
  {
    path: ':taskId/complaint',
    component: TasksComplaintComponent,
  },
];
