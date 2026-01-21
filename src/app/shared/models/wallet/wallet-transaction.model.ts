import {
  WalletTransactionSource,
  WalletTransactionType,
} from '@shared/constants/enums/wallet.enum';

export interface IListWalletTransaction {
  id: string;
  type: WalletTransactionType;
  amount: number;
  balanceAfter?: number;
  source: WalletTransactionSource;
  isSuccess: boolean;
}

export interface DetaildWalletTransaction extends IListWalletTransaction {
  walletId: string;
  userId: string;
}

export const MOCK_WALLET_TRANSACTIONS: IListWalletTransaction[] = [
  {
    id: 'tx_001',
    type: WalletTransactionType.CREDIT,
    amount: 1500,
    balanceAfter: 1500,
    source: WalletTransactionSource.PAYMENT,
    isSuccess: true,
  },
  {
    id: 'tx_002',
    type: WalletTransactionType.DEBIT,
    amount: 500,
    balanceAfter: 1000,
    source: WalletTransactionSource.WITHDRAWAL,
    isSuccess: true,
  },
  {
    id: 'tx_003',
    type: WalletTransactionType.CREDIT,
    amount: 800,
    balanceAfter: 1800,
    source: WalletTransactionSource.REFUND,
    isSuccess: true,
  },
  {
    id: 'tx_004',
    type: WalletTransactionType.DEBIT,
    amount: 300,
    balanceAfter: 1500,
    source: WalletTransactionSource.WITHDRAWAL,
    isSuccess: false,
  },
  {
    id: 'tx_005',
    type: WalletTransactionType.CREDIT,
    amount: 200,
    balanceAfter: 1700,
    source: WalletTransactionSource.ADMIN_ADJUSTMENT,
    isSuccess: true,
  },
];
