import { Box, Button, Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
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
  const classes = styles();
  if (isLoading) return <EcosystemTagsLoading />;
  return (
    <Flex justify="start" align="center" gap="2" wrap="wrap">
      <Button
        size="2"
        variant="outline"
        color={!activeTag ? 'green' : 'gray'}
        className="bg-panel-solid"
        onClick={onClickAllCategories}
      >
        All categories
      </Button>
      <Box className={classes.divider()} />
      {(tags || []).map((tag) => (
        <Button
          key={tag}
          color={activeTag === tag ? 'green' : 'gray'}
          className="bg-panel-solid"
          size="2"
          variant="outline"
          onClick={() => onClickTag?.(tag)}
        >
          {tag}
        </Button>
      ))}
    </Flex>
  );
};

export const styles = tv({
  slots: {
    divider: 'w-[1px] h-2',
  },
});

EcosystemTags.Loading = EcosystemTagsLoading;
