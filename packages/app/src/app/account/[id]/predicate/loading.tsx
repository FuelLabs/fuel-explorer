import { AccountTabs } from '~/systems/Account/components/AccountTabs/AccountTabs';
import { CodeBlockSkeleton } from '~/systems/Core/components/CodeBlock/CodeBlockSkeleton';

export default function Loading() {
  return (
    <>
      <AccountTabs isLoading />
      <CodeBlockSkeleton />
    </>
  );
}
