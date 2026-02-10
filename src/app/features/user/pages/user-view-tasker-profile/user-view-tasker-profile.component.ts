import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { ReviewService } from '@features/user/services/reviews/review.service';
import { TaskerProfileService } from '@features/user/services/tasker-profile/tasker-profile.service';
import { ViewTaskerProfileComponent } from '@shared/components/feature/view-tasker-profile/view-tasker-profile.component';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IOptionData } from '@shared/models/form-inputs.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import {
  IAverageRating,
  IReviews,
} from '@shared/models/reviews/reviews.interface';
import {
  IPortfolioImage,
  ITaskerAbout,
  ITaskerCardData,
} from '@shared/models/tasker-data.model';

@Component({
  selector: 'app-user-view-tasker-profile',
  imports: [PageTitleComponent, ViewTaskerProfileComponent],
  templateUrl: './user-view-tasker-profile.component.html',
  styleUrl: './user-view-tasker-profile.component.scss',
})
export class UserViewTaskerProfileComponent {
  @Input() taskerId!: string;

  taskerCardData = signal<ITaskerCardData | null>(null);
  taskerAbout = signal<ITaskerAbout | null>(null);
  taskerWorkCategories = signal<IOptionData[]>([]);
  avarageRating = signal<IAverageRating>({} as IAverageRating);

  allReviews = signal<IReviews[]>([]);
  reviewsPagination = signal<IPaginationMeta>({} as IPaginationMeta);

  allPortfolioImages = signal<IPortfolioImage[]>([]);
  portfolioPagination = signal<IPaginationMeta>({} as IPaginationMeta);

  private _reviewService = inject(ReviewService);
  private _taskerProfileService = inject(TaskerProfileService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  // about data methods start
  onGetAboutData() {
    this.getAbout();
    this.getWorkCategories();
    this.getTaskerCardData();
  }

  getAbout() {
    this._taskerProfileService
      .getTaskerAbout(this.taskerId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.taskerAbout.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }
  getWorkCategories() {
    this._taskerProfileService
      .getTaskerWorkCategories(this.taskerId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskerWorkCategories.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }
  getTaskerCardData() {
    this._taskerProfileService.getTaskerCardData(this.taskerId).subscribe({
      next: (res) => {
        this.taskerCardData.set(res.data);
      },
      error: (err: IApiResponseError) => {
        this._snackbar.error(err.message);
      },
    });
  }
  // about data methods end

  onGetPortfolio(filter: IBaseFilters) {
    this._taskerProfileService
      .getTaskerPortfolio(this.taskerId, filter)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.allPortfolioImages.set(res.data.documents);
          this.portfolioPagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onGetReviews(filter: IBaseFilters) {
    this._reviewService
      .findTaskerReviews(this.taskerId, filter)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.allReviews.set(res.data.documents);
          this.reviewsPagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onGetAverageRating() {
    this._reviewService.findTaskerAverageRating(this.taskerId).subscribe({
      next: (res) => {
        console.log(res);

        this.avarageRating.set(res.data);
      },
      error: (err: IApiResponseError) => {
        this._snackbar.error(err.message);
      },
    });
  }
}
