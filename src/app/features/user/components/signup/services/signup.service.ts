import { Injectable, inject } from '@angular/core';
import { SessionStorageService } from '@core/services/session-storage.service';
import { BasicData } from '../models/signup.model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private _sessionService = inject(SessionStorageService);

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

  resendOtp() {
    console.log('Resend otp is Under construction');
  }

  // send the otp to server. if valid: it return a token in cooke
  varifyOtp(otp: string) {
    console.log('otp ', otp);
  }

  requestOtp(basicData: BasicData) {
    // after validation save the user data in local storage for percistance
    console.log('reqOtp: basic data', basicData);
    this._sessionService.setSessionItem('basic', basicData);
  }

  getBasicUserData(): BasicData | null {
    return this._sessionService.getSessionItem('basic');
  }
}
