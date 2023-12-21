import { Suspense } from 'react';
import { AssetsLoader } from '~/systems/Asset/components/AssetsLoader';
import { CodeBlock } from '~/systems/Core/components/CodeBlock/CodeBlock';

import { ContractTabs } from '../components/ContractTabs';
import { ContractTitle } from '../components/ContractTitle';
import { isAssetsTab, isCodeTab } from '../utils/tabs';

import { ContractAssets } from './ContractAsset';
import { ContractCode } from './ContractCode';

type ContractProps = {
  tab: string;
  id: string;
};

export async function ContractScreen({ tab, id }: ContractProps) {
  return (
    <>
      <ContractTitle id={id} />
      <ContractTabs contractId={id} />
      {isAssetsTab(tab) && (
        <Suspense fallback={<AssetsLoader />}>
          <ContractAssets id={id} />
        </Suspense>
      )}
      {isCodeTab(tab) && (
        <Suspense fallback={<CodeBlock isLoading value="_" />}>
          <ContractCode id={id} />
        </Suspense>
      )}
    </>
  );
}
