import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { WalletService } from '@features/user/services/wallet/wallet.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import { IListWalletTransaction } from '@shared/models/wallet/wallet-transaction.model';
import { IWalletDetails } from '@shared/models/wallet/wallet.model';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { WalletDetailsComponent } from '@shared/components/feature/wallet/wallet-details/wallet-details.component';
import { WalletTransactionsListingComponent } from '@shared/components/feature/wallet/wallet-transactions-listing/wallet-transactions-listing.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';

@Component({
  selector: 'app-earnings',
  imports: [
    PageTitleComponent,
    WalletDetailsComponent,
    WalletTransactionsListingComponent,
    PaginationComponent,
  ],
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.scss',
})
export class EarningsComponent {
  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 1,
  });

  walletDetails = signal<IWalletDetails | null>(null);
  walletTransactions = signal<IListWalletTransaction[]>([]);

  filter = signal<IBaseFilters>({
    page: 1,
    limit: 5,
  });

  private _walletService = inject(WalletService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  onPageChange(page: number) {
    this.filter.update((curr) => ({ page, ...curr }));
    this.getTransactionHistory();
  }

  getTransactionHistory() {
    //call the method to get the transaction history after wallet data is fetched
    this._walletService
      .getTransactionHistory(this.walletDetails()!.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.walletTransactions.set(res.data.documents);
          this.pagination.set(res.data.meta);
        },
      });
  }

  getUserWallet() {
    this._walletService
      .getUserWallet()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.walletDetails.set(res.data);
          this.getTransactionHistory();
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
    // call the method to get wallet of user
  }

  ngOnInit(): void {
    this.getUserWallet();
  }
}
