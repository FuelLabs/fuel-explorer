import type { Hex } from 'viem';

// The BlockHeader structure.
export type MessageBlockHeader = {
  prevRoot: string;
  height: string;
  timestamp: string;
  daHeight: string;
  txCount: string;
  outputMessagesCount: string;
  txRoot: string;
  outputMessagesRoot: string;
  consensusParametersVersion: bigint;
  stateTransitionBytecodeVersion: bigint;
  eventInboxRoot: string;
};

// The BlockHeader structure.
export type CommitBlockHeader = {
  prevRoot: string;
  height: string;
  timestamp: string;
  applicationHash: string;
};

// The MessageOut structure.
export type Message = {
  sender: string;
  recipient: string;
  amount: string;
  nonce: string;
  data: string;
};

export type Proof = {
  key: string;
  proof: Array<string>;
};

export type EthLog = {
  recipient: string;
  args: {
    nonce: bigint;
  };
  blockHash: string;
  data: Hex;
  topics: [signature: Hex, ...args: Hex[]] | [];
  transactionHash: string;
};
