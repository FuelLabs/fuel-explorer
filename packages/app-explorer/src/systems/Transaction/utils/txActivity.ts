import type {
  AbiRegistry,
  DecodedOperationReceipt,
  DecodedReceipt,
  MarketMetadata,
} from './abiDecoder';

export type ActivityPart =
  | { text: string }
  | { amount: string; assetId?: string }
  | { address: string }
  | { code: string };

export type ActivityKind =
  | 'place'
  | 'cancel'
  | 'fill'
  | 'fee'
  | 'settle'
  | 'withdraw'
  | 'session'
  | 'trigger'
  | 'stop'
  | 'call';

export type ActivityAction = {
  kind: ActivityKind;
  label: string;
  parts: ActivityPart[];
  contractId: string;
  contractName?: string;
  market?: string;
};

export type TxActivity = {
  headline: string;
  project?: string;
  actor?: { address: string; name?: string };
  sessionKey?: string;
  actions: ActivityAction[];
};

type Value = Record<string, any>;

const text = (t: string): ActivityPart => ({ text: t });
const code = (c: string): ActivityPart => ({ code: c });

function identityAddress(identity: Value | undefined) {
  return identity?.ContractId?.bits ?? identity?.Address?.bits;
}

// Order ids start with long runs of zeros, so drop them before shortening.
function shortId(id: string) {
  const hex = id.replace(/^0x0*/, '');
  return hex.length > 12 ? `0x${hex.slice(0, 8)}…${hex.slice(-4)}` : `0x${hex}`;
}

function isZero(value?: string) {
  return !value || /^0+$/.test(value);
}

function flatten(receipts: unknown, out: DecodedReceipt[] = []) {
  for (const r of (receipts as DecodedOperationReceipt[]) ?? []) {
    if (r?.decoded) out.push(r.decoded);
    flatten(r?.receipts, out);
  }
  return out;
}

type Context = {
  market?: MarketMetadata;
  createdSides: Record<string, string>;
};

const baseAmount = (value: string, ctx: Context): ActivityPart => ({
  amount: value,
  assetId: ctx.market?.baseAssetId,
});
const quoteAmount = (value: string, ctx: Context): ActivityPart => ({
  amount: value,
  assetId: ctx.market?.quoteAssetId,
});

function feeParts(base: string, quote: string, ctx: Context) {
  const parts: ActivityPart[] = [];
  if (!isZero(base)) parts.push(baseAmount(base, ctx));
  if (!isZero(quote)) {
    if (parts.length) parts.push(text(' and '));
    parts.push(quoteAmount(quote, ctx));
  }
  return parts;
}

const ORDER_TYPE_LABEL: Record<string, string> = {
  Limit: 'Limit',
  Spot: 'Limit',
  PostOnly: 'Post-only',
  FillOrKill: 'Fill-or-kill',
  Market: 'Market',
  BoundedMarket: 'Market',
};

// Event name -> plain-language line. Events not listed here are internal
// bookkeeping (nonces, session call markers) and are not shown.
const DESCRIBERS: Record<
  string,
  (
    v: Value,
    ctx: Context,
  ) => Pick<ActivityAction, 'kind' | 'label' | 'parts'> | null
> = {
  OrderCreatedEvent: (v, ctx) => {
    const side = String(v.order_side).toLowerCase();
    const type = String(v.order_type);
    const isMarket = type === 'Market' || type === 'BoundedMarket';
    const priceWord = isMarket
      ? side === 'buy'
        ? ' paying at most '
        : ' receiving at least '
      : ' at ';
    return {
      kind: 'place',
      label: 'Order placed',
      parts: [
        text(`${ORDER_TYPE_LABEL[type] ?? type} ${side} `),
        baseAmount(v.quantity, ctx),
        text(priceWord),
        quoteAmount(v.price, ctx),
      ],
    };
  },
  OrderMatchedEvent: (v, ctx) => {
    const takerSide = ctx.createdSides[v.match_id?.taker_id];
    const verb =
      takerSide === 'Buy' ? 'Bought ' : takerSide === 'Sell' ? 'Sold ' : '';
    return {
      kind: 'fill',
      label: 'Filled',
      parts: [
        text(verb),
        baseAmount(v.quantity, ctx),
        text(' at '),
        quoteAmount(v.price, ctx),
      ],
    };
  },
  OrderCancelledEvent: (v) => ({
    kind: 'cancel',
    label: 'Order cancelled',
    parts: [text('Order '), code(shortId(v.order_id))],
  }),
  OrderCancelledInternalEvent: (v) => ({
    kind: 'cancel',
    label: 'Order cancelled',
    parts: [text('Order '), code(shortId(v.order_id)), text(' by the market')],
  }),
  ExpireMakerEvent: (v) => ({
    kind: 'stop',
    label: 'Order expired',
    parts: [text('Resting order '), code(shortId(v.order_id))],
  }),
  OrderTooSmallEvent: (v) => ({
    kind: 'stop',
    label: 'Order removed',
    parts: [code(shortId(v.order_id)), text(' is below the minimum size')],
  }),
  OrderOutOfGasEvent: (v) => ({
    kind: 'stop',
    label: 'Order stopped',
    parts: [code(shortId(v.order_id)), text(' ran out of gas while matching')],
  }),
  OrderHaltedEvent: (v, ctx) => ({
    kind: 'stop',
    label: 'Order stopped',
    parts: [
      code(shortId(v.order_id)),
      text(' stopped with '),
      baseAmount(v.remaining_quantity, ctx),
      text(' unfilled'),
    ],
  }),
  TriggerOrderCreatedEvent: (v, ctx) => ({
    kind: 'trigger',
    label: 'Trigger order placed',
    parts: [
      text(`${String(v.order_side).toLowerCase()} when the price reaches `),
      quoteAmount(v.trigger_price, ctx),
    ],
  }),
  TriggerOrderEjectedEvent: (v) => ({
    kind: 'stop',
    label: 'Trigger order removed',
    parts: [code(shortId(v.order_id))],
  }),
  FeesCollectedEvent: (v, ctx) => {
    const parts = feeParts(v.base_fees, v.quote_fees, ctx);
    return parts.length ? { kind: 'fee', label: 'Fee paid', parts } : null;
  },
  WithdrawSettledTradeEvent: (v, ctx) => {
    const parts = feeParts(v.base_amount, v.quote_amount, ctx);
    return parts.length
      ? {
          kind: 'settle',
          label: 'Settled',
          parts: [...parts, text(' moved to the trade account')],
        }
      : null;
  },
  WithdrawEvent: (v) => {
    const to = identityAddress(v.to);
    return {
      kind: 'withdraw',
      label: 'Withdrawn',
      parts: [
        { amount: v.amount, assetId: v.asset_id?.bits },
        ...(to ? [text(' to '), { address: to }] : []),
      ],
    };
  },
  SessionCreatedEvent: (v) => {
    const key = identityAddress(v.session?.session_id);
    return {
      kind: 'session',
      label: 'Session key added',
      parts: key ? [text('Key '), { address: key }] : [],
    };
  },
  SessionRevokedEvent: (v) => {
    const key = identityAddress(v.session_id);
    return {
      kind: 'session',
      label: 'Session key revoked',
      parts: key ? [text('Key '), { address: key }] : [],
    };
  },
  FailedToValidateEvent: (v) => ({
    kind: 'stop',
    label: 'Rejected',
    parts: [text(String(v.reason ?? 'Validation failed'))],
  }),
};

