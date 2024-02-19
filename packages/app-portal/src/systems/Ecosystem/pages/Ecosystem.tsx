import { cssObj } from '@fuel-ui/css';
import { Box, Button, Heading, Icon, Input, Text } from '@fuel-ui/react';
import { useState } from 'react';
import { Layout, animations } from '~/systems/Core';

import { EcosystemTags } from '../components/EcosystemTags';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { ProjectList } from '../components/ProjectList/ProjectList';
import categoryDescriptions from '../data/categoryDescriptions';
import { useEcosystem } from '../hooks/useEcosystem';

export function Ecosystem() {
  const { tags, isLoading, filter, search, handlers, filteredProjects } =
    useEcosystem();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlers.searchProjects({ query: e.target.value });
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleTagButtonClick = (tag: string) => {
    handlers.filterProjects({ tag });
    setSelectedCategory(tag);
  };
  const handleAllCategoriesClick = () => {
    handlers.clearFilters();
    setSelectedCategory(null);
  };
  const getCategoryDescription = (category: string): string | null => {
    return categoryDescriptions[category] || null;
  };
  const emptyText = search?.length
    ? 'No results found for your search.'
    : undefined;

  const featuredProjects = filteredProjects
    ? filteredProjects.filter((project) => project.isLive)
    : [];
  return (
    <>
      <style>{keyframes}</style>
      <Layout {...animations.slideInTop()}>
        <Layout.Content css={{ padding: '$16 $4 $4 $4' }}>
          <Box.Stack gap="$12" grow={1} css={styles.content}>
            <Box.Flex css={styles.headingWrapper}>
              <Heading as="h1" css={styles.heading}>
                <Box.Stack gap="$2" wrap="wrap">
                  Explore the Fuel Ecosystem
                </Box.Stack>
              </Heading>
            </Box.Flex>
            <Box.Flex
              css={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Input css={styles.searchBar}>
                <Input.Field
                  name="search"
                  placeholder="Search"
                  type="text"
                  onChange={handleSearch}
                  value={search || ''}
                />
                <Input.ElementRight element={<Icon icon="Search" />} />
              </Input>
              <a
                href="https://fuelnetwork.typeform.com/addproject"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="solid" intent="primary" size="md">
                  List your dapp
                </Button>
              </a>
            </Box.Flex>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <Box css={styles.divider}></Box>
            {featuredProjects.length > 0 && (
              <>
                <Heading as="h2" css={styles.heading}>
                  Featured Projects
                </Heading>
              </>
            )}
            {featuredProjects.length > 0 && (
              <>
                <Box>
                  <FeaturedProjects projects={featuredProjects} />
                </Box>
              </>
            )}
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            {featuredProjects.length > 0 && <Box css={styles.divider}></Box>}
            <Heading as="h2" css={styles.heading}>
              Project Categories
            </Heading>
            <EcosystemTags
              tags={tags}
              onClickTag={handleTagButtonClick}
              activeTag={filter}
              onClickAllCategories={handleAllCategoriesClick}
              isLoading={isLoading}
            />
            {selectedCategory && (
              <>
                <Box>
                  <Heading as="h2" css={styles.heading}>
                    {selectedCategory}
                  </Heading>
                  <Text css={styles.categoryDescription}>
                    {getCategoryDescription(selectedCategory)}
                  </Text>
                </Box>
              </>
            )}
            <ProjectList
              isLoading={isLoading}
              projects={filteredProjects || []}
              emptyText={emptyText}
            />
          </Box.Stack>
        </Layout.Content>
      </Layout>
    </>
  );
}

const styles = {
  content: cssObj({
    paddingBottom: '$20',
  }),
  heading: cssObj({
    margin: 0,
  }),
  subHeading: cssObj({
    fontSize: '0.875rem',
  }),
  headingWrapper: cssObj({
    flexDirection: 'column',
    gap: '$10',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    '@sm': {
      flexDirection: 'row',
      gap: '$10',
      alignItems: 'flex-end',
    },
  }),
  searchBar: cssObj({
    width: '50%',
    '@sm': {
      width: 'auto',
    },
  }),
  divider: cssObj({
    height: '0.5px',
    width: '100%',
    backgroundColor: '$intentsBase6',
  }),
  panelVisible: cssObj({
    animation: 'slideIn 0.5s forwards',
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
  }),
  panelHidden: cssObj({
    animation: 'slideOut 0.5s forwards',
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
  }),
  categoryDescription: cssObj({
    marginTop: '10px',
  }),
};
const keyframes = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;
