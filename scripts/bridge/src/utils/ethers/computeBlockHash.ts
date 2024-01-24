import { sha256, solidityPacked } from 'ethers';

import type { CommitBlockHeader } from '../types';

// Produce the block consensus header hash
export function computeBlockHash(blockHeader: CommitBlockHeader): string {
  const serialized = solidityPacked(
    ['bytes32', 'uint32', 'uint64', 'bytes32'],
    [
      blockHeader.prevRoot,
      blockHeader.height,
      blockHeader.timestamp,
      blockHeader.applicationHash,
    ]
  );
  return sha256(serialized);
}
