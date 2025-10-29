import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { signupDirtyGuard } from './guards/signup/signup-dirty.guard';
import { SignupLayoutComponent } from './pages/signup/signup-layout/signup-layout.component';

export const SIGNUP_FEATURE_KEY = 'signup';

export const userRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupLayoutComponent,
    canDeactivate: [signupDirtyGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
];
