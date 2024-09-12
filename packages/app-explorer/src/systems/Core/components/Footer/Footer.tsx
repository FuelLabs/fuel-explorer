import {
  Box,
  Flex,
  FuelLogo,
  HStack,
  Icon,
  IconBrandDiscordFilled,
  IconBrandTelegramFilled,
  IconBrandWarpCastFilled,
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
          <FuelLogo showLettering size={32} />

          <Box className={classes.navs()}>
            <FooterNav title="Learn" links={data.links.learn} />
            <FooterNav title="Build" links={data.links.build} />
            <FooterNav title="Use" links={data.links.use} />
            <FooterNav title="Community" links={data.links.community} />
          </Box>
        </Flex>

        <VStack gap="3" className={classes.social()}>
          <HStack gap="4">
            <Link
              className={classes.socialIcon()}
              href="https://twitter.com/fuel_network"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon icon={IconBrandXFilled} size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://discord.com/invite/xfpK4Pe"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon icon={IconBrandDiscordFilled} size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://warpcast.com/fuel-network"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon icon={IconBrandWarpCastFilled} size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://www.youtube.com/channel/UCam2Sj3SvFSAIfDbP-4jWZQ"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon icon={IconBrandYoutubeFilled} size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://t.me/fuelcommunity"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon icon={IconBrandTelegramFilled} size={24} />
            </Link>
          </HStack>
          <Text className="text-secondary" size="2">
            © {dayjs().year()} Fuel Labs. All rights reserved
          </Text>
        </VStack>
      </Box>
    </Theme>
  );
}

const styles = tv({
  slots: {
    container: [
      'hero-bg border-t border-border px-10 py-10 flex flex-col gap-y-5 fuel-[Icon]:hidden',
    ],
    root: [
      'justify-between items-start flex-col desktop:flex-row gap-y-10 mb-12',
    ],
    social: ['mt-12'],
    socialIcon: ['text-white hover:text-brand transition-colors duration-200 '],
    navs: ['flex flex-wrap justify-between gap-y-10 w-full max-w-screen-md'],
    nav: ['w-full tablet:w-1/2 desktop:w-auto'],
    navHeading: ['font-mono justify-start text-white'],
    navList: ['flex flex-col gap-0'],
    navLink: [
      'font-mono text-white hover:text-brand hover:no-underline transition-colors duration-200',
    ],
  },
});
