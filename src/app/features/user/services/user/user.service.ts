import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected API_ENDPOINT = 'user';

  private _http = inject(HttpClient);

  getUserData() {
    return this._http.get(this.API_ENDPOINT);
  }
}
