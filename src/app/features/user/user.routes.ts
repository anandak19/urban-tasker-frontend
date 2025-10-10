import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { signupRoutes } from './components/signup/signup.routes';
import { SignupLayoutComponent } from './components/signup/signup-layout/signup-layout.component';

export const userRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'signup',
        component: SignupLayoutComponent,
        children: signupRoutes
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'categories',
        component: CategoriesComponent
    }
];
