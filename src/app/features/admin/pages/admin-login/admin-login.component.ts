import {
  Component,
  DestroyRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ILoginData } from '@features/user/models/auth/login.model';
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
  private _destroyRef = inject(DestroyRef);

  onLogin(data: ILoginData) {
    this._authService
      .localLogin(data)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoding.set(false)),
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.loginFormChild.resetForm();
          const snackbarRef = this._snackbar.success('Login Successfull');
          snackbarRef
            .afterDismissed()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
              this._router.navigate(['/admin']);
            });
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }
}
