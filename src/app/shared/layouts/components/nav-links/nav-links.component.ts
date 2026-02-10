import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  @Output() isLinkClicked = new EventEmitter();
  isSidebarOpen!: WritableSignal<boolean>;

  onLinkClick() {
    this.isLinkClicked.emit();
  }

  ngOnInit(): void {
    this.isSidebarOpen = this.headerService.sidebarOpen;
  }
}
