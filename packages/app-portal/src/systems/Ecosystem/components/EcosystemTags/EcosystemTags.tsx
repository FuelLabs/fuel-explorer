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
        data-active={!activeTag}
        className={classes.tag()}
        size="3"
        onClick={onClickAllCategories}
      >
        All categories
      </Button>
      <Box className={classes.divider()} />
      {(tags || []).map((tag) => (
        <Button
          key={tag}
          className={classes.tag()}
          size="3"
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
    tag: 'text-heading data-[active=true]:border-success data-[active=true]:text-heading',
    divider: 'w-[1px] h-2 bg-card-border',
  },
});

EcosystemTags.Loading = EcosystemTagsLoading;
