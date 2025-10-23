export const getProjectImage = (image: string): string => {
  if (!image) return '';

  return `https://fuellabs.github.io/fuel-ecosystem/assets/${image}.jpeg`;
};

export const getProjectImageWithFallback = (
  image: string,
  fallbackUrl?: string,
): string => {
  if (!image) return fallbackUrl || '';

  const localUrl = `/ecosystem/images/${image}.jpeg`;
  return localUrl;
};
