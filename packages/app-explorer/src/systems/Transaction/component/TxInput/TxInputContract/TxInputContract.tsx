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
        <Collapsible.Header>
          <Flex className="flex flex-col-reverse items-start  tablet:items-center tablet:flex-row gap-2 w-full">
            <Badge
              color="gray"
              className="font-mono justify-center ml-14 tablet:ml-0 tablet:flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              CONTRACT
            </Badge>
            <HStack className="items-center justify-center gap-4">
              <TxIcon type="ContractCall" status="Submitted" />
              <VStack className="flex-1" gap="0">
                <Text className="flex items-center gap-2 text-md">
                  Contract
                </Text>
                <Address
                  prefix="Address:"
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
          </Flex>
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
