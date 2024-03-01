import { syncAllBlocks } from '~/application/uc/SyncAllBlocks';
import { syncChainInfo } from '~/application/uc/SyncChainInfo';
import { syncContract } from '~/application/uc/SyncContract';
import { syncInputs } from '~/application/uc/SyncInputs';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { syncOutputs } from '~/application/uc/SyncOutputs';
import { syncPredicate } from '~/application/uc/SyncPredicate';
import { syncTransactions } from '~/application/uc/SyncTransactions';

export const inngestFunctions = [
  syncAllBlocks,
  syncChainInfo,
  syncContract,
  syncInputs,
  syncMissingBlocks,
  syncOutputs,
  syncPredicate,
  syncTransactions,
];
