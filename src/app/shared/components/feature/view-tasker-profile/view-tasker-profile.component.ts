import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileAboutTaskerComponent } from './components/profile-about-tasker/profile-about-tasker.component';
import { ProfileTaskerPortfolioComponent } from './components/profile-tasker-portfolio/profile-tasker-portfolio.component';
import { ProfileTaskerReviewsComponent } from './components/profile-tasker-reviews/profile-tasker-reviews.component';
import {
  ITaskerAbout,
  ITaskerCardData,
} from '@shared/models/tasker-data.model';
import { IOptionData } from '@shared/models/form-inputs.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import {
  IAverageRating,
  IReviews,
} from '@shared/models/reviews/reviews.interface';
import { IPaginationMeta } from '@features/admin/models/common.interface';

@Component({
  selector: 'app-view-tasker-profile',
  imports: [
    MatTabsModule,
    ProfileAboutTaskerComponent,
    ProfileTaskerPortfolioComponent,
    ProfileTaskerReviewsComponent,
  ],
  templateUrl: './view-tasker-profile.component.html',
  styleUrl: './view-tasker-profile.component.scss',
})
export class ViewTaskerProfileComponent implements OnInit {
  @Input() isEditable = true;

  @Input() taskerCardData = signal<ITaskerCardData | null>(null);
  @Input() taskerAbout = signal<ITaskerAbout | null>(null);
  @Input() taskerWorkCategories = signal<IOptionData[]>([]);

  @Input() allReviews = signal<IReviews[]>([]);
  @Input() avarageRating = signal<IAverageRating>({} as IAverageRating);
  @Input() reviewsPagination = signal<IPaginationMeta>({} as IPaginationMeta);

  @Output() getAboutData = new EventEmitter();
  @Output() getPortfolio = new EventEmitter();
  @Output() getReviewsCalled = new EventEmitter<IBaseFilters>();
  @Output() getAvarageRatingCalled = new EventEmitter();

  @Output() isAddPortfolioClicked = new EventEmitter();

  onGetAboutData() {
    this.getAboutData.emit();
  }

  onGetAvarageRating() {
    this.getAvarageRatingCalled.emit();
  }

  ongetPortfolio() {
    this.getPortfolio.emit();
  }

  ongetReviews(filter: IBaseFilters) {
    this.getReviewsCalled.emit(filter);
  }

  get fullName() {
    return this.taskerCardData()
      ? `${this.taskerCardData()?.firstName || ''} ${this.taskerCardData()?.lastName || ''}`
      : '';
  }

  ngOnInit(): void {
    console.log('Tasker profile');
  }
}
