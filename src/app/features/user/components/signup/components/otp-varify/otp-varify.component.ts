import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { SignupService } from '../../services/signup.service';
import { IBasicDataResponse } from '../../models/signup-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponseError } from '@shared/models/api-response.model';
import { TimerService } from '../../services/timer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

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
  private snackBar = inject(MatSnackBar);

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
          this.snackBar.open('OTP send successfully', 'Dismiss', {
            duration: 9000,
          });
          this._timerService.setTimer();
        },
        error: (err) => {
          this.snackBar.open('Error sending OTP', 'Dismiss', {
            duration: 9000,
          });
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
          this.snackBar.open(res.message, 'Dismiss', {
            duration: 9000,
          });
          this.nextStep.emit();
        },
        error: (err: HttpErrorResponse) => {
          const error = err.error as IApiResponseError;
          this.snackBar.open(error.message, 'Dismiss', {
            duration: 9000,
          });
        },
      });
  }

  ngOnInit(): void {
    this.initOtpForm();
  }
}
