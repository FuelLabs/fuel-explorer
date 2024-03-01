import { syncAllBlocks } from '~/application/uc/SyncAllBlocks';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { syncTransactions } from '~/application/uc/SyncTransactions';

export const inngestFunctions = [
  syncAllBlocks,
  syncMissingBlocks,
  syncTransactions,
];
