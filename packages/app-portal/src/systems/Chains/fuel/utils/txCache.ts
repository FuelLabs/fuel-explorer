const HASH_DONE_KEY_SUBSTRING = 'fuelToEthTx';

export const FuelTxCache = {
  getTxIsDone: (blockHash: string) => {
    return localStorage.getItem(generateHashDoneKey(blockHash));
  },
  setTxIsDone: (blockHash: string) => {
    return localStorage.setItem(generateHashDoneKey(blockHash), 'true');
  },
  clean: () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes(HASH_DONE_KEY_SUBSTRING)) {
        localStorage.removeItem(key);
      }
    });
  },
};

const generateHashDoneKey = (blockhash: string) => {
  return `${HASH_DONE_KEY_SUBSTRING}${blockhash}-done`;
};
