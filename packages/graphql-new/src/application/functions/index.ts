import { SyncBlocksEvent } from './SyncBlocksEvent';
import { SyncMissingBlocksEvent } from './SyncMissingBlocksEvent';
import { SyncTransactions } from './SyncTransactions';

export const functions = [
  SyncBlocksEvent,
  SyncMissingBlocksEvent,
  SyncTransactions,
];
