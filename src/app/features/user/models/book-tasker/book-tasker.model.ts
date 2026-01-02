import { TaskSize } from '@shared/constants/enums/task-size.enum';

export interface IBookTaskerAboutTask {
  categoryId: string;
  subcategoryId: string;
  description: string;
  taskSize: TaskSize;
}

export interface IBookTaskerTimePlace {
  date: Date;
  time: string;
  city: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface IBookTaskerTasker {
  taskerId: string;
}

export type IBookTasker = IBookTaskerAboutTask &
  IBookTaskerTimePlace &
  IBookTaskerTasker;

//---------------------------
export interface IGetAvailTaskers
  extends Omit<IBookTaskerTimePlace, 'date' | 'address' | 'location'> {
  date: string;
  subcategoryId: string;
  latitude: number;
  longitude: number;
}
