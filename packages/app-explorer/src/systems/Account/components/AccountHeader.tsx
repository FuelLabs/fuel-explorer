import { LoadingBox } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useAccountBalances, useAccountPredicate } from '~/hooks/useApi';
import { MetadataLogo } from '~/systems/Core/components/MetadataLogo/MetadataLogo';
import { fetchExchangeInfo } from '~/systems/Ecosystem/actions/fetchExchangeInfo';
import { AccountLinks } from './AccountLinks/AccountLinks';
import { AccountTabs } from './AccountTabs/AccountTabs';
import { AccountTitle } from './AccountTitle/AccountTitle';
import { ExchangeLinks } from './ExchangeLinks/ExchangeLinks';
import { SendTransactionDialog } from './SendTransactionDialog/SendTransactionDialog';

export function AccountHeader() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  const { data: balances, isLoading: balancesLoading } = useAccountBalances(id);
  const { data: predicate } = useAccountPredicate(id);

  const { data: exchangeData } = useQuery({
    queryKey: ['exchange-info', id],
    queryFn: () => fetchExchangeInfo({ address: id }),
    enabled: !!id,
  });

  const exchangeInfo = exchangeData?.isExchange
    ? exchangeData.exchangeInfo
    : null;

  // For now, we'll skip predicate metadata
  // These can be added later when needed
  const project = null;
  const metadata = null;

  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-x-10 gap-y-4 pt-6 pb-6">
        <div className="flex min-w-0 items-start gap-4">
          <div className="shrink-0">
            <MetadataLogo type="Wallet" />
          </div>
          <AccountTitle id={id} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {balancesLoading ? (
            <LoadingBox className="h-10 w-32" />
          ) : (
            <SendTransactionDialog
              balances={balances || []}
              accountAddress={id}
            />
          )}
          {project && metadata && (
            <AccountLinks project={project} metadata={metadata} />
          )}
          {exchangeInfo && <ExchangeLinks exchange={exchangeInfo} showBadge />}
        </div>
      </header>
      <AccountTabs address={id} isPredicate={!!predicate?.bytecode} />
    </>
  );
}
