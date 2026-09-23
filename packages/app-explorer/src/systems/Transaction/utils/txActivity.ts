import type {
  AbiRegistry,
  DecodedOperationReceipt,
  DecodedReceipt,
  MarketMetadata,
} from './abiDecoder';

export type ActivityPart =
  | { text: string }
  | { amount: string; assetId?: string; symbol?: string; decimals?: number }
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
  | 'takeProfit'
  | 'stopLoss'
  | 'triggered'
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
  // The transaction reverted: the actions were attempted, none took effect.
  failed: boolean;
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

// Order ids are zero-padded.
function shortId(id: string) {
  const hex = id.replace(/^0x0*/, '');
  return hex.length > 8
    ? `0x${hex.slice(0, 4)}...${hex.slice(-4)}`
    : `0x${hex}`;
}

// Unit variants decode as strings, variants with data as `{ Variant: data }`.
function variantName(value: unknown) {
  if (value && typeof value === 'object') return Object.keys(value)[0] ?? '';
  return String(value);
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
  createdOrders: Record<string, { side: string; price: string }>;
  actor?: string;
};

const baseAmount = (value: string, ctx: Context): ActivityPart => ({
  amount: value,
  assetId: ctx.market?.baseAssetId,
  symbol: ctx.market?.baseSymbol,
  decimals: ctx.market?.baseDecimals,
});
const quoteAmount = (value: string, ctx: Context): ActivityPart => ({
  amount: value,
  assetId: ctx.market?.quoteAssetId,
  symbol: ctx.market?.quoteSymbol,
  decimals: ctx.market?.quoteDecimals,
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

// A trigger closing a buy takes profit above the entry price; one closing
// a sell takes profit below it.
function triggerKind(
  side: string,
  triggerPrice: string,
  entryPrice: string,
): ActivityKind {
  const above = BigInt(triggerPrice) > BigInt(entryPrice);
  return above === (side === 'Sell') ? 'takeProfit' : 'stopLoss';
}

const TRIGGER_LABEL: Partial<Record<ActivityKind, string>> = {
  takeProfit: 'Take profit',
  stopLoss: 'Stop loss',
  trigger: 'Trigger order',
};

const EJECTION_TEXT: Record<string, string> = {
  CanceledByTheUser: 'was cancelled by the trader',
  ForceCanceled: 'was force cancelled',
  SiblingOrderActivated: 'was cancelled because its paired order triggered',
  NotEnoughFunds: 'was removed for lack of funds',
  EjectedByAdmin: 'was removed by an admin',
  ParentOrderCanceled: 'was cancelled with its parent order',
};

// Events without a describer are internal bookkeeping and stay hidden.
const DESCRIBERS: Record<
  string,
  (
    v: Value,
    ctx: Context,
  ) => Pick<ActivityAction, 'kind' | 'label' | 'parts'> | null
> = {
  OrderCreatedEvent: (v, ctx) => {
    const side = variantName(v.order_side).toLowerCase();
    const type = variantName(v.order_type);
    const isMarket = type === 'Market' || type === 'BoundedMarket';
    // For market orders the price is a per-unit limit, not a total.
    const priceWord = isMarket ? ' with a limit price of ' : ' at ';
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
    const takerSide = ctx.createdOrders[v.match_id?.taker_id]?.side;
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
  TriggerOrderCreatedEvent: (v, ctx) => {
    const side = variantName(v.order_side);
    const parentId = v.quantity?.ParentOrder;
    const parent = parentId ? ctx.createdOrders[parentId] : undefined;
    const kind = parent
      ? triggerKind(side, v.trigger_price, parent.price)
      : 'trigger';
    const rises =
      kind === 'trigger'
        ? undefined
        : (kind === 'takeProfit') === (side === 'Sell');
    return {
      kind,
      label: TRIGGER_LABEL[kind],
      parts: [
        text(`${side} `),
        ...(parentId
          ? [text('the filled amount')]
          : [baseAmount(v.quantity?.Quantity, ctx)]),
        text(
          rises === undefined
            ? ' when the price reaches '
            : ` when the price ${rises ? 'rises' : 'falls'} to `,
        ),
        quoteAmount(v.trigger_price, ctx),
      ],
    };
  },
  TriggerOrderEjectedEvent: (v) => {
    const reason = variantName(v.reason);
    const id = code(shortId(v.order_id));
    if (reason === 'Activated') {
      return {
        kind: 'triggered',
        label: 'Triggered',
        parts: [text('Trigger order '), id, text(' reached its price')],
      };
    }
    return {
      kind: 'cancel',
      label: 'Trigger cancelled',
      parts: [id, text(` ${EJECTION_TEXT[reason] ?? 'was removed'}`)],
    };
  },
  FeesCollectedEvent: (v, ctx) => {
    const parts = feeParts(v.base_fees, v.quote_fees, ctx);
    // The event covers maker and taker fees for the whole match.
    return parts.length
      ? {
          kind: 'fee',
          label: 'Fees',
          parts: [...parts, text(' collected by the market')],
        }
      : null;
  },
  WithdrawSettledTradeEvent: (v, ctx) => {
    const parts = feeParts(v.base_amount, v.quote_amount, ctx);
    const trader = identityAddress(v.trader_id)?.toLowerCase();
    // Anyone can settle any trader, so name the trader unless it is the actor.
    const to: ActivityPart[] =
      trader && trader !== ctx.actor
        ? [text(' moved to '), { address: trader }]
        : [text(' moved to the trade account')];
    return parts.length
      ? { kind: 'settle', label: 'Settled', parts: [...parts, ...to] }
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

// Each phrase is [past tense, base form], so a reverted transaction can say
// what it tried to do instead of what it did.
type Phrase = [string, string];

function headline(
  actions: ActivityAction[],
  project: string | undefined,
  failed: boolean,
) {
  const count = (kind: ActivityKind) =>
    actions.filter((a) => a.kind === kind).length;
  const plural = (n: number, word: string) =>
    `${n} ${word}${n === 1 ? '' : 's'}`;
  const phrase = (past: string, base: string, rest: string): Phrase => [
    `${past} ${rest}`,
    `${base} ${rest}`,
  ];
  const protection = [
    count('takeProfit') && 'take profit',
    count('stopLoss') && 'stop loss',
  ].filter(Boolean) as string[];
  const withProtection = protection.length
    ? ` with ${protection.join(' and ')}`
    : '';
  // An order created by a trigger is part of the trigger, not a new order.
  const placed = Math.max(count('place') - count('triggered'), 0);
  const phrases = [
    count('triggered') &&
      phrase('triggered', 'trigger', plural(count('triggered'), 'order')),
    placed &&
      phrase('placed', 'place', `${plural(placed, 'order')}${withProtection}`),
    !placed &&
      protection.length &&
      phrase('set', 'set', protection.join(' and ')),
    count('trigger') &&
      phrase('placed', 'place', plural(count('trigger'), 'trigger order')),
    count('cancel') &&
      phrase('cancelled', 'cancel', plural(count('cancel'), 'order')),
    count('fill') && phrase('filled', 'fill', plural(count('fill'), 'trade')),
    count('withdraw') &&
      phrase('withdrew', 'withdraw', plural(count('withdraw'), 'asset')),
    count('session') && phrase('changed', 'change', 'a session key'),
  ].filter(Boolean) as Phrase[];

  const markets = [
    ...new Set(actions.filter((a) => a.market).map((a) => a.market as string)),
  ];
  const where = markets.length === 1 ? ` on ${markets[0]}` : '';
  const otherContracts = new Set(
    actions.filter((a) => a.kind === 'call').map((a) => a.contractId),
  ).size;

  if (!phrases.length) {
    const target = project ?? 'a contract';
    return failed
      ? `Failed to interact with ${target}`
      : `Interacted with ${target}`;
  }
  const list = (items: string[]) =>
    items.length === 1
      ? items[0]
      : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
  const words = phrases.map(([past, base]) => (failed ? base : past));
  const sentence = `${failed ? 'failed to ' : ''}${list(words)}${where}${
    otherContracts
      ? `, plus calls to ${plural(otherContracts, 'other contract')}`
      : ''
  }`;
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}`;
}

export function buildTxActivity(
  operations: Array<{ receipts?: unknown } | null | undefined>,
  registry: AbiRegistry,
  failed = false,
): TxActivity | undefined {
  const decoded = operations.flatMap((op) => flatten(op?.receipts));
  if (!decoded.length) return undefined;

  const createdOrders: Context['createdOrders'] = {};
  for (const d of decoded) {
    const v = d.value as Value;
    if (d.name === 'OrderCreatedEvent') {
      createdOrders[v.order_id] = {
        side: variantName(v.order_side),
        price: v.price,
      };
    }
  }

  let actor: TxActivity['actor'];
  let sessionKey: string | undefined;
  const actions: ActivityAction[] = [];

  for (const d of decoded) {
    const known = registry.contracts[d.contractId];
    const v = d.value as Value;

    if (d.kind === 'call') {
      if (!actor && registry.accounts?.[d.contractId]) {
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
    const line = describe?.(v, {
      market: known?.market,
      createdOrders,
      actor: actor?.address,
    });
    if (!line) continue;
    actions.push({
      ...line,
      contractId: d.contractId,
      contractName: d.contractName,
      market: known?.market?.symbol,
    });
  }

  const firstListed = actions.find((a) => registry.contracts[a.contractId]);
  const project = firstListed
    ? registry.contracts[firstListed.contractId].project
    : undefined;
  return {
    headline: headline(actions, project, failed),
    failed,
    project,
    actor,
    sessionKey,
    actions,
  };
}
