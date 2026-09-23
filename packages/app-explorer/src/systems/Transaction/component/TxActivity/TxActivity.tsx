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
  LoadingBox,
  Text,
  VStack,
} from '@fuels/ui';
import {
  IconAlertTriangle,
  IconArrowBarToDown,
  IconArrowDownRight,
  IconArrowsExchange,
  IconCode,
  IconKey,
  IconPlus,
  IconReceipt,
  IconTargetArrow,
  IconX,
} from '@tabler/icons-react';
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

const KIND_BADGE: Record<
  ActivityKind,
  { color: BadgeColor; icon: typeof IconPlus }
> = {
  place: { color: 'blue', icon: IconPlus },
  fill: { color: 'green', icon: IconArrowsExchange },
  cancel: { color: 'orange', icon: IconX },
  trigger: { color: 'yellow', icon: IconTargetArrow },
  stop: { color: 'red', icon: IconAlertTriangle },
  withdraw: { color: 'blue', icon: IconArrowDownRight },
  fee: { color: 'gray', icon: IconReceipt },
  settle: { color: 'gray', icon: IconArrowBarToDown },
  session: { color: 'gray', icon: IconKey },
  call: { color: 'gray', icon: IconCode },
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
        className="text-xs tablet:text-sm font-mono"
        linkProps={{ href: Routes.accountAssets(part.address) }}
      />
    );
  }
  if ('code' in part) {
    return (
      <Code
        className="text-xs tablet:text-sm font-mono bg-transparent text-muted p-0"
        color="gray"
      >
        {part.code}
      </Code>
    );
  }
  return <Text className="whitespace-pre">{part.text}</Text>;
}

function ContractLink({ action }: { action: ActivityAction }) {
  const name = action.market ?? action.contractName;
  if (!name) {
    return (
      <Address
        value={action.contractId}
        className="text-xs tablet:text-sm font-mono"
        linkProps={{ href: Routes.contractMintedAssets(action.contractId) }}
      />
    );
  }
  return (
    <Link
      href={Routes.contractMintedAssets(action.contractId)}
      className="text-sm text-link underline truncate min-w-0"
    >
      {name}
    </Link>
  );
}

function ActionRow({
  action,
  showContract,
}: {
  action: ActivityAction;
  showContract: boolean;
}) {
  const badge = KIND_BADGE[action.kind];
  return (
    <Box className="border-l-2 border-l-gray-8 ml-4 py-3">
      <HStack className="ml-8 items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start">
        <Badge color={badge.color} leftIcon={badge.icon}>
          {action.label}
        </Badge>
        <HStack gap="1" className="flex-1 flex-wrap items-center min-w-0">
          {action.parts.map((part, i) => (
            <Part key={i} part={part} />
          ))}
        </HStack>
        {showContract && <ContractLink action={action} />}
      </HStack>
    </Box>
  );
}

function OtherCalls({ calls }: { calls: ActivityAction[] }) {
  return (
    <VStack gap="2" className="mt-2 ml-12 mobile:max-tablet:ml-4">
      <Text className="text-sm text-muted">Also called</Text>
      <HStack gap="2" className="flex-wrap">
        {calls.map((call, i) => (
          <HStack
            key={`${call.contractId}-${i}`}
            gap="1"
            className="items-center flex-wrap max-w-full min-w-0 rounded-md border border-gray-6 px-2 py-1"
          >
            {call.parts.map((part, j) => (
              <Part key={j} part={part} />
            ))}
            <Text className="text-sm text-muted">on</Text>
            <ContractLink action={call} />
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
}

export function TxActivity({ activity }: { activity: TxActivityData }) {
  const iconContract = activity.actions.find((a) => a.market)?.contractId;
  const protocolActions = activity.actions.filter((a) => a.kind !== 'call');
  const otherCalls = activity.actions.filter((a) => a.kind === 'call');
  const locations = new Set(
    protocolActions.map((a) => a.market ?? a.contractName ?? a.contractId),
  );
  const showContract = locations.size > 1;

  return (
    <Card className="px-4">
      <HStack className="items-start gap-3">
        <Box className="shrink-0">
          <TxContractIcon contractId={iconContract ?? ''} size="32px">
            <BlockieAvatar address={activity.actor?.address ?? ''} size={32} />
          </TxContractIcon>
        </Box>
        <VStack gap="1" className="min-w-0">
          <Heading as="h2" size="5" className="leading-tight">
            {activity.headline}
          </Heading>
          {activity.actor && (
            <HStack gap="1" className="flex-wrap items-center text-sm">
              <Text className="text-muted">
                {activity.actor.name ?? 'Account'}
              </Text>
              <Address
                value={activity.actor.address}
                className="text-xs tablet:text-sm font-mono"
                linkProps={{
                  href: Routes.contractMintedAssets(activity.actor.address),
                }}
              />
              {activity.sessionKey && (
                <>
                  <Text className="text-muted ml-1">
                    signed with session key
                  </Text>
                  <Address
                    value={activity.sessionKey}
                    className="text-xs tablet:text-sm font-mono"
                    linkProps={{
                      href: Routes.accountAssets(activity.sessionKey),
                    }}
                  />
                </>
              )}
            </HStack>
          )}
        </VStack>
      </HStack>
      {protocolActions.length > 0 && (
        <VStack gap="0" className="py-3">
          {protocolActions.map((action, i) => (
            <ActionRow
              key={`${action.contractId}-${i}`}
              action={action}
              showContract={showContract}
            />
          ))}
        </VStack>
      )}
      {otherCalls.length > 0 && <OtherCalls calls={otherCalls} />}
    </Card>
  );
}

export function TxActivityLoader() {
  return (
    <Card className="px-4">
      <HStack className="items-center gap-3">
        <LoadingBox className="w-8 h-8 rounded-full shrink-0" />
        <LoadingBox className="w-72 h-6" />
      </HStack>
      <VStack gap="0" className="py-3">
        {[0, 1].map((i) => (
          <Box key={i} className="border-l-2 border-l-gray-8 ml-4 py-3">
            <HStack className="ml-8">
              <LoadingBox className="w-24 h-6 rounded" />
              <LoadingBox className="w-64 h-6" />
            </HStack>
          </Box>
        ))}
      </VStack>
    </Card>
  );
}
