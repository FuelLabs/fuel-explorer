/* eslint-disable @typescript-eslint/no-explicit-any */
import { bn } from 'fuels';
import { dayjs } from '~/systems/Core/utils/dayjs';

import { TxTypeEnum, type TxItem, TxStatusEnum } from '../../types';

export const TX_CONTRACT_CALL_MOCK = {
  type: TxTypeEnum.ContractCall,
  status: TxStatusEnum.Success,
  gasUsed: bn(1),
  timestamp: String(dayjs().subtract(10, 'minute').unix()),
  totalAssets: 3,
  totalOperations: 2,
  transaction: {
    __typename: 'Transaction',
    id: '0x78d13f111bf301324f34f2a7eaffc546d39598d156af38e7c4ef9fe61ea2c46a',
    isCreate: false,
    isMint: false,
    isScript: true,
    status: {
      __typename: 'SuccessStatus',
      time: '4611686020099207033',
      block: {
        id: '0xa89cdecc118758816dfdc65c831a748d95b7d4048cbb729e6315f374c91b43fc',
      },
    } as any,
    outputs: [],
    inputs: [
      {
        contract: {
          id: '0xfc69a2f25c26312fbecc7fce531eca80a2d315482c03fbc00d36b5cf065a0ac3',
          bytecode: '0x74000003',
          salt: '0x0000000000',
        },
      } as any,
    ],
  } as any,
} satisfies TxItem;
