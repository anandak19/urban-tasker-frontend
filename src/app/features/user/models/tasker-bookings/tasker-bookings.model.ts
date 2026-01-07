import { TaskSize, TaskStatus } from '@shared/constants/enums/task-size.enum';

export interface IListBooking {
  subcategoryId: string;
  categoryName: string;
  image: string;
  date: string;
  time: string;
  taskerId: string;
  taskerFirstName: string;
  taskerLastName: string;
  id: string;
}

export interface IBooking extends IListBooking {
  taskSize: TaskSize;
  description: string;
  city: string;
  taskStatus: TaskStatus;
}
