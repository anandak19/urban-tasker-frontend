import { Routes } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';
import { TasksManagementComponent } from './pages/tasks-management/tasks-management.component';
import { categoryManagementRoutes } from './pages/category-management/category-management.routes';
import { CategoryManagementLayout } from './pages/category-management/category-management-layout/category-management-layout.component';
import { TaskerApplicationsLayoutComponent } from './pages/tasker-application-management/tasker-applications-layout/tasker-applications-layout.component';
import { TaskerApplicationRoutes } from './pages/tasker-application-management/tasker-application.routes';
import { UsersManagementLayoutComponent } from './pages/users-management/users-management-layout/users-management-layout.component';
import { UserManagementRoutes } from './pages/users-management/users-management.routes';

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
    component: UsersManagementLayoutComponent,
    children: UserManagementRoutes,
  },
  {
    path: 'task-management',
    component: TasksManagementComponent,
  },
  {
    path: 'category-management',
    component: CategoryManagementLayout,
    children: categoryManagementRoutes,
  },
  {
    path: 'tasker-applications',
    component: TaskerApplicationsLayoutComponent,
    children: TaskerApplicationRoutes,
  },
];
