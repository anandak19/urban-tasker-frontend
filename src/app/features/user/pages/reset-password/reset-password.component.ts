import { Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { NewPasswordFormComponent } from '@features/user/components/new-password-form/new-password-form.component';
import { IResetPassword } from '@features/user/models/password/password.model';
import { IBasicDataResponse } from '@features/user/models/signup/signup-response.model';
import { PasswordService } from '@features/user/services/password/password.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [NewPasswordFormComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  isLoading = signal(false);
  isFormReset = signal(false);
  private _resetToken!: string | null;

  private _passwordService = inject(PasswordService);
  private _snackbar = inject(SnackbarService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  onNewPassword(password: string) {
    this.isLoading.set(true);

    if (!this._resetToken) {
      this._snackbar.error('Reset token is required');
    }

    // construct request body
    const resetData: IResetPassword = {
      password: password.trim(),
      resetToken: this._resetToken ? this._resetToken.trim() : '',
    };

    this._passwordService
      .resetPassword(resetData)
      .pipe(
        takeUntilDestroyed(),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          const result = res as IBasicDataResponse;
          this.isFormReset.set(true);
          const snackbarRef = this._snackbar.success(result.message);
          snackbarRef.afterDismissed().subscribe(() => {
            this._router.navigate(['/login']);
          });
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this._resetToken = this._route.snapshot.queryParamMap.get('token');
    console.log(this._resetToken);
  }
}
