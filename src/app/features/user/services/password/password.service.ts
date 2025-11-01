import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IForgotPassword,
  IResetPassword,
} from '@features/user/models/password/password.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private readonly _apiEndpoint = 'password';

  private _http = inject(HttpClient);

  forgotPassword(forgotPasswordData: IForgotPassword) {
    return this._http.post(`${this._apiEndpoint}/forgot`, forgotPasswordData);
  }

  resetPassword(resetPasswordData: IResetPassword) {
    return this._http.post(`${this._apiEndpoint}/reset`, resetPasswordData);
  }
}
