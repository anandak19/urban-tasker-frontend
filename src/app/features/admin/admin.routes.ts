import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'reports',
    pathMatch: 'full',
  },

  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports.component').then(
        (c) => c.ReportsComponent,
      ),
  },

  {
    path: 'user-management',
    loadComponent: () =>
      import(
        './pages/users-management/users-management-layout/users-management-layout.component'
      ).then((c) => c.UsersManagementLayoutComponent),
    loadChildren: () =>
      import('./pages/users-management/users-management.routes').then(
        (r) => r.UserManagementRoutes,
      ),
  },

  {
    path: 'task-management',
    loadComponent: () =>
      import(
        './pages/tasks-management/task-management-layout/task-management-layout.component'
      ).then((c) => c.TaskManagementLayoutComponent),
    loadChildren: () =>
      import('./pages/tasks-management/task-management.routes').then(
        (r) => r.taskManagementRoutes,
      ),
  },

  {
    path: 'category-management',
    loadComponent: () =>
      import(
        './pages/category-management/category-management-layout/category-management-layout.component'
      ).then((c) => c.CategoryManagementLayout),
    loadChildren: () =>
      import('./pages/category-management/category-management.routes').then(
        (r) => r.categoryManagementRoutes,
      ),
  },

  {
    path: 'tasker-applications',
    loadComponent: () =>
      import(
        './pages/tasker-application-management/tasker-applications-layout/tasker-applications-layout.component'
      ).then((c) => c.TaskerApplicationsLayoutComponent),
    loadChildren: () =>
      import(
        './pages/tasker-application-management/tasker-application.routes'
      ).then((r) => r.TaskerApplicationRoutes),
  },

  {
    path: 'complaints-management',
    loadComponent: () =>
      import(
        './pages/complaint-management/complaint-management-layout/complaint-management-layout.component'
      ).then((c) => c.ComplaintManagementLayoutComponent),
    loadChildren: () =>
      import('./pages/complaint-management/complaint-management.routes').then(
        (r) => r.ComplaintManagementRoutes,
      ),
  },

  {
    path: 'payments-management',
    loadComponent: () =>
      import(
        './pages/payment-management/payment-management-layout/payment-management-layout.component'
      ).then((c) => c.PaymentManagementLayoutComponent),
    loadChildren: () =>
      import('./pages/payment-management/payment.routes').then(
        (r) => r.paymentRoutes,
      ),
  },
];
