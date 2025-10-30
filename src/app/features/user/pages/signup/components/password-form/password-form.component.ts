import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { SignupService } from '@features/user/services/signup/signup.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { finalize } from 'rxjs';
import { IBasicDataResponse } from '@features/user/models/signup/signup-response.model';
import { NewPasswordFormComponent } from '@features/user/components/new-password-form/new-password-form.component';

@Component({
  selector: 'app-password-form',
  imports: [NewPasswordFormComponent],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.scss',
})
export class PasswordFormComponent {
  private _signupService = inject(SignupService);
  private _router = inject(Router);
  private _snackBar = inject(SnackbarService);

  isLoading = signal(false);
  @Output() singupCompleted = new EventEmitter<void>();

  onNewPassword(password: string) {
    this.isLoading.set(true);

    this._signupService
      .validatePassword(password)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.singupCompleted.emit();
          const result = res as IBasicDataResponse;
          const snackRef = this._snackBar.success(result.message);

          snackRef.afterDismissed().subscribe(() => {
            this._router.navigate(['/']);
          });
        },

        error: (err: HttpErrorResponse) => {
          console.log(err);
          const error = err.error as IApiResponseError;
          this._snackBar.info(error.message);
        },
      });
  }
}
