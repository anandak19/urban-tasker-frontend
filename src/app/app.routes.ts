import { Routes } from '@angular/router';
import { adminAuthGuard } from '@features/admin/guards/auth/admin-auth.guard';
import { isAdminLoginGuard } from '@features/admin/guards/login/is-login.guard';
import { isTaskerGuard } from '@features/tasker/guards/isTasker/is-tasker.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/user/user-layout/user-layout.component').then(
        (c) => c.UserLayoutComponent,
      ),
    loadChildren: () =>
      import('./features/user/user.routes').then((r) => r.userRoutes),
  },

  {
    path: 'tasker',
    loadComponent: () =>
      import('./features/tasker/tasker-layout/tasker-layout.component').then(
        (c) => c.TaskerLayoutComponent,
      ),
    loadChildren: () =>
      import('./features/tasker/tasker.routes').then((r) => r.taskerRoutes),
    canActivate: [isTaskerGuard],
  },

  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/pages/admin-login/admin-login.component').then(
        (c) => c.AdminLoginComponent,
      ),
    canActivate: [isAdminLoginGuard],
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-layout/admin-layout.component').then(
        (c) => c.AdminLayoutComponent,
      ),
    canActivate: [adminAuthGuard],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((r) => r.adminRoutes),
  },
];
