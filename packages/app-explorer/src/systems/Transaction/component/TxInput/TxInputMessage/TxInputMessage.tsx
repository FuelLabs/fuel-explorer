import {
  Address,
  Badge,
  Box,
  Collapsible,
  Flex,
  HStack,
  VStack,
  createComponent,
} from '@fuels/ui';
import NextLink from 'next/link';

import { bn } from 'fuels';
import { Routes } from '~/routes';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import type { TxInputMessageProps } from './types';

export const TxInputMessage = createComponent<
  TxInputMessageProps,
  typeof Collapsible
>({
  id: 'TxInputMessage',
  render: (_, { input, ...props }) => {
    const { sender, recipient, data } = input;

    const amount = input.amount;
    if (!sender || !recipient) return null;

    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          <Flex className="flex flex-col items-center tablet:flex-row gap-2 w-full">
            <Badge
              color="gray"
              className="font-mono ml-14 tablet:ml-0 self-start tablet:self-center justify-center flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              MESSAGE
            </Badge>

            <Flex className="w-full items-start tablet:items-end flex flex-col tablet:flex-row">
              <HStack className="gap-4 tablet:items-center tablet:flex-1 ">
                <TxIcon type="Message" status="Submitted" />
                <Flex className="gap-1 flex-col tablet:flex-row items-center flex-1">
                  <VStack className="gap-1 items-start flex-1">
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
                  {!!amount && (
                    <Box className="w-full tablet:w-auto tablet:ml-0 justify-start flex flex-row tablet:block">
                      <Amount hideIcon hideSymbol value={bn(amount)} />
                    </Box>
                  )}
                </Flex>
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
