import { Box, Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { AllCategoriesButton } from '~portal/systems/Ecosystem/components/EcosystemTags/AllCategoriesButton';
import { EcosystemTag } from './EcosystemTag';
import { EcosystemTagsLoading } from './EcosystemTagsLoading';

type EcosystemTagsProps = {
  tags?: string[];
  activeTag?: string;
  isLoading?: boolean;
};

export const EcosystemTags = ({
  tags,
  activeTag,
  isLoading,
}: EcosystemTagsProps) => {
  const classes = styles();

  if (isLoading) return <EcosystemTagsLoading />;

  return (
    <Flex justify="start" align="center" gap="2" wrap="wrap">
      <AllCategoriesButton activeTag={activeTag} />
      <Box className={classes.divider()} />
      {(tags || []).map((tag) => (
        <EcosystemTag key={tag} tag={tag} activeTag={activeTag} />
      ))}
    </Flex>
  );
};

export const styles = tv({
  slots: {
    divider: 'w-[1px] h-2',
  },
});
