import { Routes } from '@angular/router';
import { ListPaymentsComponent } from './pages/list-payments/list-payments.component';
import { ViewOnePaymentComponent } from './pages/view-one-payment/view-one-payment.component';

export const paymentRoutes: Routes = [
  {
    path: '',
    component: ListPaymentsComponent,
  },
  {
    path: ':paymentId',
    component: ViewOnePaymentComponent,
  },
];
