import type {
  AbiRegistry,
  DecodedOperationReceipt,
  DecodedReceipt,
  MarketMetadata,
} from './abiDecoder';

// A translatable string. `key` is the i18n key, `params` fill its {{vars}} and
// `en` is the English result, used as the default and in tests.
export type Msg = {
  key: string;
  en: string;
  params?: Record<string, Msg | string | number>;
  capitalize?: boolean;
};

export type ActivityPart =
  | { text: string }
  | { msg: Msg }
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
  label: Msg;
  parts: ActivityPart[];
  contractId: string;
  contractName?: string;
  market?: string;
};

export type TxActivity = {
  headline: Msg;
  // The transaction reverted: the actions were attempted, none took effect.
  failed: boolean;
  project?: string;
  actor?: { address: string; name?: string };
  sessionKey?: string;
  actions: ActivityAction[];
};

type Value = Record<string, any>;

const en = (value: Msg | string | number) =>
  typeof value === 'object' ? value.en : String(value);

function m(
  key: string,
  template: string,
  params?: Msg['params'],
  capitalize?: boolean,
): Msg {
  const result = template.replace(/\{\{(\w+)\}\}/g, (_, name) =>
    en(params?.[name] ?? ''),
  );
  return { key, en: result, params, capitalize };
}

const msg = (
  key: string,
  template: string,
  params?: Msg['params'],
): ActivityPart => ({ msg: m(key, template, params) });

const counted = (key: string, n: number, one: string, other: string) =>
  m(key, n === 1 ? one : other, { count: n });

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
    if (parts.length) parts.push(msg('tx.activity.part.and', ' and '));
    parts.push(quoteAmount(quote, ctx));
  }
  return parts;
}

const ORDER_TYPE_KEY: Record<string, [string, string]> = {
  Limit: ['limit', 'Limit'],
  Spot: ['limit', 'Limit'],
  PostOnly: ['post_only', 'Post-only'],
  FillOrKill: ['fill_or_kill', 'Fill-or-kill'],
  Market: ['market', 'Market'],
  BoundedMarket: ['market', 'Market'],
};

const orderTypeMsg = (type: string): Msg | string => {
  const known = ORDER_TYPE_KEY[type];
  return known ? m(`tx.activity.order_type.${known[0]}`, known[1]) : type;
};

const SIDE_EN: Record<string, string> = { buy: 'buy', sell: 'sell' };

// The side as a lowercase word, or the raw value when it is unknown.
const sideMsg = (side: string): Msg | string => {
  const lower = side.toLowerCase();
  return SIDE_EN[lower] ? m(`tx.activity.side.${lower}`, SIDE_EN[lower]) : side;
};

