import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '../api-response.model';
import { IReviews } from './reviews.interface';

export type IFindAllReviewResponse = IApiResponseSuccess<
  IFindAllResponseData<IReviews>
>;
