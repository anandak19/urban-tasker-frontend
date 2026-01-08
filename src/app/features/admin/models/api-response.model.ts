import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '@shared/models/api-response.model';
import { ICategoryData } from './category.interface';
import { ITaskerApplicationListItem } from './tasker-application.model';
import { IBookingDetails } from '@features/user/models/tasker-bookings/tasker-bookings.model';

// Find All Categories API Response
export type IFindAllCategoriesResponse = IApiResponseSuccess<
  IFindAllResponseData<ICategoryData>
>;

export type IOneCategoryResponse = IApiResponseSuccess<ICategoryData>;

// tasker applications
export type IFindAllTaskerApplicationsResponse = IApiResponseSuccess<
  IFindAllResponseData<ITaskerApplicationListItem>
>;

export type IFindAllBookingsResponse = IApiResponseSuccess<
  IFindAllResponseData<IBookingDetails>
>;
