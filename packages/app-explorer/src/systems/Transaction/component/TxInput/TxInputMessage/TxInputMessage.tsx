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
          <Flex className="flex flex-col tablet:flex-row gap-2 w-full">
            <Flex className="justify-start tablet:justify-center w-full tablet:min-w-[70px] tablet:w-[70px] tablet:max-w-[70px] items-center">
              <Badge color="gray" className="font-mono" size="1">
                MESSAGE
              </Badge>
            </Flex>

            <Flex className="w-full items-start tablet:items-end flex flex-col tablet:flex-row">
              <HStack className="gap-4 tablet:items-center tablet:flex-1">
                <TxIcon type="Message" status="Submitted" />
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
            </Flex>
          </Flex>
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
