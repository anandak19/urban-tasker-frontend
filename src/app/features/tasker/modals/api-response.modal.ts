import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '@shared/models/api-response.model';
import { IMappedAvailability } from './availability.modal';
import { ITaskerTask } from './tasks.model';

export type IAvailabilitiesResponse = IApiResponseSuccess<IMappedAvailability>;

export type ITaskerTasksResponse = IApiResponseSuccess<
  IFindAllResponseData<ITaskerTask>
>;
