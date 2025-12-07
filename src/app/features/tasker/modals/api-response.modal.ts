import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IMappedAvailability } from './availability.modal';

export type IAvailabilitiesResponse = IApiResponseSuccess<IMappedAvailability>;
