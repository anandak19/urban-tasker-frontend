import { IDropdownOption } from '@shared/models/form-inputs.model';
import { IBaseTaskerApplication } from '@shared/models/tasker-applications.model';

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
