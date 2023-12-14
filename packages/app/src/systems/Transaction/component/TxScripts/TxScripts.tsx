/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-json-view-lite/dist/index.css';
import { ReceiptType } from '@fuel-explorer/graphql';
import type {
  Maybe,
  OperationReceipt,
  TransactionReceiptFragment,
} from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import {
  Address,
  Text,
  Badge,
  Box,
  Button,
  Code,
  Collapsible,
  HStack,
  Heading,
  HoverCard,
  ScrollArea,
  VStack,
  cx,
  Card,
  LoadingBox,
  LoadingWrapper,
} from '@fuels/ui';
import {
  IconFold,
  IconArrowsMoveVertical,
  IconArrowRight,
} from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { createContext, useContext, useState } from 'react';
import { useMeasure } from 'react-use';
import { tv } from 'tailwind-variants';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { JsonViewer } from '~/systems/Core/components/JsonViewer/JsonViewer';

import type { TransactionNode } from '../../types';

export type TxScriptsProps = BaseProps<{
  tx: TransactionNode;
  isLoading?: boolean;
}>;

export function TxScripts({ tx, isLoading, ...props }: TxScriptsProps) {
  const [opened, setOpened] = useState(false);
  const hasOperations = tx.operations?.length ?? 0 > 0;
  return (
    <VStack {...props}>
      <Heading
        as="h2"
        size="5"
        className="leading-none flex items-center gap-8"
      >
        Operations
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
      <LoadingWrapper
        repeatLoader={2}
        isLoading={isLoading}
        noItems={!hasOperations}
        regularEl={
          <ScriptsContent tx={tx} opened={opened} setOpened={setOpened} />
        }
        loadingEl={
          <Card className="py-5 px-4 flex flex-row items-center justify-between">
            <LoadingBox className="w-12 h-6" />
            <LoadingBox className="w-24 h-6" />
          </Card>
        }
        noItemsEl={
          <EmptyCard hideImage>
            <EmptyCard.Title>No Operations</EmptyCard.Title>
            <EmptyCard.Description>
              This transaction does not have any operations.
            </EmptyCard.Description>
          </EmptyCard>
        }
      />
    </VStack>
  );
}

type ScriptsContent = BaseProps<{
  tx: TransactionNode;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}>;

