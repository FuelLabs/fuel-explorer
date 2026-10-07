import { Address, BlockieAvatar, Code, Link, LoadingBox } from '@fuels/ui';
import { IconAlertTriangle } from '@fuels/ui';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';
import { Routes } from '~/routes';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import type {
  ActivityAction,
  ActivityKind,
  ActivityPart,
  TxActivity as TxActivityData,
} from '../../utils/txActivity';
import { resolveMsg } from '../../utils/txActivity';
import { TxContractIcon } from '../TxContractIcon/TxContractIcon';
import { TxChip, type TxChipKind, TxSquare } from '../TxItem/TxChip';

const KIND_CHIP: Record<ActivityKind, TxChipKind> = {
  place: 'neutral',
  fill: 'success',
  cancel: 'failed',
  trigger: 'pending',
  takeProfit: 'success',
  stopLoss: 'failed',
  triggered: 'pending',
  stop: 'failed',
  withdraw: 'neutral',
  fee: 'pending',
  settle: 'pending',
  session: 'pending',
  call: 'pending',
};

function Part({ part }: { part: ActivityPart }) {
  const { t } = useTranslation();
  if ('amount' in part) {
    return part.assetId ? (
      <Amount
        className="inline-flex font-medium text-heading"
        iconSize={16}
        assetId={part.assetId}
        value={bn(part.amount)}
        decimals={part.decimals?.toString()}
        asset={
          part.symbol ? { assetId: part.assetId, symbol: part.symbol } : null
        }
      />
    ) : (
      <span className="font-medium text-heading">{part.amount}</span>
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
        className="text-xs tablet:text-sm font-mono bg-transparent text-[var(--fuel-element-low-em)] p-0"
        color="gray"
      >
        {part.code}
      </Code>
    );
  }
  return (
    <span className="whitespace-pre text-heading">
      {'msg' in part ? resolveMsg(part.msg, t) : part.text}
    </span>
  );
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
  const { t } = useTranslation();
  const kind = KIND_CHIP[action.kind];
  return (
    <div className="relative ml-4 border-l border-[var(--fuel-line)] py-3">
      <TxSquare
        kind={kind === 'neutral' ? 'success' : kind}
        className="absolute top-[25px] -left-[4.5px]"
      />
      <div className="ml-8 flex items-center gap-2 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
        <TxChip>{resolveMsg(action.label, t)}</TxChip>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
          {action.parts.map((part, i) => (
            <Part key={i} part={part} />
          ))}
        </div>
        {showContract && <ContractLink action={action} />}
      </div>
    </div>
  );
}

function OtherCalls({ calls }: { calls: ActivityAction[] }) {
  const { t } = useTranslation();
  return (
    <div className="mt-2 ml-12 flex flex-col gap-2 mobile:max-tablet:ml-4">
      <span className="fuel-label">{t('tx.also_called')}</span>
      <div className="flex flex-wrap gap-2">
        {calls.map((call, i) => (
          <div
            key={`${call.contractId}-${i}`}
            className="flex min-w-0 max-w-full flex-wrap items-center gap-1 border border-[var(--fuel-border)] px-2 py-1"
          >
            {call.parts.map((part, j) => (
              <Part key={j} part={part} />
            ))}
            <span className="text-sm text-[var(--fuel-element-low-em)]">
              {t('tx.on')}
            </span>
            <ContractLink action={call} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TxActivity({ activity }: { activity: TxActivityData }) {
  const { t } = useTranslation();
  const iconContract = activity.actions.find((a) => a.market)?.contractId;
  const protocolActions = activity.actions.filter((a) => a.kind !== 'call');
  const otherCalls = activity.actions.filter((a) => a.kind === 'call');
  const locations = new Set(
    protocolActions.map((a) => a.market ?? a.contractName ?? a.contractId),
  );
  const showContract = locations.size > 1;

  return (
    <div className="fuel-edge border border-[var(--fuel-line)] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <TxContractIcon contractId={iconContract ?? ''} size="32px">
            <BlockieAvatar address={activity.actor?.address ?? ''} size={32} />
          </TxContractIcon>
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="fuel-stat-sm m-0">
            {resolveMsg(activity.headline, t)}
          </h2>
          {activity.actor && (
            <div className="flex flex-wrap items-center gap-1 text-sm">
              <span className="text-[var(--fuel-element-low-em)]">
                {activity.actor.name ?? t('tx.account')}
              </span>
              <Address
                value={activity.actor.address}
                className="text-xs tablet:text-sm font-mono"
                linkProps={{
                  href: Routes.contractMintedAssets(activity.actor.address),
                }}
              />
              {activity.sessionKey && (
                <>
                  <span className="ml-1 text-[var(--fuel-element-low-em)]">
                    {t('tx.signed_with_session_key')}
                  </span>
                  <Address
                    value={activity.sessionKey}
                    className="text-xs tablet:text-sm font-mono"
                    linkProps={{
                      href: Routes.accountAssets(activity.sessionKey),
                    }}
                  />
                </>
              )}
            </div>
          )}
          {activity.failed && (
            <div className="flex items-center gap-1 text-sm text-[var(--red-11)]">
              <IconAlertTriangle aria-hidden size={16} />
              <span>{t('tx.reverted_notice')}</span>
            </div>
          )}
        </div>
      </div>
      {protocolActions.length > 0 && (
        <div
          className={`flex flex-col py-3 ${activity.failed ? 'opacity-60' : ''}`}
        >
          {protocolActions.map((action, i) => (
            <ActionRow
              key={`${action.contractId}-${i}`}
              action={action}
              showContract={showContract}
            />
          ))}
        </div>
      )}
      {otherCalls.length > 0 && <OtherCalls calls={otherCalls} />}
    </div>
  );
}

export function TxActivityLoader() {
  return (
    <div className="fuel-edge border border-[var(--fuel-line)] px-4 py-4">
      <div className="flex items-center gap-3">
        <LoadingBox className="size-8 shrink-0 rounded-full" />
        <LoadingBox className="h-6 w-72" />
      </div>
      <div className="flex flex-col py-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="relative ml-4 border-l border-[var(--fuel-line)] py-3"
          >
            <div className="ml-8 flex items-center gap-2">
              <LoadingBox className="h-6 w-24" />
              <LoadingBox className="h-6 w-64" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
