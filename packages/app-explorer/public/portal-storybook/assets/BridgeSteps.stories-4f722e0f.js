import { j as s, T as t, B as m, R as l } from './index-0c70cacd.js';
import { B as o } from './BridgeSteps-30389492.js';
import './index-76fb7be0.js';
import './_commonjsHelpers-de833af9.js';
import './extends-98964cd2.js';
import './index-d3ea75b5.js';
const D = {
    component: o,
    title: 'BridgeSteps',
    parameters: { layout: 'fullscreen' },
  },
  n = () => {
    const i = [
      {
        name: 'Submit to bridge',
        status: s.jsx(t, { css: e.statusText, children: 'Action' }),
        isLoading: !1,
        isDone: !1,
        isSelected: !0,
      },
      {
        name: 'Settlement',
        status: s.jsx(t, { css: e.statusText, children: 'Wait ~15 min' }),
        isLoading: !1,
        isDone: !1,
        isSelected: !1,
      },
      {
        name: 'Confirm transaction',
        status: s.jsx(t, { css: e.statusText, children: 'Action' }),
        isLoading: !1,
        isDone: !1,
        isSelected: !1,
      },
      {
        name: 'Receive funds',
        status: s.jsx(t, { css: e.statusText, children: 'Automatic' }),
        isLoading: !1,
        isDone: !1,
        isSelected: !1,
      },
    ];
    return s.jsx(m.Flex, {
      align: 'center',
      justify: 'center',
      css: e.storybook,
      children: s.jsx(o, { steps: i }),
    });
  },
  a = () => {
    const i = [
      {
        name: 'Submit to bridge',
        status: s.jsx(t, { css: e.statusText, children: 'Done!' }),
        isLoading: !1,
        isDone: !0,
        isSelected: !1,
      },
      {
        name: 'Settlement',
        status: s.jsx(t, {
          leftIcon: 'SpinnerGap',
          iconSize: 10,
          css: { gap: '$1', ...e.statusText },
          children: '~5 minutes left',
        }),
        isLoading: !0,
        isDone: !1,
        isSelected: !0,
      },
      {
        name: 'Confirm transaction',
        status: s.jsx(t, { css: e.statusText, children: 'Action' }),
        isLoading: !1,
        isDone: !1,
        isSelected: !1,
      },
      {
        name: 'Receive funds',
        status: s.jsx(t, { css: e.statusText, children: 'Automatic' }),
        isLoading: !1,
        isDone: !1,
        isSelected: !1,
      },
    ];
    return s.jsx(m.Flex, {
      align: 'center',
      justify: 'center',
      css: e.storybook,
      children: s.jsx(o, { steps: i }),
    });
  },
  e = {
    storybook: l({ margin: '20px' }),
    statusText: l({ color: '$intentsBase8', fontSize: '$xs' }),
  };
var r, c, u;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((r = n.parameters) == null ? void 0 : r.docs),
    source: {
      originalSource: `() => {
  const steps = [{
    name: 'Submit to bridge',
    status: <Text css={styles.statusText}>Action</Text>,
    isLoading: false,
    isDone: false,
    isSelected: true
  }, {
    name: 'Settlement',
    status: <Text css={styles.statusText}>Wait ~15 min</Text>,
    isLoading: false,
    isDone: false,
    isSelected: false
  }, {
    name: 'Confirm transaction',
    status: <Text css={styles.statusText}>Action</Text>,
    isLoading: false,
    isDone: false,
    isSelected: false
  }, {
    name: 'Receive funds',
    status: <Text css={styles.statusText}>Automatic</Text>,
    isLoading: false,
    isDone: false,
    isSelected: false
  }];
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeSteps steps={steps} />
    </Box.Flex>;
}`,
      ...((u = (c = n.parameters) == null ? void 0 : c.docs) == null
        ? void 0
        : u.source),
    },
  },
};
var d, x, f;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((d = a.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `() => {
  const steps = [{
    name: 'Submit to bridge',
    status: <Text css={styles.statusText}>Done!</Text>,
    isLoading: false,
    isDone: true,
    isSelected: false
  }, {
    name: 'Settlement',
    status: <Text leftIcon="SpinnerGap" iconSize={10} css={{
      gap: '$1',
      ...styles.statusText
    }}>
          ~5 minutes left
        </Text>,
    isLoading: true,
    isDone: false,
    isSelected: true
  }, {
    name: 'Confirm transaction',
    status: <Text css={styles.statusText}>Action</Text>,
    isLoading: false,
    isDone: false,
    isSelected: false
  }, {
    name: 'Receive funds',
    status: <Text css={styles.statusText}>Automatic</Text>,
    isLoading: false,
    isDone: false,
    isSelected: false
  }];
  return <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeSteps steps={steps} />
    </Box.Flex>;
}`,
      ...((f = (x = a.parameters) == null ? void 0 : x.docs) == null
        ? void 0
        : f.source),
    },
  },
};
const L = ['Usage', 'Mixed'];
export { a as Mixed, n as Usage, L as __namedExportsOrder, D as default };
