import { j as s, C as r, R as E } from './index-0c70cacd.js';
import { a as e, s as o } from './AccountConnectionInput-7bc330b7.js';
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
const W = {
    component: e,
    title: 'AssetCard',
    parameters: { layout: 'fullscreen' },
  },
  a = () => s.jsx(r, { css: t.storybook, children: s.jsx(e, { asset: o[0] }) }),
  n = () => s.jsx(r, { css: t.storybook, children: s.jsx(e, { asset: o[0] }) }),
  c = () =>
    s.jsx(r, {
      css: t.storybook,
      children: s.jsx(e, {
        asset: o[0],
        onClick: () => {
          console.log('press');
        },
      }),
    }),
  d = () =>
    s.jsx(r, {
      css: t.storybook,
      children: s.jsx(e, {
        asset: o[0],
        onAdd: () => {
          console.log('add');
        },
      }),
    }),
  i = () =>
    s.jsx(r, {
      css: t.storybook,
      children: s.jsx(e, {
        asset: o[0],
        onRemove: () => {
          console.log('remove');
        },
      }),
    }),
  m = () =>
    s.jsx(r, {
      css: t.storybook,
      children: s.jsx(e, {
        asset: o[0],
        onFaucet: () => {
          console.log('faucet');
        },
      }),
    }),
  l = () =>
    s.jsx(r, {
      css: t.storybook,
      children: s.jsx(e, {
        isRemoveDisabled: !0,
        asset: o[0],
        onRemove: () => {
          console.log('remove');
        },
      }),
    }),
  t = { storybook: E({ margin: '20px', width: '386px' }) };
var p, u, C;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((p = a.parameters) == null ? void 0 : p.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetCard asset={assetList[0]} />
    </CardList>;
}`,
      ...((C = (u = a.parameters) == null ? void 0 : u.docs) == null
        ? void 0
        : C.source),
    },
  },
};
var y, g, L;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((y = n.parameters) == null ? void 0 : y.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetCard asset={assetList[0]} />
    </CardList>;
}`,
      ...((L = (g = n.parameters) == null ? void 0 : g.docs) == null
        ? void 0
        : L.source),
    },
  },
};
var x, b, k;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((x = c.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetCard asset={assetList[0]} onClick={() => {
      console.log('press');
    }} />
    </CardList>;
}`,
      ...((k = (b = c.parameters) == null ? void 0 : b.docs) == null
        ? void 0
        : k.source),
    },
  },
};
var j, v, A;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((j = d.parameters) == null ? void 0 : j.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetCard asset={assetList[0]} onAdd={() => {
      console.log('add');
    }} />
    </CardList>;
}`,
      ...((A = (v = d.parameters) == null ? void 0 : v.docs) == null
        ? void 0
        : A.source),
    },
  },
};
var R, O, h;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((R = i.parameters) == null ? void 0 : R.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetCard asset={assetList[0]} onRemove={() => {
      console.log('remove');
    }} />
    </CardList>;
}`,
      ...((h = (O = i.parameters) == null ? void 0 : O.docs) == null
        ? void 0
        : h.source),
    },
  },
};
var f, S, D;
m.parameters = {
  ...m.parameters,
  docs: {
    ...((f = m.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetCard asset={assetList[0]} onFaucet={() => {
      console.log('faucet');
    }} />
    </CardList>;
}`,
      ...((D = (S = m.parameters) == null ? void 0 : S.docs) == null
        ? void 0
        : D.source),
    },
  },
};
var F, U, _;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((F = l.parameters) == null ? void 0 : F.docs),
    source: {
      originalSource: `() => {
  return <CardList css={styles.storybook}>
      <AssetCard isRemoveDisabled asset={assetList[0]} onRemove={() => {
      console.log('remove');
    }} />
    </CardList>;
}`,
      ...((_ = (U = l.parameters) == null ? void 0 : U.docs) == null
        ? void 0
        : _.source),
    },
  },
};
const X = [
  'Usage',
  'AvatarUsage',
  'OnPress',
  'OnAdd',
  'OnRemove',
  'OnFaucet',
  'OnRemoveDisabled',
];
export {
  n as AvatarUsage,
  d as OnAdd,
  m as OnFaucet,
  c as OnPress,
  i as OnRemove,
  l as OnRemoveDisabled,
  a as Usage,
  X as __namedExportsOrder,
  W as default,
};
