import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/layouts/header/header.component';
import { SidebarComponent } from '@shared/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-tasker-layout',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './tasker-layout.component.html',
  styleUrl: './tasker-layout.component.scss',
})
export class TaskerLayoutComponent {}
