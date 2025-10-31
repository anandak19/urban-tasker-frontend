import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AuthService } from '@features/user/services/auth/auth.service';
import { LoginFormComponent } from '@shared/components/login-form/login-form.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { ILoginData } from '@shared/models/auth.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _snackBar = inject(SnackbarService);
  private _router = inject(Router);

  @ViewChild(LoginFormComponent) loginFormChild!: LoginFormComponent;

  isLoading = signal(false);

  onLogin(loginData: ILoginData) {
    this._authService
      .login(loginData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.loginFormChild.resetForm();
          const snackRef = this._snackBar.success('Login Successfull');
          snackRef.afterDismissed().subscribe(() => {
            this._router.navigate(['/']);
          });
        },
        error: (err: HttpErrorResponse) => {
          const error = err.error as IApiResponseError;
          this._snackBar.info(error.message);
        },
      });
  }
}
