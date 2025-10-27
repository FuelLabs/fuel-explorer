export type SequencerCommitmentInclusionProof = {
  height: number | undefined;
  txIndex: number | undefined;
  start: BigInt | number | undefined;
  end: BigInt | number | undefined;
  ready: boolean;
};

interface BridgeCommitmentProof {
  total: number;
  index: number;
  leaf_hash: string;
  aunts: string[];
}

interface LastResultsProof {
  total: number;
  index: number;
  leaf_hash: string;
  aunts: string[];
}

interface BridgeCommitmentLeaf {
  height: number;
  last_results_hash: string;
}

export interface GetSequencerCommitmentInclusionProofResponse {
  proof: {
    bridge_commitment_proof: BridgeCommitmentProof;
    last_results_proof: LastResultsProof;
    bridge_commitment_leaf: BridgeCommitmentLeaf;
    tx_result_marshalled: string;
  };
  bridge_commitment_proof_nonce: string;
}
