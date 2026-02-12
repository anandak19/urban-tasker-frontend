import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IListCategoryCard } from '@features/user/models/home/home.model';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // mocke api url
  private _apiUrl = 'auth/protected';
  private BOOKINGS_API_ENDPOINT = 'bookings';

  private _http = inject(HttpClient);

  // mocke method
  getProtectedData() {
    return this._http.get(this._apiUrl);
  }

  getPopularCategories() {
    return this._http.get<IApiResponseSuccess<IListCategoryCard[]>>(
      `${this.BOOKINGS_API_ENDPOINT}/analytics/popular-categories`,
    );
  }
}
