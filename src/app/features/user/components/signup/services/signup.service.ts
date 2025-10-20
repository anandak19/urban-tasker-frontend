import { Injectable, inject } from '@angular/core';
import { SessionStorageService } from '@core/services/session-storage.service';
import { IBasicUserData } from '../models/signup.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBasicDataResponse } from '../models/signup-response.model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private _sessionService = inject(SessionStorageService);
  private _http = inject(HttpClient);

  private readonly apiEndpoint = 'auth/signup/basic';

  // STEP 1: Method to validate and save basic user data and get otp to email
  validateBasicUserData(
    userData: IBasicUserData,
  ): Observable<IBasicDataResponse> {
    return this._http.post<IBasicDataResponse>(this.apiEndpoint, userData);
  }

  // STEP 2: Method to send otp to varify
  // validateOtp() {}
  // STEP 2.1: Method to call resend otp
  // resendOtp() {}
  // STEP 3: Method to send new password and end signup process
  // validatePassword() {}

  // last singup with basic data and password
  //  token that got from otp varify is also send
  signupUser(password: string) {
    console.log('User DAta', password);

    // geting data from local storeate
    const result = this._sessionService.getSessionItem('basic');
    if (!result) {
      // show alert message or somthing
      alert('Under construction - Start again to test');
    } else {
      console.log('Sending full data to server: ', result);
      console.log('And password', password);

      // call the api to signup
      alert('Signup API is under construction');

      this._sessionService.deleteSessionItem('basic');
    }
  }

  // send the otp to server. if valid: it return a token in cooke
  varifyOtp(otp: string) {
    console.log('otp ', otp);
  }
}
