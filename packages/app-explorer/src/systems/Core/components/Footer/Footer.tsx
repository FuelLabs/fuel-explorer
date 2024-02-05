import {
  Box,
  Container,
  FuelLogo,
  HStack,
  Heading,
  Icon,
  Link,
  List,
  Text,
  Theme,
  VStack,
} from "@fuels/ui";
import type { BaseProps } from "@fuels/ui";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";
import { tv } from "tailwind-variants";

import data from "./data.json";

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
    <VStack as="nav" gap="2" className={classes.nav({ className })} {...props}>
      <Image alt={alt} height={40} src={img} width={40} />
      <Heading className={classes.navHeading()} size="5">
        {title}
      </Heading>
      <List className={classes.navList()}>
        {links.map((link) => (
          <List.Item key={link.href}>
            <Link isExternal className={classes.navLink()} href={link.href}>
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
      <Container className={classes.container()} size="4">
        <Box as="footer" className={classes.root({ className })}>
          <VStack className={classes.brand()} gap="3">
            <FuelLogo showLettering size={24} />
            <Text className="text-secondary">
              © All rights reserved Fuel Labs
            </Text>
            <HStack gap="4">
              <a
                className={classes.socialIcon()}
                href="https://twitter.com/fuel_network"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon icon={IconBrandTwitter} size={30} />
              </a>
              <a
                className={classes.socialIcon()}
                href="https://github.com/FuelLabs"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon icon={IconBrandGithub} size={30} />
              </a>
              <a
                className={classes.socialIcon()}
                href="https://discord.com/invite/xfpK4Pe"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon icon={IconBrandDiscord} size={30} />
              </a>
            </HStack>
          </VStack>

          <Box className={classes.navs()}>
            <FooterNav
              alt="Brandbook Icon"
              img="/icons/fuel_icon_brandbook.svg"
              links={data.links.resources}
              title="Resources"
            />
            <FooterNav
              alt="About Icon"
              img="/icons/fuel_icon_about.svg"
              links={data.links.aboutUs}
              title="About us"
            />
            <FooterNav
              alt="Code Icon"
              img="/icons/fuel_icon_code.svg"
              links={data.links.developers}
              title="Developers"
            />
          </Box>
        </Box>
      </Container>
    </Theme>
  );
}

const styles = tv({
  slots: {
    container: ["hero-bg border-t border-border px-8 tablet:px-10"],
    root: [
      "py-14 grid gap-8 grid-cols-1 grid-rows-[auto,1fr]",
      "laptop:py-16 laptop:grid-cols-[1fr,2fr] laptop:grid-rows-auto",
    ],
    brand: [
      "items-center pb-8 border-b border-border",
      "laptop:pb-0 laptop:items-start laptop:border-b-0",
    ],
    socialIcon: ["text-white hover:text-brand transition-colors duration-200"],
    navs: [
      "flex flex-col gap-8 justify-between tablet:flex-row tablet:text-center",
    ],
    nav: ["flex-1 tablet:items-center laptop:text-left laptop:items-start"],
    navHeading: [
      "justify-start tablet:justify-center laptop:justify-start text-heading",
    ],
    navList: ["flex flex-col gap-0 fuel-[Icon]:hidden"],
    navLink: ["text-secondary hover:text-brand"],
  },
});
