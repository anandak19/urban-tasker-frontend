import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { ICategoryData } from '@features/admin/models/category.interface';
import { CategoryManagementService } from '@features/admin/services/category-management/category-management.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { CategoryDetailsCardComponent } from '../../components/category-details-card/category-details-card.component';

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
  /**
   * TODOS
   * If inavalid id throw error
   */

  changeCategoryStatus(status: boolean) {
    alert(`Current status: ${status}`);
  }

  onDeleteClick() {
    alert(`Delete`);
  }

  getCategoryDetails(id: string) {
    this._categoryManagementService.getCategoryDataById(id).subscribe({
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
    this.getCategoryDetails(this.categoryId);
    // this.categoryData.set(this.categoryDataSample);
  }
}
