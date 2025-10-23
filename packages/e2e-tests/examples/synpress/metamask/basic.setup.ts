import { defineWalletSetup } from '@synthetixio/synpress';
import { MetaMask } from '@synthetixio/synpress/playwright';

const PASSWORD = process.env.ETH_WALLET_PASSWORD || 'SynpressIsAwesomeNow!!!';
const SEED_PHRASE =
  process.env.ETH_MNEMONIC ||
  'test test test test test test test test test test test junk';

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD);
  await metamask.importWallet(SEED_PHRASE);
});
