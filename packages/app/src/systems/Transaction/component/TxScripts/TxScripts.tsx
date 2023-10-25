/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-json-view-lite/dist/index.css';
import type { TransactionReceiptFragment } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import {
  Badge,
  Box,
  Button,
  Code,
  Collapsible,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useRadixTheme,
} from '@fuels/ui';
import {
  IconFold,
  IconArrowsMoveVertical,
  IconCoins,
} from '@tabler/icons-react';
import { bn } from 'fuels';
import Image from 'next/image';
import { useState } from 'react';
import {
  JsonView,
  defaultStyles,
  darkStyles,
  collapseAllNested,
} from 'react-json-view-lite';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

import type { TransactionNode } from '../../types';

const ICON_SIZE = 24;

function parseJson(item: TransactionReceiptFragment): Record<string, any> {
  return Object.entries(item).reduce((acc, [key, value]) => {
    if (!value || key === '__typename') return acc;
    if (typeof value === 'object') return { ...acc, [key]: parseJson(value) };
    return { ...acc, [key]: value };
  }, {});
}

export type TxScriptRowProps = BaseProps<{
  item: TransactionReceiptFragment;
}>;

function TxScriptRow({ item }: TxScriptRowProps) {
  const asset = useAsset(item.assetId);
  const classes = styles();
  const ctx = useRadixTheme();
  const amount = bn(item.amount);
  const isDanger =
    item.receiptType === 'PANIC' ||
    (item.receiptType === 'SCRIPT_RESULT' && item.result === '2');

  return (
    <Collapsible className="py-0 gap-0">
      <Collapsible.Header className="group px-3 py-3">
        <Badge
          size="2"
          color={isDanger ? 'red' : 'gray'}
          variant={isDanger ? 'outline' : 'surface'}
        >
          {item.receiptType}
        </Badge>
        <div className="flex-1">
          {item.param1 && (
            <Code className="flex-1 bg-transparent text-muted" color="gray">
              Method: {bn(item.param1).toHex()}
            </Code>
          )}
        </div>
        <Text as="p" className="flex items-center gap-2">
          {asset?.icon ? (
            <Image
              src={asset.icon as string}
              width={ICON_SIZE}
              height={ICON_SIZE}
              alt={asset.name}
            />
          ) : (
            item.amount && (
              <Icon icon={IconCoins} size={20} color="text-muted" />
            )
          )}
          {item.amount && (
            <Text>
              {amount.format()} {asset?.symbol ?? ''}
            </Text>
          )}
        </Text>
      </Collapsible.Header>
      <Collapsible.Content className={classes.utxos()}>
        <JsonView
          data={parseJson(item)}
          shouldExpandNode={collapseAllNested}
          style={{
            ...(ctx.appearance === 'dark' ? darkStyles : defaultStyles),
            container: classes.json(),
          }}
        />
      </Collapsible.Content>
    </Collapsible>
  );
}

type TxScriptsContentProps = BaseProps<{
  tx: TransactionNode;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}>;

function TxScriptsContent({ tx, opened, setOpened }: TxScriptsContentProps) {
  const receipts = tx.receipts ?? [];
  const classes = styles();

  if (!receipts.length) {
    return (
      <EmptyCard hideImage>
        <EmptyCard.Title>No Scripts</EmptyCard.Title>
        <EmptyCard.Description>
          This transaction does not have any scripts.
        </EmptyCard.Description>
      </EmptyCard>
    );
  }

  if (!opened && receipts.length > 3) {
    return (
      <>
        <TxScriptRow item={receipts[0]} />
        <HStack>
          <Box className={classes.lines()} />
          <Button
            color="gray"
            variant="outline"
            leftIcon={IconArrowsMoveVertical}
            onClick={() => setOpened(true)}
          >
            Expand{' '}
            <span className="text-muted">(+{receipts.length - 2} scripts)</span>
          </Button>
          <Box className={classes.lines()} />
        </HStack>
        <TxScriptRow item={receipts[receipts.length - 1]} />
      </>
    );
  }

  return (
    <>
      {receipts.map((receipt, i) => (
        <TxScriptRow key={i + receipt.receiptType} item={receipt} />
      ))}
    </>
  );
}

export type TxScriptsProps = BaseProps<{
  tx: TransactionNode;
}>;

export function TxScripts({ tx, ...props }: TxScriptsProps) {
  const [opened, setOpened] = useState(false);

  return (
    <VStack {...props}>
      <Heading
        as="h2"
        size="5"
        className="leading-none flex items-center gap-8"
      >
        Scripts
        {opened && (
          <Button
            className="text-muted"
            variant="link"
            color="gray"
            leftIcon={IconFold}
            onClick={() => setOpened(false)}
          >
            Collapse
          </Button>
        )}
      </Heading>
      <TxScriptsContent tx={tx} opened={opened} setOpened={setOpened} />
    </VStack>
  );
}

const styles = tv({
  slots: {
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-3 mx-3 mb-3 p-0 rounded',
    json: 'bg-transparent text-sm py-2 px-1',
    lines: [
      'relative flex-1 border-t border-b border-border',
      'before:h-[1px] before:absolute before:top-1/2 before:left-0 before:w-full before:bg-border',
      'before:content-[""]',
    ],
  },
});
