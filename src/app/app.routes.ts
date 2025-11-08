import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '@features/admin/admin-layout/admin-layout.component';
import { adminRoutes } from '@features/admin/admin.routes';
import { adminAuthGuard } from '@features/admin/guards/auth/admin-auth.guard';
import { isAdminLoginGuard } from '@features/admin/guards/login/is-login.guard';
import { AdminLoginComponent } from '@features/admin/pages/admin-login/admin-login.component';
import { TaskerLayoutComponent } from '@features/tasker/tasker-layout/tasker-layout.component';
import { taskerRoutes } from '@features/tasker/tasker.routes';
import { UserLayoutComponent } from '@features/user/user-layout/user-layout.component';
import { userRoutes } from '@features/user/user.routes';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: userRoutes,
  },
  {
    path: 'tasker',
    component: TaskerLayoutComponent,
    children: taskerRoutes,
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [isAdminLoginGuard],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: adminRoutes,
  },
];
