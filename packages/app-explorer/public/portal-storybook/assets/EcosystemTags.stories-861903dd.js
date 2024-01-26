import { j as t, B as m, R as p } from './index-0c70cacd.js';
import { E as o } from './EcosystemTags-615f572a.js';
import './index-76fb7be0.js';
import './_commonjsHelpers-de833af9.js';
import './extends-98964cd2.js';
import './index-d3ea75b5.js';
const F = {
    component: o,
    title: 'Ecosystem / EcosystemTags',
    parameters: { layout: 'fullscreen' },
  },
  s = () => {
    const g = [
      'DeFi',
      'NFTs',
      'DAOs',
      'Social',
      'Lending',
      'Games',
      'DEX',
      'Stablecoins',
      'Infrastructure',
    ];
    return t.jsx(m.Flex, {
      align: 'center',
      justify: 'flex-start',
      css: x.storybook,
      children: t.jsx(o, { tags: g }),
    });
  },
  e = () =>
    t.jsx(m.Flex, {
      align: 'center',
      justify: 'flex-start',
      css: x.storybook,
      children: t.jsx(o.Loading, {}),
    }),
  x = { storybook: p({ margin: '20px' }) };
var r, a, n;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((r = s.parameters) == null ? void 0 : r.docs),
    source: {
      originalSource: `() => {
  const TAGS = ['DeFi', 'NFTs', 'DAOs', 'Social', 'Lending', 'Games', 'DEX', 'Stablecoins', 'Infrastructure'];
  return <Box.Flex align="center" justify="flex-start" css={styles.storybook}>
      <EcosystemTags tags={TAGS} />
    </Box.Flex>;
}`,
      ...((n = (a = s.parameters) == null ? void 0 : a.docs) == null
        ? void 0
        : n.source),
    },
  },
};
var c, i, l;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((c = e.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `() => <Box.Flex align="center" justify="flex-start" css={styles.storybook}>
    <EcosystemTags.Loading />
  </Box.Flex>`,
      ...((l = (i = e.parameters) == null ? void 0 : i.docs) == null
        ? void 0
        : l.source),
    },
  },
};
const T = ['Usage', 'Loader'];
export { e as Loader, s as Usage, T as __namedExportsOrder, F as default };
