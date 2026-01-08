import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFindAllBookingsResponse } from '@features/admin/models/api-response.model';
import { IListBookingQuery } from '@features/user/models/tasker-bookings/api-requests.model';
import { IBookingDetails } from '@features/user/models/tasker-bookings/tasker-bookings.model';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookingManagementService {
  private API_ENDPOINT = 'admin/bookings';

  private _http = inject(HttpClient);

  getAllBookings(filter?: IListBookingQuery) {
    let params = new HttpParams();

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value);
        }
      });
    }

    return this._http.get<IFindAllBookingsResponse>(this.API_ENDPOINT, {
      params,
    });
  }

  getBookingDetails(bookingId: string) {
    return this._http.get<IApiResponseSuccess<IBookingDetails>>(
      `${this.API_ENDPOINT}/${bookingId}`,
    );
  }
}
