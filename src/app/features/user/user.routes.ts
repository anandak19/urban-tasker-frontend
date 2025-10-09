import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { signupRoutes } from './components/signup/signup.routes';

export const userRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'signup',
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
