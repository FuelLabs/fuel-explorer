import { lightColors, darkColors } from '@fuel-ui/css';
import { Box, ContentLoader } from '@fuel-ui/react';
import { useTheme } from '~/systems/Settings';

export const BridgeTxItemsLoading = () => {
  const { theme } = useTheme();

  const currentColors = theme === 'light' ? lightColors : darkColors;
  return (
    <Box.Stack
      justify="center"
      gap="$4"
      aria-label="Loading Bridge Transactions"
    >
      <ContentLoader
        speed={2}
        height="58"
        width="100%"
        backgroundColor={currentColors.intentsBase3}
        foregroundColor={currentColors.intentsBase5}
      >
        <ContentLoader.Rect width="100%" height="58" rx="4" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        height="58"
        width="100%"
        backgroundColor={currentColors.intentsBase2}
        foregroundColor={currentColors.intentsBase4}
      >
        <ContentLoader.Rect width="100%" height="58" rx="4" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        height="58"
        width="100%"
        backgroundColor={currentColors.intentsBase1}
        foregroundColor={currentColors.intentsBase3}
      >
        <ContentLoader.Rect width="100%" height="58" rx="4" />
      </ContentLoader>
    </Box.Stack>
  );
};
