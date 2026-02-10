import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { IUserData } from '@features/admin/models/user-data.interface';
import { IPersonalDetails } from '@features/user/models/profile/profile-details.model';
import { UserProfileService } from '@features/user/services/user/user-profile/user-profile.service';
import { UserService } from '@features/user/services/user/user.service';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { genders } from '@shared/constants/constants/gender-options.constant';
import { Gender } from '@shared/constants/enums/user.enum';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IOptionData } from '@shared/models/form-inputs.model';
import {
  noWhitespaceValidator,
  phoneNumberValidator,
} from '@shared/validators/custom-auth-validators';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-personal-data',
  imports: [
    FormFieldComponent,
    FormFieldWrapperComponent,
    DropdownComponent,
    ButtonLoadingComponent,
    BackButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './update-personal-data.component.html',
  styleUrl: './update-personal-data.component.scss',
})
export class UpdatePersonalDataComponent implements OnInit {
  personalDetails!: FormGroup;

  private _fb = inject(FormBuilder);
  private _userProfileService = inject(UserProfileService);
  private _userService = inject(UserService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  userGender = signal<IOptionData[]>(genders);
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  userData = signal<IUserData | null>(null);

  private initForm(): void {
    this.personalDetails = this._fb.group({
      firstName: ['', [Validators.required, noWhitespaceValidator]],
      lastName: ['', [Validators.required, noWhitespaceValidator]],
      phone: [
        '',
        [Validators.required, noWhitespaceValidator, phoneNumberValidator],
      ],
      gender: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.isSubmitted.set(true);

    if (this.personalDetails.invalid) {
      this.personalDetails.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const formValue = this.personalDetails.getRawValue();

    const payload: IPersonalDetails = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      gender: formValue.gender?.id,
    };

    this.updatePersonalData(payload);
  }

  resetForm() {
    this.personalDetails.reset();
    this.personalDetails.markAsUntouched();
  }

  updatePersonalData(payload: IPersonalDetails) {
    console.log('Personal data', payload);
    this._userProfileService
      .updatePersonalData(payload)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackbar.success(res.message);
          this.resetForm();
          this._router.navigate(['/profile']);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this._snackbar.error(err.message);
        },
      });
  }

  get getGenderError() {
    return this.isSubmitted() && this.personalDetails.get('gender')?.invalid
      ? 'Gender is requred'
      : '';
  }

  patchForm(userData: IUserData) {
    if (!userData) return;

    this.personalDetails.patchValue({
      firstName: userData.firstName ?? '',
      lastName: userData.lastName ?? '',
      phone: userData.phone ?? '',
      gender: userData.gender ? this.mapGender(userData.gender) : '',
    });
  }

  private mapGender(gender: Gender) {
    return genders.find((g) => g.id === gender) ?? '';
  }

  getUserData() {
    this._userService
      .getUserData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.userData.set(res.data);
          this.patchForm(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.getUserData();
  }
}
