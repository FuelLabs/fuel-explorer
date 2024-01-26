import { j as s, B as p, R as d } from './index-0c70cacd.js';
import { e as o, d as g } from './AccountConnectionInput-7bc330b7.js';
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
const C = {
    component: o,
    title: 'Ecosystem / ProjectList',
    parameters: { layout: 'fullscreen' },
  },
  r = {
    render: (x) =>
      s.jsx(p.Flex, {
        align: 'center',
        justify: 'center',
        css: l.storybook,
        children: s.jsx(o, { ...x }),
      }),
    args: { projects: g },
  },
  e = () =>
    s.jsx(p.Flex, {
      align: 'center',
      justify: 'center',
      css: l.storybook,
      children: s.jsx(o.Loading, {}),
    }),
  l = { storybook: d({ margin: '20px' }) };
var t, a, n;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((t = r.parameters) == null ? void 0 : t.docs),
    source: {
      originalSource: `{
  render: args => <Box.Flex align="center" justify="center" css={styles.storybook}>
      <ProjectList {...args} />
    </Box.Flex>,
  args: {
    projects: (PROJECTS as Project[])
  }
}`,
      ...((n = (a = r.parameters) == null ? void 0 : a.docs) == null
        ? void 0
        : n.source),
    },
  },
};
var c, i, m;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((c = e.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `() => <Box.Flex align="center" justify="center" css={styles.storybook}>
    <ProjectList.Loading />
  </Box.Flex>`,
      ...((m = (i = e.parameters) == null ? void 0 : i.docs) == null
        ? void 0
        : m.source),
    },
  },
};
const J = ['Usage', 'Loading'];
export { e as Loading, r as Usage, J as __namedExportsOrder, C as default };
