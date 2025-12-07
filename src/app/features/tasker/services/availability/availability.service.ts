import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAvailabilitiesResponse } from '@features/tasker/modals/api-response.modal';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private readonly API_ENDPOINT = 'availability';
  private _http = inject(HttpClient);

  createDefault() {
    return this._http.patch(`${this.API_ENDPOINT}/default`, {});
  }

  findTaskerAvailabilities() {
    return this._http.get<IAvailabilitiesResponse>(`${this.API_ENDPOINT}`);
  }
}
