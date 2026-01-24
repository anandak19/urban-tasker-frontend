import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { AdminTableFiltersComponent } from '@features/admin/components/admin-table-filters/admin-table-filters.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import {
  IListPayment,
  IListPaymentsQuery,
} from '@features/admin/models/payment.model';
import { PaymentManagementService } from '@features/admin/services/payment/payment-management.service';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { PaymentStatus } from '@shared/constants/enums/payment-status.enum';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-list-payments',
  imports: [
    TableListingComponent,
    PaginationComponent,
    AdminTableFiltersComponent,
    AdminPageTitleComponent,
    DropdownComponent,
    FormsModule,
  ],
  templateUrl: './list-payments.component.html',
  styleUrl: './list-payments.component.scss',
})
export class ListPaymentsComponent implements OnInit {
  payments = signal<IListPayment[]>([]);

  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 0,
  });

  filter = signal<IListPaymentsQuery>({
    page: 1,
    limit: 5,
  });

  //col
  paymentsColumns: IMatColumns[] = [
    { label: 'Receipt-ID', key: 'receiptId' },
    { label: 'Payment-ID', key: 'paymentId' },
    { label: 'Amount', key: 'amount' },
    { label: 'Sender', key: 'sender' },
    { label: 'Receiver', key: 'receiver' },
    { label: 'Payment Status', key: 'status' },
  ] as const;

  paymentStatus = PaymentStatus;

  private _paymentManagementService = inject(PaymentManagementService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  onPageChange(page: number) {
    this.filter.update((curr) => ({
      ...curr,
      page: page,
    }));
    this.getAllPayments();
  }

  onPaymentStatusChange(status: PaymentStatus) {
    this.filter.update((curr) => ({
      ...curr,
      paymentStatus: status,
    }));
    this.getAllPayments();
  }

  getAllPayments() {
    this._paymentManagementService
      .findAllPayments(this.filter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.payments.set(res.data.documents);
          this.pagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  selectedStatus: PaymentStatus | '' = '';

  onStatusChange() {
    this.filter.update((curr) => {
      if (!this.selectedStatus) {
        const { paymentStatus, ...rest } = curr;
        console.log(paymentStatus);
        return rest;
      }

      return {
        ...curr,
        paymentStatus: this.selectedStatus,
      };
    });
    this.getAllPayments();
  }

  viewPayment(id: string) {
    this._router.navigate([id], { relativeTo: this._route });
  }

  ngOnInit(): void {
    this.getAllPayments();
  }
}
