import { Routes } from '@angular/router';
import { signupDirtyGuard } from './guards/signup/signup-dirty.guard';
import { userAuthGuard } from './guards/auth/user-auth.guard';
import { isLoginGuard } from './guards/login/is-login.guard';
import { isNotAdminGuard } from '@core/guards/admin/is-not-admin.guard';
import { isUserGuard } from '@core/guards/user/is-user.guard';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'signup',
    canActivate: [isLoginGuard],
    canDeactivate: [signupDirtyGuard],
    loadComponent: () =>
      import('./pages/signup/signup-layout/signup-layout.component').then(
        (c) => c.SignupLayoutComponent,
      ),
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
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(
        (c) => c.ForgotPasswordComponent,
      ),
  },

  {
    path: 'reset-password',
    canActivate: [isLoginGuard],
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then(
        (c) => c.ResetPasswordComponent,
      ),
  },

  {
    path: 'categories',
    canActivate: [userAuthGuard],
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (c) => c.CategoriesComponent,
      ),
  },

  {
    path: 'profile',
    canActivate: [userAuthGuard],
    loadComponent: () =>
      import(
        './pages/user-profile/user-profile-layout/user-profile-layout.component'
      ).then((c) => c.UserProfileLayoutComponent),
    loadChildren: () =>
      import('./pages/user-profile/user-profile.routes').then(
        (r) => r.UserProfileRoutes,
      ),
  },

  // Tasker Application
  {
    path: 'tasker/application',
    canActivate: [userAuthGuard, isNotAdminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/become-tasker/view-tasker-application/view-tasker-application.component'
          ).then((c) => c.ViewTaskerApplicationComponent),
      },
      {
        path: 'apply',
        loadComponent: () =>
          import(
            './pages/become-tasker/tasker-application/tasker-application.component'
          ).then((c) => c.TaskerApplicationComponent),
      },
    ],
  },

  // Book Tasker
  {
    path: 'book-tasker',
    canActivate: [userAuthGuard, isUserGuard],
    loadComponent: () =>
      import(
        './pages/book-tasker/book-tasker-layout/book-tasker-layout.component'
      ).then((c) => c.BookTaskerLayoutComponent),
  },

  // Tasks
  {
    path: 'tasks',
    canActivate: [userAuthGuard, isUserGuard],
    loadComponent: () =>
      import(
        './pages/booked-tasks/booked-tasks-layout/booked-tasks-layout.component'
      ).then((c) => c.BookedTasksLayoutComponent),
    loadChildren: () =>
      import('./pages/booked-tasks/booked-tasks.routes').then(
        (r) => r.BookedTasksRoutes,
      ),
  },

  // Chat
  {
    path: 'chat',
    canActivate: [userAuthGuard, isNotAdminGuard],
    loadChildren: () =>
      import('./pages/chat/chat.routes').then((r) => r.ChatRoutes),
  },

  // Wallet
  {
    path: 'wallet',
    canActivate: [userAuthGuard, isUserGuard],
    loadComponent: () =>
      import('./pages/wallet/wallet/wallet.component').then(
        (c) => c.WalletComponent,
      ),
  },

  {
    path: 'tasker/:taskerId/profile',
    canActivate: [userAuthGuard],
    loadComponent: () =>
      import(
        './pages/user-view-tasker-profile/user-view-tasker-profile.component'
      ).then((c) => c.UserViewTaskerProfileComponent),
  },
];
