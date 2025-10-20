import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavLink } from '../../../../interfaces/nav-link.interface';
import { HeaderService } from '../../service/header.service';
import { CommonModule } from '@angular/common';

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
