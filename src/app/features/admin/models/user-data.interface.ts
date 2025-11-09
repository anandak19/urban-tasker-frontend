import { IApiResponseSuccess } from '@shared/models/api-response.model';

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userRole: string;
  isTaskerApplied: string;
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
