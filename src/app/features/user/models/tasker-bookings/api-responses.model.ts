import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '@shared/models/api-response.model';
import { IBookingListing } from '@shared/models/booking.model';

export type IFindAllBookingsResponse = IApiResponseSuccess<
  IFindAllResponseData<IBookingListing>
>;
