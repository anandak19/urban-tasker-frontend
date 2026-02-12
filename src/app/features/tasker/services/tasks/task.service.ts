import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITaskerTasksResponse } from '@features/tasker/modals/api-response.modal';
import { IBaseApiResponse } from '@shared/models/api-response.model';
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

  acceptTask(taskId: string) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/${taskId}/accept`,
      {},
    );
  }

  rejectTask(taskId: string) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/${taskId}/reject`,
      {},
    );
  }

  startTask(taskId: string, startCode: string) {
    return this._http.post<IBaseApiResponse>(
      `${this.API_ENDPOINT}/${taskId}/start`,
      {
        code: startCode,
      },
    );
  }

  takeBreak(taskId: string) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/${taskId}/break`,
      {},
    );
  }

  resumeTask(taskId: string) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/${taskId}/resume`,
      {},
    );
  }

  finishTask(taskId: string) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/${taskId}/finish`,
      {},
    );
  }

  private getTasksFilterParam(filter: ITaskFilter) {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }
}
