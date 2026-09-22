export type MetadataLink = {
  title: string;
  url: string;
};

export type MetadataAudit = {
  auditor: string;
  url: string;
  date: string;
};

export type ContractMetadata = {
  id: string;
  name: string;
  description: string;
  source: string;
  commit: string;
  repo: string;
  links: MetadataLink[];
  audits: MetadataAudit[];
  abi?: string;
  market?: {
    symbol: string;
    baseAssetId: string;
    quoteAssetId: string;
  };
};

// ABI for contracts without a fixed id that call the project's contracts.
export type CallerContractMetadata = {
  name: string;
  description?: string;
  abi: string;
};

export type PredicateMetadata = {
  blob_id: string;
  name: string;
  description: string;
  source: string;
  commit: string;
  repo: string;
  image: string;
  links: MetadataLink[];
  audits: MetadataAudit[];
};

export type Project = {
  isFuelSeason?: boolean;
  points?: number;
  order?: number;
  name: string;
  description: string;
  contracts?: Record<string, ContractMetadata[]>;
  callerContracts?: Record<string, CallerContractMetadata[]>;
  predicates?: Record<string, PredicateMetadata[]>;
  tags: string[];
  image?: string;
  url: string;
  github?: string;
  twitter?: string;
  discord?: string;
  isLive?: boolean;
  isLiveMainnet?: boolean;
  isFeatured?: boolean;
  showAccountTag?: boolean;
  /**
   * @deprecated Use `showAccountTag` instead
   */
  isExternalExchange?: boolean;
  address?: string;
  hidden?: boolean;
};

export type ExchangeProject = Project & {
  showAccountTag: true;
  address: string;
};
