import { mocks } from '@fuel-explorer/graphql';
import { bn } from '@fuel-ts/math';
import { dayjs } from '~/systems/Core/utils/dayjs';

const status = mocks.aSuccessStatus({
  __typename: 'SuccessStatus',
  block: mocks.aBlock({
    transactions: [],
  }),
});

const date = dayjs().subtract(1, 'day');

export const TX_MOCK = mocks.aTransaction({
  id: '0x78d13f111bf301324f34f2a7eaffc546d39598d156af38e7c4ef9fe61ea2c46a',
  time: {
    __typename: 'ParsedTime',
    fromNow: date.fromNow(),
    full: dayjs().format('DD MMM YYYY - HH:mm:ss A'),
  },
  totalAccounts: 2,
  totalAssets: 3,
  totalOperations: 4,
  gasUsed: bn(1),
  status,
});
