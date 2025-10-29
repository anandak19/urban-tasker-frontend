import {
  Component,
  AfterViewInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { ICanComponentDeactivate } from '@core/guards/guards.interface';
import { TimerService } from '@features/user/services/signup/timer.service';
import { OtpVarifyComponent } from '../components/otp-varify/otp-varify.component';
import { PasswordFormComponent } from '../components/password-form/password-form.component';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';

@Component({
  selector: 'app-signup-layout',
  imports: [
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SignupFormComponent,
    OtpVarifyComponent,
    PasswordFormComponent,
  ],
  templateUrl: './signup-layout.component.html',
  styleUrl: './signup-layout.component.scss',
})
export class SignupLayoutComponent
  implements AfterViewInit, ICanComponentDeactivate
{
  private _cd = inject(ChangeDetectorRef);
  private _timerService = inject(TimerService);

  private _isSignupDirty = false;

  initOtpForm(stepper: MatStepper) {
    this._isSignupDirty = true;
    stepper.next();
    this._timerService.setTimer();
  }

  resetForm() {
    this._isSignupDirty = false;
  }

  canDeactivate(): boolean {
    if (this._isSignupDirty) {
      const confirmLeave = confirm(
        'All the changes will be lost, Are you sure?',
      );
      this._timerService.setTimer();
      return confirmLeave;
    }
    return true;
  }

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }
}
