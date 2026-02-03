import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@shared/layouts/sidebar/sidebar.component';
import { TaskerHeaderComponent } from '../components/feature/tasker-header/tasker-header.component';
import { MatIcon } from '@angular/material/icon';
import {
  MatSidenavContainer,
  MatSidenav,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ISideNavItem } from '@shared/interfaces/nav-link.interface';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasker-layout',
  imports: [
    SidebarComponent,
    RouterOutlet,
    TaskerHeaderComponent,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatButtonModule,
  ],
  templateUrl: './tasker-layout.component.html',
  styleUrl: './tasker-layout.component.scss',
})
export class TaskerLayoutComponent {
  collapsed = signal(false);
  isHandset = false;
  private _destroyRef = inject(DestroyRef);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '278px'));
  hideText = computed(() => !this.isHandset && this.collapsed());

  sideMenuItems = signal<ISideNavItem[]>([
    {
      icon: 'check_circle',
      label: 'Tasks',
      route: 'tasks',
    },
    {
      icon: 'account_circle',
      label: 'Tasker Profile',
      route: 'profile',
    },
    {
      icon: 'payments',
      label: 'Earnings',
      route: 'earnings',
    },
    {
      icon: 'schedule',
      label: 'Availability',
      route: 'availability',
    },
  ]);

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
