import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '@shared/layouts/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '@shared/layouts/admin-header/admin-header.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ISideNavItem } from '@shared/interfaces/nav-link.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private _destroyRef = inject(DestroyRef);

  sideMenuItems = signal<ISideNavItem[]>([
    {
      icon: 'analytics',
      label: 'Reports',
      route: 'reports',
    },
    {
      icon: 'manage_accounts',
      label: 'Users Managment',
      route: 'user-management',
    },
    {
      icon: 'task_alt',
      label: 'Tasks Management',
      route: 'task-management',
    },
    {
      icon: 'category',
      label: 'Category Management',
      route: 'category-management',
    },
    {
      icon: 'category',
      label: 'Tasker Applications',
      route: 'tasker-applications',
    },
    {
      icon: 'report',
      label: 'Complaints Management',
      route: 'complaints-management',
    },
  ]);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '278px'));
  hideText = computed(() => !this.isHandset && this.collapsed());

  private _breakPoint = inject(BreakpointObserver);

  constructor() {
    this._breakPoint
      .observe([Breakpoints.Handset])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res) => {
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
