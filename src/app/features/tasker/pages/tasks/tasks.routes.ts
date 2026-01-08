import { Routes } from '@angular/router';
import { ListTasksComponent } from './pages/list-tasks/list-tasks.component';
import { ViewTaskDetailsComponent } from './pages/view-task-details/view-task-details.component';

export const TasksRoutes: Routes = [
  {
    path: '',
    component: ListTasksComponent,
  },
  {
    path: ':taskId',
    component: ViewTaskDetailsComponent,
  },
];
