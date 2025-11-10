import { Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { ViewCategoryComponent } from './pages/view-category/view-category.component';

export const categoryManagementRoutes: Routes = [
  {
    path: '',
    component: ListCategoryComponent,
  },
  {
    path: 'add',
    component: AddCategoryComponent,
  },
  {
    path: 'edit/:slug',
    component: EditCategoryComponent,
  },
  {
    path: ':slug',
    component: ViewCategoryComponent,
  },
];
