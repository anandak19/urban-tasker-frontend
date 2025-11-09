import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { AuthService } from '@core/services/auth/auth.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-user-profile-circle',
  imports: [MatMenuModule],
  templateUrl: './user-profile-circle.component.html',
  styleUrl: './user-profile-circle.component.scss',
})
export class UserProfileCircleComponent {
  @Output() clickProfile = new EventEmitter();
  @Output() logout = new EventEmitter();
  imageUrl = 'https://imgflip.com/s/meme/Smiling-Cat.jpg';

  private _authService = inject(AuthService);
  private _snackBar = inject(SnackbarService);
  private _authGuradService = inject(AuthGuardService);

  logoutClicked() {
    this._authService.logout().subscribe({
      next: () => {
        this._authGuradService.clearCurrentUser();

        const snackRef = this._snackBar.success('Logout succssfully');
        snackRef.afterDismissed().subscribe(() => this.logout.emit());
      },
      error: (err) => {
        console.log(err);
        this._snackBar.error('Somthing went wrong');
      },
    });
  }

  gotToProfileClicked() {
    alert('Method not implemeted');
  }
}
