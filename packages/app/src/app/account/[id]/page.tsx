import { getBalances } from '~/systems/Account/actions/get-balances';
import { AccountBalances } from '~/systems/Account/screens/AccountBalances';

type AccountProps = {
  params: {
    id: string | null;
  };
};

export default async function Account({ params: { id = null } }: AccountProps) {
  const balances = await getBalances({ owner: id });
  return <AccountBalances balances={balances} />;
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
