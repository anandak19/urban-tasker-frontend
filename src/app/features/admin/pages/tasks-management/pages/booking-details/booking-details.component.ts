import { DatePipe, TitleCasePipe } from '@angular/common';
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

@Component({
  selector: 'app-booking-details',
  imports: [
    AdminPageTitleComponent,
    DatePipe,
    TitleCasePipe,
    BackButtonComponent,
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

  ngOnInit(): void {
    this.getBookingDetails();
  }
}
