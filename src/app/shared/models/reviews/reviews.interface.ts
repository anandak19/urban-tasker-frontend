import { ICreateReview } from '@features/user/models/review/review.model';

export interface IReviews extends ICreateReview {
  userName: string;
  createdAt: Date;
  id: string;
}

export interface IAverageRating {
  rating: number;
  totalRatings: number;
}
