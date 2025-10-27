import { Button, HStack, Separator, Text } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { tv } from 'tailwind-variants';
import { HeaderSwitch } from '~portal/systems/Ecosystem/components/EcosystemHeader/HeaderSwitch';
import { EcosystemInput } from './EcosystemInput';

export function EcosystemHeader({
  search,
  liveOnly,
  disabled,
  onSearchChange,
}: {
  search?: string;
  liveOnly?: boolean;
  disabled?: boolean;
  onSearchChange?: (search: string) => void;
}) {
  const classes = styles();

  return (
    <>
      <PageTitle
        title="Explore Fuel DApps"
        subtitle="Here's a list of DApps built on Fuel"
        mb="0"
      />

      <Separator size="4" />

      <div className={classes.searchBar()}>
        <EcosystemInput
          search={search}
          disabled={disabled}
          onSearchChange={onSearchChange}
        />
        <HStack
          justify="between"
          align={{
            initial: 'start',
            md: 'center',
          }}
          flexBasis="100%"
          gap="4"
        >
          <label
            className={classes.switchLiveOnlyWrapper()}
            htmlFor="ecosystem-switch-live-only"
          >
            <HeaderSwitch liveOnly={liveOnly || false} disabled={!!disabled} />
            <Text
              color="gray"
              size={{
                initial: '2',
                md: '3',
              }}
            >
              Show "Live" only
            </Text>
          </label>
          <Button
            as="a"
            id="ecosystem-switch-live-only"
            href="https://airtable.com/appEO4t5bVydYgzCk/pagiUOEi5aqbtQK0T/form"
            target="_blank"
            size={{
              initial: '2',
              md: '3',
            }}
            color="green"
            disabled={disabled}
          >
            List your project
          </Button>
        </HStack>
      </div>
    </>
  );
}

const styles = tv({
  slots: {
    searchBar:
      'flex flex-col gap-3 md:gap-4 md:justify-between md:flex-row w-full',
    switchLiveOnlyWrapper: 'flex flex-row items-center justify-between',
  },
});
