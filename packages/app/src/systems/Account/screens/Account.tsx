import { getPredicate } from '../actions/get-predicate';
import { Account } from '../components/_server/Account/Account';

export async function AccountScreen({ id, tab }: { id: string; tab: string }) {
  const predicate = await getPredicate({ owner: id });

  return <Account predicate={predicate || undefined} id={id} tab={tab} />;
}
