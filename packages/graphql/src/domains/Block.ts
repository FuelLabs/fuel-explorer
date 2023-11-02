import type { BlockItemFragment } from '../generated/types';
import { tai64toDate } from '../utils/dayjs';

export class BlockDomain {
  constructor(private block: BlockItemFragment) {}

  static createResolver(key: string, func?: string) {
    return {
      [key]: {
        async resolve(block: BlockItemFragment) {
          const domain = new BlockDomain(block);
          console.log(`domain[key]`, domain[key]);
          return func ? domain[func]() : domain[key] ?? null;
        },
      },
    };
  }

  static createResolvers() {
    return {
      ...BlockDomain.createResolver('time'),
    };
  }

  get time() {
    console.log('boo');
    const { block } = this;
    console.log(`block`, block);
    const time = block.header.time ?? null;
    console.log('one', time);
    console.log('two', block.header.time);
    const date = tai64toDate(time);
    return {
      fromNow: date.fromNow(),
      full: date.format('DD MMM YYYY - HH:mm:ss A'),
      rawTai64: time.toString(),
      rawUnix: date.unix().toString(),
    };
  }
}
