import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '../api-response.model';
import { IListWalletTransaction } from './wallet-transaction.model';

export type IFindAllWalletTransactionResponse = IApiResponseSuccess<
  IFindAllResponseData<IListWalletTransaction>
>;
