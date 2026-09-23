import {
  Box,
  Flex,
  FuelLogo,
  HStack,
  IconBrandDiscordFilled,
  IconBrandTelegramFilled,
  IconBrandXFilled,
  IconBrandYoutubeFilled,
  Link,
  List,
  Text,
  Theme,
  VStack,
} from '@fuels/ui';
import dayjs from 'dayjs';
import { tv } from 'tailwind-variants';

import { APP_COMMIT_HASH } from 'app-commons';
import data from './data.json';

type FooterNavProps = {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
};

function FooterNav({ title, links }: FooterNavProps) {
  const classes = styles();

  return (
    <VStack as="nav" gap="4" className={classes.nav()}>
      <Text as="h2" className={classes.navHeading()} size="3">
        {title}
      </Text>
      <List className={classes.navList()}>
        {links.map((link) => (
          <List.Item key={link.href}>
            <Link
              isExternal
              className={classes.navLink()}
              href={link.href}
              size="2"
            >
              {link.label}
            </Link>
          </List.Item>
        ))}
      </List>
    </VStack>
  );
}

export function Footer() {
  const classes = styles();

  return (
    <Theme appearance="dark">
      <Box as="footer" className={classes.container()}>
        <Flex className={classes.root()}>
          <FuelLogo showLettering size={16} />

          <Box className={classes.navs()}>
            <FooterNav title="FUEL" links={data.links.FUEL} />
            <FooterNav title="Get Started" links={data.links.GetStarted} />
            <FooterNav title="Build" links={data.links.Build} />
            <FooterNav title="Environment" links={data.links.Environment} />
          </Box>
        </Flex>

        <VStack gap="3" className={classes.social()}>
          <HStack gap="4">
            <Link
              className={classes.socialIcon()}
              href="https://x.com/fuel_network"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandXFilled size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://discord.com/invite/xfpK4Pe"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandDiscordFilled size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://www.youtube.com/channel/UCam2Sj3SvFSAIfDbP-4jWZQ"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandYoutubeFilled size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://t.me/fuelcommunity"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandTelegramFilled size={24} />
            </Link>
          </HStack>
          <HStack justify={'between'}>
            <Text className="text-[var(--fuel-stone-400)]" size="2">
              © {dayjs().year()} Fuel Labs. All rights reserved
            </Text>
            <Text className="text-[var(--fuel-stone-400)] opacity-50" size="2">
              version: {APP_COMMIT_HASH}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Theme>
  );
}

const styles = tv({
  slots: {
    container: [
      'bg-black border-t border-[var(--fuel-border-footer)] px-10 py-10 flex flex-col gap-y-5 fuel-[Icon]:hidden',
    ],
    root: [
      'justify-between items-start flex-col desktop:flex-row gap-y-10 mb-12',
    ],
    social: ['mt-12'],
    socialIcon: [
      'text-white opacity-50 hover:opacity-100 transition-opacity duration-300',
    ],
    navs: ['flex flex-wrap justify-around gap-y-10 w-full max-w-screen-md'],
    nav: ['w-full tablet:w-1/2 desktop:w-auto'],
    navHeading: [
      'font-mono font-medium text-[12px] leading-none uppercase tracking-[0.05em] justify-start text-white',
    ],
    navList: ['flex flex-col gap-0'],
    navLink: [
      'font-mono font-medium text-[14px] leading-[18px] uppercase tracking-[0.05em] text-[var(--fuel-stone-50)] hover:text-white hover:no-underline transition-colors duration-300',
    ],
  },
});
