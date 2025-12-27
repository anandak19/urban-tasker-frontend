import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAvailabilitiesResponse } from '@features/tasker/modals/api-response.modal';
import { ISlot } from '@features/tasker/modals/availability.modal';
import { IBaseApiResponse } from '@shared/models/api-response.model';

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

  deleteSlot(slotId: string) {
    return this._http.delete(`${this.API_ENDPOINT}/${slotId}`);
  }

  deleteAllSlots() {
    return this._http.delete<IBaseApiResponse>(`${this.API_ENDPOINT}/default`);
  }

  createSlot(slot: ISlot) {
    return this._http.post(`${this.API_ENDPOINT}`, slot);
  }

  changeStatus(slotId: string, isActive: boolean) {
    return this._http.patch(`${this.API_ENDPOINT}/${slotId}/status`, {
      isActive,
    });
  }

  updateSlot(slotId: string, slot: ISlot) {
    return this._http.patch(`${this.API_ENDPOINT}/${slotId}`, slot);
  }
}
