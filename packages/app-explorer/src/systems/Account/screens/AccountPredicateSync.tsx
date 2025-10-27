import { useAccountPredicate } from '~/hooks/useApi';
import { AccountPredicate } from '../components/AccountPredicate/AccountPredicate';

export function AccountPredicateSync({ id }: { id: string }) {
  const { data: predicate, isLoading, error } = useAccountPredicate(id);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500">
          Error loading account predicate: {error.message}
        </div>
      </div>
    );
  }

  return <AccountPredicate predicate={predicate} id={id} />;
}
