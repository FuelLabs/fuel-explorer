import { Badge, Button, Dropdown, HStack, Text } from '@fuels/ui';
import {
  IconBrandDiscord,
  IconBrandX,
  IconChevronDown,
  IconExternalLink,
} from '@tabler/icons-react';
import { getUrlHostName } from 'app-commons';
import { MetadataLogo } from '~/systems/Core/components/MetadataLogo/MetadataLogo';
import type { ExchangeProject } from '~portal/systems/Ecosystem/types';

type ExchangeLinksProps = {
  exchange: ExchangeProject;
  showBadge?: boolean;
};

export function ExchangeLinks({
  exchange,
  showBadge = false,
}: ExchangeLinksProps) {
  const hasAnySocial = exchange?.twitter || exchange?.discord;
  const isExchange = exchange?.showAccountTag && exchange?.isExternalExchange;

  return (
    <HStack gap="2" align="center">
      {showBadge && isExchange && (
        <Badge color="gray" size="1" className="text-xs">
          Exchange
        </Badge>
      )}
      <Dropdown>
        <Dropdown.Trigger>
          <Button
            radius="full"
            variant="ghost"
            color="gray"
            size="1"
            rightIcon={IconChevronDown}
          >
            <MetadataLogo
              type="Contract"
              image={exchange.image}
              name={exchange.name}
              size={16}
            />
            <Text className="ml-1">{exchange.name}</Text>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item className="gap-1 cursor-pointer" color="gray" asChild>
            <a href={exchange.url} target="_blank" rel="noreferrer">
              <IconExternalLink size="1em" /> {getUrlHostName(exchange.url)}
            </a>
          </Dropdown.Item>
          {hasAnySocial && <Dropdown.Separator />}
          {exchange.twitter && (
            <Dropdown.Item
              className="gap-1 cursor-pointer"
              color="gray"
              asChild
            >
              <a href={exchange.twitter} target="_blank" rel="noreferrer">
                <IconBrandX size="1em" /> X (Twitter)
              </a>
            </Dropdown.Item>
          )}
          {exchange.discord && (
            <Dropdown.Item
              className="gap-1 cursor-pointer"
              color="gray"
              asChild
            >
              <a href={exchange.discord} target="_blank" rel="noreferrer">
                <IconBrandDiscord size="1em" /> Discord
              </a>
            </Dropdown.Item>
          )}
        </Dropdown.Content>
      </Dropdown>
    </HStack>
  );
}