const SESSION_CALL_EVENTS = [
  'SessionContractCallEvent',
  'ExtendedNonceSessionContractCallEvent',
];

function headline(actions: ActivityAction[], project?: string) {
  const count = (kind: ActivityKind) =>
    actions.filter((a) => a.kind === kind).length;
  const plural = (n: number, word: string) =>
    `${n} ${word}${n === 1 ? '' : 's'}`;
  const phrases = [
    count('place') && `placed ${plural(count('place'), 'order')}`,
    count('trigger') && `placed ${plural(count('trigger'), 'trigger order')}`,
    count('cancel') && `cancelled ${plural(count('cancel'), 'order')}`,
    count('fill') && `filled ${plural(count('fill'), 'trade')}`,
    count('withdraw') && `withdrew ${plural(count('withdraw'), 'asset')}`,
    count('session') && 'changed a session key',
  ].filter(Boolean) as string[];

  const markets = [
    ...new Set(actions.filter((a) => a.market).map((a) => a.market as string)),
  ];
  const where = markets.length === 1 ? ` on ${markets[0]}` : '';
  const otherContracts = new Set(
    actions.filter((a) => a.kind === 'call').map((a) => a.contractId),
  ).size;

  if (!phrases.length) {
    return project ? `Interacted with ${project}` : 'Contract interaction';
  }
  const list = (items: string[]) =>
    items.length === 1
      ? items[0]
      : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
  const sentence = `${list(phrases)}${where}${
    otherContracts
      ? `, plus calls to ${plural(otherContracts, 'other contract')}`
      : ''
  }`;
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}`;
}

export function buildTxActivity(
  operations: Array<{ receipts?: unknown } | null | undefined>,
  registry: AbiRegistry,
): TxActivity | undefined {
  const decoded = operations.flatMap((op) => flatten(op?.receipts));
  if (!decoded.length) return undefined;

  const createdSides: Record<string, string> = {};
  for (const d of decoded) {
    const v = d.value as Value;
    if (d.name === 'OrderCreatedEvent') {
      createdSides[v.order_id] = String(v.order_side);
    }
  }

  let actor: TxActivity['actor'];
  let sessionKey: string | undefined;
  const actions: ActivityAction[] = [];

  for (const d of decoded) {
    const known = registry.contracts[d.contractId];
    const v = d.value as Value;

    if (d.kind === 'call') {
      // The account the transaction was sent to is the actor.
      if (!actor && !known) {
        actor = { address: d.contractId, name: d.contractName };
        continue;
      }
      if (!known && d.contractId !== actor?.address) {
        actions.push({
          kind: 'call',
          label: 'Called',
          parts: [code(d.name)],
          contractId: d.contractId,
          contractName: d.contractName,
        });
      }
      continue;
    }

    if (SESSION_CALL_EVENTS.includes(d.name)) {
      sessionKey ??= identityAddress(v.session_id);
      continue;
    }

    const describe = DESCRIBERS[d.name];
    const line = describe?.(v, { market: known?.market, createdSides });
    if (!line) continue;
    actions.push({
      ...line,
      contractId: d.contractId,
      contractName: d.contractName,
      market: known?.market?.symbol,
    });
  }

  const project = Object.values(registry.contracts)[0]?.project;
  return {
    headline: headline(actions, project),
    project,
    actor,
    sessionKey,
    actions,
  };
}
