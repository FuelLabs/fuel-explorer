import { cssObj } from '@fuel-ui/css';
import { Box, Button } from '@fuel-ui/react';

import { EcosystemTagsLoading } from './EcosystemTagsLoading';

type EcosystemTagsProps = {
  tags?: string[];
  onClickTag?: (tag: string) => void;
  activeTag?: string;
  onClickAllCategories?: () => void;
  isLoading?: boolean;
};

export const EcosystemTags = ({
  tags,
  onClickTag,
  activeTag,
  onClickAllCategories,
  isLoading,
}: EcosystemTagsProps) => {
  if (isLoading) return <EcosystemTagsLoading />;
  return (
    <Box.Flex justify="flex-start" align="center" gap="$2" wrap="wrap">
      <Button
        variant="outlined"
        css={{ ...styles.tag, ...(!activeTag && styles.active) }}
        size="sm"
        onClick={onClickAllCategories}
      >
        All categories
      </Button>
      <Box css={styles.divider} />
      {(tags || []).map((tag) => (
        <Button
          key={tag}
          variant="outlined"
          css={{ ...styles.tag, ...(activeTag === tag && styles.active) }}
          size="sm"
          onClick={() => onClickTag?.(tag)}
        >
          {tag}
        </Button>
      ))}
    </Box.Flex>
  );
};

const styles = {
  tag: cssObj({
    color: '$intentsBase12',
  }),
  active: cssObj({
    borderColor: '$intentsPrimary10',
    color: '$intentsBase12',
  }),
  divider: cssObj({
    width: '1px',
    height: '$3',
    backgroundColor: '$intentsBase6',
  }),
};

EcosystemTags.Loading = EcosystemTagsLoading;
