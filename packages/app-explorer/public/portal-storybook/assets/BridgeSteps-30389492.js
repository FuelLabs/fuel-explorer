import {
  j as i,
  B as s,
  a as m,
  T as o,
  S as x,
  R as n,
} from './index-0c70cacd.js';
const d = ({ steps: t }) =>
    i.jsx(s.Stack, {
      css: r.stack,
      children:
        t == null
          ? void 0
          : t.map((e, a) => {
              var c, l;
              return i.jsxs(
                s.Flex,
                {
                  css: r.item,
                  children: [
                    i.jsxs(s.Flex, {
                      css: r.action,
                      children: [
                        i.jsx(s, {
                          className: e.isDone ? 'circleDone' : void 0,
                          css: {
                            ...r.circle,
                            borderColor: e.isSelected
                              ? '$intentsPrimary9'
                              : void 0,
                          },
                          children: e.isDone
                            ? i.jsx(m, { icon: 'Check', size: 12, css: r.icon })
                            : i.jsx(o, {
                                color: e.isSelected ? 'intentsBase12' : void 0,
                                css: r.number,
                                fontSize: 'xs',
                                children: a + 1,
                              }),
                        }),
                        i.jsx(o, {
                          fontSize: 'sm',
                          color: 'intentsBase12',
                          css: r.name,
                          children: e.name,
                        }),
                      ],
                    }),
                    i.jsxs(s.Flex, {
                      align: 'center',
                      gap: '$1',
                      children: [
                        e.isLoading && i.jsx(x, { size: 14 }),
                        i.jsx(o, {
                          fontSize: 'sm',
                          'aria-label': `Step ${(c = e.name) == null ? void 0 : c.toString()}: ${e.status}`,
                          children: e.status,
                        }),
                      ],
                    }),
                  ],
                },
                `${a}_${(l = e.name) == null ? void 0 : l.toString()}`
              );
            }),
    }),
  r = {
    stack: n({
      gap: '$0',
      minWidth: '344px',
      borderRadius: '$md',
      border: '1px solid $border',
      backgroundColor: '$inputBaseBg',
    }),
    item: n({
      alignItems: 'center',
      justifyContent: 'space-between',
      px: '$3',
      py: '$2',
      '& ~ &': { borderTop: '1px solid $border' },
      '.circleDone': {
        backgroundColor: '$intentsPrimary9',
        border: '1px solid $intentsPrimary9',
      },
    }),
    action: n({ gap: '$2', alignItems: 'center' }),
    name: n({ lineHeight: '1.5rem' }),
    icon: n({ color: '$blackA12' }),
    number: n({ display: 'flex', justifyContent: 'center', fontSize: '10px' }),
    circle: n({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '$4',
      height: '$4',
      border: '1px solid $intentsBase5',
      borderRadius: '$full',
    }),
  };
try {
  (d.displayName = 'BridgeSteps'),
    (d.__docgenInfo = {
      description: '',
      displayName: 'BridgeSteps',
      props: {
        steps: {
          defaultValue: null,
          description: '',
          name: 'steps',
          required: !1,
          type: { name: 'Step[]' },
        },
      },
    });
} catch {}
export { d as B };
