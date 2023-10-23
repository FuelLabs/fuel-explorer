import { bn } from 'fuels';
import { uniqBy } from 'lodash';

import type { TransactionItemFragment } from '../generated/types';
import { tai64toDate } from '../utils/dayjs';

import { InputDomain } from './Input';
import { OutputDomain } from './Output';

export class TransactionDomain {
  constructor(private transaction: TransactionItemFragment) {}

  static createResolver(key: string, func?: string) {
    return {
      [key]: {
        async resolve(transaction: TransactionItemFragment) {
          const domain = new TransactionDomain(transaction);
          return func ? domain[func]() : domain[key] ?? null;
        },
      },
    };
  }

  static createResolvers() {
    return {
      ...TransactionDomain.createResolver('title', 'getTitle'),
      ...TransactionDomain.createResolver('time'),
      ...TransactionDomain.createResolver('blockHeight'),
      ...TransactionDomain.createResolver('statusType'),
      ...TransactionDomain.createResolver('totalAssets'),
      ...TransactionDomain.createResolver('totalOperations'),
      ...TransactionDomain.createResolver('totalAccounts'),
      ...TransactionDomain.createResolver('gasUsed'),
      ...TransactionDomain.createResolver('accountsInvolved'),
      ...TransactionDomain.createResolver('groupedInputs'),
      ...TransactionDomain.createResolver('groupedOutputs'),
    };
  }

  async getTitle() {
    const { transaction } = this;
    if (transaction.isMint) return 'Mint';
    if (transaction.isCreate) return 'Contract Created';
    return 'ContractCall';
  }

  get time() {
    const { transaction } = this;
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
  }

  get blockHeight() {
    const { transaction } = this;
    const status = transaction.status;
    if (status?.__typename === 'SuccessStatus') {
      return status?.block?.header?.daHeight ?? null;
    }
    return null;
  }

  get statusType() {
    const { transaction } = this;
    const typename = transaction.status?.__typename;
    if (typename === 'SuccessStatus') {
      return 'Success';
    }
    if (typename === 'FailureStatus') {
      return 'Failure';
    }
    return 'Submitted';
  }

  get totalAssets() {
    const { transaction } = this;
    if (transaction.isMint) return 1;
    return transaction.inputAssetIds?.length ?? 0;
  }

  get totalOperations() {
    const { transaction } = this;
    if (transaction.isMint) return 1;
    return transaction.inputs?.length ?? 0;
  }

  get totalAccounts() {
    const { transaction } = this;
    if (transaction.isMint) return 1;
    return this._getAccounts().length;
  }

  get gasUsed() {
    const { transaction } = this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const receipts = (transaction.receipts ?? []) as any[];
    const gasUsed = receipts.reduce((acc, receipt) => {
      return acc.add(bn(receipt.gasUsed));
    }, bn(0));
    return gasUsed.toString();
  }

  get accountsInvolved() {
    const { transaction } = this;
    if (transaction.isMint) return [];
    return this._getAccounts() ?? [];
  }

  get groupedInputs() {
    const { transaction } = this;
    const domain = new InputDomain(transaction.inputs ?? []);
    return domain.groupedInputs;
  }

  get groupedOutputs() {
    const { transaction } = this;
    const domain = new OutputDomain(transaction.outputs ?? []);
    return domain.groupedOutputs;
  }

  private _getAccounts() {
    const { transaction } = this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ids = transaction.inputs?.flatMap((input: any) => {
      const typename = input?.__typename;
      if (typename === 'InputCoin') {
        return {
          type: 'Contract',
          id: input.owner,
        };
      }
      if (typename === 'InputMessage') {
        return [
          { type: 'Wallet', id: input.sender },
          { type: 'Wallet', id: input.sender },
        ];
      }
      if (typename === 'InputContract') {
        return {
          type: 'Contract',
          id: input.contract.id,
        };
      }
    });

    return uniqBy(ids, 'id');
  }
}
