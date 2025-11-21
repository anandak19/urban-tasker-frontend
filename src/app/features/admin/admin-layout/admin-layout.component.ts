import { Component, computed, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '@shared/layouts/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '@shared/layouts/admin-header/admin-header.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  isHandset = false;

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '278px'));
  hideText = computed(() => !this.isHandset && this.collapsed());

  private _breakPoint = inject(BreakpointObserver);

  constructor() {
    this._breakPoint.observe([Breakpoints.Handset]).subscribe((res) => {
      this.isHandset = res.matches;
    });
  }

  sidenavMode() {
    return this.isHandset ? 'over' : 'side';
  }

  collapseNav() {
    this.collapsed.set(!this.collapsed());
  }

  onSidenavClose() {
    this.collapsed.set(false);
  }
}
