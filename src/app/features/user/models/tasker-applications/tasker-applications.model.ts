import { TaskerApplicationStatus } from '@shared/constants/enums/application-status.enum';
import { IDropdownOption } from '@shared/models/form-inputs.model';
import { IBaseTaskerApplication } from '@shared/models/tasker-applications.model';

export interface IIdProof {
  idProofType: string;
  frontImage: string;
  backImage: string;
}

export interface IWorkCategoriesObject {
  name: string;
  id: string;
}

export interface ITaskerApplication extends IBaseTaskerApplication {
  workCategories: IWorkCategoriesObject[];
  applicationStatus: TaskerApplicationStatus;
  adminFeedback: string;
  id: string;
}

// Create tasker application
export interface ICreateTaskerApplication
  extends Omit<IBaseTaskerApplication, 'city' | 'idProof'> {
  workCategories: string[];
  city: IDropdownOption;
  idProof: {
    idProofType: IDropdownOption;
    frontImage: File | string;
    backImage: File | string;
  };
}
