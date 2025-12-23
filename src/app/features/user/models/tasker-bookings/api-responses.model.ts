import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '@shared/models/api-response.model';
import { IListBooking } from './tasker-bookings.model';

export type IFindAllBookingsResponse = IApiResponseSuccess<
  IFindAllResponseData<IListBooking>
>;
