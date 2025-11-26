import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TTaskerApplicationResponse } from '@features/user/models/tasker-applications/api-responses.model';
import { IBaseApiResponse } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class TaskerApplicationsService {
  private readonly API_ENDPOINT = 'tasker-applications';

  private _http = inject(HttpClient);

  createTaskerApplication(applicationData: FormData) {
    return this._http.post<IBaseApiResponse>(
      `${this.API_ENDPOINT}`,
      applicationData,
    );
  }

  findLoggedInUsersApplication() {
    return this._http.get<TTaskerApplicationResponse>(this.API_ENDPOINT);
  }
}
