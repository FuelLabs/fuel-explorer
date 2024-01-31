import { ContentLoader } from '@fuel-ui/react';

export const ItemLoader = () => {
  return (
    <ContentLoader
      speed={2}
      height="18"
      width="70"
      aria-label="Loading Transaction List Item"
    >
      <ContentLoader.Rect width="90" height="18" rx="4" />
    </ContentLoader>
  );
};
