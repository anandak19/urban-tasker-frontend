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
  idProof: IIdProof;
}

export interface IWorkCategoriesObject {
  name: string;
  id: string;
}

export enum TaskerApplicationStatus {
  REJECTED = 'rejected',
  APPROVED = 'approved',
  PENDING = 'pending',
}

export interface ITaskerApplication extends IBaseTaskerApplication {
  workCategories: IWorkCategoriesObject[];
  applicationStatus: TaskerApplicationStatus;
  adminFeedback: string;
}
