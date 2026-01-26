import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '@shared/models/api-response.model';
import { ICategoryData } from './category.interface';
import { ITaskerApplicationListItem } from './tasker-application.model';
import { IBookingListing } from '@shared/models/booking.model';
import { IListComplaint } from '@shared/models/complaint/complaint.model';
import { IListPayment } from './payment.model';

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
  IFindAllResponseData<IBookingListing>
>;

export type IFindAllComplaintsResponse = IApiResponseSuccess<
  IFindAllResponseData<IListComplaint>
>;

export type IFindAllPaymentsResponse = IApiResponseSuccess<
  IFindAllResponseData<IListPayment>
>;
