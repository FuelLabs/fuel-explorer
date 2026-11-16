import { defineWalletSetup } from '@synthetixio/synpress';
import { importMetaMaskWallet } from '../../../tests/hard/bridge/utils/importMetaMaskWallet';

const PASSWORD = process.env.ETH_WALLET_PASSWORD || 'SynpressIsAwesomeNow!!!';
const SEED_PHRASE =
  process.env.ETH_MNEMONIC ||
  'test test test test test test test test test test test junk';

export default defineWalletSetup(PASSWORD, async (_context, walletPage) => {
  await importMetaMaskWallet(walletPage, SEED_PHRASE, PASSWORD);
});
