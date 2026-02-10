import { ComplaintStatus } from '@shared/constants/enums/complaint-status.enum';

export interface IChangeComplaintStatus {
  complaintStatus: ComplaintStatus;
  adminFeedback?: string;
}
