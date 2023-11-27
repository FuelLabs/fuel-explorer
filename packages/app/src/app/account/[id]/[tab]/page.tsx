import { redirect } from 'next/navigation';
import { getPredicate } from '~/systems/Account/actions/get-predicate';
import { AccountScreen } from '~/systems/Account/screens/Account';
import { isAllowedTab } from '~/systems/Account/utils/tabs';

type AccountProps = {
  params: {
    id: string;
    tab: string;
  };
};

export default async function Account({ params: { id, tab } }: AccountProps) {
  if (!isAllowedTab(tab)) {
    redirect(`/account/${id}/assets`);
  }
  const predicate = await getPredicate({ owner: id });

  return <AccountScreen predicate={predicate || undefined} id={id} tab={tab} />;
}

export const revalidate = 10;
