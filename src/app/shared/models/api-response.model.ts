export interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  timestamp: string;
}

export interface IApiResponseSuccess<T> extends ApiResponse {
  data: T;
}

export interface IApiResponseError extends ApiResponse {
  path: string;
}
