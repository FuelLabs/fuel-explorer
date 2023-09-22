import { Box, Container, HStack, VStack } from '@fuel-explorer/ui/Box';
import { FuelLogo } from '@fuel-explorer/ui/FuelLogo';
import { Heading } from '@fuel-explorer/ui/Heading';
import { Icon } from '@fuel-explorer/ui/Icon';
import { Link } from '@fuel-explorer/ui/Link';
import { List } from '@fuel-explorer/ui/List';
import { Text } from '@fuel-explorer/ui/Text';
import { Theme } from '@fuel-explorer/ui/Theme';
import type { BaseProps } from '@fuel-explorer/ui/types';
import {
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandDiscord,
} from '@tabler/icons-react';
import Image from 'next/image';
import { tv } from 'tailwind-variants';

import { links } from './data.json';

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
  const classes = styles();
  return (
    <VStack as="nav" className={classes.nav({ className })} {...props}>
      <Image src={img} alt={alt} width={40} height={40} />
      <Heading size="4" className={classes.navHeading()}>
        {title}
      </Heading>
      <List className={classes.navList()}>
        {links.map((link) => (
          <List.Item key={link.href}>
            <Link href={link.href} isExternal className={classes.navLink()}>
              {link.label}
            </Link>
          </List.Item>
        ))}
      </List>
    </VStack>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function Footer({ className }: BaseProps<{}>) {
  const classes = styles();
  return (
    <Theme appearance="dark">
      <Container size="4" className={classes.container()}>
        <Box as="footer" className={classes.root({ className })}>
          <VStack className={classes.brand()} gap="3">
            <FuelLogo size={24} showLettering />
            <Text className="text-secondary">
              © All rights reserved Fuel Labs
            </Text>
            <HStack gap="4">
              <a
                href="https://twitter.com/fuel_network"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon()}
              >
                <Icon icon={IconBrandTwitter} size={30} />
              </a>
              <a
                href="https://github.com/FuelLabs"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon()}
              >
                <Icon icon={IconBrandGithub} size={30} />
              </a>
              <a
                href="https://discord.com/invite/xfpK4Pe"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon()}
              >
                <Icon icon={IconBrandDiscord} size={30} />
              </a>
            </HStack>
          </VStack>

          <Box className={classes.navs()}>
            <FooterNav
              title="Resources"
              img="/icons/fuel_icon_brandbook.svg"
              alt="Brandbook Icon"
              links={links.resources}
            />
            <FooterNav
              title="About us"
              img="/icons/fuel_icon_about.svg"
              alt="About Icon"
              links={links.aboutUs}
            />
            <FooterNav
              title="Developers"
              img="/icons/fuel_icon_code.svg"
              alt="Code Icon"
              links={links.developers}
            />
          </Box>
        </Box>
      </Container>
    </Theme>
  );
}

const styles = tv({
  slots: {
    container: ['hero-bg border-t border-border'],
    root: [
      'py-8 px-8 grid gap-8 grid-cols-1 grid-rows-[auto,1fr]',
      'lg:py-10 lg:px-0 lg:grid-cols-[1fr,2fr] lg:grid-rows-auto',
    ],
    brand: [
      'items-center pb-8 border-b border-border',
      'lg:pb-0 lg:items-start lg:border-b-0',
    ],
    socialIcon: ['text-white hover:text-brand transition-colors duration-200'],
    navs: ['flex flex-col gap-8 justify-betwee md:flex-row md:text-center'],
    nav: [
      'flex flex-col flex-1',
      'md:items-center',
      'lg:text-left lg:items-start',
    ],
    navHeading: [
      'justify-start md:justify-center lg:justify-start text-heading',
    ],
    navList: ['flex flex-col gap-0 fuel-[Icon]:hidden'],
    navLink: ['text-secondary hover:text-brand'],
  },
});
