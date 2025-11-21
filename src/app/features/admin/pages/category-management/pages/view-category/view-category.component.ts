import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ICategoryData } from '@features/admin/models/category.interface';
import { CategoryManagementService } from '@features/admin/services/category-management/category-management.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { CategoryDetailsCardComponent } from '../../components/category-details-card/category-details-card.component';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SubcategoryManagementService } from '@features/admin/services/category-management/subcategory-management.service';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IBaseFilters } from '@shared/models/request-data.model';

@Component({
  selector: 'app-view-category',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    CategoryDetailsCardComponent,
    ButtonComponent,
    TableListingComponent,
    PaginationComponent,
  ],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss',
})
export class ViewCategoryComponent implements OnInit {
  // id in params
  @Input() categoryId!: string;

  categoryData = signal<ICategoryData>({} as ICategoryData);
  // SubCategories Table Data
  subcategories: ICategoryData[] = [];
  pagination = signal<IPaginationMeta>({
    total: 0,
    limit: 5,
    page: 1,
    pages: 0,
  });
  filter = signal<IBaseFilters>({
    page: 1,
  });

  subcategoryColumns: IMatColumns[] = [
    {
      key: 'name',
      label: 'Sub Category Name',
    },
    {
      key: 'isActive',
      label: 'Is Active',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'image',
      label: 'Image',
    },
  ];

  private _categoryManagementService = inject(CategoryManagementService);
  private _subcategoryService = inject(SubcategoryManagementService);
  private _snackbar = inject(SnackbarService);
  private _confirmDialog = inject(ConfirmDialogService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  /**
   * TODOS
   * If inavalid id throw error
   * create a guard for that and use in route file
   */

  // Navigat to add sub category
  onAddSubCategory() {
    this._router.navigate([`add-subcategory`], {
      relativeTo: this._route,
    });
  }
  // Navigate to view the details page of selected sub category
  onViewOneSubCategory(id: string) {
    this._router.navigate([`subcategory/${id}`], { relativeTo: this._route });
  }
  // Navigate to Edit page of selected sub category
  onEditOneSubCategory(id: string) {
    this._router.navigate([`subcategory/${id}/edit`], {
      relativeTo: this._route,
    });
  }

  // Change Category Status (Active/Inactive)
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

  // Delete a category
  async onDeleteClick() {
    const yes = await this._confirmDialog.ask(
      'Are you sure you want to delete this?',
    );
    if (yes) {
      this._categoryManagementService
        .deleteCategoryById(this.categoryId)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._snackbar.success(res.message);
            this._router.navigate(['/admin/category-management']);
          },
          error: (err: IApiResponseError) => {
            this._snackbar.error(err.message);
          },
        });
    }
  }

  onPagechange(page: number) {
    this.filter.update((val) => ({
      ...val,
      page,
    }));
    this.getSubcategories();
  }

  // Get Sub-categories of the current category
  getSubcategories() {
    this._subcategoryService
      .getSubcategories(this.categoryId, this.filter())
      .subscribe({
        next: (res) => {
          console.log('Success', res);
          this.subcategories = res.data.documents;
          this.pagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          console.log('Error in adding sub cat', err);
          this._snackbar.error(err.message);
        },
      });
  }

  // Get all details of current category
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
    this.getSubcategories();
  }
}
