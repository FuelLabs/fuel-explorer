import { bn } from 'fuels';
import { uniqBy } from 'lodash';

import type { TransactionItemFragment } from '../generated/types';
import { tai64toDate } from '../utils/dayjs';
import { Domain } from '../utils/domain';

import { InputDomain } from './Input';
import { OutputDomain } from './Output';

export class TransactionDomain extends Domain<TransactionItemFragment> {
  static createResolvers() {
    const domain = new TransactionDomain();
    return {
      ...domain.createResolver('title', 'getTitle'),
      ...domain.createResolver('time'),
      ...domain.createResolver('blockHeight'),
      ...domain.createResolver('statusType'),
      ...domain.createResolver('totalAssets'),
      ...domain.createResolver('totalOperations'),
      ...domain.createResolver('totalAccounts'),
      ...domain.createResolver('gasUsed'),
      ...domain.createResolver('accountsInvolved'),
      ...domain.createResolver('groupedInputs'),
      ...domain.createResolver('groupedOutputs'),
      ...domain.createResolver('isPredicate'),
    };
  }

  async getTitle() {
    const { source: transaction } = this;
    if (transaction.isMint) return 'Mint';
    if (transaction.isCreate) return 'Contract Created';
    return 'ContractCall';
  }

  get time() {
    const { source: transaction } = this;
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
    const { source: transaction } = this;
    const status = transaction.status;
    if (status?.__typename === 'SuccessStatus') {
      return status?.block?.header?.daHeight ?? null;
    }
    return null;
  }

  get statusType() {
    const { source: transaction } = this;
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
    const { source: transaction } = this;
    if (transaction.isMint) return 1;
    return transaction.inputAssetIds?.length ?? 0;
  }

  get totalOperations() {
    const { source: transaction } = this;
    if (transaction.isMint) return 1;
    return transaction.inputs?.length ?? 0;
  }

  get totalAccounts() {
    const { source: transaction } = this;
    if (transaction.isMint) return 1;
    return this._getAccounts().length;
  }

  get gasUsed() {
    const { source: transaction } = this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const receipts = (transaction.receipts ?? []) as any[];
    const gasUsed = receipts.reduce((acc, receipt) => {
      return acc.add(bn(receipt.gasUsed));
    }, bn(0));
    return gasUsed.toString();
  }

  get accountsInvolved() {
    const { source: transaction } = this;
    if (transaction.isMint) return [];
    return this._getAccounts() ?? [];
  }

  get groupedInputs() {
    const { source: transaction } = this;
    const domain = new InputDomain(transaction.inputs ?? []);
    return domain.groupedInputs;
  }

  get groupedOutputs() {
    const { source: transaction } = this;
    const domain = new OutputDomain(transaction.outputs ?? []);
    return domain.groupedOutputs;
  }

  get isPredicate() {
    const inputs = this.source.inputs ?? [];
    return inputs.some((input) => {
      if (
        input.__typename === 'InputMessage' ||
        input.__typename === 'InputCoin'
      ) {
        return !!input.predicate && input.predicate !== '0x';
      }
    });
  }

  private _getAccounts() {
    const { source: transaction } = this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ids = transaction.inputs?.flatMap((input: any) => {
      const typename = input?.__typename;
      const isCoin = typename === 'InputCoin';
      const isMessage = typename === 'InputMessage';
      const isContract = typename === 'InputContract';
      if ((isCoin || isMessage) && input.predicate) {
        return {
          type: 'Predicate',
          id: input.owner,
        };
      }
      if (isCoin) {
        return {
          type: 'Contract',
          id: input.owner,
        };
      }
      if (isMessage) {
        return [
          { type: 'Wallet', id: input.sender },
          { type: 'Wallet', id: input.sender },
        ];
      }
      if (isContract) {
        return {
          type: 'Contract',
          id: input.contract.id,
        };
      }
    });

    return uniqBy(ids, 'id');
  }
}
