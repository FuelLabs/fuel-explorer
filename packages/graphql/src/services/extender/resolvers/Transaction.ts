/* eslint-disable @typescript-eslint/no-explicit-any */
import { bn } from '@fuel-ts/math';
import type { IResolvers } from '@graphql-tools/utils';
import { groupBy } from 'lodash';
import type {
  InputCoin,
  InputContract,
  InputMessage,
  TransactionItemFragment,
} from '~/lib';
import { tai64toDate } from '~/utils/dayjs';

export const Transaction: IResolvers<TransactionItemFragment> = {
  title: {
    resolve(transaction, _args, _context, _info) {
      if (transaction.isMint) {
        return 'Mint';
      }
      return 'ContractCall';
    },
  },
  time: {
    resolve(transaction, _args, _context, _info) {
      const status = transaction.status;
      if (status?.__typename === 'SqueezedOutStatus') return null;
      const time = status?.time ?? null;
      const date = tai64toDate(time);
      return {
        fromNow: date.fromNow(),
        full: date.format('DD MMM YYYY - HH:mm:ss A'),
        rawTai64: time.toString(),
        rawUnix: date.unix().toString(),
      };
    },
  },
  blockHeight: {
    resolve(transaction, _args, _context, _info) {
      const status = transaction.status;
      if (status?.__typename === 'SuccessStatus') {
        return status?.block?.header?.daHeight ?? null;
      }
      return null;
    },
  },
  statusType: {
    resolve(transaction, _args, _context, _info) {
      const typename = transaction.status?.__typename;
      if (typename === 'SuccessStatus') {
        return 'Success';
      }
      if (typename === 'FailureStatus') {
        return 'Failure';
      }
      return 'Submitted';
    },
  },
  totalAssets: {
    resolve(transaction, _args, _context, _info) {
      if (transaction.isMint) return 1;
      return transaction.inputAssetIds?.length ?? 0;
    },
  },
  totalOperations: {
    resolve(transaction, _args, _context, _info) {
      if (transaction.isMint) return 1;
      return transaction.inputs?.length ?? 0;
    },
  },
  totalAccounts: {
    resolve(transaction, _args, _context, _info) {
      if (transaction.isMint) return 1;

      const ids = transaction.inputs?.flatMap((input: any) => {
        const typename = input?.__typename;
        if (typename === 'InputCoin') {
          return input.owner;
        }
        if (typename === 'InputMessage') {
          return [input.sender, input.recipient];
        }
        if (typename === 'InputContract') {
          return input.contract.id;
        }
      });
      return ids?.length ?? 0;
    },
  },
  gasUsed: {
    resolve(transaction, _args, _context, _info) {
      const receipts = (transaction.receipts ?? []) as any[];
      const gasUsed = receipts.reduce((acc, receipt) => {
        return acc.add(bn(receipt.gasUsed));
      }, bn(0));
      return gasUsed.toString();
    },
  },
  groupedInputs: {
    resolve(transaction, _args, _context, _info) {
      const inputs = transaction.inputs ?? [];
      const assetsInputs = getAssetsInput(inputs);
      const contractInputs = getContractInputs(inputs);
      const messageInputs = getMessageInputs(inputs);
      return [...assetsInputs, ...contractInputs, ...messageInputs];
    },
  },
};

function getAssetsInput(inputs: TransactionItemFragment['inputs']) {
  const assetsInputs = inputs?.filter(
    (i) => i.__typename === 'InputCoin',
  ) as InputCoin[];
  const entries = Object.entries(groupBy(assetsInputs, (i) => i.assetId));
  return entries.map(([assetId, inputs]) => {
    const type = inputs[0].__typename;
    const totalAmount = inputs.reduce(
      (acc, input: any) => acc.add(bn(input.amount)),
      bn(0),
    );
    return { assetId, type, totalAmount, inputs };
  });
}

function getContractInputs(inputs: TransactionItemFragment['inputs']) {
  const contractInputs = inputs?.filter(
    (i) => i.__typename === 'InputContract',
  ) as InputContract[];
  const entries = Object.entries(groupBy(contractInputs, (i) => i.contract.id));
  return entries.map(([contractId, inputs]) => {
    const type = inputs[0].__typename;
    return { contractId, type, inputs };
  });
}

function getMessageInputs(inputs: TransactionItemFragment['inputs']) {
  return inputs?.filter(
    (i) => i.__typename === 'InputMessage',
  ) as InputMessage[];
}
