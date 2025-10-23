import { Toast } from '@fuels/ui';
import type { Address } from 'viem';
import type { PendingTransactionL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import { getTransactionLink } from '../../utils/getTransactionLink';

type ViewInExplorerProps = {
  hash: Address | string;
  layer?: PendingTransactionL1['layer'];
};

export function ViewInExplorer({ hash, layer = 'l1' }: ViewInExplorerProps) {
  return (
    <Toast.Action
      altText="View"
      onClick={() => {
        window.open(
          getTransactionLink(hash, layer),
          '_blank',
          'noopener noreferrer',
        );
      }}
    >
      View in explorer
    </Toast.Action>
  );
}
