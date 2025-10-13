import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { OtpVarifyComponent } from '../components/otp-varify/otp-varify.component';
import { PasswordFormComponent } from '../components/password-form/password-form.component';
import { JsonPipe } from '@angular/common';

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

  constructor(private cd: ChangeDetectorRef) {}
  
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
