import type { GQLContractOutput } from '@fuel-explorer/graphql';
import {
  Address,
  Badge,
  Collapsible,
  Flex,
  HStack,
  Text,
  VStack,
  createComponent,
  cx,
} from '@fuels/ui';

import { TxIcon } from '../TxIcon/TxIcon';
import { txIconTypeMap, typeNameMap } from './constants';
import { styles } from './styles';
import type { TxOutputProps } from './types';

import { IconInputSearch } from '@tabler/icons-react';
import { Routes } from '~/routes';
import { TxContractIcon } from '../TxContractIcon/TxContractIcon';

export const TxOutputContractOutput = createComponent<
  TxOutputProps<GQLContractOutput>,
  typeof Collapsible
>({
  id: 'TxOutputContractOutput',
  render: (_, { output, getContractByIndex, ...props }) => {
    const classes = styles();
    const badgeLabel = typeNameMap?.[output?.__typename] ?? 'UNKNOWN';
    const txIconType = txIconTypeMap?.[output?.__typename] ?? 'Unknown';
    const contractData = getContractByIndex(Number(output.inputIndex));

    return (
      <Collapsible {...props} className={cx('py-3', props.className)}>
        <Collapsible.Header className={classes.header()}>
          <Flex className={classes.content({ output: true })}>
            <Badge
              color="gray"
              className="font-mono hidden justify-center mr-auto tablet:mr-0 tablet:flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              {badgeLabel}
            </Badge>

            <HStack align="center">
              <TxContractIcon contractId={contractData?.contractId}>
                <TxIcon status="Submitted" type={txIconType} />
              </TxContractIcon>
              {!!contractData?.contractId && (
                <VStack gap="2">
                  <Badge
                    color="gray"
                    className="font-mono block justify-center mr-auto tablet:mr-0 tablet:hidden min-w-[70px] w-[70px] max-w-[70px] items-center"
                    size="1"
                  >
                    {badgeLabel}
                  </Badge>
                  <Address
                    prefix="Id:"
                    value={contractData.contractId}
                    linkProps={{
                      href: Routes.contractMintedAssets(
                        contractData.contractId,
                      ),
                    }}
                  />
                </VStack>
              )}
            </HStack>
          </Flex>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title leftIcon={IconInputSearch} iconColor="text-icon">
            Input
          </Collapsible.Title>
          <Collapsible.Body className={classes.contractOutputContent()}>
            <Text className={classes.contractOutputText()}>Index: </Text>
            <Text className={classes.contractOutputText()}>
              {output.inputIndex}
            </Text>
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});
