import { WeekDays, WeekDayKeys } from '../constants/week-days.constant';

export interface ISlot {
  start: string;
  end: string;
}

export interface ICreateAvailability {
  taskerId: string;
  day: WeekDays;
  slots: ISlot[];
}

export interface IAvailability extends ICreateAvailability {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// resonse shape
export type IMappedAvailability = Partial<Record<WeekDayKeys, IAvailability>>;
