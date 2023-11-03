import { bn, Signer } from 'fuels';

import type { BlockItemFragment } from '../generated/types';
import { tai64toDate } from '../utils/dayjs';

export class BlockDomain {
  constructor(private block: BlockItemFragment) {}

  static createResolver(key: string, func?: string) {
    return {
      [key]: {
        async resolve(block: BlockItemFragment) {
          const domain = new BlockDomain(block);
          return func ? domain[func]() : domain[key] ?? null;
        },
      },
    };
  }

  static createResolvers() {
    return {
      ...BlockDomain.createResolver('time'),
      ...BlockDomain.createResolver('totalGasUsed'),
      ...BlockDomain.createResolver('producer'),
    };
  }

  get time() {
    const { block } = this;
    const time = block.header.time ?? null;
    const date = tai64toDate(time);
    return {
      fromNow: date.fromNow(),
      full: date.format('DD MMM YYYY - HH:mm:ss A'),
      rawTai64: time.toString(),
      rawUnix: date.unix().toString(),
    };
  }

  get totalGasUsed() {
    const { block } = this;
    const totalGasUsed = block.transactions.reduce((acc, transaction) => {
      return acc.add(bn(transaction.gasUsed));
    }, bn(0));
    return totalGasUsed;
  }

  get producer() {
    const { block } = this;
    if (block.consensus.__typename === 'Genesis') {
      return null;
    }
    const signature = block.consensus.signature;
    const producer = Signer.recoverAddress(block.id, signature);
    return producer;
  }
}
