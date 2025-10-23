import { Alert, Button } from '@fuels/ui';
import { IconInfoCircle, IconLink } from '@tabler/icons-react';
import { Routes as PortalRoutes } from 'app-commons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccountTransactions } from '~/hooks/useApi';
import { EmptyTransactions } from '~/systems/Core/components/EmptyBlocks/EmptyTransactions';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';

type AccountTransactionsProps = {
  id: string;
  cursor?: string | null;
  dir?: 'after' | 'before';
};

export function AccountTransactionsSync({
  id,
  cursor,
  dir = 'after',
}: AccountTransactionsProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const _cursor = searchParams.get('cursor') ?? cursor;
  const _dir = (searchParams.get('dir') ?? dir) as 'after' | 'before';

  const {
    data: txs,
    isLoading,
    isFetching,
    error,
  } = useAccountTransactions(id, {
    cursor: _cursor || undefined,
    direction: _dir,
  });

  // Bridge warning component - always visible
  const BridgeWarning = (
    <Alert color="blue" className="mt-1 mb-6">
      <Alert.Icon>
        <IconInfoCircle size="md" />
      </Alert.Icon>
      <Alert.Text>
        Bridge transactions will not appear here. You must connect your wallet
        and go to{' '}
        <Button
          onClick={() => {
            navigate(PortalRoutes.bridgeHistory());
          }}
          variant="link"
          className="mx-0.5 mb-0 mt-[-1px] text-blue-12"
        >
          Bridge {'>'} History
          <IconLink className="text-inherit" size={18} />
        </Button>
        to view your bridge transactions.
      </Alert.Text>
    </Alert>
  );

  if (isLoading || isFetching) {
    return (
      <>
        {BridgeWarning}
        <TxListLoader numberOfTxs={10} />
      </>
    );
  }

  if (error) {
    return (
      <>
        {BridgeWarning}
        <div className="text-center py-12">
          <div className="text-red-500">
            Error loading account transactions: {error.message}
          </div>
        </div>
      </>
    );
  }

  if (!txs?.nodes?.length) {
    return (
      <>
        {BridgeWarning}
        <EmptyTransactions entity="account" />
      </>
    );
  }

  return (
    <>
      {BridgeWarning}
      <TxList
        transactions={txs.nodes}
        pageInfo={txs.pageInfo}
        owner={id}
        route="accountTxs"
      />
    </>
  );
}
