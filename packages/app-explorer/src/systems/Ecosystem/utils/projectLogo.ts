import { getProjectImage } from 'app-commons';

/**
 * Logos are kept in /public/projects so they can be centered and recolored
 * here. A project that has no local file falls back to the feed's own image.
 */
export const localProjectLogo = (image: string) =>
  image ? `/projects/${image}.webp` : '';

export type LogoSource = 'local' | 'remote' | 'none';

export const logoUrl = (image: string, source: LogoSource) =>
  source === 'local' ? localProjectLogo(image) : getProjectImage(image);

export const nextLogoSource = (source: LogoSource): LogoSource =>
  source === 'local' ? 'remote' : 'none';
