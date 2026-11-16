import { LoadingBox } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { useAccountPredicate } from '~/hooks/useApi';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { AccountPredicate } from '../components/AccountPredicate/AccountPredicate';

export function AccountPredicateSync({ id }: { id: string }) {
  const { t } = useTranslation();
  const { data: predicate, isLoading, error } = useAccountPredicate(id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <LoadingBox className="h-8 w-1/4" />
        {[1, 2, 3].map((i) => (
          <LoadingBox key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <PageState
        tone="error"
        title={t('account.error_predicate')}
        description={error.message}
      />
    );
  }

  return <AccountPredicate predicate={predicate} id={id} />;
}
