import { VStack } from '@fuels/ui';
import { Icon } from '@fuels/ui';
import { IconListDetails } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { useState } from 'react';
import { Hero } from '../components/Hero/Hero';
import { NFTsHolderTable } from '../components/NFTsHolderTable/NFTsHolderTable';
import { NFTsTable } from '../components/NFTsTable/NFTsTable';
import TxsButtonContainer from '../components/TxsButtonContainer/TxsButtonContainer';
import { TxsTabList } from '../components/TxsTabList/TxsTabList';

export function NFTs() {
  const [activeTab, setActiveTab] = useState('Activity'); // Default active tab
  return (
    <VStack>
      <Hero />
      <div>
        <PageTitle icon={<Icon icon={IconListDetails} />}>Activity</PageTitle>
        <TxsTabList activeTab={activeTab} setActiveTab={setActiveTab} />
        <TxsButtonContainer />
        {activeTab === 'Activity' ? (
          <NFTsTable />
        ) : activeTab === 'Holders' ? (
          <NFTsHolderTable />
        ) : (
          'Hello This is Contract'
        )}
      </div>
    </VStack>
  );
}
