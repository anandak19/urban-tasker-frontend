import { Component, inject } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';

@Component({
  selector: 'app-home',
  imports: [HomeHeroComponent, PopularCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _homeService = inject(HomeService);
  private _snackBar = inject(SnackbarService);

  // mocke api call
  getProtectedData() {
    this._homeService.getProtectedData().subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.success('Protected data received');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
