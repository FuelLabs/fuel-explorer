import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import type {
  GQLOperationReceipt,
  GQLTransactionReceiptFragment,
  Maybe,
} from '@fuel-explorer/graphql/sdk';
import type { BaseProps } from '@fuels/ui';
import {
  Address,
  Badge,
  Box,
  Button,
  Card,
  Code,
  Collapsible,
  HStack,
  Heading,
  HoverCard,
  LoadingBox,
  LoadingWrapper,
  ScrollArea,
  Text,
  VStack,
  cx,
} from '@fuels/ui';
import {
  IconArrowRight,
  IconArrowsMoveVertical,
  IconFold,
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
  tx: TransactionNode | undefined;
  isLoading?: boolean;
}>;

export function TxScripts({ tx, isLoading, ...props }: TxScriptsProps) {
  const [opened, setOpened] = useState(false);
  const hasOperations = tx?.operations?.length ?? 0 > 0;
  return (
    <VStack {...props}>
      <LoadingWrapper
        repeatLoader={2}
        isLoading={isLoading}
        noItems={!hasOperations}
        regularEl={
          <>
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
            <ScriptsContent tx={tx} opened={opened} setOpened={setOpened} />
          </>
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
  tx: TransactionNode | undefined;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}>;

function ScriptsContent({ tx, opened, setOpened }: ScriptsContent) {
  const operations = tx?.operations ?? [];
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

  const txReceipts = tx?.receipts ?? [];
  const receipts = operations.flatMap((i) => i?.receipts ?? []);
  const first = receipts?.[0];
  const last = receipts?.[receipts.length - 1];
  const hasPanic = operations?.some((o) =>
    o?.receipts?.some(
      (r) =>
        r?.item?.receiptType === GQLReceiptType.Panic ||
        r?.item?.receiptType === GQLReceiptType.Revert,
    ),
  );

  if (!opened && receipts.length > 3) {
    return (
      <>
        <ReceiptItem
          receipt={first as GQLOperationReceipt}
          hasPanic={hasPanic}
        />
        <HStack>
          <Box className={classes.lines()} />
          <HoverCard openDelay={100}>
            <HoverCard.Trigger>
              <Button
                ref={ref as React.Ref<HTMLButtonElement>}
                color="gray"
                variant="outline"
                leftIcon={IconArrowsMoveVertical}
                onClick={() => setOpened(true)}
              >
                Expand{' '}
                <span className="text-muted">
                  (+{txReceipts?.length ?? 0 - 2} operations)
                </span>
              </Button>
            </HoverCard.Trigger>
            <HoverCard.Content
              className="rounded-xs p-2 px-3"
              style={{ width }}
            >
              <TypesCounter receipts={txReceipts} />
            </HoverCard.Content>
          </HoverCard>
          <Box className={classes.lines()} />
        </HStack>
        <ReceiptItem
          receipt={last as GQLOperationReceipt}
          hasPanic={hasPanic}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {operations.map((item, i) => (
        <div key={`${i}-${item?.type ?? ''}`} className={classes.operation()}>
          {item?.receipts?.map((receipt, idx) => {
            return (
              <div
                key={`${idx}-${receipt?.item?.receiptType ?? ''}`}
                data-nested="true"
                className={classes.operation()}
              >
                <ReceiptItem
                  receipt={receipt as GQLOperationReceipt}
                  isIndented={idx > 0}
                  hasPanic={hasPanic}
                />
                <ReceiptItemR
                  receipts={receipt?.receipts as GQLOperationReceipt[]}
                  hasPanic={hasPanic}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ReceiptItemR(props: {
  receipts?: GQLOperationReceipt[];
  hasPanic: boolean;
}) {
  const classes = styles();
  return (
    <>
      {props.receipts?.map((sub, j) => (
        <div
          key={`${j}-${sub?.item?.receiptType ?? ''}`}
          data-nested="true"
          className={classes.operationChild()}
        >
          <ReceiptItem
            isIndented
            receipt={sub as GQLOperationReceipt}
            hasPanic={props.hasPanic}
          />
          {sub?.receipts && sub?.receipts?.length > 0 && (
            <ReceiptItemR receipts={sub?.receipts} hasPanic={props.hasPanic} />
          )}
        </div>
      ))}
    </>
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
  receipts?: Maybe<GQLTransactionReceiptFragment[]>;
}) {
  const receipts = items ?? [];
  const calls = receipts.filter((i) => i?.receiptType === GQLReceiptType.Call);
  const transfers = receipts.filter(
    (i) =>
      i?.receiptType === GQLReceiptType.Transfer ||
      i?.receiptType === GQLReceiptType.TransferOut,
  );
  const mints = receipts.filter((i) => i?.receiptType === GQLReceiptType.Mint);
  const burns = receipts.filter((i) => i?.receiptType === GQLReceiptType.Burn);
  const messages = receipts.filter(
    (i) => i?.receiptType === GQLReceiptType.MessageOut,
  );
  const returns = receipts.filter(
    (i) =>
      i?.receiptType === GQLReceiptType.Return ||
      i?.receiptType === GQLReceiptType.ReturnData,
  );
  const results = receipts.filter(
    (i) => i?.receiptType === GQLReceiptType.ScriptResult,
  );
  const errors = receipts.filter(
    (i) =>
      i?.receiptType === GQLReceiptType.Panic ||
      i?.receiptType === GQLReceiptType.Revert,
  );
  const logs = receipts.filter(
    (i) =>
      i?.receiptType === GQLReceiptType.Log ||
      i?.receiptType === GQLReceiptType.LogData,
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
const RETURN_TYPES = [GQLReceiptType.Return, GQLReceiptType.ReturnData];

function getBadgeColor(
  hasError: boolean,
  receipt?: Maybe<GQLTransactionReceiptFragment>,
) {
  const type = receipt?.receiptType ?? 'UNKNOWN';
  if (type === GQLReceiptType.Revert || type === GQLReceiptType.Panic) {
    return 'red';
  }
  if (
    RETURN_TYPES.some((t) => t === type) &&
    !hasError &&
    !receipt?.contractId
  ) {
    return 'green';
  }
  return 'gray';
}

export type ReceiptItemProps = BaseProps<{
  receipt?: Maybe<GQLOperationReceipt>;
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
          className="gap-0"
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
  item?: Maybe<GQLTransactionReceiptFragment>,
): Record<string, any> {
  if (!item) return {};
  return Object.entries(item).reduce((acc, [key, value]) => {
    if (!value || key === '__typename') return acc;
    if (typeof value === 'object') {
      return { ...acc, [key]: parseJson(value) };
    }
    return { ...acc, [key]: value };
  }, {});
}

function ReceiptBlock() {
  const { receipt } = useContext(ctx);
  const classes = styles();
  const [ref, { width }] = useMeasure();
  return (
    <Collapsible.Content
      ref={ref as React.Ref<HTMLDivElement>}
      className={classes.utxos()}
    >
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
    <div>
      <Badge size="1" className="font-mono" variant="ghost" color={color}>
        {type}
      </Badge>
    </div>
  );
}

function ReceiptAmount() {
  const { receipt: item } = useContext(ctx);
  const receipt = item?.item;
  const assetId = receipt?.assetId ?? '';
  const amount = bn(receipt?.amount);
  const contract = receipt?.to ?? receipt?.contractId ?? null;

  return (
    amount.gt(0) && (
      <VStack className="gap-1 items-end mobile:max-tablet:hidden">
        <Amount
          iconSize={16}
          assetId={assetId}
          value={amount}
          className="text-xs tablet:text-sm"
        />
        <Address
          iconSize={14}
          value={assetId}
          className="text-xs tablet:text-sm font-mono"
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
  const contract = receipt?.to ?? receipt?.contractId ?? null;
  const assetId = receipt?.assetId ?? '';
  const amount = bn(receipt?.amount);

  if (type === 'CALL' && Boolean(contract)) {
    return (
      <Collapsible.Header className={classes.header()}>
        <ReceiptBadge />
        <VStack className="flex-1 gap-[2px]">
          {param1 && (
            <Code
              className="text-xs tablet:text-sm font-mono bg-transparent text-muted p-0"
              color="gray"
            >
              Method: {bn(param1).toHex()}
            </Code>
          )}
          {contract && (
            <Address
              iconSize={14}
              value={contract}
              className="text-xs tablet:text-sm font-mono"
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
                assetId={receipt.contractId}
                value={bn(receipt.val)}
                className="text-xs tablet:text-sm"
              />
            )}
            {receipt.contractId && (
              <Address
                value={receipt.contractId}
                className="text-xs tablet:text-sm font-mono"
                prefix="Asset:"
                linkProps={{
                  as: NextLink,
                  href: `/contract/${receipt.contractId}/assets`,
                }}
              />
            )}
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
              className="text-xs tablet:text-sm"
            />
            <Address
              value={receipt.toAddress}
              className="text-xs tablet:text-sm font-mono"
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
              className="text-xs tablet:text-sm font-mono"
              prefix="To:"
              linkProps={{
                as: NextLink,
                href: `/account/${receipt.sender}/assets`,
              }}
            />
            <Address
              value={receipt.recipient}
              className="text-xs tablet:text-sm font-mono"
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
      <div>
        <ReceiptBadge />
      </div>
      <ReceiptAmount />
    </Collapsible.Header>
  );
}

const styles = tv({
  slots: {
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-3 mx-3 my-3 p-0 rounded',
    lines: [
      'relative flex-1 border-t border-b border-border',
      'before:h-[1px] before:absolute before:top-1/2 before:left-0',
      'before:w-full before:bg-border before:content-[""]',
    ],
    receiptRow: 'peer relative',
    header: 'group min-h-[42px] gap-2 tablet:gap-4',
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
    operationChild: [
      'relative flex flex-col gap-3 ml-5',
      'tablet:ml-10',
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
          'ml-5 before:absolute before:top-[-35px] before:left-[-20px]',
          'tablet:ml-10 tablet:before:left-[-40px]',
          'before:bottom-[20px] before:right-[100%]',
          'before:content-[""] before:block before:border-l before:border-b',
          'before:border-border before:border-dashed before:rounded-bl',
          '[&[data-opened=true]:before+&]:top-[-120px]',
        ],
      },
    },
  },
});
