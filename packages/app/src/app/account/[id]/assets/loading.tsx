import { AccountAssetsLoader } from '~/systems/Account/components/AccountAssets/AccountAssetsLoader';
import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { AccountTitle } from '~/systems/Account/components/AccountTitle/AccountTitle';

export default function Loading() {
  return (
    <>
      <AccountTitle isLoading id={''} />
      <AccountTabs isLoading />
      <AccountAssetsLoader />
    </>
  );
}
