import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../../../../shared/components/form-field/form-field.component';
import { SignupService } from '../../services/signup.service';
import { ButtonComponent } from "../../../../../../shared/components/button/button.component";

@Component({
  selector: 'app-otp-varify',
  imports: [ReactiveFormsModule, FormFieldComponent, ButtonComponent], // remove FormFieldComponent later
  templateUrl: './otp-varify.component.html',
  styleUrl: './otp-varify.component.scss',
})
export class OtpVarifyComponent implements OnInit {
  otpForm!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();

  constructor(
    private _fb: FormBuilder,
    private _signupService: SignupService,
  ) {}

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

  resendOtp(){
    this._signupService.resendOtp()
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
