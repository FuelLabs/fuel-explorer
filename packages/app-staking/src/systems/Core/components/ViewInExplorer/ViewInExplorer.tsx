import { Toast } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import type { PendingTransactionL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import { getTransactionLink } from '../../utils/getTransactionLink';

type ViewInExplorerProps = {
  hash: Address | string;
  layer?: PendingTransactionL1['layer'];
};

export function ViewInExplorer({ hash, layer = 'l1' }: ViewInExplorerProps) {
  const { t } = useTranslation();
  return (
    <Toast.Action
      altText={t('staking.toast.view_explorer')}
      onClick={() => {
        window.open(
          getTransactionLink(hash, layer),
          '_blank',
          'noopener noreferrer',
        );
      }}
    >
      {t('staking.toast.view_explorer')}
    </Toast.Action>
  );
}
