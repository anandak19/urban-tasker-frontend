import { TaskStatus } from '@shared/constants/enums/task-size.enum';

export interface ITaskerTask {
  id: string;

  userId: string;
  subcategoryId: string;

  categoryName: string;

  clientFirstName: string;
  clientLastName: string;

  date: string;
  time: string;

  taskStatus: TaskStatus;
  isAccepted: boolean;

  image: string;
}
