import {
  Address,
  Badge,
  Collapsible,
  Flex,
  HStack,
  Text,
  VStack,
  createComponent,
} from '@fuels/ui';

import { IconCode } from '@tabler/icons-react';
import { Routes as CommonRoutes } from 'app-commons';
import { Routes } from '~/routes';
import { TxContractIcon } from '../../TxContractIcon/TxContractIcon';
import { TxIcon } from '../../TxIcon/TxIcon';
import { styles } from './styles';
import type { TxInputContractProps } from './types';

export const TxInputContract = createComponent<
  TxInputContractProps,
  typeof Collapsible
>({
  id: 'TxInputContract',
  render: (_, { input, ...props }) => {
    const { utxoId, balanceRoot, txPointer, contractId = '' } = input;
    const classes = styles();

    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          <Flex className="flex flex-col items-start  tablet:items-center tablet:flex-row gap-2 w-full">
            <Badge
              color="gray"
              className="font-mono justify-center ml-14 tablet:ml-0 tablet:flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              CONTRACT
            </Badge>
            <HStack className="items-center justify-center gap-4">
              <TxContractIcon contractId={contractId}>
                <TxIcon type="ContractCall" status="Submitted" />
              </TxContractIcon>
              <VStack className="flex-1" gap="0">
                {!!contractId && (
                  <Address
                    prefix="Address:"
                    value={contractId}
                    linkProps={{
                      href: Routes.contractMintedAssets(contractId),
                    }}
                  />
                )}
                <Address
                  prefix="Utxo Id:"
                  value={utxoId}
                  linkProps={{
                    href: CommonRoutes.txSimple(utxoId?.slice(0, -4)),
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
              {!!contractId && (
                <Address
                  prefix="ID:"
                  value={contractId}
                  className={classes.contractAddress()}
                  linkProps={{
                    href: Routes.contractCode(contractId),
                  }}
                />
              )}
              <Address
                prefix="UTXO ID:"
                value={utxoId}
                className={classes.contractAddress()}
              />
              {!!contractId && (
                <Address
                  prefix="Balance Root:"
                  value={balanceRoot}
                  className={classes.contractAddress()}
                  linkProps={{
                    href: Routes.contractMintedAssets(contractId),
                  }}
                />
              )}
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
