import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import type { GQLOperationReceipt } from '@fuel-explorer/graphql/sdk';
import { Box, HStack } from '@fuels/ui';
import { Fragment, type ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { TxExpand } from '~/systems/Transaction/component/TxItem/TxExpand';
import { ReceiptItem } from '~/systems/Transaction/component/TxScripts/ReceiptItem/ReceiptItem';
import { ReceiptItemR } from '~/systems/Transaction/component/TxScripts/ReceiptItemR/ReceiptItemR';
import { hasFoldedOperations } from '~/systems/Transaction/component/TxScripts/utils';
import { styles } from './styles';
import type { ScriptsContentProps } from './types';

// A folded block inside a gap-3 column. The negative margin cancels the
// column gap while folded and the inner padding restores it while open, so
// the rows around the fold keep their spacing in both states.
function Fold({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <TxExpand open={open} className="-mt-3" releaseOverflow>
      <div className="flex flex-col gap-3 pt-3">{children}</div>
    </TxExpand>
  );
}

function _TxScriptsContent({ tx, opened }: ScriptsContentProps) {
  const { t } = useTranslation();
  const operations = tx?.operations ?? [];
  const classes = styles();

  if (!operations.length) {
    return (
      <EmptyCard hideImage>
        <EmptyCard.Title>{t('tx.no_scripts')}</EmptyCard.Title>
        <EmptyCard.Description>{t('tx.no_scripts_body')}</EmptyCard.Description>
      </EmptyCard>
    );
  }

  const hasPanic = operations?.some((o) =>
    o?.receipts?.some(
      (r) =>
        r?.item?.receiptType === GQLReceiptType.Panic ||
        r?.item?.receiptType === GQLReceiptType.Revert,
    ),
  );

  // More than three receipts show the first and the last until expanded.
  // Receipts in between are not mounted. The Expand control is in the header.
  const foldable = hasFoldedOperations(tx);
  const open = !foldable || Boolean(opened);
  // First and last receipt over the flattened list, so an operation with no
  // receipts at either end does not hide the pinned rows.
  const withReceipts = operations
    .map((o, i) => (o?.receipts?.length ? i : -1))
    .filter((i) => i >= 0);
  const firstOp = withReceipts[0] ?? 0;
  const lastOp = withReceipts[withReceipts.length - 1] ?? operations.length - 1;
  const lastIdx = (operations[lastOp]?.receipts?.length ?? 0) - 1;

  const foldedMarker = (
    <HStack className="items-center">
      <Box className={classes.lines()} />
      <span className="fuel-label text-[var(--fuel-element-low-em)]">
        {t('tx.expand_more', { count: tx?.receipts?.length ?? 0 })}
      </span>
      <Box className={classes.lines()} />
    </HStack>
  );

  return (
    <div className="flex flex-col gap-3">
      {operations.map((item, i) => {
        if (foldable && !open && i !== firstOp && i !== lastOp) return null;
        return (
          <div key={`${i}-${item?.type ?? ''}`} className={classes.operation()}>
            {item?.receipts?.map((receipt, idx) => {
              const key = `${idx}-${receipt?.item?.receiptType ?? ''}`;
              const isFirst = i === firstOp && idx === 0;
              const isLast = i === lastOp && idx === lastIdx;
              if (foldable && !open && !isFirst && !isLast) return null;
              const pinned = foldable && (isFirst || isLast);
              const subs =
                receipt?.receipts?.length && (!pinned || open) ? (
                  <ReceiptItemR
                    receipts={receipt.receipts as GQLOperationReceipt[]}
                    hasPanic={hasPanic}
                  />
                ) : null;
              const row = (
                <div
                  key={key}
                  data-nested={open || !pinned}
                  className={`${classes.operation()} fuel-appear`}
                >
                  <ReceiptItem
                    receipt={receipt as GQLOperationReceipt}
                    isIndented={idx > 0 && (open || !pinned)}
                    hasPanic={hasPanic}
                  />
                  {pinned && subs ? <Fold open={open}>{subs}</Fold> : subs}
                </div>
              );
              if (!foldable || isLast) return row;
              if (isFirst) {
                return (
                  <Fragment key={key}>
                    {row}
                    <Fold open={!open}>{foldedMarker}</Fold>
                  </Fragment>
                );
              }
              return (
                <Fold key={key} open={open}>
                  {row}
                </Fold>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export const TxScriptsContent = memo(_TxScriptsContent);
