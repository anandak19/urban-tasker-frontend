import { Routes } from '@angular/router';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ViewOneUserComponent } from './pages/view-one-user/view-one-user.component';

export const UserManagementRoutes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
  },
  {
    path: ':userId',
    component: ViewOneUserComponent,
  },
];
