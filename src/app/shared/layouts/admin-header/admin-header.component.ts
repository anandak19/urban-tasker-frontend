import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrandComponent } from '@shared/components/brand/brand.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { UserProfileCircleComponent } from '../components/user-profile-circle/user-profile-circle.component';

@Component({
  selector: 'app-admin-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrandComponent,
    NotificationComponent,
    UserProfileCircleComponent,
  ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  @Output() collapsed = new EventEmitter<boolean>();
}
