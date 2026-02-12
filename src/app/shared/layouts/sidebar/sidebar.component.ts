import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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
  @Output() collapse = new EventEmitter();

  isSideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.isSideNavCollapsed.set(val);
  }
  @Input() sideMenuItems = signal<ISideNavItem[]>([]);
  // this should be passed from parent

  onOptionSelect() {
    this.collapse.emit();
  }
}
