import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/layouts/header/header.component';
import { SidebarComponent } from '@shared/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {}
