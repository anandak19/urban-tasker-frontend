import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFindAllBookingsResponse } from '@features/user/models/tasker-bookings/api-responses.model';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IBookingDetails } from '@shared/models/booking.model';
import { ITaskFilter } from '@shared/models/request-data.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private API_ENDPOINT = 'bookings';

  private _http = inject(HttpClient);

  getAllBookings(filter: ITaskFilter = { page: 1 }) {
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

  getStartCode(bookingId: string) {
    return this._http.get<IApiResponseSuccess<{ code: string }>>(
      `${this.API_ENDPOINT}/${bookingId}/start-code`,
    );
  }
}
