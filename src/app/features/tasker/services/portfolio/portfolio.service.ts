import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBaseApiResponse } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private API_ENDPOINT = 'tasker/account/portfolio';
  private _http = inject(HttpClient);

  // not tested
  addPortfolioImage(payload: FormData) {
    return this._http.post<IBaseApiResponse>(`${this.API_ENDPOINT}`, payload);
  }

  // not implemented
  removePortfolioImage(imageId: string) {
    return this._http.delete<IBaseApiResponse>(
      `${this.API_ENDPOINT}/${imageId}`,
    );
  }
}
