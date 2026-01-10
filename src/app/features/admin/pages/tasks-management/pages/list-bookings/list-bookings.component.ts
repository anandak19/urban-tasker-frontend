import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { BookingManagementService } from '@features/admin/services/booking-management/booking-management.service';
import { IListBookingQuery } from '@features/user/models/tasker-bookings/api-requests.model';
import { IBookingDetails } from '@features/user/models/tasker-bookings/tasker-bookings.model';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-list-bookings',
  imports: [
    AdminPageTitleComponent,
    TableListingComponent,
    PaginationComponent,
  ],
  templateUrl: './list-bookings.component.html',
  styleUrl: './list-bookings.component.scss',
})
export class ListBookingsComponent implements OnInit {
  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 0,
  });

  filter = signal<IListBookingQuery>({
    page: 1,
    limit: 2,
  });

  bookings!: IBookingDetails[];

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _bookingManagement = inject(BookingManagementService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  bookingsColumns: IMatColumns[] = [
    { label: 'Category Name', key: 'categoryName' },
    { label: 'City', key: 'city' },
    { label: 'Task Size', key: 'taskSize' },
    { label: 'Tasker Name', key: 'taskerName' },
    { label: 'User Name', key: 'userName' },
    { label: 'Date', key: 'date' },
    { label: 'Time', key: 'time' },
    { label: 'Task Status', key: 'taskStatus' },
    { label: 'Is Accepted', key: 'isAccepted' },
  ] as const;

  getBookings() {
    this._bookingManagement
      .getAllBookings(this.filter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);

          this.bookings = res.data.documents;
          this.pagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onViewClicked(id: string) {
    this._router.navigate([`${id}`], { relativeTo: this._route });
  }

  onPageChange(page: number) {
    this.filter.update((val) => ({
      ...val,
      page,
    }));
    this.getBookings();
  }

  ngOnInit(): void {
    this.getBookings();
  }
}
