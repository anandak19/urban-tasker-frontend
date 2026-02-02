import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateReview } from '@features/user/models/review/review.model';
import {
  IApiResponseSuccess,
  IBaseApiResponse,
} from '@shared/models/api-response.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import { IFindAllReviewResponse } from '@shared/models/reviews/api-response.interface';
import { IAverageRating } from '@shared/models/reviews/reviews.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly API_ENDPOINT = 'reviews';
  private _http = inject(HttpClient);

  createReview(data: ICreateReview) {
    return this._http.post<IBaseApiResponse>(`${this.API_ENDPOINT}`, data);
  }

  /**
   * Find all reviews of selected tasker
   * @param taskerId
   * @param {IBaseFilters} filter
   */
  findTaskerReviews(taskerId: string, filter: IBaseFilters) {
    const params = new HttpParams({ fromObject: { ...filter } });

    return this._http.get<IFindAllReviewResponse>(
      `${this.API_ENDPOINT}/tasker/${taskerId}`,
      {
        params,
      },
    );
  }

  findTaskerAverageRating(taskerId: string) {
    return this._http.get<IApiResponseSuccess<IAverageRating>>(
      `${this.API_ENDPOINT}/${taskerId}/average`,
    );
  }
}
