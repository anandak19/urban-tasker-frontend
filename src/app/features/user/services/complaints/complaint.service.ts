import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IApiResponseSuccess,
  IBaseApiResponse,
} from '@shared/models/api-response.model';
import { IComplaintDetails } from '@shared/models/complaint/complaint.model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private readonly BASE_ENDPOINT = 'bookings';
  private _http = inject(HttpClient);

  createComplaint(taskId: string, formData: FormData) {
    return this._http.post<IBaseApiResponse>(
      this.createEndpoint(taskId),
      formData,
    );
  }

  findComplaintByTaskId(taskId: string) {
    return this._http.get<IApiResponseSuccess<IComplaintDetails>>(
      this.createEndpoint(taskId),
    );
  }

  // private method
  private createEndpoint(taskId: string) {
    return `${this.BASE_ENDPOINT}/${taskId}/complaints`;
  }
}
