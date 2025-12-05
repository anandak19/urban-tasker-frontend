import { UserRoles } from '@shared/constants/enums/user.enum';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

export interface ILoginData {
  email: string;
  password: string;
}

export interface ICurrentUser {
  id: string;
  email: string;
  userRole: UserRoles;
  iat?: number;
  exp?: number;
}

export interface IisLoginData {
  user: ICurrentUser;
}

export type IisLoginResponse = IApiResponseSuccess<IisLoginData>;
