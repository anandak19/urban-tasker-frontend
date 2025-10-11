import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Router, RouterOutlet } from '@angular/router';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup-layout',
  imports: [
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-layout.component.html',
  styleUrl: './signup-layout.component.scss',
})
export class SignupLayoutComponent implements OnInit {
  basicForm!: FormGroup;
  otpForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routre: Router,
  ) {}

  initializeSignupForm() {
    this.basicForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  checkBasicInfo(stepper: any) {
    if (this.basicForm.invalid) return;
    console.log(this.basicForm.value);
  }

  verifyOtp(stepper: any) {
    const data = {
      email: this.basicForm.value.email,
      otp: this.otpForm.value.otp,
    };
    console.log('OTP', data);
    stepper.next()
  }

  submit() {
    const payload = {
      name: this.basicForm.value.name,
      email: this.basicForm.value.email,
      phone: this.basicForm.value.phone,
      password: this.passwordForm.value.password,
    };
    console.log('Full data', payload);
  }

  // hooks
  ngOnInit(): void {
    this.initializeSignupForm();
  }
}
