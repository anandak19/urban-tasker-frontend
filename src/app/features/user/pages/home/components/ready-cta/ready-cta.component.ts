import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-ready-cta',
  imports: [ButtonComponent],
  templateUrl: './ready-cta.component.html',
  styleUrl: './ready-cta.component.scss',
})
export class ReadyCtaComponent {
  private _router = inject(Router);

  navigateBooking() {
    this._router.navigate(['/book-tasker']);
  }

  navigateBecomeTasker() {
    this._router.navigate(['/tasker/application']);
  }
}
