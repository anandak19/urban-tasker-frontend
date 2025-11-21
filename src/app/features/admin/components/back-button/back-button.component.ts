import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-back-button',
  imports: [ButtonComponent],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  private _location = inject(Location);
  goBack() {
    this._location.back();
  }
}
