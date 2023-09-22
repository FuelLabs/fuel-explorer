import { VStack } from '@fuel-explorer/ui/Box';
import type { CardProps } from '@fuel-explorer/ui/Card';
import { Card } from '@fuel-explorer/ui/Card';
import { EntityItem } from '@fuel-explorer/ui/EntityItem';
import { Text } from '@fuel-explorer/ui/Text';
import { IconCoins } from '@tabler/icons-react';
import { type BN, bn } from 'fuels';

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
        <EntityItem>
          <EntityItem.Slot>
            <TxIcon type={type} color={COLOR_MAP[type]} />
          </EntityItem.Slot>
          <EntityItem.Info title={type} id={id}>
            <Text as="div" className="text-sm" leftIcon={IconCoins}>
              Spent: {bn(spent).format({ units: 3 })}
            </Text>
          </EntityItem.Info>
        </EntityItem>
      </Card.Body>
    </Card>
  );
}
