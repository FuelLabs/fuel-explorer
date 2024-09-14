export type Project = {
  name: string;
  description: string;
  tags: string[];
  image?: string;
  url: string;
  github?: string;
  twitter?: string;
  discord?: string;
  status?: string[];
  isLive?: boolean;
  isFeatured?: boolean;
};
