import { Routes } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';
import { categoryManagementRoutes } from './pages/category-management/category-management.routes';
import { CategoryManagementLayout } from './pages/category-management/category-management-layout/category-management-layout.component';
import { TaskerApplicationsLayoutComponent } from './pages/tasker-application-management/tasker-applications-layout/tasker-applications-layout.component';
import { TaskerApplicationRoutes } from './pages/tasker-application-management/tasker-application.routes';
import { UsersManagementLayoutComponent } from './pages/users-management/users-management-layout/users-management-layout.component';
import { UserManagementRoutes } from './pages/users-management/users-management.routes';
import { TaskManagementLayoutComponent } from './pages/tasks-management/task-management-layout/task-management-layout.component';
import { taskManagementRoutes } from './pages/tasks-management/task-management.routes';
import { ComplaintManagementLayoutComponent } from './pages/complaint-management/complaint-management-layout/complaint-management-layout.component';
import { ComplaintManagementRoutes } from './pages/complaint-management/complaint-management.routes';
import { PaymentManagementLayoutComponent } from './pages/payment-management/payment-management-layout/payment-management-layout.component';
import { paymentRoutes } from './pages/payment-management/payment.routes';

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
    component: TaskManagementLayoutComponent,
    children: taskManagementRoutes,
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
  {
    path: 'complaints-management',
    component: ComplaintManagementLayoutComponent,
    children: ComplaintManagementRoutes,
  },
  {
    path: 'payments-management',
    component: PaymentManagementLayoutComponent,
    children: paymentRoutes,
  },
];
