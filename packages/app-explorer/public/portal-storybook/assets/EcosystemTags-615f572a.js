import { j as e, B as l, f as g, d as c, R as d } from './index-0c70cacd.js';
const u = () =>
    e.jsx(g, {
      height: 32,
      width: 80,
      viewBox: '0 0 80 32',
      children: e.jsx('rect', { height: 32, width: 80, rx: '4' }),
    }),
  o = ({ items: a = 8 }) =>
    e.jsx(l.Flex, {
      justify: 'flex-start',
      align: 'center',
      gap: '$3',
      wrap: 'wrap',
      children: Array.from({ length: a }).map((r, i) => e.jsx(u, {}, i)),
    });
try {
  (o.displayName = 'EcosystemTagsLoading'),
    (o.__docgenInfo = {
      description: '',
      displayName: 'EcosystemTagsLoading',
      props: {
        items: {
          defaultValue: { value: '8' },
          description: '',
          name: 'items',
          required: !1,
          type: { name: 'number' },
        },
      },
    });
} catch {}
const t = ({
    tags: a,
    onClickTag: r,
    activeTag: i,
    onClickAllCategories: p,
    isLoading: m,
  }) =>
    m
      ? e.jsx(o, {})
      : e.jsxs(l.Flex, {
          justify: 'flex-start',
          align: 'center',
          gap: '$2',
          wrap: 'wrap',
          children: [
            e.jsx(c, {
              variant: 'outlined',
              css: { ...s.tag, ...(!i && s.active) },
              size: 'sm',
              onClick: p,
              children: 'All categories',
            }),
            e.jsx(l, { css: s.divider }),
            (a || []).map((n) =>
              e.jsx(
                c,
                {
                  variant: 'outlined',
                  css: { ...s.tag, ...(i === n && s.active) },
                  size: 'sm',
                  onClick: () => (r == null ? void 0 : r(n)),
                  children: n,
                },
                n
              )
            ),
          ],
        }),
  s = {
    tag: d({ color: '$intentsBase12' }),
    active: d({ borderColor: '$intentsPrimary10', color: '$intentsBase12' }),
    divider: d({
      width: '1px',
      height: '$3',
      backgroundColor: '$intentsBase6',
    }),
  };
t.Loading = o;
try {
  (t.displayName = 'EcosystemTags'),
    (t.__docgenInfo = {
      description: '',
      displayName: 'EcosystemTags',
      props: {
        tags: {
          defaultValue: null,
          description: '',
          name: 'tags',
          required: !1,
          type: { name: 'string[]' },
        },
        onClickTag: {
          defaultValue: null,
          description: '',
          name: 'onClickTag',
          required: !1,
          type: { name: '((tag: string) => void)' },
        },
        activeTag: {
          defaultValue: null,
          description: '',
          name: 'activeTag',
          required: !1,
          type: { name: 'string' },
        },
        onClickAllCategories: {
          defaultValue: null,
          description: '',
          name: 'onClickAllCategories',
          required: !1,
          type: { name: '(() => void)' },
        },
        isLoading: {
          defaultValue: null,
          description: '',
          name: 'isLoading',
          required: !1,
          type: { name: 'boolean' },
        },
      },
    });
} catch {}
try {
  (t.Loading.displayName = 'EcosystemTags.Loading'),
    (t.Loading.__docgenInfo = {
      description: '',
      displayName: 'EcosystemTags.Loading',
      props: {
        items: {
          defaultValue: { value: '8' },
          description: '',
          name: 'items',
          required: !1,
          type: { name: 'number' },
        },
      },
    });
} catch {}
export { t as E };
