import { getBalances } from '~/systems/Account/actions/get-balances';
import { AccountScreen } from '~/systems/Account/screens/AccountScreen/AccountScreen';

type AccountProps = {
  params: {
    id: string | null;
  };
};

export default async function Account({ params: { id = null } }: AccountProps) {
  const balances = await getBalances({ owner: id });
  return <AccountScreen balances={balances} />;
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
