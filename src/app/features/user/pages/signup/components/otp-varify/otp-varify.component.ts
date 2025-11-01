import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  inject,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
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
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { SignupService } from '@features/user/services/signup/signup.service';
import { TimerService } from '@features/user/services/signup/timer.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { finalize } from 'rxjs';
import { IBasicDataResponse } from '../../../../models/signup/signup-response.model';

@Component({
  selector: 'app-otp-varify',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    NgOtpInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './otp-varify.component.html',
  styleUrl: './otp-varify.component.scss',
})
export class OtpVarifyComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _signupService = inject(SignupService);
  private _timerService = inject(TimerService);
  private _snackBar = inject(SnackbarService);

  //OTP input configuration
  otpConfig = {
    length: 4,
    allowNumbersOnly: true,
    inputClass: 'ng-otp-input',
  };

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  @ViewChild('otpInputRef') otpInputRef!: NgOtpInputComponent;

  otpForm!: FormGroup;
  isSubmitted = false;
  isLoading = signal(false);
  isResendLoading = signal(false);
  timeLeft = this._timerService.timer;
  @Output() nextStep = new EventEmitter<void>();

  // method to resend otp
  resendOtp() {
    this.isResendLoading.set(true);
    this.clearOtpInput();
    this._signupService
      .resendOtp()
      .pipe(finalize(() => this.isResendLoading.set(false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackBar.success('OTP send successfully');
          this._timerService.setTimer();
        },
        error: (err) => {
          this._snackBar.error('Error sending OTP');
          console.error(err);
        },
      });
  }

  initOtpForm() {
    this.otpForm = this._fb.group({
      otp: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }
  onOtpChange(value: string) {
    this.otpForm.get('otp')?.setValue(value);
  }

  clearOtpInput() {
    this.otpForm.reset();
    this.otpInputRef.setValue('');
  }

  // method to submit otp
  protected submitOtp() {
    this.isSubmitted = true;
    if (this.otpForm.invalid) {
      return;
    }
    this.isLoading.set(true);
    this._signupService
      .validateOtp(this.otpForm.value.otp)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res: IBasicDataResponse) => {
          console.log(res);
          this._snackBar.success(res.message);
          this.nextStep.emit();
        },
        error: (err: HttpErrorResponse) => {
          const error = err.error as IApiResponseError;
          this._snackBar.info(error.message);
        },
      });
  }

  ngOnInit(): void {
    this.initOtpForm();
  }
}
