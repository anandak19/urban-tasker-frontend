import {
  Component,
  OnInit,
  inject,
  Output,
  EventEmitter,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { SignupService } from '../../services/signup.service';
import {
  passwordMatchValidator,
  passwordValidator,
} from '@shared/validators/custom-auth-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { IBasicDataResponse } from '../../models/signup-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponseError } from '@shared/models/api-response.model';
import { Router } from '@angular/router';

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
  private snackBar = inject(MatSnackBar);
  private _router = inject(Router);

  passwordForm!: FormGroup;
  isLoading = signal(false);
  @Output() nextStep = new EventEmitter<void>();

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
              const result = res as IBasicDataResponse;
              const snackRef = this.snackBar.open(result.message, 'Dismiss', {
                duration: 9000,
              });

              snackRef.afterDismissed().subscribe(() => {
                this._router.navigate(['/']);
              });
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              const error = err.error as IApiResponseError;
              this.snackBar.open(error.message, 'Dismiss', {
                duration: 9000,
              });
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
