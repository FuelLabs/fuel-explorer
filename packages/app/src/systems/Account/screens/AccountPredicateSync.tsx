import { getPredicate } from '../actions/get-predicate';
import { AccountPredicate } from '../components/AccountPredicate/AccountPredicate';

export async function AccountPredicateSync({ id }: { id: string }) {
  const predicate = await getPredicate({ owner: id });

  return <AccountPredicate predicate={predicate || undefined} id={id} />;
}
