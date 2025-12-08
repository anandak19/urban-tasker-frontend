import { WeekDays, WeekDayKeys } from '../constants/week-days.constant';

export interface ISlot {
  start: string;
  end: string;
}

export interface ISlotDoc extends ISlot {
  id: string;
}

export interface ICreateAvailability {
  taskerId: string;
  day: WeekDays;
  slots: ISlot[];
}

export interface IAvailability extends Omit<ICreateAvailability, 'slots'> {
  id: string;
  slots: ISlotDoc[];
  createdAt?: Date;
  updatedAt?: Date;
}

// modal
export interface ISlotModalBase {
  day: WeekDayKeys;
}

export interface ISlotModalData extends ISlotModalBase {
  availabilityId: string;
  slot: ISlotDoc;
}

// resonse shape
export type IMappedAvailability = Partial<Record<WeekDayKeys, IAvailability>>;
