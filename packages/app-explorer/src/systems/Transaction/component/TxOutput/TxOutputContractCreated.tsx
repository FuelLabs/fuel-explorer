import type { GQLContractCreated } from '@fuel-explorer/graphql';
import {
  Address,
  Badge,
  Card,
  Flex,
  HStack,
  Text,
  VStack,
  createComponent,
  cx,
} from '@fuels/ui';

import { Routes } from '~/routes';

import { TxContractIcon } from '../TxContractIcon/TxContractIcon';
import { TxIcon } from '../TxIcon/TxIcon';
import { txIconTypeMap, typeNameMap } from './constants';
import { styles } from './styles';
import type { TxOutputProps } from './types';

export const TxOutputContractCreated = createComponent<
  Omit<TxOutputProps<GQLContractCreated>, 'getContractByIndex'>,
  typeof Card
>({
  id: 'TxOutputContractCreated',
  render: (_, { output, ...props }) => {
    const classes = styles();
    const contractId = output.contract;
    const badgeLabel = typeNameMap?.[output?.__typename] ?? 'UNKNOWN';
    const txIconType = txIconTypeMap?.[output?.__typename] ?? 'Unknown';

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <Flex className={classes.content()}>
            <Badge
              color="gray"
              className="font-mono justify-center ml-14 tablet:ml-0 tablet:flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              {badgeLabel}
            </Badge>
            <HStack align="center">
              <TxContractIcon contractId={contractId}>
                <TxIcon status="Success" type={txIconType} />
              </TxContractIcon>
              <VStack gap="1">
                <Text className="font-medium">Contract Created</Text>
                <Address
                  prefix="Id:"
                  value={contractId}
                  linkProps={{
                    href: Routes.contractMintedAssets(contractId),
                  }}
                />
              </VStack>
            </HStack>
          </Flex>
        </Card.Header>
      </Card>
    );
  },
});
