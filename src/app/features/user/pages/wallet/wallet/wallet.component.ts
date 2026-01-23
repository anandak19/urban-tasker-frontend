import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { WalletDetailsComponent } from '@shared/components/feature/wallet/wallet-details/wallet-details.component';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { WalletTransactionsListingComponent } from '@shared/components/feature/wallet/wallet-transactions-listing/wallet-transactions-listing.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { IWalletDetails } from '@shared/models/wallet/wallet.model';
import { IListWalletTransaction } from '@shared/models/wallet/wallet-transaction.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import { WalletService } from '@features/user/services/wallet/wallet.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-wallet',
  imports: [
    PageTitleComponent,
    WalletDetailsComponent,
    WalletTransactionsListingComponent,
    PaginationComponent,
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent implements OnInit {
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
    console.log(this.walletDetails()?.id);
    console.log('Yas');

    //call the method to get the transaction history after wallet data is fetched
    this._walletService
      .getTransactionHistory(this.walletDetails()!.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.walletTransactions.set(res.data.documents);
          this.pagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
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
