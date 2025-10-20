import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-otp-varify',
  imports: [ReactiveFormsModule, FormFieldComponent, ButtonComponent], // remove FormFieldComponent later
  templateUrl: './otp-varify.component.html',
  styleUrl: './otp-varify.component.scss',
})
export class OtpVarifyComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _signupService = inject(SignupService);

  otpForm!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();

  // varify otp entered by user
  verifyOtp() {
    if (this.otpForm.valid) {
      this._signupService.varifyOtp(this.otpForm.value);
      // if the otp is valid
      this.nextStep.emit();
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  resendOtp() {
    alert('Resend not writen yet');
  }

  initOtpForm() {
    this.otpForm = this._fb.group({
      otp: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initOtpForm();
  }
}
