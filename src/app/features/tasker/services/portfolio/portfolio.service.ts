import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBaseApiResponse } from '@shared/models/api-response.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import { IFindAllPortfolioImages } from '@shared/models/tasker-data.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private API_ENDPOINT = 'tasker/account/profile/portfolio';
  private _http = inject(HttpClient);

  // not tested
  addPortfolioImage(payload: FormData) {
    return this._http.post<IBaseApiResponse>(`${this.API_ENDPOINT}`, payload);
  }

  getAllTaskerPortfolioImages(filter: IBaseFilters) {
    const params = new HttpParams({
      fromObject: { ...filter },
    });

    return this._http.get<IFindAllPortfolioImages>(`${this.API_ENDPOINT}`, {
      params,
    });
  }

  // not implemented in backend
  removePortfolioImage(imageId: string) {
    return this._http.delete<IBaseApiResponse>(
      `${this.API_ENDPOINT}/${imageId}`,
    );
  }
}
