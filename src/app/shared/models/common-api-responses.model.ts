import { IApiResponseSuccess } from './api-response.model';
import { IOptionData } from './form-inputs.model';
import { ITaskerApplication } from './tasker-applications.model';

export type TTaskerApplicationResponse =
  IApiResponseSuccess<ITaskerApplication>;

export type IOptionResponse = IApiResponseSuccess<IOptionData[]>;
