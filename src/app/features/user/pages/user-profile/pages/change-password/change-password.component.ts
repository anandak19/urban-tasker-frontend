import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { IChangePassoword } from '@features/user/models/profile/profile-details.model';
import { UserProfileService } from '@features/user/services/user/user-profile/user-profile.service';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import {
  passwordMatchValidator,
  passwordValidator,
} from '@shared/validators/custom-auth-validators';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    BackButtonComponent,
    ButtonLoadingComponent,
    FormFieldComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  private _fb = inject(FormBuilder);
  private _userProfileService = inject(UserProfileService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  private initForm(): void {
    this.passwordForm = this._fb.group({
      oldPassword: ['', Validators.required],

      newPasswordGroup: this._fb.group(
        {
          password: [
            '',
            [Validators.required, Validators.minLength(6), passwordValidator],
          ],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: passwordMatchValidator },
      ),
    });
  }

  get newPasswordError() {
    return this.isSubmitted() &&
      this.passwordForm.get('newPasswordGroup')?.errors
      ? this.passwordForm.get('newPasswordGroup')?.errors?.['customError']
      : '';
  }

  onSubmit(): void {
    this.isSubmitted.set(true);
    console.log(this.passwordForm);

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const oldPassword = this.passwordForm.get('oldPassword')?.value;

    const newPassword = this.passwordForm.get(
      'newPasswordGroup.password',
    )?.value;

    const payload: IChangePassoword = {
      newPassword,
      oldPassword,
    };

    this.changePassword(payload);
  }

  changePassword(payload: IChangePassoword) {
    console.log('Password updated', payload);
    this._userProfileService
      .updatePassword(payload)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackbar.success(res.message);
          this._router.navigate(['/login']);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this._snackbar.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
