import { WalletStatus } from '@shared/constants/enums/wallet.enum';

export interface IWalletDetails {
  id: string;
  userId: string;
  currentBalance: number;
  totalEarnings: number;
  totalWithdrawn: number;
  lastCreditAmount: number;
  lastDebitAmount: number;
  status: WalletStatus;
}

export const SAMPLE_WALLET_DETAILS: IWalletDetails = {
  id: 'wallet_001',
  userId: 'user_123',
  currentBalance: 1700,
  totalEarnings: 2500,
  totalWithdrawn: 800,
  lastCreditAmount: 200,
  lastDebitAmount: 300,
  status: WalletStatus.ACTIVE,
};
