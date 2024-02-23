import { Button, Flex, Input, Text, VStack } from '@fuels/ui';
import { IconApps, IconSearch } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { tv } from 'tailwind-variants';
import { EcosystemTags } from '../components/EcosystemTags';
import { ProjectList } from '../components/ProjectList/ProjectList';
import { useEcosystem } from '../hooks/useEcosystem';

export function Ecosystem() {
  const classes = styles();
  const { tags, isLoading, filter, search, handlers, filteredProjects } =
    useEcosystem();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlers.searchProjects({ query: e.target.value });
  };

  const handleTagButtonClick = (tag: string) => {
    handlers.filterProjects({ tag });
  };

  const emptyText = search?.length
    ? 'No results found for your search.'
    : undefined;

  return (
    <VStack gap="6" grow="1" className={classes.content()}>
      <PageTitle icon={<IconApps size={22} />} className="first:mb-0">
        <VStack gap="2" wrap="wrap">
          Explore Fuel Dapps
          <Text className="text-secondary">
            Here&apos;s a list of dapps built on Fuel
          </Text>
        </VStack>
      </PageTitle>
      <Flex gap="4" className={classes.searchBar()}>
        <Input className={classes.searchBarInput()} size="3">
          <Input.Field
            name="search"
            placeholder="Search"
            type="text"
            value={search || ''}
            onChange={handleSearch}
          />
          <Input.Slot>
            <IconSearch size={16} />
          </Input.Slot>
        </Input>
        <Flex justify="end">
          <Button as="a" href="" target="_blank" size="3" color="green">
            List your project
          </Button>
        </Flex>
      </Flex>
      <EcosystemTags
        tags={tags}
        activeTag={filter}
        isLoading={isLoading}
        onClickTag={handleTagButtonClick}
        onClickAllCategories={handlers.clearFilters}
      />
      <ProjectList
        isLoading={isLoading}
        projects={filteredProjects || []}
        emptyText={emptyText}
      />
    </VStack>
  );
}

const styles = tv({
  slots: {
    content: 'pb-20',
    subHeading: 'text-sm',
    headingWrapper: [
      'flex flex-col gap-10 items-start justify-between',
      'tablet:flex-row tablet:gap-10 tablet:items-end',
    ],
    searchBar: 'flex-col tablet:justify-between tablet:flex-row',
    searchBarInput: 'w-full tablet:w-[350px]',
  },
});
