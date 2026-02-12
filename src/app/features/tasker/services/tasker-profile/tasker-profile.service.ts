import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IApiResponseSuccess,
  IBaseApiResponse,
} from '@shared/models/api-response.model';
import { IOptionData } from '@shared/models/form-inputs.model';
import {
  ITaskerAbout,
  ITaskerCardData,
} from '@shared/models/tasker-data.model';

@Injectable({
  providedIn: 'root',
})
export class TaskerProfileService {
  private API_ENDPOINT = 'tasker/account/profile';
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

  // to update tasker about
  updateTaskerAbout(payload: ITaskerAbout) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/about`,
      payload,
    );
  }

  getTaskerWorkCategories() {
    return this._http.get<IApiResponseSuccess<IOptionData[]>>(
      `${this.API_ENDPOINT}/work-categories`,
    );
  }

  addTaskerWorkCateories(categoryId: string) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/work-categories`,
      { categoryId },
    );
  }

  removeTaskerWorkCategory(categoryId: string) {
    return this._http.delete<IBaseApiResponse>(
      `${this.API_ENDPOINT}/work-categories/${categoryId}`,
    );
  }
}
