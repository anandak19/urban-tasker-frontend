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
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderService } from './service/header.service';
import { NavLinksComponent } from '../components/nav-links/nav-links.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { UserProfileCircleComponent } from '../components/user-profile-circle/user-profile-circle.component';
import { AuthService } from '@features/user/services/auth/auth.service';
import { TokenService } from '@core/services/token/token.service';

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
  private _authService = inject(AuthService);
  public _tokenService = inject(TokenService);

  isLoginPage = true;
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

  onUserLogout() {
    this.router.navigate(['/login']);
  }

  //hooks
  ngOnInit(): void {
    this.isSidebarOpen = this.headerService.sidebarOpen;
  }
}
