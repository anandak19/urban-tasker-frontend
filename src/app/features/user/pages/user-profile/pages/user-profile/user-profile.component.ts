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
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { TImageFile } from '@features/admin/models/category.interface';
import { UserProfileService } from '@features/user/services/user/user-profile/user-profile.service';

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
  private _userProfileService = inject(UserProfileService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  userData = signal<IUserData | null>(null);
  selectedFile: File | null = null;
  maxSizeInMB = 1;

  onHomeAddressBtnClick() {
    this._router.navigate(['profile/location']);
  }

  onChangePasswordBtnClick() {
    this._router.navigate(['profile/change-password']);
  }

  onEditProfileBtnClick() {
    this._router.navigate(['profile/profile-edit']);
  }

  displayImage(url: TImageFile): void {
    if (!url) return;

    const imageUrl = url as string;

    this.userData.update((data) => {
      if (!data) return data;

      return {
        ...data,
        profileImageUrl: imageUrl,
      };
    });
  }

  uploadImage(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this._userProfileService.updateProfilePicture(formData).subscribe({
      next: (res) => {
        console.log(res);
        this._snackbar.success(res.message);
      },
      error: (err: IApiResponseError) => {
        this._snackbar.error(err.message);
      },
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    const isError = this.isSizeError(file.size);
    if (isError) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      const selectedImage = e.target?.result as TImageFile;
      this.displayImage(selectedImage);
    };
    reader.readAsDataURL(file);

    // call upload immediately
    this.uploadImage(file);
  }

  isSizeError(size: number): boolean {
    const maxSizeInBytes = this.maxSizeInMB * 1024 * 1024;

    if (size > maxSizeInBytes) {
      this._snackbar.error(`Image must be less than ${this.maxSizeInMB}MB`);
      return true;
    }
    return false;
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
