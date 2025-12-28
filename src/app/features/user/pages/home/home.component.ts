import { Component, DestroyRef, inject } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [HomeHeroComponent, PopularCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _homeService = inject(HomeService);
  private _snackBar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  // mocke api call
  getProtectedData() {
    this._homeService
      .getProtectedData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
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
