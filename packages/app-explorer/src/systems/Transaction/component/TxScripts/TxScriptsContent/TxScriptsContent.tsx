import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import type { GQLOperationReceipt } from '@fuel-explorer/graphql/sdk';
import { Box, Button, HStack, HoverCard } from '@fuels/ui';
import { IconArrowsMoveVertical } from '@fuels/ui';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMeasure } from 'react-use';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { TxExpand } from '~/systems/Transaction/component/TxItem/TxExpand';
import { ReceiptItem } from '~/systems/Transaction/component/TxScripts/ReceiptItem/ReceiptItem';
import { ReceiptItemR } from '~/systems/Transaction/component/TxScripts/ReceiptItemR/ReceiptItemR';
import { TypesCounter } from '~/systems/Transaction/component/TxScripts/TypesCounter/TypesCounter';
import { styles } from './styles';
import type { ScriptsContentProps } from './types';

// Mounts the full list on first open, then folds it with the panel so both
// directions ease. Reduced motion skips the transition in TxExpand.
function useFold(opened: boolean) {
  const [mounted, setMounted] = useState(opened);
  const [shown, setShown] = useState(opened);
  useEffect(() => {
    if (!opened) {
      setShown(false);
      return;
    }
    setMounted(true);
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [opened]);
  return { mounted, shown };
}

function _TxScriptsContent({ tx, opened, setOpened }: ScriptsContentProps) {
  const { t } = useTranslation();
  const operations = tx?.operations ?? [];
  const classes = styles();
  const [ref, { width }] = useMeasure();
  const fold = useFold(Boolean(opened));

  if (!operations.length) {
    return (
      <EmptyCard hideImage>
        <EmptyCard.Title>{t('tx.no_scripts')}</EmptyCard.Title>
        <EmptyCard.Description>{t('tx.no_scripts_body')}</EmptyCard.Description>
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

  const summary = (
    <>
      <ReceiptItem receipt={first as GQLOperationReceipt} hasPanic={hasPanic} />
      <HStack>
        <Box className={classes.lines()} />
        <HoverCard openDelay={100}>
          <HoverCard.Trigger>
            <Button
              ref={ref as React.Ref<HTMLButtonElement>}
              color="gray"
              variant="ghost"
              leftIcon={IconArrowsMoveVertical}
              onClick={() => setOpened(true)}
            >
              {t('tx.expand')}{' '}
              <span className="text-[var(--fuel-element-low-em)]">
                {t('tx.expand_more', { count: txReceipts?.length ?? 0 })}
              </span>
            </Button>
          </HoverCard.Trigger>
          <HoverCard.Content className="p-2 px-3" style={{ width }}>
            <TypesCounter receipts={txReceipts} />
          </HoverCard.Content>
        </HoverCard>
        <Box className={classes.lines()} />
      </HStack>
      <ReceiptItem receipt={last as GQLOperationReceipt} hasPanic={hasPanic} />
    </>
  );

  const list = (
    <div className="flex flex-col gap-3">
      {operations.map((item, i) => (
        <div key={`${i}-${item?.type ?? ''}`} className={classes.operation()}>
          {item?.receipts?.map((receipt, idx) => {
            return (
              <div
                key={`${idx}-${receipt?.item?.receiptType ?? ''}`}
                data-nested="true"
                className={`${classes.operation()} fuel-appear`}
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

  if (receipts.length <= 3) return list;

  // Long lists show the first and last receipt until opened.
  return (
    <>
      <TxExpand open={!opened}>{summary}</TxExpand>
      {fold.mounted && <TxExpand open={fold.shown}>{list}</TxExpand>}
    </>
  );
}

export const TxScriptsContent = memo(_TxScriptsContent);
