import { j as o, B as p, R as d } from './index-0c70cacd.js';
import { P as t, d as j } from './AccountConnectionInput-7bc330b7.js';
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
    component: t,
    title: 'Ecosystem / ProjectItem',
    parameters: { layout: 'fullscreen' },
  },
  e = {
    render: (x) =>
      o.jsx(p.Flex, {
        align: 'center',
        justify: 'center',
        css: l.storybook,
        children: o.jsx(t, { ...x }),
      }),
    args: j[0],
  },
  l = {
    storybook: d({ margin: '20px', width: 465, '.fuel_Card': { flex: 1 } }),
  },
  r = () =>
    o.jsx(p.Flex, {
      align: 'center',
      justify: 'center',
      css: l.storybook,
      children: o.jsx(t.Loader, {}),
    });
var s, a, c;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((s = e.parameters) == null ? void 0 : s.docs),
    source: {
      originalSource: `{
  render: args => <Box.Flex align="center" justify="center" css={styles.storybook}>
      <ProjectItem {...args} />
    </Box.Flex>,
  args: (PROJECTS[0] as Project)
}`,
      ...((c = (a = e.parameters) == null ? void 0 : a.docs) == null
        ? void 0
        : c.source),
    },
  },
};
var m, n, i;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((m = r.parameters) == null ? void 0 : m.docs),
    source: {
      originalSource: `() => <Box.Flex align="center" justify="center" css={styles.storybook}>
    <ProjectItem.Loader />
  </Box.Flex>`,
      ...((i = (n = r.parameters) == null ? void 0 : n.docs) == null
        ? void 0
        : i.source),
    },
  },
};
const O = ['Usage', 'Loader'];
export { r as Loader, e as Usage, O as __namedExportsOrder, C as default };
