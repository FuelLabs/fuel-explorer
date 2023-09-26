import type { TransactionInputFragment } from '@fuel-explorer/graphql';
import { assets, resolveIconPath } from '@fuels/assets';
import { Card, HStack, Heading, IconButton, Text } from '@fuels/ui';
import type { CardProps } from '@fuels/ui';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { tv } from 'tailwind-variants';

const ASSET_LIST = resolveIconPath('/assets', assets);
const ICON_SIZE = 30;

function getAssetId(input: TransactionInputFragment) {
  if (input.__typename === 'InputMessage') return null;
  if (input.__typename === 'InputCoin') return input.assetId;
  return input.contract.id;
}

function getAmount(input: TransactionInputFragment) {
  if (input.__typename === 'InputCoin') return input.amount;
  return null;
}

export type TxInputProps = CardProps & {
  input: TransactionInputFragment;
};

export function TxInput({ input, ...props }: TxInputProps) {
  const [opened, setOpened] = useState(false);
  const classes = styles();
  const assetId = getAssetId(input);
  const amount = getAmount(input);
  const asset = useMemo(() => {
    return ASSET_LIST.find((asset) => asset.assetId === assetId);
  }, [assetId]);

  if (!asset) return null;
  return (
    <Card {...props}>
      <Card.Header
        className={classes.header()}
        data-state={opened ? 'opened' : 'closed'}
      >
        <HStack align="center">
          <Image
            src={asset.icon as string}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt={asset.name}
          />
          <Text className="text-lg">{asset.name}</Text>
          <Text className="text-muted">{asset.symbol}</Text>
        </HStack>
        <HStack align="center">
          {amount && (
            <Text className="text-secondary">
              {bn(amount).format({ units: 3 })}
            </Text>
          )}
          <IconButton
            color="gray"
            variant="link"
            className={classes.icon()}
            icon={opened ? IconChevronUp : IconChevronDown}
            onClick={() => setOpened(!opened)}
          />
        </HStack>
      </Card.Header>
      {opened && (
        <Card.Body className={classes.utxos()}>
          <Text className="text-xs">UTXOs</Text>
        </Card.Body>
      )}
    </Card>
  );
}

const styles = tv({
  slots: {
    header: 'group flex flex-row justify-between',
    icon: 'transition-transform group-hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-2 mx-4 py-3 px-4 rounded',
  },
});
