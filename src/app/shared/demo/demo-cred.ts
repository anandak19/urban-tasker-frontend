import { ILoginData } from '@shared/models/auth.model';

export type IDemoLoginData = ILoginData & { firstName: string };

export const user_cred: IDemoLoginData = {
  email: 'lajat21219@imashr.com',
  password: 'Abcd123',
  firstName: 'Arjun',
};

export const tasker_cred: IDemoLoginData = {
  email: 'sawori5750@codgal.com',
  password: 'Abcd123',
  firstName: 'Sharon',
};
