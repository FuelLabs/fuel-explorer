import { ZeroBytes32 } from 'fuels';
import { setTimeout } from 'timers/promises';

import type { FuelChainState } from '../../../fuel-bridge/portal-contracts';
import type { CommitBlockHeader } from '../types';

// 5 seconds
const RETRY_DELAY = 5 * 1000;

export async function waitForBlockCommit(
  fuelChainState: FuelChainState,
  commitBlockHeader: CommitBlockHeader
): Promise<boolean> {
  console.log('Check block is commited on L1...');

  // check if the block is commited on L1 every second
  const commitHashAtL1 = await fuelChainState.blockHashAtCommit(
    commitBlockHeader.height
  );
  const isCommited = commitHashAtL1 !== ZeroBytes32;

  // If not commited, wait for TIMOUT_RETRY seconds and try again
  if (!isCommited) {
    console.log(
      `Block is not commited on L1. Auto-retry in ${RETRY_DELAY}ms...`
    );
    await setTimeout(RETRY_DELAY);
    return waitForBlockCommit(fuelChainState, commitBlockHeader);
  }

  // Return if is finalized
  console.log('Block is commited on L1');
  return isCommited;
}
