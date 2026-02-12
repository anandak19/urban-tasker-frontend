import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { IListPayment } from '@features/admin/models/payment.model';
import { PaymentManagementService } from '@features/admin/services/payment/payment-management.service';
import { PaymentStatus } from '@shared/constants/enums/payment-status.enum';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-view-one-payment',
  imports: [
    TitleCasePipe,
    DecimalPipe,
    CommonModule,
    AdminPageTitleComponent,
    BackButtonComponent,
  ],
  templateUrl: './view-one-payment.component.html',
  styleUrl: './view-one-payment.component.scss',
})
export class ViewOnePaymentComponent implements OnInit {
  @Input() paymentId!: string;
  payment!: IListPayment;

  samplePayment: IListPayment = {
    id: 'sdfsdfd',
    paymentId: 'pay_RPzA1b2C3D4E5',
    sender: 'Anantha Krishnan',
    receiver: 'Urban Tasker Platform',
    amount: 499.0,
    tskId: 'task_65f1a9c2b8e14a0012ab34cd',
    status: PaymentStatus.PAID,
    receiptId: 'rcpt_UT_20260123_001',
    paidAt: new Date('2026-01-23T10:42:15.000Z'),
  };

  private _paymentManagementService = inject(PaymentManagementService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  getPaymentDetails() {
    // this.payment = this.samplePayment;
    this._paymentManagementService
      .findOnePayment(this.paymentId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.payment = res.data;
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.getPaymentDetails();
  }
}
