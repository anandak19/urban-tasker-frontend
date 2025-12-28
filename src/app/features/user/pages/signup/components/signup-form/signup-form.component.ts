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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { SignupService } from '@features/user/services/signup/signup.service';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import {
  noWhitespaceValidator,
  nameValidator,
  emailValidator,
  phoneNumberValidator,
} from '@shared/validators/custom-auth-validators';
import { finalize } from 'rxjs';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signup-form',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    MatStepperModule,
    MatProgressSpinnerModule,
    ButtonLoadingComponent,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _signupService = inject(SignupService);
  //snackbar
  private _snackbarService = inject(SnackbarService);

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
    });
  }

  // step: 1 submit basic details
  submitBasicForm() {
    if (this.basicForm.valid) {
      this.isLoading.set(true);
      this._signupService
        .validateBasicUserData(this.basicForm.value)
        .pipe(
          takeUntilDestroyed(),
          finalize(() => this.isLoading.set(false)),
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            this._snackbarService.success('OTP send successfully');
            this.nextStep.emit();
          },
          error: (err: IApiResponseError) => {
            this._snackbarService.info(err.message);
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
