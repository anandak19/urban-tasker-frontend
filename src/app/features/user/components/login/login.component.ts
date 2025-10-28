import { Component, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { LoginService } from './services/login.service';
import { TokenService } from '@core/services/token/token.service';

@Component({
  selector: 'app-login',
  imports: [FormFieldComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _loginService = inject(LoginService);
  private _tokenService = inject(TokenService);

  loginForm!: FormGroup;

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._loginService.login(this.loginForm.value).subscribe({
        next: (res) => {
          const response = res as { data: { accessToken: string } };
          console.log(response.data.accessToken);
          this._tokenService.setAccessToken(response?.data.accessToken);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}
