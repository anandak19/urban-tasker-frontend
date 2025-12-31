import { TaskerApplicationStatus } from '@shared/constants/enums/application-status.enum';
import { IOptionData } from '@shared/models/form-inputs.model';
import {
  IApplicationStatusInfo,
  IBaseTaskerApplication,
} from '@shared/models/tasker-applications.model';

export interface ITaskerApplicationListItem
  extends Omit<IBaseTaskerApplication, 'idProof'> {
  applicationStatus: TaskerApplicationStatus;
  id: string;
}

export interface IApplicationStatusInfoForm
  extends Omit<IApplicationStatusInfo, 'applicationStatus'> {
  applicationStatus: IOptionData;
}
