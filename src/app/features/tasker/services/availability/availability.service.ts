import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WeekDayKeys } from '@features/tasker/constants/week-days.constant';
import { IAvailabilitiesResponse } from '@features/tasker/modals/api-response.modal';
import { ISlot } from '@features/tasker/modals/availability.modal';

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

  deleteSlot(availabilityId: string, slotId: string) {
    return this._http.delete(
      `${this.API_ENDPOINT}/${availabilityId}/${slotId}`,
    );
  }

  createSlot(day: WeekDayKeys, slot: ISlot) {
    return this._http.post(`${this.API_ENDPOINT}/day/${day}`, slot);
  }

  changeStatus(availabilityId: string, slotId: string, isDisabled: boolean) {
    return this._http.patch(
      `${this.API_ENDPOINT}/${availabilityId}/${slotId}/status`,
      {
        isDisabled,
      },
    );
  }
}
