import { Component, inject, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { BookingService } from '@features/user/services/bookings/booking.service';
import { IListBooking } from '@features/user/models/tasker-bookings/tasker-bookings.model';
import { DatePipe } from '@angular/common';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { IListBookingQuery } from '@features/user/models/tasker-bookings/api-requests.model';

@Component({
  selector: 'app-list-booked-tasks',
  imports: [PageTitleComponent, ButtonComponent, PaginationComponent, DatePipe],
  templateUrl: './list-booked-tasks.component.html',
  styleUrl: './list-booked-tasks.component.scss',
})
export class ListBookedTasksComponent implements OnInit {
  private _bookingService = inject(BookingService);

  bookings = signal<IListBooking[]>([]);

  paginationData = signal<IPaginationMeta>({
    total: 0,
    page: 1,
    limit: 5,
    pages: 0,
  });

  filter = signal<IListBookingQuery>({
    page: 1,
    limit: 1,
  });

  fetchAllBookings() {
    this._bookingService.getAllBookings(this.filter()).subscribe({
      next: (res) => {
        console.log(res.data.documents);
        this.bookings.set(res.data.documents);
        this.paginationData.set(res.data.meta);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onPageChange(page: number) {
    this.filter.update((curr) => ({
      ...curr,
      page,
    }));
    this.fetchAllBookings();
  }

  ngOnInit(): void {
    this.fetchAllBookings();
  }
}
