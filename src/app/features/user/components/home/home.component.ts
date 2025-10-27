import { Component, inject } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _homeService = inject(HomeService);

  // mocke api call
  getProtectedData() {
    this._homeService.getProtectedData().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
