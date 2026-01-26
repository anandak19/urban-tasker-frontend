import { PaymentStatus } from '@shared/constants/enums/payment-status.enum';
import { IBaseFilters } from '@shared/models/request-data.model';

export interface IListPayment {
  id: string;
  paymentId: string;

  sender: string;
  receiver: string;

  amount: number;

  tskId: string;

  status: PaymentStatus;

  receiptId: string;

  paidAt: Date;
}

export interface IListPaymentsQuery extends IBaseFilters {
  paymentStatus?: PaymentStatus;
}
