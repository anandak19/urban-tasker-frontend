import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import {
  ITaskerAbout,
  ITaskerCardData,
} from '@shared/models/tasker-data.model';

@Injectable({
  providedIn: 'root',
})
export class TaskerProfileService {
  private API_ENDPOINT = 'tasker/account';
  private _http = inject(HttpClient);

  getTaskerCardData() {
    return this._http.get<IApiResponseSuccess<ITaskerCardData>>(
      `${this.API_ENDPOINT}/card`,
    );
  }

  getTaskerAbout() {
    return this._http.get<IApiResponseSuccess<ITaskerAbout>>(
      `${this.API_ENDPOINT}/about`,
    );
  }
}
