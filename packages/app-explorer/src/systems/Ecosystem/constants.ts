import type { ProjectCategory } from '~/types/ecosystem';

export type EcosystemSection = {
  id: string;
  /** Unset for the suite and for projects with no category. */
  category?: ProjectCategory;
};

// Suite apps are listed first and again under their own category.
export const SUITE_SECTION: EcosystemSection = { id: 'fuel' };

export const UNCATEGORIZED_SECTION: EcosystemSection = { id: 'more' };

export const ECOSYSTEM_SECTIONS: EcosystemSection[] = [
  { id: 'defi', category: 'DeFi' },
  { id: 'ai', category: 'AI' },
  { id: 'wallets', category: 'Wallets' },
  { id: 'infrastructure', category: 'Data & Infrastructure' },
  { id: 'tooling', category: 'Tooling' },
  { id: 'security', category: 'Security' },
  UNCATEGORIZED_SECTION,
];
