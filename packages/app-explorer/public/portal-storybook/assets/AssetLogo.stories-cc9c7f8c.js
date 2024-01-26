import { j as s, C as n, R as y } from './index-0c70cacd.js';
import { b as a, s as o } from './AccountConnectionInput-7bc330b7.js';
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
const T = {
    component: a,
    title: 'AssetLogo',
    parameters: { layout: 'fullscreen' },
  },
  r = () => s.jsx(n, { css: i.storybook, children: s.jsx(a, { asset: o[0] }) }),
  t = () =>
    s.jsx(n, {
      css: i.storybook,
      children: s.jsx(a, { asset: o[0], size: 40 }),
    }),
  k = {
    ...o[0],
    icon: null,
    networks: [{ ...o[0].networks[0], address: '0x123123123123' }],
  },
  e = () => s.jsx(n, { css: i.storybook, children: s.jsx(a, { asset: k }) }),
  i = { storybook: y({ margin: '20px', width: '386px' }) };
var c, m, p;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((c = r.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetLogo asset={assetList[0]} />
    </CardList>;
}`,
      ...((p = (m = r.parameters) == null ? void 0 : m.docs) == null
        ? void 0
        : p.source),
    },
  },
};
var d, u, l;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((d = t.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetLogo asset={assetList[0]} size={40} />
    </CardList>;
}`,
      ...((l = (u = t.parameters) == null ? void 0 : u.docs) == null
        ? void 0
        : l.source),
    },
  },
};
var L, g, x;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((L = e.parameters) == null ? void 0 : L.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetLogo asset={generatedAsset} />
    </CardList>;
}`,
      ...((x = (g = e.parameters) == null ? void 0 : g.docs) == null
        ? void 0
        : x.source),
    },
  },
};
const O = ['ETH', 'Big', 'Generated'];
export {
  t as Big,
  r as ETH,
  e as Generated,
  O as __namedExportsOrder,
  T as default,
};
