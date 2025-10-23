import { Flex, HStack } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { DEFAULT_PAGETITLE_MB } from 'app-commons';
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
      <Flex gap="2" align="start" justify="between" mb={DEFAULT_PAGETITLE_MB}>
        <HStack align="start" gap="4">
          <MetadataLogo type="Wallet" />
          <AccountTitle id={id} />
        </HStack>
        <HStack>
          {balancesLoading ? (
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
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
        </HStack>
      </Flex>
      <AccountTabs address={id} isPredicate={!!predicate?.bytecode} />
    </>
  );
}
