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
import NextLink from 'next/link';

import { Routes } from '~/routes';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import { BADGE_WIDTH } from '../constants';
import type { TxInputMessageProps } from './types';

export const TxInputMessage = createComponent<
  TxInputMessageProps,
  typeof Collapsible
>({
  id: 'TxInputMessage',
  render: (_, { input, ...props }) => {
    const { sender, recipient, data } = input;

    if (!sender || !recipient) return null;

    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          <HStack className="items-center justify-center">
            <Flex
              className={`w-[${BADGE_WIDTH}] max-w-[${BADGE_WIDTH}] items-center justify-center`}
            >
              <Badge color="gray" className="font-mono" size="1">
                MESSAGE
              </Badge>
            </Flex>
            <TxIcon type="Message" status="Submitted" />
          </HStack>
          <HStack className="gap-1 flex-col tablet:flex-row tablet:items-center tablet:flex-1">
            <Text className="hidden tablet:block">Message</Text>
            <VStack className="gap-1 tablet:flex-1 tablet:items-end">
              <Address
                value={sender}
                prefix="Sender:"
                linkProps={{
                  as: NextLink,
                  href: Routes.accountAssets(sender),
                }}
              />
              <Address
                value={recipient}
                prefix="Recipient:"
                linkProps={{
                  as: NextLink,
                  href: Routes.accountAssets(recipient),
                }}
              />
            </VStack>
          </HStack>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Data</Collapsible.Title>
          <Collapsible.Body className="text-xs leading-normal text-wrap break-all">
            {data}
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});
