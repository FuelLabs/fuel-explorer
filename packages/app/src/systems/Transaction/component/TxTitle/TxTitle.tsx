import { cssObj } from '@fuel-ui/css';
import type { BaseProps } from '@fuel-ui/react';
import { Box, Copyable, Heading } from '@fuel-ui/react';
import { useMemo } from 'react';
import { shortAddress } from '~/systems/Core/utils/address';

import type { TxStatus, TxType } from '../../types';
import { TxIcon } from '../TxIcon/TxIcon';

const TITLE_MAP: Record<TxType, string> = {
  'contract-call': 'Contract Call',
  transfer: 'Transfer',
  mint: 'Mint',
  burn: 'Burn',
};

type TxTitleProps = BaseProps<{
  status: TxStatus;
  type: TxType;
  txHash: string;
}>;

export function TxTitle({ status, type, txHash, css, ...props }: TxTitleProps) {
  const title = useMemo(() => TITLE_MAP[type], [type]);
  return (
    <Box.HStack {...props} css={{ ...styles.root, ...css }} gap="$3">
      <TxIcon type={type} status={status} />
      <Box>
        <Heading as="h4">{title}</Heading>
        <Copyable value={txHash}>{shortAddress(txHash)}</Copyable>
      </Box>
    </Box.HStack>
  );
}

const styles = {
  root: cssObj({
    alignItems: 'center',

    '.fuel_Heading': {
      margin: '$0',
      lineHeight: '$tighter',
      fontSize: '$md',
    },
    '.fuel_Copyable': {
      fontSize: '$sm',
    },
    '.fuel_Copyable .fuel_Icon svg': {
      width: '14px !important',
      height: '14px !important',
    },
  }),
};
