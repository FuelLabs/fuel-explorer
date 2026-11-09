import { useTranslation } from 'react-i18next';
import { EmptyRow } from '~staking/systems/Core/components/EmptyRow/EmptyRow';

type TransactionHistoryEmptyProps = {
  onStartStaking: () => void;
};

export const TransactionHistoryEmpty = ({
  onStartStaking,
}: TransactionHistoryEmptyProps) => {
  const { t } = useTranslation();
  return (
    <EmptyRow
      text={t('staking.empty.transactions')}
      actionLabel={t('staking.empty.start')}
      onAction={onStartStaking}
    />
  );
};
