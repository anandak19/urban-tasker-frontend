import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '@shared/layouts/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '@shared/layouts/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-layout',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SidebarComponent,
    RouterOutlet,
    AdminHeaderComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  collapsed = signal(false);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '268px'));
}
