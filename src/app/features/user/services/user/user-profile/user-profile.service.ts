import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import {
  IChangePassoword,
  IHomeAddressPayload,
  IPersonalDetails,
} from '@features/user/models/profile/profile-details.model';
import { IBaseApiResponse } from '@shared/models/api-response.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  protected API_ENDPOINT = 'user/profile';

  private _http = inject(HttpClient);
  private _authGuardService = inject(AuthGuardService);

  // method to update personal data
  updatePersonalData(payload: IPersonalDetails) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/personals`,
      payload,
    );
  }

  // method to update password
  updatePassword(payload: IChangePassoword) {
    return this._http
      .patch<IBaseApiResponse>(`${this.API_ENDPOINT}/password`, payload)
      .pipe(
        tap(() => {
          this._authGuardService.clearCurrentUser();
        }),
      );
  }

  // method to update home address
  updateHomeAddress(payload: IHomeAddressPayload) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/location`,
      payload,
    );
  }

  updateProfilePicture(payload: FormData) {
    return this._http.patch<IBaseApiResponse>(
      `${this.API_ENDPOINT}/picture`,
      payload,
    );
  }
}
