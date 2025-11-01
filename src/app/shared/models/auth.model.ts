export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginSuccessResponse {
  data: { accessToken: string };
}
