export const PAGE_TITLE_TOKEN = '__PAGE_TITLE__';
export const PAGE_DESCRIPTION_TOKEN = '__PAGE_DESCRIPTION__';
export const PAGE_URL_TOKEN = '__PAGE_URL__';

const HOME_DESCRIPTION =
  'Blocks, transactions and live network stats for Fuel Ignition.';

// `key` names the meta.* translation group used by the client-side PageMeta.
export type PageMeta = {
  title: string;
  description: string;
  key?: string;
  params?: Record<string, string>;
};

type Rule = {
  test: RegExp;
  meta: PageMeta | ((match: RegExpMatchArray) => PageMeta);
};

// First match wins. /blocks must precede /block, and history must precede /bridge.
const RULES: Rule[] = [
  {
    test: /^\/bridge\/history(?:\/|$)/,
    meta: {
      key: 'bridge_history',
      title: 'Bridge history · Fuel Explorer',
      description: 'Pending and completed transfers between Ethereum and Fuel.',
    },
  },
  {
    test: /^\/bridge(?:\/|$)/,
    meta: {
      key: 'bridge',
      title: 'Bridge · Fuel Explorer',
      description: 'Move assets between Ethereum and Fuel Ignition.',
    },
  },
  {
    test: /^\/staking\/on-ethereum(?:\/|$)/,
    meta: {
      key: 'staking_on_ethereum',
      title: 'Stake on Ethereum · Fuel Explorer',
      description:
        'Stake FUEL on Ethereum and track positions, validators and transactions.',
    },
  },
  {
    test: /^\/staking(?:\/|$)/,
    meta: {
      key: 'staking',
      title: 'Stake · Fuel Explorer',
      description:
        'Delegate FUEL to validators, or liquid stake through The Rig.',
    },
  },
  {
    test: /^\/ecosystem(?:\/|$)/,
    meta: {
      key: 'ecosystem',
      title: 'Ecosystem · Fuel Explorer',
      description: 'Apps, wallets and infrastructure built on Fuel.',
    },
  },
  {
    test: /^\/blocks(?:\/|$)/,
    meta: {
      key: 'blocks',
      title: 'Blocks · Fuel Explorer',
      description: 'Recent blocks on Fuel Ignition.',
    },
  },
  {
    test: /^\/block\/([0-9A-Za-z]+)(?:\/|$)/,
    meta: (match) => ({
      key: 'block',
      params: { height: match[1] },
      title: `Block ${match[1]} · Fuel Explorer`,
      description: `Block ${match[1]} on Fuel Ignition.`,
    }),
  },
  {
    test: /^\/tx\/([0-9A-Za-z]+)(?:\/|$)/,
    meta: {
      key: 'tx',
      title: 'Transaction · Fuel Explorer',
      description: 'A transaction on Fuel Ignition.',
    },
  },
  {
    test: /^\/account\/([0-9A-Za-z]+)(?:\/|$)/,
    meta: {
      key: 'account',
      title: 'Account · Fuel Explorer',
      description: 'Assets, transactions and NFTs for a Fuel account.',
    },
  },
  {
    test: /^\/contract\/([0-9A-Za-z]+)(?:\/|$)/,
    meta: {
      key: 'contract',
      title: 'Contract · Fuel Explorer',
      description: 'Assets, code and transactions for a Fuel contract.',
    },
  },
  {
    test: /^\/upgrade(?:\/|$)/,
    meta: {
      key: 'upgrade',
      title: 'Token manager · Fuel Explorer',
      description: 'Contributor grants and Fuel token release schedules.',
    },
  },
];

const HOME: PageMeta = {
  key: 'home',
  title: 'Fuel Explorer',
  description: HOME_DESCRIPTION,
};

export function matchPageMeta(pathname: string): PageMeta {
  const path = pathname.split('?')[0] || '/';
  for (const rule of RULES) {
    const match = path.match(rule.test);
    if (!match) continue;
    return typeof rule.meta === 'function' ? rule.meta(match) : rule.meta;
  }
  return HOME;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const OG_URL_TAG = /\s*<meta property="og:url" content="__PAGE_URL__" \/>/;

export function applyPageMeta(html: string, pathname: string, pageUrl: string) {
  const meta = matchPageMeta(pathname);
  const withUrl = pageUrl
    ? html.replaceAll(PAGE_URL_TOKEN, escapeHtml(pageUrl))
    : html.replace(OG_URL_TAG, '');
  return withUrl
    .replaceAll(PAGE_TITLE_TOKEN, escapeHtml(meta.title))
    .replaceAll(PAGE_DESCRIPTION_TOKEN, escapeHtml(meta.description));
}
