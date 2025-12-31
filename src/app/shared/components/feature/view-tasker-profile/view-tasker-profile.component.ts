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

  @Output() getAboutData = new EventEmitter();
  @Output() getPortfolio = new EventEmitter();
  @Output() getReviews = new EventEmitter();

  onGetAboutData() {
    this.getAboutData.emit();
  }

  ongetPortfolio() {
    this.getPortfolio.emit();
  }

  ongetReviews() {
    this.getReviews.emit();
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
