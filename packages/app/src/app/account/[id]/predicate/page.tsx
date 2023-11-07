import { getPredicate } from '~/systems/Account/actions/get-predicate';
import { AccountPredicate } from '~/systems/Account/screens/AccountPredicate/AccountPredicate';

type PageProps = {
  params: {
    id: string | null;
  };
};

export default async function AccountPredicatePage({
  params: { id },
}: PageProps) {
  const predicate = await getPredicate({ owner: id });

  if (!predicate?.bytecode) return null;

  return <AccountPredicate bytecode={predicate.bytecode} />;
}

export const revalidate = 100;
