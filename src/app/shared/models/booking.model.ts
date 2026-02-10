import { TaskSize, TaskStatus } from '@shared/constants/enums/task-size.enum';
import { ILocation } from './location.model';
import { PaymentStatus } from '@shared/constants/enums/payment-status.enum';

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

export interface ITaskTimes {
  taskStartTime: Date;
  taskEndTime?: Date;
  currentBreakStartTime?: Date;
  currentBreakEndTime?: Date;
  totalBreakTime: number; // in sec
  totalTaskTime: number;
}

export interface IPayment {
  totalAmount: number; // service charge
  platFormFee: number;
  subTotal: number;
  tipAmount: number;
  payableAmount: number; // final amount
  paymentStatus: PaymentStatus;
}

// show details of booking
export interface IBookingDetails extends IBookingListing {
  description: string;
  location: ILocation;
  taskSize: TaskSize;
  taskTimes?: ITaskTimes;
  isOnBreak?: boolean;
  payment?: IPayment;
}
