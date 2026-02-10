import { Component, Input } from '@angular/core';
import {
  IWalletDetails,
  SAMPLE_WALLET_DETAILS,
} from '@shared/models/wallet/wallet.model';

@Component({
  selector: 'app-wallet-details',
  imports: [],
  templateUrl: './wallet-details.component.html',
  styleUrl: './wallet-details.component.scss',
})
export class WalletDetailsComponent {
  @Input() walletDetails: IWalletDetails | null = SAMPLE_WALLET_DETAILS;
}
