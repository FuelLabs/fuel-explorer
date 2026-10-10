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
  VStack,
} from '@fuels/ui';
import dayjs from 'dayjs';
import { tv } from 'tailwind-variants';

import { APP_COMMIT_HASH } from 'app-commons';
import { useTranslation } from 'react-i18next';
import data from './data.json';

const SECTION_KEYS = {
  FUEL: 'footer.fuel',
  GetStarted: 'footer.get_started',
  Build: 'footer.build',
  Environment: 'footer.environment',
} as const;

const LINK_KEYS: Record<string, string> = {
  'About Fuel': 'footer.about_fuel',
  Jobs: 'footer.jobs',
  Blog: 'footer.blog',
  'Media Kit': 'footer.media_kit',
  'Build an app': 'footer.build_an_app',
  'Create a Smart Contract': 'footer.create_contract',
  Docs: 'footer.docs',
  FuelVM: 'footer.fuelvm',
  'Grant Program': 'footer.grant_program',
  Github: 'footer.github',
  Forum: 'footer.forum',
  Discord: 'footer.discord',
  Changelog: 'footer.changelog',
  'Block Explorer': 'footer.block_explorer',
  Ecosystem: 'footer.ecosystem',
  Wallet: 'footer.wallet',
  Bridge: 'footer.bridge',
};

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
  const { t } = useTranslation();
  const classes = styles();
  const sections = (
    Object.keys(SECTION_KEYS) as (keyof typeof SECTION_KEYS)[]
  ).map((key) => ({
    title: t(SECTION_KEYS[key]),
    links: data.links[key].map((link) => ({
      ...link,
      label: t(LINK_KEYS[link.label] ?? link.label),
    })),
  }));

  return (
    <Box as="footer" className={classes.container()}>
      <Box className={classes.inner()}>
        <Flex className={classes.root()}>
          <FuelLogo showLettering size={16} />

          <Box className={classes.navs()}>
            {sections.map((section) => (
              <FooterNav
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </Box>
        </Flex>

        <VStack gap="3" className={classes.social()}>
          <HStack gap="4">
            <Link
              className={classes.socialIcon()}
              href="https://x.com/fuel_network"
              aria-label="X"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandXFilled size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://discord.com/invite/xfpK4Pe"
              aria-label="Discord"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandDiscordFilled size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://www.youtube.com/channel/UCam2Sj3SvFSAIfDbP-4jWZQ"
              aria-label="YouTube"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandYoutubeFilled size={24} />
            </Link>
            <Link
              className={classes.socialIcon()}
              href="https://t.me/fuelcommunity"
              aria-label="Telegram"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandTelegramFilled size={24} />
            </Link>
          </HStack>
          <HStack justify={'between'}>
            <Text className={classes.meta()} size="2">
              {t('footer.rights', { year: dayjs().year() })}
            </Text>
            <Text className={classes.meta()} size="2">
              {t('footer.version', { hash: APP_COMMIT_HASH })}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

const styles = tv({
  slots: {
    container: [
      'fuel-footer border-t border-t-[var(--fuel-grid-line)] py-10 fuel-[Icon]:hidden',
    ],
    inner: ['fuel-page px-6 tablet:px-10 flex flex-col gap-y-5'],
    root: [
      'justify-between items-start flex-col desktop:flex-row gap-y-10 mb-12',
    ],
    social: ['mt-12'],
    socialIcon: [
      'fuel-hit relative inline-flex text-[var(--fuel-element-mid-em)] hover:text-heading transition-colors duration-300',
    ],
    navs: ['flex flex-wrap justify-around gap-y-10 w-full max-w-screen-md'],
    nav: ['w-full tablet:w-1/2 desktop:w-auto'],
    navHeading: [
      'font-mono font-medium text-[12px] leading-none uppercase tracking-[0.05em] justify-start text-heading',
    ],
    navList: ['flex flex-col gap-0'],
    meta: ['text-[var(--fuel-element-low-em)]'],
    navLink: [
      'inline-flex min-h-11 items-center font-mono font-medium text-[14px] leading-[18px] uppercase tracking-[0.05em] text-color hover:text-heading hover:no-underline transition-colors duration-300',
    ],
  },
});
