import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { CategoryService } from '@core/services/category/category.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { ICategoryCard } from '@shared/models/categories/categories.model';
import { MatDialog } from '@angular/material/dialog';
import { SubCategoryListModalComponent } from './component/sub-category-list-modal/sub-category-list-modal.component';
import { IOptionData } from '@shared/models/form-inputs.model';
import { Router } from '@angular/router';
import { BookingStateService } from '@features/user/services/book-tasker/book-tasker/booking-state.service';
import { ServiceCategoryCardComponent } from './component/service-category-card/service-category-card.component';

@Component({
  selector: 'app-categories',
  imports: [PageTitleComponent, ServiceCategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private _categoryService = inject(CategoryService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _dialog = inject(MatDialog);
  private _router = inject(Router);
  private _bookingStateService = inject(BookingStateService);

  categories = signal<ICategoryCard[]>([]);

  getActiveCategories() {
    this._categoryService
      .getActiveCategories()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.categories.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onCategoryClick(parentCategory: IOptionData) {
    console.log(parentCategory);

    const res = this._dialog.open<
      SubCategoryListModalComponent,
      IOptionData,
      IOptionData
    >(SubCategoryListModalComponent, { data: parentCategory });
    /**
     * if this modal return the subcateogy data
     * save the both the category and subcategory data to booking state service and
     * navigate to booking page
     */
    res.afterClosed().subscribe((subcategory: IOptionData | undefined) => {
      if (subcategory && parentCategory) {
        this._bookingStateService.setCategory(parentCategory);
        this._bookingStateService.setSubCategory(subcategory);
        this._router.navigate(['/book-tasker']);
      }
    });
  }

  ngOnInit(): void {
    this.getActiveCategories();
  }
}
