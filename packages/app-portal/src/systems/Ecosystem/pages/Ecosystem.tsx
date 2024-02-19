import { Layout, animations } from '~/systems/Core';

import { Flex, Heading, Input, Text, VStack } from '@fuels/ui';
import { IconSearch } from '@tabler/icons-react';
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
    <Layout {...animations.slideInTop()}>
      <Layout.Content className="pt-16 pr-1 pb-4 pl-4">
        <VStack gap="9" grow="1" className={classes.content()}>
          <Flex className={classes.headingWrapper()}>
            <VStack gap="2" wrap="wrap">
              <Heading as="h2" className={classes.heading()}>
                Explore Fuel Dapps
              </Heading>
              <Text>Here&apos;s a list of dapps built on Fuel</Text>
            </VStack>
            <Input className={classes.searchBar()}>
              <Input.Field
                name="search"
                placeholder="Search"
                type="text"
                value={search || ''}
                onChange={handleSearch}
              />
              <Input.Slot>
                <IconSearch />
              </Input.Slot>
            </Input>
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
      </Layout.Content>
    </Layout>
  );
}

const styles = tv({
  slots: {
    content: 'pb-20',
    heading: 'm-0',
    subHeading: 'text-sm',
    headingWrapper: [
      'flex flex-col gap-10 items-start justify-between',
      'tablet:flex-row tablet:gap-10 tablet:items-end',
    ],
    searchBar: 'w-full tablet:w-auto',
  },
});
