import { j as s, B as x, R as m } from './index-0c70cacd.js';
import { B as o } from './BridgeTxListNotConnected-80d83e43.js';
import './index-76fb7be0.js';
import './_commonjsHelpers-de833af9.js';
import './extends-98964cd2.js';
import './index-d3ea75b5.js';
const f = {
    component: o,
    title: 'BridgeTxListNotConnected',
    parameters: { layout: 'fullscreen' },
  },
  e = () =>
    s.jsx(x.Flex, {
      align: 'center',
      justify: 'center',
      css: d.storybook,
      children: s.jsx(o, { isConnecting: !1, onClick: () => {} }),
    }),
  t = () =>
    s.jsx(x.Flex, {
      align: 'center',
      justify: 'center',
      css: d.storybook,
      children: s.jsx(o, { isConnecting: !0, onClick: () => {} }),
    }),
  d = { storybook: m({ margin: '20px', width: '100%' }) };
var r, n, i;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((r = e.parameters) == null ? void 0 : r.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxListNotConnected isConnecting={false} onClick={() => {}} />
    </Box.Flex>;
}`,
      ...((i = (n = e.parameters) == null ? void 0 : n.docs) == null
        ? void 0
        : i.source),
    },
  },
};
var c, a, l;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((c = t.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeTxListNotConnected isConnecting={true} onClick={() => {}} />
    </Box.Flex>;
}`,
      ...((l = (a = t.parameters) == null ? void 0 : a.docs) == null
        ? void 0
        : l.source),
    },
  },
};
const j = ['Usage', 'IsConnecting'];
export {
  t as IsConnecting,
  e as Usage,
  j as __namedExportsOrder,
  f as default,
};
