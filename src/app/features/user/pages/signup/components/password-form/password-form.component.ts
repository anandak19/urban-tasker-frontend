import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  inject,
  signal,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { SignupService } from '@features/user/services/signup/signup.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import {
  passwordValidator,
  passwordMatchValidator,
} from '@shared/validators/custom-auth-validators';
import { finalize } from 'rxjs';
import { IBasicDataResponse } from '../../models/signup-response.model';

@Component({
  selector: 'app-password-form',
  imports: [
    FormFieldComponent,
    ReactiveFormsModule,
    ButtonComponent,
    MatProgressSpinner,
  ],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss',
})
export class PasswordFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _signupService = inject(SignupService);
  private _router = inject(Router);
  private _snackBar = inject(SnackbarService);

  passwordForm!: FormGroup;
  isLoading = signal(false);
  @Output() singupCompleted = new EventEmitter<void>();

  initPasswordForm() {
    this.passwordForm = this._fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.minLength(6), passwordValidator],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator },
    );
  }

  // submit password OR singup complete
  submitPassword() {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.get('password')?.value;

      if (password) {
        this.isLoading.set(true);
        this._signupService
          .validatePassword(password)
          .pipe(finalize(() => this.isLoading.set(false)))
          .subscribe({
            next: (res) => {
              console.log(res);
              this.singupCompleted.emit();
              const result = res as IBasicDataResponse;
              const snackRef = this._snackBar.success(result.message);

              snackRef.afterDismissed().subscribe(() => {
                this._router.navigate(['/']);
              });
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              const error = err.error as IApiResponseError;
              this._snackBar.info(error.message);
            },
          });
      }
      // after signup process complete show a message showing signup complete
      // stepper is completed - no more next page
      // user will gets logeed in, redirect to home page
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.initPasswordForm();
  }
}
