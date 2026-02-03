import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import { IFindAllReviewResponse } from '@shared/models/reviews/api-response.interface';
import { IAverageRating } from '@shared/models/reviews/reviews.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskerReviewsService {
  private API_ENDPOINT = 'tasker/reviews';
  private _http = inject(HttpClient);

  getMyReviews(filter: IBaseFilters) {
    const params = new HttpParams({ fromObject: { ...filter } });
    console.log('called get my revies');

    return this._http.get<IFindAllReviewResponse>(`${this.API_ENDPOINT}/me`, {
      params,
    });
  }

  getMyAvarageRating() {
    return this._http.get<IApiResponseSuccess<IAverageRating>>(
      `${this.API_ENDPOINT}/average`,
    );
  }
}
