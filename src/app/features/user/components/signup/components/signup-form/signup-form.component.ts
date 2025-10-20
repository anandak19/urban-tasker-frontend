import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-signup-form',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    ButtonComponent,
    MatStepperModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _signupService = inject(SignupService);

  basicForm!: FormGroup;
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

  // step: 1 working fine
  submitBasicForm() {
    if (this.basicForm.valid) {
      console.log('otp is requesting');
      this._signupService
        .validateBasicUserData(this.basicForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            // after otp send confirmation is got
            this.nextStep.emit();
          },
          error: (err: HttpErrorResponse) => {
            const error = err.error as IApiResponseError;
            console.log(error);
            alert(error.message);
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
