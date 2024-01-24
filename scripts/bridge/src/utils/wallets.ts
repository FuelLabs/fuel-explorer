import { ethers } from 'ethers';
import type { WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

export const ethProvider = new ethers.providers.JsonRpcProvider(
  'http://localhost:8545'
);
export const ethWallet = new ethers.Wallet(
  '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
  ethProvider
);
export const fuelProvider = new Provider('http://localhost:4000/graphql');
export const fuelWallet: WalletUnlocked = Wallet.fromPrivateKey(
  '0xba9e8401405cd4327119548bccf0cd8b195c3fb716c848d9571c60bb230c6978',
  fuelProvider
);
