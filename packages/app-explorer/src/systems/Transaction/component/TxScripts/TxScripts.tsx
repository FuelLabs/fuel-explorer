import { Button, LoadingWrapper, cx } from '@fuels/ui';
import { IconFold } from '@fuels/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { TxScriptsContent } from '~/systems/Transaction/component/TxScripts/TxScriptsContent/TxScriptsContent';
import { TxSection } from '../TxItem/TxSection';
import { TxItemLoader } from '../TxItemLoader';
import type { TxScriptsProps } from './types';

export function TxScripts({ tx, isLoading, index, className }: TxScriptsProps) {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const hasOperations = !!tx?.operations?.length;

  return (
    <TxSection
      title={t('tx.operations')}
      index={index}
      className={className}
      action={
        <Button
          className={cx(
            '[transition-property:opacity,visibility] duration-200 motion-reduce:transition-none',
            !opened && 'invisible opacity-0',
          )}
          variant="ghost"
          color="gray"
          size="1"
          leftIcon={IconFold}
          onClick={() => setOpened(false)}
        >
          {t('tx.collapse')}
        </Button>
      }
    >
      <LoadingWrapper
        repeatLoader={2}
        isLoading={isLoading}
        noItems={!hasOperations}
        regularEl={
          <TxScriptsContent tx={tx} opened={opened} setOpened={setOpened} />
        }
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
