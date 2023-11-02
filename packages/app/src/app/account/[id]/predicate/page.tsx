import { getPredicateBytecode } from '~/systems/Account/actions/get-predicate-bytecode';
import { AccountPredicate } from '~/systems/Account/screens/AccountPredicate/AccountPredicate';

type PageProps = {
  params: {
    id: string | null;
  };
};

export default async function AccountPredicatePage({
  params: { id },
}: PageProps) {
  const bytecode = await getPredicateBytecode({ owner: id });
  return <AccountPredicate bytecode={bytecode} />;
}

export const revalidate = 100;
