import { bn } from 'fuels';
import type { Address } from 'viem';

import type { GetReceiptsInfoReturn } from '../services';

const BLOCK_DATE_KEY_SUBSTRING = 'ethBlockDate-';
const HASH_DONE_KEY_SUBSTRING = 'ethToFuelTx';
const TX_CREATED_KEY_SUBSTRING = 'ethTxCreated';
const TX_RECEIPT_KEY_SUBSTRING = 'ethToFuelTxReceipt';

export const EthTxCache = {
  getBlockDate: (blockHash: string) => {
    return !!blockHash && localStorage.getItem(generateBlockDateKey(blockHash));
  },
  setBlockDate: (blockHash: string, blockDate: string) => {
    return localStorage.setItem(generateBlockDateKey(blockHash), blockDate);
  },
  getTxIsDone: (blockHash: string) => {
    return (
      !!blockHash &&
      localStorage.getItem(generateHashDoneKey(blockHash)) === 'true'
    );
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
  setTxIsCreated: (txId: string) => {
    localStorage.setItem(generateTxCreatedKey(txId), 'true');
  },
  removeTxCreated: (txId: string) => {
    localStorage.removeItem(generateTxCreatedKey(txId));
  },
  getTxIsCreated: (txId: string) => {
    return localStorage.getItem(generateTxCreatedKey(txId)) === 'true';
  },
  setTxReceipt: (txId: string, receiptInfo: GetReceiptsInfoReturn) => {
    const receiptInfoToStringify = {
      ...receiptInfo,
      erc20Token: receiptInfo.erc20Token && {
        ...receiptInfo.erc20Token,
        totalSupply: {
          ...receiptInfo.erc20Token?.totalSupply,
          value: receiptInfo.erc20Token?.totalSupply.value.toString(),
        },
      },
      nonce: receiptInfo.nonce?.toString(),
      amount: receiptInfo.amount?.toString(),
      blockdate: receiptInfo.blockDate?.toUTCString(), // This is necessary bc stringyfing a Date type loses info
    };
    const stringifiedReceipt = JSON.stringify(receiptInfoToStringify);
    localStorage.setItem(generateTxReceiptKey(txId), stringifiedReceipt);
  },
  getTxReceipt: (txId: string): GetReceiptsInfoReturn | null => {
    const stringifiedReceipt = localStorage.getItem(generateTxReceiptKey(txId));
    if (!stringifiedReceipt) {
      return null;
    }
    const parsedReceipt = JSON.parse(stringifiedReceipt) as Omit<
      GetReceiptsInfoReturn,
      'erc20Token' | 'nonce' | 'amount'
    > & {
      nonce: string;
      amount: string;
      erc20Token?: {
        address: Address;
        decimals: number;
        name: string;
        symbol: string;
        totalSupply: {
          formatted: string;
          value: string;
        };
      };
    };
    const typedReceipt = {
      ...parsedReceipt,
      erc20Token: parsedReceipt.erc20Token && {
        ...parsedReceipt.erc20Token,
        totalSupply: {
          ...parsedReceipt.erc20Token.totalSupply,
          value: BigInt(parsedReceipt.erc20Token.totalSupply.value),
        },
      },
      nonce: bn(parsedReceipt.nonce),
      amount: bn(parsedReceipt.amount),
      blockDate: new Date(parsedReceipt.blockDate!),
    };
    return typedReceipt;
  },
};

const generateBlockDateKey = (blockHash: string) => {
  return `${BLOCK_DATE_KEY_SUBSTRING}${blockHash}`;
};

const generateHashDoneKey = (blockhash: string) => {
  return `${HASH_DONE_KEY_SUBSTRING}${blockhash}-done`;
};

const generateTxCreatedKey = (txId: string) => {
  return `${TX_CREATED_KEY_SUBSTRING}-${txId}`;
};

const generateTxReceiptKey = (txId: string) => {
  return `${TX_RECEIPT_KEY_SUBSTRING}-${txId}`;
};
