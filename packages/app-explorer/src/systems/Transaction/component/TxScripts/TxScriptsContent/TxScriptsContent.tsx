import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import type { GQLOperationReceipt } from '@fuel-explorer/graphql/sdk';
import { Box, Button, HStack, HoverCard } from '@fuels/ui';
import { IconArrowsMoveVertical } from '@tabler/icons-react';
import { memo } from 'react';
import { useMeasure } from 'react-use';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { ReceiptItem } from '~/systems/Transaction/component/TxScripts/ReceiptItem/ReceiptItem';
import { ReceiptItemR } from '~/systems/Transaction/component/TxScripts/ReceiptItemR/ReceiptItemR';
import { TypesCounter } from '~/systems/Transaction/component/TxScripts/TypesCounter/TypesCounter';
import { styles } from './styles';
import type { ScriptsContentProps } from './types';

function _TxScriptsContent({ tx, opened, setOpened }: ScriptsContentProps) {
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

export const TxScriptsContent = memo(_TxScriptsContent);
