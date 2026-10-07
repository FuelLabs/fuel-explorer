import { useTranslation } from 'react-i18next';
import { EmptyRow } from '~staking/systems/Core/components/EmptyRow/EmptyRow';

type DelegatedPositionsEmptyProps = {
  onStartStaking: () => void;
};

export const DelegatedPositionsEmpty = ({
  onStartStaking,
}: DelegatedPositionsEmptyProps) => {
  const { t } = useTranslation();
  return (
    <EmptyRow
      text={t('staking.empty.positions')}
      actionLabel={t('staking.empty.start')}
      onAction={onStartStaking}
    />
  );
};
