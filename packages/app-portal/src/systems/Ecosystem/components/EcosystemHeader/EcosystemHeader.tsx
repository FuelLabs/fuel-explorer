import { Button, Flex, Input, Separator, Switch, Text } from '@fuels/ui';
import { IconSearch } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { tv } from 'tailwind-variants';

export function EcosystemHeader({
  disabled,
  search,
  onSearchChange,
  onBuildingHiddenChange,
  isBuildingHidden,
}: {
  disabled?: boolean;
  search?: string;
  isBuildingHidden?: boolean;
  onSearchChange?: (value: string) => void;
  onBuildingHiddenChange?: (value: boolean) => void;
}) {
  const classes = styles();

  return (
    <>
      <PageTitle
        title="Explore Fuel DApps"
        subtitle="Here&apos;s a list of DApps built on Fuel"
        mb="0"
      />

      <Separator size="4" />

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
        <Flex justify="between" flexBasis={'100%'}>
          <label className={classes.switchLiveOnlyWrapper()}>
            <Switch
              defaultChecked={!isBuildingHidden}
              mr="2"
              onCheckedChange={onBuildingHiddenChange}
            />
            {/* Show "Live" only */}
            <Text color="gray">Show "Live" only</Text>
          </label>
          <Button
            as="a"
            href="https://airtable.com/appEO4t5bVydYgzCk/pagiUOEi5aqbtQK0T/form"
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
    searchBar: 'flex-col sm:justify-between sm:flex-row',
    searchBarInput: 'w-full sm:w-[350px] h-[44px]',
    switchLiveOnlyWrapper:
      'flex flex-row items-center justify-between mr-2 ml-1',
  },
});
