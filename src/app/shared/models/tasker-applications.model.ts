import { TaskerApplicationStatus } from '@shared/constants/enums/application-status.enum';

export interface IIdProof {
  idProofType: string;
  frontImage: string;
  backImage: string;
}

export interface IBaseTaskerApplication {
  firstName: string;
  lastName: string;
  city: string;
  hourlyRate: string | number;
}

export interface IWorkCategoriesObject {
  name: string;
  id: string;
}

export interface ITaskerApplication extends IBaseTaskerApplication {
  workCategories: IWorkCategoriesObject[];
  applicationStatus: TaskerApplicationStatus;
  idProof: IIdProof;
  adminFeedback: string;
  id: string;
}
