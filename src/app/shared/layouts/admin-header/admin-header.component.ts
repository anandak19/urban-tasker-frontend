import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrandComponent } from '@shared/components/brand/brand.component';
import { UserProfileCircleComponent } from '../components/user-profile-circle/user-profile-circle.component';
import { Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-admin-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrandComponent,
    UserProfileCircleComponent,
    ButtonComponent,
  ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  @Output() collapsed = new EventEmitter<boolean>();

  private _router = inject(Router);
  private _authGService = inject(AuthGuardService);

  currUser = this._authGService.currentUser();

  onProfile() {
    this._router.navigate(['/profile']);
  }

  exitDashboard() {
    this._router.navigate(['/']);
  }

  get imageUrl() {
    return this.currUser
      ? this.currUser.profileImageUrl
      : 'assets/defaults/default-user.png';
  }
}
