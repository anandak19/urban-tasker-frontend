import { TaskerApplicationStatus } from '@shared/constants/enums/application-status.enum';
import { IBaseTaskerApplication } from '@shared/models/tasker-applications.model';

export interface ITaskerApplicationListItem
  extends Omit<IBaseTaskerApplication, 'idProof'> {
  applicationStatus: TaskerApplicationStatus;
  id: string;
}
