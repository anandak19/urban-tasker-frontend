import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { IBaseFilters } from '@shared/models/request-data.model';
import {
  IAverageRating,
  IReviews,
} from '@shared/models/reviews/reviews.interface';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';

@Component({
  selector: 'app-profile-tasker-reviews',
  imports: [PaginationComponent],
  templateUrl: './profile-tasker-reviews.component.html',
  styleUrl: './profile-tasker-reviews.component.scss',
})
export class ProfileTaskerReviewsComponent implements OnInit {
  reviewFilter = signal<IBaseFilters>({ page: 1 });
  /**
   * ToDos
   * 1. create shape for agregated review
   * 2. create shape for list all revies
   * 3. create 2 variables to show these 2 values
   */
  @Output() getReviewsCalled = new EventEmitter<IBaseFilters>();
  @Output() getAvarageRatingCalled = new EventEmitter();

  @Input() avarageRating = signal<IAverageRating>({} as IAverageRating);
  @Input() allReviews = signal<IReviews[]>([]);
  @Input() reviewsPagination = signal<IPaginationMeta>({} as IPaginationMeta);

  onPageChange(page: number) {
    this.reviewFilter.update((curr) => ({ ...curr, page }));
    this.getReviews();
  }

  getReviews() {
    this.getReviewsCalled.emit(this.reviewFilter());
  }

  getAverageRating() {
    this.getAvarageRatingCalled.emit();
  }

  ngOnInit(): void {
    console.log('Revies');
    this.getReviews();
    this.getAverageRating();
  }
}
