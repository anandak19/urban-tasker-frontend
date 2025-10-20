import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IBasicUserData } from './signup.model';

export type IBasicDataResponse = IApiResponseSuccess<IBasicUserData>;
