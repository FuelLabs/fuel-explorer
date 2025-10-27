import type { GetSequencerCommitmentInclusionProofResponse } from '~staking/systems/Withdraw/types/proof';

import { COSMOS_INDEXER_API } from 'app-commons';

export async function fetchWithdrawProof(nonce: string) {
  const url = new URL('/seq/proof', COSMOS_INDEXER_API);
  url.searchParams.append('nonce', nonce);
  const result: GetSequencerCommitmentInclusionProofResponse = await fetch(
    url.toString(),
  ).then((response) => response.json());
  if ('error' in result) {
    throw new Error(result.error as string);
  }
  return result;
}
