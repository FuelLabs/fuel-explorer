import type { CardProps } from '@fuel-explorer/ui';
import { VStack, Card, EntityItem, Text } from '@fuel-explorer/ui';
import { bn } from '@fuel-ts/math';
import type { BN } from '@fuel-ts/math';
import { IconCoins } from '@tabler/icons-react';

import type { TxAccountType } from '../../types';
import { TxIcon } from '../TxIcon/TxIcon';

export type TxAccountItemProps = CardProps & {
  type: TxAccountType;
  id: string;
  spent: BN;
};

const COLOR_MAP = {
  Contract: 'gray',
  Wallet: 'gray',
  Predicate: 'blue',
} as const;

export function TxAccountItem({
  type,
  id,
  spent,
  ...props
}: TxAccountItemProps) {
  return (
    <Card {...props}>
      <Card.Body as={VStack}>
        <EntityItem className="items-start">
          <EntityItem.Slot>
            <TxIcon color={COLOR_MAP[type]} type={type} />
          </EntityItem.Slot>
          <EntityItem.Info id={id} title={type}>
            <Text as="div" className="text-sm" leftIcon={IconCoins}>
              Spent: {bn(spent).format({ units: 3 })}
            </Text>
          </EntityItem.Info>
        </EntityItem>
      </Card.Body>
    </Card>
  );
}
