import { j as e, B as n, b as i, R as j } from './index-0c70cacd.js';
import { c as o, s as t } from './AccountConnectionInput-7bc330b7.js';
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
const S = {
    component: o,
    title: 'BridgeTxOverview',
    parameters: { layout: 'fullscreen' },
  },
  s = () =>
    e.jsx(n.Flex, {
      align: 'center',
      justify: 'center',
      css: c.storybook,
      children: e.jsx(o, {
        transactionId: i(0x462d53bbb83e0),
        date: new Date(),
        isDeposit: !0,
        amount: '1.500',
        asset: t[0],
        ethAsset: t[0],
      }),
    }),
  r = () =>
    e.jsx(n.Flex, {
      align: 'center',
      justify: 'center',
      css: c.storybook,
      children: e.jsx(o, {
        transactionId: i(0x462d53bbb83e0),
        date: new Date(),
        asset: t[0],
        amount: '1.500',
        ethAsset: t[0],
      }),
    }),
  a = () =>
    e.jsx(n.Flex, {
      align: 'center',
      justify: 'center',
      css: c.storybook,
      children: e.jsx(o, {
        isLoading: !0,
        transactionId: i(0x462d53bbb83e0),
        date: new Date(),
        isDeposit: !0,
        amount: '1.500',
        asset: t[0],
        ethAsset: t[0],
      }),
    }),
  c = { storybook: j({ margin: '20px', width: '348px' }) };
var d, m, p;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((d = s.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxOverview transactionId={bn(1234567876543456)} date={new Date()} isDeposit={true} amount="1.500" asset={assetList[0]} ethAsset={assetList[0]} />
    </Box.Flex>;
}`,
      ...((p = (m = s.parameters) == null ? void 0 : m.docs) == null
        ? void 0
        : p.source),
    },
  },
};
var u, x, l;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((u = r.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxOverview transactionId={bn(1234567876543456)} date={new Date()} asset={assetList[0]} amount="1.500" ethAsset={assetList[0]} />
    </Box.Flex>;
}`,
      ...((l = (x = r.parameters) == null ? void 0 : x.docs) == null
        ? void 0
        : l.source),
    },
  },
};
var g, y, w;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((g = a.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxOverview isLoading transactionId={bn(1234567876543456)} date={new Date()} isDeposit={true} amount="1.500" asset={assetList[0]} ethAsset={assetList[0]} />
    </Box.Flex>;
}`,
      ...((w = (y = a.parameters) == null ? void 0 : y.docs) == null
        ? void 0
        : w.source),
    },
  },
};
const E = ['Usage', 'Withdrawal', 'Loading'];
export {
  a as Loading,
  s as Usage,
  r as Withdrawal,
  E as __namedExportsOrder,
  S as default,
};
