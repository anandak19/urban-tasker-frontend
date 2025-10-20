import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  WritableSignal,
  inject,
} from '@angular/core';
import { BrandComponent } from '../../components/brand/brand.component';
import { NavLink } from '../../interfaces/nav-link.interface';
import { NavLinksComponent } from './components/nav-links/nav-links.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NotificationComponent } from './components/notification/notification.component';
import { UserProfileCircleComponent } from './components/user-profile-circle/user-profile-circle.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderService } from './service/header.service';

@Component({
  selector: 'app-header',
  imports: [
    BrandComponent,
    NavLinksComponent,
    ButtonComponent,
    NotificationComponent,
    UserProfileCircleComponent,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private el = inject(ElementRef);
  private headerService = inject(HeaderService);

  isLoginPage = true;
  isUserLogin = false;
  isSidebarOpen!: WritableSignal<boolean>;

  links: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Categories', path: '/categories' },
  ];

  bookTaskerClicked() {
    alert('Show book tasker page');
  }

  openNotifications() {
    alert('Open Notifications');
  }

  openUserOptions() {
    alert('Open user options : profile and logout');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  toggleSidePannel() {
    this.headerService.toggleSidebar();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside && this.headerService.sidebarOpen()) {
      this.toggleSidePannel();
    }
  }

  //hooks
  ngOnInit(): void {
    this.isSidebarOpen = this.headerService.sidebarOpen;
  }
}
