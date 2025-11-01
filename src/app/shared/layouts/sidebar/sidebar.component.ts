import { Component, Input, signal } from '@angular/core';
import { ISideNavItem } from '@shared/interfaces/nav-link.interface';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isSideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.isSideNavCollapsed.set(val);
  }

  // this should be passed from parent
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
  ]);
}
