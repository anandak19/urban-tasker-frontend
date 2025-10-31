import { IApiResponseSuccess } from '@shared/models/api-response.model';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IisLoginData {
  message: string;
  user: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export type IisLoginResponse = IApiResponseSuccess<IisLoginData>;
