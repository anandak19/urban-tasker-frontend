import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // mocke api url
  private _apiUrl = 'auth/protected';

  private _http = inject(HttpClient);

  // mocke method
  getProtectedData() {
    return this._http.get(this._apiUrl);
  }
}
