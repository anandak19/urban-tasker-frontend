export interface IBasicUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isVarified?: boolean;
}

export interface SignupData {
  basicData: IBasicUserData | null;
  password: string | null;
}

export interface Passwords {
  password: string | null;
  confirmPassword: string | null;
}
