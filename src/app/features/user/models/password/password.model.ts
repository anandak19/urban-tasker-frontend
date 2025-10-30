export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  resetToken: string;
}
