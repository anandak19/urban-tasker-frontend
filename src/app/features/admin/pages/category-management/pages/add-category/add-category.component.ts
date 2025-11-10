import { Component, OnInit } from '@angular/core';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ICreateCategory } from '@features/admin/models/category.interface';
// import { ICreateCategory } from '@features/admin/models/category.interface';

@Component({
  selector: 'app-add-category',
  imports: [
    CategoryFormComponent,
    AdminPageTitleComponent,
    BackButtonComponent,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  ngOnInit(): void {
    console.log('Init add Category');
  }

  // --- call api method to add category here
  handleFormData(categoryData: ICreateCategory) {
    console.log('Form Data In Add Category:', categoryData);
  }
}
