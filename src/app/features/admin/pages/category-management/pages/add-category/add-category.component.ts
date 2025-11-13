import { Component, inject, OnInit } from '@angular/core';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { CategoryManagementService } from '@features/admin/services/category-management/category-management.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  private _categoryService = inject(CategoryManagementService);

  ngOnInit(): void {
    console.log('Init add Category');
  }

  // --- call api method to add category here
  handleFormData(categoryFormData: FormData) {
    this._categoryService.addCategory(categoryFormData).subscribe({
      next: (res) => {
        console.log('Response', res);
      },
      error: (error: HttpErrorResponse) => {
        console.log('err', error);
      },
    });
  }
}
