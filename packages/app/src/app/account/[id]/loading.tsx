import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AssetsSkeleton } from '~/systems/Asset/components/AssetsSkeleton';

export default function Loading() {
  return (
    <>
      <AccountTabs isLoading />
      <AssetsSkeleton />
    </>
  );
}
