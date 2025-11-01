import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { signupDirtyGuard } from './guards/signup/signup-dirty.guard';
import { SignupLayoutComponent } from './pages/signup/signup-layout/signup-layout.component';
import { isLoginGuard } from './guards/login/is-login.guard';
import { isNotLoginGuard } from './guards/login/is-not-login.guard';

export const SIGNUP_FEATURE_KEY = 'signup';

export const userRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    canActivate: [isNotLoginGuard],
    component: SignupLayoutComponent,
    canDeactivate: [signupDirtyGuard],
  },
  {
    path: 'login',
    canActivate: [isNotLoginGuard],
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    canActivate: [isNotLoginGuard],
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    canActivate: [isNotLoginGuard],
    component: ResetPasswordComponent,
  },
  {
    path: 'categories',
    canActivate: [isLoginGuard], // sample -remove it
    component: CategoriesComponent,
  },
];
