import { Component } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';

@Component({
  selector: 'app-edit-category',
  imports: [
    AdminPageTitleComponent,
    CategoryFormComponent,
    BackButtonComponent,
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent {}
