import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ViewTaskerProfileComponent } from '@shared/components/feature/view-tasker-profile/view-tasker-profile.component';
import { TaskerProfileService } from '@features/tasker/services/tasker-profile/tasker-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import {
  IPortfolioImage,
  ITaskerAbout,
  ITaskerCardData,
} from '@shared/models/tasker-data.model';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IOptionData } from '@shared/models/form-inputs.model';
import { MatDialog } from '@angular/material/dialog';
import { AddPortfolioModalComponent } from './components/add-portfolio-modal/add-portfolio-modal.component';
import { TaskerReviewsService } from '@features/tasker/services/reviews/tasker-reviews.service';
import { IBaseFilters } from '@shared/models/request-data.model';
import {
  IAverageRating,
  IReviews,
} from '@shared/models/reviews/reviews.interface';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { PortfolioService } from '@features/tasker/services/portfolio/portfolio.service';
import { IDeletePortfolioData } from '@shared/models/tasker-profile/tasker-profile.model';

@Component({
  selector: 'app-tasker-profile',
  imports: [PageTitleComponent, ViewTaskerProfileComponent],
  templateUrl: './tasker-profile.component.html',
  styleUrl: './tasker-profile.component.scss',
})
export class TaskerProfileComponent implements OnInit {
  private _taskerService = inject(TaskerProfileService);
  private _destroyRef = inject(DestroyRef);
  private _snackbarService = inject(SnackbarService);
  private _matDialog = inject(MatDialog);
  private _taskerReviewService = inject(TaskerReviewsService);
  private _portfolioService = inject(PortfolioService);

  taskerCardData = signal<ITaskerCardData | null>(null);
  taskerAbout = signal<ITaskerAbout | null>(null);
  taskerWorkCategories = signal<IOptionData[]>([]);

  allReviews = signal<IReviews[]>([]);
  avarageRating = signal<IAverageRating>({} as IAverageRating);
  reviewsPagination = signal<IPaginationMeta>({} as IPaginationMeta);

  allPortfolioImages = signal<IPortfolioImage[]>([]);
  portfolioPagination = signal<IPaginationMeta>({} as IPaginationMeta);

  /**
   * TODOS
   * 1. create method to all portfolio images (paginated)
   * 2. pass the returned data to show dynamically
   * 3. Add method to delete one image
   */

  getCardData() {
    this._taskerService
      .getTaskerCardData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskerCardData.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  getAllPortfolioImages(filter: IBaseFilters = {}) {
    console.log('called get portfolio');

    this._portfolioService
      .getAllTaskerPortfolioImages(filter)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.allPortfolioImages.set(res.data.documents);
          this.portfolioPagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  getAllReviews(filter: IBaseFilters = {}) {
    this._taskerReviewService.getMyReviews(filter).subscribe({
      next: (res) => {
        this.allReviews.set(res.data.documents);
        this.reviewsPagination.set(res.data.meta);
      },
      error: (err: IApiResponseError) => {
        this._snackbarService.error(err.message);
      },
    });
  }

  deletePortfolioItem(data: IDeletePortfolioData) {
    this._portfolioService
      .removePortfolioImage(data.portfolioId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this._snackbarService.success(res.message);
          this.getAllPortfolioImages(data.filter);
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  getAvarageRating() {
    this._taskerReviewService
      .getMyAvarageRating()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.avarageRating.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  getAboutData() {
    this.getAbout();
    this.getTaskerWorkCategories();
  }

  onAddPortfolio() {
    const dialogRef = this._matDialog.open<
      AddPortfolioModalComponent,
      void,
      { isRefresh: boolean }
    >(AddPortfolioModalComponent, {
      width: '350px',
      enterAnimationDuration: 300,
      panelClass: 'modal-dialog',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          if (res?.isRefresh) {
            this.getAllPortfolioImages();
          }
        },
      });
  }

  getAbout() {
    this._taskerService
      .getTaskerAbout()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.taskerAbout.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  //
  getTaskerWorkCategories() {
    this._taskerService
      .getTaskerWorkCategories()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.taskerWorkCategories.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getCardData();
  }
}
