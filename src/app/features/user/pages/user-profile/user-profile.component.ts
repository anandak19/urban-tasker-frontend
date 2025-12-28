import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '@features/user/services/user/user.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private _userService = inject(UserService);

  getUserData() {
    this._userService
      .getUserData()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => {
          console.log('On get user', res);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getUserData();
  }
}
