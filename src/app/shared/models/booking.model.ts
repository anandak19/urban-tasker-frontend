import { TaskSize, TaskStatus } from '@shared/constants/enums/task-size.enum';
import { ILocation } from './location.model';

// listing bookings
export interface IBookingListing {
  categoryName: string;
  subcategoryId: string;
  image: string;

  date: string;
  time: string;
  city: string;

  taskStatus: TaskStatus;
  isAccepted: boolean;

  taskerId: string;
  taskerName: string;

  userId: string;
  userName: string;

  id: string;
}

// show details of booking
export interface IBookingDetails extends IBookingListing {
  description: string;
  location: ILocation;
  taskSize: TaskSize;
}
