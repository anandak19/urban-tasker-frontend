import { Component, inject } from '@angular/core';
import { HomeService } from './services/home.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _homeService = inject(HomeService);
  private _snackBar = inject(SnackbarService);

  // mocke api call
  getProtectedData() {
    this._homeService.getProtectedData().subscribe({
      next: () => {
        this._snackBar.success('Protected data received');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
