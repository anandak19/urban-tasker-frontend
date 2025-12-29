import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserService } from '@features/user/services/user/user.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UserDataComponent } from '@shared/components/feature/user-data/user-data.component';
import { IUserData } from '@features/admin/models/user-data.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { HomeLocationAddressComponent } from '@shared/components/feature/home-location-address/home-location-address.component';
import { Router } from '@angular/router';
import { SectionTitleComponent } from '@features/user/components/section-title/section-title.component';

@Component({
  selector: 'app-user-profile',
  imports: [
    ButtonComponent,
    UserDataComponent,
    HomeLocationAddressComponent,
    SectionTitleComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private _userService = inject(UserService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  userData = signal<IUserData | null>(null);

  onHomeAddressBtnClick() {
    this._router.navigate(['profile/location']);
  }

  onChangePasswordBtnClick() {
    this._router.navigate(['profile/change-password']);
  }

  onEditProfileBtnClick() {
    this._router.navigate(['profile/profile-edit']);
  }

  ngOnInit(): void {
    this._userService
      .getUserData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log('On get user', res);
          this.userData.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }
}
