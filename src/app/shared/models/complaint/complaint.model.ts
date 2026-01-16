import { ComplaintStatus } from '@shared/constants/enums/complaint-status.enum';

export interface IListComplaint {
  id: string;
  cmpId: string;
  complaint: string;
  createdBy: string;
  complaintStatus: ComplaintStatus;
}

export interface IComplaintDetails extends Omit<IListComplaint, 'createdBy'> {
  taskId: string;
  adminFeedback?: string;
  imageUrls: string[];
}
