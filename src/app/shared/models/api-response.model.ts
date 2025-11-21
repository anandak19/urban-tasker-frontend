// normal api response
export interface IBaseApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  timestamp: string;
}

// success api response
export interface IApiResponseSuccess<T> extends IBaseApiResponse {
  data: T;
}

// error api respose
export interface IApiResponseError extends IBaseApiResponse {
  path: string;
}

// Find All Response - Meta Data
export interface IMetaData {
  limit: number;
  page: number;
  pages: number;
  total: number;
}

// Find all api response - Data
export interface IFindAllResponseData<T> {
  documents: T[];
  meta: IMetaData;
}
