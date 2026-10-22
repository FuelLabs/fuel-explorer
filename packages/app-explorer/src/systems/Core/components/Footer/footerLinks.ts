import data from './data.json';

export interface FooterLink {
  href: string;
  label: string;
  hideInExplorerOnly?: boolean;
}

export function getFooterLinks(isExplorerOnly: boolean) {
  const visible = (links: FooterLink[]) =>
    isExplorerOnly ? links.filter((link) => !link.hideInExplorerOnly) : links;

  return {
    FUEL: visible(data.links.FUEL),
    GetStarted: visible(data.links.GetStarted),
    Build: visible(data.links.Build),
    Environment: visible(data.links.Environment),
  };
}
