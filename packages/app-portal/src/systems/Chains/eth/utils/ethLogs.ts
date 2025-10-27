import type { EthLog } from '../types';

export const parseQueriedDataToEthDepositLogs = (
  indexedQueriedData: any[],
): EthLog[] => {
  return indexedQueriedData.map((item: any) => {
    return {
      recipient: item.recipient,
      args: { nonce: BigInt(item.nonce) },
      blockHash: item.blockHash,
      data: item.data,
      topics: JSON.parse(item.topics),
      transactionHash: item.transactionHash,
    };
  });
};
