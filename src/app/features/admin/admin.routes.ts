import { Routes } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { TasksManagementComponent } from './pages/tasks-management/tasks-management.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full',
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'user-management',
    component: UsersManagementComponent,
  },
  {
    path: 'task-management',
    component: TasksManagementComponent,
  },
  {
    path: 'category-management',
    component: CategoryManagementComponent,
  },
];
