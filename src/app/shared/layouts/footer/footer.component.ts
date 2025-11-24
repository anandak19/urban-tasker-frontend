import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-footer',
  imports: [ButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  private _router = inject(Router);

  onBecomeTaskerBtnClick() {
    this._router.navigate(['tasker-application']);
  }
}
