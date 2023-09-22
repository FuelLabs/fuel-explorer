import type { VStackProps } from '@fuel-explorer/ui/Box';
import { VStack } from '@fuel-explorer/ui/Box';
import { Copyable } from '@fuel-explorer/ui/Copyable';
import { Text } from '@fuel-explorer/ui/Text';
import { useMemo } from 'react';
import { tv } from 'tailwind-variants';
import { shortAddress } from '~/systems/Core/utils/address';

import { TxAccountTypeEnum, TxTypeEnum } from '../../types';
import type { TxType, TxAccountType } from '../../types';

type TxTitleProps = VStackProps & {
  type: TxType | TxAccountType;
  txHash: string;
};

export function TxTitle({
  type,
  txHash,
  children,
  gap = '1',
  ...props
}: TxTitleProps) {
  const title = useMemo(
    () => TxTypeEnum[type] || TxAccountTypeEnum[type],
    [type],
  );
  const classes = styles();
  return (
    <VStack {...props} gap={gap}>
      <Text as="p" size="3" className={classes.heading()}>
        {title}
      </Text>
      <Copyable value={txHash} className={classes.copyable()}>
        {shortAddress(txHash)}
      </Copyable>
      {children}
    </VStack>
  );
}

const styles = tv({
  slots: {
    heading: 'm-0 leading-tight font-medium',
    copyable: 'text-sm text-secondary',
  },
});
