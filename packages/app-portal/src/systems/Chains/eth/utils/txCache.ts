const BLOCK_DATE_KEY_SUBSTRING = 'ethBlockDate-';
const HASH_DONE_KEY_SUBSTRING = 'ethToFuelTx';

export const EthTxCache = {
  getBlockDate: (blockHash: string) => {
    return localStorage.getItem(generateBlockDateKey(blockHash));
  },
  setBlockDate: (blockHash: string, blockDate: string) => {
    return localStorage.setItem(generateBlockDateKey(blockHash), blockDate);
  },
  getTxIsDone: (blockHash: string) => {
    return localStorage.getItem(generateHashDoneKey(blockHash));
  },
  setTxIsDone: (blockHash: string) => {
    return localStorage.setItem(generateHashDoneKey(blockHash), 'true');
  },
  clean: () => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.includes(BLOCK_DATE_KEY_SUBSTRING) ||
        key.includes(HASH_DONE_KEY_SUBSTRING)
      ) {
        localStorage.removeItem(key);
      }
    });
  },
};

const generateBlockDateKey = (blockHash: string) => {
  return `${BLOCK_DATE_KEY_SUBSTRING}${blockHash}`;
};

const generateHashDoneKey = (blockhash: string) => {
  return `${HASH_DONE_KEY_SUBSTRING}${blockhash}-done`;
};