const sideCapMsg = (side: string): Msg | string => {
  const lower = side.toLowerCase();
  return SIDE_EN[lower]
    ? m(
        `tx.activity.side_cap.${lower}`,
        `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`,
      )
    : side;
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

const TRIGGER_LABEL: Partial<Record<ActivityKind, Msg>> = {
  takeProfit: m('tx.activity.label.take_profit', 'Take profit'),
  stopLoss: m('tx.activity.label.stop_loss', 'Stop loss'),
  trigger: m('tx.activity.label.trigger_order', 'Trigger order'),
};

const EJECTION_TEXT: Record<string, [string, string]> = {
  CanceledByTheUser: ['cancelled_by_user', 'was cancelled by the trader'],
  ForceCanceled: ['force_canceled', 'was force cancelled'],
  SiblingOrderActivated: [
    'sibling_activated',
    'was cancelled because its paired order triggered',
  ],
  NotEnoughFunds: ['not_enough_funds', 'was removed for lack of funds'],
  EjectedByAdmin: ['ejected_by_admin', 'was removed by an admin'],
  ParentOrderCanceled: [
    'parent_canceled',
    'was cancelled with its parent order',
  ],
};

const REMOVED = ['removed', 'was removed'] as const;

// Events without a describer are internal bookkeeping and stay hidden.
const DESCRIBERS: Record<
  string,
  (
    v: Value,
    ctx: Context,
  ) => Pick<ActivityAction, 'kind' | 'label' | 'parts'> | null
> = {
  OrderCreatedEvent: (v, ctx) => {
    const side = variantName(v.order_side);
    const type = variantName(v.order_type);
    const isMarket = type === 'Market' || type === 'BoundedMarket';
    // For market orders the price is a per-unit limit, not a total.
    const priceWord = isMarket
      ? msg('tx.activity.part.with_limit_price', ' with a limit price of ')
      : msg('tx.activity.part.at', ' at ');
    return {
      kind: 'place',
      label: m('tx.activity.label.order_placed', 'Order placed'),
      parts: [
        msg('tx.activity.part.place_head', '{{type}} {{side}} ', {
          type: orderTypeMsg(type),
          side: sideMsg(side),
        }),
        baseAmount(v.quantity, ctx),
        priceWord,
        quoteAmount(v.price, ctx),
      ],
    };
  },
  OrderMatchedEvent: (v, ctx) => {
    const takerSide = ctx.createdOrders[v.match_id?.taker_id]?.side;
    const verb =
      takerSide === 'Buy'
        ? msg('tx.activity.part.bought', 'Bought ')
        : takerSide === 'Sell'
          ? msg('tx.activity.part.sold', 'Sold ')
          : text('');
    return {
      kind: 'fill',
      label: m('tx.activity.label.filled', 'Filled'),
      parts: [
        verb,
        baseAmount(v.quantity, ctx),
        msg('tx.activity.part.at', ' at '),
        quoteAmount(v.price, ctx),
      ],
    };
  },
  OrderCancelledEvent: (v) => ({
    kind: 'cancel',
    label: m('tx.activity.label.order_cancelled', 'Order cancelled'),
    parts: [msg('tx.activity.part.order', 'Order '), code(shortId(v.order_id))],
  }),
  OrderCancelledInternalEvent: (v) => ({
    kind: 'cancel',
    label: m('tx.activity.label.order_cancelled', 'Order cancelled'),
    parts: [
      msg('tx.activity.part.order', 'Order '),
      code(shortId(v.order_id)),
      msg('tx.activity.part.by_market', ' by the market'),
    ],
  }),
  ExpireMakerEvent: (v) => ({
    kind: 'stop',
    label: m('tx.activity.label.order_expired', 'Order expired'),
    parts: [
      msg('tx.activity.part.resting_order', 'Resting order '),
      code(shortId(v.order_id)),
    ],
  }),
  OrderTooSmallEvent: (v) => ({
    kind: 'stop',
    label: m('tx.activity.label.order_removed', 'Order removed'),
    parts: [
      code(shortId(v.order_id)),
      msg('tx.activity.part.below_minimum', ' is below the minimum size'),
    ],
  }),
  OrderOutOfGasEvent: (v) => ({
    kind: 'stop',
    label: m('tx.activity.label.order_stopped', 'Order stopped'),
    parts: [
      code(shortId(v.order_id)),
      msg('tx.activity.part.out_of_gas', ' ran out of gas while matching'),
    ],
  }),
  OrderHaltedEvent: (v, ctx) => ({
    kind: 'stop',
    label: m('tx.activity.label.order_stopped', 'Order stopped'),
    parts: [
      code(shortId(v.order_id)),
      msg('tx.activity.part.stopped_with', ' stopped with '),
      baseAmount(v.remaining_quantity, ctx),
      msg('tx.activity.part.unfilled', ' unfilled'),
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
      label: TRIGGER_LABEL[kind] as Msg,
      parts: [
        msg('tx.activity.part.side_prefix', '{{side}} ', {
          side: sideCapMsg(side),
        }),
        ...(parentId
          ? [msg('tx.activity.part.filled_amount', 'the filled amount')]
          : [baseAmount(v.quantity?.Quantity, ctx)]),
        rises === undefined
          ? msg('tx.activity.part.when_reaches', ' when the price reaches ')
          : rises
            ? msg('tx.activity.part.when_rises', ' when the price rises to ')
            : msg('tx.activity.part.when_falls', ' when the price falls to '),
        quoteAmount(v.trigger_price, ctx),
      ],
    };
  },
  TriggerOrderEjectedEvent: (v) => {
    const reason = variantName(v.reason);
    const id = code(shortId(v.order_id));
    const ejection = EJECTION_TEXT[reason] ?? REMOVED;
    if (reason === 'Activated') {
      return {
        kind: 'triggered',
        label: m('tx.activity.label.triggered', 'Triggered'),
        parts: [
          msg('tx.activity.part.trigger_order', 'Trigger order '),
          id,
          msg('tx.activity.part.reached_price', ' reached its price'),
        ],
      };
    }
    return {
      kind: 'cancel',
      label: m('tx.activity.label.trigger_cancelled', 'Trigger cancelled'),
      parts: [
        id,
        text(' '),
        msg(`tx.activity.ejection.${ejection[0]}`, ejection[1]),
      ],
    };
  },
  FeesCollectedEvent: (v, ctx) => {
    const parts = feeParts(v.base_fees, v.quote_fees, ctx);
    // The event covers maker and taker fees for the whole match.
    return parts.length
      ? {
          kind: 'fee',
          label: m('tx.activity.label.fees', 'Fees'),
          parts: [
            ...parts,
            msg('tx.activity.part.fees_collected', ' collected by the market'),
          ],
        }
      : null;
  },
  WithdrawSettledTradeEvent: (v, ctx) => {
    const parts = feeParts(v.base_amount, v.quote_amount, ctx);
    const trader = identityAddress(v.trader_id)?.toLowerCase();
    // Anyone can settle any trader, so name the trader unless it is the actor.
    const to: ActivityPart[] =
      trader && trader !== ctx.actor
        ? [msg('tx.activity.part.moved_to', ' moved to '), { address: trader }]
        : [
            msg(
              'tx.activity.part.moved_to_trade_account',
              ' moved to the trade account',
            ),
          ];
    return parts.length
      ? {
          kind: 'settle',
          label: m('tx.activity.label.settled', 'Settled'),
          parts: [...parts, ...to],
        }
      : null;
  },
  WithdrawEvent: (v) => {
    const to = identityAddress(v.to);
    return {
      kind: 'withdraw',
      label: m('tx.activity.label.withdrawn', 'Withdrawn'),
      parts: [
        { amount: v.amount, assetId: v.asset_id?.bits },
        ...(to ? [msg('tx.activity.part.to', ' to '), { address: to }] : []),
      ],
    };
  },
  SessionCreatedEvent: (v) => {
    const key = identityAddress(v.session?.session_id);
    return {
      kind: 'session',
      label: m('tx.activity.label.session_added', 'Session key added'),
      parts: key ? [msg('tx.activity.part.key', 'Key '), { address: key }] : [],
    };
  },
  SessionRevokedEvent: (v) => {
    const key = identityAddress(v.session_id);
    return {
      kind: 'session',
      label: m('tx.activity.label.session_revoked', 'Session key revoked'),
      parts: key ? [msg('tx.activity.part.key', 'Key '), { address: key }] : [],
    };
  },
  FailedToValidateEvent: (v) => ({
    kind: 'stop',
    label: m('tx.activity.label.rejected', 'Rejected'),
    parts: [
      v.reason
        ? text(String(v.reason))
        : msg('tx.activity.part.validation_failed', 'Validation failed'),
    ],
  }),
};

const SESSION_CALL_EVENTS = [
  'SessionContractCallEvent',
  'ExtendedNonceSessionContractCallEvent',
];

// Each phrase is [past tense, base form], so a reverted transaction can say
// what it tried to do instead of what it did.
type Phrase = [Msg, Msg];

function headline(
  actions: ActivityAction[],
  project: string | undefined,
  failed: boolean,
): Msg {
  const count = (kind: ActivityKind) =>
    actions.filter((a) => a.kind === kind).length;
  const phrase = (
    id: string,
    past: string,
    base: string,
    rest: Msg,
  ): Phrase => [
    m(`tx.activity.phrase.${id}_past`, `${past} {{rest}}`, { rest }),
    m(`tx.activity.phrase.${id}_base`, `${base} {{rest}}`, { rest }),
  ];
  const orders = (n: number) =>
    counted('tx.activity.noun.order', n, '{{count}} order', '{{count}} orders');
  const protection = [
    count('takeProfit') && m('tx.activity.noun.take_profit', 'take profit'),
    count('stopLoss') && m('tx.activity.noun.stop_loss', 'stop loss'),
  ].filter(Boolean) as Msg[];
  const protectionList = protection.length ? list(protection) : undefined;
  // An order created by a trigger is part of the trigger, not a new order.
  const placed = Math.max(count('place') - count('triggered'), 0);
  const phrases = [
    count('triggered') &&
      phrase('triggered', 'triggered', 'trigger', orders(count('triggered'))),
    placed &&
      phrase(
        'placed',
        'placed',
        'place',
        protectionList
          ? m(
              'tx.activity.noun.order_with_protection',
              '{{orders}} with {{protection}}',
              {
                orders: orders(placed),
                protection: protectionList,
              },
            )
          : orders(placed),
      ),
    !placed && protectionList && phrase('set', 'set', 'set', protectionList),
    count('trigger') &&
      phrase(
        'placed',
        'placed',
        'place',
        counted(
          'tx.activity.noun.trigger_order',
          count('trigger'),
          '{{count}} trigger order',
          '{{count}} trigger orders',
        ),
      ),
    count('cancel') &&
      phrase('cancelled', 'cancelled', 'cancel', orders(count('cancel'))),
    count('fill') &&
      phrase(
        'filled',
        'filled',
        'fill',
        counted(
          'tx.activity.noun.trade',
          count('fill'),
          '{{count}} trade',
          '{{count}} trades',
        ),
      ),
    count('withdraw') &&
      phrase(
        'withdrew',
        'withdrew',
        'withdraw',
        counted(
          'tx.activity.noun.asset',
          count('withdraw'),
          '{{count}} asset',
          '{{count}} assets',
        ),
      ),
    count('session') &&
      phrase(
        'changed',
        'changed',
        'change',
        m('tx.activity.noun.session_key', 'a session key'),
      ),
  ].filter(Boolean) as Phrase[];

  const markets = [
    ...new Set(actions.filter((a) => a.market).map((a) => a.market as string)),
  ];
  const where =
    markets.length === 1
      ? m('tx.activity.headline.on_market', ' on {{market}}', {
          market: markets[0],
        })
      : '';
  const otherContracts = new Set(
    actions.filter((a) => a.kind === 'call').map((a) => a.contractId),
  ).size;

  if (!phrases.length) {
    const target: Msg | string =
      project ?? m('tx.activity.headline.a_contract', 'a contract');
    return failed
      ? m(
          'tx.activity.headline.failed_interact',
          'Failed to interact with {{target}}',
          { target },
        )
      : m('tx.activity.headline.interacted', 'Interacted with {{target}}', {
          target,
        });
  }
  const plus = otherContracts
    ? counted(
        'tx.activity.headline.plus_calls',
        otherContracts,
        ', plus calls to {{count}} other contract',
        ', plus calls to {{count}} other contracts',
      )
    : '';
  const words = list(phrases.map(([past, base]) => (failed ? base : past)));
  const key = failed ? 'failed_sentence' : 'sentence';
  const template = failed
    ? 'failed to {{list}}{{where}}{{plus}}'
    : '{{list}}{{where}}{{plus}}';
  const sentence = m(`tx.activity.headline.${key}`, template, {
    list: words,
    where,
    plus,
  });
  return {
    ...sentence,
    en: `${sentence.en.charAt(0).toUpperCase()}${sentence.en.slice(1)}`,
    capitalize: true,
  };
}

function list(items: Msg[]): Msg {
  if (items.length === 1) return items[0];
  const head = items
    .slice(0, -1)
    .reduce((acc, item) =>
      m('tx.activity.list_comma', '{{a}}, {{b}}', { a: acc, b: item }),
    );
  return m('tx.activity.list_and', '{{head}} and {{last}}', {
    head,
    last: items[items.length - 1],
  });
}

// Resolves a message with the given translate function.
export function resolveMsg(
  message: Msg,
  t: (key: string, options?: Record<string, unknown>) => string,
): string {
  const params: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(message.params ?? {})) {
    params[name] = typeof value === 'object' ? resolveMsg(value, t) : value;
  }
  const result = t(message.key, {
    ...params,
    defaultValue: message.en,
    interpolation: { escapeValue: false },
  });
  return message.capitalize
    ? `${result.charAt(0).toUpperCase()}${result.slice(1)}`
    : result;
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
          label: m('tx.activity.label.called', 'Called'),
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
