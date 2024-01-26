var e = null;
typeof WebSocket < 'u'
  ? (e = WebSocket)
  : typeof MozWebSocket < 'u'
    ? (e = MozWebSocket)
    : typeof global < 'u'
      ? (e = global.WebSocket || global.MozWebSocket)
      : typeof window < 'u'
        ? (e = window.WebSocket || window.MozWebSocket)
        : typeof self < 'u' && (e = self.WebSocket || self.MozWebSocket);
const o = e;
export { o as default };
