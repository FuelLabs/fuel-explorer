import { headers } from 'next/headers';
import { AssetsLoader } from '~/systems/Asset/components/AssetsLoader';
import { ContractTabs } from '~/systems/Contract/components/ContractTabs';
import { ContractTitle } from '~/systems/Contract/components/ContractTitle';
import { isAssetsTab, isCodeTab } from '~/systems/Contract/utils/tabs';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

export default function Loading() {
  /* as the params (id, tab) are not passed to Loading component
   * we get it froim headers passed to next */
  const headerProps = headers();
  const nextUrl = headerProps.get('next-url') || '';
  const referer = headerProps.get('referer') || '';

  /* get tab from nextUrl, if it exists.
   * it will exist when the route is contract/[id]/[tab],
   * it will not exist when the route is contract/[id] */
  const tab = nextUrl.split('/')[3];

  /* get id from referer because will always be there
   * for both routes */
  const id = referer.split('/')[4];

  return (
    <>
      <ContractTitle id={id} />
      <ContractTabs isLoading />
      {isAssetsTab(tab) && <AssetsLoader />}
      {isCodeTab(tab) && <CodeBlock isLoading value="_" />}
    </>
  );
}
