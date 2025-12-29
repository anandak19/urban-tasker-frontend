import { IUserData } from '@features/admin/models/user-data.interface';

export type IPersonalDetails = Pick<
  IUserData,
  'firstName' | 'lastName' | 'phone' | 'gender'
>;

export interface IChangePassoword {
  oldPassword: string;
  newPassword: string;
}
