import { syncAllBlocks } from '~/application/uc/SyncAllBlocks';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { syncTransactions } from '~/application/uc/SyncTransaction';

export const inngestFunctions = [
  syncAllBlocks,
  syncMissingBlocks,
  syncTransactions,
];
