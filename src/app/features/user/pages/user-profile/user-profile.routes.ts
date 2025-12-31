import { Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserLocationFormComponent } from './pages/user-location-form/user-location-form.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { UpdatePersonalDataComponent } from './pages/update-personal-data/update-personal-data.component';

export const UserProfileRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  },
  {
    path: 'location',
    component: UserLocationFormComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'profile-edit',
    component: UpdatePersonalDataComponent,
  },
];
