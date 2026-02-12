import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { SectionTitleComponent } from '@features/user/components/section-title/section-title.component';
import { CategoryListingComponent } from '../category-listing/category-listing.component';
import { HomeService } from '@features/user/services/home/home.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IListCategoryCard } from '@features/user/models/home/home.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-popular-categories',
  imports: [SectionTitleComponent, CategoryListingComponent],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss',
})
export class PopularCategoriesComponent implements OnInit {
  private _homeService = inject(HomeService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  categories = signal<IListCategoryCard[]>([]);

  getPopularCategories() {
    this._homeService
      .getPopularCategories()
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

  ngOnInit(): void {
    this.getPopularCategories();
  }
}
