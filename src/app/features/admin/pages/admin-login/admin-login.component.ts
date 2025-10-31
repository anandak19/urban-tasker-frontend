import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AuthService } from '@features/admin/services/auth/auth.service';
import { ILoginData } from '@features/user/models/login/login.model';
import { LoginFormComponent } from '@shared/components/login-form/login-form.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  imports: [LoginFormComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  isLoding = signal(false);
  @ViewChild(LoginFormComponent) loginFormChild!: LoginFormComponent;

  private _authService = inject(AuthService);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);

  onLogin(data: ILoginData) {
    this._authService
      .login(data)
      .pipe(finalize(() => this.isLoding.set(false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.loginFormChild.resetForm();
          const snackbarRef = this._snackbar.success('Login Successfull');
          snackbarRef.afterDismissed().subscribe(() => {
            this._router.navigate(['/admin']);
          });
        },
        error: (err: HttpErrorResponse) => {
          const error = err.error as IApiResponseError;
          this._snackbar.success(error.message);
        },
      });
  }
}
