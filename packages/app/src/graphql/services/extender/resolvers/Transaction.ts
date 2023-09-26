import { bn } from '@fuel-ts/math';
import type { IResolvers } from '@graphql-tools/utils';
import { tai64toDate } from '~/graphql/utils/dayjs';

export const Transaction: IResolvers = {
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
      return transaction?.status?.block?.header?.daHeight ?? null;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const receipts = (transaction.receipts ?? []) as any[];
      const gasUsed = receipts.reduce((acc, receipt) => {
        return acc.add(bn(receipt.gasUsed));
      }, bn(0));
      return gasUsed.toString();
    },
  },
};
