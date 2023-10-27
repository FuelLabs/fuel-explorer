import type { ContractItemFragment } from '@fuel-explorer/graphql';
import { Box, Copyable, Flex, Tabs, VStack, useFuelAddress } from '@fuels/ui';
import {
  IconChecklist,
  IconCodeAsterix,
  IconCoins,
  IconSquareRoundedPlus,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';

import { TabAssets } from './TabAssets';
import { TabMinted } from './TabMinted';
import { TabSource } from './TabSource';
import { TabTransactions } from './TabTransactions';

type ContractScreenProps = {
  contract: ContractItemFragment;
};

export function ContractScreenSimple({ contract }: ContractScreenProps) {
  const { short, address } = useFuelAddress(contract.id);
  const router = useRouter();
  const pathname = usePathname();
  const tabPathname = pathname?.split('/').slice(-1)[0];

  return (
    <VStack>
      <Flex gap="4">
        <CardInfo name="Id" className="flex-[0_0_33%]">
          <Copyable value={address}>{short}</Copyable>
        </CardInfo>
      </Flex>
      <Tabs
        defaultValue={tabPathname || ''}
        onValueChange={(tabChoosed) =>
          router.push(`/contract/${contract.id}/${tabChoosed}`)
        }
      >
        <Tabs.List>
          <Tabs.Trigger value="transactions">
            <IconChecklist size={15} className="mr-1" />
            Transactions
          </Tabs.Trigger>
          <Tabs.Trigger value="assets">
            <IconCoins size={15} className="mr-1" />
            Assets
          </Tabs.Trigger>
          <Tabs.Trigger value="minted">
            <IconSquareRoundedPlus size={15} className="mr-1" />
            Minted
          </Tabs.Trigger>
          <Tabs.Trigger value="source">
            <IconCodeAsterix size={15} className="mr-1" />
            Source code
          </Tabs.Trigger>
        </Tabs.List>
        <Box className="pt-3 pb-2">
          <Tabs.Content value={tabPathname || ''}>
            {tabPathname === 'transactions' && <TabTransactions />}
            {tabPathname === 'assets' && <TabAssets />}
            {tabPathname === 'minted' && <TabMinted />}
            {tabPathname === 'source' && (
              <TabSource bytecode={contract.bytecode} />
            )}
          </Tabs.Content>
        </Box>
      </Tabs>
    </VStack>
  );
}
