import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { SignupService } from '../../services/signup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponseError } from '@shared/models/api-response.model';
import {
  emailValidator,
  nameValidator,
  noWhitespaceValidator,
  phoneNumberValidator,
} from '@shared/validators/custom-auth-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    ButtonComponent,
    MatStepperModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _signupService = inject(SignupService);
  //snackbar
  private snackBar = inject(MatSnackBar);

  basicForm!: FormGroup;
  isLoading = signal(false);
  @Output() nextStep = new EventEmitter<void>();

  initForm() {
    this.basicForm = this._fb.group({
      firstName: [
        '',
        [
          Validators.required,
          noWhitespaceValidator,
          Validators.maxLength(15),
          nameValidator,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          noWhitespaceValidator,
          Validators.maxLength(15),
          nameValidator,
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          noWhitespaceValidator,
          Validators.email,
          emailValidator,
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          noWhitespaceValidator,
          Validators.minLength(10),
          Validators.maxLength(14),
          phoneNumberValidator,
        ],
      ],
    }); // Validators.minLength(10)]  Validators.email
  }

  // step: 1 submit basic details
  submitBasicForm() {
    if (this.basicForm.valid) {
      this.isLoading.set(true);
      this._signupService
        .validateBasicUserData(this.basicForm.value)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.snackBar.open('OTP send successfully', 'Dismiss', {
              duration: 9000,
            });
            this.nextStep.emit();
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);

            const error = err.error as IApiResponseError;
            this.snackBar.open(error.message, 'Dismiss', {
              duration: 9000,
            });
          },
        });
    } else {
      this.basicForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
}
