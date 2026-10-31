import { useTranslation } from 'react-i18next';
import { EmptyRow } from '~staking/systems/Core/components/EmptyRow/EmptyRow';

type DelegatedPositionsConnectProps = {
  onConnect: () => void;
};

export const DelegatedPositionsConnect = ({
  onConnect,
}: DelegatedPositionsConnectProps) => {
  const { t } = useTranslation();
  return (
    <EmptyRow
      text={t('staking.connect_positions')}
      actionLabel={t('staking.connect_ethereum')}
      onAction={onConnect}
    />
  );
};
