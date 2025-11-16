import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ICategoryData } from '@features/admin/models/category.interface';
import { CategoryManagementService } from '@features/admin/services/category-management/category-management.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { CategoryDetailsCardComponent } from '../../components/category-details-card/category-details-card.component';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';

@Component({
  selector: 'app-view-category',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    CategoryDetailsCardComponent,
  ],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss',
})
export class ViewCategoryComponent implements OnInit {
  @Input() categoryName = 'Sample Category';
  @Input() categoryId!: string;

  categoryData = signal<ICategoryData>({} as ICategoryData);

  // Dummy data
  categoryDataSample: ICategoryData = {
    id: '691647459fb6be9543dd91f8',
    image:
      'https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg',
    isActive: true,
    name: 'Gardening',
    slug: 'gardening',
  };

  private _categoryManagementService = inject(CategoryManagementService);
  private _snackbar = inject(SnackbarService);
  private _confirmDialog = inject(ConfirmDialogService);
  /**
   * TODOS
   * If inavalid id throw error
   */

  async changeCategoryStatus(status: boolean) {
    const yes = await this._confirmDialog.ask(
      `Change category status to ${status ? 'Active' : 'Inactive'}`,
    );

    if (yes) {
      this._categoryManagementService
        .changeCategoryActiveState(this.categoryId, status)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.categoryData.set(res.data);
          },
          error: (err: IApiResponseError) => {
            console.error(err);
            this._snackbar.error(err.message);
          },
        });
    }
  }

  async onDeleteClick() {
    const yes = await this._confirmDialog.ask(
      'Are you sure you want to delete this?',
    );
    if (yes) {
      alert(`Delete method not implemented`);
      // TODO: Call delete method here and redirect to view all categories
    }
  }

  getCategoryDetails() {
    this._categoryManagementService
      .getCategoryDataById(this.categoryId)
      .subscribe({
        next: (res) => {
          this.categoryData.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    console.log(this.categoryId);
    this.getCategoryDetails();
    // this.categoryData.set(this.categoryDataSample);
  }
}
