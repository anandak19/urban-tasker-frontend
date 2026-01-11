import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '@shared/models/api-response.model';
import { IMappedAvailability } from './availability.modal';
import { IBookingListing } from '@shared/models/booking.model';

export type IAvailabilitiesResponse = IApiResponseSuccess<IMappedAvailability>;

export type ITaskerTasksResponse = IApiResponseSuccess<
  IFindAllResponseData<IBookingListing>
>;
