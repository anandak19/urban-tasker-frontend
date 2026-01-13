import { TaskStatus } from '@shared/constants/enums/task-size.enum';

export interface IBaseFilters {
  page?: number | string;
  limit?: number | string;
  search?: string;
}

export interface ITaskFilter extends Omit<IBaseFilters, 'search'> {
  taskStatus?: TaskStatus;
}
