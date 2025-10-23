import { useAccountBalances } from '~/hooks/useApi';
import { AccountNfts } from '../components/AccountNfts/AccountNfts';
import { AccountNftsLoader } from '../components/AccountNfts/AccountNftsLoader';

type AccountNftsProps = {
  id: string;
};

export function AccountNftsSync({ id }: AccountNftsProps) {
  const {
    data: balances,
    isLoading,
    isFetching,
    error,
  } = useAccountBalances(id);

  if (isLoading || isFetching) {
    return <AccountNftsLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500">
          Error loading account NFTs: {error.message}
        </div>
      </div>
    );
  }

  return <AccountNfts balances={balances || []} />;
}
