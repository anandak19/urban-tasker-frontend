import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-home-hero',
  imports: [ButtonComponent],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss',
})
export class HomeHeroComponent {
  private _router = inject(Router);
  onBook() {
    this._router.navigate(['/book-tasker']);
  }
}
