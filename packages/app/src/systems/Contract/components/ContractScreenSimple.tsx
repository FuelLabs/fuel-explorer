import type { ContractItemFragment } from '@fuel-explorer/graphql';
import {
  Box,
  Copyable,
  Flex,
  Tabs,
  Text,
  VStack,
  useFuelAddress,
} from '@fuels/ui';
import {
  IconChecklist,
  IconCodeAsterix,
  IconCoins,
  IconSquareRoundedPlus,
} from '@tabler/icons-react';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';

type ContractScreenProps = {
  contract: ContractItemFragment;
};

export function ContractScreenSimple({ contract }: ContractScreenProps) {
  const { short, address } = useFuelAddress(contract.id);
  return (
    <VStack>
      <Flex gap="4">
        <CardInfo name="Id" className="flex-1">
          <Copyable value={address}>{short}</Copyable>
        </CardInfo>
      </Flex>
      <Tabs defaultValue="source">
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
        <Box className="px-3 pt-3 pb-2">
          <Tabs.Content value="transactions">
            <Text size="2">Transactions.</Text>
          </Tabs.Content>
          <Tabs.Content value="assets">
            <Text size="2">Assets.</Text>
          </Tabs.Content>
          <Tabs.Content value="minted">
            <Text size="2">Minted.</Text>
          </Tabs.Content>
          <Tabs.Content value="source">
            <Text size="2">Source.</Text>
          </Tabs.Content>
        </Box>
      </Tabs>
    </VStack>
  );
}
