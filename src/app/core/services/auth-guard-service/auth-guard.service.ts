import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  ICurrentUser,
  IisLoginResponse,
} from '@features/user/models/auth/login.model';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private _http = inject(HttpClient);
  private _apiEndPoint = 'auth';

  currentUser = signal<ICurrentUser | null>(null);

  isUserRoleIs(role: UserRoles) {
    return this.currentUser() && this.currentUser()?.userRole === role;
  }

  clearCurrentUser() {
    this.currentUser.set(null);
  }

  fetchLoginUser() {
    return this._http
      .get<IisLoginResponse>(`${this._apiEndPoint}/login-user`)
      .pipe(
        tap((res) => {
          this.currentUser.set(res.data.user);
          console.log('current user', this.currentUser());
        }),
        catchError((err) => {
          console.log('faild to fetch login user', err);
          this.currentUser.set(null);
          return of(null);
        }),
      );

    // return this._http.get(`${this._apiEndPoint}/login-user`).subscribe({
    //   next: (res) => {
    //     const response = res as IisLoginResponse;
    //     this.currentUser.set(response.data.user);
    //     console.log('Current user', this.currentUser());
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
}
