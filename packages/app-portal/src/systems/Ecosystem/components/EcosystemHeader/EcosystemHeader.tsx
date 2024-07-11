import { Button, Flex, Input, Text, VStack } from '@fuels/ui';
import { IconApps, IconSearch } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { tv } from 'tailwind-variants';

export function EcosystemHeader({
  disabled,
  search,
  onSearchChange,
}: {
  disabled?: boolean;
  search?: string;
  onSearchChange?: (value: string) => void;
}) {
  const classes = styles();
  return (
    <>
      <PageTitle icon={<IconApps size={22} />} className="first:mb-0">
        <VStack gap="2" wrap="wrap">
          Explore Fuel DApps
          <Text className="text-secondary">
            Here&apos;s a list of DApps built on Fuel
          </Text>
        </VStack>
      </PageTitle>
      <Flex gap="4" className={classes.searchBar()}>
        <Input
          className={classes.searchBarInput()}
          size="3"
          name="search"
          type="text"
          placeholder="Search"
          value={search || ''}
          disabled={disabled}
          onChange={(e) => onSearchChange?.(e.target.value)}
        >
          <Input.Slot side="right">
            <IconSearch size={16} />
          </Input.Slot>
        </Input>
        <Flex justify="end">
          <Button
            as="a"
            href="https://airtable.com/appEO4t5bVydYgzCk/pag7Jhp6zbEwjkTQt/form"
            target="_blank"
            size="3"
            color="green"
            disabled={disabled}
          >
            List your project
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

const styles = tv({
  slots: {
    searchBar: 'flex-col tablet:justify-between tablet:flex-row',
    searchBarInput: 'w-full tablet:w-[350px]',
  },
});
