import { VStack } from '@fuels/ui';
import { Icon } from '@fuels/ui';
import { IconListDetails } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { useState } from 'react';
import { CodeBlock } from '~portal/systems/Core/components/CodeBlock/Codeblock';
import { Hero } from '../components/Hero/Hero';
import { NFTsHolderTable } from '../components/NFTsHolderTable/NFTsHolderTable';
import { NFTsTable } from '../components/NFTsTable/NFTsTable';
import TxsButtonContainer from '../components/TxsButtonContainer/TxsButtonContainer';
import { TxsTabList } from '../components/TxsTabList/TxsTabList';

export function NFTs() {
  const block = {
    id: '0xb065d39c4a782dd3b93196a3f9c1a88f34c441446c0776eb4bf0eee84e410a8c',
    blockHeight: '8723092',
    gasCosts: {
      fee: '0',
      gasUsed: '0',
    },
    groupedInputs: [],
    groupedOutputs: [],
    operations: [],
    receipts: [],
    hasPredicate: false,
    statusType: 'Success',
    title: 'Mint',
    time: {
      fromNow: 'a few seconds ago',
      full: '26 Aug 2024 - 12:41:24 PM',
      rawUnix: '1724676084',
    },
    __typename: 'Transaction',
    maturity: null,
    txPointer: '00851a940000',
    isScript: false,
    isCreate: false,
    isMint: true,
    witnesses: null,
    receiptsRoot: null,
    script: null,
    scriptData: null,
    bytecodeWitnessIndex: null,
    salt: null,
    storageSlots: null,
    rawPayload:
      '0x00000000000000020000000000851a940000000000000000c54c80a83eaeaa9d541f597f9247622a8ffcd1160d9c7ac336306545d1b02a6e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000851a93000000000000000077777777777777777777777777777777777777777777777777777777777777770000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad0700000000000003e8',
    mintAmount: '0',
    mintAssetId:
      '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
    inputContract: {
      contractId:
        '0x7777777777777777777777777777777777777777777777777777777777777777',
    },
    outputContract: {
      inputIndex: '0',
    },
    status: {
      __typename: 'SuccessStatus',
      time: '4611686020152064025',
      block: {
        id: '0x76dad1aad43ad175beed3bbd6d030006297b65b72450366de75952f6ab353e6a',
        header: {
          id: '0x76dad1aad43ad175beed3bbd6d030006297b65b72450366de75952f6ab353e6a',
          height: '8723092',
          daHeight: '6574833',
          applicationHash:
            '0x0ca76890689f30713f48c2de2a757633885c78105a1e33e1e34692f3a3854708',
          messageReceiptCount: '0',
          time: '4611686020152064025',
        },
      },
      programState: null,
    },
    inputAssetIds: null,
    inputContracts: [
      '0x7777777777777777777777777777777777777777777777777777777777777777',
    ],
    inputs: null,
    outputs: [],
  };
  const [activeTab, setActiveTab] = useState('Activity'); // Default active tab
  return (
    <VStack>
      <Hero />
      <div className="my-5">
        <PageTitle icon={<Icon icon={IconListDetails} />}>Activity</PageTitle>
        <TxsTabList activeTab={activeTab} setActiveTab={setActiveTab} />
        <TxsButtonContainer
          isContract={activeTab === 'Contract' ? true : false}
        />
        {activeTab === 'Activity' ? (
          <NFTsTable />
        ) : activeTab === 'Holders' ? (
          <NFTsHolderTable />
        ) : activeTab === 'Contract' ? (
          <CodeBlock value={block} type="json" title="Contract" />
        ) : (
          ''
        )}
      </div>
    </VStack>
  );
}
