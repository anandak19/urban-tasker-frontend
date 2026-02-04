import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrandComponent } from '@shared/components/brand/brand.component';
import { UserProfileCircleComponent } from '../components/user-profile-circle/user-profile-circle.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrandComponent,
    UserProfileCircleComponent,
  ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  @Output() collapsed = new EventEmitter<boolean>();

  private _router = inject(Router);

  onAdminLogut() {
    this._router.navigate(['/']);
  }
}
