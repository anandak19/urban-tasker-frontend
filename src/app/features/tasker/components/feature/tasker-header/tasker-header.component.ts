import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BrandComponent } from '@shared/components/brand/brand.component';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-tasker-header',
  imports: [BrandComponent, ButtonComponent, MatIconModule],
  templateUrl: './tasker-header.component.html',
  styleUrl: './tasker-header.component.scss',
})
export class TaskerHeaderComponent {
  private router = inject(Router);

  leaveDashboard() {
    this.router.navigate(['/']);
  }
}
