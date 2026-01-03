import { Gender } from '@shared/constants/enums/user.enum';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

export interface IGeoLocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IHomeAddress {
  // address: string;
  city: string;
  location: IGeoLocation;
}

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userRole: string;
  isTaskerApplied: string;
  isSuspended: boolean;
  suspendedReason: string;
  profileImageUrl?: string;
  gender?: Gender;
  homeAddress?: IHomeAddress;
}

export interface IPaginationMetadata {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface IGetAllUsersData {
  allUsers: IUserData[];
  metaData: IPaginationMetadata;
}

export type IGetAllUsersSuccessResponse = IApiResponseSuccess<IGetAllUsersData>;
export type IOneUserResponse = IApiResponseSuccess<IUserData>;
