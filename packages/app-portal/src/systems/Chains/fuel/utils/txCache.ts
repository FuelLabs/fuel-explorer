const HASH_DONE_KEY_SUBSTRING = 'fuelToEthTx';
const TX_CREATED_KEY_SUBSTRING = 'fuelTxCreated';
const TX_TIME_TO_FINALIZE = 'fuelTxTimeToFinalize';
const TX_TIME_TO_NEXT_COMMIT = 'fuelTxTimeToNextCommit';

export const FuelTxCache = {
  getTxIsDone: (blockHash: string) => {
    return (
      !!blockHash &&
      localStorage.getItem(generateHashDoneKey(blockHash)) === 'true'
    );
  },
  setTxIsDone: (blockHash: string) => {
    return localStorage.setItem(generateHashDoneKey(blockHash), 'true');
  },
  setTxTimeToFinalize: (txId: string, timestamp: number) => {
    return localStorage.setItem(
      `${TX_TIME_TO_FINALIZE}${txId}`,
      `${timestamp}`,
    );
  },
  getTxTimeToFinalize: (txId: string) => {
    return localStorage.getItem(`${TX_TIME_TO_FINALIZE}${txId}`);
  },
  setTxTimeToNextCommit: (txId: string, timestamp: number) => {
    return localStorage.setItem(
      `${TX_TIME_TO_NEXT_COMMIT}${txId}`,
      `${timestamp}`,
    );
  },
  getTxTimeToNextCommit: (txId: string) => {
    return localStorage.getItem(`${TX_TIME_TO_NEXT_COMMIT}${txId}`);
  },
  clean: () => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.includes(HASH_DONE_KEY_SUBSTRING) ||
        key.includes(TX_TIME_TO_FINALIZE) ||
        key.includes(TX_TIME_TO_NEXT_COMMIT)
      ) {
        localStorage.removeItem(key);
      }
    });
  },
  setTxIsCreated: (txId: string) => {
    localStorage.setItem(generateTxCreatedKey(txId), 'true');
  },
  removeTxCreated: (txId: string) => {
    localStorage.removeItem(generateTxCreatedKey(txId));
  },
  getTxIsCreated: (txId: string) => {
    return localStorage.getItem(generateTxCreatedKey(txId)) === 'true';
  },
};

const generateHashDoneKey = (blockhash: string) => {
  return `${HASH_DONE_KEY_SUBSTRING}${blockhash}-done`;
};

const generateTxCreatedKey = (txId: string) => {
  return `${TX_CREATED_KEY_SUBSTRING}-${txId}`;
};
