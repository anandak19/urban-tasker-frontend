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

export interface IBookingDetails {
  id: string;

  categoryName: string;
  subcategoryId: string;
  image: string;

  date: string;
  time: string;

  taskStatus: TaskStatus;
  isAccepted: boolean;

  city: string;
  description: string;

  taskSize: TaskSize;

  taskerId: string;
  taskerName: string;

  userIdId: string;
  userName: string;
}
