import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ICreateReview } from '@features/user/models/review/review.model';
import { ReviewService } from '@features/user/services/reviews/review.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonLoadingComponent,
    TextAreaFieldComponent,
    BackButtonComponent,
    PageTitleComponent,
  ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss',
})
export class AddReviewComponent {
  @Input() taskId!: string;

  private fb = inject(FormBuilder);
  private _reviewService = inject(ReviewService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  selectedRating = signal<number>(0);

  reviewForm = this.fb.nonNullable.group({
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: [''],
  });

  setRating(rating: number) {
    this.selectedRating.set(rating);
    this.reviewForm.controls.rating.setValue(rating);
  }

  submitReview(payload: ICreateReview) {
    this._reviewService
      .createReview(payload)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackbar.success(res.message);
          this._router.navigate([`tasks/${this.taskId}`]);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  submit() {
    if (!this.taskId) return;

    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const value = this.reviewForm.getRawValue();

    const createReview: ICreateReview = {
      taskId: this.taskId,
      rating: value.rating,
      comment: value.comment,
    };

    this.submitReview(createReview);
  }
}
