import { memo } from 'react';
import { TxInputCoin } from '~/systems/Transaction/component/TxInput/TxInputCoin/TxInputCoin';
import type { InputCoin } from '~/systems/Transaction/component/TxInput/TxInputCoin/types';
import { TxInputContract } from '~/systems/Transaction/component/TxInput/TxInputContract/TxInputContract';
import type { InputContract } from '~/systems/Transaction/component/TxInput/TxInputContract/types';
import { TxInputMessage } from '~/systems/Transaction/component/TxInput/TxInputMessage/TxInputMessage';
import type { InputMessage } from '~/systems/Transaction/component/TxInput/TxInputMessage/types';
import { TxInputProps } from './types';

function _TxInput({ input, ...props }: TxInputProps) {
  switch (input?.__typename) {
    case 'InputCoin':
      return <TxInputCoin input={input as InputCoin} {...props} />;
    case 'InputMessage':
      return <TxInputMessage input={input as InputMessage} {...props} />;
    case 'InputContract':
      return <TxInputContract input={input as InputContract} {...props} />;
    default:
      return null;
  }
}

export const TxInput = memo(_TxInput);
