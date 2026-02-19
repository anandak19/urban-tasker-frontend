import { Component, DestroyRef, inject } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApplicationSummaryComponent } from './components/application-summary/application-summary.component';
import { ReadyCtaComponent } from './components/ready-cta/ready-cta.component';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeroComponent,
    PopularCategoriesComponent,
    ApplicationSummaryComponent,
    ReadyCtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _homeService = inject(HomeService);
  private _snackBar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
}
