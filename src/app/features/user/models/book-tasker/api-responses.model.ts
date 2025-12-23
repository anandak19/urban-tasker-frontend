import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IListTasker } from '../tasker/tasker.model';

export type IListTaskersResponse = IApiResponseSuccess<IListTasker[]>;
