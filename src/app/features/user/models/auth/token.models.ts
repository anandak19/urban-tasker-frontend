import { IApiResponseSuccess } from '@shared/models/api-response.model';

export interface ItokenData {
  accessToken: string;
}

export type IRefreshTokenResponse = IApiResponseSuccess<ItokenData>;
