import { getBalances } from '../actions/get-balances';
import { AccountAssets } from '../components/AccountAssets/AccountAssets';

type AccountAssetsProps = {
  id: string;
};

export async function AccountBalances({ id }: AccountAssetsProps) {
  const balances = await getBalances({ owner: id });

  return <AccountAssets balances={balances} id={id} />;
}
