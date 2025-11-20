import { Component } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { SubcategoryFormComponent } from '../../components/subcategory-form/subcategory-form.component';

@Component({
  selector: 'app-edit-sub-category',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    SubcategoryFormComponent,
  ],
  templateUrl: './edit-sub-category.component.html',
  styleUrl: './edit-sub-category.component.scss',
})
export class EditSubCategoryComponent {}
