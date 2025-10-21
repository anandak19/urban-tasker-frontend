import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OtpVarifyComponent } from '../components/otp-varify/otp-varify.component';
import { PasswordFormComponent } from '../components/password-form/password-form.component';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { TimerService } from '../services/timer.service';

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
export class SignupLayoutComponent implements AfterViewInit {
  private cd = inject(ChangeDetectorRef);
  private _timerService = inject(TimerService);

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  initOtpForm(stepper: MatStepper) {
    stepper.next();
    this._timerService.setTimer();
  }
}
