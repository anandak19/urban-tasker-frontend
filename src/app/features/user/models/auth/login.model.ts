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
  firstName: string;
  lastName: string;
  profileImageUrl: string;
}

export type IisLoginResponse = IApiResponseSuccess<ICurrentUser>;
