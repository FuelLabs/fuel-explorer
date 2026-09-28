export const START_BUILDING_URL = 'https://docs.fuel.network/';

export type EcosystemSection = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  /** Project tags that place a project here. The first matching section wins. */
  tags: string[];
};

export const ECOSYSTEM_SECTIONS: EcosystemSection[] = [
  {
    id: 'fuel',
    eyebrow: 'Official apps',
    title: 'The Fuel Suite',
    lead: 'First-party products built and maintained by Fuel Labs.',
    tags: ['Fuel'],
  },
  {
    id: 'defi',
    eyebrow: 'DeFi',
    title: 'DeFi',
    lead: 'Trade, lend, launch and earn yield with assets on Fuel.',
    tags: ['DeFi', 'Launchpad', 'Prediction Market'],
  },
  {
    id: 'wallets',
    eyebrow: 'Wallets',
    title: 'Wallets',
    lead: 'Hold, send and sign. Self-custody on Fuel.',
    tags: ['Wallet'],
  },
  {
    id: 'infrastructure',
    eyebrow: 'Infrastructure',
    title: 'Infrastructure',
    lead: 'Bridges, oracles, indexers and on-ramps that keep Fuel connected.',
    tags: ['Bridge', 'Oracle', 'Indexer', 'On-Ramp', 'Analytics'],
  },
  {
    id: 'nft',
    eyebrow: 'NFT and gaming',
    title: 'NFTs and games',
    lead: 'Collections, marketplaces, identity and games on Fuel.',
    tags: ['NFT', 'Gaming', 'Social'],
  },
  {
    id: 'tooling',
    eyebrow: 'Tooling',
    title: 'Tooling',
    lead: 'Developer tools and learning resources for building on Fuel.',
    tags: ['Tooling', 'Education'],
  },
  {
    id: 'security',
    eyebrow: 'Security',
    title: 'Security',
    lead: 'Auditors and security firms that review and protect projects on Fuel.',
    tags: ['Security'],
  },
  {
    id: 'more',
    eyebrow: 'More',
    title: 'More on Fuel',
    lead: 'Other projects live on Fuel.',
    tags: [],
  },
];
