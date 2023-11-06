import { bn, Signer } from 'fuels';

import type { BlockItemFragment } from '../generated/types';
import { tai64toDate } from '../utils/dayjs';
import { Domain } from '../utils/domain';

export class BlockDomain extends Domain<BlockItemFragment> {
  static createResolvers() {
    const domain = new BlockDomain();
    return {
      ...domain.createResolver('time'),
      ...domain.createResolver('totalGasUsed'),
      ...domain.createResolver('producer'),
    };
  }

  get time() {
    const { source: block } = this;
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
    const { source: block } = this;
    const totalGasUsed = block.transactions.reduce((acc, transaction) => {
      return acc.add(bn(transaction.gasUsed));
    }, bn(0));
    return totalGasUsed;
  }

  get producer() {
    const { source: block } = this;
    if (block.consensus.__typename === 'Genesis') {
      return null;
    }
    const signature = block.consensus.signature;
    const producer = Signer.recoverAddress(block.id, signature);
    return producer;
  }
}
