export interface BasicData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface SignupData {
  basicData: BasicData | null;
  password: string | null;
}

export interface Passwords {
  password: string | null;
  confirmPassword: string | null;
}
