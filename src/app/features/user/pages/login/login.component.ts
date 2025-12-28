import {
  Component,
  DestroyRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { AuthService } from '@core/services/auth/auth.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { LoginFormComponent } from '@shared/components/login-form/login-form.component';
import { UserRoles } from '@shared/constants/enums/user.enum';
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
  private _destroyRef = inject(DestroyRef);

  @ViewChild(LoginFormComponent) loginFormChild!: LoginFormComponent;

  isLoading = signal(false);

  // local login
  onLogin(loginData: ILoginData) {
    this._authServices
      .localLogin(loginData)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this.loginFormChild.resetForm();
          const snackRef = this._snackBar.success(res.message);
          this._authGuradService
            .fetchLoginUser()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe();

          snackRef
            .afterDismissed()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
              if (res.data.userRole === UserRoles.TASKER) {
                this._router.navigate(['/tasker']);
              } else {
                this._router.navigate(['/']);
              }
            });
        },
        error: (err: IApiResponseError) => {
          this._snackBar.info(err.message);
        },
      });
  }

  googleLoginClicked() {
    this._authServices.googleLogin();
  }
}
