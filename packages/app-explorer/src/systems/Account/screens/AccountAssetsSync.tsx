import { useAccountBalances } from '~/hooks/useApi';
import { AccountAssets } from '../components/AccountAssets/AccountAssets';
import { AccountAssetsLoader } from '../components/AccountAssets/AccountAssetsLoader';

type AccountAssetsProps = {
  id: string;
};

export function AccountAssetsSync({ id }: AccountAssetsProps) {
  const {
    data: balances,
    isLoading,
    isFetching,
    error,
  } = useAccountBalances(id);

  if (isLoading || isFetching) {
    return <AccountAssetsLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500">
          Error loading account balances: {error.message}
        </div>
      </div>
    );
  }

  return <AccountAssets balances={balances || []} id={id} />;
}
