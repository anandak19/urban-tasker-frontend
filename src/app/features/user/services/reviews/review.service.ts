import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateReview } from '@features/user/models/review/review.model';
import { IBaseApiResponse } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly API_ENDPOINT = 'reviews';
  private _http = inject(HttpClient);

  createReview(data: ICreateReview) {
    return this._http.post<IBaseApiResponse>(`${this.API_ENDPOINT}`, data);
  }
}
