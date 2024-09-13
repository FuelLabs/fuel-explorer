import {
  Address,
  Badge,
  Collapsible,
  Flex,
  HStack,
  Text,
  VStack,
  createComponent,
  useBreakpoints,
} from '@fuels/ui';
import NextLink from 'next/link';

import { IconCode } from '@tabler/icons-react';
import { Routes } from '~/routes';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import { BADGE_WIDTH } from '../constants';
import { styles } from './styles';
import type { TxInputContractProps } from './types';

export const TxInputContract = createComponent<
  TxInputContractProps,
  typeof Collapsible
>({
  id: 'TxInputContract',
  render: (_, { input, ...props }) => {
    const { utxoId, balanceRoot, txPointer, contractId } = input;
    const { isMobile } = useBreakpoints();
    const trim = isMobile ? 8 : 16;
    const classes = styles();

    return (
      <Collapsible {...props}>
        <Collapsible.Header className="gap-2 tablet:gap-4">
          <HStack align="center">
            <HStack className="items-center justify-center">
              <Flex
                className={`w-[${BADGE_WIDTH}] max-w-[${BADGE_WIDTH}] items-center justify-center`}
              >
                <Badge color="gray" className="font-mono" size="1">
                  CONTRACT
                </Badge>
              </Flex>
              <Flex className="w-10 h-10 items-center justify-center overflow-clip rounded-full">
                <TxIcon type="ContractCall" status="Submitted" />
              </Flex>
            </HStack>
            <VStack className="flex-1" gap="0">
              <Text className="flex items-center gap-2 text-md">Contract</Text>
              <Address
                prefix="Address: "
                value={contractId}
                className="text-white"
                addressOpts={
                  isMobile ? { trimLeft: 4, trimRight: 2 } : undefined
                }
                linkProps={{
                  as: NextLink,
                  href: Routes.contractAssets(contractId),
                }}
              />
            </VStack>
          </HStack>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title leftIcon={IconCode} iconColor="text-icon">
            Data
          </Collapsible.Title>
          <Collapsible.Body className="p-0">
            <VStack className="p-2 px-4">
              <Address
                prefix="ID:"
                value={contractId}
                className={classes.contractAddress()}
                addressOpts={{ trimLeft: trim, trimRight: trim }}
                linkProps={{
                  as: NextLink,
                  href: Routes.contractCode(contractId),
                }}
              />
              <Address
                prefix="UTXO ID:"
                value={utxoId}
                className={classes.contractAddress()}
                addressOpts={{ trimLeft: trim, trimRight: trim }}
              />
              <Address
                prefix="Balance Root:"
                value={balanceRoot}
                className={classes.contractAddress()}
                addressOpts={{ trimLeft: trim, trimRight: trim }}
                linkProps={{
                  as: NextLink,
                  href: Routes.contractAssets(contractId),
                }}
              />
              <HStack gap="1">
                <Text className="text-xs text-secondary font-mono mr-px">
                  Tx Pointer:
                </Text>
                <Text className="text-xs text-secondary font-mono">
                  {txPointer}
                </Text>
              </HStack>
            </VStack>
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});
