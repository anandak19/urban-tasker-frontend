import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { AuthService } from '@core/services/auth/auth.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
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
  private _authServices = inject(AuthService);
  private _snackBar = inject(SnackbarService);
  private _router = inject(Router);
  private _authGuradService = inject(AuthGuardService);

  @ViewChild(LoginFormComponent) loginFormChild!: LoginFormComponent;

  isLoading = signal(false);

  onLogin(loginData: ILoginData) {
    this._authServices
      .localLogin(loginData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.loginFormChild.resetForm();
          const snackRef = this._snackBar.success('Login Successfull');
          this._authGuradService.fetchLoginUser().subscribe();
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

  googleLoginClicked() {
    this._authServices.googleLogin();
  }
}
