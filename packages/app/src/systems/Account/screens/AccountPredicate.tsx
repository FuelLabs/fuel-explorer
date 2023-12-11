import { getPredicate } from '../actions/get-predicate';
import { AccountPredicate } from '../components/AccountPredicate/AccountPredicate';

export async function AccountPredicateScreen({ id }: { id: string }) {
  const predicate = await getPredicate({ owner: id });

  return <AccountPredicate predicate={predicate || undefined} id={id} />;
}
