import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NavLink } from '@shared/interfaces/nav-link.interface';
import { HeaderService } from '@shared/layouts/header/service/header.service';

@Component({
  selector: 'app-nav-links',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss',
})
export class NavLinksComponent implements OnInit {
  private headerService = inject(HeaderService);

  @Input() links: NavLink[] = [];
  isSidebarOpen!: WritableSignal<boolean>;

  ngOnInit(): void {
    this.isSidebarOpen = this.headerService.sidebarOpen;
  }
}
