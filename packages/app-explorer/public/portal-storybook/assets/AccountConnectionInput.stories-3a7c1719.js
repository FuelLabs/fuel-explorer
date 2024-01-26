import { j as e, B as c, F as a, R as F } from './index-0c70cacd.js';
import { A as n } from './AccountConnectionInput-7bc330b7.js';
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
const _ = {
    component: n,
    title: 'AccountConnectionInput',
    parameters: { layout: 'fullscreen' },
  },
  o = () =>
    e.jsx(c.Flex, {
      align: 'center',
      justify: 'center',
      css: l.storybook,
      children: e.jsx(n, {
        networkName: 'Fuel',
        networkImage: e.jsx(a, { size: 18 }),
        label: 'To',
        isConnecting: !1,
        onConnect: () => {},
      }),
    }),
  t = () =>
    e.jsx(c.Flex, {
      align: 'center',
      justify: 'center',
      css: l.storybook,
      children: e.jsx(n, {
        networkName: 'Fuel',
        networkImage: e.jsx(a, { size: 18 }),
        label: 'To',
        isConnecting: !0,
        onConnect: () => {},
      }),
    }),
  s = () =>
    e.jsx(c.Flex, {
      align: 'center',
      justify: 'center',
      css: l.storybook,
      children: e.jsx(n, {
        networkName: 'Fuel',
        networkImage: e.jsx(a, { size: 18 }),
        label: 'To',
        isConnecting: !1,
        account: {
          address:
            'fuel14kz7u7jpd8txfe2vtgh5hxjx4wk7s03kq8hcl2k7slwe3yqh5sas974464',
        },
        onConnect: () => {},
      }),
    }),
  r = () =>
    e.jsx(c.Flex, {
      align: 'center',
      justify: 'center',
      css: l.storybook,
      children: e.jsx(n, {
        networkName: 'Fuel',
        networkImage: e.jsx(a, { size: 18 }),
        label: 'To',
        isConnecting: !1,
        account: {
          address:
            'fuel14kz7u7jpd8txfe2vtgh5hxjx4wk7s03kq8hcl2k7slwe3yqh5sas974464',
          alias: 'luizasfight.eth',
        },
        onConnect: () => {},
      }),
    }),
  l = { storybook: F({ margin: '20px' }) };
var i, u, m;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((i = o.parameters) == null ? void 0 : i.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <AccountConnectionInput networkName="Fuel" networkImage={<FuelLogo size={18} />} label="To" isConnecting={false} onConnect={() => {}} />
    </Box.Flex>;
}`,
      ...((m = (u = o.parameters) == null ? void 0 : u.docs) == null
        ? void 0
        : m.source),
    },
  },
};
var x, p, g;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((x = t.parameters) == null ? void 0 : x.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <AccountConnectionInput networkName="Fuel" networkImage={<FuelLogo size={18} />} label="To" isConnecting={true} onConnect={() => {}} />
    </Box.Flex>;
}`,
      ...((g = (p = t.parameters) == null ? void 0 : p.docs) == null
        ? void 0
        : g.source),
    },
  },
};
var k, d, j;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((k = s.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <AccountConnectionInput networkName="Fuel" networkImage={<FuelLogo size={18} />} label="To" isConnecting={false} account={{
      address: 'fuel14kz7u7jpd8txfe2vtgh5hxjx4wk7s03kq8hcl2k7slwe3yqh5sas974464'
    }} onConnect={() => {}} />
    </Box.Flex>;
}`,
      ...((j = (d = s.parameters) == null ? void 0 : d.docs) == null
        ? void 0
        : j.source),
    },
  },
};
var f, y, C;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((f = r.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <AccountConnectionInput networkName="Fuel" networkImage={<FuelLogo size={18} />} label="To" isConnecting={false} account={{
      address: 'fuel14kz7u7jpd8txfe2vtgh5hxjx4wk7s03kq8hcl2k7slwe3yqh5sas974464',
      alias: 'luizasfight.eth'
    }} onConnect={() => {}} />
    </Box.Flex>;
}`,
      ...((C = (y = r.parameters) == null ? void 0 : y.docs) == null
        ? void 0
        : C.source),
    },
  },
};
const U = ['Usage', 'Loading', 'ConnectedAccount', 'ConnectedENSAccount'];
export {
  s as ConnectedAccount,
  r as ConnectedENSAccount,
  t as Loading,
  o as Usage,
  U as __namedExportsOrder,
  _ as default,
};
