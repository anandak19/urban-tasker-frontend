import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { SubcategoryFormComponent } from '../../components/subcategory-form/subcategory-form.component';
import { SubcategoryManagementService } from '@features/admin/services/category-management/subcategory-management.service';
import { ICategoryData } from '@features/admin/models/category.interface';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { finalize } from 'rxjs';

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
export class EditSubCategoryComponent implements OnInit {
  @Input() categoryId!: string;
  @Input() subcategoryId!: string;

  subcategoryData = signal<ICategoryData | null>(null);
  isLoading = signal<boolean>(false);

  private _subcategoryManagementService = inject(SubcategoryManagementService);
  private _snackbar = inject(SnackbarService);

  updateSubCategory(categoryData: FormData) {
    this.isLoading.set(true);

    this._subcategoryManagementService
      .updateSubcategory(this.categoryId, this.subcategoryId, categoryData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  getSubCategoryData() {
    this._subcategoryManagementService
      .getOneSubcategoryDetails(this.categoryId, this.subcategoryId)
      .subscribe({
        next: (res) => {
          this.subcategoryData.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.getSubCategoryData();
  }
}
