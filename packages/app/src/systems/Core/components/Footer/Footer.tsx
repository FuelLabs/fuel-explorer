import {
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandDiscord,
} from '@tabler/icons-react';
import Image from 'next/image';
import { Box, HStack, VStack } from 'pn-ui-primitives/Box';
import { FuelLogo } from 'pn-ui-primitives/FuelLogo';
import { Heading } from 'pn-ui-primitives/Heading';
import { Icon } from 'pn-ui-primitives/Icon';
import { Link } from 'pn-ui-primitives/Link';
import { List } from 'pn-ui-primitives/List';
import { Text } from 'pn-ui-primitives/Text';
import type { BaseProps } from 'pn-ui-primitives/dist/utils/types';

import { cx } from '../../utils/cx';

import styles from './Footer.module.css';

type FooterNavProps = BaseProps<{
  title: string;
  img: string;
  alt: string;
  links: {
    href: string;
    label: string;
  }[];
}>;

function FooterNav({
  title,
  links,
  img,
  alt,
  className,
  ...props
}: FooterNavProps) {
  return (
    <VStack as="nav" className={cx(styles.nav, className)} {...props}>
      <Image src={img} alt={alt} width={40} height={40} />
      <Heading as="h4" className={styles.navHeading}>
        {title}
      </Heading>
      <List className={styles.navList}>
        {links.map((link) => (
          <List.Item key={link.href}>
            <Link href={link.href} isExternal className={styles.navLink}>
              {link.label}
            </Link>
          </List.Item>
        ))}
      </List>
    </VStack>
  );
}

export function Footer() {
  return (
    <Box as="footer" className={styles.root}>
      <VStack className={styles.brand} gap="3" justify="flex">
        <FuelLogo size={24} showLettering />
        <Text className="text-secondary">© All rights reserved Fuel Labs</Text>
        <HStack gap="4" className={styles.socialIcons}>
          <a
            href="https://twitter.com/fuel_network"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={IconBrandTwitter} size={30} />
          </a>
          <a
            href="https://github.com/FuelLabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={IconBrandGithub} size={30} />
          </a>
          <a
            href="https://discord.com/invite/xfpK4Pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon={IconBrandDiscord} size={30} />
          </a>
        </HStack>
      </VStack>

      <Box className={styles.navs}>
        <FooterNav
          title="Resources"
          img="/icons/fuel_icon_brandbook.svg"
          alt="Brandbook Icon"
          links={[
            {
              href: 'https://fuellabs.notion.site/27f2a32606044179bab5e2ac8e85ab0e?v=c4dfd88031f14e5da0f1845e6de8b623&pvs=4',
              label: 'AMAs',
            },
            {
              href: 'https://fuel-brand-guide.webflow.io/',
              label: 'Brand Guide',
            },
            {
              href: 'https://fuellabs.notion.site/Podcasts-9f829504cafd4ae5bc7e81d682070965?pvs=4',
              label: 'Podcasts',
            },
            {
              href: 'https://fuellabs.notion.site/Articles-25490e91c34743e7bb0c53f0d45917b8?pvs=4',
              label: 'Articles',
            },
            {
              href: 'https://fuellabs.notion.site/Workshops-Presentations-b0fb9a20de4c448cac2823be3448f149?pvs=4',
              label: 'Presentations',
            },
            {
              href: 'https://fuellabs.notion.site/People-to-follow-bff175ae0a1b4eecb837b40a6e96a547?pvs=4',
              label: 'Accounts to follow',
            },
            {
              href: 'https://fuellabs.notion.site/Tweets-82449686e63e424fb8ec9a9d4a91f147?pvs=4',
              label: 'Best Tweets',
            },
          ]}
        />
        <FooterNav
          title="About us"
          img="/icons/fuel_icon_about.svg"
          alt="About Icon"
          links={[
            {
              href: 'https://github.com/FuelLabs/awesome-fuel#upcoming-events-and-hackathons',
              label: 'Events',
            },
            {
              href: 'https://forum.fuel.network/',
              label: 'Forum',
            },
            {
              href: 'https://jobs.lever.co/fuellabs',
              label: 'Jobs',
            },
            {
              href: 'https://fuel-labs.ghost.io/fuel-q4-grant-program/',
              label: 'Apply for a Grant',
            },
          ]}
        />
        <FooterNav
          title="Developers"
          img="/icons/fuel_icon_code.svg"
          alt="Code Icon"
          links={[
            {
              href: 'https://docs.fuel.network/',
              label: 'Documentation',
            },
            {
              href: 'https://fuellabs.github.io/sway/master/reference/contributing_to_sway.html',
              label: 'Contributors Guide',
            },
            {
              href: 'https://fuellabs.github.io/sway',
              label: 'Learn Sway',
            },
            {
              href: 'https://github.com/FuelLabs/sway-applications',
              label: 'Example Apps',
            },
            {
              href: 'https://github.com/FuelLabs/fuel-specs',
              label: 'Fuel Specs',
            },
            {
              href: 'https://fuellabs.github.io/fuel-indexer/master/',
              label: 'Fuel Indexer',
            },
            {
              href: 'https://www.fuel.network/about-us/fuel-v1',
              label: 'Fuel V1',
            },
          ]}
        />
      </Box>
    </Box>
  );
}
