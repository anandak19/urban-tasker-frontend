import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITaskerTasksResponse } from '@features/tasker/modals/api-response.modal';
import { ITaskFilter } from '@shared/models/request-data.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private API_ENDPOINT = 'tasker/bookings';
  private _http = inject(HttpClient);

  getAllTasks(filter: ITaskFilter) {
    return this._http.get<ITaskerTasksResponse>(`${this.API_ENDPOINT}`, {
      params: this.getTasksFilterParam(filter),
    });
  }

  private getTasksFilterParam(filter: ITaskFilter) {
    console.log(filter);

    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }
}
