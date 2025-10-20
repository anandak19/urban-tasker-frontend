import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-password-form',
  imports: [FormFieldComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss',
})
export class PasswordFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _signupService = inject(SignupService);

  passwordForm!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();

  initPasswordForm() {
    this.passwordForm = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // submit password OR singup complete
  submitPassword() {
    if (this.passwordForm.valid) {
      this._signupService.signupUser(this.passwordForm.value);
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
