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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    }); // Validators.minLength(10)]  Validators.email
  }

  submitBasicForm() {
    if (this.basicForm.valid) {
      console.log('otp is requesting');
      this._signupService.requestOtp(this.basicForm.value);
      // after otp send confirmation is got
      this.nextStep.emit();
    } else {
      this.basicForm.markAllAsTouched();
    }
  }

  initFormValues() {
    const userData = this._signupService.getBasicUserData();
    if (userData) {
      this.basicForm.patchValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
      });
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.initFormValues();
  }
}
