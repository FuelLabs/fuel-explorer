import { j as e, c as i, B as t, T as o, d, R as s } from './index-0c70cacd.js';
const r = ({ isConnecting: n, onClick: a }) =>
    e.jsx(i, {
      variant: 'outlined',
      children: e.jsx(i.Body, {
        css: c.cardBody,
        children: e.jsxs(t.Stack, {
          justify: 'center',
          align: 'center',
          gap: '$6',
          children: [
            e.jsxs(t.Stack, {
              justify: 'center',
              align: 'center',
              gap: '$1',
              children: [
                e.jsx(o, {
                  fontSize: 'lg',
                  color: 'intentsBase12',
                  children: 'Wallet not detected',
                }),
                e.jsx(o, {
                  color: 'intentsBase10',
                  fontSize: 'sm',
                  children: 'Connect a wallet to see your transactions',
                }),
              ],
            }),
            e.jsx(t.Flex, {
              justify: 'center',
              children: e.jsx(d, {
                isLoading: n,
                intent: 'primary',
                css: c.connectButton,
                onClick: a,
                children: 'Connect Fuel Wallet',
              }),
            }),
          ],
        }),
      }),
    }),
  c = { connectButton: s({ width: 180 }), cardBody: s({ py: '$8' }) };
try {
  (r.displayName = 'BridgeTxListNotConnected'),
    (r.__docgenInfo = {
      description: '',
      displayName: 'BridgeTxListNotConnected',
      props: {
        isConnecting: {
          defaultValue: null,
          description: '',
          name: 'isConnecting',
          required: !0,
          type: { name: 'boolean' },
        },
        onClick: {
          defaultValue: null,
          description: '',
          name: 'onClick',
          required: !0,
          type: { name: '() => void' },
        },
      },
    });
} catch {}
export { r as B };
