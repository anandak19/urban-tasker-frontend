import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IFindAllWalletTransactionResponse } from '@shared/models/wallet/api-response.model';
import { IWalletDetails } from '@shared/models/wallet/wallet.model';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private API_ENDPOINT = 'wallet';
  private _http = inject(HttpClient);

  getUserWallet() {
    return this._http.get<IApiResponseSuccess<IWalletDetails>>(
      this.API_ENDPOINT,
    );
  }

  getTransactionHistory(walletId: string) {
    return this._http.get<IFindAllWalletTransactionResponse>(
      `${this.API_ENDPOINT}/${walletId}`,
    );
  }
}
