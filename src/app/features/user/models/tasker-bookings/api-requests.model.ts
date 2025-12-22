import { TaskStatus } from '@shared/constants/enums/task-size.enum';
import { IBaseFilters } from '@shared/models/request-data.model';

export interface IListBookingQuery extends IBaseFilters {
  taskStatus?: TaskStatus;
}
