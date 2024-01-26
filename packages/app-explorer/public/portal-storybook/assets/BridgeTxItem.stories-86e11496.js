import {
  j as t,
  B as x,
  F as g,
  I as d,
  T as u,
  R as L,
} from './index-0c70cacd.js';
import { B as r, s } from './AccountConnectionInput-7bc330b7.js';
import './index-76fb7be0.js';
import './_commonjsHelpers-de833af9.js';
import './extends-98964cd2.js';
import './index-d3ea75b5.js';
import './index-8d47fad6.js';
import './BridgeSteps-30389492.js';
import './v4-4a60fe23.js';
import './iframe-d50da200.js';
import '../sb-preview/runtime.js';
import './_commonjs-dynamic-modules-302442b1.js';
import './ActionRequiredBadge-4c3ae44d.js';
import './BridgeTxListNotConnected-80d83e43.js';
import './EcosystemTags-615f572a.js';
const D = {
    component: r,
    title: 'BridgeTxItem',
    parameters: { layout: 'fullscreen' },
  },
  e = () =>
    t.jsx(x.Flex, {
      align: 'center',
      justify: 'center',
      css: p.storybook,
      children: t.jsx(r, {
        toLogo: t.jsx(g, { size: 17 }),
        date: new Date(),
        amount: '0.050',
        asset: s[0],
        fromLogo: t.jsx(d, {
          width: 18,
          height: 18,
          src: s[0].icon,
          alt: 'ETH logo',
        }),
        status: t.jsx(u, {
          fontSize: 'xs',
          color: 'intentsBase11',
          children: 'Settled',
        }),
        onClick: () => {},
      }),
    }),
  o = () =>
    t.jsx(x.Flex, {
      align: 'center',
      justify: 'center',
      css: p.storybook,
      children: t.jsx(r, {
        isLoading: !0,
        toLogo: t.jsx(g, { size: 17 }),
        date: new Date(),
        amount: '0.050',
        asset: s[0],
        fromLogo: t.jsx(d, {
          width: 18,
          height: 18,
          src: s[0].icon,
          alt: 'ETH logo',
        }),
        status: t.jsx(u, {
          fontSize: 'xs',
          color: 'intentsBase11',
          children: 'Settled',
        }),
        onClick: () => {},
      }),
    }),
  p = {
    storybook: L({
      margin: '20px',
      width: '328px',
      article: { flex: 1 },
      '@md': { width: '$sm' },
    }),
  };
var i, a, n;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((i = e.parameters) == null ? void 0 : i.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxItem toLogo={<FuelLogo size={17} />} date={new Date()} amount="0.050" asset={assetList[0]} fromLogo={<Image width={18} height={18} src={assetList[0].icon} alt={'ETH logo'} />} status={<Text fontSize="xs" color="intentsBase11">
            Settled
          </Text>} onClick={() => {}} />
    </Box.Flex>;
}`,
      ...((n = (a = e.parameters) == null ? void 0 : a.docs) == null
        ? void 0
        : n.source),
    },
  },
};
var c, l, m;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((c = o.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxItem isLoading toLogo={<FuelLogo size={17} />} date={new Date()} amount="0.050" asset={assetList[0]} fromLogo={<Image width={18} height={18} src={assetList[0].icon} alt={'ETH logo'} />} status={<Text fontSize="xs" color="intentsBase11">
            Settled
          </Text>} onClick={() => {}} />
    </Box.Flex>;
}`,
      ...((m = (l = o.parameters) == null ? void 0 : l.docs) == null
        ? void 0
        : m.source),
    },
  },
};
const H = ['Usage', 'Loading'];
export { o as Loading, e as Usage, H as __namedExportsOrder, D as default };