function ScriptsContent({ tx, opened, setOpened }: ScriptsContent) {
  const operations = tx.operations ?? [];
  const classes = styles();
  const [ref, { width }] = useMeasure();

  if (!operations.length) {
    return (
      <EmptyCard hideImage>
        <EmptyCard.Title>No Scripts</EmptyCard.Title>
        <EmptyCard.Description>
          This transaction does not have any scripts.
        </EmptyCard.Description>
      </EmptyCard>
    );
  }

  const receipts = operations.map((i) => i?.receipts ?? []).flat();
  const first = receipts?.[0];
  const last = receipts?.[receipts.length - 1];
  const hasPanic = operations?.some(
    (o) =>
      o?.receipts?.some(
        (r) =>
          r?.item?.receiptType === ReceiptType.Panic ||
          r?.item?.receiptType === ReceiptType.Revert,
      ),
  );

  if (!opened && receipts.length > 3) {
    return (
      <>
        <ReceiptItem receipt={first as OperationReceipt} hasPanic={hasPanic} />
        <HStack>
          <Box className={classes.lines()} />
          <HoverCard openDelay={100}>
            <HoverCard.Trigger>
              <Button
                ref={ref as any}
                color="gray"
                variant="outline"
                leftIcon={IconArrowsMoveVertical}
                onClick={() => setOpened(true)}
              >
                Expand{' '}
                <span className="text-muted">
                  (+{tx.receipts?.length ?? 0 - 2} operations)
                </span>
              </Button>
            </HoverCard.Trigger>
            <HoverCard.Content
              className="rounded-xs p-2 px-3"
              style={{ width }}
            >
              <TypesCounter receipts={tx.receipts} />
            </HoverCard.Content>
          </HoverCard>
          <Box className={classes.lines()} />
        </HStack>
        <ReceiptItem receipt={last as OperationReceipt} hasPanic={hasPanic} />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {operations.map((item, i) => (
        <div key={`${i}-${item?.type ?? ''}`} className={classes.operation()}>
          {item?.receipts?.map((receipt, idx) => {
            const hasNested = Boolean(receipt?.receipts?.length);
            if (!hasNested) {
              return (
                <ReceiptItem
                  key={`${idx}-${receipt?.item?.receiptType ?? ''}`}
                  receipt={receipt as OperationReceipt}
                  isIndented={idx > 0}
                  hasPanic={hasPanic}
                />
              );
            }
            return (
              <div
                key={`${idx}-${receipt?.item?.receiptType ?? ''}`}
                data-nested="true"
                className={classes.operation()}
              >
                <ReceiptItem
                  receipt={receipt as OperationReceipt}
                  isIndented={idx > 0}
                  hasPanic={hasPanic}
                />
                {receipt?.receipts?.map((sub, j) => (
                  <div
                    key={`${j}-${sub?.item?.receiptType ?? ''}`}
                    className="ml-10"
                  >
                    <ReceiptItem
                      isIndented
                      receipt={sub as OperationReceipt}
                      hasPanic={hasPanic}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function CountReceipt({ num, op }: { num: number; op: string }) {
  const length = new Intl.NumberFormat('en-IN', {
    minimumIntegerDigits: 2,
  }).format(num);
  const text = num > 1 ? `${op}s` : op;
  return (
    <Text
      className="flex items-center gap-2 text-sm text-muted"
      leftIcon={IconArrowRight}
      iconSize={14}
    >
      {length} {text}
    </Text>
  );
}

function TypesCounter({
  receipts: items = [],
}: {
  receipts?: Maybe<TransactionReceiptFragment[]>;
}) {
  const receipts = items ?? [];
  const calls = receipts.filter((i) => i?.receiptType === ReceiptType.Call);
  const transfers = receipts.filter(
    (i) =>
      i?.receiptType === ReceiptType.Transfer ||
      i?.receiptType === ReceiptType.TransferOut,
  );
  const mints = receipts.filter((i) => i?.receiptType === ReceiptType.Mint);
  const burns = receipts.filter((i) => i?.receiptType === ReceiptType.Burn);
  const messages = receipts.filter(
    (i) => i?.receiptType === ReceiptType.MessageOut,
  );
  const returns = receipts.filter(
    (i) =>
      i?.receiptType === ReceiptType.Return ||
      i?.receiptType === ReceiptType.ReturnData,
  );
  const results = receipts.filter(
    (i) => i?.receiptType === ReceiptType.ScriptResult,
  );
  const errors = receipts.filter(
    (i) =>
      i?.receiptType === ReceiptType.Panic ||
      i?.receiptType === ReceiptType.Revert,
  );
  const logs = receipts.filter(
    (i) =>
      i?.receiptType === ReceiptType.Log ||
      i?.receiptType === ReceiptType.LogData,
  );
  return (
    <div className="flex flex-col gap-0 text-sm font-mono w-full">
      {Boolean(calls.length) && <CountReceipt num={calls.length} op="Call" />}
      {Boolean(logs.length) && <CountReceipt num={logs.length} op="Log" />}
      {Boolean(transfers.length) && (
        <CountReceipt num={transfers.length} op="Transfer" />
      )}
      {Boolean(messages.length) && (
        <CountReceipt num={messages.length} op="Message" />
      )}
      {Boolean(mints.length) && <CountReceipt num={mints.length} op="Mint" />}
      {Boolean(burns.length) && <CountReceipt num={burns.length} op="Burn" />}
      {Boolean(returns.length) && (
        <CountReceipt num={returns.length} op="Return" />
      )}
      {Boolean(results.length) && (
        <CountReceipt num={results.length} op="Result" />
      )}
      {Boolean(errors.length) && (
        <CountReceipt num={errors.length} op="Error" />
      )}
    </div>
  );
}

const ctx = createContext<ReceiptItemProps>({} as ReceiptItemProps);
const RETURN_TYPES = [ReceiptType.Return, ReceiptType.ReturnData];

function getBadgeColor(
  hasError: boolean,
  receipt?: Maybe<TransactionReceiptFragment>,
) {
  const type = receipt?.receiptType ?? 'UNKNOWN';
  if (type === ReceiptType.Revert || type === ReceiptType.Panic) {
    return 'red';
  }
  if (
    RETURN_TYPES.some((t) => t === type) &&
    !hasError &&
    !receipt?.contract?.id
  ) {
    return 'green';
  }
  return 'gray';
}

export type ReceiptItemProps = BaseProps<{
  receipt?: Maybe<OperationReceipt>;
  isIndented?: boolean;
  hasPanic?: boolean;
}>;

function ReceiptItem({
  receipt,
  isIndented,
  hasPanic,
  className,
  ...props
}: ReceiptItemProps) {
  const classes = styles({ indent: isIndented });
  const [opened, setOpened] = useState(false);

  return (
    <ctx.Provider value={{ receipt: receipt, isIndented, hasPanic }}>
      <div
        className={cx(classes.receiptRow({ className }), 'group')}
        data-opened={opened}
      >
        <Collapsible
          {...props}
          opened={opened}
          className="py-0 gap-0"
          onOpenChange={setOpened}
        >
          <ReceiptHeader />
          <ReceiptBlock />
        </Collapsible>
      </div>
    </ctx.Provider>
  );
}

function parseJson(
  item?: Maybe<TransactionReceiptFragment>,
): Record<string, any> {
  if (!item) return {};
  return Object.entries(item).reduce((acc, [key, value]) => {
    if (!value || key === '__typename') return acc;
    if (typeof value === 'object')
      return { ...acc, [key]: parseJson(value as any) };
    return { ...acc, [key]: value };
  }, {});
}

function ReceiptBlock() {
  const { receipt } = useContext(ctx);
  const classes = styles();
  const [ref, { width }] = useMeasure();
  return (
    <Collapsible.Content ref={ref as any} className={classes.utxos()}>
      <ScrollArea style={{ width }}>
        <JsonViewer data={parseJson(receipt?.item)} />
      </ScrollArea>
    </Collapsible.Content>
  );
}

function ReceiptBadge() {
  const { receipt, hasPanic } = useContext(ctx);
  const type = receipt?.item?.receiptType ?? 'UNKNOWN';
  const color = getBadgeColor(Boolean(hasPanic), receipt?.item);
  return (
    <Badge
      size="1"
      className="ml-1 font-mono py-1"
      variant="ghost"
      color={color}
    >
      {type}
    </Badge>
  );
}

function ReceiptAmount() {
  const { receipt: item } = useContext(ctx);
  const receipt = item?.item;
  const assetId = receipt?.assetId ?? '';
  const amount = bn(receipt?.amount);
  const contract = receipt?.to?.id ?? receipt?.contract?.id ?? null;

  return (
    amount.gt(0) && (
      <VStack className="gap-1 items-end mobile:max-tablet:hidden">
        <Amount
          iconSize={16}
          assetId={assetId}
          value={amount}
          className="text-xs mt-1"
        />
        <Address
          iconSize={14}
          value={assetId}
          className="text-xs font-mono"
          linkProps={{
            as: NextLink,
            href: `/contract/${contract}/assets`,
          }}
        />
      </VStack>
    )
  );
}

function ReceiptHeader() {
  const { receipt: item } = useContext(ctx);
  const receipt = item?.item;
  const classes = styles();
  const type = receipt?.receiptType ?? 'UNKNOWN';
  const param1 = receipt?.param1;
  const contract = receipt?.to?.id ?? receipt?.contract?.id ?? null;
  const assetId = receipt?.assetId ?? '';
  const amount = bn(receipt?.amount);

  if (type === 'CALL' && Boolean(contract)) {
    return (
      <Collapsible.Header className={classes.header()}>
        <ReceiptBadge />
        <VStack className="flex-1 gap-[2px]">
          {param1 && (
            <Code
              className="text-xs font-mono bg-transparent text-muted p-0"
              color="gray"
            >
              Method: {bn(param1).toHex()}
            </Code>
          )}
          {contract && (
            <Address
              iconSize={14}
              value={contract}
              className="text-xs font-mono"
              prefix="Contract:"
              linkProps={{
                as: NextLink,
                href: `/contract/${contract}/assets`,
              }}
            />
          )}
        </VStack>
        <ReceiptAmount />
      </Collapsible.Header>
    );
  }

  if (type === 'MINT' || type === 'BURN') {
    return (
      <Collapsible.Header className={classes.header()}>
        <ReceiptBadge />
        {receipt?.subId && (
          <VStack className="flex-1 gap-[2px]">
            {receipt.val && (
              <Amount
                iconSize={16}
                assetId={receipt.contract?.id}
                value={bn(receipt.val)}
                className="text-xs mt-1"
              />
            )}
            <Address
              value={receipt.contract?.id}
              className="text-xs font-mono"
              prefix="Asset:"
              linkProps={{
                as: NextLink,
                href: `/contract/${receipt.contract?.id}/assets`,
              }}
            />
          </VStack>
        )}
        <ReceiptAmount />
      </Collapsible.Header>
    );
  }

  if (type === 'TRANSFER_OUT' || type === 'TRANSFER') {
    return (
      <Collapsible.Header className={classes.header()}>
        <ReceiptBadge />
        {receipt?.toAddress && (
          <VStack className="flex-1 gap-[2px]">
            <Amount
              iconSize={16}
              assetId={assetId}
              value={amount}
              className="text-xs mt-1"
            />
            <Address
              value={receipt.toAddress}
              className="text-xs font-mono"
              prefix="To:"
              linkProps={{
                as: NextLink,
                href: `/account/${receipt.toAddress}/assets`,
              }}
            />
          </VStack>
        )}
      </Collapsible.Header>
    );
  }

  if (type === 'MESSAGE_OUT') {
    return (
      <Collapsible.Header className={classes.header()}>
        <ReceiptBadge />
        {receipt?.sender && receipt?.recipient && (
          <VStack className="flex-1 gap-[2px]">
            <Address
              value={receipt.sender}
              className="text-xs font-mono"
              prefix="To:"
              linkProps={{
                as: NextLink,
                href: `/account/${receipt.sender}/assets`,
              }}
            />
            <Address
              value={receipt.recipient}
              className="text-xs font-mono"
              prefix="From:"
              linkProps={{
                as: NextLink,
                href: `/account/${receipt.recipient}/assets`,
              }}
            />
          </VStack>
        )}
      </Collapsible.Header>
    );
  }

  return (
    <Collapsible.Header className={classes.header()}>
      <div className="flex-1">
        <ReceiptBadge />
      </div>
      <ReceiptAmount />
    </Collapsible.Header>
  );
}

const styles = tv({
  slots: {
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-3 mx-3 mb-3 p-0 rounded',
    lines: [
      'relative flex-1 border-t border-b border-border',
      'before:h-[1px] before:absolute before:top-1/2 before:left-0',
      'before:w-full before:bg-border before:content-[""]',
    ],
    receiptRow: 'peer relative',
    header: 'group px-3 pr-4 py-0 h-16',
    operation: [
      'relative flex flex-col gap-3',
      '[&[data-nested=true]]:before:absolute',
      '[&[data-nested=true]]:before:content-[""]',
      '[&[data-nested=true]]:before:block',
      '[&[data-nested=true]]:before:border-l',
      '[&[data-nested=true]]:before:border-border',
      '[&[data-nested=true]]:before:border-dashed',
      '[&[data-nested=true]]:before:top-[40px]',
      '[&[data-nested=true]]:before:bottom-[20px]',
      '[&[data-nested=true]]:before:left-0',
      '[&[data-nested=true]]:before:right-0',
    ],
  },
  variants: {
    indent: {
      true: {
        receiptRow: [
          'ml-10 before:absolute before:top-[-35px] before:left-[-40px]',
          'before:bottom-[20px] before:right-[100%]',
          'before:content-[""] before:block before:border-l before:border-b',
          'before:border-border before:border-dashed before:rounded-bl',
          '[&[data-opened=true]:before+&]:top-[-120px]',
        ],
      },
    },
  },
});
