import { IDropdownOption } from '@shared/models/form-inputs.model';
import { Gender } from '../enums/user.enum';

export const genders: IDropdownOption[] = [
  {
    id: Gender.MALE,
    label: Gender.MALE,
  },
  {
    id: Gender.FEMALE,
    label: Gender.FEMALE,
  },
  {
    id: Gender.OTHER,
    label: Gender.OTHER,
  },
];
