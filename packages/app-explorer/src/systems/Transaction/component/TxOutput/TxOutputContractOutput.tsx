import type { GQLContractOutput } from '@fuel-explorer/graphql';
import { Badge, Collapsible, Flex, Text, createComponent, cx } from '@fuels/ui';

import { TxIcon } from '../TxIcon/TxIcon';
import { txIconTypeMap, typeNameMap } from './constants';
import { styles } from './styles';
import type { TxOutputProps } from './types';

import { IconInputSearch } from '@tabler/icons-react';

export const TxOutputContractOutput = createComponent<
  TxOutputProps<GQLContractOutput>,
  typeof Collapsible
>({
  id: 'TxOutputContractOutput',
  render: (_, { output, ...props }) => {
    const classes = styles();
    const badgeLabel = typeNameMap?.[output?.__typename] ?? 'UNKNOWN';
    const txIconType = txIconTypeMap?.[output?.__typename] ?? 'Unknown';
    return (
      <Collapsible {...props} className={cx('py-3', props.className)}>
        <Collapsible.Header className={classes.header()}>
          <Flex className={classes.content({ reversed: true })}>
            <Badge
              color="gray"
              className="font-mono justify-center mr-auto tablet:mr-0 tablet:flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              {badgeLabel}
            </Badge>

            <TxIcon status="Submitted" type={txIconType} className="mr-auto" />
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
