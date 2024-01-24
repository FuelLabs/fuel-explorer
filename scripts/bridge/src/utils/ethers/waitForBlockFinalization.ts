import { bn } from 'fuels';

import type { FuelChainState } from '../../../fuel-bridge/portal-contracts';
import type { CommitBlockHeader } from '../types';

import { computeBlockHash } from './computeBlockHash';

export async function waitForBlockFinalization(
  fuelChainState: FuelChainState,
  commitBlockHeader: CommitBlockHeader
) {
  return new Promise((resolve) => {
    console.log('Waiting for block to be finalized on L1...');
    function onBlock() {
      fuelChainState
        .finalized(
          computeBlockHash(commitBlockHeader),
          Number(bn(commitBlockHeader.height))
        )
        .then((isFinalized) => {
          if (isFinalized) {
            fuelChainState.provider.removeListener('block', onBlock);
            console.log('Block is finalized on L1');
            resolve(true);
          }
        })
        .catch(() => {});
    }
    fuelChainState.provider.addListener('block', onBlock);
  });
}
