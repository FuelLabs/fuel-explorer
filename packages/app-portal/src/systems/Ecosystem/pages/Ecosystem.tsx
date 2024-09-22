import { VStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { EcosystemHeader } from '../components/EcosystemHeader/EcosystemHeader';
import { EcosystemTags } from '../components/EcosystemTags';
import { ProjectList } from '../components/ProjectList/ProjectList';
import { useEcosystem } from '../hooks/useEcosystem';

export function Ecosystem() {
  const classes = styles();
  const {
    tags,
    isLoading,
    filter,
    search,
    handlers,
    filteredProjects,
    isBuildingHidden,
  } = useEcosystem();

  const handleSearch = (query: string) => {
    handlers.searchProjects({ query });
  };

  const handleTagButtonClick = (tag: string) => {
    handlers.filterProjects({ tag });
  };

  const emptyText = search?.length
    ? 'No results found for your search.'
    : undefined;

  return (
    <VStack gap="6" flexGrow="1" className={classes.content()}>
      <EcosystemHeader
        search={search}
        onSearchChange={handleSearch}
        onBuildingHiddenChange={handlers.toggleIsBuildingHidden}
        isBuildingHidden={isBuildingHidden}
      />
      <EcosystemTags
        tags={tags}
        activeTag={filter}
        isLoading={isLoading}
        onClickTag={handleTagButtonClick}
        onClickAllCategories={handlers.clearFilters}
      />
      <ProjectList
        isLoading={isLoading}
        projects={filteredProjects}
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
