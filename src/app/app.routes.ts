import { Routes } from '@angular/router';
import { userRoutes } from './features/user/user.routes';
import { taskerRoutes } from './features/tasker/tasker.routes';
import { adminRoutes } from './features/admin/admin.routes';
import { UserLayoutComponent } from './features/user/user-layout/user-layout.component';
import { TaskerLayoutComponent } from './features/tasker/tasker-layout/tasker-layout.component';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './features/admin/components/admin-login/admin-login.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: userRoutes,
  },
  {
    path: 'tasker',
    component: TaskerLayoutComponent,
    children: taskerRoutes
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: adminRoutes,
  },
];
