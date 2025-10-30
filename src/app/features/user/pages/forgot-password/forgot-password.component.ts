import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IForgotPassword } from '@features/user/models/password/password.model';
import { IBasicDataResponse } from '@features/user/models/signup/signup-response.model';
import { PasswordService } from '@features/user/services/password/password.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ButtonComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    MatProgressSpinner,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  isLoading = signal(false);

  private _fb = inject(FormBuilder);
  private _passwordService = inject(PasswordService);
  private _snackbar = inject(SnackbarService);

  onForgotFormSubmit() {
    if (this.forgotForm.valid) {
      this.isLoading.set(true);

      const forgotData: IForgotPassword = {
        email: this.forgotForm.get('email')?.value,
      };

      this._passwordService
        .forgotPassword(forgotData)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: (res) => {
            console.log(res);
            const result = res as IBasicDataResponse;
            const snackbarRef = this._snackbar.success(result.message);
            snackbarRef.afterDismissed().subscribe(() => {
              this.forgotForm.reset();
            });
          },
          error: (err: HttpErrorResponse) => {
            const error = err.error as IApiResponseError;
            this._snackbar.info(error.message);
          },
        });
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }

  initforgotForm() {
    this.forgotForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.initforgotForm();
  }
}
