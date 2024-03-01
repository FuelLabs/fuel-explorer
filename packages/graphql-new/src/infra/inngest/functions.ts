import { syncAllBlocks } from '~/application/uc/SyncAllBlocks';
import { syncChainInfo } from '~/application/uc/SyncChainInfo';
import { syncContract } from '~/application/uc/SyncContract';
import { syncInputs } from '~/application/uc/SyncInputs';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { syncOutputs } from '~/application/uc/SyncOutputs';
import { syncTransactions } from '~/application/uc/SyncTransactions';

export const inngestFunctions = [
  syncAllBlocks,
  syncMissingBlocks,
  syncTransactions,
  syncInputs,
  syncOutputs,
  syncContract,
  syncChainInfo,
];
