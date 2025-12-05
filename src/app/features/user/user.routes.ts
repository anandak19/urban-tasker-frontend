import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { signupDirtyGuard } from './guards/signup/signup-dirty.guard';
import { SignupLayoutComponent } from './pages/signup/signup-layout/signup-layout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { userAuthGuard } from './guards/auth/user-auth.guard';
import { isLoginGuard } from './guards/login/is-login.guard';
import { TaskerApplicationComponent } from './pages/become-tasker/tasker-application/tasker-application.component';
import { ViewTaskerApplicationComponent } from './pages/become-tasker/view-tasker-application/view-tasker-application.component';

export const SIGNUP_FEATURE_KEY = 'signup';

export const userRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    canActivate: [isLoginGuard],
    component: SignupLayoutComponent,
    canDeactivate: [signupDirtyGuard],
  },
  {
    path: 'login',
    canActivate: [isLoginGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'forgot-password',
    canActivate: [isLoginGuard],
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    canActivate: [isLoginGuard],
    component: ResetPasswordComponent,
  },
  {
    path: 'categories',
    canActivate: [userAuthGuard],
    component: CategoriesComponent,
  },
  {
    path: 'profile',
    canActivate: [userAuthGuard],
    component: UserProfileComponent,
  },
  // tasker/application
  {
    path: 'tasker/application',
    children: [
      {
        path: '',
        component: ViewTaskerApplicationComponent,
      },
      {
        path: 'apply',
        component: TaskerApplicationComponent,
      },
    ],
  },
];
