import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaymentStatus } from '@shared/constants/enums/payment-status.enum';
import { IPayment } from '@shared/models/booking.model';

@Component({
  selector: 'app-payment-details-box',
  imports: [CurrencyPipe],
  templateUrl: './payment-details-box.component.html',
  styleUrl: './payment-details-box.component.scss',
})
export class PaymentDetailsBoxComponent {
  paymentStatus = PaymentStatus;

  @Input() payment: IPayment | null = null;
}
