import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BookingManagementService } from '@features/admin/services/booking-management/booking-management.service';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { IBookingDetails } from '@shared/models/booking.model';
import { TaskStatusBoxComponent } from '@shared/components/feature/booking-details/task-status-box/task-status-box.component';
import { TaskInfoBoxComponent } from '@shared/components/feature/booking-details/task-info-box/task-info-box.component';
import { RelatedUserBoxComponent } from '@shared/components/feature/booking-details/related-user-box/related-user-box.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { TaskTimingsBoxComponent } from '@shared/components/feature/booking-details/task-timings-box/task-timings-box.component';
import { PaymentDetailsBoxComponent } from '@shared/components/feature/booking-details/payment-details-box/payment-details-box.component';

@Component({
  selector: 'app-booking-details',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    TaskStatusBoxComponent,
    TaskInfoBoxComponent,
    RelatedUserBoxComponent,
    ButtonLoadingComponent,
    TaskTimingsBoxComponent,
    PaymentDetailsBoxComponent,
  ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss',
})
export class BookingDetailsComponent implements OnInit {
  @Input() bookingId!: string;
  bookingDetails = signal<IBookingDetails | null>(null);

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _bookingManagement = inject(BookingManagementService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  isTaskerChatLoading = signal<boolean>(false);
  isUserChatLoading = signal<boolean>(false);

  getBookingDetails() {
    if (!this.bookingId) return;
    this._bookingManagement
      .getBookingDetails(this.bookingId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.bookingDetails.set(res.data);
          console.log(res.data.categoryName);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onChatWithTaskerClick() {
    //logic
  }

  onChatWithUserClick() {
    //logic
  }

  ngOnInit(): void {
    this.getBookingDetails();
  }
}
