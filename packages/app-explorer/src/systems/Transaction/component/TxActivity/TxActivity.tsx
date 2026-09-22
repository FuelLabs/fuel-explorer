import {
  Address,
  Badge,
  BlockieAvatar,
  Box,
  Card,
  Code,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
} from '@fuels/ui';
import { bn } from 'fuels';
import { Routes } from '~/routes';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import type {
  ActivityAction,
  ActivityKind,
  ActivityPart,
  TxActivity as TxActivityData,
} from '../../utils/txActivity';
import { TxContractIcon } from '../TxContractIcon/TxContractIcon';

type BadgeColor = 'blue' | 'green' | 'orange' | 'gray' | 'yellow' | 'red';

const KIND_COLOR: Record<ActivityKind, BadgeColor> = {
  place: 'blue',
  fill: 'green',
  cancel: 'orange',
  trigger: 'yellow',
  stop: 'red',
  withdraw: 'blue',
  fee: 'gray',
  settle: 'gray',
  session: 'gray',
  call: 'gray',
};

function Part({ part }: { part: ActivityPart }) {
  if ('amount' in part) {
    return part.assetId ? (
      <Amount
        className="inline-flex text-heading font-semibold"
        iconSize={16}
        assetId={part.assetId}
        value={bn(part.amount)}
      />
    ) : (
      <Text className="font-semibold">{part.amount}</Text>
    );
  }
  if ('address' in part) {
    return (
      <Address
        value={part.address}
        className="text-sm"
        linkProps={{ href: Routes.accountAssets(part.address) }}
      />
    );
  }
  if ('code' in part) {
    return (
      <Code className="text-sm" color="gray">
        {part.code}
      </Code>
    );
  }
  return <Text className="whitespace-pre">{part.text}</Text>;
}

function ActionRow({ action }: { action: ActivityAction }) {
  const where = action.market ?? action.contractName;
  return (
    <Box className="border-l-2 border-l-gray-8 ml-4 py-3">
      <HStack className="ml-8 gap-3 items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start">
        <Badge
          color={KIND_COLOR[action.kind]}
          variant="ghost"
          className="min-w-[120px] justify-center"
        >
          {action.label}
        </Badge>
        <HStack gap="1" className="flex-1 flex-wrap items-center">
          {action.parts.map((part, i) => (
            <Part key={i} part={part} />
          ))}
        </HStack>
        <Link
          href={Routes.contractMintedAssets(action.contractId)}
          className="text-sm text-muted whitespace-nowrap"
        >
          {where ?? `${action.contractId.slice(0, 8)}…`}
        </Link>
      </HStack>
    </Box>
  );
}

export function TxActivity({ activity }: { activity: TxActivityData }) {
  const iconContract = activity.actions.find((a) => a.market)?.contractId;
  return (
    <Card className="px-4 py-4">
      <VStack gap="2">
        <HStack className="items-center gap-3">
          <TxContractIcon contractId={iconContract ?? ''} size="32px">
            <BlockieAvatar address={activity.actor?.address ?? ''} size={32} />
          </TxContractIcon>
          <Heading as="h2" size="5" className="leading-tight">
            {activity.headline}
          </Heading>
        </HStack>
        {activity.actor && (
          <HStack gap="1" className="ml-11 flex-wrap items-center text-sm">
            <Text className="text-muted">
              {activity.actor.name ?? 'Account'}
            </Text>
            <Address
              value={activity.actor.address}
              className="text-sm"
              linkProps={{
                href: Routes.contractMintedAssets(activity.actor.address),
              }}
            />
            {activity.sessionKey && (
              <>
                <Text className="text-muted ml-1">signed with session key</Text>
                <Address
                  value={activity.sessionKey}
                  className="text-sm"
                  linkProps={{
                    href: Routes.accountAssets(activity.sessionKey),
                  }}
                />
              </>
            )}
          </HStack>
        )}
      </VStack>
      {activity.actions.length > 0 && (
        <VStack gap="0" className="mt-4">
          {activity.actions.map((action, i) => (
            <ActionRow key={`${action.contractId}-${i}`} action={action} />
          ))}
        </VStack>
      )}
    </Card>
  );
}
