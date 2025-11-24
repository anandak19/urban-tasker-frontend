//not using
export interface ICreateTaskerApplication {
  firstName: string;
  latName: string;
  hourlyRate: string | number;
  city: string;
  workCategories: string[];
  idProof: {
    idProofType: string;
    frontImage: File | string;
    backImage: File | string;
  };
}
