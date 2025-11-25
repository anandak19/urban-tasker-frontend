import { IDropdownOption } from '@shared/models/form-inputs.model';

//not using
export interface ICreateTaskerApplication {
  firstName: string;
  lastName: string;
  hourlyRate: string | number;
  city: IDropdownOption;
  workCategories: string[];
  idProof: {
    idProofType: IDropdownOption;
    frontImage: File | string;
    backImage: File | string;
  };
}
