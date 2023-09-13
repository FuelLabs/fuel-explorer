import { cssObj } from '@fuel-ui/css';
import {
  Box,
  FuelLogo,
  Heading,
  IconButton,
  Link,
  List,
  Text,
} from '@fuel-ui/react';
import Image from 'next/image';

type FooterNavProps = {
  title: string;
  img: string;
  alt: string;
  links: {
    href: string;
    label: string;
  }[];
};

function FooterNav({ title, links, img, alt }: FooterNavProps) {
  return (
    <Box.VStack as="nav" css={styles.nav}>
      <Image src={img} alt={alt} width={40} height={40} />
      <Heading as="h4">{title}</Heading>
      <List>
        {links.map((link) => (
          <List.Item key={link.href}>
            <Link href={link.href} isExternal>
              {link.label}
            </Link>
          </List.Item>
        ))}
      </List>
    </Box.VStack>
  );
}

export function Footer() {
  return (
    <Box as="footer" css={styles.root}>
      <Box.VStack css={styles.brand} gap="$6" justify="center">
        <Box.HStack align="center">
          <FuelLogo size={24} />
          <Heading as="h2">FUEL</Heading>
        </Box.HStack>
        <Text>© All rights reserved Fuel Labs</Text>
        <Box.HStack gap="$6">
          <IconButton
            size="md"
            variant="link"
            as="a"
            href=""
            aria-label="Twitter"
            icon="BrandTwitter"
            iconSize={30}
          />
          <IconButton
            variant="link"
            as="a"
            href=""
            aria-label="Github"
            icon="BrandGithub"
            iconSize={30}
          />
          <IconButton
            variant="link"
            as="a"
            href=""
            aria-label="Discord"
            icon="BrandDiscord"
            iconSize={30}
          />
        </Box.HStack>
      </Box.VStack>

      <Box css={styles.navs}>
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

const styles = {
  root: cssObj({
    py: '$8',
    px: '$8',
    background: 'url(/logo-faded.svg) no-repeat -40px center',
    backgroundSize: 'auto 100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
    gridGap: '$14',

    '@lg': {
      gridTemplateColumns: '1fr 2fr',
      gridTemplateRows: 'auto',
      py: '$14',
      px: '$16',
    },
  }),
  brand: cssObj({
    alignItems: 'center',
    pb: '$14',
    borderBottom: '1px solid $border',

    '@lg': {
      pb: '$0',
      alignItems: 'flex-start',
      borderBottom: 'none',
    },

    '.fuel_Heading': {
      margin: 0,
    },
  }),
  navs: cssObj({
    display: 'flex',
    flexDirection: 'column',
    gap: '$10',
    justifyContent: 'space-between',

    '@md': {
      flexDirection: 'row',
      textAlign: 'center',
    },
  }),
  nav: cssObj({
    flex: 1,

    '@md': {
      alignItems: 'center',
    },

    '@lg': {
      textAlign: 'left',
      alignItems: 'flex-start',
    },

    '.fuel_List': {
      display: 'flex',
      flexDirection: 'column',
      gap: '$1',
    },
    '.fuel_Link': {
      color: '$textColor',
    },
    '.fuel_Link .fuel_Icon': {
      display: 'none',
    },
  }),
};
