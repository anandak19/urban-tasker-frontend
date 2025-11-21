import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ICategoryData } from '@features/admin/models/category.interface';
import { SubcategoryManagementService } from '@features/admin/services/category-management/subcategory-management.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { CategoryDetailsCardComponent } from '../../components/category-details-card/category-details-card.component';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-sub-category',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    CategoryDetailsCardComponent,
  ],
  templateUrl: './view-sub-category.component.html',
  styleUrl: './view-sub-category.component.scss',
})
export class ViewSubCategoryComponent implements OnInit {
  // Cateogory in id
  @Input() categoryId!: string;
  // Sub-cateogory in id
  @Input() subcategoryId!: string; // later add a guard to check if the selected id in params is a valid id of subcategory
  subcategoryDetails = signal<ICategoryData>({} as ICategoryData);

  private _subcategoryService = inject(SubcategoryManagementService);
  private _snackbar = inject(SnackbarService);
  private _confirmDialog = inject(ConfirmDialogService);
  private _router = inject(Router);

  // Get Sub-category details
  getSubCategoryDetails() {
    this._subcategoryService
      .getOneSubcategoryDetails(this.categoryId, this.subcategoryId)
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.subcategoryDetails.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.error(err);
          this._snackbar.error(err.message);
        },
      });
  }

  // Change Sub-category status
  async onChangeActiveStatus(isActive: boolean) {
    const yes = await this._confirmDialog.ask(
      `Do you want to change status to ${isActive ? 'Active' : 'Inactive'}`,
    );

    if (yes) {
      this._subcategoryService
        .changeSubcategoryIsActiveStatus(
          this.categoryId,
          this.subcategoryId,
          isActive,
        )
        .subscribe({
          next: (res) => {
            this.subcategoryDetails.set(res.data);
            this._snackbar.success(res.message);
          },
          error: (err: IApiResponseError) => {
            this._snackbar.error(err.message);
          },
        });
    }
  }

  // Delete sub-category
  async onDeleteClick() {
    const yes = await this._confirmDialog.ask(
      'Are you sure, you want to delete this',
    );

    if (yes) {
      this._subcategoryService
        .deleteOneSubcategory(this.categoryId, this.subcategoryId)
        .subscribe({
          next: (res) => {
            this._router.navigate([
              `admin/category-management/${this.categoryId}`,
            ]);
            this._snackbar.success(res.message);
          },
          error: (err: IApiResponseError) => {
            this._snackbar.error(err.message);
          },
        });
    }
  }

  ngOnInit(): void {
    this.getSubCategoryDetails();
  }
}
