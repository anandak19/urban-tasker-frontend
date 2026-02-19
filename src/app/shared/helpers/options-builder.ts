import { IOptionData } from '@shared/models/form-inputs.model';

export const toOptionData = (id: string, label: string): IOptionData => {
  return {
    id,
    label,
  };
};
