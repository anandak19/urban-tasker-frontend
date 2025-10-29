import { Component, signal } from '@angular/core';
import { NewPasswordFormComponent } from '@features/user/components/new-password-form/new-password-form.component';

@Component({
  selector: 'app-reset-password',
  imports: [NewPasswordFormComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  isLoading = signal(false);

  onNewPassword(password: string) {
    console.log(password);
  }
}
