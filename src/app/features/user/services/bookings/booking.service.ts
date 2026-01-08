import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IListBookingQuery } from '@features/user/models/tasker-bookings/api-requests.model';
import { IFindAllBookingsResponse } from '@features/user/models/tasker-bookings/api-responses.model';
import { IBookingDetails } from '@features/user/models/tasker-bookings/tasker-bookings.model';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private API_ENDPOINT = 'bookings';

  private _http = inject(HttpClient);

  filter = signal<IListBookingQuery>({
    page: 1,
    limit: 10,
    taskStatus: undefined,
  });

  getAllBookings(filter: IListBookingQuery = { page: 1 }) {
    let params = new HttpParams();

    if (filter.page) {
      params = params.set('page', filter.page.toString());
    }

    if (filter.limit) {
      params = params.set('limit', filter.limit.toString());
    }

    if (filter.taskStatus) {
      params = params.set('taskStatus', filter.taskStatus);
    }

    return this._http.get<IFindAllBookingsResponse>(this.API_ENDPOINT, {
      params,
    });
  }

  getOneBooking(bookingId: string) {
    return this._http.get<IApiResponseSuccess<IBookingDetails>>(
      `${this.API_ENDPOINT}/${bookingId}`,
    );
  }
}
