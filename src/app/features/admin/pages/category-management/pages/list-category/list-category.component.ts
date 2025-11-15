import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { AdminTableFiltersComponent } from '@features/admin/components/admin-table-filters/admin-table-filters.component';
import { CategoryManagementService } from '@features/admin/services/category-management/category-management.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { ICategoryData } from '@features/admin/models/category.interface';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IPaginationMeta } from '@features/admin/models/common.interface';

@Component({
  selector: 'app-list-category',
  imports: [
    AdminPageTitleComponent,
    ButtonComponent,
    AdminTableFiltersComponent,
    TableListingComponent,
    PaginationComponent,
  ],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss',
})
export class ListCategoryComponent implements OnInit {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _categoryManagementService = inject(CategoryManagementService);
  private _snackbar = inject(SnackbarService);

  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 0,
  });

  // dummy
  // categories: ICategoryData[] = [
  //   {
  //     id: '691647459fb6be9543dd91f8',
  //     image:
  //       'https://cdn.pixabay.com/photo/2019/07/30/18/26/surface-4373559_1280.jpg',
  //     isActive: true,
  //     name: 'Gardening',
  //     slug: 'gardening',
  //   },
  // ];

  categories: ICategoryData[] = [];

  // cols
  categoryColumns: IMatColumns[] = [
    { label: 'Category Name', key: 'name' },
    { label: 'Is Active', key: 'isActive' },
    { label: 'Image', key: 'image' },
  ] as const;

  // --- Navigations
  addCategoryClicked() {
    this._router.navigate(['add'], { relativeTo: this._route });
  }
  viewCategoryClicked(id: string) {
    this._router.navigate([this._router.url, id]);
  }
  editCategoryClicked(id: string) {
    this._router.navigate([id], { relativeTo: this._route });
  }

  searchCategory(search: string) {
    console.log(search);
  }

  getCategories() {
    this._categoryManagementService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data.documents;
        this.pagination.set(res.data.meta);
      },
      error: (err: IApiResponseError) => {
        this._snackbar.error(err.message);
      },
    });
  }

  onPageChange(page: number) {
    console.log(page);
  }

  ngOnInit(): void {
    this.getCategories();
    console.warn('Get category is turned off');
  }
}
