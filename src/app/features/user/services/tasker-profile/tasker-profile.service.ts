import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IOptionData } from '@shared/models/form-inputs.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import {
  IFindAllPortfolioImages,
  ITaskerAbout,
  ITaskerCardData,
} from '@shared/models/tasker-data.model';

@Injectable({
  providedIn: 'root',
})
export class TaskerProfileService {
  private readonly API_ENDPOINT = 'tasker';
  private _http = inject(HttpClient);

  getTaskerWorkCategories(taskerId: string) {
    return this._http.get<IApiResponseSuccess<IOptionData[]>>(
      `${this.API_ENDPOINT}/${taskerId}/work-categories`,
    );
  }

  getTaskerCardData(taskerId: string) {
    return this._http.get<IApiResponseSuccess<ITaskerCardData>>(
      `${this.API_ENDPOINT}/${taskerId}/card`,
    );
  }

  getTaskerAbout(taskerId: string) {
    return this._http.get<IApiResponseSuccess<ITaskerAbout>>(
      `${this.API_ENDPOINT}/${taskerId}/about`,
    );
  }

  getTaskerPortfolio(taskerId: string, filter: IBaseFilters) {
    const params = new HttpParams({ fromObject: { ...filter } });
    return this._http.get<IFindAllPortfolioImages>(
      `${this.API_ENDPOINT}/${taskerId}/portfolio`,
      {
        params,
      },
    );
  }
}
