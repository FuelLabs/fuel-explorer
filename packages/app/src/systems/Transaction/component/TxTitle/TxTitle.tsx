import { Box, HStack } from '@fuel-explorer/ui/Box';
import { Copyable } from '@fuel-explorer/ui/Copyable';
import { Text } from '@fuel-explorer/ui/Text';
import type { BaseProps } from '@fuel-explorer/ui/types';
import { useMemo } from 'react';
import { tv } from 'tailwind-variants';
import { shortAddress } from '~/systems/Core/utils/address';

import { TxTypeEnum, type TxStatus, type TxType } from '../../types';
import { TxIcon } from '../TxIcon/TxIcon';

type TxTitleProps = BaseProps<{
  status: TxStatus;
  type: TxType;
  txHash: string;
}>;

export function TxTitle({ status, type, txHash, ...props }: TxTitleProps) {
  const title = useMemo(() => TxTypeEnum[type], [type]);
  const classes = styles();
  return (
    <HStack {...props}>
      <TxIcon type={type} status={status} />
      <Box>
        <Text as="p" size="3" className={classes.heading()}>
          {title}
        </Text>
        <Copyable value={txHash} className={classes.copyable()}>
          {shortAddress(txHash)}
        </Copyable>
      </Box>
    </HStack>
  );
}

const styles = tv({
  slots: {
    heading: 'm-0 leading-tight font-medium',
    copyable: 'text-sm text-secondary',
  },
});
