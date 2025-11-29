import { IApiResponseSuccess } from './api-response.model';
import { ITaskerApplication } from './tasker-applications.model';

export type TTaskerApplicationResponse =
  IApiResponseSuccess<ITaskerApplication>;
