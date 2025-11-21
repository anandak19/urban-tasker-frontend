import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { CategoryManagementService } from '@features/admin/services/category-management/category-management.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { ICategoryData } from '@features/admin/models/category.interface';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { finalize } from 'rxjs';

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
export class EditCategoryComponent implements OnInit {
  @Input() categoryId!: string; // later add a id & category validator guard
  categoryData = signal<ICategoryData | null>(null);
  isLoading = signal<boolean>(false);

  private _categoryManagementService = inject(CategoryManagementService);
  private _snackbar = inject(SnackbarService);

  onFormData(formData: FormData) {
    this.isLoading.set(true);

    this._categoryManagementService
      .updateCatgory(this.categoryId, formData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          console.log(res);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  getCategoryDetails() {
    this._categoryManagementService
      .getCategoryDataById(this.categoryId)
      .subscribe({
        next: (res) => {
          this.categoryData.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getCategoryDetails();
  }
}
