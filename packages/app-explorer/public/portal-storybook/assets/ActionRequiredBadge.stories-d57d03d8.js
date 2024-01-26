import { j as r, B as n, R as i } from './index-0c70cacd.js';
import { A as a } from './ActionRequiredBadge-4c3ae44d.js';
import './index-76fb7be0.js';
import './_commonjsHelpers-de833af9.js';
import './extends-98964cd2.js';
import './index-d3ea75b5.js';
const g = {
    component: a,
    title: 'ActionRequiredBadge',
    parameters: { layout: 'fullscreen' },
  },
  e = () =>
    r.jsx(n.Flex, {
      align: 'center',
      justify: 'center',
      css: c.storybook,
      children: r.jsx(a, {}),
    }),
  c = { storybook: i({ margin: '20px' }) };
var t, o, s;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((t = e.parameters) == null ? void 0 : t.docs),
    source: {
      originalSource: `() => {
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <ActionRequiredBadge />
    </Box.Flex>;
}`,
      ...((s = (o = e.parameters) == null ? void 0 : o.docs) == null
        ? void 0
        : s.source),
    },
  },
};
const y = ['Usage'];
export { e as Usage, y as __namedExportsOrder, g as default };
