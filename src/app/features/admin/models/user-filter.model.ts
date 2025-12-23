import { UserRoles } from '@shared/constants/enums/user.enum';
import { IBaseFilters } from '@shared/models/request-data.model';

export interface IUserFilter extends IBaseFilters {
  role: UserRoles | null;
}
