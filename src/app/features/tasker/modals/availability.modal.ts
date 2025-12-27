import { WeekDays, WeekDayKeys } from '../constants/week-days.constant';

export interface ISlot {
  day: number;
  start: string;
  end: string;
}

export interface ISlotDoc extends ISlot {
  id: string;
  isActive: boolean;
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

// modal data shape for add slot
export interface ISlotModalBase {
  day: WeekDayKeys;
}

// modal data for edit slot
export interface ISlotModalData {
  day: WeekDayKeys;
  slot?: IAvailabilitySlotData;
}

export interface IAvailabilitySlotData extends Omit<ISlot, 'taskerId'> {
  isActive: boolean;
  id: string;
}

export interface IAvailabilityMap extends Pick<ISlot, 'day'> {
  slots: IAvailabilitySlotData[];
}

// resonse shape
export type IMappedAvailability = Partial<
  Record<WeekDayKeys, IAvailabilityMap>
>;
