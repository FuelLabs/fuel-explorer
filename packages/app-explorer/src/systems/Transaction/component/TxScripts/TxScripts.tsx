import { Button, HoverCard, LoadingWrapper } from '@fuels/ui';
import { IconArrowsMoveVertical, IconFold } from '@fuels/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { TxScriptsContent } from '~/systems/Transaction/component/TxScripts/TxScriptsContent/TxScriptsContent';
import { TypesCounter } from '~/systems/Transaction/component/TxScripts/TypesCounter/TypesCounter';
import { TxSection } from '../TxItem/TxSection';
import { TxItemLoader } from '../TxItemLoader';
import type { TxScriptsProps } from './types';
import { hasFoldedOperations } from './utils';

export function TxScripts({ tx, isLoading, index, className }: TxScriptsProps) {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const hasOperations = !!tx?.operations?.length;
  const foldable = hasFoldedOperations(tx);

  const toggle = (
    <Button
      variant="ghost"
      color="gray"
      size="1"
      leftIcon={opened ? IconFold : IconArrowsMoveVertical}
      onClick={() => setOpened((value) => !value)}
    >
      {opened ? t('tx.collapse') : t('tx.expand')}
    </Button>
  );

  return (
    <TxSection
      title={t('tx.operations')}
      index={index}
      className={className}
      action={
        foldable &&
        (opened ? (
          toggle
        ) : (
          <span className="flex items-center gap-2">
            {/* Touch has no hover, so the count is also printed inline. */}
            <span className="fuel-caption tabular-nums">
              {t('tx.expand_more', { count: tx?.receipts?.length ?? 0 })}
            </span>
            <HoverCard openDelay={100}>
              <HoverCard.Trigger>{toggle}</HoverCard.Trigger>
              <HoverCard.Content className="p-2 px-3">
                <TypesCounter receipts={tx?.receipts ?? []} />
              </HoverCard.Content>
            </HoverCard>
          </span>
        ))
      }
    >
      <LoadingWrapper
        repeatLoader={2}
        isLoading={isLoading}
        noItems={!hasOperations}
        regularEl={<TxScriptsContent tx={tx} opened={opened} />}
        loadingEl={<TxItemLoader />}
        noItemsEl={
          <EmptyCard hideImage>
            <EmptyCard.Title>{t('tx.no_operations')}</EmptyCard.Title>
            <EmptyCard.Description>
              {t('tx.no_operations_body')}
            </EmptyCard.Description>
          </EmptyCard>
        }
      />
    </TxSection>
  );
}
