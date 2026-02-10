import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGetAvailTaskers } from '@features/user/models/book-tasker/book-tasker.model';
import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { buildQuery } from '@shared/helpers/query-builder';
import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '@shared/models/api-response.model';
import { IBaseFilters } from '@shared/models/request-data.model';

@Injectable({
  providedIn: 'root',
})
export class TaskerService {
  private taskerEndPoint = 'tasker';
  private _http = inject(HttpClient);

  getAvailableTaskers(
    payload: IGetAvailTaskers,
    paginationQuery?: IBaseFilters,
  ) {
    let params = new HttpParams()
      .set('city', payload.city)
      .set('date', payload.date)
      .set('time', payload.time)
      .set('subcategoryId', payload.subcategoryId)
      .set('latitude', payload.latitude.toString())
      .set('longitude', payload.longitude.toString());

    if (paginationQuery) {
      const filterParams = buildQuery(paginationQuery);

      filterParams.keys().forEach((key) => {
        const value = filterParams.get(key);
        if (value !== null) {
          params = params.set(key, value);
        }
      });
    }

    return this._http.get<IListAvailTaskersResponse>(
      `${this.taskerEndPoint}/booking/available`,
      {
        params,
      },
    );
  }
}

export type IListAvailTaskersResponse = IApiResponseSuccess<
  IFindAllResponseData<IListTasker>
>;
