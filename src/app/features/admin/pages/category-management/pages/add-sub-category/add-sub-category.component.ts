import { Component, inject, Input, signal, ViewChild } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { SubcategoryFormComponent } from '../../components/subcategory-form/subcategory-form.component';
import { SubcategoryManagementService } from '@features/admin/services/category-management/subcategory-management.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-add-sub-category',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    SubcategoryFormComponent,
  ],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.scss',
})
export class AddSubCategoryComponent {
  @Input() categoryId!: string;

  isCreating = signal<boolean>(false);

  @ViewChild('subcategoryForm') subcategoryForm!: SubcategoryFormComponent;

  private _subCategoryservice = inject(SubcategoryManagementService);
  private _snackbar = inject(SnackbarService);

  onFormSubmit(subcategoryData: FormData) {
    this.isCreating.set(true);

    this._subCategoryservice
      .addSubcategory(this.categoryId, subcategoryData)
      .pipe(finalize(() => this.isCreating.set(false)))
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this.subcategoryForm.resetForm();
        },
        error: (err: IApiResponseError) => {
          console.log(`Error`, err);
          this._snackbar.error(err.message);
        },
      });
  }
}
