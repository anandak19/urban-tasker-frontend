import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WalletTransactionType } from '@shared/constants/enums/wallet.enum';
import {
  IListWalletTransaction,
  MOCK_WALLET_TRANSACTIONS,
} from '@shared/models/wallet/wallet-transaction.model';

@Component({
  selector: 'app-wallet-transactions-listing',
  imports: [CommonModule],
  templateUrl: './wallet-transactions-listing.component.html',
  styleUrl: './wallet-transactions-listing.component.scss',
})
export class WalletTransactionsListingComponent {
  @Input() transactions: IListWalletTransaction[] = MOCK_WALLET_TRANSACTIONS;
  transactionType = WalletTransactionType;
}
