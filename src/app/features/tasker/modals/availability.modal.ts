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

// modal
export interface ISlotModalBase {
  day: WeekDayKeys;
}

export interface ISlotModalData extends ISlotModalBase {
  availabilityId: string;
  slot: ISlot;
}

// resonse shape
export type IMappedAvailability = Partial<Record<WeekDayKeys, IAvailability>>;
