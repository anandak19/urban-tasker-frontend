import { TaskSize } from '@shared/constants/enums/task-size.enum';

export interface IBookTaskerAboutTask {
  categoryId: string;
  subcategoryId: string;
  description: string;
  taskSize: TaskSize;
}

export interface IBookTaskerTimePlace {
  date: string | Date;
  time: string;
  city: string;
  address: string;
}
