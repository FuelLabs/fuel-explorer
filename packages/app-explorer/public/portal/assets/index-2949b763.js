import {
  e as Ea,
  b as xi,
  i as st,
  c as O,
  r as Ca,
  a as Ii,
  g as cr,
  s as ud,
  t as ld,
  _ as I,
  d as fd,
} from './index-4d435dca.js';
import { p as hd, h as dd } from './hooks.module-fd12dd03.js';
function pd(t, e) {
  for (var r = 0; r < e.length; r++) {
    const n = e[r];
    if (typeof n != 'string' && !Array.isArray(n)) {
      for (const i in n)
        if (i !== 'default' && !(i in t)) {
          const s = Object.getOwnPropertyDescriptor(n, i);
          s &&
            Object.defineProperty(
              t,
              i,
              s.get ? s : { enumerable: !0, get: () => n[i] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' })
  );
}
var xa = {},
  wn = {},
  ki = {};
Object.defineProperty(ki, '__esModule', { value: !0 });
ki.walletLogo = void 0;
const bd = (t, e) => {
  let r;
  switch (t) {
    case 'standard':
      return (
        (r = e),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `
      );
    case 'circle':
      return (
        (r = e),
        `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${r}' viewBox='0 0 999.81 999.81'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052fe;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%230152fe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M655-115.9h56c.83,1.59,2.36.88,3.56,1a478,478,0,0,1,75.06,10.42C891.4-81.76,978.33-32.58,1049.19,44q116.7,126,131.94,297.61c.38,4.14-.34,8.53,1.78,12.45v59c-1.58.84-.91,2.35-1,3.56a482.05,482.05,0,0,1-10.38,74.05c-24,106.72-76.64,196.76-158.83,268.93s-178.18,112.82-287.2,122.6c-4.83.43-9.86-.25-14.51,1.77H654c-1-1.68-2.69-.91-4.06-1a496.89,496.89,0,0,1-105.9-18.59c-93.54-27.42-172.78-77.59-236.91-150.94Q199.34,590.1,184.87,426.58c-.47-5.19.25-10.56-1.77-15.59V355c1.68-1,.91-2.7,1-4.06a498.12,498.12,0,0,1,18.58-105.9c26-88.75,72.64-164.9,140.6-227.57q126-116.27,297.21-131.61C645.32-114.57,650.35-113.88,655-115.9Zm377.92,500c0-192.44-156.31-349.49-347.56-350.15-194.13-.68-350.94,155.13-352.29,347.42-1.37,194.55,155.51,352.1,348.56,352.47C876.15,734.23,1032.93,577.84,1032.93,384.11Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-2' d='M1032.93,384.11c0,193.73-156.78,350.12-351.29,349.74-193-.37-349.93-157.92-348.56-352.47C334.43,189.09,491.24,33.28,685.37,34,876.62,34.62,1032.94,191.67,1032.93,384.11ZM683,496.81q43.74,0,87.48,0c15.55,0,25.32-9.72,25.33-25.21q0-87.48,0-175c0-15.83-9.68-25.46-25.59-25.46H595.77c-15.88,0-25.57,9.64-25.58,25.46q0,87.23,0,174.45c0,16.18,9.59,25.7,25.84,25.71Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-3' d='M683,496.81H596c-16.25,0-25.84-9.53-25.84-25.71q0-87.23,0-174.45c0-15.82,9.7-25.46,25.58-25.46H770.22c15.91,0,25.59,9.63,25.59,25.46q0,87.47,0,175c0,15.49-9.78,25.2-25.33,25.21Q726.74,496.84,683,496.81Z' transform='translate(-183.1 115.9)'/%3E%3C/svg%3E`
      );
    case 'text':
      return (
        (r = (0.1 * e).toFixed(2)),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`
      );
    case 'textWithLogo':
      return (
        (r = (0.25 * e).toFixed(2)),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`
      );
    case 'textLight':
      return (
        (r = (0.1 * e).toFixed(2)),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`
      );
    case 'textWithLogoLight':
      return (
        (r = (0.25 * e).toFixed(2)),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`
      );
    default:
      return (
        (r = e),
        `data:image/svg+xml,%3Csvg width='${e}' height='${r}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `
      );
  }
};
ki.walletLogo = bd;
var Mi = {};
Object.defineProperty(Mi, '__esModule', { value: !0 });
Mi.LINK_API_URL = void 0;
Mi.LINK_API_URL = 'https://www.walletlink.org';
var Ri = {};
Object.defineProperty(Ri, '__esModule', { value: !0 });
Ri.ScopedLocalStorage = void 0;
class gd {
  constructor(e) {
    this.scope = e;
  }
  setItem(e, r) {
    localStorage.setItem(this.scopedKey(e), r);
  }
  getItem(e) {
    return localStorage.getItem(this.scopedKey(e));
  }
  removeItem(e) {
    localStorage.removeItem(this.scopedKey(e));
  }
  clear() {
    const e = this.scopedKey(''),
      r = [];
    for (let n = 0; n < localStorage.length; n++) {
      const i = localStorage.key(n);
      typeof i == 'string' && i.startsWith(e) && r.push(i);
    }
    r.forEach((n) => localStorage.removeItem(n));
  }
  scopedKey(e) {
    return `${this.scope}:${e}`;
  }
}
Ri.ScopedLocalStorage = gd;
var Lr = {},
  ur = {};
Object.defineProperty(ur, '__esModule', { value: !0 });
const yd = Ea;
function xc(t, e, r) {
  try {
    Reflect.apply(t, e, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    });
  }
}
function vd(t) {
  const e = t.length,
    r = new Array(e);
  for (let n = 0; n < e; n += 1) r[n] = t[n];
  return r;
}
let md = class extends yd.EventEmitter {
  emit(e, ...r) {
    let n = e === 'error';
    const i = this._events;
    if (i !== void 0) n = n && i.error === void 0;
    else if (!n) return !1;
    if (n) {
      let o;
      if ((r.length > 0 && ([o] = r), o instanceof Error)) throw o;
      const a = new Error(`Unhandled error.${o ? ` (${o.message})` : ''}`);
      throw ((a.context = o), a);
    }
    const s = i[e];
    if (s === void 0) return !1;
    if (typeof s == 'function') xc(s, this, r);
    else {
      const o = s.length,
        a = vd(s);
      for (let c = 0; c < o; c += 1) xc(a[c], this, r);
    }
    return !0;
  }
};
ur.default = md;
var Gr = {};
Object.defineProperty(Gr, '__esModule', { value: !0 });
Gr.EVENTS = void 0;
Gr.EVENTS = {
  STARTED_CONNECTING: 'walletlink_sdk.started.connecting',
  CONNECTED_STATE_CHANGE: 'walletlink_sdk.connected',
  DISCONNECTED: 'walletlink_sdk.disconnected',
  METADATA_DESTROYED: 'walletlink_sdk_metadata_destroyed',
  LINKED: 'walletlink_sdk.linked',
  FAILURE: 'walletlink_sdk.generic_failure',
  SESSION_CONFIG_RECEIVED: 'walletlink_sdk.session_config_event_received',
  ETH_ACCOUNTS_STATE: 'walletlink_sdk.eth_accounts_state',
  SESSION_STATE_CHANGE: 'walletlink_sdk.session_state_change',
  UNLINKED_ERROR_STATE: 'walletlink_sdk.unlinked_error_state',
  SKIPPED_CLEARING_SESSION: 'walletlink_sdk.skipped_clearing_session',
  GENERAL_ERROR: 'walletlink_sdk.general_error',
  WEB3_REQUEST: 'walletlink_sdk.web3.request',
  WEB3_REQUEST_PUBLISHED: 'walletlink_sdk.web3.request_published',
  WEB3_RESPONSE: 'walletlink_sdk.web3.response',
  UNKNOWN_ADDRESS_ENCOUNTERED: 'walletlink_sdk.unknown_address_encountered',
};
var kn = {},
  Ia = {},
  $t = {},
  wd = _n;
_n.default = _n;
_n.stable = ml;
_n.stableStringify = ml;
var di = '[...]',
  yl = '[Circular]',
  ir = [],
  er = [];
function vl() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER,
  };
}
function _n(t, e, r, n) {
  typeof n > 'u' && (n = vl()), ea(t, '', 0, [], void 0, 0, n);
  var i;
  try {
    er.length === 0
      ? (i = JSON.stringify(t, e, r))
      : (i = JSON.stringify(t, wl(e), r));
  } catch {
    return JSON.stringify(
      '[unable to serialize, circular reference is too complex to analyze]'
    );
  } finally {
    for (; ir.length !== 0; ) {
      var s = ir.pop();
      s.length === 4
        ? Object.defineProperty(s[0], s[1], s[3])
        : (s[0][s[1]] = s[2]);
    }
  }
  return i;
}
function Rr(t, e, r, n) {
  var i = Object.getOwnPropertyDescriptor(n, r);
  i.get !== void 0
    ? i.configurable
      ? (Object.defineProperty(n, r, { value: t }), ir.push([n, r, e, i]))
      : er.push([e, r, t])
    : ((n[r] = t), ir.push([n, r, e]));
}
function ea(t, e, r, n, i, s, o) {
  s += 1;
  var a;
  if (typeof t == 'object' && t !== null) {
    for (a = 0; a < n.length; a++)
      if (n[a] === t) {
        Rr(yl, t, e, i);
        return;
      }
    if (typeof o.depthLimit < 'u' && s > o.depthLimit) {
      Rr(di, t, e, i);
      return;
    }
    if (typeof o.edgesLimit < 'u' && r + 1 > o.edgesLimit) {
      Rr(di, t, e, i);
      return;
    }
    if ((n.push(t), Array.isArray(t)))
      for (a = 0; a < t.length; a++) ea(t[a], a, a, n, t, s, o);
    else {
      var c = Object.keys(t);
      for (a = 0; a < c.length; a++) {
        var u = c[a];
        ea(t[u], u, a, n, t, s, o);
      }
    }
    n.pop();
  }
}
function _d(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function ml(t, e, r, n) {
  typeof n > 'u' && (n = vl());
  var i = ta(t, '', 0, [], void 0, 0, n) || t,
    s;
  try {
    er.length === 0
      ? (s = JSON.stringify(i, e, r))
      : (s = JSON.stringify(i, wl(e), r));
  } catch {
    return JSON.stringify(
      '[unable to serialize, circular reference is too complex to analyze]'
    );
  } finally {
    for (; ir.length !== 0; ) {
      var o = ir.pop();
      o.length === 4
        ? Object.defineProperty(o[0], o[1], o[3])
        : (o[0][o[1]] = o[2]);
    }
  }
  return s;
}
function ta(t, e, r, n, i, s, o) {
  s += 1;
  var a;
  if (typeof t == 'object' && t !== null) {
    for (a = 0; a < n.length; a++)
      if (n[a] === t) {
        Rr(yl, t, e, i);
        return;
      }
    try {
      if (typeof t.toJSON == 'function') return;
    } catch {
      return;
    }
    if (typeof o.depthLimit < 'u' && s > o.depthLimit) {
      Rr(di, t, e, i);
      return;
    }
    if (typeof o.edgesLimit < 'u' && r + 1 > o.edgesLimit) {
      Rr(di, t, e, i);
      return;
    }
    if ((n.push(t), Array.isArray(t)))
      for (a = 0; a < t.length; a++) ta(t[a], a, a, n, t, s, o);
    else {
      var c = {},
        u = Object.keys(t).sort(_d);
      for (a = 0; a < u.length; a++) {
        var l = u[a];
        ta(t[l], l, a, n, t, s, o), (c[l] = t[l]);
      }
      if (typeof i < 'u') ir.push([i, e, t]), (i[e] = c);
      else return c;
    }
    n.pop();
  }
}
function wl(t) {
  return (
    (t =
      typeof t < 'u'
        ? t
        : function (e, r) {
            return r;
          }),
    function (e, r) {
      if (er.length > 0)
        for (var n = 0; n < er.length; n++) {
          var i = er[n];
          if (i[1] === e && i[0] === r) {
            (r = i[2]), er.splice(n, 1);
            break;
          }
        }
      return t.call(this, e, r);
    }
  );
}
Object.defineProperty($t, '__esModule', { value: !0 });
$t.EthereumProviderError = $t.EthereumRpcError = void 0;
const Sd = wd;
class _l extends Error {
  constructor(e, r, n) {
    if (!Number.isInteger(e)) throw new Error('"code" must be an integer.');
    if (!r || typeof r != 'string')
      throw new Error('"message" must be a nonempty string.');
    super(r), (this.code = e), n !== void 0 && (this.data = n);
  }
  serialize() {
    const e = { code: this.code, message: this.message };
    return (
      this.data !== void 0 && (e.data = this.data),
      this.stack && (e.stack = this.stack),
      e
    );
  }
  toString() {
    return Sd.default(this.serialize(), xd, 2);
  }
}
$t.EthereumRpcError = _l;
class Ed extends _l {
  constructor(e, r, n) {
    if (!Cd(e))
      throw new Error(
        '"code" must be an integer such that: 1000 <= code <= 4999'
      );
    super(e, r, n);
  }
}
$t.EthereumProviderError = Ed;
function Cd(t) {
  return Number.isInteger(t) && t >= 1e3 && t <= 4999;
}
function xd(t, e) {
  if (e !== '[Circular]') return e;
}
var ka = {},
  Wt = {};
Object.defineProperty(Wt, '__esModule', { value: !0 });
Wt.errorValues = Wt.errorCodes = void 0;
Wt.errorCodes = {
  rpc: {
    invalidInput: -32e3,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603,
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901,
  },
};
Wt.errorValues = {
  '-32700': {
    standard: 'JSON RPC 2.0',
    message:
      'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.',
  },
  '-32600': {
    standard: 'JSON RPC 2.0',
    message: 'The JSON sent is not a valid Request object.',
  },
  '-32601': {
    standard: 'JSON RPC 2.0',
    message: 'The method does not exist / is not available.',
  },
  '-32602': {
    standard: 'JSON RPC 2.0',
    message: 'Invalid method parameter(s).',
  },
  '-32603': { standard: 'JSON RPC 2.0', message: 'Internal JSON-RPC error.' },
  '-32000': { standard: 'EIP-1474', message: 'Invalid input.' },
  '-32001': { standard: 'EIP-1474', message: 'Resource not found.' },
  '-32002': { standard: 'EIP-1474', message: 'Resource unavailable.' },
  '-32003': { standard: 'EIP-1474', message: 'Transaction rejected.' },
  '-32004': { standard: 'EIP-1474', message: 'Method not supported.' },
  '-32005': { standard: 'EIP-1474', message: 'Request limit exceeded.' },
  4001: { standard: 'EIP-1193', message: 'User rejected the request.' },
  4100: {
    standard: 'EIP-1193',
    message:
      'The requested account and/or method has not been authorized by the user.',
  },
  4200: {
    standard: 'EIP-1193',
    message: 'The requested method is not supported by this Ethereum provider.',
  },
  4900: {
    standard: 'EIP-1193',
    message: 'The provider is disconnected from all chains.',
  },
  4901: {
    standard: 'EIP-1193',
    message: 'The provider is disconnected from the specified chain.',
  },
};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.serializeError =
      t.isValidCode =
      t.getMessageFromCode =
      t.JSON_RPC_SERVER_ERROR_MESSAGE =
        void 0);
  const e = Wt,
    r = $t,
    n = e.errorCodes.rpc.internal,
    i = 'Unspecified error message. This is a bug, please report it.',
    s = { code: n, message: o(n) };
  t.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';
  function o(h, y = i) {
    if (Number.isInteger(h)) {
      const _ = h.toString();
      if (f(e.errorValues, _)) return e.errorValues[_].message;
      if (u(h)) return t.JSON_RPC_SERVER_ERROR_MESSAGE;
    }
    return y;
  }
  t.getMessageFromCode = o;
  function a(h) {
    if (!Number.isInteger(h)) return !1;
    const y = h.toString();
    return !!(e.errorValues[y] || u(h));
  }
  t.isValidCode = a;
  function c(h, { fallbackError: y = s, shouldIncludeStack: _ = !1 } = {}) {
    var x, E;
    if (!y || !Number.isInteger(y.code) || typeof y.message != 'string')
      throw new Error(
        'Must provide fallback error with integer number code and string message.'
      );
    if (h instanceof r.EthereumRpcError) return h.serialize();
    const b = {};
    if (
      h &&
      typeof h == 'object' &&
      !Array.isArray(h) &&
      f(h, 'code') &&
      a(h.code)
    ) {
      const w = h;
      (b.code = w.code),
        w.message && typeof w.message == 'string'
          ? ((b.message = w.message), f(w, 'data') && (b.data = w.data))
          : ((b.message = o(b.code)), (b.data = { originalError: l(h) }));
    } else {
      b.code = y.code;
      const w = (x = h) === null || x === void 0 ? void 0 : x.message;
      (b.message = w && typeof w == 'string' ? w : y.message),
        (b.data = { originalError: l(h) });
    }
    const g = (E = h) === null || E === void 0 ? void 0 : E.stack;
    return _ && h && g && typeof g == 'string' && (b.stack = g), b;
  }
  t.serializeError = c;
  function u(h) {
    return h >= -32099 && h <= -32e3;
  }
  function l(h) {
    return h && typeof h == 'object' && !Array.isArray(h)
      ? Object.assign({}, h)
      : h;
  }
  function f(h, y) {
    return Object.prototype.hasOwnProperty.call(h, y);
  }
})(ka);
var Ai = {};
Object.defineProperty(Ai, '__esModule', { value: !0 });
Ai.ethErrors = void 0;
const Ma = $t,
  Sl = ka,
  xe = Wt;
Ai.ethErrors = {
  rpc: {
    parse: (t) => He(xe.errorCodes.rpc.parse, t),
    invalidRequest: (t) => He(xe.errorCodes.rpc.invalidRequest, t),
    invalidParams: (t) => He(xe.errorCodes.rpc.invalidParams, t),
    methodNotFound: (t) => He(xe.errorCodes.rpc.methodNotFound, t),
    internal: (t) => He(xe.errorCodes.rpc.internal, t),
    server: (t) => {
      if (!t || typeof t != 'object' || Array.isArray(t))
        throw new Error(
          'Ethereum RPC Server errors must provide single object argument.'
        );
      const { code: e } = t;
      if (!Number.isInteger(e) || e > -32005 || e < -32099)
        throw new Error(
          '"code" must be an integer such that: -32099 <= code <= -32005'
        );
      return He(e, t);
    },
    invalidInput: (t) => He(xe.errorCodes.rpc.invalidInput, t),
    resourceNotFound: (t) => He(xe.errorCodes.rpc.resourceNotFound, t),
    resourceUnavailable: (t) => He(xe.errorCodes.rpc.resourceUnavailable, t),
    transactionRejected: (t) => He(xe.errorCodes.rpc.transactionRejected, t),
    methodNotSupported: (t) => He(xe.errorCodes.rpc.methodNotSupported, t),
    limitExceeded: (t) => He(xe.errorCodes.rpc.limitExceeded, t),
  },
  provider: {
    userRejectedRequest: (t) =>
      un(xe.errorCodes.provider.userRejectedRequest, t),
    unauthorized: (t) => un(xe.errorCodes.provider.unauthorized, t),
    unsupportedMethod: (t) => un(xe.errorCodes.provider.unsupportedMethod, t),
    disconnected: (t) => un(xe.errorCodes.provider.disconnected, t),
    chainDisconnected: (t) => un(xe.errorCodes.provider.chainDisconnected, t),
    custom: (t) => {
      if (!t || typeof t != 'object' || Array.isArray(t))
        throw new Error(
          'Ethereum Provider custom errors must provide single object argument.'
        );
      const { code: e, message: r, data: n } = t;
      if (!r || typeof r != 'string')
        throw new Error('"message" must be a nonempty string');
      return new Ma.EthereumProviderError(e, r, n);
    },
  },
};
function He(t, e) {
  const [r, n] = El(e);
  return new Ma.EthereumRpcError(t, r || Sl.getMessageFromCode(t), n);
}
function un(t, e) {
  const [r, n] = El(e);
  return new Ma.EthereumProviderError(t, r || Sl.getMessageFromCode(t), n);
}
function El(t) {
  if (t) {
    if (typeof t == 'string') return [t];
    if (typeof t == 'object' && !Array.isArray(t)) {
      const { message: e, data: r } = t;
      if (e && typeof e != 'string')
        throw new Error('Must specify string message.');
      return [e || void 0, r];
    }
  }
  return [];
}
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.getMessageFromCode =
      t.serializeError =
      t.EthereumProviderError =
      t.EthereumRpcError =
      t.ethErrors =
      t.errorCodes =
        void 0);
  const e = $t;
  Object.defineProperty(t, 'EthereumRpcError', {
    enumerable: !0,
    get: function () {
      return e.EthereumRpcError;
    },
  }),
    Object.defineProperty(t, 'EthereumProviderError', {
      enumerable: !0,
      get: function () {
        return e.EthereumProviderError;
      },
    });
  const r = ka;
  Object.defineProperty(t, 'serializeError', {
    enumerable: !0,
    get: function () {
      return r.serializeError;
    },
  }),
    Object.defineProperty(t, 'getMessageFromCode', {
      enumerable: !0,
      get: function () {
        return r.getMessageFromCode;
      },
    });
  const n = Ai;
  Object.defineProperty(t, 'ethErrors', {
    enumerable: !0,
    get: function () {
      return n.ethErrors;
    },
  });
  const i = Wt;
  Object.defineProperty(t, 'errorCodes', {
    enumerable: !0,
    get: function () {
      return i.errorCodes;
    },
  });
})(Ia);
var re = {},
  Ti = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.Web3Method = void 0),
    (function (e) {
      (e.requestEthereumAccounts = 'requestEthereumAccounts'),
        (e.signEthereumMessage = 'signEthereumMessage'),
        (e.signEthereumTransaction = 'signEthereumTransaction'),
        (e.submitEthereumTransaction = 'submitEthereumTransaction'),
        (e.ethereumAddressFromSignedMessage =
          'ethereumAddressFromSignedMessage'),
        (e.scanQRCode = 'scanQRCode'),
        (e.generic = 'generic'),
        (e.childRequestEthereumAccounts = 'childRequestEthereumAccounts'),
        (e.addEthereumChain = 'addEthereumChain'),
        (e.switchEthereumChain = 'switchEthereumChain'),
        (e.makeEthereumJSONRPCRequest = 'makeEthereumJSONRPCRequest'),
        (e.watchAsset = 'watchAsset'),
        (e.selectProvider = 'selectProvider');
    })(t.Web3Method || (t.Web3Method = {}));
})(Ti);
Object.defineProperty(re, '__esModule', { value: !0 });
re.EthereumAddressFromSignedMessageResponse =
  re.SubmitEthereumTransactionResponse =
  re.SignEthereumTransactionResponse =
  re.SignEthereumMessageResponse =
  re.isRequestEthereumAccountsResponse =
  re.SelectProviderResponse =
  re.WatchAssetReponse =
  re.RequestEthereumAccountsResponse =
  re.SwitchEthereumChainResponse =
  re.AddEthereumChainResponse =
  re.isErrorResponse =
    void 0;
const vt = Ti;
function Id(t) {
  var e, r;
  return (
    ((e = t) === null || e === void 0 ? void 0 : e.method) !== void 0 &&
    ((r = t) === null || r === void 0 ? void 0 : r.errorMessage) !== void 0
  );
}
re.isErrorResponse = Id;
function kd(t) {
  return { method: vt.Web3Method.addEthereumChain, result: t };
}
re.AddEthereumChainResponse = kd;
function Md(t) {
  return { method: vt.Web3Method.switchEthereumChain, result: t };
}
re.SwitchEthereumChainResponse = Md;
function Rd(t) {
  return { method: vt.Web3Method.requestEthereumAccounts, result: t };
}
re.RequestEthereumAccountsResponse = Rd;
function Ad(t) {
  return { method: vt.Web3Method.watchAsset, result: t };
}
re.WatchAssetReponse = Ad;
function Td(t) {
  return { method: vt.Web3Method.selectProvider, result: t };
}
re.SelectProviderResponse = Td;
function Od(t) {
  return t && t.method === vt.Web3Method.requestEthereumAccounts;
}
re.isRequestEthereumAccountsResponse = Od;
function Nd(t) {
  return { method: vt.Web3Method.signEthereumMessage, result: t };
}
re.SignEthereumMessageResponse = Nd;
function Ld(t) {
  return { method: vt.Web3Method.signEthereumTransaction, result: t };
}
re.SignEthereumTransactionResponse = Ld;
function Pd(t) {
  return { method: vt.Web3Method.submitEthereumTransaction, result: t };
}
re.SubmitEthereumTransactionResponse = Pd;
function Dd(t) {
  return { method: vt.Web3Method.ethereumAddressFromSignedMessage, result: t };
}
re.EthereumAddressFromSignedMessageResponse = Dd;
var Qr = {};
Object.defineProperty(Qr, '__esModule', { value: !0 });
Qr.LIB_VERSION = void 0;
Qr.LIB_VERSION = '3.7.2';
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.getErrorCode =
      t.serializeError =
      t.standardErrors =
      t.standardErrorMessage =
      t.standardErrorCodes =
        void 0);
  const e = Ia,
    r = re,
    n = Qr;
  t.standardErrorCodes = Object.freeze(
    Object.assign(Object.assign({}, e.errorCodes), {
      provider: Object.freeze(
        Object.assign(Object.assign({}, e.errorCodes.provider), {
          unsupportedChain: 4902,
        })
      ),
    })
  );
  function i(l) {
    return l !== void 0 ? (0, e.getMessageFromCode)(l) : 'Unknown error';
  }
  (t.standardErrorMessage = i),
    (t.standardErrors = Object.freeze(
      Object.assign(Object.assign({}, e.ethErrors), {
        provider: Object.freeze(
          Object.assign(Object.assign({}, e.ethErrors.provider), {
            unsupportedChain: (l = '') =>
              e.ethErrors.provider.custom({
                code: t.standardErrorCodes.provider.unsupportedChain,
                message: `Unrecognized chain ID ${l}. Try adding the chain using wallet_addEthereumChain first.`,
              }),
          })
        ),
      })
    ));
  function s(l, f) {
    const h = (0, e.serializeError)(o(l), { shouldIncludeStack: !0 }),
      y = new URL('https://docs.cloud.coinbase.com/wallet-sdk/docs/errors');
    y.searchParams.set('version', n.LIB_VERSION),
      y.searchParams.set('code', h.code.toString());
    const _ = a(h.data, f);
    return (
      _ && y.searchParams.set('method', _),
      y.searchParams.set('message', h.message),
      Object.assign(Object.assign({}, h), { docUrl: y.href })
    );
  }
  t.serializeError = s;
  function o(l) {
    return typeof l == 'string'
      ? { message: l, code: t.standardErrorCodes.rpc.internal }
      : (0, r.isErrorResponse)(l)
        ? Object.assign(Object.assign({}, l), {
            message: l.errorMessage,
            code: l.errorCode,
            data: { method: l.method, result: l.result },
          })
        : l;
  }
  function a(l, f) {
    var h;
    const y = (h = l) === null || h === void 0 ? void 0 : h.method;
    if (y) return y;
    if (f !== void 0)
      return typeof f == 'string'
        ? f
        : Array.isArray(f)
          ? f.length > 0
            ? f[0].method
            : void 0
          : f.method;
  }
  function c(l) {
    var f;
    if (typeof l == 'number') return l;
    if (u(l)) return (f = l.code) !== null && f !== void 0 ? f : l.errorCode;
  }
  t.getErrorCode = c;
  function u(l) {
    return (
      typeof l == 'object' &&
      l !== null &&
      (typeof l.code == 'number' || typeof l.errorCode == 'number')
    );
  }
})(kn);
var Zr = {},
  Cl = { exports: {} },
  ra = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ (function (
  t,
  e
) {
  var r = xi,
    n = r.Buffer;
  function i(o, a) {
    for (var c in o) a[c] = o[c];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow
    ? (t.exports = r)
    : (i(r, e), (e.Buffer = s));
  function s(o, a, c) {
    return n(o, a, c);
  }
  (s.prototype = Object.create(n.prototype)),
    i(n, s),
    (s.from = function (o, a, c) {
      if (typeof o == 'number')
        throw new TypeError('Argument must not be a number');
      return n(o, a, c);
    }),
    (s.alloc = function (o, a, c) {
      if (typeof o != 'number')
        throw new TypeError('Argument must be a number');
      var u = n(o);
      return (
        a !== void 0
          ? typeof c == 'string'
            ? u.fill(a, c)
            : u.fill(a)
          : u.fill(0),
        u
      );
    }),
    (s.allocUnsafe = function (o) {
      if (typeof o != 'number')
        throw new TypeError('Argument must be a number');
      return n(o);
    }),
    (s.allocUnsafeSlow = function (o) {
      if (typeof o != 'number')
        throw new TypeError('Argument must be a number');
      return r.SlowBuffer(o);
    });
})(ra, ra.exports);
var zt = ra.exports,
  xl = zt.Buffer;
function Oi(t, e) {
  (this._block = xl.alloc(t)),
    (this._finalSize = e),
    (this._blockSize = t),
    (this._len = 0);
}
Oi.prototype.update = function (t, e) {
  typeof t == 'string' && ((e = e || 'utf8'), (t = xl.from(t, e)));
  for (
    var r = this._block,
      n = this._blockSize,
      i = t.length,
      s = this._len,
      o = 0;
    o < i;

  ) {
    for (var a = s % n, c = Math.min(i - o, n - a), u = 0; u < c; u++)
      r[a + u] = t[o + u];
    (s += c), (o += c), s % n === 0 && this._update(r);
  }
  return (this._len += i), this;
};
Oi.prototype.digest = function (t) {
  var e = this._len % this._blockSize;
  (this._block[e] = 128),
    this._block.fill(0, e + 1),
    e >= this._finalSize && (this._update(this._block), this._block.fill(0));
  var r = this._len * 8;
  if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4);
  else {
    var n = (r & 4294967295) >>> 0,
      i = (r - n) / 4294967296;
    this._block.writeUInt32BE(i, this._blockSize - 8),
      this._block.writeUInt32BE(n, this._blockSize - 4);
  }
  this._update(this._block);
  var s = this._hash();
  return t ? s.toString(t) : s;
};
Oi.prototype._update = function () {
  throw new Error('_update must be implemented by subclass');
};
var Yr = Oi,
  Bd = st,
  Il = Yr,
  jd = zt.Buffer,
  Fd = [1518500249, 1859775393, -1894007588, -899497514],
  $d = new Array(80);
function Mn() {
  this.init(), (this._w = $d), Il.call(this, 64, 56);
}
Bd(Mn, Il);
Mn.prototype.init = function () {
  return (
    (this._a = 1732584193),
    (this._b = 4023233417),
    (this._c = 2562383102),
    (this._d = 271733878),
    (this._e = 3285377520),
    this
  );
};
function Wd(t) {
  return (t << 5) | (t >>> 27);
}
function Hd(t) {
  return (t << 30) | (t >>> 2);
}
function Vd(t, e, r, n) {
  return t === 0
    ? (e & r) | (~e & n)
    : t === 2
      ? (e & r) | (e & n) | (r & n)
      : e ^ r ^ n;
}
Mn.prototype._update = function (t) {
  for (
    var e = this._w,
      r = this._a | 0,
      n = this._b | 0,
      i = this._c | 0,
      s = this._d | 0,
      o = this._e | 0,
      a = 0;
    a < 16;
    ++a
  )
    e[a] = t.readInt32BE(a * 4);
  for (; a < 80; ++a) e[a] = e[a - 3] ^ e[a - 8] ^ e[a - 14] ^ e[a - 16];
  for (var c = 0; c < 80; ++c) {
    var u = ~~(c / 20),
      l = (Wd(r) + Vd(u, n, i, s) + o + e[c] + Fd[u]) | 0;
    (o = s), (s = i), (i = Hd(n)), (n = r), (r = l);
  }
  (this._a = (r + this._a) | 0),
    (this._b = (n + this._b) | 0),
    (this._c = (i + this._c) | 0),
    (this._d = (s + this._d) | 0),
    (this._e = (o + this._e) | 0);
};
Mn.prototype._hash = function () {
  var t = jd.allocUnsafe(20);
  return (
    t.writeInt32BE(this._a | 0, 0),
    t.writeInt32BE(this._b | 0, 4),
    t.writeInt32BE(this._c | 0, 8),
    t.writeInt32BE(this._d | 0, 12),
    t.writeInt32BE(this._e | 0, 16),
    t
  );
};
var Ud = Mn,
  zd = st,
  kl = Yr,
  qd = zt.Buffer,
  Jd = [1518500249, 1859775393, -1894007588, -899497514],
  Gd = new Array(80);
function Rn() {
  this.init(), (this._w = Gd), kl.call(this, 64, 56);
}
zd(Rn, kl);
Rn.prototype.init = function () {
  return (
    (this._a = 1732584193),
    (this._b = 4023233417),
    (this._c = 2562383102),
    (this._d = 271733878),
    (this._e = 3285377520),
    this
  );
};
function Qd(t) {
  return (t << 1) | (t >>> 31);
}
function Zd(t) {
  return (t << 5) | (t >>> 27);
}
function Yd(t) {
  return (t << 30) | (t >>> 2);
}
function Kd(t, e, r, n) {
  return t === 0
    ? (e & r) | (~e & n)
    : t === 2
      ? (e & r) | (e & n) | (r & n)
      : e ^ r ^ n;
}
Rn.prototype._update = function (t) {
  for (
    var e = this._w,
      r = this._a | 0,
      n = this._b | 0,
      i = this._c | 0,
      s = this._d | 0,
      o = this._e | 0,
      a = 0;
    a < 16;
    ++a
  )
    e[a] = t.readInt32BE(a * 4);
  for (; a < 80; ++a) e[a] = Qd(e[a - 3] ^ e[a - 8] ^ e[a - 14] ^ e[a - 16]);
  for (var c = 0; c < 80; ++c) {
    var u = ~~(c / 20),
      l = (Zd(r) + Kd(u, n, i, s) + o + e[c] + Jd[u]) | 0;
    (o = s), (s = i), (i = Yd(n)), (n = r), (r = l);
  }
  (this._a = (r + this._a) | 0),
    (this._b = (n + this._b) | 0),
    (this._c = (i + this._c) | 0),
    (this._d = (s + this._d) | 0),
    (this._e = (o + this._e) | 0);
};
Rn.prototype._hash = function () {
  var t = qd.allocUnsafe(20);
  return (
    t.writeInt32BE(this._a | 0, 0),
    t.writeInt32BE(this._b | 0, 4),
    t.writeInt32BE(this._c | 0, 8),
    t.writeInt32BE(this._d | 0, 12),
    t.writeInt32BE(this._e | 0, 16),
    t
  );
};
var Xd = Rn,
  ep = st,
  Ml = Yr,
  tp = zt.Buffer,
  rp = [
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ],
  np = new Array(64);
function An() {
  this.init(), (this._w = np), Ml.call(this, 64, 56);
}
ep(An, Ml);
An.prototype.init = function () {
  return (
    (this._a = 1779033703),
    (this._b = 3144134277),
    (this._c = 1013904242),
    (this._d = 2773480762),
    (this._e = 1359893119),
    (this._f = 2600822924),
    (this._g = 528734635),
    (this._h = 1541459225),
    this
  );
};
function ip(t, e, r) {
  return r ^ (t & (e ^ r));
}
function sp(t, e, r) {
  return (t & e) | (r & (t | e));
}
function op(t) {
  return (
    ((t >>> 2) | (t << 30)) ^
    ((t >>> 13) | (t << 19)) ^
    ((t >>> 22) | (t << 10))
  );
}
function ap(t) {
  return (
    ((t >>> 6) | (t << 26)) ^ ((t >>> 11) | (t << 21)) ^ ((t >>> 25) | (t << 7))
  );
}
function cp(t) {
  return ((t >>> 7) | (t << 25)) ^ ((t >>> 18) | (t << 14)) ^ (t >>> 3);
}
function up(t) {
  return ((t >>> 17) | (t << 15)) ^ ((t >>> 19) | (t << 13)) ^ (t >>> 10);
}
An.prototype._update = function (t) {
  for (
    var e = this._w,
      r = this._a | 0,
      n = this._b | 0,
      i = this._c | 0,
      s = this._d | 0,
      o = this._e | 0,
      a = this._f | 0,
      c = this._g | 0,
      u = this._h | 0,
      l = 0;
    l < 16;
    ++l
  )
    e[l] = t.readInt32BE(l * 4);
  for (; l < 64; ++l)
    e[l] = (up(e[l - 2]) + e[l - 7] + cp(e[l - 15]) + e[l - 16]) | 0;
  for (var f = 0; f < 64; ++f) {
    var h = (u + ap(o) + ip(o, a, c) + rp[f] + e[f]) | 0,
      y = (op(r) + sp(r, n, i)) | 0;
    (u = c),
      (c = a),
      (a = o),
      (o = (s + h) | 0),
      (s = i),
      (i = n),
      (n = r),
      (r = (h + y) | 0);
  }
  (this._a = (r + this._a) | 0),
    (this._b = (n + this._b) | 0),
    (this._c = (i + this._c) | 0),
    (this._d = (s + this._d) | 0),
    (this._e = (o + this._e) | 0),
    (this._f = (a + this._f) | 0),
    (this._g = (c + this._g) | 0),
    (this._h = (u + this._h) | 0);
};
An.prototype._hash = function () {
  var t = tp.allocUnsafe(32);
  return (
    t.writeInt32BE(this._a, 0),
    t.writeInt32BE(this._b, 4),
    t.writeInt32BE(this._c, 8),
    t.writeInt32BE(this._d, 12),
    t.writeInt32BE(this._e, 16),
    t.writeInt32BE(this._f, 20),
    t.writeInt32BE(this._g, 24),
    t.writeInt32BE(this._h, 28),
    t
  );
};
var Rl = An,
  lp = st,
  fp = Rl,
  hp = Yr,
  dp = zt.Buffer,
  pp = new Array(64);
function Ni() {
  this.init(), (this._w = pp), hp.call(this, 64, 56);
}
lp(Ni, fp);
Ni.prototype.init = function () {
  return (
    (this._a = 3238371032),
    (this._b = 914150663),
    (this._c = 812702999),
    (this._d = 4144912697),
    (this._e = 4290775857),
    (this._f = 1750603025),
    (this._g = 1694076839),
    (this._h = 3204075428),
    this
  );
};
Ni.prototype._hash = function () {
  var t = dp.allocUnsafe(28);
  return (
    t.writeInt32BE(this._a, 0),
    t.writeInt32BE(this._b, 4),
    t.writeInt32BE(this._c, 8),
    t.writeInt32BE(this._d, 12),
    t.writeInt32BE(this._e, 16),
    t.writeInt32BE(this._f, 20),
    t.writeInt32BE(this._g, 24),
    t
  );
};
var bp = Ni,
  gp = st,
  Al = Yr,
  yp = zt.Buffer,
  Ic = [
    1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
    3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
    2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
    310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
    1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
    3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
    264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
    1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
    2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
    3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
    113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
    773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
    1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
    2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
    3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
    3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
    430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
    883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
    1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
    2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
    2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
    3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
    3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
    174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
    685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
    1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
    1607167915, 987167468, 1816402316, 1246189591,
  ],
  vp = new Array(160);
function Tn() {
  this.init(), (this._w = vp), Al.call(this, 128, 112);
}
gp(Tn, Al);
Tn.prototype.init = function () {
  return (
    (this._ah = 1779033703),
    (this._bh = 3144134277),
    (this._ch = 1013904242),
    (this._dh = 2773480762),
    (this._eh = 1359893119),
    (this._fh = 2600822924),
    (this._gh = 528734635),
    (this._hh = 1541459225),
    (this._al = 4089235720),
    (this._bl = 2227873595),
    (this._cl = 4271175723),
    (this._dl = 1595750129),
    (this._el = 2917565137),
    (this._fl = 725511199),
    (this._gl = 4215389547),
    (this._hl = 327033209),
    this
  );
};
function kc(t, e, r) {
  return r ^ (t & (e ^ r));
}
function Mc(t, e, r) {
  return (t & e) | (r & (t | e));
}
function Rc(t, e) {
  return (
    ((t >>> 28) | (e << 4)) ^ ((e >>> 2) | (t << 30)) ^ ((e >>> 7) | (t << 25))
  );
}
function Ac(t, e) {
  return (
    ((t >>> 14) | (e << 18)) ^
    ((t >>> 18) | (e << 14)) ^
    ((e >>> 9) | (t << 23))
  );
}
function mp(t, e) {
  return ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ (t >>> 7);
}
function wp(t, e) {
  return (
    ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ ((t >>> 7) | (e << 25))
  );
}
function _p(t, e) {
  return ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ (t >>> 6);
}
function Sp(t, e) {
  return (
    ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ ((t >>> 6) | (e << 26))
  );
}
function ye(t, e) {
  return t >>> 0 < e >>> 0 ? 1 : 0;
}
Tn.prototype._update = function (t) {
  for (
    var e = this._w,
      r = this._ah | 0,
      n = this._bh | 0,
      i = this._ch | 0,
      s = this._dh | 0,
      o = this._eh | 0,
      a = this._fh | 0,
      c = this._gh | 0,
      u = this._hh | 0,
      l = this._al | 0,
      f = this._bl | 0,
      h = this._cl | 0,
      y = this._dl | 0,
      _ = this._el | 0,
      x = this._fl | 0,
      E = this._gl | 0,
      b = this._hl | 0,
      g = 0;
    g < 32;
    g += 2
  )
    (e[g] = t.readInt32BE(g * 4)), (e[g + 1] = t.readInt32BE(g * 4 + 4));
  for (; g < 160; g += 2) {
    var w = e[g - 30],
      C = e[g - 15 * 2 + 1],
      S = mp(w, C),
      M = wp(C, w);
    (w = e[g - 2 * 2]), (C = e[g - 2 * 2 + 1]);
    var P = _p(w, C),
      N = Sp(C, w),
      A = e[g - 7 * 2],
      F = e[g - 7 * 2 + 1],
      K = e[g - 16 * 2],
      W = e[g - 16 * 2 + 1],
      J = (M + F) | 0,
      te = (S + A + ye(J, M)) | 0;
    (J = (J + N) | 0),
      (te = (te + P + ye(J, N)) | 0),
      (J = (J + W) | 0),
      (te = (te + K + ye(J, W)) | 0),
      (e[g] = te),
      (e[g + 1] = J);
  }
  for (var se = 0; se < 160; se += 2) {
    (te = e[se]), (J = e[se + 1]);
    var pe = Mc(r, n, i),
      Ne = Mc(l, f, h),
      Ke = Rc(r, l),
      Le = Rc(l, r),
      Xe = Ac(o, _),
      Rt = Ac(_, o),
      mt = Ic[se],
      Be = Ic[se + 1],
      At = kc(o, a, c),
      wt = kc(_, x, E),
      m = (b + Rt) | 0,
      v = (u + Xe + ye(m, b)) | 0;
    (m = (m + wt) | 0),
      (v = (v + At + ye(m, wt)) | 0),
      (m = (m + Be) | 0),
      (v = (v + mt + ye(m, Be)) | 0),
      (m = (m + J) | 0),
      (v = (v + te + ye(m, J)) | 0);
    var R = (Le + Ne) | 0,
      B = (Ke + pe + ye(R, Le)) | 0;
    (u = c),
      (b = E),
      (c = a),
      (E = x),
      (a = o),
      (x = _),
      (_ = (y + m) | 0),
      (o = (s + v + ye(_, y)) | 0),
      (s = i),
      (y = h),
      (i = n),
      (h = f),
      (n = r),
      (f = l),
      (l = (m + R) | 0),
      (r = (v + B + ye(l, m)) | 0);
  }
  (this._al = (this._al + l) | 0),
    (this._bl = (this._bl + f) | 0),
    (this._cl = (this._cl + h) | 0),
    (this._dl = (this._dl + y) | 0),
    (this._el = (this._el + _) | 0),
    (this._fl = (this._fl + x) | 0),
    (this._gl = (this._gl + E) | 0),
    (this._hl = (this._hl + b) | 0),
    (this._ah = (this._ah + r + ye(this._al, l)) | 0),
    (this._bh = (this._bh + n + ye(this._bl, f)) | 0),
    (this._ch = (this._ch + i + ye(this._cl, h)) | 0),
    (this._dh = (this._dh + s + ye(this._dl, y)) | 0),
    (this._eh = (this._eh + o + ye(this._el, _)) | 0),
    (this._fh = (this._fh + a + ye(this._fl, x)) | 0),
    (this._gh = (this._gh + c + ye(this._gl, E)) | 0),
    (this._hh = (this._hh + u + ye(this._hl, b)) | 0);
};
Tn.prototype._hash = function () {
  var t = yp.allocUnsafe(64);
  function e(r, n, i) {
    t.writeInt32BE(r, i), t.writeInt32BE(n, i + 4);
  }
  return (
    e(this._ah, this._al, 0),
    e(this._bh, this._bl, 8),
    e(this._ch, this._cl, 16),
    e(this._dh, this._dl, 24),
    e(this._eh, this._el, 32),
    e(this._fh, this._fl, 40),
    e(this._gh, this._gl, 48),
    e(this._hh, this._hl, 56),
    t
  );
};
var Tl = Tn,
  Ep = st,
  Cp = Tl,
  xp = Yr,
  Ip = zt.Buffer,
  kp = new Array(160);
function Li() {
  this.init(), (this._w = kp), xp.call(this, 128, 112);
}
Ep(Li, Cp);
Li.prototype.init = function () {
  return (
    (this._ah = 3418070365),
    (this._bh = 1654270250),
    (this._ch = 2438529370),
    (this._dh = 355462360),
    (this._eh = 1731405415),
    (this._fh = 2394180231),
    (this._gh = 3675008525),
    (this._hh = 1203062813),
    (this._al = 3238371032),
    (this._bl = 914150663),
    (this._cl = 812702999),
    (this._dl = 4144912697),
    (this._el = 4290775857),
    (this._fl = 1750603025),
    (this._gl = 1694076839),
    (this._hl = 3204075428),
    this
  );
};
Li.prototype._hash = function () {
  var t = Ip.allocUnsafe(48);
  function e(r, n, i) {
    t.writeInt32BE(r, i), t.writeInt32BE(n, i + 4);
  }
  return (
    e(this._ah, this._al, 0),
    e(this._bh, this._bl, 8),
    e(this._ch, this._cl, 16),
    e(this._dh, this._dl, 24),
    e(this._eh, this._el, 32),
    e(this._fh, this._fl, 40),
    t
  );
};
var Mp = Li,
  lr = (Cl.exports = function (e) {
    e = e.toLowerCase();
    var r = lr[e];
    if (!r) throw new Error(e + ' is not supported (we accept pull requests)');
    return new r();
  });
lr.sha = Ud;
lr.sha1 = Xd;
lr.sha224 = bp;
lr.sha256 = Rl;
lr.sha384 = Mp;
lr.sha512 = Tl;
var Rp = Cl.exports,
  L = {},
  Ap = function () {
    if (
      typeof Symbol != 'function' ||
      typeof Object.getOwnPropertySymbols != 'function'
    )
      return !1;
    if (typeof Symbol.iterator == 'symbol') return !0;
    var e = {},
      r = Symbol('test'),
      n = Object(r);
    if (
      typeof r == 'string' ||
      Object.prototype.toString.call(r) !== '[object Symbol]' ||
      Object.prototype.toString.call(n) !== '[object Symbol]'
    )
      return !1;
    var i = 42;
    e[r] = i;
    for (r in e) return !1;
    if (
      (typeof Object.keys == 'function' && Object.keys(e).length !== 0) ||
      (typeof Object.getOwnPropertyNames == 'function' &&
        Object.getOwnPropertyNames(e).length !== 0)
    )
      return !1;
    var s = Object.getOwnPropertySymbols(e);
    if (
      s.length !== 1 ||
      s[0] !== r ||
      !Object.prototype.propertyIsEnumerable.call(e, r)
    )
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == 'function') {
      var o = Object.getOwnPropertyDescriptor(e, r);
      if (o.value !== i || o.enumerable !== !0) return !1;
    }
    return !0;
  },
  Tc = typeof Symbol < 'u' && Symbol,
  Tp = Ap,
  Op = function () {
    return typeof Tc != 'function' ||
      typeof Symbol != 'function' ||
      typeof Tc('foo') != 'symbol' ||
      typeof Symbol('bar') != 'symbol'
      ? !1
      : Tp();
  },
  Oc = { foo: {} },
  Np = Object,
  Lp = function () {
    return (
      { __proto__: Oc }.foo === Oc.foo && !({ __proto__: null } instanceof Np)
    );
  },
  Pp = 'Function.prototype.bind called on incompatible ',
  Dp = Object.prototype.toString,
  Bp = Math.max,
  jp = '[object Function]',
  Nc = function (e, r) {
    for (var n = [], i = 0; i < e.length; i += 1) n[i] = e[i];
    for (var s = 0; s < r.length; s += 1) n[s + e.length] = r[s];
    return n;
  },
  Fp = function (e, r) {
    for (var n = [], i = r || 0, s = 0; i < e.length; i += 1, s += 1)
      n[s] = e[i];
    return n;
  },
  $p = function (t, e) {
    for (var r = '', n = 0; n < t.length; n += 1)
      (r += t[n]), n + 1 < t.length && (r += e);
    return r;
  },
  Wp = function (e) {
    var r = this;
    if (typeof r != 'function' || Dp.apply(r) !== jp)
      throw new TypeError(Pp + r);
    for (
      var n = Fp(arguments, 1),
        i,
        s = function () {
          if (this instanceof i) {
            var l = r.apply(this, Nc(n, arguments));
            return Object(l) === l ? l : this;
          }
          return r.apply(e, Nc(n, arguments));
        },
        o = Bp(0, r.length - n.length),
        a = [],
        c = 0;
      c < o;
      c++
    )
      a[c] = '$' + c;
    if (
      ((i = Function(
        'binder',
        'return function (' +
          $p(a, ',') +
          '){ return binder.apply(this,arguments); }'
      )(s)),
      r.prototype)
    ) {
      var u = function () {};
      (u.prototype = r.prototype),
        (i.prototype = new u()),
        (u.prototype = null);
    }
    return i;
  },
  Hp = Wp,
  Ra = Function.prototype.bind || Hp,
  Vp = Function.prototype.call,
  Up = Object.prototype.hasOwnProperty,
  zp = Ra,
  qp = zp.call(Vp, Up),
  G,
  Pr = SyntaxError,
  Ol = Function,
  Ar = TypeError,
  wo = function (t) {
    try {
      return Ol('"use strict"; return (' + t + ').constructor;')();
    } catch {}
  },
  rr = Object.getOwnPropertyDescriptor;
if (rr)
  try {
    rr({}, '');
  } catch {
    rr = null;
  }
var _o = function () {
    throw new Ar();
  },
  Jp = rr
    ? (function () {
        try {
          return arguments.callee, _o;
        } catch {
          try {
            return rr(arguments, 'callee').get;
          } catch {
            return _o;
          }
        }
      })()
    : _o,
  wr = Op(),
  Gp = Lp(),
  me =
    Object.getPrototypeOf ||
    (Gp
      ? function (t) {
          return t.__proto__;
        }
      : null),
  xr = {},
  Qp = typeof Uint8Array > 'u' || !me ? G : me(Uint8Array),
  nr = {
    '%AggregateError%': typeof AggregateError > 'u' ? G : AggregateError,
    '%Array%': Array,
    '%ArrayBuffer%': typeof ArrayBuffer > 'u' ? G : ArrayBuffer,
    '%ArrayIteratorPrototype%': wr && me ? me([][Symbol.iterator]()) : G,
    '%AsyncFromSyncIteratorPrototype%': G,
    '%AsyncFunction%': xr,
    '%AsyncGenerator%': xr,
    '%AsyncGeneratorFunction%': xr,
    '%AsyncIteratorPrototype%': xr,
    '%Atomics%': typeof Atomics > 'u' ? G : Atomics,
    '%BigInt%': typeof BigInt > 'u' ? G : BigInt,
    '%BigInt64Array%': typeof BigInt64Array > 'u' ? G : BigInt64Array,
    '%BigUint64Array%': typeof BigUint64Array > 'u' ? G : BigUint64Array,
    '%Boolean%': Boolean,
    '%DataView%': typeof DataView > 'u' ? G : DataView,
    '%Date%': Date,
    '%decodeURI%': decodeURI,
    '%decodeURIComponent%': decodeURIComponent,
    '%encodeURI%': encodeURI,
    '%encodeURIComponent%': encodeURIComponent,
    '%Error%': Error,
    '%eval%': eval,
    '%EvalError%': EvalError,
    '%Float32Array%': typeof Float32Array > 'u' ? G : Float32Array,
    '%Float64Array%': typeof Float64Array > 'u' ? G : Float64Array,
    '%FinalizationRegistry%':
      typeof FinalizationRegistry > 'u' ? G : FinalizationRegistry,
    '%Function%': Ol,
    '%GeneratorFunction%': xr,
    '%Int8Array%': typeof Int8Array > 'u' ? G : Int8Array,
    '%Int16Array%': typeof Int16Array > 'u' ? G : Int16Array,
    '%Int32Array%': typeof Int32Array > 'u' ? G : Int32Array,
    '%isFinite%': isFinite,
    '%isNaN%': isNaN,
    '%IteratorPrototype%': wr && me ? me(me([][Symbol.iterator]())) : G,
    '%JSON%': typeof JSON == 'object' ? JSON : G,
    '%Map%': typeof Map > 'u' ? G : Map,
    '%MapIteratorPrototype%':
      typeof Map > 'u' || !wr || !me ? G : me(new Map()[Symbol.iterator]()),
    '%Math%': Math,
    '%Number%': Number,
    '%Object%': Object,
    '%parseFloat%': parseFloat,
    '%parseInt%': parseInt,
    '%Promise%': typeof Promise > 'u' ? G : Promise,
    '%Proxy%': typeof Proxy > 'u' ? G : Proxy,
    '%RangeError%': RangeError,
    '%ReferenceError%': ReferenceError,
    '%Reflect%': typeof Reflect > 'u' ? G : Reflect,
    '%RegExp%': RegExp,
    '%Set%': typeof Set > 'u' ? G : Set,
    '%SetIteratorPrototype%':
      typeof Set > 'u' || !wr || !me ? G : me(new Set()[Symbol.iterator]()),
    '%SharedArrayBuffer%':
      typeof SharedArrayBuffer > 'u' ? G : SharedArrayBuffer,
    '%String%': String,
    '%StringIteratorPrototype%': wr && me ? me(''[Symbol.iterator]()) : G,
    '%Symbol%': wr ? Symbol : G,
    '%SyntaxError%': Pr,
    '%ThrowTypeError%': Jp,
    '%TypedArray%': Qp,
    '%TypeError%': Ar,
    '%Uint8Array%': typeof Uint8Array > 'u' ? G : Uint8Array,
    '%Uint8ClampedArray%':
      typeof Uint8ClampedArray > 'u' ? G : Uint8ClampedArray,
    '%Uint16Array%': typeof Uint16Array > 'u' ? G : Uint16Array,
    '%Uint32Array%': typeof Uint32Array > 'u' ? G : Uint32Array,
    '%URIError%': URIError,
    '%WeakMap%': typeof WeakMap > 'u' ? G : WeakMap,
    '%WeakRef%': typeof WeakRef > 'u' ? G : WeakRef,
    '%WeakSet%': typeof WeakSet > 'u' ? G : WeakSet,
  };
if (me)
  try {
    null.error;
  } catch (t) {
    var Zp = me(me(t));
    nr['%Error.prototype%'] = Zp;
  }
var Yp = function t(e) {
    var r;
    if (e === '%AsyncFunction%') r = wo('async function () {}');
    else if (e === '%GeneratorFunction%') r = wo('function* () {}');
    else if (e === '%AsyncGeneratorFunction%') r = wo('async function* () {}');
    else if (e === '%AsyncGenerator%') {
      var n = t('%AsyncGeneratorFunction%');
      n && (r = n.prototype);
    } else if (e === '%AsyncIteratorPrototype%') {
      var i = t('%AsyncGenerator%');
      i && me && (r = me(i.prototype));
    }
    return (nr[e] = r), r;
  },
  Lc = {
    '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
    '%ArrayPrototype%': ['Array', 'prototype'],
    '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
    '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
    '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
    '%ArrayProto_values%': ['Array', 'prototype', 'values'],
    '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
    '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
    '%AsyncGeneratorPrototype%': [
      'AsyncGeneratorFunction',
      'prototype',
      'prototype',
    ],
    '%BooleanPrototype%': ['Boolean', 'prototype'],
    '%DataViewPrototype%': ['DataView', 'prototype'],
    '%DatePrototype%': ['Date', 'prototype'],
    '%ErrorPrototype%': ['Error', 'prototype'],
    '%EvalErrorPrototype%': ['EvalError', 'prototype'],
    '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
    '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
    '%FunctionPrototype%': ['Function', 'prototype'],
    '%Generator%': ['GeneratorFunction', 'prototype'],
    '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
    '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
    '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
    '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
    '%JSONParse%': ['JSON', 'parse'],
    '%JSONStringify%': ['JSON', 'stringify'],
    '%MapPrototype%': ['Map', 'prototype'],
    '%NumberPrototype%': ['Number', 'prototype'],
    '%ObjectPrototype%': ['Object', 'prototype'],
    '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
    '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
    '%PromisePrototype%': ['Promise', 'prototype'],
    '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
    '%Promise_all%': ['Promise', 'all'],
    '%Promise_reject%': ['Promise', 'reject'],
    '%Promise_resolve%': ['Promise', 'resolve'],
    '%RangeErrorPrototype%': ['RangeError', 'prototype'],
    '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
    '%RegExpPrototype%': ['RegExp', 'prototype'],
    '%SetPrototype%': ['Set', 'prototype'],
    '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
    '%StringPrototype%': ['String', 'prototype'],
    '%SymbolPrototype%': ['Symbol', 'prototype'],
    '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
    '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
    '%TypeErrorPrototype%': ['TypeError', 'prototype'],
    '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
    '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
    '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
    '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
    '%URIErrorPrototype%': ['URIError', 'prototype'],
    '%WeakMapPrototype%': ['WeakMap', 'prototype'],
    '%WeakSetPrototype%': ['WeakSet', 'prototype'],
  },
  On = Ra,
  pi = qp,
  Kp = On.call(Function.call, Array.prototype.concat),
  Xp = On.call(Function.apply, Array.prototype.splice),
  Pc = On.call(Function.call, String.prototype.replace),
  bi = On.call(Function.call, String.prototype.slice),
  e0 = On.call(Function.call, RegExp.prototype.exec),
  t0 =
    /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
  r0 = /\\(\\)?/g,
  n0 = function (e) {
    var r = bi(e, 0, 1),
      n = bi(e, -1);
    if (r === '%' && n !== '%')
      throw new Pr('invalid intrinsic syntax, expected closing `%`');
    if (n === '%' && r !== '%')
      throw new Pr('invalid intrinsic syntax, expected opening `%`');
    var i = [];
    return (
      Pc(e, t0, function (s, o, a, c) {
        i[i.length] = a ? Pc(c, r0, '$1') : o || s;
      }),
      i
    );
  },
  i0 = function (e, r) {
    var n = e,
      i;
    if ((pi(Lc, n) && ((i = Lc[n]), (n = '%' + i[0] + '%')), pi(nr, n))) {
      var s = nr[n];
      if ((s === xr && (s = Yp(n)), typeof s > 'u' && !r))
        throw new Ar(
          'intrinsic ' +
            e +
            ' exists, but is not available. Please file an issue!'
        );
      return { alias: i, name: n, value: s };
    }
    throw new Pr('intrinsic ' + e + ' does not exist!');
  },
  fr = function (e, r) {
    if (typeof e != 'string' || e.length === 0)
      throw new Ar('intrinsic name must be a non-empty string');
    if (arguments.length > 1 && typeof r != 'boolean')
      throw new Ar('"allowMissing" argument must be a boolean');
    if (e0(/^%?[^%]*%?$/, e) === null)
      throw new Pr(
        '`%` may not be present anywhere but at the beginning and end of the intrinsic name'
      );
    var n = n0(e),
      i = n.length > 0 ? n[0] : '',
      s = i0('%' + i + '%', r),
      o = s.name,
      a = s.value,
      c = !1,
      u = s.alias;
    u && ((i = u[0]), Xp(n, Kp([0, 1], u)));
    for (var l = 1, f = !0; l < n.length; l += 1) {
      var h = n[l],
        y = bi(h, 0, 1),
        _ = bi(h, -1);
      if (
        (y === '"' ||
          y === "'" ||
          y === '`' ||
          _ === '"' ||
          _ === "'" ||
          _ === '`') &&
        y !== _
      )
        throw new Pr('property names with quotes must have matching quotes');
      if (
        ((h === 'constructor' || !f) && (c = !0),
        (i += '.' + h),
        (o = '%' + i + '%'),
        pi(nr, o))
      )
        a = nr[o];
      else if (a != null) {
        if (!(h in a)) {
          if (!r)
            throw new Ar(
              'base intrinsic for ' +
                e +
                ' exists, but the property is not available.'
            );
          return;
        }
        if (rr && l + 1 >= n.length) {
          var x = rr(a, h);
          (f = !!x),
            f && 'get' in x && !('originalValue' in x.get)
              ? (a = x.get)
              : (a = a[h]);
        } else (f = pi(a, h)), (a = a[h]);
        f && !c && (nr[o] = a);
      }
    }
    return a;
  },
  Nl = { exports: {} },
  s0 = fr,
  na = s0('%Object.defineProperty%', !0),
  ia = function () {
    if (na)
      try {
        return na({}, 'a', { value: 1 }), !0;
      } catch {
        return !1;
      }
    return !1;
  };
ia.hasArrayLengthDefineBug = function () {
  if (!ia()) return null;
  try {
    return na([], 'length', { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Ll = ia,
  o0 = fr,
  ci = o0('%Object.getOwnPropertyDescriptor%', !0);
if (ci)
  try {
    ci([], 'length');
  } catch {
    ci = null;
  }
var Pl = ci,
  a0 = Ll(),
  Aa = fr,
  pn = a0 && Aa('%Object.defineProperty%', !0);
if (pn)
  try {
    pn({}, 'a', { value: 1 });
  } catch {
    pn = !1;
  }
var c0 = Aa('%SyntaxError%'),
  _r = Aa('%TypeError%'),
  Dc = Pl,
  u0 = function (e, r, n) {
    if (!e || (typeof e != 'object' && typeof e != 'function'))
      throw new _r('`obj` must be an object or a function`');
    if (typeof r != 'string' && typeof r != 'symbol')
      throw new _r('`property` must be a string or a symbol`');
    if (
      arguments.length > 3 &&
      typeof arguments[3] != 'boolean' &&
      arguments[3] !== null
    )
      throw new _r('`nonEnumerable`, if provided, must be a boolean or null');
    if (
      arguments.length > 4 &&
      typeof arguments[4] != 'boolean' &&
      arguments[4] !== null
    )
      throw new _r('`nonWritable`, if provided, must be a boolean or null');
    if (
      arguments.length > 5 &&
      typeof arguments[5] != 'boolean' &&
      arguments[5] !== null
    )
      throw new _r('`nonConfigurable`, if provided, must be a boolean or null');
    if (arguments.length > 6 && typeof arguments[6] != 'boolean')
      throw new _r('`loose`, if provided, must be a boolean');
    var i = arguments.length > 3 ? arguments[3] : null,
      s = arguments.length > 4 ? arguments[4] : null,
      o = arguments.length > 5 ? arguments[5] : null,
      a = arguments.length > 6 ? arguments[6] : !1,
      c = !!Dc && Dc(e, r);
    if (pn)
      pn(e, r, {
        configurable: o === null && c ? c.configurable : !o,
        enumerable: i === null && c ? c.enumerable : !i,
        value: n,
        writable: s === null && c ? c.writable : !s,
      });
    else if (a || (!i && !s && !o)) e[r] = n;
    else
      throw new c0(
        'This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.'
      );
  },
  Dl = fr,
  Bc = u0,
  l0 = Ll(),
  jc = Pl,
  Fc = Dl('%TypeError%'),
  f0 = Dl('%Math.floor%'),
  h0 = function (e, r) {
    if (typeof e != 'function') throw new Fc('`fn` is not a function');
    if (typeof r != 'number' || r < 0 || r > 4294967295 || f0(r) !== r)
      throw new Fc('`length` must be a positive 32-bit integer');
    var n = arguments.length > 2 && !!arguments[2],
      i = !0,
      s = !0;
    if ('length' in e && jc) {
      var o = jc(e, 'length');
      o && !o.configurable && (i = !1), o && !o.writable && (s = !1);
    }
    return (
      (i || s || !n) && (l0 ? Bc(e, 'length', r, !0, !0) : Bc(e, 'length', r)),
      e
    );
  };
(function (t) {
  var e = Ra,
    r = fr,
    n = h0,
    i = r('%TypeError%'),
    s = r('%Function.prototype.apply%'),
    o = r('%Function.prototype.call%'),
    a = r('%Reflect.apply%', !0) || e.call(o, s),
    c = r('%Object.defineProperty%', !0),
    u = r('%Math.max%');
  if (c)
    try {
      c({}, 'a', { value: 1 });
    } catch {
      c = null;
    }
  t.exports = function (h) {
    if (typeof h != 'function') throw new i('a function is required');
    var y = a(e, o, arguments);
    return n(y, 1 + u(0, h.length - (arguments.length - 1)), !0);
  };
  var l = function () {
    return a(e, s, arguments);
  };
  c ? c(t.exports, 'apply', { value: l }) : (t.exports.apply = l);
})(Nl);
var d0 = Nl.exports,
  Bl = fr,
  jl = d0,
  p0 = jl(Bl('String.prototype.indexOf')),
  b0 = function (e, r) {
    var n = Bl(e, !!r);
    return typeof n == 'function' && p0(e, '.prototype.') > -1 ? jl(n) : n;
  },
  Ta = typeof Map == 'function' && Map.prototype,
  So =
    Object.getOwnPropertyDescriptor && Ta
      ? Object.getOwnPropertyDescriptor(Map.prototype, 'size')
      : null,
  gi = Ta && So && typeof So.get == 'function' ? So.get : null,
  $c = Ta && Map.prototype.forEach,
  Oa = typeof Set == 'function' && Set.prototype,
  Eo =
    Object.getOwnPropertyDescriptor && Oa
      ? Object.getOwnPropertyDescriptor(Set.prototype, 'size')
      : null,
  yi = Oa && Eo && typeof Eo.get == 'function' ? Eo.get : null,
  Wc = Oa && Set.prototype.forEach,
  g0 = typeof WeakMap == 'function' && WeakMap.prototype,
  bn = g0 ? WeakMap.prototype.has : null,
  y0 = typeof WeakSet == 'function' && WeakSet.prototype,
  gn = y0 ? WeakSet.prototype.has : null,
  v0 = typeof WeakRef == 'function' && WeakRef.prototype,
  Hc = v0 ? WeakRef.prototype.deref : null,
  m0 = Boolean.prototype.valueOf,
  w0 = Object.prototype.toString,
  _0 = Function.prototype.toString,
  S0 = String.prototype.match,
  Na = String.prototype.slice,
  jt = String.prototype.replace,
  E0 = String.prototype.toUpperCase,
  Vc = String.prototype.toLowerCase,
  Fl = RegExp.prototype.test,
  Uc = Array.prototype.concat,
  ht = Array.prototype.join,
  C0 = Array.prototype.slice,
  zc = Math.floor,
  sa = typeof BigInt == 'function' ? BigInt.prototype.valueOf : null,
  Co = Object.getOwnPropertySymbols,
  oa =
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? Symbol.prototype.toString
      : null,
  Dr = typeof Symbol == 'function' && typeof Symbol.iterator == 'object',
  Me =
    typeof Symbol == 'function' &&
    Symbol.toStringTag &&
    (typeof Symbol.toStringTag === Dr || 'symbol')
      ? Symbol.toStringTag
      : null,
  $l = Object.prototype.propertyIsEnumerable,
  qc =
    (typeof Reflect == 'function'
      ? Reflect.getPrototypeOf
      : Object.getPrototypeOf) ||
    ([].__proto__ === Array.prototype
      ? function (t) {
          return t.__proto__;
        }
      : null);
function Jc(t, e) {
  if (
    t === 1 / 0 ||
    t === -1 / 0 ||
    t !== t ||
    (t && t > -1e3 && t < 1e3) ||
    Fl.call(/e/, e)
  )
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == 'number') {
    var n = t < 0 ? -zc(-t) : zc(t);
    if (n !== t) {
      var i = String(n),
        s = Na.call(e, i.length + 1);
      return (
        jt.call(i, r, '$&_') +
        '.' +
        jt.call(jt.call(s, /([0-9]{3})/g, '$&_'), /_$/, '')
      );
    }
  }
  return jt.call(e, r, '$&_');
}
var aa = Ca,
  Gc = aa.custom,
  Qc = Hl(Gc) ? Gc : null,
  x0 = function t(e, r, n, i) {
    var s = r || {};
    if (
      Pt(s, 'quoteStyle') &&
      s.quoteStyle !== 'single' &&
      s.quoteStyle !== 'double'
    )
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (
      Pt(s, 'maxStringLength') &&
      (typeof s.maxStringLength == 'number'
        ? s.maxStringLength < 0 && s.maxStringLength !== 1 / 0
        : s.maxStringLength !== null)
    )
      throw new TypeError(
        'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
      );
    var o = Pt(s, 'customInspect') ? s.customInspect : !0;
    if (typeof o != 'boolean' && o !== 'symbol')
      throw new TypeError(
        'option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`'
      );
    if (
      Pt(s, 'indent') &&
      s.indent !== null &&
      s.indent !== '	' &&
      !(parseInt(s.indent, 10) === s.indent && s.indent > 0)
    )
      throw new TypeError(
        'option "indent" must be "\\t", an integer > 0, or `null`'
      );
    if (Pt(s, 'numericSeparator') && typeof s.numericSeparator != 'boolean')
      throw new TypeError(
        'option "numericSeparator", if provided, must be `true` or `false`'
      );
    var a = s.numericSeparator;
    if (typeof e > 'u') return 'undefined';
    if (e === null) return 'null';
    if (typeof e == 'boolean') return e ? 'true' : 'false';
    if (typeof e == 'string') return Ul(e, s);
    if (typeof e == 'number') {
      if (e === 0) return 1 / 0 / e > 0 ? '0' : '-0';
      var c = String(e);
      return a ? Jc(e, c) : c;
    }
    if (typeof e == 'bigint') {
      var u = String(e) + 'n';
      return a ? Jc(e, u) : u;
    }
    var l = typeof s.depth > 'u' ? 5 : s.depth;
    if ((typeof n > 'u' && (n = 0), n >= l && l > 0 && typeof e == 'object'))
      return ca(e) ? '[Array]' : '[Object]';
    var f = V0(s, n);
    if (typeof i > 'u') i = [];
    else if (Vl(i, e) >= 0) return '[Circular]';
    function h(J, te, se) {
      if ((te && ((i = C0.call(i)), i.push(te)), se)) {
        var pe = { depth: s.depth };
        return (
          Pt(s, 'quoteStyle') && (pe.quoteStyle = s.quoteStyle),
          t(J, pe, n + 1, i)
        );
      }
      return t(J, s, n + 1, i);
    }
    if (typeof e == 'function' && !Zc(e)) {
      var y = L0(e),
        _ = Yn(e, h);
      return (
        '[Function' +
        (y ? ': ' + y : ' (anonymous)') +
        ']' +
        (_.length > 0 ? ' { ' + ht.call(_, ', ') + ' }' : '')
      );
    }
    if (Hl(e)) {
      var x = Dr
        ? jt.call(String(e), /^(Symbol\(.*\))_[^)]*$/, '$1')
        : oa.call(e);
      return typeof e == 'object' && !Dr ? ln(x) : x;
    }
    if ($0(e)) {
      for (
        var E = '<' + Vc.call(String(e.nodeName)),
          b = e.attributes || [],
          g = 0;
        g < b.length;
        g++
      )
        E += ' ' + b[g].name + '=' + Wl(I0(b[g].value), 'double', s);
      return (
        (E += '>'),
        e.childNodes && e.childNodes.length && (E += '...'),
        (E += '</' + Vc.call(String(e.nodeName)) + '>'),
        E
      );
    }
    if (ca(e)) {
      if (e.length === 0) return '[]';
      var w = Yn(e, h);
      return f && !H0(w)
        ? '[' + ua(w, f) + ']'
        : '[ ' + ht.call(w, ', ') + ' ]';
    }
    if (M0(e)) {
      var C = Yn(e, h);
      return !('cause' in Error.prototype) &&
        'cause' in e &&
        !$l.call(e, 'cause')
        ? '{ [' +
            String(e) +
            '] ' +
            ht.call(Uc.call('[cause]: ' + h(e.cause), C), ', ') +
            ' }'
        : C.length === 0
          ? '[' + String(e) + ']'
          : '{ [' + String(e) + '] ' + ht.call(C, ', ') + ' }';
    }
    if (typeof e == 'object' && o) {
      if (Qc && typeof e[Qc] == 'function' && aa)
        return aa(e, { depth: l - n });
      if (o !== 'symbol' && typeof e.inspect == 'function') return e.inspect();
    }
    if (P0(e)) {
      var S = [];
      return (
        $c &&
          $c.call(e, function (J, te) {
            S.push(h(te, e, !0) + ' => ' + h(J, e));
          }),
        Yc('Map', gi.call(e), S, f)
      );
    }
    if (j0(e)) {
      var M = [];
      return (
        Wc &&
          Wc.call(e, function (J) {
            M.push(h(J, e));
          }),
        Yc('Set', yi.call(e), M, f)
      );
    }
    if (D0(e)) return xo('WeakMap');
    if (F0(e)) return xo('WeakSet');
    if (B0(e)) return xo('WeakRef');
    if (A0(e)) return ln(h(Number(e)));
    if (O0(e)) return ln(h(sa.call(e)));
    if (T0(e)) return ln(m0.call(e));
    if (R0(e)) return ln(h(String(e)));
    if (typeof window < 'u' && e === window) return '{ [object Window] }';
    if (e === O) return '{ [object globalThis] }';
    if (!k0(e) && !Zc(e)) {
      var P = Yn(e, h),
        N = qc
          ? qc(e) === Object.prototype
          : e instanceof Object || e.constructor === Object,
        A = e instanceof Object ? '' : 'null prototype',
        F =
          !N && Me && Object(e) === e && Me in e
            ? Na.call(qt(e), 8, -1)
            : A
              ? 'Object'
              : '',
        K =
          N || typeof e.constructor != 'function'
            ? ''
            : e.constructor.name
              ? e.constructor.name + ' '
              : '',
        W =
          K +
          (F || A
            ? '[' + ht.call(Uc.call([], F || [], A || []), ': ') + '] '
            : '');
      return P.length === 0
        ? W + '{}'
        : f
          ? W + '{' + ua(P, f) + '}'
          : W + '{ ' + ht.call(P, ', ') + ' }';
    }
    return String(e);
  };
function Wl(t, e, r) {
  var n = (r.quoteStyle || e) === 'double' ? '"' : "'";
  return n + t + n;
}
function I0(t) {
  return jt.call(String(t), /"/g, '&quot;');
}
function ca(t) {
  return (
    qt(t) === '[object Array]' && (!Me || !(typeof t == 'object' && Me in t))
  );
}
function k0(t) {
  return (
    qt(t) === '[object Date]' && (!Me || !(typeof t == 'object' && Me in t))
  );
}
function Zc(t) {
  return (
    qt(t) === '[object RegExp]' && (!Me || !(typeof t == 'object' && Me in t))
  );
}
function M0(t) {
  return (
    qt(t) === '[object Error]' && (!Me || !(typeof t == 'object' && Me in t))
  );
}
function R0(t) {
  return (
    qt(t) === '[object String]' && (!Me || !(typeof t == 'object' && Me in t))
  );
}
function A0(t) {
  return (
    qt(t) === '[object Number]' && (!Me || !(typeof t == 'object' && Me in t))
  );
}
function T0(t) {
  return (
    qt(t) === '[object Boolean]' && (!Me || !(typeof t == 'object' && Me in t))
  );
}
function Hl(t) {
  if (Dr) return t && typeof t == 'object' && t instanceof Symbol;
  if (typeof t == 'symbol') return !0;
  if (!t || typeof t != 'object' || !oa) return !1;
  try {
    return oa.call(t), !0;
  } catch {}
  return !1;
}
function O0(t) {
  if (!t || typeof t != 'object' || !sa) return !1;
  try {
    return sa.call(t), !0;
  } catch {}
  return !1;
}
var N0 =
  Object.prototype.hasOwnProperty ||
  function (t) {
    return t in this;
  };
function Pt(t, e) {
  return N0.call(t, e);
}
function qt(t) {
  return w0.call(t);
}
function L0(t) {
  if (t.name) return t.name;
  var e = S0.call(_0.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function Vl(t, e) {
  if (t.indexOf) return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
  return -1;
}
function P0(t) {
  if (!gi || !t || typeof t != 'object') return !1;
  try {
    gi.call(t);
    try {
      yi.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {}
  return !1;
}
function D0(t) {
  if (!bn || !t || typeof t != 'object') return !1;
  try {
    bn.call(t, bn);
    try {
      gn.call(t, gn);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {}
  return !1;
}
function B0(t) {
  if (!Hc || !t || typeof t != 'object') return !1;
  try {
    return Hc.call(t), !0;
  } catch {}
  return !1;
}
function j0(t) {
  if (!yi || !t || typeof t != 'object') return !1;
  try {
    yi.call(t);
    try {
      gi.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {}
  return !1;
}
function F0(t) {
  if (!gn || !t || typeof t != 'object') return !1;
  try {
    gn.call(t, gn);
    try {
      bn.call(t, bn);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {}
  return !1;
}
function $0(t) {
  return !t || typeof t != 'object'
    ? !1
    : typeof HTMLElement < 'u' && t instanceof HTMLElement
      ? !0
      : typeof t.nodeName == 'string' && typeof t.getAttribute == 'function';
}
function Ul(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength,
      n = '... ' + r + ' more character' + (r > 1 ? 's' : '');
    return Ul(Na.call(t, 0, e.maxStringLength), e) + n;
  }
  var i = jt.call(jt.call(t, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, W0);
  return Wl(i, 'single', e);
}
function W0(t) {
  var e = t.charCodeAt(0),
    r = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[e];
  return r ? '\\' + r : '\\x' + (e < 16 ? '0' : '') + E0.call(e.toString(16));
}
function ln(t) {
  return 'Object(' + t + ')';
}
function xo(t) {
  return t + ' { ? }';
}
function Yc(t, e, r, n) {
  var i = n ? ua(r, n) : ht.call(r, ', ');
  return t + ' (' + e + ') {' + i + '}';
}
function H0(t) {
  for (var e = 0; e < t.length; e++)
    if (
      Vl(
        t[e],
        `
`
      ) >= 0
    )
      return !1;
  return !0;
}
function V0(t, e) {
  var r;
  if (t.indent === '	') r = '	';
  else if (typeof t.indent == 'number' && t.indent > 0)
    r = ht.call(Array(t.indent + 1), ' ');
  else return null;
  return { base: r, prev: ht.call(Array(e + 1), r) };
}
function ua(t, e) {
  if (t.length === 0) return '';
  var r =
    `
` +
    e.prev +
    e.base;
  return (
    r +
    ht.call(t, ',' + r) +
    `
` +
    e.prev
  );
}
function Yn(t, e) {
  var r = ca(t),
    n = [];
  if (r) {
    n.length = t.length;
    for (var i = 0; i < t.length; i++) n[i] = Pt(t, i) ? e(t[i], t) : '';
  }
  var s = typeof Co == 'function' ? Co(t) : [],
    o;
  if (Dr) {
    o = {};
    for (var a = 0; a < s.length; a++) o['$' + s[a]] = s[a];
  }
  for (var c in t)
    Pt(t, c) &&
      ((r && String(Number(c)) === c && c < t.length) ||
        (Dr && o['$' + c] instanceof Symbol) ||
        (Fl.call(/[^\w$]/, c)
          ? n.push(e(c, t) + ': ' + e(t[c], t))
          : n.push(c + ': ' + e(t[c], t))));
  if (typeof Co == 'function')
    for (var u = 0; u < s.length; u++)
      $l.call(t, s[u]) && n.push('[' + e(s[u]) + ']: ' + e(t[s[u]], t));
  return n;
}
var La = fr,
  Kr = b0,
  U0 = x0,
  z0 = La('%TypeError%'),
  Kn = La('%WeakMap%', !0),
  Xn = La('%Map%', !0),
  q0 = Kr('WeakMap.prototype.get', !0),
  J0 = Kr('WeakMap.prototype.set', !0),
  G0 = Kr('WeakMap.prototype.has', !0),
  Q0 = Kr('Map.prototype.get', !0),
  Z0 = Kr('Map.prototype.set', !0),
  Y0 = Kr('Map.prototype.has', !0),
  Pa = function (t, e) {
    for (var r = t, n; (n = r.next) !== null; r = n)
      if (n.key === e)
        return (r.next = n.next), (n.next = t.next), (t.next = n), n;
  },
  K0 = function (t, e) {
    var r = Pa(t, e);
    return r && r.value;
  },
  X0 = function (t, e, r) {
    var n = Pa(t, e);
    n ? (n.value = r) : (t.next = { key: e, next: t.next, value: r });
  },
  eb = function (t, e) {
    return !!Pa(t, e);
  },
  tb = function () {
    var e,
      r,
      n,
      i = {
        assert: function (s) {
          if (!i.has(s)) throw new z0('Side channel does not contain ' + U0(s));
        },
        get: function (s) {
          if (Kn && s && (typeof s == 'object' || typeof s == 'function')) {
            if (e) return q0(e, s);
          } else if (Xn) {
            if (r) return Q0(r, s);
          } else if (n) return K0(n, s);
        },
        has: function (s) {
          if (Kn && s && (typeof s == 'object' || typeof s == 'function')) {
            if (e) return G0(e, s);
          } else if (Xn) {
            if (r) return Y0(r, s);
          } else if (n) return eb(n, s);
          return !1;
        },
        set: function (s, o) {
          Kn && s && (typeof s == 'object' || typeof s == 'function')
            ? (e || (e = new Kn()), J0(e, s, o))
            : Xn
              ? (r || (r = new Xn()), Z0(r, s, o))
              : (n || (n = { key: {}, next: null }), X0(n, s, o));
        },
      };
    return i;
  },
  rb = String.prototype.replace,
  nb = /%20/g,
  Io = { RFC1738: 'RFC1738', RFC3986: 'RFC3986' },
  Da = {
    default: Io.RFC3986,
    formatters: {
      RFC1738: function (t) {
        return rb.call(t, nb, '+');
      },
      RFC3986: function (t) {
        return String(t);
      },
    },
    RFC1738: Io.RFC1738,
    RFC3986: Io.RFC3986,
  },
  ib = Da,
  ko = Object.prototype.hasOwnProperty,
  Yt = Array.isArray,
  at = (function () {
    for (var t = [], e = 0; e < 256; ++e)
      t.push('%' + ((e < 16 ? '0' : '') + e.toString(16)).toUpperCase());
    return t;
  })(),
  sb = function (e) {
    for (; e.length > 1; ) {
      var r = e.pop(),
        n = r.obj[r.prop];
      if (Yt(n)) {
        for (var i = [], s = 0; s < n.length; ++s)
          typeof n[s] < 'u' && i.push(n[s]);
        r.obj[r.prop] = i;
      }
    }
  },
  zl = function (e, r) {
    for (
      var n = r && r.plainObjects ? Object.create(null) : {}, i = 0;
      i < e.length;
      ++i
    )
      typeof e[i] < 'u' && (n[i] = e[i]);
    return n;
  },
  ob = function t(e, r, n) {
    if (!r) return e;
    if (typeof r != 'object') {
      if (Yt(e)) e.push(r);
      else if (e && typeof e == 'object')
        ((n && (n.plainObjects || n.allowPrototypes)) ||
          !ko.call(Object.prototype, r)) &&
          (e[r] = !0);
      else return [e, r];
      return e;
    }
    if (!e || typeof e != 'object') return [e].concat(r);
    var i = e;
    return (
      Yt(e) && !Yt(r) && (i = zl(e, n)),
      Yt(e) && Yt(r)
        ? (r.forEach(function (s, o) {
            if (ko.call(e, o)) {
              var a = e[o];
              a && typeof a == 'object' && s && typeof s == 'object'
                ? (e[o] = t(a, s, n))
                : e.push(s);
            } else e[o] = s;
          }),
          e)
        : Object.keys(r).reduce(function (s, o) {
            var a = r[o];
            return ko.call(s, o) ? (s[o] = t(s[o], a, n)) : (s[o] = a), s;
          }, i)
    );
  },
  ab = function (e, r) {
    return Object.keys(r).reduce(function (n, i) {
      return (n[i] = r[i]), n;
    }, e);
  },
  cb = function (t, e, r) {
    var n = t.replace(/\+/g, ' ');
    if (r === 'iso-8859-1') return n.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(n);
    } catch {
      return n;
    }
  },
  ub = function (e, r, n, i, s) {
    if (e.length === 0) return e;
    var o = e;
    if (
      (typeof e == 'symbol'
        ? (o = Symbol.prototype.toString.call(e))
        : typeof e != 'string' && (o = String(e)),
      n === 'iso-8859-1')
    )
      return escape(o).replace(/%u[0-9a-f]{4}/gi, function (l) {
        return '%26%23' + parseInt(l.slice(2), 16) + '%3B';
      });
    for (var a = '', c = 0; c < o.length; ++c) {
      var u = o.charCodeAt(c);
      if (
        u === 45 ||
        u === 46 ||
        u === 95 ||
        u === 126 ||
        (u >= 48 && u <= 57) ||
        (u >= 65 && u <= 90) ||
        (u >= 97 && u <= 122) ||
        (s === ib.RFC1738 && (u === 40 || u === 41))
      ) {
        a += o.charAt(c);
        continue;
      }
      if (u < 128) {
        a = a + at[u];
        continue;
      }
      if (u < 2048) {
        a = a + (at[192 | (u >> 6)] + at[128 | (u & 63)]);
        continue;
      }
      if (u < 55296 || u >= 57344) {
        a =
          a +
          (at[224 | (u >> 12)] +
            at[128 | ((u >> 6) & 63)] +
            at[128 | (u & 63)]);
        continue;
      }
      (c += 1),
        (u = 65536 + (((u & 1023) << 10) | (o.charCodeAt(c) & 1023))),
        (a +=
          at[240 | (u >> 18)] +
          at[128 | ((u >> 12) & 63)] +
          at[128 | ((u >> 6) & 63)] +
          at[128 | (u & 63)]);
    }
    return a;
  },
  lb = function (e) {
    for (
      var r = [{ obj: { o: e }, prop: 'o' }], n = [], i = 0;
      i < r.length;
      ++i
    )
      for (
        var s = r[i], o = s.obj[s.prop], a = Object.keys(o), c = 0;
        c < a.length;
        ++c
      ) {
        var u = a[c],
          l = o[u];
        typeof l == 'object' &&
          l !== null &&
          n.indexOf(l) === -1 &&
          (r.push({ obj: o, prop: u }), n.push(l));
      }
    return sb(r), e;
  },
  fb = function (e) {
    return Object.prototype.toString.call(e) === '[object RegExp]';
  },
  hb = function (e) {
    return !e || typeof e != 'object'
      ? !1
      : !!(
          e.constructor &&
          e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
  },
  db = function (e, r) {
    return [].concat(e, r);
  },
  pb = function (e, r) {
    if (Yt(e)) {
      for (var n = [], i = 0; i < e.length; i += 1) n.push(r(e[i]));
      return n;
    }
    return r(e);
  },
  ql = {
    arrayToObject: zl,
    assign: ab,
    combine: db,
    compact: lb,
    decode: cb,
    encode: ub,
    isBuffer: hb,
    isRegExp: fb,
    maybeMap: pb,
    merge: ob,
  },
  Jl = tb,
  ui = ql,
  yn = Da,
  bb = Object.prototype.hasOwnProperty,
  Kc = {
    brackets: function (e) {
      return e + '[]';
    },
    comma: 'comma',
    indices: function (e, r) {
      return e + '[' + r + ']';
    },
    repeat: function (e) {
      return e;
    },
  },
  Ct = Array.isArray,
  gb = Array.prototype.push,
  Gl = function (t, e) {
    gb.apply(t, Ct(e) ? e : [e]);
  },
  yb = Date.prototype.toISOString,
  Xc = yn.default,
  ke = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: 'utf-8',
    charsetSentinel: !1,
    delimiter: '&',
    encode: !0,
    encoder: ui.encode,
    encodeValuesOnly: !1,
    format: Xc,
    formatter: yn.formatters[Xc],
    indices: !1,
    serializeDate: function (e) {
      return yb.call(e);
    },
    skipNulls: !1,
    strictNullHandling: !1,
  },
  vb = function (e) {
    return (
      typeof e == 'string' ||
      typeof e == 'number' ||
      typeof e == 'boolean' ||
      typeof e == 'symbol' ||
      typeof e == 'bigint'
    );
  },
  Mo = {},
  mb = function t(e, r, n, i, s, o, a, c, u, l, f, h, y, _, x, E) {
    for (var b = e, g = E, w = 0, C = !1; (g = g.get(Mo)) !== void 0 && !C; ) {
      var S = g.get(e);
      if (((w += 1), typeof S < 'u')) {
        if (S === w) throw new RangeError('Cyclic object value');
        C = !0;
      }
      typeof g.get(Mo) > 'u' && (w = 0);
    }
    if (
      (typeof c == 'function'
        ? (b = c(r, b))
        : b instanceof Date
          ? (b = f(b))
          : n === 'comma' &&
            Ct(b) &&
            (b = ui.maybeMap(b, function (pe) {
              return pe instanceof Date ? f(pe) : pe;
            })),
      b === null)
    ) {
      if (s) return a && !_ ? a(r, ke.encoder, x, 'key', h) : r;
      b = '';
    }
    if (vb(b) || ui.isBuffer(b)) {
      if (a) {
        var M = _ ? r : a(r, ke.encoder, x, 'key', h);
        return [y(M) + '=' + y(a(b, ke.encoder, x, 'value', h))];
      }
      return [y(r) + '=' + y(String(b))];
    }
    var P = [];
    if (typeof b > 'u') return P;
    var N;
    if (n === 'comma' && Ct(b))
      _ && a && (b = ui.maybeMap(b, a)),
        (N = [{ value: b.length > 0 ? b.join(',') || null : void 0 }]);
    else if (Ct(c)) N = c;
    else {
      var A = Object.keys(b);
      N = u ? A.sort(u) : A;
    }
    for (
      var F = i && Ct(b) && b.length === 1 ? r + '[]' : r, K = 0;
      K < N.length;
      ++K
    ) {
      var W = N[K],
        J = typeof W == 'object' && typeof W.value < 'u' ? W.value : b[W];
      if (!(o && J === null)) {
        var te = Ct(b)
          ? typeof n == 'function'
            ? n(F, W)
            : F
          : F + (l ? '.' + W : '[' + W + ']');
        E.set(e, w);
        var se = Jl();
        se.set(Mo, E),
          Gl(
            P,
            t(
              J,
              te,
              n,
              i,
              s,
              o,
              n === 'comma' && _ && Ct(b) ? null : a,
              c,
              u,
              l,
              f,
              h,
              y,
              _,
              x,
              se
            )
          );
      }
    }
    return P;
  },
  wb = function (e) {
    if (!e) return ke;
    if (
      e.encoder !== null &&
      typeof e.encoder < 'u' &&
      typeof e.encoder != 'function'
    )
      throw new TypeError('Encoder has to be a function.');
    var r = e.charset || ke.charset;
    if (
      typeof e.charset < 'u' &&
      e.charset !== 'utf-8' &&
      e.charset !== 'iso-8859-1'
    )
      throw new TypeError(
        'The charset option must be either utf-8, iso-8859-1, or undefined'
      );
    var n = yn.default;
    if (typeof e.format < 'u') {
      if (!bb.call(yn.formatters, e.format))
        throw new TypeError('Unknown format option provided.');
      n = e.format;
    }
    var i = yn.formatters[n],
      s = ke.filter;
    return (
      (typeof e.filter == 'function' || Ct(e.filter)) && (s = e.filter),
      {
        addQueryPrefix:
          typeof e.addQueryPrefix == 'boolean'
            ? e.addQueryPrefix
            : ke.addQueryPrefix,
        allowDots: typeof e.allowDots > 'u' ? ke.allowDots : !!e.allowDots,
        charset: r,
        charsetSentinel:
          typeof e.charsetSentinel == 'boolean'
            ? e.charsetSentinel
            : ke.charsetSentinel,
        delimiter: typeof e.delimiter > 'u' ? ke.delimiter : e.delimiter,
        encode: typeof e.encode == 'boolean' ? e.encode : ke.encode,
        encoder: typeof e.encoder == 'function' ? e.encoder : ke.encoder,
        encodeValuesOnly:
          typeof e.encodeValuesOnly == 'boolean'
            ? e.encodeValuesOnly
            : ke.encodeValuesOnly,
        filter: s,
        format: n,
        formatter: i,
        serializeDate:
          typeof e.serializeDate == 'function'
            ? e.serializeDate
            : ke.serializeDate,
        skipNulls: typeof e.skipNulls == 'boolean' ? e.skipNulls : ke.skipNulls,
        sort: typeof e.sort == 'function' ? e.sort : null,
        strictNullHandling:
          typeof e.strictNullHandling == 'boolean'
            ? e.strictNullHandling
            : ke.strictNullHandling,
      }
    );
  },
  _b = function (t, e) {
    var r = t,
      n = wb(e),
      i,
      s;
    typeof n.filter == 'function'
      ? ((s = n.filter), (r = s('', r)))
      : Ct(n.filter) && ((s = n.filter), (i = s));
    var o = [];
    if (typeof r != 'object' || r === null) return '';
    var a;
    e && e.arrayFormat in Kc
      ? (a = e.arrayFormat)
      : e && 'indices' in e
        ? (a = e.indices ? 'indices' : 'repeat')
        : (a = 'indices');
    var c = Kc[a];
    if (e && 'commaRoundTrip' in e && typeof e.commaRoundTrip != 'boolean')
      throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    var u = c === 'comma' && e && e.commaRoundTrip;
    i || (i = Object.keys(r)), n.sort && i.sort(n.sort);
    for (var l = Jl(), f = 0; f < i.length; ++f) {
      var h = i[f];
      (n.skipNulls && r[h] === null) ||
        Gl(
          o,
          mb(
            r[h],
            h,
            c,
            u,
            n.strictNullHandling,
            n.skipNulls,
            n.encode ? n.encoder : null,
            n.filter,
            n.sort,
            n.allowDots,
            n.serializeDate,
            n.format,
            n.formatter,
            n.encodeValuesOnly,
            n.charset,
            l
          )
        );
    }
    var y = o.join(n.delimiter),
      _ = n.addQueryPrefix === !0 ? '?' : '';
    return (
      n.charsetSentinel &&
        (n.charset === 'iso-8859-1'
          ? (_ += 'utf8=%26%2310003%3B&')
          : (_ += 'utf8=%E2%9C%93&')),
      y.length > 0 ? _ + y : ''
    );
  },
  Br = ql,
  la = Object.prototype.hasOwnProperty,
  Sb = Array.isArray,
  ve = {
    allowDots: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: !1,
    comma: !1,
    decoder: Br.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1,
  },
  Eb = function (t) {
    return t.replace(/&#(\d+);/g, function (e, r) {
      return String.fromCharCode(parseInt(r, 10));
    });
  },
  Ql = function (t, e) {
    return t && typeof t == 'string' && e.comma && t.indexOf(',') > -1
      ? t.split(',')
      : t;
  },
  Cb = 'utf8=%26%2310003%3B',
  xb = 'utf8=%E2%9C%93',
  Ib = function (e, r) {
    var n = { __proto__: null },
      i = r.ignoreQueryPrefix ? e.replace(/^\?/, '') : e,
      s = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit,
      o = i.split(r.delimiter, s),
      a = -1,
      c,
      u = r.charset;
    if (r.charsetSentinel)
      for (c = 0; c < o.length; ++c)
        o[c].indexOf('utf8=') === 0 &&
          (o[c] === xb ? (u = 'utf-8') : o[c] === Cb && (u = 'iso-8859-1'),
          (a = c),
          (c = o.length));
    for (c = 0; c < o.length; ++c)
      if (c !== a) {
        var l = o[c],
          f = l.indexOf(']='),
          h = f === -1 ? l.indexOf('=') : f + 1,
          y,
          _;
        h === -1
          ? ((y = r.decoder(l, ve.decoder, u, 'key')),
            (_ = r.strictNullHandling ? null : ''))
          : ((y = r.decoder(l.slice(0, h), ve.decoder, u, 'key')),
            (_ = Br.maybeMap(Ql(l.slice(h + 1), r), function (x) {
              return r.decoder(x, ve.decoder, u, 'value');
            }))),
          _ && r.interpretNumericEntities && u === 'iso-8859-1' && (_ = Eb(_)),
          l.indexOf('[]=') > -1 && (_ = Sb(_) ? [_] : _),
          la.call(n, y) ? (n[y] = Br.combine(n[y], _)) : (n[y] = _);
      }
    return n;
  },
  kb = function (t, e, r, n) {
    for (var i = n ? e : Ql(e, r), s = t.length - 1; s >= 0; --s) {
      var o,
        a = t[s];
      if (a === '[]' && r.parseArrays) o = [].concat(i);
      else {
        o = r.plainObjects ? Object.create(null) : {};
        var c =
            a.charAt(0) === '[' && a.charAt(a.length - 1) === ']'
              ? a.slice(1, -1)
              : a,
          u = parseInt(c, 10);
        !r.parseArrays && c === ''
          ? (o = { 0: i })
          : !isNaN(u) &&
              a !== c &&
              String(u) === c &&
              u >= 0 &&
              r.parseArrays &&
              u <= r.arrayLimit
            ? ((o = []), (o[u] = i))
            : c !== '__proto__' && (o[c] = i);
      }
      i = o;
    }
    return i;
  },
  Mb = function (e, r, n, i) {
    if (e) {
      var s = n.allowDots ? e.replace(/\.([^.[]+)/g, '[$1]') : e,
        o = /(\[[^[\]]*])/,
        a = /(\[[^[\]]*])/g,
        c = n.depth > 0 && o.exec(s),
        u = c ? s.slice(0, c.index) : s,
        l = [];
      if (u) {
        if (
          !n.plainObjects &&
          la.call(Object.prototype, u) &&
          !n.allowPrototypes
        )
          return;
        l.push(u);
      }
      for (
        var f = 0;
        n.depth > 0 && (c = a.exec(s)) !== null && f < n.depth;

      ) {
        if (
          ((f += 1),
          !n.plainObjects &&
            la.call(Object.prototype, c[1].slice(1, -1)) &&
            !n.allowPrototypes)
        )
          return;
        l.push(c[1]);
      }
      return c && l.push('[' + s.slice(c.index) + ']'), kb(l, r, n, i);
    }
  },
  Rb = function (e) {
    if (!e) return ve;
    if (
      e.decoder !== null &&
      e.decoder !== void 0 &&
      typeof e.decoder != 'function'
    )
      throw new TypeError('Decoder has to be a function.');
    if (
      typeof e.charset < 'u' &&
      e.charset !== 'utf-8' &&
      e.charset !== 'iso-8859-1'
    )
      throw new TypeError(
        'The charset option must be either utf-8, iso-8859-1, or undefined'
      );
    var r = typeof e.charset > 'u' ? ve.charset : e.charset;
    return {
      allowDots: typeof e.allowDots > 'u' ? ve.allowDots : !!e.allowDots,
      allowPrototypes:
        typeof e.allowPrototypes == 'boolean'
          ? e.allowPrototypes
          : ve.allowPrototypes,
      allowSparse:
        typeof e.allowSparse == 'boolean' ? e.allowSparse : ve.allowSparse,
      arrayLimit:
        typeof e.arrayLimit == 'number' ? e.arrayLimit : ve.arrayLimit,
      charset: r,
      charsetSentinel:
        typeof e.charsetSentinel == 'boolean'
          ? e.charsetSentinel
          : ve.charsetSentinel,
      comma: typeof e.comma == 'boolean' ? e.comma : ve.comma,
      decoder: typeof e.decoder == 'function' ? e.decoder : ve.decoder,
      delimiter:
        typeof e.delimiter == 'string' || Br.isRegExp(e.delimiter)
          ? e.delimiter
          : ve.delimiter,
      depth: typeof e.depth == 'number' || e.depth === !1 ? +e.depth : ve.depth,
      ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
      interpretNumericEntities:
        typeof e.interpretNumericEntities == 'boolean'
          ? e.interpretNumericEntities
          : ve.interpretNumericEntities,
      parameterLimit:
        typeof e.parameterLimit == 'number'
          ? e.parameterLimit
          : ve.parameterLimit,
      parseArrays: e.parseArrays !== !1,
      plainObjects:
        typeof e.plainObjects == 'boolean' ? e.plainObjects : ve.plainObjects,
      strictNullHandling:
        typeof e.strictNullHandling == 'boolean'
          ? e.strictNullHandling
          : ve.strictNullHandling,
    };
  },
  Ab = function (t, e) {
    var r = Rb(e);
    if (t === '' || t === null || typeof t > 'u')
      return r.plainObjects ? Object.create(null) : {};
    for (
      var n = typeof t == 'string' ? Ib(t, r) : t,
        i = r.plainObjects ? Object.create(null) : {},
        s = Object.keys(n),
        o = 0;
      o < s.length;
      ++o
    ) {
      var a = s[o],
        c = Mb(a, n[a], r, typeof t == 'string');
      i = Br.merge(i, c, r);
    }
    return r.allowSparse === !0 ? i : Br.compact(i);
  },
  Tb = _b,
  Ob = Ab,
  Nb = Da,
  Lb = { formats: Nb, parse: Ob, stringify: Tb },
  Nn = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.ProviderType =
      t.RegExpString =
      t.IntNumber =
      t.BigIntString =
      t.AddressString =
      t.HexString =
      t.OpaqueType =
        void 0);
  function e() {
    return (n) => n;
  }
  (t.OpaqueType = e),
    (t.HexString = e()),
    (t.AddressString = e()),
    (t.BigIntString = e());
  function r(n) {
    return Math.floor(n);
  }
  (t.IntNumber = r),
    (t.RegExpString = e()),
    (function (n) {
      (n.CoinbaseWallet = 'CoinbaseWallet'),
        (n.MetaMask = 'MetaMask'),
        (n.Unselected = '');
    })(t.ProviderType || (t.ProviderType = {}));
})(Nn);
var Pb =
  (O && O.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(L, '__esModule', { value: !0 });
L.isInIFrame =
  L.createQrUrl =
  L.getFavicon =
  L.range =
  L.isBigNumber =
  L.ensureParsedJSONObject =
  L.ensureBN =
  L.ensureRegExpString =
  L.ensureIntNumber =
  L.ensureBuffer =
  L.ensureAddressString =
  L.ensureEvenLengthHexString =
  L.ensureHexString =
  L.isHexString =
  L.prepend0x =
  L.strip0x =
  L.has0xPrefix =
  L.hexStringFromIntNumber =
  L.intNumberFromHexString =
  L.bigIntStringFromBN =
  L.hexStringFromBuffer =
  L.hexStringToUint8Array =
  L.uint8ArrayToHex =
  L.randomBytesHex =
    void 0;
const Dt = Pb(Ii),
  Db = Lb,
  hr = kn,
  Ge = Nn,
  Zl = /^[0-9]*$/,
  Yl = /^[a-f0-9]*$/;
function Bb(t) {
  return Kl(crypto.getRandomValues(new Uint8Array(t)));
}
L.randomBytesHex = Bb;
function Kl(t) {
  return [...t].map((e) => e.toString(16).padStart(2, '0')).join('');
}
L.uint8ArrayToHex = Kl;
function jb(t) {
  return new Uint8Array(t.match(/.{1,2}/g).map((e) => parseInt(e, 16)));
}
L.hexStringToUint8Array = jb;
function Fb(t, e = !1) {
  const r = t.toString('hex');
  return (0, Ge.HexString)(e ? '0x' + r : r);
}
L.hexStringFromBuffer = Fb;
function $b(t) {
  return (0, Ge.BigIntString)(t.toString(10));
}
L.bigIntStringFromBN = $b;
function Wb(t) {
  return (0, Ge.IntNumber)(new Dt.default(Pn(t, !1), 16).toNumber());
}
L.intNumberFromHexString = Wb;
function Hb(t) {
  return (0, Ge.HexString)('0x' + new Dt.default(t).toString(16));
}
L.hexStringFromIntNumber = Hb;
function Ba(t) {
  return t.startsWith('0x') || t.startsWith('0X');
}
L.has0xPrefix = Ba;
function Pi(t) {
  return Ba(t) ? t.slice(2) : t;
}
L.strip0x = Pi;
function Xl(t) {
  return Ba(t) ? '0x' + t.slice(2) : '0x' + t;
}
L.prepend0x = Xl;
function Ln(t) {
  if (typeof t != 'string') return !1;
  const e = Pi(t).toLowerCase();
  return Yl.test(e);
}
L.isHexString = Ln;
function ef(t, e = !1) {
  if (typeof t == 'string') {
    const r = Pi(t).toLowerCase();
    if (Yl.test(r)) return (0, Ge.HexString)(e ? '0x' + r : r);
  }
  throw hr.standardErrors.rpc.invalidParams(
    `"${String(t)}" is not a hexadecimal string`
  );
}
L.ensureHexString = ef;
function Pn(t, e = !1) {
  let r = ef(t, !1);
  return (
    r.length % 2 === 1 && (r = (0, Ge.HexString)('0' + r)),
    e ? (0, Ge.HexString)('0x' + r) : r
  );
}
L.ensureEvenLengthHexString = Pn;
function Vb(t) {
  if (typeof t == 'string') {
    const e = Pi(t).toLowerCase();
    if (Ln(e) && e.length === 40) return (0, Ge.AddressString)(Xl(e));
  }
  throw hr.standardErrors.rpc.invalidParams(
    `Invalid Ethereum address: ${String(t)}`
  );
}
L.ensureAddressString = Vb;
function Ub(t) {
  if (Buffer.isBuffer(t)) return t;
  if (typeof t == 'string')
    if (Ln(t)) {
      const e = Pn(t, !1);
      return Buffer.from(e, 'hex');
    } else return Buffer.from(t, 'utf8');
  throw hr.standardErrors.rpc.invalidParams(`Not binary data: ${String(t)}`);
}
L.ensureBuffer = Ub;
function tf(t) {
  if (typeof t == 'number' && Number.isInteger(t)) return (0, Ge.IntNumber)(t);
  if (typeof t == 'string') {
    if (Zl.test(t)) return (0, Ge.IntNumber)(Number(t));
    if (Ln(t))
      return (0, Ge.IntNumber)(new Dt.default(Pn(t, !1), 16).toNumber());
  }
  throw hr.standardErrors.rpc.invalidParams(`Not an integer: ${String(t)}`);
}
L.ensureIntNumber = tf;
function zb(t) {
  if (t instanceof RegExp) return (0, Ge.RegExpString)(t.toString());
  throw hr.standardErrors.rpc.invalidParams(`Not a RegExp: ${String(t)}`);
}
L.ensureRegExpString = zb;
function qb(t) {
  if (t !== null && (Dt.default.isBN(t) || rf(t)))
    return new Dt.default(t.toString(10), 10);
  if (typeof t == 'number') return new Dt.default(tf(t));
  if (typeof t == 'string') {
    if (Zl.test(t)) return new Dt.default(t, 10);
    if (Ln(t)) return new Dt.default(Pn(t, !1), 16);
  }
  throw hr.standardErrors.rpc.invalidParams(`Not an integer: ${String(t)}`);
}
L.ensureBN = qb;
function Jb(t) {
  if (typeof t == 'string') return JSON.parse(t);
  if (typeof t == 'object') return t;
  throw hr.standardErrors.rpc.invalidParams(
    `Not a JSON string or an object: ${String(t)}`
  );
}
L.ensureParsedJSONObject = Jb;
function rf(t) {
  if (t == null || typeof t.constructor != 'function') return !1;
  const { constructor: e } = t;
  return typeof e.config == 'function' && typeof e.EUCLID == 'number';
}
L.isBigNumber = rf;
function Gb(t, e) {
  return Array.from({ length: e - t }, (r, n) => t + n);
}
L.range = Gb;
function Qb() {
  const t =
      document.querySelector('link[sizes="192x192"]') ||
      document.querySelector('link[sizes="180x180"]') ||
      document.querySelector('link[rel="icon"]') ||
      document.querySelector('link[rel="shortcut icon"]'),
    { protocol: e, host: r } = document.location,
    n = t ? t.getAttribute('href') : null;
  return !n || n.startsWith('javascript:')
    ? null
    : n.startsWith('http://') ||
        n.startsWith('https://') ||
        n.startsWith('data:')
      ? n
      : n.startsWith('//')
        ? e + n
        : `${e}//${r}${n}`;
}
L.getFavicon = Qb;
function Zb(t, e, r, n, i, s) {
  const o = n ? 'parent-id' : 'id',
    a = (0, Db.stringify)({ [o]: t, secret: e, server: r, v: i, chainId: s });
  return `${r}/#/link?${a}`;
}
L.createQrUrl = Zb;
function Yb() {
  try {
    return window.frameElement !== null;
  } catch {
    return !1;
  }
}
L.isInIFrame = Yb;
Object.defineProperty(Zr, '__esModule', { value: !0 });
Zr.Session = void 0;
const eu = Rp,
  tu = L,
  ru = 'session:id',
  nu = 'session:secret',
  iu = 'session:linked';
class ja {
  constructor(e, r, n, i) {
    (this._storage = e),
      (this._id = r || (0, tu.randomBytesHex)(16)),
      (this._secret = n || (0, tu.randomBytesHex)(32)),
      (this._key = new eu.sha256()
        .update(`${this._id}, ${this._secret} WalletLink`)
        .digest('hex')),
      (this._linked = !!i);
  }
  static load(e) {
    const r = e.getItem(ru),
      n = e.getItem(iu),
      i = e.getItem(nu);
    return r && i ? new ja(e, r, i, n === '1') : null;
  }
  static hash(e) {
    return new eu.sha256().update(e).digest('hex');
  }
  get id() {
    return this._id;
  }
  get secret() {
    return this._secret;
  }
  get key() {
    return this._key;
  }
  get linked() {
    return this._linked;
  }
  set linked(e) {
    (this._linked = e), this.persistLinked();
  }
  save() {
    return (
      this._storage.setItem(ru, this._id),
      this._storage.setItem(nu, this._secret),
      this.persistLinked(),
      this
    );
  }
  persistLinked() {
    this._storage.setItem(iu, this._linked ? '1' : '0');
  }
}
Zr.Session = ja;
var it = {};
Object.defineProperty(it, '__esModule', { value: !0 });
it.WalletSDKRelayAbstract =
  it.APP_VERSION_KEY =
  it.LOCAL_STORAGE_ADDRESSES_KEY =
  it.WALLET_USER_NAME_KEY =
    void 0;
const su = kn;
it.WALLET_USER_NAME_KEY = 'walletUsername';
it.LOCAL_STORAGE_ADDRESSES_KEY = 'Addresses';
it.APP_VERSION_KEY = 'AppVersion';
class Kb {
  async makeEthereumJSONRPCRequest(e, r) {
    if (!r) throw new Error('Error: No jsonRpcUrl provided');
    return window
      .fetch(r, {
        method: 'POST',
        body: JSON.stringify(e),
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((n) => n.json())
      .then((n) => {
        if (!n) throw su.standardErrors.rpc.parse({});
        const i = n,
          { error: s } = i;
        if (s) throw (0, su.serializeError)(s, e.method);
        return i;
      });
  }
}
it.WalletSDKRelayAbstract = Kb;
var fa = { exports: {} },
  nf = Ea.EventEmitter,
  Ro,
  ou;
function Xb() {
  if (ou) return Ro;
  ou = 1;
  function t(_, x) {
    var E = Object.keys(_);
    if (Object.getOwnPropertySymbols) {
      var b = Object.getOwnPropertySymbols(_);
      x &&
        (b = b.filter(function (g) {
          return Object.getOwnPropertyDescriptor(_, g).enumerable;
        })),
        E.push.apply(E, b);
    }
    return E;
  }
  function e(_) {
    for (var x = 1; x < arguments.length; x++) {
      var E = arguments[x] != null ? arguments[x] : {};
      x % 2
        ? t(Object(E), !0).forEach(function (b) {
            r(_, b, E[b]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(E))
          : t(Object(E)).forEach(function (b) {
              Object.defineProperty(
                _,
                b,
                Object.getOwnPropertyDescriptor(E, b)
              );
            });
    }
    return _;
  }
  function r(_, x, E) {
    return (
      (x = o(x)),
      x in _
        ? Object.defineProperty(_, x, {
            value: E,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (_[x] = E),
      _
    );
  }
  function n(_, x) {
    if (!(_ instanceof x))
      throw new TypeError('Cannot call a class as a function');
  }
  function i(_, x) {
    for (var E = 0; E < x.length; E++) {
      var b = x[E];
      (b.enumerable = b.enumerable || !1),
        (b.configurable = !0),
        'value' in b && (b.writable = !0),
        Object.defineProperty(_, o(b.key), b);
    }
  }
  function s(_, x, E) {
    return (
      x && i(_.prototype, x),
      E && i(_, E),
      Object.defineProperty(_, 'prototype', { writable: !1 }),
      _
    );
  }
  function o(_) {
    var x = a(_, 'string');
    return typeof x == 'symbol' ? x : String(x);
  }
  function a(_, x) {
    if (typeof _ != 'object' || _ === null) return _;
    var E = _[Symbol.toPrimitive];
    if (E !== void 0) {
      var b = E.call(_, x || 'default');
      if (typeof b != 'object') return b;
      throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (x === 'string' ? String : Number)(_);
  }
  var c = xi,
    u = c.Buffer,
    l = Ca,
    f = l.inspect,
    h = (f && f.custom) || 'inspect';
  function y(_, x, E) {
    u.prototype.copy.call(_, x, E);
  }
  return (
    (Ro = (function () {
      function _() {
        n(this, _), (this.head = null), (this.tail = null), (this.length = 0);
      }
      return (
        s(_, [
          {
            key: 'push',
            value: function (E) {
              var b = { data: E, next: null };
              this.length > 0 ? (this.tail.next = b) : (this.head = b),
                (this.tail = b),
                ++this.length;
            },
          },
          {
            key: 'unshift',
            value: function (E) {
              var b = { data: E, next: this.head };
              this.length === 0 && (this.tail = b),
                (this.head = b),
                ++this.length;
            },
          },
          {
            key: 'shift',
            value: function () {
              if (this.length !== 0) {
                var E = this.head.data;
                return (
                  this.length === 1
                    ? (this.head = this.tail = null)
                    : (this.head = this.head.next),
                  --this.length,
                  E
                );
              }
            },
          },
          {
            key: 'clear',
            value: function () {
              (this.head = this.tail = null), (this.length = 0);
            },
          },
          {
            key: 'join',
            value: function (E) {
              if (this.length === 0) return '';
              for (var b = this.head, g = '' + b.data; (b = b.next); )
                g += E + b.data;
              return g;
            },
          },
          {
            key: 'concat',
            value: function (E) {
              if (this.length === 0) return u.alloc(0);
              for (var b = u.allocUnsafe(E >>> 0), g = this.head, w = 0; g; )
                y(g.data, b, w), (w += g.data.length), (g = g.next);
              return b;
            },
          },
          {
            key: 'consume',
            value: function (E, b) {
              var g;
              return (
                E < this.head.data.length
                  ? ((g = this.head.data.slice(0, E)),
                    (this.head.data = this.head.data.slice(E)))
                  : E === this.head.data.length
                    ? (g = this.shift())
                    : (g = b ? this._getString(E) : this._getBuffer(E)),
                g
              );
            },
          },
          {
            key: 'first',
            value: function () {
              return this.head.data;
            },
          },
          {
            key: '_getString',
            value: function (E) {
              var b = this.head,
                g = 1,
                w = b.data;
              for (E -= w.length; (b = b.next); ) {
                var C = b.data,
                  S = E > C.length ? C.length : E;
                if (
                  (S === C.length ? (w += C) : (w += C.slice(0, E)),
                  (E -= S),
                  E === 0)
                ) {
                  S === C.length
                    ? (++g,
                      b.next
                        ? (this.head = b.next)
                        : (this.head = this.tail = null))
                    : ((this.head = b), (b.data = C.slice(S)));
                  break;
                }
                ++g;
              }
              return (this.length -= g), w;
            },
          },
          {
            key: '_getBuffer',
            value: function (E) {
              var b = u.allocUnsafe(E),
                g = this.head,
                w = 1;
              for (g.data.copy(b), E -= g.data.length; (g = g.next); ) {
                var C = g.data,
                  S = E > C.length ? C.length : E;
                if ((C.copy(b, b.length - E, 0, S), (E -= S), E === 0)) {
                  S === C.length
                    ? (++w,
                      g.next
                        ? (this.head = g.next)
                        : (this.head = this.tail = null))
                    : ((this.head = g), (g.data = C.slice(S)));
                  break;
                }
                ++w;
              }
              return (this.length -= w), b;
            },
          },
          {
            key: h,
            value: function (E, b) {
              return f(this, e(e({}, b), {}, { depth: 0, customInspect: !1 }));
            },
          },
        ]),
        _
      );
    })()),
    Ro
  );
}
function eg(t, e) {
  var r = this,
    n = this._readableState && this._readableState.destroyed,
    i = this._writableState && this._writableState.destroyed;
  return n || i
    ? (e
        ? e(t)
        : t &&
          (this._writableState
            ? this._writableState.errorEmitted ||
              ((this._writableState.errorEmitted = !0),
              process.nextTick(ha, this, t))
            : process.nextTick(ha, this, t)),
      this)
    : (this._readableState && (this._readableState.destroyed = !0),
      this._writableState && (this._writableState.destroyed = !0),
      this._destroy(t || null, function (s) {
        !e && s
          ? r._writableState
            ? r._writableState.errorEmitted
              ? process.nextTick(li, r)
              : ((r._writableState.errorEmitted = !0),
                process.nextTick(au, r, s))
            : process.nextTick(au, r, s)
          : e
            ? (process.nextTick(li, r), e(s))
            : process.nextTick(li, r);
      }),
      this);
}
function au(t, e) {
  ha(t, e), li(t);
}
function li(t) {
  (t._writableState && !t._writableState.emitClose) ||
    (t._readableState && !t._readableState.emitClose) ||
    t.emit('close');
}
function tg() {
  this._readableState &&
    ((this._readableState.destroyed = !1),
    (this._readableState.reading = !1),
    (this._readableState.ended = !1),
    (this._readableState.endEmitted = !1)),
    this._writableState &&
      ((this._writableState.destroyed = !1),
      (this._writableState.ended = !1),
      (this._writableState.ending = !1),
      (this._writableState.finalCalled = !1),
      (this._writableState.prefinished = !1),
      (this._writableState.finished = !1),
      (this._writableState.errorEmitted = !1));
}
function ha(t, e) {
  t.emit('error', e);
}
function rg(t, e) {
  var r = t._readableState,
    n = t._writableState;
  (r && r.autoDestroy) || (n && n.autoDestroy)
    ? t.destroy(e)
    : t.emit('error', e);
}
var sf = { destroy: eg, undestroy: tg, errorOrDestroy: rg },
  dr = {};
function ng(t, e) {
  (t.prototype = Object.create(e.prototype)),
    (t.prototype.constructor = t),
    (t.__proto__ = e);
}
var of = {};
function Ze(t, e, r) {
  r || (r = Error);
  function n(s, o, a) {
    return typeof e == 'string' ? e : e(s, o, a);
  }
  var i = (function (s) {
    ng(o, s);
    function o(a, c, u) {
      return s.call(this, n(a, c, u)) || this;
    }
    return o;
  })(r);
  (i.prototype.name = r.name), (i.prototype.code = t), (of[t] = i);
}
function cu(t, e) {
  if (Array.isArray(t)) {
    var r = t.length;
    return (
      (t = t.map(function (n) {
        return String(n);
      })),
      r > 2
        ? 'one of '
            .concat(e, ' ')
            .concat(t.slice(0, r - 1).join(', '), ', or ') + t[r - 1]
        : r === 2
          ? 'one of '.concat(e, ' ').concat(t[0], ' or ').concat(t[1])
          : 'of '.concat(e, ' ').concat(t[0])
    );
  } else return 'of '.concat(e, ' ').concat(String(t));
}
function ig(t, e, r) {
  return t.substr(!r || r < 0 ? 0 : +r, e.length) === e;
}
function sg(t, e, r) {
  return (
    (r === void 0 || r > t.length) && (r = t.length),
    t.substring(r - e.length, r) === e
  );
}
function og(t, e, r) {
  return (
    typeof r != 'number' && (r = 0),
    r + e.length > t.length ? !1 : t.indexOf(e, r) !== -1
  );
}
Ze(
  'ERR_INVALID_OPT_VALUE',
  function (t, e) {
    return 'The value "' + e + '" is invalid for option "' + t + '"';
  },
  TypeError
);
Ze(
  'ERR_INVALID_ARG_TYPE',
  function (t, e, r) {
    var n;
    typeof e == 'string' && ig(e, 'not ')
      ? ((n = 'must not be'), (e = e.replace(/^not /, '')))
      : (n = 'must be');
    var i;
    if (sg(t, ' argument'))
      i = 'The '.concat(t, ' ').concat(n, ' ').concat(cu(e, 'type'));
    else {
      var s = og(t, '.') ? 'property' : 'argument';
      i = 'The "'
        .concat(t, '" ')
        .concat(s, ' ')
        .concat(n, ' ')
        .concat(cu(e, 'type'));
    }
    return (i += '. Received type '.concat(typeof r)), i;
  },
  TypeError
);
Ze('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
Ze('ERR_METHOD_NOT_IMPLEMENTED', function (t) {
  return 'The ' + t + ' method is not implemented';
});
Ze('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
Ze('ERR_STREAM_DESTROYED', function (t) {
  return 'Cannot call ' + t + ' after a stream was destroyed';
});
Ze('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
Ze('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
Ze('ERR_STREAM_WRITE_AFTER_END', 'write after end');
Ze('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
Ze(
  'ERR_UNKNOWN_ENCODING',
  function (t) {
    return 'Unknown encoding: ' + t;
  },
  TypeError
);
Ze('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
dr.codes = of;
var ag = dr.codes.ERR_INVALID_OPT_VALUE;
function cg(t, e, r) {
  return t.highWaterMark != null ? t.highWaterMark : e ? t[r] : null;
}
function ug(t, e, r, n) {
  var i = cg(e, n, r);
  if (i != null) {
    if (!(isFinite(i) && Math.floor(i) === i) || i < 0) {
      var s = n ? r : 'highWaterMark';
      throw new ag(s, i);
    }
    return Math.floor(i);
  }
  return t.objectMode ? 16 : 16 * 1024;
}
var af = { getHighWaterMark: ug },
  lg = fg;
function fg(t, e) {
  if (Ao('noDeprecation')) return t;
  var r = !1;
  function n() {
    if (!r) {
      if (Ao('throwDeprecation')) throw new Error(e);
      Ao('traceDeprecation') ? console.trace(e) : console.warn(e), (r = !0);
    }
    return t.apply(this, arguments);
  }
  return n;
}
function Ao(t) {
  try {
    if (!O.localStorage) return !1;
  } catch {
    return !1;
  }
  var e = O.localStorage[t];
  return e == null ? !1 : String(e).toLowerCase() === 'true';
}
var To, uu;
function cf() {
  if (uu) return To;
  (uu = 1), (To = N);
  function t(m) {
    var v = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        wt(v, m);
      });
  }
  var e;
  N.WritableState = M;
  var r = { deprecate: lg },
    n = nf,
    i = xi.Buffer,
    s =
      (typeof O < 'u'
        ? O
        : typeof window < 'u'
          ? window
          : typeof self < 'u'
            ? self
            : {}
      ).Uint8Array || function () {};
  function o(m) {
    return i.from(m);
  }
  function a(m) {
    return i.isBuffer(m) || m instanceof s;
  }
  var c = sf,
    u = af,
    l = u.getHighWaterMark,
    f = dr.codes,
    h = f.ERR_INVALID_ARG_TYPE,
    y = f.ERR_METHOD_NOT_IMPLEMENTED,
    _ = f.ERR_MULTIPLE_CALLBACK,
    x = f.ERR_STREAM_CANNOT_PIPE,
    E = f.ERR_STREAM_DESTROYED,
    b = f.ERR_STREAM_NULL_VALUES,
    g = f.ERR_STREAM_WRITE_AFTER_END,
    w = f.ERR_UNKNOWN_ENCODING,
    C = c.errorOrDestroy;
  st(N, n);
  function S() {}
  function M(m, v, R) {
    (e = e || jr()),
      (m = m || {}),
      typeof R != 'boolean' && (R = v instanceof e),
      (this.objectMode = !!m.objectMode),
      R && (this.objectMode = this.objectMode || !!m.writableObjectMode),
      (this.highWaterMark = l(this, m, 'writableHighWaterMark', R)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var B = m.decodeStrings === !1;
    (this.decodeStrings = !B),
      (this.defaultEncoding = m.defaultEncoding || 'utf8'),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (z) {
        pe(v, z);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.emitClose = m.emitClose !== !1),
      (this.autoDestroy = !!m.autoDestroy),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new t(this));
  }
  (M.prototype.getBuffer = function () {
    for (var v = this.bufferedRequest, R = []; v; ) R.push(v), (v = v.next);
    return R;
  }),
    (function () {
      try {
        Object.defineProperty(M.prototype, 'buffer', {
          get: r.deprecate(
            function () {
              return this.getBuffer();
            },
            '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
            'DEP0003'
          ),
        });
      } catch {}
    })();
  var P;
  typeof Symbol == 'function' &&
  Symbol.hasInstance &&
  typeof Function.prototype[Symbol.hasInstance] == 'function'
    ? ((P = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(N, Symbol.hasInstance, {
        value: function (v) {
          return P.call(this, v)
            ? !0
            : this !== N
              ? !1
              : v && v._writableState instanceof M;
        },
      }))
    : (P = function (v) {
        return v instanceof this;
      });
  function N(m) {
    e = e || jr();
    var v = this instanceof e;
    if (!v && !P.call(N, this)) return new N(m);
    (this._writableState = new M(m, this, v)),
      (this.writable = !0),
      m &&
        (typeof m.write == 'function' && (this._write = m.write),
        typeof m.writev == 'function' && (this._writev = m.writev),
        typeof m.destroy == 'function' && (this._destroy = m.destroy),
        typeof m.final == 'function' && (this._final = m.final)),
      n.call(this);
  }
  N.prototype.pipe = function () {
    C(this, new x());
  };
  function A(m, v) {
    var R = new g();
    C(m, R), process.nextTick(v, R);
  }
  function F(m, v, R, B) {
    var z;
    return (
      R === null
        ? (z = new b())
        : typeof R != 'string' &&
          !v.objectMode &&
          (z = new h('chunk', ['string', 'Buffer'], R)),
      z ? (C(m, z), process.nextTick(B, z), !1) : !0
    );
  }
  (N.prototype.write = function (m, v, R) {
    var B = this._writableState,
      z = !1,
      d = !B.objectMode && a(m);
    return (
      d && !i.isBuffer(m) && (m = o(m)),
      typeof v == 'function' && ((R = v), (v = null)),
      d ? (v = 'buffer') : v || (v = B.defaultEncoding),
      typeof R != 'function' && (R = S),
      B.ending
        ? A(this, R)
        : (d || F(this, B, m, R)) &&
          (B.pendingcb++, (z = W(this, B, d, m, v, R))),
      z
    );
  }),
    (N.prototype.cork = function () {
      this._writableState.corked++;
    }),
    (N.prototype.uncork = function () {
      var m = this._writableState;
      m.corked &&
        (m.corked--,
        !m.writing &&
          !m.corked &&
          !m.bufferProcessing &&
          m.bufferedRequest &&
          Le(this, m));
    }),
    (N.prototype.setDefaultEncoding = function (v) {
      if (
        (typeof v == 'string' && (v = v.toLowerCase()),
        !(
          [
            'hex',
            'utf8',
            'utf-8',
            'ascii',
            'binary',
            'base64',
            'ucs2',
            'ucs-2',
            'utf16le',
            'utf-16le',
            'raw',
          ].indexOf((v + '').toLowerCase()) > -1
        ))
      )
        throw new w(v);
      return (this._writableState.defaultEncoding = v), this;
    }),
    Object.defineProperty(N.prototype, 'writableBuffer', {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    });
  function K(m, v, R) {
    return (
      !m.objectMode &&
        m.decodeStrings !== !1 &&
        typeof v == 'string' &&
        (v = i.from(v, R)),
      v
    );
  }
  Object.defineProperty(N.prototype, 'writableHighWaterMark', {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function W(m, v, R, B, z, d) {
    if (!R) {
      var p = K(v, B, z);
      B !== p && ((R = !0), (z = 'buffer'), (B = p));
    }
    var k = v.objectMode ? 1 : B.length;
    v.length += k;
    var T = v.length < v.highWaterMark;
    if ((T || (v.needDrain = !0), v.writing || v.corked)) {
      var ne = v.lastBufferedRequest;
      (v.lastBufferedRequest = {
        chunk: B,
        encoding: z,
        isBuf: R,
        callback: d,
        next: null,
      }),
        ne
          ? (ne.next = v.lastBufferedRequest)
          : (v.bufferedRequest = v.lastBufferedRequest),
        (v.bufferedRequestCount += 1);
    } else J(m, v, !1, k, B, z, d);
    return T;
  }
  function J(m, v, R, B, z, d, p) {
    (v.writelen = B),
      (v.writecb = p),
      (v.writing = !0),
      (v.sync = !0),
      v.destroyed
        ? v.onwrite(new E('write'))
        : R
          ? m._writev(z, v.onwrite)
          : m._write(z, d, v.onwrite),
      (v.sync = !1);
  }
  function te(m, v, R, B, z) {
    --v.pendingcb,
      R
        ? (process.nextTick(z, B),
          process.nextTick(Be, m, v),
          (m._writableState.errorEmitted = !0),
          C(m, B))
        : (z(B), (m._writableState.errorEmitted = !0), C(m, B), Be(m, v));
  }
  function se(m) {
    (m.writing = !1),
      (m.writecb = null),
      (m.length -= m.writelen),
      (m.writelen = 0);
  }
  function pe(m, v) {
    var R = m._writableState,
      B = R.sync,
      z = R.writecb;
    if (typeof z != 'function') throw new _();
    if ((se(R), v)) te(m, R, B, v, z);
    else {
      var d = Xe(R) || m.destroyed;
      !d && !R.corked && !R.bufferProcessing && R.bufferedRequest && Le(m, R),
        B ? process.nextTick(Ne, m, R, d, z) : Ne(m, R, d, z);
    }
  }
  function Ne(m, v, R, B) {
    R || Ke(m, v), v.pendingcb--, B(), Be(m, v);
  }
  function Ke(m, v) {
    v.length === 0 && v.needDrain && ((v.needDrain = !1), m.emit('drain'));
  }
  function Le(m, v) {
    v.bufferProcessing = !0;
    var R = v.bufferedRequest;
    if (m._writev && R && R.next) {
      var B = v.bufferedRequestCount,
        z = new Array(B),
        d = v.corkedRequestsFree;
      d.entry = R;
      for (var p = 0, k = !0; R; )
        (z[p] = R), R.isBuf || (k = !1), (R = R.next), (p += 1);
      (z.allBuffers = k),
        J(m, v, !0, v.length, z, '', d.finish),
        v.pendingcb++,
        (v.lastBufferedRequest = null),
        d.next
          ? ((v.corkedRequestsFree = d.next), (d.next = null))
          : (v.corkedRequestsFree = new t(v)),
        (v.bufferedRequestCount = 0);
    } else {
      for (; R; ) {
        var T = R.chunk,
          ne = R.encoding,
          H = R.callback,
          X = v.objectMode ? 1 : T.length;
        if (
          (J(m, v, !1, X, T, ne, H),
          (R = R.next),
          v.bufferedRequestCount--,
          v.writing)
        )
          break;
      }
      R === null && (v.lastBufferedRequest = null);
    }
    (v.bufferedRequest = R), (v.bufferProcessing = !1);
  }
  (N.prototype._write = function (m, v, R) {
    R(new y('_write()'));
  }),
    (N.prototype._writev = null),
    (N.prototype.end = function (m, v, R) {
      var B = this._writableState;
      return (
        typeof m == 'function'
          ? ((R = m), (m = null), (v = null))
          : typeof v == 'function' && ((R = v), (v = null)),
        m != null && this.write(m, v),
        B.corked && ((B.corked = 1), this.uncork()),
        B.ending || At(this, B, R),
        this
      );
    }),
    Object.defineProperty(N.prototype, 'writableLength', {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function Xe(m) {
    return (
      m.ending &&
      m.length === 0 &&
      m.bufferedRequest === null &&
      !m.finished &&
      !m.writing
    );
  }
  function Rt(m, v) {
    m._final(function (R) {
      v.pendingcb--,
        R && C(m, R),
        (v.prefinished = !0),
        m.emit('prefinish'),
        Be(m, v);
    });
  }
  function mt(m, v) {
    !v.prefinished &&
      !v.finalCalled &&
      (typeof m._final == 'function' && !v.destroyed
        ? (v.pendingcb++, (v.finalCalled = !0), process.nextTick(Rt, m, v))
        : ((v.prefinished = !0), m.emit('prefinish')));
  }
  function Be(m, v) {
    var R = Xe(v);
    if (
      R &&
      (mt(m, v),
      v.pendingcb === 0 && ((v.finished = !0), m.emit('finish'), v.autoDestroy))
    ) {
      var B = m._readableState;
      (!B || (B.autoDestroy && B.endEmitted)) && m.destroy();
    }
    return R;
  }
  function At(m, v, R) {
    (v.ending = !0),
      Be(m, v),
      R && (v.finished ? process.nextTick(R) : m.once('finish', R)),
      (v.ended = !0),
      (m.writable = !1);
  }
  function wt(m, v, R) {
    var B = m.entry;
    for (m.entry = null; B; ) {
      var z = B.callback;
      v.pendingcb--, z(R), (B = B.next);
    }
    v.corkedRequestsFree.next = m;
  }
  return (
    Object.defineProperty(N.prototype, 'destroyed', {
      enumerable: !1,
      get: function () {
        return this._writableState === void 0
          ? !1
          : this._writableState.destroyed;
      },
      set: function (v) {
        this._writableState && (this._writableState.destroyed = v);
      },
    }),
    (N.prototype.destroy = c.destroy),
    (N.prototype._undestroy = c.undestroy),
    (N.prototype._destroy = function (m, v) {
      v(m);
    }),
    To
  );
}
var Oo, lu;
function jr() {
  if (lu) return Oo;
  lu = 1;
  var t =
    Object.keys ||
    function (u) {
      var l = [];
      for (var f in u) l.push(f);
      return l;
    };
  Oo = o;
  var e = lf(),
    r = cf();
  st(o, e);
  for (var n = t(r.prototype), i = 0; i < n.length; i++) {
    var s = n[i];
    o.prototype[s] || (o.prototype[s] = r.prototype[s]);
  }
  function o(u) {
    if (!(this instanceof o)) return new o(u);
    e.call(this, u),
      r.call(this, u),
      (this.allowHalfOpen = !0),
      u &&
        (u.readable === !1 && (this.readable = !1),
        u.writable === !1 && (this.writable = !1),
        u.allowHalfOpen === !1 &&
          ((this.allowHalfOpen = !1), this.once('end', a)));
  }
  Object.defineProperty(o.prototype, 'writableHighWaterMark', {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  }),
    Object.defineProperty(o.prototype, 'writableBuffer', {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    }),
    Object.defineProperty(o.prototype, 'writableLength', {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function a() {
    this._writableState.ended || process.nextTick(c, this);
  }
  function c(u) {
    u.end();
  }
  return (
    Object.defineProperty(o.prototype, 'destroyed', {
      enumerable: !1,
      get: function () {
        return this._readableState === void 0 || this._writableState === void 0
          ? !1
          : this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function (l) {
        this._readableState === void 0 ||
          this._writableState === void 0 ||
          ((this._readableState.destroyed = l),
          (this._writableState.destroyed = l));
      },
    }),
    Oo
  );
}
var No = {},
  fu;
function hu() {
  if (fu) return No;
  fu = 1;
  var t = zt.Buffer,
    e =
      t.isEncoding ||
      function (b) {
        switch (((b = '' + b), b && b.toLowerCase())) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
          case 'raw':
            return !0;
          default:
            return !1;
        }
      };
  function r(b) {
    if (!b) return 'utf8';
    for (var g; ; )
      switch (b) {
        case 'utf8':
        case 'utf-8':
          return 'utf8';
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return 'utf16le';
        case 'latin1':
        case 'binary':
          return 'latin1';
        case 'base64':
        case 'ascii':
        case 'hex':
          return b;
        default:
          if (g) return;
          (b = ('' + b).toLowerCase()), (g = !0);
      }
  }
  function n(b) {
    var g = r(b);
    if (typeof g != 'string' && (t.isEncoding === e || !e(b)))
      throw new Error('Unknown encoding: ' + b);
    return g || b;
  }
  No.StringDecoder = i;
  function i(b) {
    this.encoding = n(b);
    var g;
    switch (this.encoding) {
      case 'utf16le':
        (this.text = f), (this.end = h), (g = 4);
        break;
      case 'utf8':
        (this.fillLast = c), (g = 4);
        break;
      case 'base64':
        (this.text = y), (this.end = _), (g = 3);
        break;
      default:
        (this.write = x), (this.end = E);
        return;
    }
    (this.lastNeed = 0),
      (this.lastTotal = 0),
      (this.lastChar = t.allocUnsafe(g));
  }
  (i.prototype.write = function (b) {
    if (b.length === 0) return '';
    var g, w;
    if (this.lastNeed) {
      if (((g = this.fillLast(b)), g === void 0)) return '';
      (w = this.lastNeed), (this.lastNeed = 0);
    } else w = 0;
    return w < b.length ? (g ? g + this.text(b, w) : this.text(b, w)) : g || '';
  }),
    (i.prototype.end = l),
    (i.prototype.text = u),
    (i.prototype.fillLast = function (b) {
      if (this.lastNeed <= b.length)
        return (
          b.copy(
            this.lastChar,
            this.lastTotal - this.lastNeed,
            0,
            this.lastNeed
          ),
          this.lastChar.toString(this.encoding, 0, this.lastTotal)
        );
      b.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, b.length),
        (this.lastNeed -= b.length);
    });
  function s(b) {
    return b <= 127
      ? 0
      : b >> 5 === 6
        ? 2
        : b >> 4 === 14
          ? 3
          : b >> 3 === 30
            ? 4
            : b >> 6 === 2
              ? -1
              : -2;
  }
  function o(b, g, w) {
    var C = g.length - 1;
    if (C < w) return 0;
    var S = s(g[C]);
    return S >= 0
      ? (S > 0 && (b.lastNeed = S - 1), S)
      : --C < w || S === -2
        ? 0
        : ((S = s(g[C])),
          S >= 0
            ? (S > 0 && (b.lastNeed = S - 2), S)
            : --C < w || S === -2
              ? 0
              : ((S = s(g[C])),
                S >= 0
                  ? (S > 0 && (S === 2 ? (S = 0) : (b.lastNeed = S - 3)), S)
                  : 0));
  }
  function a(b, g, w) {
    if ((g[0] & 192) !== 128) return (b.lastNeed = 0), '�';
    if (b.lastNeed > 1 && g.length > 1) {
      if ((g[1] & 192) !== 128) return (b.lastNeed = 1), '�';
      if (b.lastNeed > 2 && g.length > 2 && (g[2] & 192) !== 128)
        return (b.lastNeed = 2), '�';
    }
  }
  function c(b) {
    var g = this.lastTotal - this.lastNeed,
      w = a(this, b);
    if (w !== void 0) return w;
    if (this.lastNeed <= b.length)
      return (
        b.copy(this.lastChar, g, 0, this.lastNeed),
        this.lastChar.toString(this.encoding, 0, this.lastTotal)
      );
    b.copy(this.lastChar, g, 0, b.length), (this.lastNeed -= b.length);
  }
  function u(b, g) {
    var w = o(this, b, g);
    if (!this.lastNeed) return b.toString('utf8', g);
    this.lastTotal = w;
    var C = b.length - (w - this.lastNeed);
    return b.copy(this.lastChar, 0, C), b.toString('utf8', g, C);
  }
  function l(b) {
    var g = b && b.length ? this.write(b) : '';
    return this.lastNeed ? g + '�' : g;
  }
  function f(b, g) {
    if ((b.length - g) % 2 === 0) {
      var w = b.toString('utf16le', g);
      if (w) {
        var C = w.charCodeAt(w.length - 1);
        if (C >= 55296 && C <= 56319)
          return (
            (this.lastNeed = 2),
            (this.lastTotal = 4),
            (this.lastChar[0] = b[b.length - 2]),
            (this.lastChar[1] = b[b.length - 1]),
            w.slice(0, -1)
          );
      }
      return w;
    }
    return (
      (this.lastNeed = 1),
      (this.lastTotal = 2),
      (this.lastChar[0] = b[b.length - 1]),
      b.toString('utf16le', g, b.length - 1)
    );
  }
  function h(b) {
    var g = b && b.length ? this.write(b) : '';
    if (this.lastNeed) {
      var w = this.lastTotal - this.lastNeed;
      return g + this.lastChar.toString('utf16le', 0, w);
    }
    return g;
  }
  function y(b, g) {
    var w = (b.length - g) % 3;
    return w === 0
      ? b.toString('base64', g)
      : ((this.lastNeed = 3 - w),
        (this.lastTotal = 3),
        w === 1
          ? (this.lastChar[0] = b[b.length - 1])
          : ((this.lastChar[0] = b[b.length - 2]),
            (this.lastChar[1] = b[b.length - 1])),
        b.toString('base64', g, b.length - w));
  }
  function _(b) {
    var g = b && b.length ? this.write(b) : '';
    return this.lastNeed
      ? g + this.lastChar.toString('base64', 0, 3 - this.lastNeed)
      : g;
  }
  function x(b) {
    return b.toString(this.encoding);
  }
  function E(b) {
    return b && b.length ? this.write(b) : '';
  }
  return No;
}
var du = dr.codes.ERR_STREAM_PREMATURE_CLOSE;
function hg(t) {
  var e = !1;
  return function () {
    if (!e) {
      e = !0;
      for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++)
        n[i] = arguments[i];
      t.apply(this, n);
    }
  };
}
function dg() {}
function pg(t) {
  return t.setHeader && typeof t.abort == 'function';
}
function uf(t, e, r) {
  if (typeof e == 'function') return uf(t, null, e);
  e || (e = {}), (r = hg(r || dg));
  var n = e.readable || (e.readable !== !1 && t.readable),
    i = e.writable || (e.writable !== !1 && t.writable),
    s = function () {
      t.writable || a();
    },
    o = t._writableState && t._writableState.finished,
    a = function () {
      (i = !1), (o = !0), n || r.call(t);
    },
    c = t._readableState && t._readableState.endEmitted,
    u = function () {
      (n = !1), (c = !0), i || r.call(t);
    },
    l = function (_) {
      r.call(t, _);
    },
    f = function () {
      var _;
      if (n && !c)
        return (
          (!t._readableState || !t._readableState.ended) && (_ = new du()),
          r.call(t, _)
        );
      if (i && !o)
        return (
          (!t._writableState || !t._writableState.ended) && (_ = new du()),
          r.call(t, _)
        );
    },
    h = function () {
      t.req.on('finish', a);
    };
  return (
    pg(t)
      ? (t.on('complete', a),
        t.on('abort', f),
        t.req ? h() : t.on('request', h))
      : i && !t._writableState && (t.on('end', s), t.on('close', s)),
    t.on('end', u),
    t.on('finish', a),
    e.error !== !1 && t.on('error', l),
    t.on('close', f),
    function () {
      t.removeListener('complete', a),
        t.removeListener('abort', f),
        t.removeListener('request', h),
        t.req && t.req.removeListener('finish', a),
        t.removeListener('end', s),
        t.removeListener('close', s),
        t.removeListener('finish', a),
        t.removeListener('end', u),
        t.removeListener('error', l),
        t.removeListener('close', f);
    }
  );
}
var Fa = uf,
  Lo,
  pu;
function bg() {
  if (pu) return Lo;
  pu = 1;
  var t;
  function e(w, C, S) {
    return (
      (C = r(C)),
      C in w
        ? Object.defineProperty(w, C, {
            value: S,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (w[C] = S),
      w
    );
  }
  function r(w) {
    var C = n(w, 'string');
    return typeof C == 'symbol' ? C : String(C);
  }
  function n(w, C) {
    if (typeof w != 'object' || w === null) return w;
    var S = w[Symbol.toPrimitive];
    if (S !== void 0) {
      var M = S.call(w, C || 'default');
      if (typeof M != 'object') return M;
      throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (C === 'string' ? String : Number)(w);
  }
  var i = Fa,
    s = Symbol('lastResolve'),
    o = Symbol('lastReject'),
    a = Symbol('error'),
    c = Symbol('ended'),
    u = Symbol('lastPromise'),
    l = Symbol('handlePromise'),
    f = Symbol('stream');
  function h(w, C) {
    return { value: w, done: C };
  }
  function y(w) {
    var C = w[s];
    if (C !== null) {
      var S = w[f].read();
      S !== null && ((w[u] = null), (w[s] = null), (w[o] = null), C(h(S, !1)));
    }
  }
  function _(w) {
    process.nextTick(y, w);
  }
  function x(w, C) {
    return function (S, M) {
      w.then(function () {
        if (C[c]) {
          S(h(void 0, !0));
          return;
        }
        C[l](S, M);
      }, M);
    };
  }
  var E = Object.getPrototypeOf(function () {}),
    b = Object.setPrototypeOf(
      ((t = {
        get stream() {
          return this[f];
        },
        next: function () {
          var C = this,
            S = this[a];
          if (S !== null) return Promise.reject(S);
          if (this[c]) return Promise.resolve(h(void 0, !0));
          if (this[f].destroyed)
            return new Promise(function (A, F) {
              process.nextTick(function () {
                C[a] ? F(C[a]) : A(h(void 0, !0));
              });
            });
          var M = this[u],
            P;
          if (M) P = new Promise(x(M, this));
          else {
            var N = this[f].read();
            if (N !== null) return Promise.resolve(h(N, !1));
            P = new Promise(this[l]);
          }
          return (this[u] = P), P;
        },
      }),
      e(t, Symbol.asyncIterator, function () {
        return this;
      }),
      e(t, 'return', function () {
        var C = this;
        return new Promise(function (S, M) {
          C[f].destroy(null, function (P) {
            if (P) {
              M(P);
              return;
            }
            S(h(void 0, !0));
          });
        });
      }),
      t),
      E
    ),
    g = function (C) {
      var S,
        M = Object.create(
          b,
          ((S = {}),
          e(S, f, { value: C, writable: !0 }),
          e(S, s, { value: null, writable: !0 }),
          e(S, o, { value: null, writable: !0 }),
          e(S, a, { value: null, writable: !0 }),
          e(S, c, { value: C._readableState.endEmitted, writable: !0 }),
          e(S, l, {
            value: function (N, A) {
              var F = M[f].read();
              F
                ? ((M[u] = null), (M[s] = null), (M[o] = null), N(h(F, !1)))
                : ((M[s] = N), (M[o] = A));
            },
            writable: !0,
          }),
          S)
        );
      return (
        (M[u] = null),
        i(C, function (P) {
          if (P && P.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
            var N = M[o];
            N !== null && ((M[u] = null), (M[s] = null), (M[o] = null), N(P)),
              (M[a] = P);
            return;
          }
          var A = M[s];
          A !== null &&
            ((M[u] = null), (M[s] = null), (M[o] = null), A(h(void 0, !0))),
            (M[c] = !0);
        }),
        C.on('readable', _.bind(null, M)),
        M
      );
    };
  return (Lo = g), Lo;
}
var Po, bu;
function gg() {
  return (
    bu ||
      ((bu = 1),
      (Po = function () {
        throw new Error('Readable.from is not available in the browser');
      })),
    Po
  );
}
var Do, gu;
function lf() {
  if (gu) return Do;
  (gu = 1), (Do = A);
  var t;
  (A.ReadableState = N), Ea.EventEmitter;
  var e = function (p, k) {
      return p.listeners(k).length;
    },
    r = nf,
    n = xi.Buffer,
    i =
      (typeof O < 'u'
        ? O
        : typeof window < 'u'
          ? window
          : typeof self < 'u'
            ? self
            : {}
      ).Uint8Array || function () {};
  function s(d) {
    return n.from(d);
  }
  function o(d) {
    return n.isBuffer(d) || d instanceof i;
  }
  var a = Ca,
    c;
  a && a.debuglog ? (c = a.debuglog('stream')) : (c = function () {});
  var u = Xb(),
    l = sf,
    f = af,
    h = f.getHighWaterMark,
    y = dr.codes,
    _ = y.ERR_INVALID_ARG_TYPE,
    x = y.ERR_STREAM_PUSH_AFTER_EOF,
    E = y.ERR_METHOD_NOT_IMPLEMENTED,
    b = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
    g,
    w,
    C;
  st(A, r);
  var S = l.errorOrDestroy,
    M = ['error', 'close', 'destroy', 'pause', 'resume'];
  function P(d, p, k) {
    if (typeof d.prependListener == 'function') return d.prependListener(p, k);
    !d._events || !d._events[p]
      ? d.on(p, k)
      : Array.isArray(d._events[p])
        ? d._events[p].unshift(k)
        : (d._events[p] = [k, d._events[p]]);
  }
  function N(d, p, k) {
    (t = t || jr()),
      (d = d || {}),
      typeof k != 'boolean' && (k = p instanceof t),
      (this.objectMode = !!d.objectMode),
      k && (this.objectMode = this.objectMode || !!d.readableObjectMode),
      (this.highWaterMark = h(this, d, 'readableHighWaterMark', k)),
      (this.buffer = new u()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.paused = !0),
      (this.emitClose = d.emitClose !== !1),
      (this.autoDestroy = !!d.autoDestroy),
      (this.destroyed = !1),
      (this.defaultEncoding = d.defaultEncoding || 'utf8'),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      d.encoding &&
        (g || (g = hu().StringDecoder),
        (this.decoder = new g(d.encoding)),
        (this.encoding = d.encoding));
  }
  function A(d) {
    if (((t = t || jr()), !(this instanceof A))) return new A(d);
    var p = this instanceof t;
    (this._readableState = new N(d, this, p)),
      (this.readable = !0),
      d &&
        (typeof d.read == 'function' && (this._read = d.read),
        typeof d.destroy == 'function' && (this._destroy = d.destroy)),
      r.call(this);
  }
  Object.defineProperty(A.prototype, 'destroyed', {
    enumerable: !1,
    get: function () {
      return this._readableState === void 0
        ? !1
        : this._readableState.destroyed;
    },
    set: function (p) {
      this._readableState && (this._readableState.destroyed = p);
    },
  }),
    (A.prototype.destroy = l.destroy),
    (A.prototype._undestroy = l.undestroy),
    (A.prototype._destroy = function (d, p) {
      p(d);
    }),
    (A.prototype.push = function (d, p) {
      var k = this._readableState,
        T;
      return (
        k.objectMode
          ? (T = !0)
          : typeof d == 'string' &&
            ((p = p || k.defaultEncoding),
            p !== k.encoding && ((d = n.from(d, p)), (p = '')),
            (T = !0)),
        F(this, d, p, !1, T)
      );
    }),
    (A.prototype.unshift = function (d) {
      return F(this, d, null, !0, !1);
    });
  function F(d, p, k, T, ne) {
    c('readableAddChunk', p);
    var H = d._readableState;
    if (p === null) (H.reading = !1), pe(d, H);
    else {
      var X;
      if ((ne || (X = W(H, p)), X)) S(d, X);
      else if (H.objectMode || (p && p.length > 0))
        if (
          (typeof p != 'string' &&
            !H.objectMode &&
            Object.getPrototypeOf(p) !== n.prototype &&
            (p = s(p)),
          T)
        )
          H.endEmitted ? S(d, new b()) : K(d, H, p, !0);
        else if (H.ended) S(d, new x());
        else {
          if (H.destroyed) return !1;
          (H.reading = !1),
            H.decoder && !k
              ? ((p = H.decoder.write(p)),
                H.objectMode || p.length !== 0 ? K(d, H, p, !1) : Le(d, H))
              : K(d, H, p, !1);
        }
      else T || ((H.reading = !1), Le(d, H));
    }
    return !H.ended && (H.length < H.highWaterMark || H.length === 0);
  }
  function K(d, p, k, T) {
    p.flowing && p.length === 0 && !p.sync
      ? ((p.awaitDrain = 0), d.emit('data', k))
      : ((p.length += p.objectMode ? 1 : k.length),
        T ? p.buffer.unshift(k) : p.buffer.push(k),
        p.needReadable && Ne(d)),
      Le(d, p);
  }
  function W(d, p) {
    var k;
    return (
      !o(p) &&
        typeof p != 'string' &&
        p !== void 0 &&
        !d.objectMode &&
        (k = new _('chunk', ['string', 'Buffer', 'Uint8Array'], p)),
      k
    );
  }
  (A.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  }),
    (A.prototype.setEncoding = function (d) {
      g || (g = hu().StringDecoder);
      var p = new g(d);
      (this._readableState.decoder = p),
        (this._readableState.encoding = this._readableState.decoder.encoding);
      for (var k = this._readableState.buffer.head, T = ''; k !== null; )
        (T += p.write(k.data)), (k = k.next);
      return (
        this._readableState.buffer.clear(),
        T !== '' && this._readableState.buffer.push(T),
        (this._readableState.length = T.length),
        this
      );
    });
  var J = 1073741824;
  function te(d) {
    return (
      d >= J
        ? (d = J)
        : (d--,
          (d |= d >>> 1),
          (d |= d >>> 2),
          (d |= d >>> 4),
          (d |= d >>> 8),
          (d |= d >>> 16),
          d++),
      d
    );
  }
  function se(d, p) {
    return d <= 0 || (p.length === 0 && p.ended)
      ? 0
      : p.objectMode
        ? 1
        : d !== d
          ? p.flowing && p.length
            ? p.buffer.head.data.length
            : p.length
          : (d > p.highWaterMark && (p.highWaterMark = te(d)),
            d <= p.length
              ? d
              : p.ended
                ? p.length
                : ((p.needReadable = !0), 0));
  }
  A.prototype.read = function (d) {
    c('read', d), (d = parseInt(d, 10));
    var p = this._readableState,
      k = d;
    if (
      (d !== 0 && (p.emittedReadable = !1),
      d === 0 &&
        p.needReadable &&
        ((p.highWaterMark !== 0 ? p.length >= p.highWaterMark : p.length > 0) ||
          p.ended))
    )
      return (
        c('read: emitReadable', p.length, p.ended),
        p.length === 0 && p.ended ? R(this) : Ne(this),
        null
      );
    if (((d = se(d, p)), d === 0 && p.ended))
      return p.length === 0 && R(this), null;
    var T = p.needReadable;
    c('need readable', T),
      (p.length === 0 || p.length - d < p.highWaterMark) &&
        ((T = !0), c('length less than watermark', T)),
      p.ended || p.reading
        ? ((T = !1), c('reading or ended', T))
        : T &&
          (c('do read'),
          (p.reading = !0),
          (p.sync = !0),
          p.length === 0 && (p.needReadable = !0),
          this._read(p.highWaterMark),
          (p.sync = !1),
          p.reading || (d = se(k, p)));
    var ne;
    return (
      d > 0 ? (ne = v(d, p)) : (ne = null),
      ne === null
        ? ((p.needReadable = p.length <= p.highWaterMark), (d = 0))
        : ((p.length -= d), (p.awaitDrain = 0)),
      p.length === 0 &&
        (p.ended || (p.needReadable = !0), k !== d && p.ended && R(this)),
      ne !== null && this.emit('data', ne),
      ne
    );
  };
  function pe(d, p) {
    if ((c('onEofChunk'), !p.ended)) {
      if (p.decoder) {
        var k = p.decoder.end();
        k &&
          k.length &&
          (p.buffer.push(k), (p.length += p.objectMode ? 1 : k.length));
      }
      (p.ended = !0),
        p.sync
          ? Ne(d)
          : ((p.needReadable = !1),
            p.emittedReadable || ((p.emittedReadable = !0), Ke(d)));
    }
  }
  function Ne(d) {
    var p = d._readableState;
    c('emitReadable', p.needReadable, p.emittedReadable),
      (p.needReadable = !1),
      p.emittedReadable ||
        (c('emitReadable', p.flowing),
        (p.emittedReadable = !0),
        process.nextTick(Ke, d));
  }
  function Ke(d) {
    var p = d._readableState;
    c('emitReadable_', p.destroyed, p.length, p.ended),
      !p.destroyed &&
        (p.length || p.ended) &&
        (d.emit('readable'), (p.emittedReadable = !1)),
      (p.needReadable = !p.flowing && !p.ended && p.length <= p.highWaterMark),
      m(d);
  }
  function Le(d, p) {
    p.readingMore || ((p.readingMore = !0), process.nextTick(Xe, d, p));
  }
  function Xe(d, p) {
    for (
      ;
      !p.reading &&
      !p.ended &&
      (p.length < p.highWaterMark || (p.flowing && p.length === 0));

    ) {
      var k = p.length;
      if ((c('maybeReadMore read 0'), d.read(0), k === p.length)) break;
    }
    p.readingMore = !1;
  }
  (A.prototype._read = function (d) {
    S(this, new E('_read()'));
  }),
    (A.prototype.pipe = function (d, p) {
      var k = this,
        T = this._readableState;
      switch (T.pipesCount) {
        case 0:
          T.pipes = d;
          break;
        case 1:
          T.pipes = [T.pipes, d];
          break;
        default:
          T.pipes.push(d);
          break;
      }
      (T.pipesCount += 1), c('pipe count=%d opts=%j', T.pipesCount, p);
      var ne =
          (!p || p.end !== !1) && d !== process.stdout && d !== process.stderr,
        H = ne ? _t : Tt;
      T.endEmitted ? process.nextTick(H) : k.once('end', H), d.on('unpipe', X);
      function X(St, ot) {
        c('onunpipe'),
          St === k &&
            ot &&
            ot.hasUnpiped === !1 &&
            ((ot.hasUnpiped = !0), Zn());
      }
      function _t() {
        c('onend'), d.end();
      }
      var Jt = Rt(k);
      d.on('drain', Jt);
      var an = !1;
      function Zn() {
        c('cleanup'),
          d.removeListener('close', vr),
          d.removeListener('finish', mr),
          d.removeListener('drain', Jt),
          d.removeListener('error', yr),
          d.removeListener('unpipe', X),
          k.removeListener('end', _t),
          k.removeListener('end', Tt),
          k.removeListener('data', cn),
          (an = !0),
          T.awaitDrain &&
            (!d._writableState || d._writableState.needDrain) &&
            Jt();
      }
      k.on('data', cn);
      function cn(St) {
        c('ondata');
        var ot = d.write(St);
        c('dest.write', ot),
          ot === !1 &&
            (((T.pipesCount === 1 && T.pipes === d) ||
              (T.pipesCount > 1 && z(T.pipes, d) !== -1)) &&
              !an &&
              (c('false write response, pause', T.awaitDrain), T.awaitDrain++),
            k.pause());
      }
      function yr(St) {
        c('onerror', St),
          Tt(),
          d.removeListener('error', yr),
          e(d, 'error') === 0 && S(d, St);
      }
      P(d, 'error', yr);
      function vr() {
        d.removeListener('finish', mr), Tt();
      }
      d.once('close', vr);
      function mr() {
        c('onfinish'), d.removeListener('close', vr), Tt();
      }
      d.once('finish', mr);
      function Tt() {
        c('unpipe'), k.unpipe(d);
      }
      return d.emit('pipe', k), T.flowing || (c('pipe resume'), k.resume()), d;
    });
  function Rt(d) {
    return function () {
      var k = d._readableState;
      c('pipeOnDrain', k.awaitDrain),
        k.awaitDrain && k.awaitDrain--,
        k.awaitDrain === 0 && e(d, 'data') && ((k.flowing = !0), m(d));
    };
  }
  (A.prototype.unpipe = function (d) {
    var p = this._readableState,
      k = { hasUnpiped: !1 };
    if (p.pipesCount === 0) return this;
    if (p.pipesCount === 1)
      return d && d !== p.pipes
        ? this
        : (d || (d = p.pipes),
          (p.pipes = null),
          (p.pipesCount = 0),
          (p.flowing = !1),
          d && d.emit('unpipe', this, k),
          this);
    if (!d) {
      var T = p.pipes,
        ne = p.pipesCount;
      (p.pipes = null), (p.pipesCount = 0), (p.flowing = !1);
      for (var H = 0; H < ne; H++)
        T[H].emit('unpipe', this, { hasUnpiped: !1 });
      return this;
    }
    var X = z(p.pipes, d);
    return X === -1
      ? this
      : (p.pipes.splice(X, 1),
        (p.pipesCount -= 1),
        p.pipesCount === 1 && (p.pipes = p.pipes[0]),
        d.emit('unpipe', this, k),
        this);
  }),
    (A.prototype.on = function (d, p) {
      var k = r.prototype.on.call(this, d, p),
        T = this._readableState;
      return (
        d === 'data'
          ? ((T.readableListening = this.listenerCount('readable') > 0),
            T.flowing !== !1 && this.resume())
          : d === 'readable' &&
            !T.endEmitted &&
            !T.readableListening &&
            ((T.readableListening = T.needReadable = !0),
            (T.flowing = !1),
            (T.emittedReadable = !1),
            c('on readable', T.length, T.reading),
            T.length ? Ne(this) : T.reading || process.nextTick(Be, this)),
        k
      );
    }),
    (A.prototype.addListener = A.prototype.on),
    (A.prototype.removeListener = function (d, p) {
      var k = r.prototype.removeListener.call(this, d, p);
      return d === 'readable' && process.nextTick(mt, this), k;
    }),
    (A.prototype.removeAllListeners = function (d) {
      var p = r.prototype.removeAllListeners.apply(this, arguments);
      return (
        (d === 'readable' || d === void 0) && process.nextTick(mt, this), p
      );
    });
  function mt(d) {
    var p = d._readableState;
    (p.readableListening = d.listenerCount('readable') > 0),
      p.resumeScheduled && !p.paused
        ? (p.flowing = !0)
        : d.listenerCount('data') > 0 && d.resume();
  }
  function Be(d) {
    c('readable nexttick read 0'), d.read(0);
  }
  A.prototype.resume = function () {
    var d = this._readableState;
    return (
      d.flowing ||
        (c('resume'), (d.flowing = !d.readableListening), At(this, d)),
      (d.paused = !1),
      this
    );
  };
  function At(d, p) {
    p.resumeScheduled || ((p.resumeScheduled = !0), process.nextTick(wt, d, p));
  }
  function wt(d, p) {
    c('resume', p.reading),
      p.reading || d.read(0),
      (p.resumeScheduled = !1),
      d.emit('resume'),
      m(d),
      p.flowing && !p.reading && d.read(0);
  }
  A.prototype.pause = function () {
    return (
      c('call pause flowing=%j', this._readableState.flowing),
      this._readableState.flowing !== !1 &&
        (c('pause'), (this._readableState.flowing = !1), this.emit('pause')),
      (this._readableState.paused = !0),
      this
    );
  };
  function m(d) {
    var p = d._readableState;
    for (c('flow', p.flowing); p.flowing && d.read() !== null; );
  }
  (A.prototype.wrap = function (d) {
    var p = this,
      k = this._readableState,
      T = !1;
    d.on('end', function () {
      if ((c('wrapped end'), k.decoder && !k.ended)) {
        var X = k.decoder.end();
        X && X.length && p.push(X);
      }
      p.push(null);
    }),
      d.on('data', function (X) {
        if (
          (c('wrapped data'),
          k.decoder && (X = k.decoder.write(X)),
          !(k.objectMode && X == null) && !(!k.objectMode && (!X || !X.length)))
        ) {
          var _t = p.push(X);
          _t || ((T = !0), d.pause());
        }
      });
    for (var ne in d)
      this[ne] === void 0 &&
        typeof d[ne] == 'function' &&
        (this[ne] = (function (_t) {
          return function () {
            return d[_t].apply(d, arguments);
          };
        })(ne));
    for (var H = 0; H < M.length; H++) d.on(M[H], this.emit.bind(this, M[H]));
    return (
      (this._read = function (X) {
        c('wrapped _read', X), T && ((T = !1), d.resume());
      }),
      this
    );
  }),
    typeof Symbol == 'function' &&
      (A.prototype[Symbol.asyncIterator] = function () {
        return w === void 0 && (w = bg()), w(this);
      }),
    Object.defineProperty(A.prototype, 'readableHighWaterMark', {
      enumerable: !1,
      get: function () {
        return this._readableState.highWaterMark;
      },
    }),
    Object.defineProperty(A.prototype, 'readableBuffer', {
      enumerable: !1,
      get: function () {
        return this._readableState && this._readableState.buffer;
      },
    }),
    Object.defineProperty(A.prototype, 'readableFlowing', {
      enumerable: !1,
      get: function () {
        return this._readableState.flowing;
      },
      set: function (p) {
        this._readableState && (this._readableState.flowing = p);
      },
    }),
    (A._fromList = v),
    Object.defineProperty(A.prototype, 'readableLength', {
      enumerable: !1,
      get: function () {
        return this._readableState.length;
      },
    });
  function v(d, p) {
    if (p.length === 0) return null;
    var k;
    return (
      p.objectMode
        ? (k = p.buffer.shift())
        : !d || d >= p.length
          ? (p.decoder
              ? (k = p.buffer.join(''))
              : p.buffer.length === 1
                ? (k = p.buffer.first())
                : (k = p.buffer.concat(p.length)),
            p.buffer.clear())
          : (k = p.buffer.consume(d, p.decoder)),
      k
    );
  }
  function R(d) {
    var p = d._readableState;
    c('endReadable', p.endEmitted),
      p.endEmitted || ((p.ended = !0), process.nextTick(B, p, d));
  }
  function B(d, p) {
    if (
      (c('endReadableNT', d.endEmitted, d.length),
      !d.endEmitted &&
        d.length === 0 &&
        ((d.endEmitted = !0), (p.readable = !1), p.emit('end'), d.autoDestroy))
    ) {
      var k = p._writableState;
      (!k || (k.autoDestroy && k.finished)) && p.destroy();
    }
  }
  typeof Symbol == 'function' &&
    (A.from = function (d, p) {
      return C === void 0 && (C = gg()), C(A, d, p);
    });
  function z(d, p) {
    for (var k = 0, T = d.length; k < T; k++) if (d[k] === p) return k;
    return -1;
  }
  return Do;
}
var ff = It,
  Di = dr.codes,
  yg = Di.ERR_METHOD_NOT_IMPLEMENTED,
  vg = Di.ERR_MULTIPLE_CALLBACK,
  mg = Di.ERR_TRANSFORM_ALREADY_TRANSFORMING,
  wg = Di.ERR_TRANSFORM_WITH_LENGTH_0,
  Bi = jr();
st(It, Bi);
function _g(t, e) {
  var r = this._transformState;
  r.transforming = !1;
  var n = r.writecb;
  if (n === null) return this.emit('error', new vg());
  (r.writechunk = null), (r.writecb = null), e != null && this.push(e), n(t);
  var i = this._readableState;
  (i.reading = !1),
    (i.needReadable || i.length < i.highWaterMark) &&
      this._read(i.highWaterMark);
}
function It(t) {
  if (!(this instanceof It)) return new It(t);
  Bi.call(this, t),
    (this._transformState = {
      afterTransform: _g.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null,
    }),
    (this._readableState.needReadable = !0),
    (this._readableState.sync = !1),
    t &&
      (typeof t.transform == 'function' && (this._transform = t.transform),
      typeof t.flush == 'function' && (this._flush = t.flush)),
    this.on('prefinish', Sg);
}
function Sg() {
  var t = this;
  typeof this._flush == 'function' && !this._readableState.destroyed
    ? this._flush(function (e, r) {
        yu(t, e, r);
      })
    : yu(this, null, null);
}
It.prototype.push = function (t, e) {
  return (
    (this._transformState.needTransform = !1),
    Bi.prototype.push.call(this, t, e)
  );
};
It.prototype._transform = function (t, e, r) {
  r(new yg('_transform()'));
};
It.prototype._write = function (t, e, r) {
  var n = this._transformState;
  if (
    ((n.writecb = r),
    (n.writechunk = t),
    (n.writeencoding = e),
    !n.transforming)
  ) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) &&
      this._read(i.highWaterMark);
  }
};
It.prototype._read = function (t) {
  var e = this._transformState;
  e.writechunk !== null && !e.transforming
    ? ((e.transforming = !0),
      this._transform(e.writechunk, e.writeencoding, e.afterTransform))
    : (e.needTransform = !0);
};
It.prototype._destroy = function (t, e) {
  Bi.prototype._destroy.call(this, t, function (r) {
    e(r);
  });
};
function yu(t, e, r) {
  if (e) return t.emit('error', e);
  if ((r != null && t.push(r), t._writableState.length)) throw new wg();
  if (t._transformState.transforming) throw new mg();
  return t.push(null);
}
var Eg = Sn,
  hf = ff;
st(Sn, hf);
function Sn(t) {
  if (!(this instanceof Sn)) return new Sn(t);
  hf.call(this, t);
}
Sn.prototype._transform = function (t, e, r) {
  r(null, t);
};
var Bo;
function Cg(t) {
  var e = !1;
  return function () {
    e || ((e = !0), t.apply(void 0, arguments));
  };
}
var df = dr.codes,
  xg = df.ERR_MISSING_ARGS,
  Ig = df.ERR_STREAM_DESTROYED;
function vu(t) {
  if (t) throw t;
}
function kg(t) {
  return t.setHeader && typeof t.abort == 'function';
}
function Mg(t, e, r, n) {
  n = Cg(n);
  var i = !1;
  t.on('close', function () {
    i = !0;
  }),
    Bo === void 0 && (Bo = Fa),
    Bo(t, { readable: e, writable: r }, function (o) {
      if (o) return n(o);
      (i = !0), n();
    });
  var s = !1;
  return function (o) {
    if (!i && !s) {
      if (((s = !0), kg(t))) return t.abort();
      if (typeof t.destroy == 'function') return t.destroy();
      n(o || new Ig('pipe'));
    }
  };
}
function mu(t) {
  t();
}
function Rg(t, e) {
  return t.pipe(e);
}
function Ag(t) {
  return !t.length || typeof t[t.length - 1] != 'function' ? vu : t.pop();
}
function Tg() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  var n = Ag(e);
  if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
    throw new xg('streams');
  var i,
    s = e.map(function (o, a) {
      var c = a < e.length - 1,
        u = a > 0;
      return Mg(o, c, u, function (l) {
        i || (i = l), l && s.forEach(mu), !c && (s.forEach(mu), n(i));
      });
    });
  return e.reduce(Rg);
}
var Og = Tg;
(function (t, e) {
  (e = t.exports = lf()),
    (e.Stream = e),
    (e.Readable = e),
    (e.Writable = cf()),
    (e.Duplex = jr()),
    (e.Transform = ff),
    (e.PassThrough = Eg),
    (e.finished = Fa),
    (e.pipeline = Og);
})(fa, fa.exports);
var pf = fa.exports;
const { Transform: Ng } = pf;
var Lg = (t) =>
  class bf extends Ng {
    constructor(r, n, i, s, o) {
      super(o),
        (this._rate = r),
        (this._capacity = n),
        (this._delimitedSuffix = i),
        (this._hashBitLength = s),
        (this._options = o),
        (this._state = new t()),
        this._state.initialize(r, n),
        (this._finalized = !1);
    }
    _transform(r, n, i) {
      let s = null;
      try {
        this.update(r, n);
      } catch (o) {
        s = o;
      }
      i(s);
    }
    _flush(r) {
      let n = null;
      try {
        this.push(this.digest());
      } catch (i) {
        n = i;
      }
      r(n);
    }
    update(r, n) {
      if (!Buffer.isBuffer(r) && typeof r != 'string')
        throw new TypeError('Data must be a string or a buffer');
      if (this._finalized) throw new Error('Digest already called');
      return (
        Buffer.isBuffer(r) || (r = Buffer.from(r, n)),
        this._state.absorb(r),
        this
      );
    }
    digest(r) {
      if (this._finalized) throw new Error('Digest already called');
      (this._finalized = !0),
        this._delimitedSuffix &&
          this._state.absorbLastFewBits(this._delimitedSuffix);
      let n = this._state.squeeze(this._hashBitLength / 8);
      return r !== void 0 && (n = n.toString(r)), this._resetState(), n;
    }
    _resetState() {
      return this._state.initialize(this._rate, this._capacity), this;
    }
    _clone() {
      const r = new bf(
        this._rate,
        this._capacity,
        this._delimitedSuffix,
        this._hashBitLength,
        this._options
      );
      return this._state.copy(r._state), (r._finalized = this._finalized), r;
    }
  };
const { Transform: Pg } = pf;
var Dg = (t) =>
  class gf extends Pg {
    constructor(r, n, i, s) {
      super(s),
        (this._rate = r),
        (this._capacity = n),
        (this._delimitedSuffix = i),
        (this._options = s),
        (this._state = new t()),
        this._state.initialize(r, n),
        (this._finalized = !1);
    }
    _transform(r, n, i) {
      let s = null;
      try {
        this.update(r, n);
      } catch (o) {
        s = o;
      }
      i(s);
    }
    _flush() {}
    _read(r) {
      this.push(this.squeeze(r));
    }
    update(r, n) {
      if (!Buffer.isBuffer(r) && typeof r != 'string')
        throw new TypeError('Data must be a string or a buffer');
      if (this._finalized) throw new Error('Squeeze already called');
      return (
        Buffer.isBuffer(r) || (r = Buffer.from(r, n)),
        this._state.absorb(r),
        this
      );
    }
    squeeze(r, n) {
      this._finalized ||
        ((this._finalized = !0),
        this._state.absorbLastFewBits(this._delimitedSuffix));
      let i = this._state.squeeze(r);
      return n !== void 0 && (i = i.toString(n)), i;
    }
    _resetState() {
      return this._state.initialize(this._rate, this._capacity), this;
    }
    _clone() {
      const r = new gf(
        this._rate,
        this._capacity,
        this._delimitedSuffix,
        this._options
      );
      return this._state.copy(r._state), (r._finalized = this._finalized), r;
    }
  };
const Bg = Lg,
  jg = Dg;
var Fg = function (t) {
    const e = Bg(t),
      r = jg(t);
    return function (n, i) {
      switch (typeof n == 'string' ? n.toLowerCase() : n) {
        case 'keccak224':
          return new e(1152, 448, null, 224, i);
        case 'keccak256':
          return new e(1088, 512, null, 256, i);
        case 'keccak384':
          return new e(832, 768, null, 384, i);
        case 'keccak512':
          return new e(576, 1024, null, 512, i);
        case 'sha3-224':
          return new e(1152, 448, 6, 224, i);
        case 'sha3-256':
          return new e(1088, 512, 6, 256, i);
        case 'sha3-384':
          return new e(832, 768, 6, 384, i);
        case 'sha3-512':
          return new e(576, 1024, 6, 512, i);
        case 'shake128':
          return new r(1344, 256, 31, i);
        case 'shake256':
          return new r(1088, 512, 31, i);
        default:
          throw new Error('Invald algorithm: ' + n);
      }
    };
  },
  yf = {};
const wu = [
  1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
  2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0,
  2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
  2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0,
  2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649,
  0, 2147516424, 2147483648,
];
yf.p1600 = function (t) {
  for (let e = 0; e < 24; ++e) {
    const r = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
      n = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
      i = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
      s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
      o = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
      a = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
      c = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
      u = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
      l = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
      f = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
    let h = l ^ ((i << 1) | (s >>> 31)),
      y = f ^ ((s << 1) | (i >>> 31));
    const _ = t[0] ^ h,
      x = t[1] ^ y,
      E = t[10] ^ h,
      b = t[11] ^ y,
      g = t[20] ^ h,
      w = t[21] ^ y,
      C = t[30] ^ h,
      S = t[31] ^ y,
      M = t[40] ^ h,
      P = t[41] ^ y;
    (h = r ^ ((o << 1) | (a >>> 31))), (y = n ^ ((a << 1) | (o >>> 31)));
    const N = t[2] ^ h,
      A = t[3] ^ y,
      F = t[12] ^ h,
      K = t[13] ^ y,
      W = t[22] ^ h,
      J = t[23] ^ y,
      te = t[32] ^ h,
      se = t[33] ^ y,
      pe = t[42] ^ h,
      Ne = t[43] ^ y;
    (h = i ^ ((c << 1) | (u >>> 31))), (y = s ^ ((u << 1) | (c >>> 31)));
    const Ke = t[4] ^ h,
      Le = t[5] ^ y,
      Xe = t[14] ^ h,
      Rt = t[15] ^ y,
      mt = t[24] ^ h,
      Be = t[25] ^ y,
      At = t[34] ^ h,
      wt = t[35] ^ y,
      m = t[44] ^ h,
      v = t[45] ^ y;
    (h = o ^ ((l << 1) | (f >>> 31))), (y = a ^ ((f << 1) | (l >>> 31)));
    const R = t[6] ^ h,
      B = t[7] ^ y,
      z = t[16] ^ h,
      d = t[17] ^ y,
      p = t[26] ^ h,
      k = t[27] ^ y,
      T = t[36] ^ h,
      ne = t[37] ^ y,
      H = t[46] ^ h,
      X = t[47] ^ y;
    (h = c ^ ((r << 1) | (n >>> 31))), (y = u ^ ((n << 1) | (r >>> 31)));
    const _t = t[8] ^ h,
      Jt = t[9] ^ y,
      an = t[18] ^ h,
      Zn = t[19] ^ y,
      cn = t[28] ^ h,
      yr = t[29] ^ y,
      vr = t[38] ^ h,
      mr = t[39] ^ y,
      Tt = t[48] ^ h,
      St = t[49] ^ y,
      ot = _,
      Cs = x,
      xs = (b << 4) | (E >>> 28),
      Is = (E << 4) | (b >>> 28),
      ks = (g << 3) | (w >>> 29),
      Ms = (w << 3) | (g >>> 29),
      Rs = (S << 9) | (C >>> 23),
      As = (C << 9) | (S >>> 23),
      Ts = (M << 18) | (P >>> 14),
      Os = (P << 18) | (M >>> 14),
      Ns = (N << 1) | (A >>> 31),
      Ls = (A << 1) | (N >>> 31),
      Ps = (K << 12) | (F >>> 20),
      Ds = (F << 12) | (K >>> 20),
      Bs = (W << 10) | (J >>> 22),
      js = (J << 10) | (W >>> 22),
      Fs = (se << 13) | (te >>> 19),
      $s = (te << 13) | (se >>> 19),
      Ws = (pe << 2) | (Ne >>> 30),
      Hs = (Ne << 2) | (pe >>> 30),
      Vs = (Le << 30) | (Ke >>> 2),
      Us = (Ke << 30) | (Le >>> 2),
      zs = (Xe << 6) | (Rt >>> 26),
      qs = (Rt << 6) | (Xe >>> 26),
      Js = (Be << 11) | (mt >>> 21),
      Gs = (mt << 11) | (Be >>> 21),
      Qs = (At << 15) | (wt >>> 17),
      Zs = (wt << 15) | (At >>> 17),
      Ys = (v << 29) | (m >>> 3),
      Ks = (m << 29) | (v >>> 3),
      Xs = (R << 28) | (B >>> 4),
      eo = (B << 28) | (R >>> 4),
      to = (d << 23) | (z >>> 9),
      ro = (z << 23) | (d >>> 9),
      no = (p << 25) | (k >>> 7),
      io = (k << 25) | (p >>> 7),
      so = (T << 21) | (ne >>> 11),
      oo = (ne << 21) | (T >>> 11),
      ao = (X << 24) | (H >>> 8),
      co = (H << 24) | (X >>> 8),
      uo = (_t << 27) | (Jt >>> 5),
      lo = (Jt << 27) | (_t >>> 5),
      fo = (an << 20) | (Zn >>> 12),
      ho = (Zn << 20) | (an >>> 12),
      po = (yr << 7) | (cn >>> 25),
      bo = (cn << 7) | (yr >>> 25),
      go = (vr << 8) | (mr >>> 24),
      yo = (mr << 8) | (vr >>> 24),
      vo = (Tt << 14) | (St >>> 18),
      mo = (St << 14) | (Tt >>> 18);
    (t[0] = ot ^ (~Ps & Js)),
      (t[1] = Cs ^ (~Ds & Gs)),
      (t[10] = Xs ^ (~fo & ks)),
      (t[11] = eo ^ (~ho & Ms)),
      (t[20] = Ns ^ (~zs & no)),
      (t[21] = Ls ^ (~qs & io)),
      (t[30] = uo ^ (~xs & Bs)),
      (t[31] = lo ^ (~Is & js)),
      (t[40] = Vs ^ (~to & po)),
      (t[41] = Us ^ (~ro & bo)),
      (t[2] = Ps ^ (~Js & so)),
      (t[3] = Ds ^ (~Gs & oo)),
      (t[12] = fo ^ (~ks & Fs)),
      (t[13] = ho ^ (~Ms & $s)),
      (t[22] = zs ^ (~no & go)),
      (t[23] = qs ^ (~io & yo)),
      (t[32] = xs ^ (~Bs & Qs)),
      (t[33] = Is ^ (~js & Zs)),
      (t[42] = to ^ (~po & Rs)),
      (t[43] = ro ^ (~bo & As)),
      (t[4] = Js ^ (~so & vo)),
      (t[5] = Gs ^ (~oo & mo)),
      (t[14] = ks ^ (~Fs & Ys)),
      (t[15] = Ms ^ (~$s & Ks)),
      (t[24] = no ^ (~go & Ts)),
      (t[25] = io ^ (~yo & Os)),
      (t[34] = Bs ^ (~Qs & ao)),
      (t[35] = js ^ (~Zs & co)),
      (t[44] = po ^ (~Rs & Ws)),
      (t[45] = bo ^ (~As & Hs)),
      (t[6] = so ^ (~vo & ot)),
      (t[7] = oo ^ (~mo & Cs)),
      (t[16] = Fs ^ (~Ys & Xs)),
      (t[17] = $s ^ (~Ks & eo)),
      (t[26] = go ^ (~Ts & Ns)),
      (t[27] = yo ^ (~Os & Ls)),
      (t[36] = Qs ^ (~ao & uo)),
      (t[37] = Zs ^ (~co & lo)),
      (t[46] = Rs ^ (~Ws & Vs)),
      (t[47] = As ^ (~Hs & Us)),
      (t[8] = vo ^ (~ot & Ps)),
      (t[9] = mo ^ (~Cs & Ds)),
      (t[18] = Ys ^ (~Xs & fo)),
      (t[19] = Ks ^ (~eo & ho)),
      (t[28] = Ts ^ (~Ns & zs)),
      (t[29] = Os ^ (~Ls & qs)),
      (t[38] = ao ^ (~uo & xs)),
      (t[39] = co ^ (~lo & Is)),
      (t[48] = Ws ^ (~Vs & to)),
      (t[49] = Hs ^ (~Us & ro)),
      (t[0] ^= wu[e * 2]),
      (t[1] ^= wu[e * 2 + 1]);
  }
};
const vi = yf;
function Xr() {
  (this.state = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]),
    (this.blockSize = null),
    (this.count = 0),
    (this.squeezing = !1);
}
Xr.prototype.initialize = function (t, e) {
  for (let r = 0; r < 50; ++r) this.state[r] = 0;
  (this.blockSize = t / 8), (this.count = 0), (this.squeezing = !1);
};
Xr.prototype.absorb = function (t) {
  for (let e = 0; e < t.length; ++e)
    (this.state[~~(this.count / 4)] ^= t[e] << (8 * (this.count % 4))),
      (this.count += 1),
      this.count === this.blockSize && (vi.p1600(this.state), (this.count = 0));
};
Xr.prototype.absorbLastFewBits = function (t) {
  (this.state[~~(this.count / 4)] ^= t << (8 * (this.count % 4))),
    t & 128 && this.count === this.blockSize - 1 && vi.p1600(this.state),
    (this.state[~~((this.blockSize - 1) / 4)] ^=
      128 << (8 * ((this.blockSize - 1) % 4))),
    vi.p1600(this.state),
    (this.count = 0),
    (this.squeezing = !0);
};
Xr.prototype.squeeze = function (t) {
  this.squeezing || this.absorbLastFewBits(1);
  const e = Buffer.alloc(t);
  for (let r = 0; r < t; ++r)
    (e[r] = (this.state[~~(this.count / 4)] >>> (8 * (this.count % 4))) & 255),
      (this.count += 1),
      this.count === this.blockSize && (vi.p1600(this.state), (this.count = 0));
  return e;
};
Xr.prototype.copy = function (t) {
  for (let e = 0; e < 50; ++e) t.state[e] = this.state[e];
  (t.blockSize = this.blockSize),
    (t.count = this.count),
    (t.squeezing = this.squeezing);
};
var $g = Xr,
  Wg = Fg($g);
const Hg = Wg,
  Vg = Ii;
function vf(t) {
  return Buffer.allocUnsafe(t).fill(0);
}
function mf(t, e, r) {
  const n = vf(e);
  return (
    (t = ji(t)),
    r
      ? t.length < e
        ? (t.copy(n), n)
        : t.slice(0, e)
      : t.length < e
        ? (t.copy(n, e - t.length), n)
        : t.slice(-e)
  );
}
function Ug(t, e) {
  return mf(t, e, !0);
}
function ji(t) {
  if (!Buffer.isBuffer(t))
    if (Array.isArray(t)) t = Buffer.from(t);
    else if (typeof t == 'string')
      wf(t) ? (t = Buffer.from(Jg(_f(t)), 'hex')) : (t = Buffer.from(t));
    else if (typeof t == 'number') t = intToBuffer(t);
    else if (t == null) t = Buffer.allocUnsafe(0);
    else if (Vg.isBN(t)) t = t.toArrayLike(Buffer);
    else if (t.toArray) t = Buffer.from(t.toArray());
    else throw new Error('invalid type');
  return t;
}
function zg(t) {
  return (t = ji(t)), '0x' + t.toString('hex');
}
function qg(t, e) {
  return (
    (t = ji(t)),
    e || (e = 256),
    Hg('keccak' + e)
      .update(t)
      .digest()
  );
}
function Jg(t) {
  return t.length % 2 ? '0' + t : t;
}
function wf(t) {
  return typeof t == 'string' && t.match(/^0x[0-9A-Fa-f]*$/);
}
function _f(t) {
  return typeof t == 'string' && t.startsWith('0x') ? t.slice(2) : t;
}
var Sf = {
  zeros: vf,
  setLength: mf,
  setLengthRight: Ug,
  isHexString: wf,
  stripHexPrefix: _f,
  toBuffer: ji,
  bufferToHex: zg,
  keccak: qg,
};
const sr = Sf,
  tr = Ii;
function Ef(t) {
  return t.startsWith('int[')
    ? 'int256' + t.slice(3)
    : t === 'int'
      ? 'int256'
      : t.startsWith('uint[')
        ? 'uint256' + t.slice(4)
        : t === 'uint'
          ? 'uint256'
          : t.startsWith('fixed[')
            ? 'fixed128x128' + t.slice(5)
            : t === 'fixed'
              ? 'fixed128x128'
              : t.startsWith('ufixed[')
                ? 'ufixed128x128' + t.slice(6)
                : t === 'ufixed'
                  ? 'ufixed128x128'
                  : t;
}
function Tr(t) {
  return parseInt(/^\D+(\d+)$/.exec(t)[1], 10);
}
function _u(t) {
  var e = /^\D+(\d+)x(\d+)$/.exec(t);
  return [parseInt(e[1], 10), parseInt(e[2], 10)];
}
function Cf(t) {
  var e = t.match(/(.*)\[(.*?)\]$/);
  return e ? (e[2] === '' ? 'dynamic' : parseInt(e[2], 10)) : null;
}
function Kt(t) {
  var e = typeof t;
  if (e === 'string')
    return sr.isHexString(t) ? new tr(sr.stripHexPrefix(t), 16) : new tr(t, 10);
  if (e === 'number') return new tr(t);
  if (t.toArray) return t;
  throw new Error('Argument is not a number');
}
function lt(t, e) {
  var r, n, i, s;
  if (t === 'address') return lt('uint160', Kt(e));
  if (t === 'bool') return lt('uint8', e ? 1 : 0);
  if (t === 'string') return lt('bytes', new Buffer(e, 'utf8'));
  if (Qg(t)) {
    if (typeof e.length > 'u') throw new Error('Not an array?');
    if (((r = Cf(t)), r !== 'dynamic' && r !== 0 && e.length > r))
      throw new Error('Elements exceed array size: ' + r);
    (i = []),
      (t = t.slice(0, t.lastIndexOf('['))),
      typeof e == 'string' && (e = JSON.parse(e));
    for (s in e) i.push(lt(t, e[s]));
    if (r === 'dynamic') {
      var o = lt('uint256', e.length);
      i.unshift(o);
    }
    return Buffer.concat(i);
  } else {
    if (t === 'bytes')
      return (
        (e = new Buffer(e)),
        (i = Buffer.concat([lt('uint256', e.length), e])),
        e.length % 32 !== 0 &&
          (i = Buffer.concat([i, sr.zeros(32 - (e.length % 32))])),
        i
      );
    if (t.startsWith('bytes')) {
      if (((r = Tr(t)), r < 1 || r > 32))
        throw new Error('Invalid bytes<N> width: ' + r);
      return sr.setLengthRight(e, 32);
    } else if (t.startsWith('uint')) {
      if (((r = Tr(t)), r % 8 || r < 8 || r > 256))
        throw new Error('Invalid uint<N> width: ' + r);
      if (((n = Kt(e)), n.bitLength() > r))
        throw new Error(
          'Supplied uint exceeds width: ' + r + ' vs ' + n.bitLength()
        );
      if (n < 0) throw new Error('Supplied uint is negative');
      return n.toArrayLike(Buffer, 'be', 32);
    } else if (t.startsWith('int')) {
      if (((r = Tr(t)), r % 8 || r < 8 || r > 256))
        throw new Error('Invalid int<N> width: ' + r);
      if (((n = Kt(e)), n.bitLength() > r))
        throw new Error(
          'Supplied int exceeds width: ' + r + ' vs ' + n.bitLength()
        );
      return n.toTwos(256).toArrayLike(Buffer, 'be', 32);
    } else if (t.startsWith('ufixed')) {
      if (((r = _u(t)), (n = Kt(e)), n < 0))
        throw new Error('Supplied ufixed is negative');
      return lt('uint256', n.mul(new tr(2).pow(new tr(r[1]))));
    } else if (t.startsWith('fixed'))
      return (r = _u(t)), lt('int256', Kt(e).mul(new tr(2).pow(new tr(r[1]))));
  }
  throw new Error('Unsupported or invalid type: ' + t);
}
function Gg(t) {
  return t === 'string' || t === 'bytes' || Cf(t) === 'dynamic';
}
function Qg(t) {
  return t.lastIndexOf(']') === t.length - 1;
}
function Zg(t, e) {
  var r = [],
    n = [],
    i = 32 * t.length;
  for (var s in t) {
    var o = Ef(t[s]),
      a = e[s],
      c = lt(o, a);
    Gg(o) ? (r.push(lt('uint256', i)), n.push(c), (i += c.length)) : r.push(c);
  }
  return Buffer.concat(r.concat(n));
}
function xf(t, e) {
  if (t.length !== e.length)
    throw new Error('Number of types are not matching the values');
  for (var r, n, i = [], s = 0; s < t.length; s++) {
    var o = Ef(t[s]),
      a = e[s];
    if (o === 'bytes') i.push(a);
    else if (o === 'string') i.push(new Buffer(a, 'utf8'));
    else if (o === 'bool') i.push(new Buffer(a ? '01' : '00', 'hex'));
    else if (o === 'address') i.push(sr.setLength(a, 20));
    else if (o.startsWith('bytes')) {
      if (((r = Tr(o)), r < 1 || r > 32))
        throw new Error('Invalid bytes<N> width: ' + r);
      i.push(sr.setLengthRight(a, r));
    } else if (o.startsWith('uint')) {
      if (((r = Tr(o)), r % 8 || r < 8 || r > 256))
        throw new Error('Invalid uint<N> width: ' + r);
      if (((n = Kt(a)), n.bitLength() > r))
        throw new Error(
          'Supplied uint exceeds width: ' + r + ' vs ' + n.bitLength()
        );
      i.push(n.toArrayLike(Buffer, 'be', r / 8));
    } else if (o.startsWith('int')) {
      if (((r = Tr(o)), r % 8 || r < 8 || r > 256))
        throw new Error('Invalid int<N> width: ' + r);
      if (((n = Kt(a)), n.bitLength() > r))
        throw new Error(
          'Supplied int exceeds width: ' + r + ' vs ' + n.bitLength()
        );
      i.push(n.toTwos(r).toArrayLike(Buffer, 'be', r / 8));
    } else throw new Error('Unsupported or invalid type: ' + o);
  }
  return Buffer.concat(i);
}
function Yg(t, e) {
  return sr.keccak(xf(t, e));
}
var Kg = { rawEncode: Zg, solidityPack: xf, soliditySHA3: Yg };
const rt = Sf,
  vn = Kg,
  If = {
    type: 'object',
    properties: {
      types: {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'object',
            properties: { name: { type: 'string' }, type: { type: 'string' } },
            required: ['name', 'type'],
          },
        },
      },
      primaryType: { type: 'string' },
      domain: { type: 'object' },
      message: { type: 'object' },
    },
    required: ['types', 'primaryType', 'domain', 'message'],
  },
  jo = {
    encodeData(t, e, r, n = !0) {
      const i = ['bytes32'],
        s = [this.hashType(t, r)];
      if (n) {
        const o = (a, c, u) => {
          if (r[c] !== void 0)
            return [
              'bytes32',
              u == null
                ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                : rt.keccak(this.encodeData(c, u, r, n)),
            ];
          if (u === void 0)
            throw new Error(`missing value for field ${a} of type ${c}`);
          if (c === 'bytes') return ['bytes32', rt.keccak(u)];
          if (c === 'string')
            return (
              typeof u == 'string' && (u = Buffer.from(u, 'utf8')),
              ['bytes32', rt.keccak(u)]
            );
          if (c.lastIndexOf(']') === c.length - 1) {
            const l = c.slice(0, c.lastIndexOf('[')),
              f = u.map((h) => o(a, l, h));
            return [
              'bytes32',
              rt.keccak(
                vn.rawEncode(
                  f.map(([h]) => h),
                  f.map(([, h]) => h)
                )
              ),
            ];
          }
          return [c, u];
        };
        for (const a of r[t]) {
          const [c, u] = o(a.name, a.type, e[a.name]);
          i.push(c), s.push(u);
        }
      } else
        for (const o of r[t]) {
          let a = e[o.name];
          if (a !== void 0)
            if (o.type === 'bytes')
              i.push('bytes32'), (a = rt.keccak(a)), s.push(a);
            else if (o.type === 'string')
              i.push('bytes32'),
                typeof a == 'string' && (a = Buffer.from(a, 'utf8')),
                (a = rt.keccak(a)),
                s.push(a);
            else if (r[o.type] !== void 0)
              i.push('bytes32'),
                (a = rt.keccak(this.encodeData(o.type, a, r, n))),
                s.push(a);
            else {
              if (o.type.lastIndexOf(']') === o.type.length - 1)
                throw new Error('Arrays currently unimplemented in encodeData');
              i.push(o.type), s.push(a);
            }
        }
      return vn.rawEncode(i, s);
    },
    encodeType(t, e) {
      let r = '',
        n = this.findTypeDependencies(t, e).filter((i) => i !== t);
      n = [t].concat(n.sort());
      for (const i of n) {
        if (!e[i]) throw new Error('No type definition specified: ' + i);
        r +=
          i +
          '(' +
          e[i].map(({ name: o, type: a }) => a + ' ' + o).join(',') +
          ')';
      }
      return r;
    },
    findTypeDependencies(t, e, r = []) {
      if (((t = t.match(/^\w*/)[0]), r.includes(t) || e[t] === void 0))
        return r;
      r.push(t);
      for (const n of e[t])
        for (const i of this.findTypeDependencies(n.type, e, r))
          !r.includes(i) && r.push(i);
      return r;
    },
    hashStruct(t, e, r, n = !0) {
      return rt.keccak(this.encodeData(t, e, r, n));
    },
    hashType(t, e) {
      return rt.keccak(this.encodeType(t, e));
    },
    sanitizeData(t) {
      const e = {};
      for (const r in If.properties) t[r] && (e[r] = t[r]);
      return (
        e.types && (e.types = Object.assign({ EIP712Domain: [] }, e.types)), e
      );
    },
    hash(t, e = !0) {
      const r = this.sanitizeData(t),
        n = [Buffer.from('1901', 'hex')];
      return (
        n.push(this.hashStruct('EIP712Domain', r.domain, r.types, e)),
        r.primaryType !== 'EIP712Domain' &&
          n.push(this.hashStruct(r.primaryType, r.message, r.types, e)),
        rt.keccak(Buffer.concat(n))
      );
    },
  };
var Xg = {
  TYPED_MESSAGE_SCHEMA: If,
  TypedDataUtils: jo,
  hashForSignTypedDataLegacy: function (t) {
    return ey(t.data);
  },
  hashForSignTypedData_v3: function (t) {
    return jo.hash(t.data, !1);
  },
  hashForSignTypedData_v4: function (t) {
    return jo.hash(t.data);
  },
};
function ey(t) {
  const e = new Error('Expect argument to be non-empty array');
  if (typeof t != 'object' || !t.length) throw e;
  const r = t.map(function (s) {
      return s.type === 'bytes' ? rt.toBuffer(s.value) : s.value;
    }),
    n = t.map(function (s) {
      return s.type;
    }),
    i = t.map(function (s) {
      if (!s.name) throw e;
      return s.type + ' ' + s.name;
    });
  return vn.soliditySHA3(
    ['bytes32', 'bytes32'],
    [
      vn.soliditySHA3(new Array(t.length).fill('string'), i),
      vn.soliditySHA3(n, r),
    ]
  );
}
var Fr = {};
Object.defineProperty(Fr, '__esModule', { value: !0 });
Fr.filterFromParam = Fr.FilterPolyfill = void 0;
const Ir = Nn,
  Re = L,
  ty = 5 * 60 * 1e3,
  Xt = { jsonrpc: '2.0', id: 0 };
class ry {
  constructor(e) {
    (this.logFilters = new Map()),
      (this.blockFilters = new Set()),
      (this.pendingTransactionFilters = new Set()),
      (this.cursors = new Map()),
      (this.timeouts = new Map()),
      (this.nextFilterId = (0, Ir.IntNumber)(1)),
      (this.provider = e);
  }
  async newFilter(e) {
    const r = kf(e),
      n = this.makeFilterId(),
      i = await this.setInitialCursorPosition(n, r.fromBlock);
    return (
      console.log(
        `Installing new log filter(${n}):`,
        r,
        'initial cursor position:',
        i
      ),
      this.logFilters.set(n, r),
      this.setFilterTimeout(n),
      (0, Re.hexStringFromIntNumber)(n)
    );
  }
  async newBlockFilter() {
    const e = this.makeFilterId(),
      r = await this.setInitialCursorPosition(e, 'latest');
    return (
      console.log(
        `Installing new block filter (${e}) with initial cursor position:`,
        r
      ),
      this.blockFilters.add(e),
      this.setFilterTimeout(e),
      (0, Re.hexStringFromIntNumber)(e)
    );
  }
  async newPendingTransactionFilter() {
    const e = this.makeFilterId(),
      r = await this.setInitialCursorPosition(e, 'latest');
    return (
      console.log(
        `Installing new block filter (${e}) with initial cursor position:`,
        r
      ),
      this.pendingTransactionFilters.add(e),
      this.setFilterTimeout(e),
      (0, Re.hexStringFromIntNumber)(e)
    );
  }
  uninstallFilter(e) {
    const r = (0, Re.intNumberFromHexString)(e);
    return console.log(`Uninstalling filter (${r})`), this.deleteFilter(r), !0;
  }
  getFilterChanges(e) {
    const r = (0, Re.intNumberFromHexString)(e);
    return (
      this.timeouts.has(r) && this.setFilterTimeout(r),
      this.logFilters.has(r)
        ? this.getLogFilterChanges(r)
        : this.blockFilters.has(r)
          ? this.getBlockFilterChanges(r)
          : this.pendingTransactionFilters.has(r)
            ? this.getPendingTransactionFilterChanges(r)
            : Promise.resolve(ei())
    );
  }
  async getFilterLogs(e) {
    const r = (0, Re.intNumberFromHexString)(e),
      n = this.logFilters.get(r);
    return n
      ? this.sendAsyncPromise(
          Object.assign(Object.assign({}, Xt), {
            method: 'eth_getLogs',
            params: [Su(n)],
          })
        )
      : ei();
  }
  makeFilterId() {
    return (0, Ir.IntNumber)(++this.nextFilterId);
  }
  sendAsyncPromise(e) {
    return new Promise((r, n) => {
      this.provider.sendAsync(e, (i, s) => {
        if (i) return n(i);
        if (Array.isArray(s) || s == null)
          return n(
            new Error(`unexpected response received: ${JSON.stringify(s)}`)
          );
        r(s);
      });
    });
  }
  deleteFilter(e) {
    console.log(`Deleting filter (${e})`),
      this.logFilters.delete(e),
      this.blockFilters.delete(e),
      this.pendingTransactionFilters.delete(e),
      this.cursors.delete(e),
      this.timeouts.delete(e);
  }
  async getLogFilterChanges(e) {
    const r = this.logFilters.get(e),
      n = this.cursors.get(e);
    if (!n || !r) return ei();
    const i = await this.getCurrentBlockHeight(),
      s = r.toBlock === 'latest' ? i : r.toBlock;
    if (n > i || n > r.toBlock) return ti();
    console.log(`Fetching logs from ${n} to ${s} for filter ${e}`);
    const o = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, Xt), {
        method: 'eth_getLogs',
        params: [
          Su(Object.assign(Object.assign({}, r), { fromBlock: n, toBlock: s })),
        ],
      })
    );
    if (Array.isArray(o.result)) {
      const a = o.result.map((u) =>
          (0, Re.intNumberFromHexString)(u.blockNumber || '0x0')
        ),
        c = Math.max(...a);
      if (c && c > n) {
        const u = (0, Ir.IntNumber)(c + 1);
        console.log(
          `Moving cursor position for filter (${e}) from ${n} to ${u}`
        ),
          this.cursors.set(e, u);
      }
    }
    return o;
  }
  async getBlockFilterChanges(e) {
    const r = this.cursors.get(e);
    if (!r) return ei();
    const n = await this.getCurrentBlockHeight();
    if (r > n) return ti();
    console.log(`Fetching blocks from ${r} to ${n} for filter (${e})`);
    const i = (
        await Promise.all(
          (0, Re.range)(r, n + 1).map((o) =>
            this.getBlockHashByNumber((0, Ir.IntNumber)(o))
          )
        )
      ).filter((o) => !!o),
      s = (0, Ir.IntNumber)(r + i.length);
    return (
      console.log(`Moving cursor position for filter (${e}) from ${r} to ${s}`),
      this.cursors.set(e, s),
      Object.assign(Object.assign({}, Xt), { result: i })
    );
  }
  async getPendingTransactionFilterChanges(e) {
    return Promise.resolve(ti());
  }
  async setInitialCursorPosition(e, r) {
    const n = await this.getCurrentBlockHeight(),
      i = typeof r == 'number' && r > n ? r : n;
    return this.cursors.set(e, i), i;
  }
  setFilterTimeout(e) {
    const r = this.timeouts.get(e);
    r && window.clearTimeout(r);
    const n = window.setTimeout(() => {
      console.log(`Filter (${e}) timed out`), this.deleteFilter(e);
    }, ty);
    this.timeouts.set(e, n);
  }
  async getCurrentBlockHeight() {
    const { result: e } = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, Xt), {
        method: 'eth_blockNumber',
        params: [],
      })
    );
    return (0, Re.intNumberFromHexString)((0, Re.ensureHexString)(e));
  }
  async getBlockHashByNumber(e) {
    const r = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, Xt), {
        method: 'eth_getBlockByNumber',
        params: [(0, Re.hexStringFromIntNumber)(e), !1],
      })
    );
    return r.result && typeof r.result.hash == 'string'
      ? (0, Re.ensureHexString)(r.result.hash)
      : null;
  }
}
Fr.FilterPolyfill = ry;
function kf(t) {
  return {
    fromBlock: Eu(t.fromBlock),
    toBlock: Eu(t.toBlock),
    addresses:
      t.address === void 0
        ? null
        : Array.isArray(t.address)
          ? t.address
          : [t.address],
    topics: t.topics || [],
  };
}
Fr.filterFromParam = kf;
function Su(t) {
  const e = {
    fromBlock: Cu(t.fromBlock),
    toBlock: Cu(t.toBlock),
    topics: t.topics,
  };
  return t.addresses !== null && (e.address = t.addresses), e;
}
function Eu(t) {
  if (t === void 0 || t === 'latest' || t === 'pending') return 'latest';
  if (t === 'earliest') return (0, Ir.IntNumber)(0);
  if ((0, Re.isHexString)(t)) return (0, Re.intNumberFromHexString)(t);
  throw new Error(`Invalid block option: ${String(t)}`);
}
function Cu(t) {
  return t === 'latest' ? t : (0, Re.hexStringFromIntNumber)(t);
}
function ei() {
  return Object.assign(Object.assign({}, Xt), {
    error: { code: -32e3, message: 'filter not found' },
  });
}
function ti() {
  return Object.assign(Object.assign({}, Xt), { result: [] });
}
var Mf = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.JSONRPCMethod = void 0),
    (function (e) {
      (e.eth_accounts = 'eth_accounts'),
        (e.eth_coinbase = 'eth_coinbase'),
        (e.net_version = 'net_version'),
        (e.eth_chainId = 'eth_chainId'),
        (e.eth_uninstallFilter = 'eth_uninstallFilter'),
        (e.eth_requestAccounts = 'eth_requestAccounts'),
        (e.eth_sign = 'eth_sign'),
        (e.eth_ecRecover = 'eth_ecRecover'),
        (e.personal_sign = 'personal_sign'),
        (e.personal_ecRecover = 'personal_ecRecover'),
        (e.eth_signTransaction = 'eth_signTransaction'),
        (e.eth_sendRawTransaction = 'eth_sendRawTransaction'),
        (e.eth_sendTransaction = 'eth_sendTransaction'),
        (e.eth_signTypedData_v1 = 'eth_signTypedData_v1'),
        (e.eth_signTypedData_v2 = 'eth_signTypedData_v2'),
        (e.eth_signTypedData_v3 = 'eth_signTypedData_v3'),
        (e.eth_signTypedData_v4 = 'eth_signTypedData_v4'),
        (e.eth_signTypedData = 'eth_signTypedData'),
        (e.cbWallet_arbitrary = 'walletlink_arbitrary'),
        (e.wallet_addEthereumChain = 'wallet_addEthereumChain'),
        (e.wallet_switchEthereumChain = 'wallet_switchEthereumChain'),
        (e.wallet_watchAsset = 'wallet_watchAsset'),
        (e.eth_subscribe = 'eth_subscribe'),
        (e.eth_unsubscribe = 'eth_unsubscribe'),
        (e.eth_newFilter = 'eth_newFilter'),
        (e.eth_newBlockFilter = 'eth_newBlockFilter'),
        (e.eth_newPendingTransactionFilter = 'eth_newPendingTransactionFilter'),
        (e.eth_getFilterChanges = 'eth_getFilterChanges'),
        (e.eth_getFilterLogs = 'eth_getFilterLogs');
    })(t.JSONRPCMethod || (t.JSONRPCMethod = {}));
})(Mf);
var Fi = {},
  Rf = {},
  $i = {},
  $a = ny;
function ny(t) {
  t = t || {};
  var e = t.max || Number.MAX_SAFE_INTEGER,
    r = typeof t.start < 'u' ? t.start : Math.floor(Math.random() * e);
  return function () {
    return (r = r % e), r++;
  };
}
const xu = (t, e) =>
  function () {
    const r = e.promiseModule,
      n = new Array(arguments.length);
    for (let i = 0; i < arguments.length; i++) n[i] = arguments[i];
    return new r((i, s) => {
      e.errorFirst
        ? n.push(function (o, a) {
            if (e.multiArgs) {
              const c = new Array(arguments.length - 1);
              for (let u = 1; u < arguments.length; u++)
                c[u - 1] = arguments[u];
              o ? (c.unshift(o), s(c)) : i(c);
            } else o ? s(o) : i(a);
          })
        : n.push(function (o) {
            if (e.multiArgs) {
              const a = new Array(arguments.length - 1);
              for (let c = 0; c < arguments.length; c++) a[c] = arguments[c];
              i(a);
            } else i(o);
          }),
        t.apply(this, n);
    });
  };
var iy = (t, e) => {
    e = Object.assign(
      { exclude: [/.+(Sync|Stream)$/], errorFirst: !0, promiseModule: Promise },
      e
    );
    const r = (i) => {
      const s = (o) => (typeof o == 'string' ? i === o : o.test(i));
      return e.include ? e.include.some(s) : !e.exclude.some(s);
    };
    let n;
    typeof t == 'function'
      ? (n = function () {
          return e.excludeMain
            ? t.apply(this, arguments)
            : xu(t, e).apply(this, arguments);
        })
      : (n = Object.create(Object.getPrototypeOf(t)));
    for (const i in t) {
      const s = t[i];
      n[i] = typeof s == 'function' && r(i) ? xu(s, e) : s;
    }
    return n;
  },
  Dn = {},
  sy =
    (O && O.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(Dn, '__esModule', { value: !0 });
Dn.BaseBlockTracker = void 0;
const oy = sy(ur),
  ay = 1e3,
  cy = (t, e) => t + e,
  Iu = ['sync', 'latest'];
class uy extends oy.default {
  constructor(e) {
    super(),
      (this._blockResetDuration = e.blockResetDuration || 20 * ay),
      (this._currentBlock = null),
      (this._isRunning = !1),
      (this._onNewListener = this._onNewListener.bind(this)),
      (this._onRemoveListener = this._onRemoveListener.bind(this)),
      (this._resetCurrentBlock = this._resetCurrentBlock.bind(this)),
      this._setupInternalEvents();
  }
  async destroy() {
    this._cancelBlockResetTimeout(),
      await this._maybeEnd(),
      super.removeAllListeners();
  }
  isRunning() {
    return this._isRunning;
  }
  getCurrentBlock() {
    return this._currentBlock;
  }
  async getLatestBlock() {
    return this._currentBlock
      ? this._currentBlock
      : await new Promise((r) => this.once('latest', r));
  }
  removeAllListeners(e) {
    return (
      e ? super.removeAllListeners(e) : super.removeAllListeners(),
      this._setupInternalEvents(),
      this._onRemoveListener(),
      this
    );
  }
  _setupInternalEvents() {
    this.removeListener('newListener', this._onNewListener),
      this.removeListener('removeListener', this._onRemoveListener),
      this.on('newListener', this._onNewListener),
      this.on('removeListener', this._onRemoveListener);
  }
  _onNewListener(e) {
    Iu.includes(e) && this._maybeStart();
  }
  _onRemoveListener() {
    this._getBlockTrackerEventCount() > 0 || this._maybeEnd();
  }
  async _maybeStart() {
    this._isRunning ||
      ((this._isRunning = !0),
      this._cancelBlockResetTimeout(),
      await this._start(),
      this.emit('_started'));
  }
  async _maybeEnd() {
    this._isRunning &&
      ((this._isRunning = !1),
      this._setupBlockResetTimeout(),
      await this._end(),
      this.emit('_ended'));
  }
  _getBlockTrackerEventCount() {
    return Iu.map((e) => this.listenerCount(e)).reduce(cy);
  }
  _newPotentialLatest(e) {
    const r = this._currentBlock;
    (r && ku(e) <= ku(r)) || this._setCurrentBlock(e);
  }
  _setCurrentBlock(e) {
    const r = this._currentBlock;
    (this._currentBlock = e),
      this.emit('latest', e),
      this.emit('sync', { oldBlock: r, newBlock: e });
  }
  _setupBlockResetTimeout() {
    this._cancelBlockResetTimeout(),
      (this._blockResetTimeout = setTimeout(
        this._resetCurrentBlock,
        this._blockResetDuration
      )),
      this._blockResetTimeout.unref && this._blockResetTimeout.unref();
  }
  _cancelBlockResetTimeout() {
    this._blockResetTimeout && clearTimeout(this._blockResetTimeout);
  }
  _resetCurrentBlock() {
    this._currentBlock = null;
  }
}
Dn.BaseBlockTracker = uy;
function ku(t) {
  return Number.parseInt(t, 16);
}
var Af = {},
  Tf = {},
  Ce = {};
class Of extends TypeError {
  constructor(e, r) {
    let n;
    const { message: i, explanation: s, ...o } = e,
      { path: a } = e,
      c = a.length === 0 ? i : `At path: ${a.join('.')} -- ${i}`;
    super(s ?? c),
      s != null && (this.cause = c),
      Object.assign(this, o),
      (this.name = this.constructor.name),
      (this.failures = () => n ?? (n = [e, ...r()]));
  }
}
function ly(t) {
  return Qe(t) && typeof t[Symbol.iterator] == 'function';
}
function Qe(t) {
  return typeof t == 'object' && t != null;
}
function Mu(t) {
  if (Object.prototype.toString.call(t) !== '[object Object]') return !1;
  const e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype;
}
function ge(t) {
  return typeof t == 'symbol'
    ? t.toString()
    : typeof t == 'string'
      ? JSON.stringify(t)
      : `${t}`;
}
function fy(t) {
  const { done: e, value: r } = t.next();
  return e ? void 0 : r;
}
function hy(t, e, r, n) {
  if (t === !0) return;
  t === !1 ? (t = {}) : typeof t == 'string' && (t = { message: t });
  const { path: i, branch: s } = e,
    { type: o } = r,
    {
      refinement: a,
      message:
        c = `Expected a value of type \`${o}\`${a ? ` with refinement \`${a}\`` : ''}, but received: \`${ge(n)}\``,
    } = t;
  return {
    value: n,
    type: o,
    refinement: a,
    key: i[i.length - 1],
    path: i,
    branch: s,
    ...t,
    message: c,
  };
}
function* da(t, e, r, n) {
  ly(t) || (t = [t]);
  for (const i of t) {
    const s = hy(i, e, r, n);
    s && (yield s);
  }
}
function* Wa(t, e, r = {}) {
  const { path: n = [], branch: i = [t], coerce: s = !1, mask: o = !1 } = r,
    a = { path: n, branch: i };
  if (
    s &&
    ((t = e.coercer(t, a)),
    o && e.type !== 'type' && Qe(e.schema) && Qe(t) && !Array.isArray(t))
  )
    for (const u in t) e.schema[u] === void 0 && delete t[u];
  let c = 'valid';
  for (const u of e.validator(t, a))
    (u.explanation = r.message), (c = 'not_valid'), yield [u, void 0];
  for (let [u, l, f] of e.entries(t, a)) {
    const h = Wa(l, f, {
      path: u === void 0 ? n : [...n, u],
      branch: u === void 0 ? i : [...i, l],
      coerce: s,
      mask: o,
      message: r.message,
    });
    for (const y of h)
      y[0]
        ? ((c = y[0].refinement != null ? 'not_refined' : 'not_valid'),
          yield [y[0], void 0])
        : s &&
          ((l = y[1]),
          u === void 0
            ? (t = l)
            : t instanceof Map
              ? t.set(u, l)
              : t instanceof Set
                ? t.add(l)
                : Qe(t) && (l !== void 0 || u in t) && (t[u] = l));
  }
  if (c !== 'not_valid')
    for (const u of e.refiner(t, a))
      (u.explanation = r.message), (c = 'not_refined'), yield [u, void 0];
  c === 'valid' && (yield [void 0, t]);
}
class he {
  constructor(e) {
    const {
      type: r,
      schema: n,
      validator: i,
      refiner: s,
      coercer: o = (c) => c,
      entries: a = function* () {},
    } = e;
    (this.type = r),
      (this.schema = n),
      (this.entries = a),
      (this.coercer = o),
      i
        ? (this.validator = (c, u) => {
            const l = i(c, u);
            return da(l, u, this, c);
          })
        : (this.validator = () => []),
      s
        ? (this.refiner = (c, u) => {
            const l = s(c, u);
            return da(l, u, this, c);
          })
        : (this.refiner = () => []);
  }
  assert(e, r) {
    return Nf(e, this, r);
  }
  create(e, r) {
    return Lf(e, this, r);
  }
  is(e) {
    return Ha(e, this);
  }
  mask(e, r) {
    return Pf(e, this, r);
  }
  validate(e, r = {}) {
    return en(e, this, r);
  }
}
function Nf(t, e, r) {
  const n = en(t, e, { message: r });
  if (n[0]) throw n[0];
}
function Lf(t, e, r) {
  const n = en(t, e, { coerce: !0, message: r });
  if (n[0]) throw n[0];
  return n[1];
}
function Pf(t, e, r) {
  const n = en(t, e, { coerce: !0, mask: !0, message: r });
  if (n[0]) throw n[0];
  return n[1];
}
function Ha(t, e) {
  return !en(t, e)[0];
}
function en(t, e, r = {}) {
  const n = Wa(t, e, r),
    i = fy(n);
  return i[0]
    ? [
        new Of(i[0], function* () {
          for (const o of n) o[0] && (yield o[0]);
        }),
        void 0,
      ]
    : [void 0, i[1]];
}
function dy(...t) {
  const e = t[0].type === 'type',
    r = t.map((i) => i.schema),
    n = Object.assign({}, ...r);
  return e ? Ua(n) : Bn(n);
}
function De(t, e) {
  return new he({ type: t, schema: null, validator: e });
}
function py(t, e) {
  return new he({
    ...t,
    refiner: (r, n) => r === void 0 || t.refiner(r, n),
    validator(r, n) {
      return r === void 0 ? !0 : (e(r, n), t.validator(r, n));
    },
  });
}
function by(t) {
  return new he({
    type: 'dynamic',
    schema: null,
    *entries(e, r) {
      yield* t(e, r).entries(e, r);
    },
    validator(e, r) {
      return t(e, r).validator(e, r);
    },
    coercer(e, r) {
      return t(e, r).coercer(e, r);
    },
    refiner(e, r) {
      return t(e, r).refiner(e, r);
    },
  });
}
function gy(t) {
  let e;
  return new he({
    type: 'lazy',
    schema: null,
    *entries(r, n) {
      e ?? (e = t()), yield* e.entries(r, n);
    },
    validator(r, n) {
      return e ?? (e = t()), e.validator(r, n);
    },
    coercer(r, n) {
      return e ?? (e = t()), e.coercer(r, n);
    },
    refiner(r, n) {
      return e ?? (e = t()), e.refiner(r, n);
    },
  });
}
function yy(t, e) {
  const { schema: r } = t,
    n = { ...r };
  for (const i of e) delete n[i];
  switch (t.type) {
    case 'type':
      return Ua(n);
    default:
      return Bn(n);
  }
}
function vy(t) {
  const e = t instanceof he ? { ...t.schema } : { ...t };
  for (const r in e) e[r] = Df(e[r]);
  return Bn(e);
}
function my(t, e) {
  const { schema: r } = t,
    n = {};
  for (const i of e) n[i] = r[i];
  return Bn(n);
}
function wy(t, e) {
  return (
    console.warn(
      'superstruct@0.11 - The `struct` helper has been renamed to `define`.'
    ),
    De(t, e)
  );
}
function _y() {
  return De('any', () => !0);
}
function Sy(t) {
  return new he({
    type: 'array',
    schema: t,
    *entries(e) {
      if (t && Array.isArray(e))
        for (const [r, n] of e.entries()) yield [r, n, t];
    },
    coercer(e) {
      return Array.isArray(e) ? e.slice() : e;
    },
    validator(e) {
      return (
        Array.isArray(e) || `Expected an array value, but received: ${ge(e)}`
      );
    },
  });
}
function Ey() {
  return De('bigint', (t) => typeof t == 'bigint');
}
function Cy() {
  return De('boolean', (t) => typeof t == 'boolean');
}
function xy() {
  return De(
    'date',
    (t) =>
      (t instanceof Date && !isNaN(t.getTime())) ||
      `Expected a valid \`Date\` object, but received: ${ge(t)}`
  );
}
function Iy(t) {
  const e = {},
    r = t.map((n) => ge(n)).join();
  for (const n of t) e[n] = n;
  return new he({
    type: 'enums',
    schema: e,
    validator(n) {
      return (
        t.includes(n) || `Expected one of \`${r}\`, but received: ${ge(n)}`
      );
    },
  });
}
function ky() {
  return De(
    'func',
    (t) =>
      typeof t == 'function' || `Expected a function, but received: ${ge(t)}`
  );
}
function My(t) {
  return De(
    'instance',
    (e) =>
      e instanceof t ||
      `Expected a \`${t.name}\` instance, but received: ${ge(e)}`
  );
}
function Ry() {
  return De(
    'integer',
    (t) =>
      (typeof t == 'number' && !isNaN(t) && Number.isInteger(t)) ||
      `Expected an integer, but received: ${ge(t)}`
  );
}
function Ay(t) {
  return new he({
    type: 'intersection',
    schema: null,
    *entries(e, r) {
      for (const n of t) yield* n.entries(e, r);
    },
    *validator(e, r) {
      for (const n of t) yield* n.validator(e, r);
    },
    *refiner(e, r) {
      for (const n of t) yield* n.refiner(e, r);
    },
  });
}
function Ty(t) {
  const e = ge(t),
    r = typeof t;
  return new he({
    type: 'literal',
    schema: r === 'string' || r === 'number' || r === 'boolean' ? t : null,
    validator(n) {
      return n === t || `Expected the literal \`${e}\`, but received: ${ge(n)}`;
    },
  });
}
function Oy(t, e) {
  return new he({
    type: 'map',
    schema: null,
    *entries(r) {
      if (t && e && r instanceof Map)
        for (const [n, i] of r.entries()) yield [n, n, t], yield [n, i, e];
    },
    coercer(r) {
      return r instanceof Map ? new Map(r) : r;
    },
    validator(r) {
      return (
        r instanceof Map || `Expected a \`Map\` object, but received: ${ge(r)}`
      );
    },
  });
}
function Va() {
  return De('never', () => !1);
}
function Ny(t) {
  return new he({
    ...t,
    validator: (e, r) => e === null || t.validator(e, r),
    refiner: (e, r) => e === null || t.refiner(e, r),
  });
}
function Ly() {
  return De(
    'number',
    (t) =>
      (typeof t == 'number' && !isNaN(t)) ||
      `Expected a number, but received: ${ge(t)}`
  );
}
function Bn(t) {
  const e = t ? Object.keys(t) : [],
    r = Va();
  return new he({
    type: 'object',
    schema: t || null,
    *entries(n) {
      if (t && Qe(n)) {
        const i = new Set(Object.keys(n));
        for (const s of e) i.delete(s), yield [s, n[s], t[s]];
        for (const s of i) yield [s, n[s], r];
      }
    },
    validator(n) {
      return Qe(n) || `Expected an object, but received: ${ge(n)}`;
    },
    coercer(n) {
      return Qe(n) ? { ...n } : n;
    },
  });
}
function Df(t) {
  return new he({
    ...t,
    validator: (e, r) => e === void 0 || t.validator(e, r),
    refiner: (e, r) => e === void 0 || t.refiner(e, r),
  });
}
function Py(t, e) {
  return new he({
    type: 'record',
    schema: null,
    *entries(r) {
      if (Qe(r))
        for (const n in r) {
          const i = r[n];
          yield [n, n, t], yield [n, i, e];
        }
    },
    validator(r) {
      return Qe(r) || `Expected an object, but received: ${ge(r)}`;
    },
  });
}
function Dy() {
  return De('regexp', (t) => t instanceof RegExp);
}
function By(t) {
  return new he({
    type: 'set',
    schema: null,
    *entries(e) {
      if (t && e instanceof Set) for (const r of e) yield [r, r, t];
    },
    coercer(e) {
      return e instanceof Set ? new Set(e) : e;
    },
    validator(e) {
      return (
        e instanceof Set || `Expected a \`Set\` object, but received: ${ge(e)}`
      );
    },
  });
}
function Bf() {
  return De(
    'string',
    (t) => typeof t == 'string' || `Expected a string, but received: ${ge(t)}`
  );
}
function jy(t) {
  const e = Va();
  return new he({
    type: 'tuple',
    schema: null,
    *entries(r) {
      if (Array.isArray(r)) {
        const n = Math.max(t.length, r.length);
        for (let i = 0; i < n; i++) yield [i, r[i], t[i] || e];
      }
    },
    validator(r) {
      return Array.isArray(r) || `Expected an array, but received: ${ge(r)}`;
    },
  });
}
function Ua(t) {
  const e = Object.keys(t);
  return new he({
    type: 'type',
    schema: t,
    *entries(r) {
      if (Qe(r)) for (const n of e) yield [n, r[n], t[n]];
    },
    validator(r) {
      return Qe(r) || `Expected an object, but received: ${ge(r)}`;
    },
    coercer(r) {
      return Qe(r) ? { ...r } : r;
    },
  });
}
function Fy(t) {
  const e = t.map((r) => r.type).join(' | ');
  return new he({
    type: 'union',
    schema: null,
    coercer(r) {
      for (const n of t) {
        const [i, s] = n.validate(r, { coerce: !0 });
        if (!i) return s;
      }
      return r;
    },
    validator(r, n) {
      const i = [];
      for (const s of t) {
        const [...o] = Wa(r, s, n),
          [a] = o;
        if (a[0]) for (const [c] of o) c && i.push(c);
        else return [];
      }
      return [
        `Expected the value to satisfy a union of \`${e}\`, but received: ${ge(r)}`,
        ...i,
      ];
    },
  });
}
function jf() {
  return De('unknown', () => !0);
}
function za(t, e, r) {
  return new he({
    ...t,
    coercer: (n, i) => (Ha(n, e) ? t.coercer(r(n, i), i) : t.coercer(n, i)),
  });
}
function $y(t, e, r = {}) {
  return za(t, jf(), (n) => {
    const i = typeof e == 'function' ? e() : e;
    if (n === void 0) return i;
    if (!r.strict && Mu(n) && Mu(i)) {
      const s = { ...n };
      let o = !1;
      for (const a in i) s[a] === void 0 && ((s[a] = i[a]), (o = !0));
      if (o) return s;
    }
    return n;
  });
}
function Wy(t) {
  return za(t, Bf(), (e) => e.trim());
}
function Hy(t) {
  return pr(t, 'empty', (e) => {
    const r = Ff(e);
    return (
      r === 0 ||
      `Expected an empty ${t.type} but received one with a size of \`${r}\``
    );
  });
}
function Ff(t) {
  return t instanceof Map || t instanceof Set ? t.size : t.length;
}
function Vy(t, e, r = {}) {
  const { exclusive: n } = r;
  return pr(t, 'max', (i) =>
    n
      ? i < e
      : i <= e ||
        `Expected a ${t.type} less than ${n ? '' : 'or equal to '}${e} but received \`${i}\``
  );
}
function Uy(t, e, r = {}) {
  const { exclusive: n } = r;
  return pr(t, 'min', (i) =>
    n
      ? i > e
      : i >= e ||
        `Expected a ${t.type} greater than ${n ? '' : 'or equal to '}${e} but received \`${i}\``
  );
}
function zy(t) {
  return pr(
    t,
    'nonempty',
    (e) =>
      Ff(e) > 0 || `Expected a nonempty ${t.type} but received an empty one`
  );
}
function qy(t, e) {
  return pr(
    t,
    'pattern',
    (r) =>
      e.test(r) ||
      `Expected a ${t.type} matching \`/${e.source}/\` but received "${r}"`
  );
}
function Jy(t, e, r = e) {
  const n = `Expected a ${t.type}`,
    i = e === r ? `of \`${e}\`` : `between \`${e}\` and \`${r}\``;
  return pr(t, 'size', (s) => {
    if (typeof s == 'number' || s instanceof Date)
      return (e <= s && s <= r) || `${n} ${i} but received \`${s}\``;
    if (s instanceof Map || s instanceof Set) {
      const { size: o } = s;
      return (
        (e <= o && o <= r) ||
        `${n} with a size ${i} but received one with a size of \`${o}\``
      );
    } else {
      const { length: o } = s;
      return (
        (e <= o && o <= r) ||
        `${n} with a length ${i} but received one with a length of \`${o}\``
      );
    }
  });
}
function pr(t, e, r) {
  return new he({
    ...t,
    *refiner(n, i) {
      yield* t.refiner(n, i);
      const s = r(n, i),
        o = da(s, i, t, n);
      for (const a of o) yield { ...a, refinement: e };
    },
  });
}
const Gy = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Struct: he,
        StructError: Of,
        any: _y,
        array: Sy,
        assert: Nf,
        assign: dy,
        bigint: Ey,
        boolean: Cy,
        coerce: za,
        create: Lf,
        date: xy,
        defaulted: $y,
        define: De,
        deprecated: py,
        dynamic: by,
        empty: Hy,
        enums: Iy,
        func: ky,
        instance: My,
        integer: Ry,
        intersection: Ay,
        is: Ha,
        lazy: gy,
        literal: Ty,
        map: Oy,
        mask: Pf,
        max: Vy,
        min: Uy,
        never: Va,
        nonempty: zy,
        nullable: Ny,
        number: Ly,
        object: Bn,
        omit: yy,
        optional: Df,
        partial: vy,
        pattern: qy,
        pick: my,
        record: Py,
        refine: pr,
        regexp: Dy,
        set: By,
        size: Jy,
        string: Bf,
        struct: wy,
        trimmed: Wy,
        tuple: jy,
        type: Ua,
        union: Fy,
        unknown: jf,
        validate: en,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  br = cr(Gy);
Object.defineProperty(Ce, '__esModule', { value: !0 });
Ce.assertExhaustive = Ce.assertStruct = Ce.assert = Ce.AssertionError = void 0;
const Qy = br;
function Zy(t) {
  return typeof t == 'object' && t !== null && 'message' in t;
}
function Yy(t) {
  var e, r;
  return (
    typeof ((r =
      (e = t?.prototype) === null || e === void 0 ? void 0 : e.constructor) ===
      null || r === void 0
      ? void 0
      : r.name) == 'string'
  );
}
function Ky(t) {
  const e = Zy(t) ? t.message : String(t);
  return e.endsWith('.') ? e.slice(0, -1) : e;
}
function $f(t, e) {
  return Yy(t) ? new t({ message: e }) : t({ message: e });
}
class qa extends Error {
  constructor(e) {
    super(e.message), (this.code = 'ERR_ASSERTION');
  }
}
Ce.AssertionError = qa;
function Xy(t, e = 'Assertion failed.', r = qa) {
  if (!t) throw e instanceof Error ? e : $f(r, e);
}
Ce.assert = Xy;
function ev(t, e, r = 'Assertion failed', n = qa) {
  try {
    (0, Qy.assert)(t, e);
  } catch (i) {
    throw $f(n, `${r}: ${Ky(i)}.`);
  }
}
Ce.assertStruct = ev;
function tv(t) {
  throw new Error(
    'Invalid branch reached. Should be detected during compilation.'
  );
}
Ce.assertExhaustive = tv;
var jn = {};
Object.defineProperty(jn, '__esModule', { value: !0 });
jn.base64 = void 0;
const rv = br,
  nv = Ce,
  iv = (t, e = {}) => {
    var r, n;
    const i = (r = e.paddingRequired) !== null && r !== void 0 ? r : !1,
      s = (n = e.characterSet) !== null && n !== void 0 ? n : 'base64';
    let o;
    s === 'base64'
      ? (o = String.raw`[A-Za-z0-9+\/]`)
      : ((0, nv.assert)(s === 'base64url'), (o = String.raw`[-_A-Za-z0-9]`));
    let a;
    return (
      i
        ? (a = new RegExp(`^(?:${o}{4})*(?:${o}{3}=|${o}{2}==)?$`, 'u'))
        : (a = new RegExp(
            `^(?:${o}{4})*(?:${o}{2,3}|${o}{3}=|${o}{2}==)?$`,
            'u'
          )),
      (0, rv.pattern)(t, a)
    );
  };
jn.base64 = iv;
var Z = {},
  Fn = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.remove0x =
      t.add0x =
      t.assertIsStrictHexString =
      t.assertIsHexString =
      t.isStrictHexString =
      t.isHexString =
      t.StrictHexStruct =
      t.HexStruct =
        void 0);
  const e = br,
    r = Ce;
  (t.HexStruct = (0, e.pattern)((0, e.string)(), /^(?:0x)?[0-9a-f]+$/iu)),
    (t.StrictHexStruct = (0, e.pattern)((0, e.string)(), /^0x[0-9a-f]+$/iu));
  function n(u) {
    return (0, e.is)(u, t.HexStruct);
  }
  t.isHexString = n;
  function i(u) {
    return (0, e.is)(u, t.StrictHexStruct);
  }
  t.isStrictHexString = i;
  function s(u) {
    (0, r.assert)(n(u), 'Value must be a hexadecimal string.');
  }
  t.assertIsHexString = s;
  function o(u) {
    (0, r.assert)(
      i(u),
      'Value must be a hexadecimal string, starting with "0x".'
    );
  }
  t.assertIsStrictHexString = o;
  function a(u) {
    return u.startsWith('0x')
      ? u
      : u.startsWith('0X')
        ? `0x${u.substring(2)}`
        : `0x${u}`;
  }
  t.add0x = a;
  function c(u) {
    return u.startsWith('0x') || u.startsWith('0X') ? u.substring(2) : u;
  }
  t.remove0x = c;
})(Fn);
Object.defineProperty(Z, '__esModule', { value: !0 });
Z.createDataView =
  Z.concatBytes =
  Z.valueToBytes =
  Z.stringToBytes =
  Z.numberToBytes =
  Z.signedBigIntToBytes =
  Z.bigIntToBytes =
  Z.hexToBytes =
  Z.bytesToString =
  Z.bytesToNumber =
  Z.bytesToSignedBigInt =
  Z.bytesToBigInt =
  Z.bytesToHex =
  Z.assertIsBytes =
  Z.isBytes =
    void 0;
const Fe = Ce,
  pa = Fn,
  Ru = 48,
  Au = 58,
  Tu = 87;
function sv() {
  const t = [];
  return () => {
    if (t.length === 0)
      for (let e = 0; e < 256; e++) t.push(e.toString(16).padStart(2, '0'));
    return t;
  };
}
const ov = sv();
function Ja(t) {
  return t instanceof Uint8Array;
}
Z.isBytes = Ja;
function tn(t) {
  (0, Fe.assert)(Ja(t), 'Value must be a Uint8Array.');
}
Z.assertIsBytes = tn;
function Wf(t) {
  if ((tn(t), t.length === 0)) return '0x';
  const e = ov(),
    r = new Array(t.length);
  for (let n = 0; n < t.length; n++) r[n] = e[t[n]];
  return (0, pa.add0x)(r.join(''));
}
Z.bytesToHex = Wf;
function Hf(t) {
  tn(t);
  const e = Wf(t);
  return BigInt(e);
}
Z.bytesToBigInt = Hf;
function av(t) {
  tn(t);
  let e = BigInt(0);
  for (const r of t) e = (e << BigInt(8)) + BigInt(r);
  return BigInt.asIntN(t.length * 8, e);
}
Z.bytesToSignedBigInt = av;
function cv(t) {
  tn(t);
  const e = Hf(t);
  return (
    (0, Fe.assert)(
      e <= BigInt(Number.MAX_SAFE_INTEGER),
      'Number is not a safe integer. Use `bytesToBigInt` instead.'
    ),
    Number(e)
  );
}
Z.bytesToNumber = cv;
function uv(t) {
  return tn(t), new TextDecoder().decode(t);
}
Z.bytesToString = uv;
function Wi(t) {
  var e;
  if (
    ((e = t?.toLowerCase) === null || e === void 0 ? void 0 : e.call(t)) ===
    '0x'
  )
    return new Uint8Array();
  (0, pa.assertIsHexString)(t);
  const r = (0, pa.remove0x)(t).toLowerCase(),
    n = r.length % 2 === 0 ? r : `0${r}`,
    i = new Uint8Array(n.length / 2);
  for (let s = 0; s < i.length; s++) {
    const o = n.charCodeAt(s * 2),
      a = n.charCodeAt(s * 2 + 1),
      c = o - (o < Au ? Ru : Tu),
      u = a - (a < Au ? Ru : Tu);
    i[s] = c * 16 + u;
  }
  return i;
}
Z.hexToBytes = Wi;
function Vf(t) {
  (0, Fe.assert)(typeof t == 'bigint', 'Value must be a bigint.'),
    (0, Fe.assert)(t >= BigInt(0), 'Value must be a non-negative bigint.');
  const e = t.toString(16);
  return Wi(e);
}
Z.bigIntToBytes = Vf;
function lv(t, e) {
  (0, Fe.assert)(e > 0);
  const r = t >> BigInt(31);
  return !(((~t & r) + (t & ~r)) >> BigInt(e * 8 + -1));
}
function fv(t, e) {
  (0, Fe.assert)(typeof t == 'bigint', 'Value must be a bigint.'),
    (0, Fe.assert)(typeof e == 'number', 'Byte length must be a number.'),
    (0, Fe.assert)(e > 0, 'Byte length must be greater than 0.'),
    (0, Fe.assert)(
      lv(t, e),
      'Byte length is too small to represent the given value.'
    );
  let r = t;
  const n = new Uint8Array(e);
  for (let i = 0; i < n.length; i++)
    (n[i] = Number(BigInt.asUintN(8, r))), (r >>= BigInt(8));
  return n.reverse();
}
Z.signedBigIntToBytes = fv;
function Uf(t) {
  (0, Fe.assert)(typeof t == 'number', 'Value must be a number.'),
    (0, Fe.assert)(t >= 0, 'Value must be a non-negative number.'),
    (0, Fe.assert)(
      Number.isSafeInteger(t),
      'Value is not a safe integer. Use `bigIntToBytes` instead.'
    );
  const e = t.toString(16);
  return Wi(e);
}
Z.numberToBytes = Uf;
function zf(t) {
  return (
    (0, Fe.assert)(typeof t == 'string', 'Value must be a string.'),
    new TextEncoder().encode(t)
  );
}
Z.stringToBytes = zf;
function qf(t) {
  if (typeof t == 'bigint') return Vf(t);
  if (typeof t == 'number') return Uf(t);
  if (typeof t == 'string') return t.startsWith('0x') ? Wi(t) : zf(t);
  if (Ja(t)) return t;
  throw new TypeError(`Unsupported value type: "${typeof t}".`);
}
Z.valueToBytes = qf;
function hv(t) {
  const e = new Array(t.length);
  let r = 0;
  for (let i = 0; i < t.length; i++) {
    const s = qf(t[i]);
    (e[i] = s), (r += s.length);
  }
  const n = new Uint8Array(r);
  for (let i = 0, s = 0; i < e.length; i++) n.set(e[i], s), (s += e[i].length);
  return n;
}
Z.concatBytes = hv;
function dv(t) {
  if (typeof Buffer < 'u' && t instanceof Buffer) {
    const e = t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
    return new DataView(e);
  }
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
Z.createDataView = dv;
var Hi = {};
Object.defineProperty(Hi, '__esModule', { value: !0 });
Hi.ChecksumStruct = void 0;
const Ou = br,
  pv = jn;
Hi.ChecksumStruct = (0, Ou.size)(
  (0, pv.base64)((0, Ou.string)(), { paddingRequired: !0 }),
  44,
  44
);
var pt = {};
Object.defineProperty(pt, '__esModule', { value: !0 });
pt.createHex = pt.createBytes = pt.createBigInt = pt.createNumber = void 0;
const ae = br,
  bv = Ce,
  Jf = Z,
  Vi = Fn,
  Gf = (0, ae.union)([
    (0, ae.number)(),
    (0, ae.bigint)(),
    (0, ae.string)(),
    Vi.StrictHexStruct,
  ]),
  gv = (0, ae.coerce)((0, ae.number)(), Gf, Number),
  yv = (0, ae.coerce)((0, ae.bigint)(), Gf, BigInt);
(0, ae.union)([Vi.StrictHexStruct, (0, ae.instance)(Uint8Array)]);
const vv = (0, ae.coerce)(
    (0, ae.instance)(Uint8Array),
    (0, ae.union)([Vi.StrictHexStruct]),
    Jf.hexToBytes
  ),
  mv = (0, ae.coerce)(
    Vi.StrictHexStruct,
    (0, ae.instance)(Uint8Array),
    Jf.bytesToHex
  );
function wv(t) {
  try {
    const e = (0, ae.create)(t, gv);
    return (
      (0, bv.assert)(
        Number.isFinite(e),
        `Expected a number-like value, got "${t}".`
      ),
      e
    );
  } catch (e) {
    throw e instanceof ae.StructError
      ? new Error(`Expected a number-like value, got "${t}".`)
      : e;
  }
}
pt.createNumber = wv;
function _v(t) {
  try {
    return (0, ae.create)(t, yv);
  } catch (e) {
    throw e instanceof ae.StructError
      ? new Error(`Expected a number-like value, got "${String(e.value)}".`)
      : e;
  }
}
pt.createBigInt = _v;
function Sv(t) {
  if (typeof t == 'string' && t.toLowerCase() === '0x') return new Uint8Array();
  try {
    return (0, ae.create)(t, vv);
  } catch (e) {
    throw e instanceof ae.StructError
      ? new Error(`Expected a bytes-like value, got "${String(e.value)}".`)
      : e;
  }
}
pt.createBytes = Sv;
function Ev(t) {
  if (
    (t instanceof Uint8Array && t.length === 0) ||
    (typeof t == 'string' && t.toLowerCase() === '0x')
  )
    return '0x';
  try {
    return (0, ae.create)(t, mv);
  } catch (e) {
    throw e instanceof ae.StructError
      ? new Error(`Expected a bytes-like value, got "${String(e.value)}".`)
      : e;
  }
}
pt.createHex = Ev;
var $r = {},
  Qf =
    (O && O.__classPrivateFieldSet) ||
    function (t, e, r, n, i) {
      if (n === 'm') throw new TypeError('Private method is not writable');
      if (n === 'a' && !i)
        throw new TypeError('Private accessor was defined without a setter');
      if (typeof e == 'function' ? t !== e || !i : !e.has(t))
        throw new TypeError(
          'Cannot write private member to an object whose class did not declare it'
        );
      return n === 'a' ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
    },
  Ae =
    (O && O.__classPrivateFieldGet) ||
    function (t, e, r, n) {
      if (r === 'a' && !n)
        throw new TypeError('Private accessor was defined without a getter');
      if (typeof e == 'function' ? t !== e || !n : !e.has(t))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it'
        );
      return r === 'm' ? n : r === 'a' ? n.call(t) : n ? n.value : e.get(t);
    },
  et,
  ct;
Object.defineProperty($r, '__esModule', { value: !0 });
$r.FrozenSet = $r.FrozenMap = void 0;
class Ga {
  constructor(e) {
    et.set(this, void 0), Qf(this, et, new Map(e), 'f'), Object.freeze(this);
  }
  get size() {
    return Ae(this, et, 'f').size;
  }
  [((et = new WeakMap()), Symbol.iterator)]() {
    return Ae(this, et, 'f')[Symbol.iterator]();
  }
  entries() {
    return Ae(this, et, 'f').entries();
  }
  forEach(e, r) {
    return Ae(this, et, 'f').forEach((n, i, s) => e.call(r, n, i, this));
  }
  get(e) {
    return Ae(this, et, 'f').get(e);
  }
  has(e) {
    return Ae(this, et, 'f').has(e);
  }
  keys() {
    return Ae(this, et, 'f').keys();
  }
  values() {
    return Ae(this, et, 'f').values();
  }
  toString() {
    return `FrozenMap(${this.size}) {${this.size > 0 ? ` ${[...this.entries()].map(([e, r]) => `${String(e)} => ${String(r)}`).join(', ')} ` : ''}}`;
  }
}
$r.FrozenMap = Ga;
class Qa {
  constructor(e) {
    ct.set(this, void 0), Qf(this, ct, new Set(e), 'f'), Object.freeze(this);
  }
  get size() {
    return Ae(this, ct, 'f').size;
  }
  [((ct = new WeakMap()), Symbol.iterator)]() {
    return Ae(this, ct, 'f')[Symbol.iterator]();
  }
  entries() {
    return Ae(this, ct, 'f').entries();
  }
  forEach(e, r) {
    return Ae(this, ct, 'f').forEach((n, i, s) => e.call(r, n, i, this));
  }
  has(e) {
    return Ae(this, ct, 'f').has(e);
  }
  keys() {
    return Ae(this, ct, 'f').keys();
  }
  values() {
    return Ae(this, ct, 'f').values();
  }
  toString() {
    return `FrozenSet(${this.size}) {${this.size > 0 ? ` ${[...this.values()].map((e) => String(e)).join(', ')} ` : ''}}`;
  }
}
$r.FrozenSet = Qa;
Object.freeze(Ga);
Object.freeze(Ga.prototype);
Object.freeze(Qa);
Object.freeze(Qa.prototype);
var Zf = {},
  Za = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.calculateNumberSize =
      t.calculateStringSize =
      t.isASCII =
      t.isPlainObject =
      t.ESCAPE_CHARACTERS_REGEXP =
      t.JsonSize =
      t.hasProperty =
      t.isObject =
      t.isNullOrUndefined =
      t.isNonEmptyArray =
        void 0);
  function e(u) {
    return Array.isArray(u) && u.length > 0;
  }
  t.isNonEmptyArray = e;
  function r(u) {
    return u == null;
  }
  t.isNullOrUndefined = r;
  function n(u) {
    return !!u && typeof u == 'object' && !Array.isArray(u);
  }
  t.isObject = n;
  const i = (u, l) => Object.hasOwnProperty.call(u, l);
  (t.hasProperty = i),
    (function (u) {
      (u[(u.Null = 4)] = 'Null'),
        (u[(u.Comma = 1)] = 'Comma'),
        (u[(u.Wrapper = 1)] = 'Wrapper'),
        (u[(u.True = 4)] = 'True'),
        (u[(u.False = 5)] = 'False'),
        (u[(u.Quote = 1)] = 'Quote'),
        (u[(u.Colon = 1)] = 'Colon'),
        (u[(u.Date = 24)] = 'Date');
    })(t.JsonSize || (t.JsonSize = {})),
    (t.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu);
  function s(u) {
    if (typeof u != 'object' || u === null) return !1;
    try {
      let l = u;
      for (; Object.getPrototypeOf(l) !== null; ) l = Object.getPrototypeOf(l);
      return Object.getPrototypeOf(u) === l;
    } catch {
      return !1;
    }
  }
  t.isPlainObject = s;
  function o(u) {
    return u.charCodeAt(0) <= 127;
  }
  t.isASCII = o;
  function a(u) {
    var l;
    return (
      u.split('').reduce((h, y) => (o(y) ? h + 1 : h + 2), 0) +
      ((l = u.match(t.ESCAPE_CHARACTERS_REGEXP)) !== null && l !== void 0
        ? l
        : []
      ).length
    );
  }
  t.calculateStringSize = a;
  function c(u) {
    return u.toString().length;
  }
  t.calculateNumberSize = c;
})(Za);
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.validateJsonAndGetSize =
      t.getJsonRpcIdValidator =
      t.assertIsJsonRpcError =
      t.isJsonRpcError =
      t.assertIsJsonRpcFailure =
      t.isJsonRpcFailure =
      t.assertIsJsonRpcSuccess =
      t.isJsonRpcSuccess =
      t.assertIsJsonRpcResponse =
      t.isJsonRpcResponse =
      t.assertIsPendingJsonRpcResponse =
      t.isPendingJsonRpcResponse =
      t.JsonRpcResponseStruct =
      t.JsonRpcFailureStruct =
      t.JsonRpcSuccessStruct =
      t.PendingJsonRpcResponseStruct =
      t.assertIsJsonRpcRequest =
      t.isJsonRpcRequest =
      t.assertIsJsonRpcNotification =
      t.isJsonRpcNotification =
      t.JsonRpcNotificationStruct =
      t.JsonRpcRequestStruct =
      t.JsonRpcParamsStruct =
      t.JsonRpcErrorStruct =
      t.JsonRpcIdStruct =
      t.JsonRpcVersionStruct =
      t.jsonrpc2 =
      t.isValidJson =
      t.JsonStruct =
        void 0);
  const e = br,
    r = Ce,
    n = Za;
  t.JsonStruct = (0, e.define)('Json', (S) => {
    const [M] = C(S, !0);
    return M ? !0 : 'Expected a valid JSON-serializable value';
  });
  function i(S) {
    return (0, e.is)(S, t.JsonStruct);
  }
  (t.isValidJson = i),
    (t.jsonrpc2 = '2.0'),
    (t.JsonRpcVersionStruct = (0, e.literal)(t.jsonrpc2)),
    (t.JsonRpcIdStruct = (0, e.nullable)(
      (0, e.union)([(0, e.number)(), (0, e.string)()])
    )),
    (t.JsonRpcErrorStruct = (0, e.object)({
      code: (0, e.integer)(),
      message: (0, e.string)(),
      data: (0, e.optional)(t.JsonStruct),
      stack: (0, e.optional)((0, e.string)()),
    })),
    (t.JsonRpcParamsStruct = (0, e.optional)(
      (0, e.union)([
        (0, e.record)((0, e.string)(), t.JsonStruct),
        (0, e.array)(t.JsonStruct),
      ])
    )),
    (t.JsonRpcRequestStruct = (0, e.object)({
      id: t.JsonRpcIdStruct,
      jsonrpc: t.JsonRpcVersionStruct,
      method: (0, e.string)(),
      params: t.JsonRpcParamsStruct,
    })),
    (t.JsonRpcNotificationStruct = (0, e.omit)(t.JsonRpcRequestStruct, ['id']));
  function s(S) {
    return (0, e.is)(S, t.JsonRpcNotificationStruct);
  }
  t.isJsonRpcNotification = s;
  function o(S, M) {
    (0, r.assertStruct)(
      S,
      t.JsonRpcNotificationStruct,
      'Invalid JSON-RPC notification',
      M
    );
  }
  t.assertIsJsonRpcNotification = o;
  function a(S) {
    return (0, e.is)(S, t.JsonRpcRequestStruct);
  }
  t.isJsonRpcRequest = a;
  function c(S, M) {
    (0, r.assertStruct)(
      S,
      t.JsonRpcRequestStruct,
      'Invalid JSON-RPC request',
      M
    );
  }
  (t.assertIsJsonRpcRequest = c),
    (t.PendingJsonRpcResponseStruct = (0, e.object)({
      id: t.JsonRpcIdStruct,
      jsonrpc: t.JsonRpcVersionStruct,
      result: (0, e.optional)((0, e.unknown)()),
      error: (0, e.optional)(t.JsonRpcErrorStruct),
    })),
    (t.JsonRpcSuccessStruct = (0, e.object)({
      id: t.JsonRpcIdStruct,
      jsonrpc: t.JsonRpcVersionStruct,
      result: t.JsonStruct,
    })),
    (t.JsonRpcFailureStruct = (0, e.object)({
      id: t.JsonRpcIdStruct,
      jsonrpc: t.JsonRpcVersionStruct,
      error: t.JsonRpcErrorStruct,
    })),
    (t.JsonRpcResponseStruct = (0, e.union)([
      t.JsonRpcSuccessStruct,
      t.JsonRpcFailureStruct,
    ]));
  function u(S) {
    return (0, e.is)(S, t.PendingJsonRpcResponseStruct);
  }
  t.isPendingJsonRpcResponse = u;
  function l(S, M) {
    (0, r.assertStruct)(
      S,
      t.PendingJsonRpcResponseStruct,
      'Invalid pending JSON-RPC response',
      M
    );
  }
  t.assertIsPendingJsonRpcResponse = l;
  function f(S) {
    return (0, e.is)(S, t.JsonRpcResponseStruct);
  }
  t.isJsonRpcResponse = f;
  function h(S, M) {
    (0, r.assertStruct)(
      S,
      t.JsonRpcResponseStruct,
      'Invalid JSON-RPC response',
      M
    );
  }
  t.assertIsJsonRpcResponse = h;
  function y(S) {
    return (0, e.is)(S, t.JsonRpcSuccessStruct);
  }
  t.isJsonRpcSuccess = y;
  function _(S, M) {
    (0, r.assertStruct)(
      S,
      t.JsonRpcSuccessStruct,
      'Invalid JSON-RPC success response',
      M
    );
  }
  t.assertIsJsonRpcSuccess = _;
  function x(S) {
    return (0, e.is)(S, t.JsonRpcFailureStruct);
  }
  t.isJsonRpcFailure = x;
  function E(S, M) {
    (0, r.assertStruct)(
      S,
      t.JsonRpcFailureStruct,
      'Invalid JSON-RPC failure response',
      M
    );
  }
  t.assertIsJsonRpcFailure = E;
  function b(S) {
    return (0, e.is)(S, t.JsonRpcErrorStruct);
  }
  t.isJsonRpcError = b;
  function g(S, M) {
    (0, r.assertStruct)(S, t.JsonRpcErrorStruct, 'Invalid JSON-RPC error', M);
  }
  t.assertIsJsonRpcError = g;
  function w(S) {
    const {
      permitEmptyString: M,
      permitFractions: P,
      permitNull: N,
    } = Object.assign(
      { permitEmptyString: !0, permitFractions: !1, permitNull: !0 },
      S
    );
    return (F) =>
      !!(
        (typeof F == 'number' && (P || Number.isInteger(F))) ||
        (typeof F == 'string' && (M || F.length > 0)) ||
        (N && F === null)
      );
  }
  t.getJsonRpcIdValidator = w;
  function C(S, M = !1) {
    const P = new Set();
    function N(A, F) {
      if (A === void 0) return [!1, 0];
      if (A === null) return [!0, F ? 0 : n.JsonSize.Null];
      const K = typeof A;
      try {
        if (K === 'function') return [!1, 0];
        if (K === 'string' || A instanceof String)
          return [
            !0,
            F ? 0 : (0, n.calculateStringSize)(A) + n.JsonSize.Quote * 2,
          ];
        if (K === 'boolean' || A instanceof Boolean)
          return F
            ? [!0, 0]
            : [!0, A == !0 ? n.JsonSize.True : n.JsonSize.False];
        if (K === 'number' || A instanceof Number)
          return F ? [!0, 0] : [!0, (0, n.calculateNumberSize)(A)];
        if (A instanceof Date)
          return F
            ? [!0, 0]
            : [
                !0,
                isNaN(A.getDate())
                  ? n.JsonSize.Null
                  : n.JsonSize.Date + n.JsonSize.Quote * 2,
              ];
      } catch {
        return [!1, 0];
      }
      if (!(0, n.isPlainObject)(A) && !Array.isArray(A)) return [!1, 0];
      if (P.has(A)) return [!1, 0];
      P.add(A);
      try {
        return [
          !0,
          Object.entries(A).reduce(
            (W, [J, te], se, pe) => {
              let [Ne, Ke] = N(te, F);
              if (!Ne)
                throw new Error(
                  'JSON validation did not pass. Validation process stopped.'
                );
              if ((P.delete(A), F)) return 0;
              const Le = Array.isArray(A)
                  ? 0
                  : J.length + n.JsonSize.Comma + n.JsonSize.Colon * 2,
                Xe = se < pe.length - 1 ? n.JsonSize.Comma : 0;
              return W + Le + Ke + Xe;
            },
            F ? 0 : n.JsonSize.Wrapper * 2
          ),
        ];
      } catch {
        return [!1, 0];
      }
    }
    return N(S, M);
  }
  t.validateJsonAndGetSize = C;
})(Zf);
var Wr = {},
  ba = { exports: {} },
  Fo,
  Nu;
function Cv() {
  if (Nu) return Fo;
  Nu = 1;
  var t = 1e3,
    e = t * 60,
    r = e * 60,
    n = r * 24,
    i = n * 7,
    s = n * 365.25;
  Fo = function (l, f) {
    f = f || {};
    var h = typeof l;
    if (h === 'string' && l.length > 0) return o(l);
    if (h === 'number' && isFinite(l)) return f.long ? c(l) : a(l);
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(l)
    );
  };
  function o(l) {
    if (((l = String(l)), !(l.length > 100))) {
      var f =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          l
        );
      if (f) {
        var h = parseFloat(f[1]),
          y = (f[2] || 'ms').toLowerCase();
        switch (y) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return h * s;
          case 'weeks':
          case 'week':
          case 'w':
            return h * i;
          case 'days':
          case 'day':
          case 'd':
            return h * n;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return h * r;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return h * e;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return h * t;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(l) {
    var f = Math.abs(l);
    return f >= n
      ? Math.round(l / n) + 'd'
      : f >= r
        ? Math.round(l / r) + 'h'
        : f >= e
          ? Math.round(l / e) + 'm'
          : f >= t
            ? Math.round(l / t) + 's'
            : l + 'ms';
  }
  function c(l) {
    var f = Math.abs(l);
    return f >= n
      ? u(l, f, n, 'day')
      : f >= r
        ? u(l, f, r, 'hour')
        : f >= e
          ? u(l, f, e, 'minute')
          : f >= t
            ? u(l, f, t, 'second')
            : l + ' ms';
  }
  function u(l, f, h, y) {
    var _ = f >= h * 1.5;
    return Math.round(l / h) + ' ' + y + (_ ? 's' : '');
  }
  return Fo;
}
function xv(t) {
  (r.debug = r),
    (r.default = r),
    (r.coerce = c),
    (r.disable = s),
    (r.enable = i),
    (r.enabled = o),
    (r.humanize = Cv()),
    (r.destroy = u),
    Object.keys(t).forEach((l) => {
      r[l] = t[l];
    }),
    (r.names = []),
    (r.skips = []),
    (r.formatters = {});
  function e(l) {
    let f = 0;
    for (let h = 0; h < l.length; h++)
      (f = (f << 5) - f + l.charCodeAt(h)), (f |= 0);
    return r.colors[Math.abs(f) % r.colors.length];
  }
  r.selectColor = e;
  function r(l) {
    let f,
      h = null,
      y,
      _;
    function x(...E) {
      if (!x.enabled) return;
      const b = x,
        g = Number(new Date()),
        w = g - (f || g);
      (b.diff = w),
        (b.prev = f),
        (b.curr = g),
        (f = g),
        (E[0] = r.coerce(E[0])),
        typeof E[0] != 'string' && E.unshift('%O');
      let C = 0;
      (E[0] = E[0].replace(/%([a-zA-Z%])/g, (M, P) => {
        if (M === '%%') return '%';
        C++;
        const N = r.formatters[P];
        if (typeof N == 'function') {
          const A = E[C];
          (M = N.call(b, A)), E.splice(C, 1), C--;
        }
        return M;
      })),
        r.formatArgs.call(b, E),
        (b.log || r.log).apply(b, E);
    }
    return (
      (x.namespace = l),
      (x.useColors = r.useColors()),
      (x.color = r.selectColor(l)),
      (x.extend = n),
      (x.destroy = r.destroy),
      Object.defineProperty(x, 'enabled', {
        enumerable: !0,
        configurable: !1,
        get: () =>
          h !== null
            ? h
            : (y !== r.namespaces && ((y = r.namespaces), (_ = r.enabled(l))),
              _),
        set: (E) => {
          h = E;
        },
      }),
      typeof r.init == 'function' && r.init(x),
      x
    );
  }
  function n(l, f) {
    const h = r(this.namespace + (typeof f > 'u' ? ':' : f) + l);
    return (h.log = this.log), h;
  }
  function i(l) {
    r.save(l), (r.namespaces = l), (r.names = []), (r.skips = []);
    let f;
    const h = (typeof l == 'string' ? l : '').split(/[\s,]+/),
      y = h.length;
    for (f = 0; f < y; f++)
      h[f] &&
        ((l = h[f].replace(/\*/g, '.*?')),
        l[0] === '-'
          ? r.skips.push(new RegExp('^' + l.slice(1) + '$'))
          : r.names.push(new RegExp('^' + l + '$')));
  }
  function s() {
    const l = [...r.names.map(a), ...r.skips.map(a).map((f) => '-' + f)].join(
      ','
    );
    return r.enable(''), l;
  }
  function o(l) {
    if (l[l.length - 1] === '*') return !0;
    let f, h;
    for (f = 0, h = r.skips.length; f < h; f++)
      if (r.skips[f].test(l)) return !1;
    for (f = 0, h = r.names.length; f < h; f++)
      if (r.names[f].test(l)) return !0;
    return !1;
  }
  function a(l) {
    return l
      .toString()
      .substring(2, l.toString().length - 2)
      .replace(/\.\*\?$/, '*');
  }
  function c(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }
  function u() {
    console.warn(
      'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
    );
  }
  return r.enable(r.load()), r;
}
var Iv = xv;
(function (t, e) {
  (e.formatArgs = n),
    (e.save = i),
    (e.load = s),
    (e.useColors = r),
    (e.storage = o()),
    (e.destroy = (() => {
      let c = !1;
      return () => {
        c ||
          ((c = !0),
          console.warn(
            'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
          ));
      };
    })()),
    (e.colors = [
      '#0000CC',
      '#0000FF',
      '#0033CC',
      '#0033FF',
      '#0066CC',
      '#0066FF',
      '#0099CC',
      '#0099FF',
      '#00CC00',
      '#00CC33',
      '#00CC66',
      '#00CC99',
      '#00CCCC',
      '#00CCFF',
      '#3300CC',
      '#3300FF',
      '#3333CC',
      '#3333FF',
      '#3366CC',
      '#3366FF',
      '#3399CC',
      '#3399FF',
      '#33CC00',
      '#33CC33',
      '#33CC66',
      '#33CC99',
      '#33CCCC',
      '#33CCFF',
      '#6600CC',
      '#6600FF',
      '#6633CC',
      '#6633FF',
      '#66CC00',
      '#66CC33',
      '#9900CC',
      '#9900FF',
      '#9933CC',
      '#9933FF',
      '#99CC00',
      '#99CC33',
      '#CC0000',
      '#CC0033',
      '#CC0066',
      '#CC0099',
      '#CC00CC',
      '#CC00FF',
      '#CC3300',
      '#CC3333',
      '#CC3366',
      '#CC3399',
      '#CC33CC',
      '#CC33FF',
      '#CC6600',
      '#CC6633',
      '#CC9900',
      '#CC9933',
      '#CCCC00',
      '#CCCC33',
      '#FF0000',
      '#FF0033',
      '#FF0066',
      '#FF0099',
      '#FF00CC',
      '#FF00FF',
      '#FF3300',
      '#FF3333',
      '#FF3366',
      '#FF3399',
      '#FF33CC',
      '#FF33FF',
      '#FF6600',
      '#FF6633',
      '#FF9900',
      '#FF9933',
      '#FFCC00',
      '#FFCC33',
    ]);
  function r() {
    return typeof window < 'u' &&
      window.process &&
      (window.process.type === 'renderer' || window.process.__nwjs)
      ? !0
      : typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
        ? !1
        : (typeof document < 'u' &&
            document.documentElement &&
            document.documentElement.style &&
            document.documentElement.style.WebkitAppearance) ||
          (typeof window < 'u' &&
            window.console &&
            (window.console.firebug ||
              (window.console.exception && window.console.table))) ||
          (typeof navigator < 'u' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
          (typeof navigator < 'u' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function n(c) {
    if (
      ((c[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        c[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        t.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    const u = 'color: ' + this.color;
    c.splice(1, 0, u, 'color: inherit');
    let l = 0,
      f = 0;
    c[0].replace(/%[a-zA-Z%]/g, (h) => {
      h !== '%%' && (l++, h === '%c' && (f = l));
    }),
      c.splice(f, 0, u);
  }
  e.log = console.debug || console.log || (() => {});
  function i(c) {
    try {
      c ? e.storage.setItem('debug', c) : e.storage.removeItem('debug');
    } catch {}
  }
  function s() {
    let c;
    try {
      c = e.storage.getItem('debug');
    } catch {}
    return !c && typeof process < 'u' && 'env' in process && (c = {}.DEBUG), c;
  }
  function o() {
    try {
      return localStorage;
    } catch {}
  }
  t.exports = Iv(e);
  const { formatters: a } = t.exports;
  a.j = function (c) {
    try {
      return JSON.stringify(c);
    } catch (u) {
      return '[UnexpectedJSONParseError]: ' + u.message;
    }
  };
})(ba, ba.exports);
var kv = ba.exports,
  Mv =
    (O && O.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(Wr, '__esModule', { value: !0 });
Wr.createModuleLogger = Wr.createProjectLogger = void 0;
const Rv = Mv(kv),
  Av = (0, Rv.default)('metamask');
function Tv(t) {
  return Av.extend(t);
}
Wr.createProjectLogger = Tv;
function Ov(t, e) {
  return t.extend(e);
}
Wr.createModuleLogger = Ov;
var bt = {};
Object.defineProperty(bt, '__esModule', { value: !0 });
bt.hexToBigInt = bt.hexToNumber = bt.bigIntToHex = bt.numberToHex = void 0;
const Or = Ce,
  En = Fn,
  Nv = (t) => (
    (0, Or.assert)(typeof t == 'number', 'Value must be a number.'),
    (0, Or.assert)(t >= 0, 'Value must be a non-negative number.'),
    (0, Or.assert)(
      Number.isSafeInteger(t),
      'Value is not a safe integer. Use `bigIntToHex` instead.'
    ),
    (0, En.add0x)(t.toString(16))
  );
bt.numberToHex = Nv;
const Lv = (t) => (
  (0, Or.assert)(typeof t == 'bigint', 'Value must be a bigint.'),
  (0, Or.assert)(t >= 0, 'Value must be a non-negative bigint.'),
  (0, En.add0x)(t.toString(16))
);
bt.bigIntToHex = Lv;
const Pv = (t) => {
  (0, En.assertIsHexString)(t);
  const e = parseInt(t, 16);
  return (
    (0, Or.assert)(
      Number.isSafeInteger(e),
      'Value is not a safe integer. Use `hexToBigInt` instead.'
    ),
    e
  );
};
bt.hexToNumber = Pv;
const Dv = (t) => ((0, En.assertIsHexString)(t), BigInt((0, En.add0x)(t)));
bt.hexToBigInt = Dv;
var Yf = {};
Object.defineProperty(Yf, '__esModule', { value: !0 });
var Kf = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.timeSince = t.inMilliseconds = t.Duration = void 0),
    (function (s) {
      (s[(s.Millisecond = 1)] = 'Millisecond'),
        (s[(s.Second = 1e3)] = 'Second'),
        (s[(s.Minute = 6e4)] = 'Minute'),
        (s[(s.Hour = 36e5)] = 'Hour'),
        (s[(s.Day = 864e5)] = 'Day'),
        (s[(s.Week = 6048e5)] = 'Week'),
        (s[(s.Year = 31536e6)] = 'Year');
    })(t.Duration || (t.Duration = {}));
  const e = (s) => Number.isInteger(s) && s >= 0,
    r = (s, o) => {
      if (!e(s))
        throw new Error(
          `"${o}" must be a non-negative integer. Received: "${s}".`
        );
    };
  function n(s, o) {
    return r(s, 'count'), s * o;
  }
  t.inMilliseconds = n;
  function i(s) {
    return r(s, 'timestamp'), Date.now() - s;
  }
  t.timeSince = i;
})(Kf);
var Xf = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.satisfiesVersionRange =
      t.gtRange =
      t.gtVersion =
      t.assertIsSemVerRange =
      t.assertIsSemVerVersion =
      t.isValidSemVerRange =
      t.isValidSemVerVersion =
      t.VersionRangeStruct =
      t.VersionStruct =
        void 0);
  const e = ud,
    r = br,
    n = Ce;
  (t.VersionStruct = (0, r.refine)((0, r.string)(), 'Version', (f) =>
    (0, e.valid)(f) === null ? `Expected SemVer version, got "${f}"` : !0
  )),
    (t.VersionRangeStruct = (0, r.refine)(
      (0, r.string)(),
      'Version range',
      (f) =>
        (0, e.validRange)(f) === null ? `Expected SemVer range, got "${f}"` : !0
    ));
  function i(f) {
    return (0, r.is)(f, t.VersionStruct);
  }
  t.isValidSemVerVersion = i;
  function s(f) {
    return (0, r.is)(f, t.VersionRangeStruct);
  }
  t.isValidSemVerRange = s;
  function o(f) {
    (0, n.assertStruct)(f, t.VersionStruct);
  }
  t.assertIsSemVerVersion = o;
  function a(f) {
    (0, n.assertStruct)(f, t.VersionRangeStruct);
  }
  t.assertIsSemVerRange = a;
  function c(f, h) {
    return (0, e.gt)(f, h);
  }
  t.gtVersion = c;
  function u(f, h) {
    return (0, e.gtr)(f, h);
  }
  t.gtRange = u;
  function l(f, h) {
    return (0, e.satisfies)(f, h, { includePrerelease: !0 });
  }
  t.satisfiesVersionRange = l;
})(Xf);
(function (t) {
  var e =
      (O && O.__createBinding) ||
      (Object.create
        ? function (n, i, s, o) {
            o === void 0 && (o = s);
            var a = Object.getOwnPropertyDescriptor(i, s);
            (!a ||
              ('get' in a ? !i.__esModule : a.writable || a.configurable)) &&
              (a = {
                enumerable: !0,
                get: function () {
                  return i[s];
                },
              }),
              Object.defineProperty(n, o, a);
          }
        : function (n, i, s, o) {
            o === void 0 && (o = s), (n[o] = i[s]);
          }),
    r =
      (O && O.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== 'default' &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, '__esModule', { value: !0 }),
    r(Ce, t),
    r(jn, t),
    r(Z, t),
    r(Hi, t),
    r(pt, t),
    r($r, t),
    r(Fn, t),
    r(Zf, t),
    r(Wr, t),
    r(Za, t),
    r(bt, t),
    r(Yf, t),
    r(Kf, t),
    r(Xf, t);
})(Tf);
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.createModuleLogger = t.projectLogger = void 0);
  const e = Tf;
  Object.defineProperty(t, 'createModuleLogger', {
    enumerable: !0,
    get: function () {
      return e.createModuleLogger;
    },
  }),
    (t.projectLogger = (0, e.createProjectLogger)('eth-block-tracker'));
})(Af);
var eh =
  (O && O.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty($i, '__esModule', { value: !0 });
$i.PollingBlockTracker = void 0;
const Bv = eh($a),
  jv = eh(iy),
  Fv = Dn,
  Lu = Af,
  Pu = (0, Lu.createModuleLogger)(Lu.projectLogger, 'polling-block-tracker'),
  $v = (0, Bv.default)(),
  Wv = 1e3;
class Hv extends Fv.BaseBlockTracker {
  constructor(e = {}) {
    var r;
    if (!e.provider)
      throw new Error('PollingBlockTracker - no provider specified.');
    super({
      blockResetDuration:
        (r = e.blockResetDuration) !== null && r !== void 0
          ? r
          : e.pollingInterval,
    }),
      (this._provider = e.provider),
      (this._pollingInterval = e.pollingInterval || 20 * Wv),
      (this._retryTimeout = e.retryTimeout || this._pollingInterval / 10),
      (this._keepEventLoopActive =
        e.keepEventLoopActive === void 0 ? !0 : e.keepEventLoopActive),
      (this._setSkipCacheFlag = e.setSkipCacheFlag || !1);
  }
  async checkForLatestBlock() {
    return await this._updateLatestBlock(), await this.getLatestBlock();
  }
  async _start() {
    this._synchronize();
  }
  async _end() {}
  async _synchronize() {
    for (var e; this._isRunning; )
      try {
        await this._updateLatestBlock();
        const r = Du(this._pollingInterval, !this._keepEventLoopActive);
        this.emit('_waitingForNextIteration'), await r;
      } catch (r) {
        const n =
          new Error(`PollingBlockTracker - encountered an error while attempting to update latest block:
${(e = r.stack) !== null && e !== void 0 ? e : r}`);
        try {
          this.emit('error', n);
        } catch {
          console.error(n);
        }
        const i = Du(this._retryTimeout, !this._keepEventLoopActive);
        this.emit('_waitingForNextIteration'), await i;
      }
  }
  async _updateLatestBlock() {
    const e = await this._fetchLatestBlock();
    this._newPotentialLatest(e);
  }
  async _fetchLatestBlock() {
    const e = {
      jsonrpc: '2.0',
      id: $v(),
      method: 'eth_blockNumber',
      params: [],
    };
    this._setSkipCacheFlag && (e.skipCache = !0), Pu('Making request', e);
    const r = await (0, jv.default)((n) => this._provider.sendAsync(e, n))();
    if ((Pu('Got response', r), r.error))
      throw new Error(`PollingBlockTracker - encountered error fetching block:
${r.error.message}`);
    return r.result;
  }
}
$i.PollingBlockTracker = Hv;
function Du(t, e) {
  return new Promise((r) => {
    const n = setTimeout(r, t);
    n.unref && e && n.unref();
  });
}
var Ui = {},
  Vv =
    (O && O.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(Ui, '__esModule', { value: !0 });
Ui.SubscribeBlockTracker = void 0;
const Uv = Vv($a),
  zv = Dn,
  qv = (0, Uv.default)();
class Jv extends zv.BaseBlockTracker {
  constructor(e = {}) {
    if (!e.provider)
      throw new Error('SubscribeBlockTracker - no provider specified.');
    super(e), (this._provider = e.provider), (this._subscriptionId = null);
  }
  async checkForLatestBlock() {
    return await this.getLatestBlock();
  }
  async _start() {
    if (this._subscriptionId === void 0 || this._subscriptionId === null)
      try {
        const e = await this._call('eth_blockNumber');
        (this._subscriptionId = await this._call('eth_subscribe', 'newHeads')),
          this._provider.on('data', this._handleSubData.bind(this)),
          this._newPotentialLatest(e);
      } catch (e) {
        this.emit('error', e);
      }
  }
  async _end() {
    if (this._subscriptionId !== null && this._subscriptionId !== void 0)
      try {
        await this._call('eth_unsubscribe', this._subscriptionId),
          (this._subscriptionId = null);
      } catch (e) {
        this.emit('error', e);
      }
  }
  _call(e, ...r) {
    return new Promise((n, i) => {
      this._provider.sendAsync(
        { id: qv(), method: e, params: r, jsonrpc: '2.0' },
        (s, o) => {
          s ? i(s) : n(o.result);
        }
      );
    });
  }
  _handleSubData(e, r) {
    var n;
    r.method === 'eth_subscription' &&
      ((n = r.params) === null || n === void 0 ? void 0 : n.subscription) ===
        this._subscriptionId &&
      this._newPotentialLatest(r.params.result.number);
  }
}
Ui.SubscribeBlockTracker = Jv;
var th = {};
Object.defineProperty(th, '__esModule', { value: !0 });
(function (t) {
  var e =
      (O && O.__createBinding) ||
      (Object.create
        ? function (n, i, s, o) {
            o === void 0 && (o = s),
              Object.defineProperty(n, o, {
                enumerable: !0,
                get: function () {
                  return i[s];
                },
              });
          }
        : function (n, i, s, o) {
            o === void 0 && (o = s), (n[o] = i[s]);
          }),
    r =
      (O && O.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== 'default' &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, '__esModule', { value: !0 }),
    r($i, t),
    r(Ui, t),
    r(th, t);
})(Rf);
var Ya = {},
  zi = {},
  $n = {};
Object.defineProperty($n, '__esModule', { value: !0 });
$n.getUniqueId = void 0;
const rh = 4294967295;
let $o = Math.floor(Math.random() * rh);
function Gv() {
  return ($o = ($o + 1) % rh), $o;
}
$n.getUniqueId = Gv;
Object.defineProperty(zi, '__esModule', { value: !0 });
zi.createIdRemapMiddleware = void 0;
const Qv = $n;
function Zv() {
  return (t, e, r, n) => {
    const i = t.id,
      s = Qv.getUniqueId();
    (t.id = s),
      (e.id = s),
      r((o) => {
        (t.id = i), (e.id = i), o();
      });
  };
}
zi.createIdRemapMiddleware = Zv;
var qi = {};
Object.defineProperty(qi, '__esModule', { value: !0 });
qi.createAsyncMiddleware = void 0;
function Yv(t) {
  return async (e, r, n, i) => {
    let s;
    const o = new Promise((l) => {
      s = l;
    });
    let a = null,
      c = !1;
    const u = async () => {
      (c = !0),
        n((l) => {
          (a = l), s();
        }),
        await o;
    };
    try {
      await t(e, r, u), c ? (await o, a(null)) : i(null);
    } catch (l) {
      a ? a(l) : i(l);
    }
  };
}
qi.createAsyncMiddleware = Yv;
var Ji = {};
Object.defineProperty(Ji, '__esModule', { value: !0 });
Ji.createScaffoldMiddleware = void 0;
function Kv(t) {
  return (e, r, n, i) => {
    const s = t[e.method];
    return s === void 0
      ? n()
      : typeof s == 'function'
        ? s(e, r, n, i)
        : ((r.result = s), i());
  };
}
Ji.createScaffoldMiddleware = Kv;
var Wn = {},
  Xv =
    (O && O.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(Wn, '__esModule', { value: !0 });
Wn.JsonRpcEngine = void 0;
const e1 = Xv(ur),
  Ve = Ia;
class Et extends e1.default {
  constructor() {
    super(), (this._middleware = []);
  }
  push(e) {
    this._middleware.push(e);
  }
  handle(e, r) {
    if (r && typeof r != 'function')
      throw new Error('"callback" must be a function if provided.');
    return Array.isArray(e)
      ? r
        ? this._handleBatch(e, r)
        : this._handleBatch(e)
      : r
        ? this._handle(e, r)
        : this._promiseHandle(e);
  }
  asMiddleware() {
    return async (e, r, n, i) => {
      try {
        const [s, o, a] = await Et._runAllMiddleware(e, r, this._middleware);
        return o
          ? (await Et._runReturnHandlers(a), i(s))
          : n(async (c) => {
              try {
                await Et._runReturnHandlers(a);
              } catch (u) {
                return c(u);
              }
              return c();
            });
      } catch (s) {
        return i(s);
      }
    };
  }
  async _handleBatch(e, r) {
    try {
      const n = await Promise.all(e.map(this._promiseHandle.bind(this)));
      return r ? r(null, n) : n;
    } catch (n) {
      if (r) return r(n);
      throw n;
    }
  }
  _promiseHandle(e) {
    return new Promise((r) => {
      this._handle(e, (n, i) => {
        r(i);
      });
    });
  }
  async _handle(e, r) {
    if (!e || Array.isArray(e) || typeof e != 'object') {
      const o = new Ve.EthereumRpcError(
        Ve.errorCodes.rpc.invalidRequest,
        `Requests must be plain objects. Received: ${typeof e}`,
        { request: e }
      );
      return r(o, { id: void 0, jsonrpc: '2.0', error: o });
    }
    if (typeof e.method != 'string') {
      const o = new Ve.EthereumRpcError(
        Ve.errorCodes.rpc.invalidRequest,
        `Must specify a string method. Received: ${typeof e.method}`,
        { request: e }
      );
      return r(o, { id: e.id, jsonrpc: '2.0', error: o });
    }
    const n = Object.assign({}, e),
      i = { id: n.id, jsonrpc: n.jsonrpc };
    let s = null;
    try {
      await this._processRequest(n, i);
    } catch (o) {
      s = o;
    }
    return (
      s && (delete i.result, i.error || (i.error = Ve.serializeError(s))),
      r(s, i)
    );
  }
  async _processRequest(e, r) {
    const [n, i, s] = await Et._runAllMiddleware(e, r, this._middleware);
    if ((Et._checkForCompletion(e, r, i), await Et._runReturnHandlers(s), n))
      throw n;
  }
  static async _runAllMiddleware(e, r, n) {
    const i = [];
    let s = null,
      o = !1;
    for (const a of n)
      if ((([s, o] = await Et._runMiddleware(e, r, a, i)), o)) break;
    return [s, o, i.reverse()];
  }
  static _runMiddleware(e, r, n, i) {
    return new Promise((s) => {
      const o = (c) => {
          const u = c || r.error;
          u && (r.error = Ve.serializeError(u)), s([u, !0]);
        },
        a = (c) => {
          r.error
            ? o(r.error)
            : (c &&
                (typeof c != 'function' &&
                  o(
                    new Ve.EthereumRpcError(
                      Ve.errorCodes.rpc.internal,
                      `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof c}" for request:
${Wo(e)}`,
                      { request: e }
                    )
                  ),
                i.push(c)),
              s([null, !1]));
        };
      try {
        n(e, r, a, o);
      } catch (c) {
        o(c);
      }
    });
  }
  static async _runReturnHandlers(e) {
    for (const r of e)
      await new Promise((n, i) => {
        r((s) => (s ? i(s) : n()));
      });
  }
  static _checkForCompletion(e, r, n) {
    if (!('result' in r) && !('error' in r))
      throw new Ve.EthereumRpcError(
        Ve.errorCodes.rpc.internal,
        `JsonRpcEngine: Response has no error or result for request:
${Wo(e)}`,
        { request: e }
      );
    if (!n)
      throw new Ve.EthereumRpcError(
        Ve.errorCodes.rpc.internal,
        `JsonRpcEngine: Nothing ended request:
${Wo(e)}`,
        { request: e }
      );
  }
}
Wn.JsonRpcEngine = Et;
function Wo(t) {
  return JSON.stringify(t, null, 2);
}
var Gi = {};
Object.defineProperty(Gi, '__esModule', { value: !0 });
Gi.mergeMiddleware = void 0;
const t1 = Wn;
function r1(t) {
  const e = new t1.JsonRpcEngine();
  return t.forEach((r) => e.push(r)), e.asMiddleware();
}
Gi.mergeMiddleware = r1;
(function (t) {
  var e =
      (O && O.__createBinding) ||
      (Object.create
        ? function (n, i, s, o) {
            o === void 0 && (o = s),
              Object.defineProperty(n, o, {
                enumerable: !0,
                get: function () {
                  return i[s];
                },
              });
          }
        : function (n, i, s, o) {
            o === void 0 && (o = s), (n[o] = i[s]);
          }),
    r =
      (O && O.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== 'default' &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, '__esModule', { value: !0 }),
    r(zi, t),
    r(qi, t),
    r(Ji, t),
    r($n, t),
    r(Wn, t),
    r(Gi, t);
})(Ya);
var nh = {},
  Ka = {};
const Xa = cr(ld);
var Qi = {};
Object.defineProperty(Qi, '__esModule', { value: !0 });
var Bu = Xa,
  n1 = (function () {
    function t(e) {
      if (((this._maxConcurrency = e), (this._queue = []), e <= 0))
        throw new Error('semaphore must be initialized to a positive value');
      this._value = e;
    }
    return (
      (t.prototype.acquire = function () {
        var e = this,
          r = this.isLocked(),
          n = new Promise(function (i) {
            return e._queue.push(i);
          });
        return r || this._dispatch(), n;
      }),
      (t.prototype.runExclusive = function (e) {
        return Bu.__awaiter(this, void 0, void 0, function () {
          var r, n, i;
          return Bu.__generator(this, function (s) {
            switch (s.label) {
              case 0:
                return [4, this.acquire()];
              case 1:
                (r = s.sent()), (n = r[0]), (i = r[1]), (s.label = 2);
              case 2:
                return s.trys.push([2, , 4, 5]), [4, e(n)];
              case 3:
                return [2, s.sent()];
              case 4:
                return i(), [7];
              case 5:
                return [2];
            }
          });
        });
      }),
      (t.prototype.isLocked = function () {
        return this._value <= 0;
      }),
      (t.prototype.release = function () {
        if (this._maxConcurrency > 1)
          throw new Error(
            'this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead'
          );
        if (this._currentReleaser) {
          var e = this._currentReleaser;
          (this._currentReleaser = void 0), e();
        }
      }),
      (t.prototype._dispatch = function () {
        var e = this,
          r = this._queue.shift();
        if (r) {
          var n = !1;
          (this._currentReleaser = function () {
            n || ((n = !0), e._value++, e._dispatch());
          }),
            r([this._value--, this._currentReleaser]);
        }
      }),
      t
    );
  })();
Qi.default = n1;
Object.defineProperty(Ka, '__esModule', { value: !0 });
var ju = Xa,
  i1 = Qi,
  s1 = (function () {
    function t() {
      this._semaphore = new i1.default(1);
    }
    return (
      (t.prototype.acquire = function () {
        return ju.__awaiter(this, void 0, void 0, function () {
          var e, r;
          return ju.__generator(this, function (n) {
            switch (n.label) {
              case 0:
                return [4, this._semaphore.acquire()];
              case 1:
                return (e = n.sent()), (r = e[1]), [2, r];
            }
          });
        });
      }),
      (t.prototype.runExclusive = function (e) {
        return this._semaphore.runExclusive(function () {
          return e();
        });
      }),
      (t.prototype.isLocked = function () {
        return this._semaphore.isLocked();
      }),
      (t.prototype.release = function () {
        this._semaphore.release();
      }),
      t
    );
  })();
Ka.default = s1;
var Zi = {};
Object.defineProperty(Zi, '__esModule', { value: !0 });
Zi.withTimeout = void 0;
var ri = Xa;
function o1(t, e, r) {
  var n = this;
  return (
    r === void 0 && (r = new Error('timeout')),
    {
      acquire: function () {
        return new Promise(function (i, s) {
          return ri.__awaiter(n, void 0, void 0, function () {
            var o, a, c;
            return ri.__generator(this, function (u) {
              switch (u.label) {
                case 0:
                  return (
                    (o = !1),
                    setTimeout(function () {
                      (o = !0), s(r);
                    }, e),
                    [4, t.acquire()]
                  );
                case 1:
                  return (
                    (a = u.sent()),
                    o ? ((c = Array.isArray(a) ? a[1] : a), c()) : i(a),
                    [2]
                  );
              }
            });
          });
        });
      },
      runExclusive: function (i) {
        return ri.__awaiter(this, void 0, void 0, function () {
          var s, o;
          return ri.__generator(this, function (a) {
            switch (a.label) {
              case 0:
                (s = function () {}), (a.label = 1);
              case 1:
                return a.trys.push([1, , 7, 8]), [4, this.acquire()];
              case 2:
                return (
                  (o = a.sent()),
                  Array.isArray(o) ? ((s = o[1]), [4, i(o[0])]) : [3, 4]
                );
              case 3:
                return [2, a.sent()];
              case 4:
                return (s = o), [4, i()];
              case 5:
                return [2, a.sent()];
              case 6:
                return [3, 8];
              case 7:
                return s(), [7];
              case 8:
                return [2];
            }
          });
        });
      },
      release: function () {
        t.release();
      },
      isLocked: function () {
        return t.isLocked();
      },
    }
  );
}
Zi.withTimeout = o1;
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.withTimeout = t.Semaphore = t.Mutex = void 0);
  var e = Ka;
  Object.defineProperty(t, 'Mutex', {
    enumerable: !0,
    get: function () {
      return e.default;
    },
  });
  var r = Qi;
  Object.defineProperty(t, 'Semaphore', {
    enumerable: !0,
    get: function () {
      return r.default;
    },
  });
  var n = Zi;
  Object.defineProperty(t, 'withTimeout', {
    enumerable: !0,
    get: function () {
      return n.withTimeout;
    },
  });
})(nh);
var a1 = u1,
  c1 = Object.prototype.hasOwnProperty;
function u1() {
  for (var t = {}, e = 0; e < arguments.length; e++) {
    var r = arguments[e];
    for (var n in r) c1.call(r, n) && (t[n] = r[n]);
  }
  return t;
}
const l1 = a1,
  f1 = $a();
var h1 = $;
function $(t) {
  const e = this;
  e.currentProvider = t;
}
$.prototype.getBalance = Hn(2, 'eth_getBalance');
$.prototype.getCode = Hn(2, 'eth_getCode');
$.prototype.getTransactionCount = Hn(2, 'eth_getTransactionCount');
$.prototype.getStorageAt = Hn(3, 'eth_getStorageAt');
$.prototype.call = Hn(2, 'eth_call');
$.prototype.protocolVersion = q('eth_protocolVersion');
$.prototype.syncing = q('eth_syncing');
$.prototype.coinbase = q('eth_coinbase');
$.prototype.mining = q('eth_mining');
$.prototype.hashrate = q('eth_hashrate');
$.prototype.gasPrice = q('eth_gasPrice');
$.prototype.accounts = q('eth_accounts');
$.prototype.blockNumber = q('eth_blockNumber');
$.prototype.getBlockTransactionCountByHash = q(
  'eth_getBlockTransactionCountByHash'
);
$.prototype.getBlockTransactionCountByNumber = q(
  'eth_getBlockTransactionCountByNumber'
);
$.prototype.getUncleCountByBlockHash = q('eth_getUncleCountByBlockHash');
$.prototype.getUncleCountByBlockNumber = q('eth_getUncleCountByBlockNumber');
$.prototype.sign = q('eth_sign');
$.prototype.sendTransaction = q('eth_sendTransaction');
$.prototype.sendRawTransaction = q('eth_sendRawTransaction');
$.prototype.estimateGas = q('eth_estimateGas');
$.prototype.getBlockByHash = q('eth_getBlockByHash');
$.prototype.getBlockByNumber = q('eth_getBlockByNumber');
$.prototype.getTransactionByHash = q('eth_getTransactionByHash');
$.prototype.getTransactionByBlockHashAndIndex = q(
  'eth_getTransactionByBlockHashAndIndex'
);
$.prototype.getTransactionByBlockNumberAndIndex = q(
  'eth_getTransactionByBlockNumberAndIndex'
);
$.prototype.getTransactionReceipt = q('eth_getTransactionReceipt');
$.prototype.getUncleByBlockHashAndIndex = q('eth_getUncleByBlockHashAndIndex');
$.prototype.getUncleByBlockNumberAndIndex = q(
  'eth_getUncleByBlockNumberAndIndex'
);
$.prototype.getCompilers = q('eth_getCompilers');
$.prototype.compileLLL = q('eth_compileLLL');
$.prototype.compileSolidity = q('eth_compileSolidity');
$.prototype.compileSerpent = q('eth_compileSerpent');
$.prototype.newFilter = q('eth_newFilter');
$.prototype.newBlockFilter = q('eth_newBlockFilter');
$.prototype.newPendingTransactionFilter = q('eth_newPendingTransactionFilter');
$.prototype.uninstallFilter = q('eth_uninstallFilter');
$.prototype.getFilterChanges = q('eth_getFilterChanges');
$.prototype.getFilterLogs = q('eth_getFilterLogs');
$.prototype.getLogs = q('eth_getLogs');
$.prototype.getWork = q('eth_getWork');
$.prototype.submitWork = q('eth_submitWork');
$.prototype.submitHashrate = q('eth_submitHashrate');
$.prototype.sendAsync = function (t, e) {
  this.currentProvider.sendAsync(d1(t), function (n, i) {
    if (
      (!n &&
        i.error &&
        (n = new Error('EthQuery - RPC Error - ' + i.error.message)),
      n)
    )
      return e(n);
    e(null, i.result);
  });
};
function q(t) {
  return function () {
    const e = this;
    var r = [].slice.call(arguments),
      n = r.pop();
    e.sendAsync({ method: t, params: r }, n);
  };
}
function Hn(t, e) {
  return function () {
    const r = this;
    var n = [].slice.call(arguments),
      i = n.pop();
    n.length < t && n.push('latest'), r.sendAsync({ method: e, params: n }, i);
  };
}
function d1(t) {
  return l1({ id: f1(), jsonrpc: '2.0', params: [] }, t);
}
const Fu = (t, e, r, n) =>
    function (...i) {
      const s = e.promiseModule;
      return new s((o, a) => {
        e.multiArgs
          ? i.push((...u) => {
              e.errorFirst ? (u[0] ? a(u) : (u.shift(), o(u))) : o(u);
            })
          : e.errorFirst
            ? i.push((u, l) => {
                u ? a(u) : o(l);
              })
            : i.push(o),
          Reflect.apply(t, this === r ? n : this, i);
      });
    },
  $u = new WeakMap();
var p1 = (t, e) => {
  e = {
    exclude: [/.+(?:Sync|Stream)$/],
    errorFirst: !0,
    promiseModule: Promise,
    ...e,
  };
  const r = typeof t;
  if (!(t !== null && (r === 'object' || r === 'function')))
    throw new TypeError(
      `Expected \`input\` to be a \`Function\` or \`Object\`, got \`${t === null ? 'null' : r}\``
    );
  const n = (o, a) => {
      let c = $u.get(o);
      if ((c || ((c = {}), $u.set(o, c)), a in c)) return c[a];
      const u = (_) =>
          typeof _ == 'string' || typeof a == 'symbol' ? a === _ : _.test(a),
        l = Reflect.getOwnPropertyDescriptor(o, a),
        f = l === void 0 || l.writable || l.configurable,
        y = (e.include ? e.include.some(u) : !e.exclude.some(u)) && f;
      return (c[a] = y), y;
    },
    i = new WeakMap(),
    s = new Proxy(t, {
      apply(o, a, c) {
        const u = i.get(o);
        if (u) return Reflect.apply(u, a, c);
        const l = e.excludeMain ? o : Fu(o, e, s, o);
        return i.set(o, l), Reflect.apply(l, a, c);
      },
      get(o, a) {
        const c = o[a];
        if (!n(o, a) || c === Function.prototype[a]) return c;
        const u = i.get(c);
        if (u) return u;
        if (typeof c == 'function') {
          const l = Fu(c, e, s, o);
          return i.set(c, l), l;
        }
        return c;
      },
    });
  return s;
};
const b1 = ur.default;
let g1 = class extends b1 {
  constructor() {
    super(), (this.updates = []);
  }
  async initialize() {}
  async update() {
    throw new Error('BaseFilter - no update method specified');
  }
  addResults(e) {
    (this.updates = this.updates.concat(e)),
      e.forEach((r) => this.emit('update', r));
  }
  addInitialResults(e) {}
  getChangesAndClear() {
    const e = this.updates;
    return (this.updates = []), e;
  }
};
var ec = g1;
const y1 = ec;
let v1 = class extends y1 {
  constructor() {
    super(), (this.allResults = []);
  }
  async update() {
    throw new Error('BaseFilterWithHistory - no update method specified');
  }
  addResults(e) {
    (this.allResults = this.allResults.concat(e)), super.addResults(e);
  }
  addInitialResults(e) {
    (this.allResults = this.allResults.concat(e)), super.addInitialResults(e);
  }
  getAllResults() {
    return this.allResults;
  }
};
var m1 = v1,
  Vn = {
    minBlockRef: w1,
    maxBlockRef: _1,
    sortBlockRefs: tc,
    bnToHex: S1,
    blockRefIsNumber: E1,
    hexToInt: mi,
    incrementHexInt: C1,
    intToHex: ih,
    unsafeRandomBytes: x1,
  };
function w1(...t) {
  return tc(t)[0];
}
function _1(...t) {
  const e = tc(t);
  return e[e.length - 1];
}
function tc(t) {
  return t.sort((e, r) =>
    e === 'latest' || r === 'earliest'
      ? 1
      : r === 'latest' || e === 'earliest'
        ? -1
        : mi(e) - mi(r)
  );
}
function S1(t) {
  return '0x' + t.toString(16);
}
function E1(t) {
  return t && !['earliest', 'latest', 'pending'].includes(t);
}
function mi(t) {
  return t == null ? t : Number.parseInt(t, 16);
}
function C1(t) {
  if (t == null) return t;
  const e = mi(t);
  return ih(e + 1);
}
function ih(t) {
  if (t == null) return t;
  let e = t.toString(16);
  return e.length % 2 && (e = '0' + e), '0x' + e;
}
function x1(t) {
  let e = '0x';
  for (let r = 0; r < t; r++) (e += Wu()), (e += Wu());
  return e;
}
function Wu() {
  return Math.floor(Math.random() * 16).toString(16);
}
const I1 = h1,
  k1 = p1,
  M1 = m1,
  {
    bnToHex: R4,
    hexToInt: ni,
    incrementHexInt: R1,
    minBlockRef: A1,
    blockRefIsNumber: T1,
  } = Vn;
let O1 = class extends M1 {
  constructor({ provider: e, params: r }) {
    super(),
      (this.type = 'log'),
      (this.ethQuery = new I1(e)),
      (this.params = Object.assign(
        { fromBlock: 'latest', toBlock: 'latest', address: void 0, topics: [] },
        r
      )),
      this.params.address &&
        (Array.isArray(this.params.address) ||
          (this.params.address = [this.params.address]),
        (this.params.address = this.params.address.map((n) =>
          n.toLowerCase()
        )));
  }
  async initialize({ currentBlock: e }) {
    let r = this.params.fromBlock;
    ['latest', 'pending'].includes(r) && (r = e),
      r === 'earliest' && (r = '0x0'),
      (this.params.fromBlock = r);
    const n = A1(this.params.toBlock, e),
      i = Object.assign({}, this.params, { toBlock: n }),
      s = await this._fetchLogs(i);
    this.addInitialResults(s);
  }
  async update({ oldBlock: e, newBlock: r }) {
    const n = r;
    let i;
    e ? (i = R1(e)) : (i = r);
    const s = Object.assign({}, this.params, { fromBlock: i, toBlock: n }),
      a = (await this._fetchLogs(s)).filter((c) => this.matchLog(c));
    this.addResults(a);
  }
  async _fetchLogs(e) {
    return await k1((n) => this.ethQuery.getLogs(e, n))();
  }
  matchLog(e) {
    if (
      ni(this.params.fromBlock) >= ni(e.blockNumber) ||
      (T1(this.params.toBlock) && ni(this.params.toBlock) <= ni(e.blockNumber))
    )
      return !1;
    const r = e.address && e.address.toLowerCase();
    return this.params.address && r && !this.params.address.includes(r)
      ? !1
      : this.params.topics.every((i, s) => {
          let o = e.topics[s];
          if (!o) return !1;
          o = o.toLowerCase();
          let a = Array.isArray(i) ? i : [i];
          return a.includes(null)
            ? !0
            : ((a = a.map((l) => l.toLowerCase())), a.includes(o));
        });
  }
};
var N1 = O1,
  rc = L1;
async function L1({ provider: t, fromBlock: e, toBlock: r }) {
  e || (e = r);
  const n = Hu(e),
    s = Hu(r) - n + 1,
    o = Array(s)
      .fill()
      .map((c, u) => n + u)
      .map(P1);
  return await Promise.all(
    o.map((c) => B1(t, 'eth_getBlockByNumber', [c, !1]))
  );
}
function Hu(t) {
  return t == null ? t : Number.parseInt(t, 16);
}
function P1(t) {
  return t == null ? t : '0x' + t.toString(16);
}
function D1(t, e) {
  return new Promise((r, n) => {
    t.sendAsync(e, (i, s) => {
      i
        ? n(i)
        : s.error
          ? n(s.error)
          : s.result
            ? r(s.result)
            : n(new Error('Result was empty'));
    });
  });
}
async function B1(t, e, r) {
  for (let n = 0; n < 3; n++)
    try {
      return await D1(t, { id: 1, jsonrpc: '2.0', method: e, params: r });
    } catch (i) {
      console.error(`provider.sendAsync failed: ${i.stack || i.message || i}`);
    }
  throw new Error(`Block not found for params: ${JSON.stringify(r)}`);
}
const j1 = ec,
  F1 = rc,
  { incrementHexInt: $1 } = Vn;
let W1 = class extends j1 {
  constructor({ provider: e, params: r }) {
    super(), (this.type = 'block'), (this.provider = e);
  }
  async update({ oldBlock: e, newBlock: r }) {
    const n = r,
      i = $1(e),
      o = (await F1({ provider: this.provider, fromBlock: i, toBlock: n })).map(
        (a) => a.hash
      );
    this.addResults(o);
  }
};
var H1 = W1;
const V1 = ec,
  U1 = rc,
  { incrementHexInt: z1 } = Vn;
let q1 = class extends V1 {
  constructor({ provider: e }) {
    super(), (this.type = 'tx'), (this.provider = e);
  }
  async update({ oldBlock: e }) {
    const r = e,
      n = z1(e),
      i = await U1({ provider: this.provider, fromBlock: n, toBlock: r }),
      s = [];
    for (const o of i) s.push(...o.transactions);
    this.addResults(s);
  }
};
var J1 = q1;
const G1 = nh.Mutex,
  { createAsyncMiddleware: Q1, createScaffoldMiddleware: Z1 } = Ya,
  Y1 = N1,
  K1 = H1,
  X1 = J1,
  { intToHex: sh, hexToInt: Ho } = Vn;
var em = tm;
function tm({ blockTracker: t, provider: e }) {
  let r = 0,
    n = {};
  const i = new G1(),
    s = rm({ mutex: i }),
    o = Z1({
      eth_newFilter: s(Vo(c)),
      eth_newBlockFilter: s(Vo(u)),
      eth_newPendingTransactionFilter: s(Vo(l)),
      eth_uninstallFilter: s(fi(y)),
      eth_getFilterChanges: s(fi(f)),
      eth_getFilterLogs: s(fi(h)),
    }),
    a = async ({ oldBlock: g, newBlock: w }) => {
      if (n.length === 0) return;
      const C = await i.acquire();
      try {
        await Promise.all(
          Sr(n).map(async (S) => {
            try {
              await S.update({ oldBlock: g, newBlock: w });
            } catch (M) {
              console.error(M);
            }
          })
        );
      } catch (S) {
        console.error(S);
      }
      C();
    };
  return (
    (o.newLogFilter = c),
    (o.newBlockFilter = u),
    (o.newPendingTransactionFilter = l),
    (o.uninstallFilter = y),
    (o.getFilterChanges = f),
    (o.getFilterLogs = h),
    (o.destroy = () => {
      E();
    }),
    o
  );
  async function c(g) {
    const w = new Y1({ provider: e, params: g });
    return await _(w), w;
  }
  async function u() {
    const g = new K1({ provider: e });
    return await _(g), g;
  }
  async function l() {
    const g = new X1({ provider: e });
    return await _(g), g;
  }
  async function f(g) {
    const w = Ho(g),
      C = n[w];
    if (!C) throw new Error(`No filter for index "${w}"`);
    return C.getChangesAndClear();
  }
  async function h(g) {
    const w = Ho(g),
      C = n[w];
    if (!C) throw new Error(`No filter for index "${w}"`);
    let S = [];
    return C.type === 'log' && (S = C.getAllResults()), S;
  }
  async function y(g) {
    const w = Ho(g),
      S = !!n[w];
    return S && (await x(w)), S;
  }
  async function _(g) {
    const w = Sr(n).length,
      C = await t.getLatestBlock();
    await g.initialize({ currentBlock: C }),
      r++,
      (n[r] = g),
      (g.id = r),
      (g.idHex = sh(r));
    const S = Sr(n).length;
    return b({ prevFilterCount: w, newFilterCount: S }), r;
  }
  async function x(g) {
    const w = Sr(n).length;
    delete n[g];
    const C = Sr(n).length;
    b({ prevFilterCount: w, newFilterCount: C });
  }
  async function E() {
    const g = Sr(n).length;
    (n = {}), b({ prevFilterCount: g, newFilterCount: 0 });
  }
  function b({ prevFilterCount: g, newFilterCount: w }) {
    if (g === 0 && w > 0) {
      t.on('sync', a);
      return;
    }
    if (g > 0 && w === 0) {
      t.removeListener('sync', a);
      return;
    }
  }
}
function Vo(t) {
  return fi(async (...e) => {
    const r = await t(...e);
    return sh(r.id);
  });
}
function fi(t) {
  return Q1(async (e, r) => {
    const n = await t.apply(null, e.params);
    r.result = n;
  });
}
function rm({ mutex: t }) {
  return (e) => async (r, n, i, s) => {
    (await t.acquire())(), e(r, n, i, s);
  };
}
function Sr(t, e) {
  const r = [];
  for (let n in t) r.push(t[n]);
  return r;
}
const nm = ur.default,
  { createAsyncMiddleware: Vu, createScaffoldMiddleware: im } = Ya,
  sm = em,
  { unsafeRandomBytes: om, incrementHexInt: am } = Vn,
  cm = rc;
var um = lm;
function lm({ blockTracker: t, provider: e }) {
  const r = {},
    n = sm({ blockTracker: t, provider: e });
  let i = !1;
  const s = new nm(),
    o = im({ eth_subscribe: Vu(a), eth_unsubscribe: Vu(c) });
  return (o.destroy = l), { events: s, middleware: o };
  async function a(f, h) {
    if (i)
      throw new Error(
        'SubscriptionManager - attempting to use after destroying'
      );
    const y = f.params[0],
      _ = om(16);
    let x;
    switch (y) {
      case 'newHeads':
        x = E({ subId: _ });
        break;
      case 'logs':
        const g = f.params[1],
          w = await n.newLogFilter(g);
        x = b({ subId: _, filter: w });
        break;
      default:
        throw new Error(
          `SubscriptionManager - unsupported subscription type "${y}"`
        );
    }
    (r[_] = x), (h.result = _);
    return;
    function E({ subId: g }) {
      const w = {
        type: y,
        destroy: async () => {
          t.removeListener('sync', w.update);
        },
        update: async ({ oldBlock: C, newBlock: S }) => {
          const M = S,
            P = am(C);
          (await cm({ provider: e, fromBlock: P, toBlock: M }))
            .map(fm)
            .filter((F) => F !== null)
            .forEach((F) => {
              u(g, F);
            });
        },
      };
      return t.on('sync', w.update), w;
    }
    function b({ subId: g, filter: w }) {
      return (
        w.on('update', (S) => u(g, S)),
        { type: y, destroy: async () => await n.uninstallFilter(w.idHex) }
      );
    }
  }
  async function c(f, h) {
    if (i)
      throw new Error(
        'SubscriptionManager - attempting to use after destroying'
      );
    const y = f.params[0],
      _ = r[y];
    if (!_) {
      h.result = !1;
      return;
    }
    delete r[y], await _.destroy(), (h.result = !0);
  }
  function u(f, h) {
    s.emit('notification', {
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: { subscription: f, result: h },
    });
  }
  function l() {
    s.removeAllListeners();
    for (const f in r) r[f].destroy(), delete r[f];
    i = !0;
  }
}
function fm(t) {
  return t == null
    ? null
    : {
        hash: t.hash,
        parentHash: t.parentHash,
        sha3Uncles: t.sha3Uncles,
        miner: t.miner,
        stateRoot: t.stateRoot,
        transactionsRoot: t.transactionsRoot,
        receiptsRoot: t.receiptsRoot,
        logsBloom: t.logsBloom,
        difficulty: t.difficulty,
        number: t.number,
        gasLimit: t.gasLimit,
        gasUsed: t.gasUsed,
        nonce: t.nonce,
        mixHash: t.mixHash,
        timestamp: t.timestamp,
        extraData: t.extraData,
      };
}
Object.defineProperty(Fi, '__esModule', { value: !0 });
Fi.SubscriptionManager = void 0;
const hm = Rf,
  dm = um,
  Uu = () => {};
class pm {
  constructor(e) {
    const r = new hm.PollingBlockTracker({
        provider: e,
        pollingInterval: 15e3,
        setSkipCacheFlag: !0,
      }),
      { events: n, middleware: i } = dm({ blockTracker: r, provider: e });
    (this.events = n), (this.subscriptionMiddleware = i);
  }
  async handleRequest(e) {
    const r = {};
    return await this.subscriptionMiddleware(e, r, Uu, Uu), r;
  }
  destroy() {
    this.subscriptionMiddleware.destroy();
  }
}
Fi.SubscriptionManager = pm;
var nc =
  (O && O.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(Lr, '__esModule', { value: !0 });
Lr.CoinbaseWalletProvider = void 0;
const bm = nc(ur),
  gm = nc(Ii),
  Uo = Gr,
  ee = kn,
  zu = Zr,
  qu = it,
  zo = Ti,
  ym = re,
  V = L,
  qo = nc(Xg),
  vm = Fr,
  Y = Mf,
  mm = Fi,
  Ju = 'DefaultChainId',
  Gu = 'DefaultJsonRpcUrl';
class wm extends bm.default {
  constructor(e) {
    var r, n;
    super(),
      (this._filterPolyfill = new vm.FilterPolyfill(this)),
      (this._subscriptionManager = new mm.SubscriptionManager(this)),
      (this._relay = null),
      (this._addresses = []),
      (this.hasMadeFirstChainChangedEmission = !1),
      (this.setProviderInfo = this.setProviderInfo.bind(this)),
      (this.updateProviderInfo = this.updateProviderInfo.bind(this)),
      (this.getChainId = this.getChainId.bind(this)),
      (this.setAppInfo = this.setAppInfo.bind(this)),
      (this.enable = this.enable.bind(this)),
      (this.close = this.close.bind(this)),
      (this.send = this.send.bind(this)),
      (this.sendAsync = this.sendAsync.bind(this)),
      (this.request = this.request.bind(this)),
      (this._setAddresses = this._setAddresses.bind(this)),
      (this.scanQRCode = this.scanQRCode.bind(this)),
      (this.genericRequest = this.genericRequest.bind(this)),
      (this._chainIdFromOpts = e.chainId),
      (this._jsonRpcUrlFromOpts = e.jsonRpcUrl),
      (this._overrideIsMetaMask = e.overrideIsMetaMask),
      (this._relayProvider = e.relayProvider),
      (this._storage = e.storage),
      (this._relayEventManager = e.relayEventManager),
      (this.diagnostic = e.diagnosticLogger),
      (this.reloadOnDisconnect = !0),
      (this.isCoinbaseWallet =
        (r = e.overrideIsCoinbaseWallet) !== null && r !== void 0 ? r : !0),
      (this.isCoinbaseBrowser =
        (n = e.overrideIsCoinbaseBrowser) !== null && n !== void 0 ? n : !1),
      (this.qrUrl = e.qrUrl);
    const i = this.getChainId(),
      s = (0, V.prepend0x)(i.toString(16));
    this.emit('connect', { chainIdStr: s });
    const o = this._storage.getItem(qu.LOCAL_STORAGE_ADDRESSES_KEY);
    if (o) {
      const a = o.split(' ');
      a[0] !== '' &&
        ((this._addresses = a.map((c) => (0, V.ensureAddressString)(c))),
        this.emit('accountsChanged', a));
    }
    this._subscriptionManager.events.on('notification', (a) => {
      this.emit('message', { type: a.method, data: a.params });
    }),
      this._isAuthorized() && this.initializeRelay(),
      window.addEventListener('message', (a) => {
        var c;
        if (
          !(a.origin !== location.origin || a.source !== window) &&
          a.data.type === 'walletLinkMessage'
        ) {
          if (a.data.data.action === 'dappChainSwitched') {
            const u = a.data.data.chainId,
              l =
                (c = a.data.data.jsonRpcUrl) !== null && c !== void 0
                  ? c
                  : this.jsonRpcUrl;
            this.updateProviderInfo(l, Number(u));
          }
          a.data.data.action === 'addressChanged' &&
            this._setAddresses([a.data.data.address]);
        }
      });
  }
  get selectedAddress() {
    return this._addresses[0] || void 0;
  }
  get networkVersion() {
    return this.getChainId().toString(10);
  }
  get chainId() {
    return (0, V.prepend0x)(this.getChainId().toString(16));
  }
  get isWalletLink() {
    return !0;
  }
  get isMetaMask() {
    return this._overrideIsMetaMask;
  }
  get host() {
    return this.jsonRpcUrl;
  }
  get connected() {
    return !0;
  }
  isConnected() {
    return !0;
  }
  get jsonRpcUrl() {
    var e;
    return (e = this._storage.getItem(Gu)) !== null && e !== void 0
      ? e
      : this._jsonRpcUrlFromOpts;
  }
  set jsonRpcUrl(e) {
    this._storage.setItem(Gu, e);
  }
  disableReloadOnDisconnect() {
    this.reloadOnDisconnect = !1;
  }
  setProviderInfo(e, r) {
    this.isCoinbaseBrowser ||
      ((this._chainIdFromOpts = r), (this._jsonRpcUrlFromOpts = e)),
      this.updateProviderInfo(this.jsonRpcUrl, this.getChainId());
  }
  updateProviderInfo(e, r) {
    this.jsonRpcUrl = e;
    const n = this.getChainId();
    this._storage.setItem(Ju, r.toString(10)),
      ((0, V.ensureIntNumber)(r) !== n ||
        !this.hasMadeFirstChainChangedEmission) &&
        (this.emit('chainChanged', this.getChainId()),
        (this.hasMadeFirstChainChangedEmission = !0));
  }
  async watchAsset(e, r, n, i, s, o) {
    return !!(
      await (
        await this.initializeRelay()
      ).watchAsset(e, r, n, i, s, o?.toString()).promise
    ).result;
  }
  async addEthereumChain(e, r, n, i, s, o) {
    var a, c;
    if ((0, V.ensureIntNumber)(e) === this.getChainId()) return !1;
    const u = await this.initializeRelay(),
      l = u.inlineAddEthereumChain(e.toString());
    !this._isAuthorized() && !l && (await u.requestEthereumAccounts().promise);
    const f = await u.addEthereumChain(e.toString(), r, s, n, i, o).promise;
    return (
      ((a = f.result) === null || a === void 0 ? void 0 : a.isApproved) ===
        !0 && this.updateProviderInfo(r[0], e),
      ((c = f.result) === null || c === void 0 ? void 0 : c.isApproved) === !0
    );
  }
  async switchEthereumChain(e) {
    const n = await (
      await this.initializeRelay()
    ).switchEthereumChain(e.toString(10), this.selectedAddress || void 0)
      .promise;
    if ((0, ym.isErrorResponse)(n) && n.errorCode)
      throw n.errorCode === ee.standardErrorCodes.provider.unsupportedChain
        ? ee.standardErrors.provider.unsupportedChain(e)
        : ee.standardErrors.provider.custom({
            message: n.errorMessage,
            code: n.errorCode,
          });
    const i = n.result;
    i.isApproved && i.rpcUrl.length > 0 && this.updateProviderInfo(i.rpcUrl, e);
  }
  setAppInfo(e, r) {
    this.initializeRelay().then((n) => n.setAppInfo(e, r));
  }
  async enable() {
    var e;
    return (
      (e = this.diagnostic) === null ||
        e === void 0 ||
        e.log(Uo.EVENTS.ETH_ACCOUNTS_STATE, {
          method: 'provider::enable',
          addresses_length: this._addresses.length,
          sessionIdHash: this._relay
            ? zu.Session.hash(this._relay.session.id)
            : void 0,
        }),
      this._isAuthorized()
        ? [...this._addresses]
        : await this.send(Y.JSONRPCMethod.eth_requestAccounts)
    );
  }
  async close() {
    (await this.initializeRelay()).resetAndReload();
  }
  send(e, r) {
    try {
      const n = this._send(e, r);
      if (n instanceof Promise)
        return n.catch((i) => {
          throw (0, ee.serializeError)(i, e);
        });
    } catch (n) {
      throw (0, ee.serializeError)(n, e);
    }
  }
  _send(e, r) {
    if (typeof e == 'string') {
      const i = e,
        s = Array.isArray(r) ? r : r !== void 0 ? [r] : [],
        o = { jsonrpc: '2.0', id: 0, method: i, params: s };
      return this._sendRequestAsync(o).then((a) => a.result);
    }
    if (typeof r == 'function') {
      const i = e,
        s = r;
      return this._sendAsync(i, s);
    }
    if (Array.isArray(e)) return e.map((s) => this._sendRequest(s));
    const n = e;
    return this._sendRequest(n);
  }
  async sendAsync(e, r) {
    try {
      return this._sendAsync(e, r).catch((n) => {
        throw (0, ee.serializeError)(n, e);
      });
    } catch (n) {
      return Promise.reject((0, ee.serializeError)(n, e));
    }
  }
  async _sendAsync(e, r) {
    if (typeof r != 'function') throw new Error('callback is required');
    if (Array.isArray(e)) {
      const i = r;
      this._sendMultipleRequestsAsync(e)
        .then((s) => i(null, s))
        .catch((s) => i(s, null));
      return;
    }
    const n = r;
    return this._sendRequestAsync(e)
      .then((i) => n(null, i))
      .catch((i) => n(i, null));
  }
  async request(e) {
    try {
      return this._request(e).catch((r) => {
        throw (0, ee.serializeError)(r, e.method);
      });
    } catch (r) {
      return Promise.reject((0, ee.serializeError)(r, e.method));
    }
  }
  async _request(e) {
    if (!e || typeof e != 'object' || Array.isArray(e))
      throw ee.standardErrors.rpc.invalidRequest({
        message: 'Expected a single, non-array, object argument.',
        data: e,
      });
    const { method: r, params: n } = e;
    if (typeof r != 'string' || r.length === 0)
      throw ee.standardErrors.rpc.invalidRequest({
        message: "'args.method' must be a non-empty string.",
        data: e,
      });
    if (
      n !== void 0 &&
      !Array.isArray(n) &&
      (typeof n != 'object' || n === null)
    )
      throw ee.standardErrors.rpc.invalidRequest({
        message: "'args.params' must be an object or array if provided.",
        data: e,
      });
    const i = n === void 0 ? [] : n,
      s = this._relayEventManager.makeRequestId();
    return (
      await this._sendRequestAsync({
        method: r,
        params: i,
        jsonrpc: '2.0',
        id: s,
      })
    ).result;
  }
  async scanQRCode(e) {
    var r;
    const i = await (
      await this.initializeRelay()
    ).scanQRCode((0, V.ensureRegExpString)(e)).promise;
    if (typeof i.result != 'string')
      throw (0, ee.serializeError)(
        (r = i.errorMessage) !== null && r !== void 0
          ? r
          : 'result was not a string',
        zo.Web3Method.scanQRCode
      );
    return i.result;
  }
  async genericRequest(e, r) {
    var n;
    const s = await (await this.initializeRelay()).genericRequest(e, r).promise;
    if (typeof s.result != 'string')
      throw (0, ee.serializeError)(
        (n = s.errorMessage) !== null && n !== void 0
          ? n
          : 'result was not a string',
        zo.Web3Method.generic
      );
    return s.result;
  }
  async selectProvider(e) {
    var r;
    const i = await (await this.initializeRelay()).selectProvider(e).promise;
    if (typeof i.result != 'string')
      throw (0, ee.serializeError)(
        (r = i.errorMessage) !== null && r !== void 0
          ? r
          : 'result was not a string',
        zo.Web3Method.selectProvider
      );
    return i.result;
  }
  supportsSubscriptions() {
    return !1;
  }
  subscribe() {
    throw new Error('Subscriptions are not supported');
  }
  unsubscribe() {
    throw new Error('Subscriptions are not supported');
  }
  disconnect() {
    return !0;
  }
  _sendRequest(e) {
    const r = { jsonrpc: '2.0', id: e.id },
      { method: n } = e;
    if (((r.result = this._handleSynchronousMethods(e)), r.result === void 0))
      throw new Error(
        `Coinbase Wallet does not support calling ${n} synchronously without a callback. Please provide a callback parameter to call ${n} asynchronously.`
      );
    return r;
  }
  _setAddresses(e, r) {
    if (!Array.isArray(e)) throw new Error('addresses is not an array');
    const n = e.map((i) => (0, V.ensureAddressString)(i));
    JSON.stringify(n) !== JSON.stringify(this._addresses) &&
      ((this._addresses = n),
      this.emit('accountsChanged', this._addresses),
      this._storage.setItem(qu.LOCAL_STORAGE_ADDRESSES_KEY, n.join(' ')));
  }
  _sendRequestAsync(e) {
    return new Promise((r, n) => {
      try {
        const i = this._handleSynchronousMethods(e);
        if (i !== void 0) return r({ jsonrpc: '2.0', id: e.id, result: i });
        const s = this._handleAsynchronousFilterMethods(e);
        if (s !== void 0) {
          s.then((a) =>
            r(Object.assign(Object.assign({}, a), { id: e.id }))
          ).catch((a) => n(a));
          return;
        }
        const o = this._handleSubscriptionMethods(e);
        if (o !== void 0) {
          o.then((a) =>
            r({ jsonrpc: '2.0', id: e.id, result: a.result })
          ).catch((a) => n(a));
          return;
        }
      } catch (i) {
        return n(i);
      }
      this._handleAsynchronousMethods(e)
        .then((i) => i && r(Object.assign(Object.assign({}, i), { id: e.id })))
        .catch((i) => n(i));
    });
  }
  _sendMultipleRequestsAsync(e) {
    return Promise.all(e.map((r) => this._sendRequestAsync(r)));
  }
  _handleSynchronousMethods(e) {
    const { method: r } = e,
      n = e.params || [];
    switch (r) {
      case Y.JSONRPCMethod.eth_accounts:
        return this._eth_accounts();
      case Y.JSONRPCMethod.eth_coinbase:
        return this._eth_coinbase();
      case Y.JSONRPCMethod.eth_uninstallFilter:
        return this._eth_uninstallFilter(n);
      case Y.JSONRPCMethod.net_version:
        return this._net_version();
      case Y.JSONRPCMethod.eth_chainId:
        return this._eth_chainId();
      default:
        return;
    }
  }
  async _handleAsynchronousMethods(e) {
    const { method: r } = e,
      n = e.params || [];
    switch (r) {
      case Y.JSONRPCMethod.eth_requestAccounts:
        return this._eth_requestAccounts();
      case Y.JSONRPCMethod.eth_sign:
        return this._eth_sign(n);
      case Y.JSONRPCMethod.eth_ecRecover:
        return this._eth_ecRecover(n);
      case Y.JSONRPCMethod.personal_sign:
        return this._personal_sign(n);
      case Y.JSONRPCMethod.personal_ecRecover:
        return this._personal_ecRecover(n);
      case Y.JSONRPCMethod.eth_signTransaction:
        return this._eth_signTransaction(n);
      case Y.JSONRPCMethod.eth_sendRawTransaction:
        return this._eth_sendRawTransaction(n);
      case Y.JSONRPCMethod.eth_sendTransaction:
        return this._eth_sendTransaction(n);
      case Y.JSONRPCMethod.eth_signTypedData_v1:
        return this._eth_signTypedData_v1(n);
      case Y.JSONRPCMethod.eth_signTypedData_v2:
        return this._throwUnsupportedMethodError();
      case Y.JSONRPCMethod.eth_signTypedData_v3:
        return this._eth_signTypedData_v3(n);
      case Y.JSONRPCMethod.eth_signTypedData_v4:
      case Y.JSONRPCMethod.eth_signTypedData:
        return this._eth_signTypedData_v4(n);
      case Y.JSONRPCMethod.cbWallet_arbitrary:
        return this._cbwallet_arbitrary(n);
      case Y.JSONRPCMethod.wallet_addEthereumChain:
        return this._wallet_addEthereumChain(n);
      case Y.JSONRPCMethod.wallet_switchEthereumChain:
        return this._wallet_switchEthereumChain(n);
      case Y.JSONRPCMethod.wallet_watchAsset:
        return this._wallet_watchAsset(n);
    }
    return (await this.initializeRelay()).makeEthereumJSONRPCRequest(
      e,
      this.jsonRpcUrl
    );
  }
  _handleAsynchronousFilterMethods(e) {
    const { method: r } = e,
      n = e.params || [];
    switch (r) {
      case Y.JSONRPCMethod.eth_newFilter:
        return this._eth_newFilter(n);
      case Y.JSONRPCMethod.eth_newBlockFilter:
        return this._eth_newBlockFilter();
      case Y.JSONRPCMethod.eth_newPendingTransactionFilter:
        return this._eth_newPendingTransactionFilter();
      case Y.JSONRPCMethod.eth_getFilterChanges:
        return this._eth_getFilterChanges(n);
      case Y.JSONRPCMethod.eth_getFilterLogs:
        return this._eth_getFilterLogs(n);
    }
  }
  _handleSubscriptionMethods(e) {
    switch (e.method) {
      case Y.JSONRPCMethod.eth_subscribe:
      case Y.JSONRPCMethod.eth_unsubscribe:
        return this._subscriptionManager.handleRequest(e);
    }
  }
  _isKnownAddress(e) {
    try {
      const r = (0, V.ensureAddressString)(e);
      return this._addresses
        .map((i) => (0, V.ensureAddressString)(i))
        .includes(r);
    } catch {}
    return !1;
  }
  _ensureKnownAddress(e) {
    var r;
    if (!this._isKnownAddress(e))
      throw (
        ((r = this.diagnostic) === null ||
          r === void 0 ||
          r.log(Uo.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED),
        new Error('Unknown Ethereum address'))
      );
  }
  _prepareTransactionParams(e) {
    const r = e.from
      ? (0, V.ensureAddressString)(e.from)
      : this.selectedAddress;
    if (!r) throw new Error('Ethereum address is unavailable');
    this._ensureKnownAddress(r);
    const n = e.to ? (0, V.ensureAddressString)(e.to) : null,
      i = e.value != null ? (0, V.ensureBN)(e.value) : new gm.default(0),
      s = e.data ? (0, V.ensureBuffer)(e.data) : Buffer.alloc(0),
      o = e.nonce != null ? (0, V.ensureIntNumber)(e.nonce) : null,
      a = e.gasPrice != null ? (0, V.ensureBN)(e.gasPrice) : null,
      c = e.maxFeePerGas != null ? (0, V.ensureBN)(e.maxFeePerGas) : null,
      u =
        e.maxPriorityFeePerGas != null
          ? (0, V.ensureBN)(e.maxPriorityFeePerGas)
          : null,
      l = e.gas != null ? (0, V.ensureBN)(e.gas) : null,
      f = this.getChainId();
    return {
      fromAddress: r,
      toAddress: n,
      weiValue: i,
      data: s,
      nonce: o,
      gasPriceInWei: a,
      maxFeePerGas: c,
      maxPriorityFeePerGas: u,
      gasLimit: l,
      chainId: f,
    };
  }
  _isAuthorized() {
    return this._addresses.length > 0;
  }
  _requireAuthorization() {
    if (!this._isAuthorized())
      throw ee.standardErrors.provider.unauthorized({});
  }
  _throwUnsupportedMethodError() {
    throw ee.standardErrors.provider.unsupportedMethod({});
  }
  async _signEthereumMessage(e, r, n, i) {
    this._ensureKnownAddress(r);
    try {
      return {
        jsonrpc: '2.0',
        id: 0,
        result: (
          await (await this.initializeRelay()).signEthereumMessage(e, r, n, i)
            .promise
        ).result,
      };
    } catch (s) {
      throw typeof s.message == 'string' &&
        s.message.match(/(denied|rejected)/i)
        ? ee.standardErrors.provider.userRejectedRequest(
            'User denied message signature'
          )
        : s;
    }
  }
  async _ethereumAddressFromSignedMessage(e, r, n) {
    return {
      jsonrpc: '2.0',
      id: 0,
      result: (
        await (
          await this.initializeRelay()
        ).ethereumAddressFromSignedMessage(e, r, n).promise
      ).result,
    };
  }
  _eth_accounts() {
    return [...this._addresses];
  }
  _eth_coinbase() {
    return this.selectedAddress || null;
  }
  _net_version() {
    return this.getChainId().toString(10);
  }
  _eth_chainId() {
    return (0, V.hexStringFromIntNumber)(this.getChainId());
  }
  getChainId() {
    const e = this._storage.getItem(Ju);
    if (!e) return (0, V.ensureIntNumber)(this._chainIdFromOpts);
    const r = parseInt(e, 10);
    return (0, V.ensureIntNumber)(r);
  }
  async _eth_requestAccounts() {
    var e;
    if (
      ((e = this.diagnostic) === null ||
        e === void 0 ||
        e.log(Uo.EVENTS.ETH_ACCOUNTS_STATE, {
          method: 'provider::_eth_requestAccounts',
          addresses_length: this._addresses.length,
          sessionIdHash: this._relay
            ? zu.Session.hash(this._relay.session.id)
            : void 0,
        }),
      this._isAuthorized())
    )
      return Promise.resolve({
        jsonrpc: '2.0',
        id: 0,
        result: this._addresses,
      });
    let r;
    try {
      r = await (await this.initializeRelay()).requestEthereumAccounts()
        .promise;
    } catch (n) {
      throw typeof n.message == 'string' &&
        n.message.match(/(denied|rejected)/i)
        ? ee.standardErrors.provider.userRejectedRequest(
            'User denied account authorization'
          )
        : n;
    }
    if (!r.result) throw new Error('accounts received is empty');
    return (
      this._setAddresses(r.result),
      this.isCoinbaseBrowser ||
        (await this.switchEthereumChain(this.getChainId())),
      { jsonrpc: '2.0', id: 0, result: this._addresses }
    );
  }
  _eth_sign(e) {
    this._requireAuthorization();
    const r = (0, V.ensureAddressString)(e[0]),
      n = (0, V.ensureBuffer)(e[1]);
    return this._signEthereumMessage(n, r, !1);
  }
  _eth_ecRecover(e) {
    const r = (0, V.ensureBuffer)(e[0]),
      n = (0, V.ensureBuffer)(e[1]);
    return this._ethereumAddressFromSignedMessage(r, n, !1);
  }
  _personal_sign(e) {
    this._requireAuthorization();
    const r = (0, V.ensureBuffer)(e[0]),
      n = (0, V.ensureAddressString)(e[1]);
    return this._signEthereumMessage(r, n, !0);
  }
  _personal_ecRecover(e) {
    const r = (0, V.ensureBuffer)(e[0]),
      n = (0, V.ensureBuffer)(e[1]);
    return this._ethereumAddressFromSignedMessage(r, n, !0);
  }
  async _eth_signTransaction(e) {
    this._requireAuthorization();
    const r = this._prepareTransactionParams(e[0] || {});
    try {
      return {
        jsonrpc: '2.0',
        id: 0,
        result: (
          await (await this.initializeRelay()).signEthereumTransaction(r)
            .promise
        ).result,
      };
    } catch (n) {
      throw typeof n.message == 'string' &&
        n.message.match(/(denied|rejected)/i)
        ? ee.standardErrors.provider.userRejectedRequest(
            'User denied transaction signature'
          )
        : n;
    }
  }
  async _eth_sendRawTransaction(e) {
    const r = (0, V.ensureBuffer)(e[0]);
    return {
      jsonrpc: '2.0',
      id: 0,
      result: (
        await (
          await this.initializeRelay()
        ).submitEthereumTransaction(r, this.getChainId()).promise
      ).result,
    };
  }
  async _eth_sendTransaction(e) {
    this._requireAuthorization();
    const r = this._prepareTransactionParams(e[0] || {});
    try {
      return {
        jsonrpc: '2.0',
        id: 0,
        result: (
          await (
            await this.initializeRelay()
          ).signAndSubmitEthereumTransaction(r).promise
        ).result,
      };
    } catch (n) {
      throw typeof n.message == 'string' &&
        n.message.match(/(denied|rejected)/i)
        ? ee.standardErrors.provider.userRejectedRequest(
            'User denied transaction signature'
          )
        : n;
    }
  }
  async _eth_signTypedData_v1(e) {
    this._requireAuthorization();
    const r = (0, V.ensureParsedJSONObject)(e[0]),
      n = (0, V.ensureAddressString)(e[1]);
    this._ensureKnownAddress(n);
    const i = qo.default.hashForSignTypedDataLegacy({ data: r }),
      s = JSON.stringify(r, null, 2);
    return this._signEthereumMessage(i, n, !1, s);
  }
  async _eth_signTypedData_v3(e) {
    this._requireAuthorization();
    const r = (0, V.ensureAddressString)(e[0]),
      n = (0, V.ensureParsedJSONObject)(e[1]);
    this._ensureKnownAddress(r);
    const i = qo.default.hashForSignTypedData_v3({ data: n }),
      s = JSON.stringify(n, null, 2);
    return this._signEthereumMessage(i, r, !1, s);
  }
  async _eth_signTypedData_v4(e) {
    this._requireAuthorization();
    const r = (0, V.ensureAddressString)(e[0]),
      n = (0, V.ensureParsedJSONObject)(e[1]);
    this._ensureKnownAddress(r);
    const i = qo.default.hashForSignTypedData_v4({ data: n }),
      s = JSON.stringify(n, null, 2);
    return this._signEthereumMessage(i, r, !1, s);
  }
  async _cbwallet_arbitrary(e) {
    const r = e[0],
      n = e[1];
    if (typeof n != 'string') throw new Error('parameter must be a string');
    if (typeof r != 'object' || r === null)
      throw new Error('parameter must be an object');
    return { jsonrpc: '2.0', id: 0, result: await this.genericRequest(r, n) };
  }
  async _wallet_addEthereumChain(e) {
    var r, n, i, s;
    const o = e[0];
    if (((r = o.rpcUrls) === null || r === void 0 ? void 0 : r.length) === 0)
      return {
        jsonrpc: '2.0',
        id: 0,
        error: { code: 2, message: 'please pass in at least 1 rpcUrl' },
      };
    if (!o.chainName || o.chainName.trim() === '')
      throw ee.standardErrors.rpc.invalidParams(
        'chainName is a required field'
      );
    if (!o.nativeCurrency)
      throw ee.standardErrors.rpc.invalidParams(
        'nativeCurrency is a required field'
      );
    const a = parseInt(o.chainId, 16);
    return (await this.addEthereumChain(
      a,
      (n = o.rpcUrls) !== null && n !== void 0 ? n : [],
      (i = o.blockExplorerUrls) !== null && i !== void 0 ? i : [],
      o.chainName,
      (s = o.iconUrls) !== null && s !== void 0 ? s : [],
      o.nativeCurrency
    ))
      ? { jsonrpc: '2.0', id: 0, result: null }
      : {
          jsonrpc: '2.0',
          id: 0,
          error: { code: 2, message: 'unable to add ethereum chain' },
        };
  }
  async _wallet_switchEthereumChain(e) {
    const r = e[0];
    return (
      await this.switchEthereumChain(parseInt(r.chainId, 16)),
      { jsonrpc: '2.0', id: 0, result: null }
    );
  }
  async _wallet_watchAsset(e) {
    const r = Array.isArray(e) ? e[0] : e;
    if (!r.type) throw ee.standardErrors.rpc.invalidParams('Type is required');
    if (r?.type !== 'ERC20')
      throw ee.standardErrors.rpc.invalidParams(
        `Asset of type '${r.type}' is not supported`
      );
    if (!r?.options)
      throw ee.standardErrors.rpc.invalidParams('Options are required');
    if (!r?.options.address)
      throw ee.standardErrors.rpc.invalidParams('Address is required');
    const n = this.getChainId(),
      { address: i, symbol: s, image: o, decimals: a } = r.options;
    return {
      jsonrpc: '2.0',
      id: 0,
      result: await this.watchAsset(r.type, i, s, a, o, n),
    };
  }
  _eth_uninstallFilter(e) {
    const r = (0, V.ensureHexString)(e[0]);
    return this._filterPolyfill.uninstallFilter(r);
  }
  async _eth_newFilter(e) {
    const r = e[0];
    return {
      jsonrpc: '2.0',
      id: 0,
      result: await this._filterPolyfill.newFilter(r),
    };
  }
  async _eth_newBlockFilter() {
    return {
      jsonrpc: '2.0',
      id: 0,
      result: await this._filterPolyfill.newBlockFilter(),
    };
  }
  async _eth_newPendingTransactionFilter() {
    return {
      jsonrpc: '2.0',
      id: 0,
      result: await this._filterPolyfill.newPendingTransactionFilter(),
    };
  }
  _eth_getFilterChanges(e) {
    const r = (0, V.ensureHexString)(e[0]);
    return this._filterPolyfill.getFilterChanges(r);
  }
  _eth_getFilterLogs(e) {
    const r = (0, V.ensureHexString)(e[0]);
    return this._filterPolyfill.getFilterLogs(r);
  }
  initializeRelay() {
    return this._relay
      ? Promise.resolve(this._relay)
      : this._relayProvider().then(
          (e) => (
            e.setAccountsCallback((r, n) => this._setAddresses(r, n)),
            e.setChainCallback((r, n) => {
              this.updateProviderInfo(n, parseInt(r, 10));
            }),
            e.setDappDefaultChainCallback(this._chainIdFromOpts),
            (this._relay = e),
            e
          )
        );
  }
}
Lr.CoinbaseWalletProvider = wm;
var Yi = {},
  Ki = {};
const We = cr(hd);
function Hr(t) {
  return typeof t == 'function';
}
var Qu = !1,
  ze = {
    Promise: void 0,
    set useDeprecatedSynchronousErrorHandling(t) {
      if (t) {
        var e = new Error();
        '' + e.stack;
      }
      Qu = t;
    },
    get useDeprecatedSynchronousErrorHandling() {
      return Qu;
    },
  };
function kr(t) {
  setTimeout(function () {
    throw t;
  }, 0);
}
var wi = {
    closed: !0,
    next: function (t) {},
    error: function (t) {
      if (ze.useDeprecatedSynchronousErrorHandling) throw t;
      kr(t);
    },
    complete: function () {},
  },
  Te = (function () {
    return (
      Array.isArray ||
      function (t) {
        return t && typeof t.length == 'number';
      }
    );
  })();
function ic(t) {
  return t !== null && typeof t == 'object';
}
var _m = (function () {
    function t(e) {
      return (
        Error.call(this),
        (this.message = e
          ? e.length +
            ` errors occurred during unsubscription:
` +
            e.map(function (r, n) {
              return n + 1 + ') ' + r.toString();
            }).join(`
  `)
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = e),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  mn = _m,
  ce = (function () {
    function t(e) {
      (this.closed = !1),
        (this._parentOrParents = null),
        (this._subscriptions = null),
        e && ((this._ctorUnsubscribe = !0), (this._unsubscribe = e));
    }
    return (
      (t.prototype.unsubscribe = function () {
        var e;
        if (!this.closed) {
          var r = this,
            n = r._parentOrParents,
            i = r._ctorUnsubscribe,
            s = r._unsubscribe,
            o = r._subscriptions;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            n instanceof t)
          )
            n.remove(this);
          else if (n !== null)
            for (var a = 0; a < n.length; ++a) {
              var c = n[a];
              c.remove(this);
            }
          if (Hr(s)) {
            i && (this._unsubscribe = void 0);
            try {
              s.call(this);
            } catch (f) {
              e = f instanceof mn ? Zu(f.errors) : [f];
            }
          }
          if (Te(o))
            for (var a = -1, u = o.length; ++a < u; ) {
              var l = o[a];
              if (ic(l))
                try {
                  l.unsubscribe();
                } catch (h) {
                  (e = e || []),
                    h instanceof mn ? (e = e.concat(Zu(h.errors))) : e.push(h);
                }
            }
          if (e) throw new mn(e);
        }
      }),
      (t.prototype.add = function (e) {
        var r = e;
        if (!e) return t.EMPTY;
        switch (typeof e) {
          case 'function':
            r = new t(e);
          case 'object':
            if (r === this || r.closed || typeof r.unsubscribe != 'function')
              return r;
            if (this.closed) return r.unsubscribe(), r;
            if (!(r instanceof t)) {
              var n = r;
              (r = new t()), (r._subscriptions = [n]);
            }
            break;
          default:
            throw new Error(
              'unrecognized teardown ' + e + ' added to Subscription.'
            );
        }
        var i = r._parentOrParents;
        if (i === null) r._parentOrParents = this;
        else if (i instanceof t) {
          if (i === this) return r;
          r._parentOrParents = [i, this];
        } else if (i.indexOf(this) === -1) i.push(this);
        else return r;
        var s = this._subscriptions;
        return s === null ? (this._subscriptions = [r]) : s.push(r), r;
      }),
      (t.prototype.remove = function (e) {
        var r = this._subscriptions;
        if (r) {
          var n = r.indexOf(e);
          n !== -1 && r.splice(n, 1);
        }
      }),
      (t.EMPTY = (function (e) {
        return (e.closed = !0), e;
      })(new t())),
      t
    );
  })();
function Zu(t) {
  return t.reduce(function (e, r) {
    return e.concat(r instanceof mn ? r.errors : r);
  }, []);
}
var _i = (function () {
    return typeof Symbol == 'function'
      ? Symbol('rxSubscriber')
      : '@@rxSubscriber_' + Math.random();
  })(),
  D = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this) || this;
      switch (
        ((s.syncErrorValue = null),
        (s.syncErrorThrown = !1),
        (s.syncErrorThrowable = !1),
        (s.isStopped = !1),
        arguments.length)
      ) {
        case 0:
          s.destination = wi;
          break;
        case 1:
          if (!r) {
            s.destination = wi;
            break;
          }
          if (typeof r == 'object') {
            r instanceof e
              ? ((s.syncErrorThrowable = r.syncErrorThrowable),
                (s.destination = r),
                r.add(s))
              : ((s.syncErrorThrowable = !0), (s.destination = new Yu(s, r)));
            break;
          }
        default:
          (s.syncErrorThrowable = !0), (s.destination = new Yu(s, r, n, i));
          break;
      }
      return s;
    }
    return (
      (e.prototype[_i] = function () {
        return this;
      }),
      (e.create = function (r, n, i) {
        var s = new e(r, n, i);
        return (s.syncErrorThrowable = !1), s;
      }),
      (e.prototype.next = function (r) {
        this.isStopped || this._next(r);
      }),
      (e.prototype.error = function (r) {
        this.isStopped || ((this.isStopped = !0), this._error(r));
      }),
      (e.prototype.complete = function () {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }),
      (e.prototype.unsubscribe = function () {
        this.closed ||
          ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
      }),
      (e.prototype._next = function (r) {
        this.destination.next(r);
      }),
      (e.prototype._error = function (r) {
        this.destination.error(r), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.destination.complete(), this.unsubscribe();
      }),
      (e.prototype._unsubscribeAndRecycle = function () {
        var r = this._parentOrParents;
        return (
          (this._parentOrParents = null),
          this.unsubscribe(),
          (this.closed = !1),
          (this.isStopped = !1),
          (this._parentOrParents = r),
          this
        );
      }),
      e
    );
  })(ce),
  Yu = (function (t) {
    I(e, t);
    function e(r, n, i, s) {
      var o = t.call(this) || this;
      o._parentSubscriber = r;
      var a,
        c = o;
      return (
        Hr(n)
          ? (a = n)
          : n &&
            ((a = n.next),
            (i = n.error),
            (s = n.complete),
            n !== wi &&
              ((c = Object.create(n)),
              Hr(c.unsubscribe) && o.add(c.unsubscribe.bind(c)),
              (c.unsubscribe = o.unsubscribe.bind(o)))),
        (o._context = c),
        (o._next = a),
        (o._error = i),
        (o._complete = s),
        o
      );
    }
    return (
      (e.prototype.next = function (r) {
        if (!this.isStopped && this._next) {
          var n = this._parentSubscriber;
          !ze.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable
            ? this.__tryOrUnsub(this._next, r)
            : this.__tryOrSetError(n, this._next, r) && this.unsubscribe();
        }
      }),
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = this._parentSubscriber,
            i = ze.useDeprecatedSynchronousErrorHandling;
          if (this._error)
            !i || !n.syncErrorThrowable
              ? (this.__tryOrUnsub(this._error, r), this.unsubscribe())
              : (this.__tryOrSetError(n, this._error, r), this.unsubscribe());
          else if (n.syncErrorThrowable)
            i ? ((n.syncErrorValue = r), (n.syncErrorThrown = !0)) : kr(r),
              this.unsubscribe();
          else {
            if ((this.unsubscribe(), i)) throw r;
            kr(r);
          }
        }
      }),
      (e.prototype.complete = function () {
        var r = this;
        if (!this.isStopped) {
          var n = this._parentSubscriber;
          if (this._complete) {
            var i = function () {
              return r._complete.call(r._context);
            };
            !ze.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable
              ? (this.__tryOrUnsub(i), this.unsubscribe())
              : (this.__tryOrSetError(n, i), this.unsubscribe());
          } else this.unsubscribe();
        }
      }),
      (e.prototype.__tryOrUnsub = function (r, n) {
        try {
          r.call(this._context, n);
        } catch (i) {
          if ((this.unsubscribe(), ze.useDeprecatedSynchronousErrorHandling))
            throw i;
          kr(i);
        }
      }),
      (e.prototype.__tryOrSetError = function (r, n, i) {
        if (!ze.useDeprecatedSynchronousErrorHandling)
          throw new Error('bad call');
        try {
          n.call(this._context, i);
        } catch (s) {
          return ze.useDeprecatedSynchronousErrorHandling
            ? ((r.syncErrorValue = s), (r.syncErrorThrown = !0), !0)
            : (kr(s), !0);
        }
        return !1;
      }),
      (e.prototype._unsubscribe = function () {
        var r = this._parentSubscriber;
        (this._context = null),
          (this._parentSubscriber = null),
          r.unsubscribe();
      }),
      e
    );
  })(D);
function sc(t) {
  for (; t; ) {
    var e = t,
      r = e.closed,
      n = e.destination,
      i = e.isStopped;
    if (r || i) return !1;
    n && n instanceof D ? (t = n) : (t = null);
  }
  return !0;
}
function Sm(t, e, r) {
  if (t) {
    if (t instanceof D) return t;
    if (t[_i]) return t[_i]();
  }
  return !t && !e && !r ? new D(wi) : new D(t, e, r);
}
var rn = (function () {
  return (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
})();
function Ht(t) {
  return t;
}
function ga() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return oh(t);
}
function oh(t) {
  return t.length === 0
    ? Ht
    : t.length === 1
      ? t[0]
      : function (r) {
          return t.reduce(function (n, i) {
            return i(n);
          }, r);
        };
}
var U = (function () {
  function t(e) {
    (this._isScalar = !1), e && (this._subscribe = e);
  }
  return (
    (t.prototype.lift = function (e) {
      var r = new t();
      return (r.source = this), (r.operator = e), r;
    }),
    (t.prototype.subscribe = function (e, r, n) {
      var i = this.operator,
        s = Sm(e, r, n);
      if (
        (i
          ? s.add(i.call(s, this.source))
          : s.add(
              this.source ||
                (ze.useDeprecatedSynchronousErrorHandling &&
                  !s.syncErrorThrowable)
                ? this._subscribe(s)
                : this._trySubscribe(s)
            ),
        ze.useDeprecatedSynchronousErrorHandling &&
          s.syncErrorThrowable &&
          ((s.syncErrorThrowable = !1), s.syncErrorThrown))
      )
        throw s.syncErrorValue;
      return s;
    }),
    (t.prototype._trySubscribe = function (e) {
      try {
        return this._subscribe(e);
      } catch (r) {
        ze.useDeprecatedSynchronousErrorHandling &&
          ((e.syncErrorThrown = !0), (e.syncErrorValue = r)),
          sc(e) ? e.error(r) : console.warn(r);
      }
    }),
    (t.prototype.forEach = function (e, r) {
      var n = this;
      return (
        (r = Ku(r)),
        new r(function (i, s) {
          var o;
          o = n.subscribe(
            function (a) {
              try {
                e(a);
              } catch (c) {
                s(c), o && o.unsubscribe();
              }
            },
            s,
            i
          );
        })
      );
    }),
    (t.prototype._subscribe = function (e) {
      var r = this.source;
      return r && r.subscribe(e);
    }),
    (t.prototype[rn] = function () {
      return this;
    }),
    (t.prototype.pipe = function () {
      for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
      return e.length === 0 ? this : oh(e)(this);
    }),
    (t.prototype.toPromise = function (e) {
      var r = this;
      return (
        (e = Ku(e)),
        new e(function (n, i) {
          var s;
          r.subscribe(
            function (o) {
              return (s = o);
            },
            function (o) {
              return i(o);
            },
            function () {
              return n(s);
            }
          );
        })
      );
    }),
    (t.create = function (e) {
      return new t(e);
    }),
    t
  );
})();
function Ku(t) {
  if ((t || (t = ze.Promise || Promise), !t))
    throw new Error('no Promise impl found');
  return t;
}
var Em = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = 'object unsubscribed'),
        (this.name = 'ObjectUnsubscribedError'),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  Bt = Em,
  ah = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.subject = r), (i.subscriber = n), (i.closed = !1), i;
    }
    return (
      (e.prototype.unsubscribe = function () {
        if (!this.closed) {
          this.closed = !0;
          var r = this.subject,
            n = r.observers;
          if (
            ((this.subject = null),
            !(!n || n.length === 0 || r.isStopped || r.closed))
          ) {
            var i = n.indexOf(this.subscriber);
            i !== -1 && n.splice(i, 1);
          }
        }
      }),
      e
    );
  })(ce),
  ch = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.destination = r), n;
    }
    return e;
  })(D),
  _e = (function (t) {
    I(e, t);
    function e() {
      var r = t.call(this) || this;
      return (
        (r.observers = []),
        (r.closed = !1),
        (r.isStopped = !1),
        (r.hasError = !1),
        (r.thrownError = null),
        r
      );
    }
    return (
      (e.prototype[_i] = function () {
        return new ch(this);
      }),
      (e.prototype.lift = function (r) {
        var n = new Xu(this, this);
        return (n.operator = r), n;
      }),
      (e.prototype.next = function (r) {
        if (this.closed) throw new Bt();
        if (!this.isStopped)
          for (
            var n = this.observers, i = n.length, s = n.slice(), o = 0;
            o < i;
            o++
          )
            s[o].next(r);
      }),
      (e.prototype.error = function (r) {
        if (this.closed) throw new Bt();
        (this.hasError = !0), (this.thrownError = r), (this.isStopped = !0);
        for (
          var n = this.observers, i = n.length, s = n.slice(), o = 0;
          o < i;
          o++
        )
          s[o].error(r);
        this.observers.length = 0;
      }),
      (e.prototype.complete = function () {
        if (this.closed) throw new Bt();
        this.isStopped = !0;
        for (
          var r = this.observers, n = r.length, i = r.slice(), s = 0;
          s < n;
          s++
        )
          i[s].complete();
        this.observers.length = 0;
      }),
      (e.prototype.unsubscribe = function () {
        (this.isStopped = !0), (this.closed = !0), (this.observers = null);
      }),
      (e.prototype._trySubscribe = function (r) {
        if (this.closed) throw new Bt();
        return t.prototype._trySubscribe.call(this, r);
      }),
      (e.prototype._subscribe = function (r) {
        if (this.closed) throw new Bt();
        return this.hasError
          ? (r.error(this.thrownError), ce.EMPTY)
          : this.isStopped
            ? (r.complete(), ce.EMPTY)
            : (this.observers.push(r), new ah(this, r));
      }),
      (e.prototype.asObservable = function () {
        var r = new U();
        return (r.source = this), r;
      }),
      (e.create = function (r, n) {
        return new Xu(r, n);
      }),
      e
    );
  })(U),
  Xu = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.destination = r), (i.source = n), i;
    }
    return (
      (e.prototype.next = function (r) {
        var n = this.destination;
        n && n.next && n.next(r);
      }),
      (e.prototype.error = function (r) {
        var n = this.destination;
        n && n.error && this.destination.error(r);
      }),
      (e.prototype.complete = function () {
        var r = this.destination;
        r && r.complete && this.destination.complete();
      }),
      (e.prototype._subscribe = function (r) {
        var n = this.source;
        return n ? this.source.subscribe(r) : ce.EMPTY;
      }),
      e
    );
  })(_e);
function oc() {
  return function (e) {
    return e.lift(new Cm(e));
  };
}
var Cm = (function () {
    function t(e) {
      this.connectable = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = this.connectable;
        n._refCount++;
        var i = new xm(e, n),
          s = r.subscribe(i);
        return i.closed || (i.connection = n.connect()), s;
      }),
      t
    );
  })(),
  xm = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.connectable = n), i;
    }
    return (
      (e.prototype._unsubscribe = function () {
        var r = this.connectable;
        if (!r) {
          this.connection = null;
          return;
        }
        this.connectable = null;
        var n = r._refCount;
        if (n <= 0) {
          this.connection = null;
          return;
        }
        if (((r._refCount = n - 1), n > 1)) {
          this.connection = null;
          return;
        }
        var i = this.connection,
          s = r._connection;
        (this.connection = null), s && (!i || s === i) && s.unsubscribe();
      }),
      e
    );
  })(D),
  uh = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (
        (i.source = r),
        (i.subjectFactory = n),
        (i._refCount = 0),
        (i._isComplete = !1),
        i
      );
    }
    return (
      (e.prototype._subscribe = function (r) {
        return this.getSubject().subscribe(r);
      }),
      (e.prototype.getSubject = function () {
        var r = this._subject;
        return (
          (!r || r.isStopped) && (this._subject = this.subjectFactory()),
          this._subject
        );
      }),
      (e.prototype.connect = function () {
        var r = this._connection;
        return (
          r ||
            ((this._isComplete = !1),
            (r = this._connection = new ce()),
            r.add(this.source.subscribe(new km(this.getSubject(), this))),
            r.closed && ((this._connection = null), (r = ce.EMPTY))),
          r
        );
      }),
      (e.prototype.refCount = function () {
        return oc()(this);
      }),
      e
    );
  })(U),
  Im = (function () {
    var t = uh.prototype;
    return {
      operator: { value: null },
      _refCount: { value: 0, writable: !0 },
      _subject: { value: null, writable: !0 },
      _connection: { value: null, writable: !0 },
      _subscribe: { value: t._subscribe },
      _isComplete: { value: t._isComplete, writable: !0 },
      getSubject: { value: t.getSubject },
      connect: { value: t.connect },
      refCount: { value: t.refCount },
    };
  })(),
  km = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.connectable = n), i;
    }
    return (
      (e.prototype._error = function (r) {
        this._unsubscribe(), t.prototype._error.call(this, r);
      }),
      (e.prototype._complete = function () {
        (this.connectable._isComplete = !0),
          this._unsubscribe(),
          t.prototype._complete.call(this);
      }),
      (e.prototype._unsubscribe = function () {
        var r = this.connectable;
        if (r) {
          this.connectable = null;
          var n = r._connection;
          (r._refCount = 0),
            (r._subject = null),
            (r._connection = null),
            n && n.unsubscribe();
        }
      }),
      e
    );
  })(ch);
function Mm(t, e, r, n) {
  return function (i) {
    return i.lift(new Rm(t, e, r, n));
  };
}
var Rm = (function () {
    function t(e, r, n, i) {
      (this.keySelector = e),
        (this.elementSelector = r),
        (this.durationSelector = n),
        (this.subjectSelector = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new Am(
            e,
            this.keySelector,
            this.elementSelector,
            this.durationSelector,
            this.subjectSelector
          )
        );
      }),
      t
    );
  })(),
  Am = (function (t) {
    I(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      return (
        (a.keySelector = n),
        (a.elementSelector = i),
        (a.durationSelector = s),
        (a.subjectSelector = o),
        (a.groups = null),
        (a.attemptedToUnsubscribe = !1),
        (a.count = 0),
        a
      );
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        try {
          n = this.keySelector(r);
        } catch (i) {
          this.error(i);
          return;
        }
        this._group(r, n);
      }),
      (e.prototype._group = function (r, n) {
        var i = this.groups;
        i || (i = this.groups = new Map());
        var s = i.get(n),
          o;
        if (this.elementSelector)
          try {
            o = this.elementSelector(r);
          } catch (u) {
            this.error(u);
          }
        else o = r;
        if (!s) {
          (s = this.subjectSelector ? this.subjectSelector() : new _e()),
            i.set(n, s);
          var a = new ya(n, s, this);
          if ((this.destination.next(a), this.durationSelector)) {
            var c = void 0;
            try {
              c = this.durationSelector(new ya(n, s));
            } catch (u) {
              this.error(u);
              return;
            }
            this.add(c.subscribe(new Tm(n, s, this)));
          }
        }
        s.closed || s.next(o);
      }),
      (e.prototype._error = function (r) {
        var n = this.groups;
        n &&
          (n.forEach(function (i, s) {
            i.error(r);
          }),
          n.clear()),
          this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        var r = this.groups;
        r &&
          (r.forEach(function (n, i) {
            n.complete();
          }),
          r.clear()),
          this.destination.complete();
      }),
      (e.prototype.removeGroup = function (r) {
        this.groups.delete(r);
      }),
      (e.prototype.unsubscribe = function () {
        this.closed ||
          ((this.attemptedToUnsubscribe = !0),
          this.count === 0 && t.prototype.unsubscribe.call(this));
      }),
      e
    );
  })(D),
  Tm = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, n) || this;
      return (s.key = r), (s.group = n), (s.parent = i), s;
    }
    return (
      (e.prototype._next = function (r) {
        this.complete();
      }),
      (e.prototype._unsubscribe = function () {
        var r = this,
          n = r.parent,
          i = r.key;
        (this.key = this.parent = null), n && n.removeGroup(i);
      }),
      e
    );
  })(D),
  ya = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this) || this;
      return (s.key = r), (s.groupSubject = n), (s.refCountSubscription = i), s;
    }
    return (
      (e.prototype._subscribe = function (r) {
        var n = new ce(),
          i = this,
          s = i.refCountSubscription,
          o = i.groupSubject;
        return s && !s.closed && n.add(new Om(s)), n.add(o.subscribe(r)), n;
      }),
      e
    );
  })(U),
  Om = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this) || this;
      return (n.parent = r), r.count++, n;
    }
    return (
      (e.prototype.unsubscribe = function () {
        var r = this.parent;
        !r.closed &&
          !this.closed &&
          (t.prototype.unsubscribe.call(this),
          (r.count -= 1),
          r.count === 0 && r.attemptedToUnsubscribe && r.unsubscribe());
      }),
      e
    );
  })(ce),
  lh = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this) || this;
      return (n._value = r), n;
    }
    return (
      Object.defineProperty(e.prototype, 'value', {
        get: function () {
          return this.getValue();
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e.prototype._subscribe = function (r) {
        var n = t.prototype._subscribe.call(this, r);
        return n && !n.closed && r.next(this._value), n;
      }),
      (e.prototype.getValue = function () {
        if (this.hasError) throw this.thrownError;
        if (this.closed) throw new Bt();
        return this._value;
      }),
      (e.prototype.next = function (r) {
        t.prototype.next.call(this, (this._value = r));
      }),
      e
    );
  })(_e),
  Nm = (function (t) {
    I(e, t);
    function e(r, n) {
      return t.call(this) || this;
    }
    return (
      (e.prototype.schedule = function (r, n) {
        return this;
      }),
      e
    );
  })(ce),
  Un = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r, n) || this;
      return (i.scheduler = r), (i.work = n), (i.pending = !1), i;
    }
    return (
      (e.prototype.schedule = function (r, n) {
        if ((n === void 0 && (n = 0), this.closed)) return this;
        this.state = r;
        var i = this.id,
          s = this.scheduler;
        return (
          i != null && (this.id = this.recycleAsyncId(s, i, n)),
          (this.pending = !0),
          (this.delay = n),
          (this.id = this.id || this.requestAsyncId(s, this.id, n)),
          this
        );
      }),
      (e.prototype.requestAsyncId = function (r, n, i) {
        return i === void 0 && (i = 0), setInterval(r.flush.bind(r, this), i);
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {
        if (
          (i === void 0 && (i = 0),
          i !== null && this.delay === i && this.pending === !1)
        )
          return n;
        clearInterval(n);
      }),
      (e.prototype.execute = function (r, n) {
        if (this.closed) return new Error('executing a cancelled action');
        this.pending = !1;
        var i = this._execute(r, n);
        if (i) return i;
        this.pending === !1 &&
          this.id != null &&
          (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
      }),
      (e.prototype._execute = function (r, n) {
        var i = !1,
          s = void 0;
        try {
          this.work(r);
        } catch (o) {
          (i = !0), (s = (!!o && o) || new Error(o));
        }
        if (i) return this.unsubscribe(), s;
      }),
      (e.prototype._unsubscribe = function () {
        var r = this.id,
          n = this.scheduler,
          i = n.actions,
          s = i.indexOf(this);
        (this.work = null),
          (this.state = null),
          (this.pending = !1),
          (this.scheduler = null),
          s !== -1 && i.splice(s, 1),
          r != null && (this.id = this.recycleAsyncId(n, r, null)),
          (this.delay = null);
      }),
      e
    );
  })(Nm),
  Lm = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r, n) || this;
      return (i.scheduler = r), (i.work = n), i;
    }
    return (
      (e.prototype.schedule = function (r, n) {
        return (
          n === void 0 && (n = 0),
          n > 0
            ? t.prototype.schedule.call(this, r, n)
            : ((this.delay = n),
              (this.state = r),
              this.scheduler.flush(this),
              this)
        );
      }),
      (e.prototype.execute = function (r, n) {
        return n > 0 || this.closed
          ? t.prototype.execute.call(this, r, n)
          : this._execute(r, n);
      }),
      (e.prototype.requestAsyncId = function (r, n, i) {
        return (
          i === void 0 && (i = 0),
          (i !== null && i > 0) || (i === null && this.delay > 0)
            ? t.prototype.requestAsyncId.call(this, r, n, i)
            : r.flush(this)
        );
      }),
      e
    );
  })(Un),
  va = (function () {
    function t(e, r) {
      r === void 0 && (r = t.now), (this.SchedulerAction = e), (this.now = r);
    }
    return (
      (t.prototype.schedule = function (e, r, n) {
        return (
          r === void 0 && (r = 0),
          new this.SchedulerAction(this, e).schedule(n, r)
        );
      }),
      (t.now = function () {
        return Date.now();
      }),
      t
    );
  })(),
  zn = (function (t) {
    I(e, t);
    function e(r, n) {
      n === void 0 && (n = va.now);
      var i =
        t.call(this, r, function () {
          return e.delegate && e.delegate !== i ? e.delegate.now() : n();
        }) || this;
      return (i.actions = []), (i.active = !1), (i.scheduled = void 0), i;
    }
    return (
      (e.prototype.schedule = function (r, n, i) {
        return (
          n === void 0 && (n = 0),
          e.delegate && e.delegate !== this
            ? e.delegate.schedule(r, n, i)
            : t.prototype.schedule.call(this, r, n, i)
        );
      }),
      (e.prototype.flush = function (r) {
        var n = this.actions;
        if (this.active) {
          n.push(r);
          return;
        }
        var i;
        this.active = !0;
        do if ((i = r.execute(r.state, r.delay))) break;
        while ((r = n.shift()));
        if (((this.active = !1), i)) {
          for (; (r = n.shift()); ) r.unsubscribe();
          throw i;
        }
      }),
      e
    );
  })(va),
  Pm = (function (t) {
    I(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return e;
  })(zn),
  fh = new Pm(Lm),
  hh = fh,
  Vr = new U(function (t) {
    return t.complete();
  });
function nn(t) {
  return t ? Dm(t) : Vr;
}
function Dm(t) {
  return new U(function (e) {
    return t.schedule(function () {
      return e.complete();
    });
  });
}
function $e(t) {
  return t && typeof t.schedule == 'function';
}
var dh = function (t) {
  return function (e) {
    for (var r = 0, n = t.length; r < n && !e.closed; r++) e.next(t[r]);
    e.complete();
  };
};
function ac(t, e) {
  return new U(function (r) {
    var n = new ce(),
      i = 0;
    return (
      n.add(
        e.schedule(function () {
          if (i === t.length) {
            r.complete();
            return;
          }
          r.next(t[i++]), r.closed || n.add(this.schedule());
        })
      ),
      n
    );
  });
}
function qn(t, e) {
  return e ? ac(t, e) : new U(dh(t));
}
function Xi() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return $e(r) ? (t.pop(), ac(t, r)) : qn(t);
}
function cc(t, e) {
  return e
    ? new U(function (r) {
        return e.schedule(Bm, 0, { error: t, subscriber: r });
      })
    : new U(function (r) {
        return r.error(t);
      });
}
function Bm(t) {
  var e = t.error,
    r = t.subscriber;
  r.error(e);
}
var ma;
ma || (ma = {});
var xt = (function () {
  function t(e, r, n) {
    (this.kind = e),
      (this.value = r),
      (this.error = n),
      (this.hasValue = e === 'N');
  }
  return (
    (t.prototype.observe = function (e) {
      switch (this.kind) {
        case 'N':
          return e.next && e.next(this.value);
        case 'E':
          return e.error && e.error(this.error);
        case 'C':
          return e.complete && e.complete();
      }
    }),
    (t.prototype.do = function (e, r, n) {
      var i = this.kind;
      switch (i) {
        case 'N':
          return e && e(this.value);
        case 'E':
          return r && r(this.error);
        case 'C':
          return n && n();
      }
    }),
    (t.prototype.accept = function (e, r, n) {
      return e && typeof e.next == 'function'
        ? this.observe(e)
        : this.do(e, r, n);
    }),
    (t.prototype.toObservable = function () {
      var e = this.kind;
      switch (e) {
        case 'N':
          return Xi(this.value);
        case 'E':
          return cc(this.error);
        case 'C':
          return nn();
      }
      throw new Error('unexpected notification kind value');
    }),
    (t.createNext = function (e) {
      return typeof e < 'u' ? new t('N', e) : t.undefinedValueNotification;
    }),
    (t.createError = function (e) {
      return new t('E', void 0, e);
    }),
    (t.createComplete = function () {
      return t.completeNotification;
    }),
    (t.completeNotification = new t('C')),
    (t.undefinedValueNotification = new t('N', void 0)),
    t
  );
})();
function jm(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new Fm(t, e));
    }
  );
}
var Fm = (function () {
    function t(e, r) {
      r === void 0 && (r = 0), (this.scheduler = e), (this.delay = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new ph(e, this.scheduler, this.delay));
      }),
      t
    );
  })(),
  ph = (function (t) {
    I(e, t);
    function e(r, n, i) {
      i === void 0 && (i = 0);
      var s = t.call(this, r) || this;
      return (s.scheduler = n), (s.delay = i), s;
    }
    return (
      (e.dispatch = function (r) {
        var n = r.notification,
          i = r.destination;
        n.observe(i), this.unsubscribe();
      }),
      (e.prototype.scheduleMessage = function (r) {
        var n = this.destination;
        n.add(
          this.scheduler.schedule(
            e.dispatch,
            this.delay,
            new $m(r, this.destination)
          )
        );
      }),
      (e.prototype._next = function (r) {
        this.scheduleMessage(xt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        this.scheduleMessage(xt.createError(r)), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.scheduleMessage(xt.createComplete()), this.unsubscribe();
      }),
      e
    );
  })(D),
  $m = (function () {
    function t(e, r) {
      (this.notification = e), (this.destination = r);
    }
    return t;
  })(),
  uc = (function (t) {
    I(e, t);
    function e(r, n, i) {
      r === void 0 && (r = Number.POSITIVE_INFINITY),
        n === void 0 && (n = Number.POSITIVE_INFINITY);
      var s = t.call(this) || this;
      return (
        (s.scheduler = i),
        (s._events = []),
        (s._infiniteTimeWindow = !1),
        (s._bufferSize = r < 1 ? 1 : r),
        (s._windowTime = n < 1 ? 1 : n),
        n === Number.POSITIVE_INFINITY
          ? ((s._infiniteTimeWindow = !0), (s.next = s.nextInfiniteTimeWindow))
          : (s.next = s.nextTimeWindow),
        s
      );
    }
    return (
      (e.prototype.nextInfiniteTimeWindow = function (r) {
        if (!this.isStopped) {
          var n = this._events;
          n.push(r), n.length > this._bufferSize && n.shift();
        }
        t.prototype.next.call(this, r);
      }),
      (e.prototype.nextTimeWindow = function (r) {
        this.isStopped ||
          (this._events.push(new Wm(this._getNow(), r)),
          this._trimBufferThenGetEvents()),
          t.prototype.next.call(this, r);
      }),
      (e.prototype._subscribe = function (r) {
        var n = this._infiniteTimeWindow,
          i = n ? this._events : this._trimBufferThenGetEvents(),
          s = this.scheduler,
          o = i.length,
          a;
        if (this.closed) throw new Bt();
        if (
          (this.isStopped || this.hasError
            ? (a = ce.EMPTY)
            : (this.observers.push(r), (a = new ah(this, r))),
          s && r.add((r = new ph(r, s))),
          n)
        )
          for (var c = 0; c < o && !r.closed; c++) r.next(i[c]);
        else for (var c = 0; c < o && !r.closed; c++) r.next(i[c].value);
        return (
          this.hasError
            ? r.error(this.thrownError)
            : this.isStopped && r.complete(),
          a
        );
      }),
      (e.prototype._getNow = function () {
        return (this.scheduler || hh).now();
      }),
      (e.prototype._trimBufferThenGetEvents = function () {
        for (
          var r = this._getNow(),
            n = this._bufferSize,
            i = this._windowTime,
            s = this._events,
            o = s.length,
            a = 0;
          a < o && !(r - s[a].time < i);

        )
          a++;
        return o > n && (a = Math.max(a, o - n)), a > 0 && s.splice(0, a), s;
      }),
      e
    );
  })(_e),
  Wm = (function () {
    function t(e, r) {
      (this.time = e), (this.value = r);
    }
    return t;
  })(),
  sn = (function (t) {
    I(e, t);
    function e() {
      var r = (t !== null && t.apply(this, arguments)) || this;
      return (r.value = null), (r.hasNext = !1), (r.hasCompleted = !1), r;
    }
    return (
      (e.prototype._subscribe = function (r) {
        return this.hasError
          ? (r.error(this.thrownError), ce.EMPTY)
          : this.hasCompleted && this.hasNext
            ? (r.next(this.value), r.complete(), ce.EMPTY)
            : t.prototype._subscribe.call(this, r);
      }),
      (e.prototype.next = function (r) {
        this.hasCompleted || ((this.value = r), (this.hasNext = !0));
      }),
      (e.prototype.error = function (r) {
        this.hasCompleted || t.prototype.error.call(this, r);
      }),
      (e.prototype.complete = function () {
        (this.hasCompleted = !0),
          this.hasNext && t.prototype.next.call(this, this.value),
          t.prototype.complete.call(this);
      }),
      e
    );
  })(_e),
  Hm = 1,
  Vm = (function () {
    return Promise.resolve();
  })(),
  wa = {};
function el(t) {
  return t in wa ? (delete wa[t], !0) : !1;
}
var tl = {
    setImmediate: function (t) {
      var e = Hm++;
      return (
        (wa[e] = !0),
        Vm.then(function () {
          return el(e) && t();
        }),
        e
      );
    },
    clearImmediate: function (t) {
      el(t);
    },
  },
  Um = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r, n) || this;
      return (i.scheduler = r), (i.work = n), i;
    }
    return (
      (e.prototype.requestAsyncId = function (r, n, i) {
        return (
          i === void 0 && (i = 0),
          i !== null && i > 0
            ? t.prototype.requestAsyncId.call(this, r, n, i)
            : (r.actions.push(this),
              r.scheduled ||
                (r.scheduled = tl.setImmediate(r.flush.bind(r, null))))
        );
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {
        if (
          (i === void 0 && (i = 0),
          (i !== null && i > 0) || (i === null && this.delay > 0))
        )
          return t.prototype.recycleAsyncId.call(this, r, n, i);
        r.actions.length === 0 &&
          (tl.clearImmediate(n), (r.scheduled = void 0));
      }),
      e
    );
  })(Un),
  zm = (function (t) {
    I(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (
      (e.prototype.flush = function (r) {
        (this.active = !0), (this.scheduled = void 0);
        var n = this.actions,
          i,
          s = -1,
          o = n.length;
        r = r || n.shift();
        do if ((i = r.execute(r.state, r.delay))) break;
        while (++s < o && (r = n.shift()));
        if (((this.active = !1), i)) {
          for (; ++s < o && (r = n.shift()); ) r.unsubscribe();
          throw i;
        }
      }),
      e
    );
  })(zn),
  bh = new zm(Um),
  hi = bh,
  gh = new zn(Un),
  Oe = gh,
  qm = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r, n) || this;
      return (i.scheduler = r), (i.work = n), i;
    }
    return (
      (e.prototype.requestAsyncId = function (r, n, i) {
        return (
          i === void 0 && (i = 0),
          i !== null && i > 0
            ? t.prototype.requestAsyncId.call(this, r, n, i)
            : (r.actions.push(this),
              r.scheduled ||
                (r.scheduled = requestAnimationFrame(function () {
                  return r.flush(null);
                })))
        );
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {
        if (
          (i === void 0 && (i = 0),
          (i !== null && i > 0) || (i === null && this.delay > 0))
        )
          return t.prototype.recycleAsyncId.call(this, r, n, i);
        r.actions.length === 0 &&
          (cancelAnimationFrame(n), (r.scheduled = void 0));
      }),
      e
    );
  })(Un),
  Jm = (function (t) {
    I(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (
      (e.prototype.flush = function (r) {
        (this.active = !0), (this.scheduled = void 0);
        var n = this.actions,
          i,
          s = -1,
          o = n.length;
        r = r || n.shift();
        do if ((i = r.execute(r.state, r.delay))) break;
        while (++s < o && (r = n.shift()));
        if (((this.active = !1), i)) {
          for (; ++s < o && (r = n.shift()); ) r.unsubscribe();
          throw i;
        }
      }),
      e
    );
  })(zn),
  yh = new Jm(qm),
  Gm = yh,
  Qm = (function (t) {
    I(e, t);
    function e(r, n) {
      r === void 0 && (r = vh), n === void 0 && (n = Number.POSITIVE_INFINITY);
      var i =
        t.call(this, r, function () {
          return i.frame;
        }) || this;
      return (i.maxFrames = n), (i.frame = 0), (i.index = -1), i;
    }
    return (
      (e.prototype.flush = function () {
        for (
          var r = this, n = r.actions, i = r.maxFrames, s, o;
          (o = n[0]) &&
          o.delay <= i &&
          (n.shift(),
          (this.frame = o.delay),
          !(s = o.execute(o.state, o.delay)));

        );
        if (s) {
          for (; (o = n.shift()); ) o.unsubscribe();
          throw s;
        }
      }),
      (e.frameTimeFactor = 10),
      e
    );
  })(zn),
  vh = (function (t) {
    I(e, t);
    function e(r, n, i) {
      i === void 0 && (i = r.index += 1);
      var s = t.call(this, r, n) || this;
      return (
        (s.scheduler = r),
        (s.work = n),
        (s.index = i),
        (s.active = !0),
        (s.index = r.index = i),
        s
      );
    }
    return (
      (e.prototype.schedule = function (r, n) {
        if ((n === void 0 && (n = 0), !this.id))
          return t.prototype.schedule.call(this, r, n);
        this.active = !1;
        var i = new e(this.scheduler, this.work);
        return this.add(i), i.schedule(r, n);
      }),
      (e.prototype.requestAsyncId = function (r, n, i) {
        i === void 0 && (i = 0), (this.delay = r.frame + i);
        var s = r.actions;
        return s.push(this), s.sort(e.sortActions), !0;
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {}),
      (e.prototype._execute = function (r, n) {
        if (this.active === !0) return t.prototype._execute.call(this, r, n);
      }),
      (e.sortActions = function (r, n) {
        return r.delay === n.delay
          ? r.index === n.index
            ? 0
            : r.index > n.index
              ? 1
              : -1
          : r.delay > n.delay
            ? 1
            : -1;
      }),
      e
    );
  })(Un);
function ft() {}
function Zm(t) {
  return (
    !!t &&
    (t instanceof U ||
      (typeof t.lift == 'function' && typeof t.subscribe == 'function'))
  );
}
var Ym = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = 'argument out of range'),
        (this.name = 'ArgumentOutOfRangeError'),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  Ur = Ym,
  Km = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = 'no elements in sequence'),
        (this.name = 'EmptyError'),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  Jn = Km,
  Xm = (function () {
    function t() {
      return (
        Error.call(this),
        (this.message = 'Timeout has occurred'),
        (this.name = 'TimeoutError'),
        this
      );
    }
    return (t.prototype = Object.create(Error.prototype)), t;
  })(),
  mh = Xm;
function Ye(t, e) {
  return function (n) {
    if (typeof t != 'function')
      throw new TypeError(
        'argument is not a function. Are you looking for `mapTo()`?'
      );
    return n.lift(new ew(t, e));
  };
}
var ew = (function () {
    function t(e, r) {
      (this.project = e), (this.thisArg = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new tw(e, this.project, this.thisArg));
      }),
      t
    );
  })(),
  tw = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.project = n), (s.count = 0), (s.thisArg = i || s), s;
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        try {
          n = this.project.call(this.thisArg, r, this.count++);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(D);
function wh(t, e, r) {
  if (e)
    if ($e(e)) r = e;
    else
      return function () {
        for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
        return wh(t, r)
          .apply(void 0, n)
          .pipe(
            Ye(function (s) {
              return Te(s) ? e.apply(void 0, s) : e(s);
            })
          );
      };
  return function () {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    var s = this,
      o,
      a = { context: s, subject: o, callbackFunc: t, scheduler: r };
    return new U(function (c) {
      if (r) {
        var l = { args: n, subscriber: c, params: a };
        return r.schedule(rw, 0, l);
      } else {
        if (!o) {
          o = new sn();
          var u = function () {
            for (var f = [], h = 0; h < arguments.length; h++)
              f[h] = arguments[h];
            o.next(f.length <= 1 ? f[0] : f), o.complete();
          };
          try {
            t.apply(s, n.concat([u]));
          } catch (f) {
            sc(o) ? o.error(f) : console.warn(f);
          }
        }
        return o.subscribe(c);
      }
    });
  };
}
function rw(t) {
  var e = this,
    r = t.args,
    n = t.subscriber,
    i = t.params,
    s = i.callbackFunc,
    o = i.context,
    a = i.scheduler,
    c = i.subject;
  if (!c) {
    c = i.subject = new sn();
    var u = function () {
      for (var l = [], f = 0; f < arguments.length; f++) l[f] = arguments[f];
      var h = l.length <= 1 ? l[0] : l;
      e.add(a.schedule(nw, 0, { value: h, subject: c }));
    };
    try {
      s.apply(o, r.concat([u]));
    } catch (l) {
      c.error(l);
    }
  }
  this.add(c.subscribe(n));
}
function nw(t) {
  var e = t.value,
    r = t.subject;
  r.next(e), r.complete();
}
function _h(t, e, r) {
  if (e)
    if ($e(e)) r = e;
    else
      return function () {
        for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
        return _h(t, r)
          .apply(void 0, n)
          .pipe(
            Ye(function (s) {
              return Te(s) ? e.apply(void 0, s) : e(s);
            })
          );
      };
  return function () {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    var s = {
      subject: void 0,
      args: n,
      callbackFunc: t,
      scheduler: r,
      context: this,
    };
    return new U(function (o) {
      var a = s.context,
        c = s.subject;
      if (r) return r.schedule(iw, 0, { params: s, subscriber: o, context: a });
      if (!c) {
        c = s.subject = new sn();
        var u = function () {
          for (var l = [], f = 0; f < arguments.length; f++)
            l[f] = arguments[f];
          var h = l.shift();
          if (h) {
            c.error(h);
            return;
          }
          c.next(l.length <= 1 ? l[0] : l), c.complete();
        };
        try {
          t.apply(a, n.concat([u]));
        } catch (l) {
          sc(c) ? c.error(l) : console.warn(l);
        }
      }
      return c.subscribe(o);
    });
  };
}
function iw(t) {
  var e = this,
    r = t.params,
    n = t.subscriber,
    i = t.context,
    s = r.callbackFunc,
    o = r.args,
    a = r.scheduler,
    c = r.subject;
  if (!c) {
    c = r.subject = new sn();
    var u = function () {
      for (var l = [], f = 0; f < arguments.length; f++) l[f] = arguments[f];
      var h = l.shift();
      if (h) e.add(a.schedule(rl, 0, { err: h, subject: c }));
      else {
        var y = l.length <= 1 ? l[0] : l;
        e.add(a.schedule(sw, 0, { value: y, subject: c }));
      }
    };
    try {
      s.apply(i, o.concat([u]));
    } catch (l) {
      this.add(a.schedule(rl, 0, { err: l, subject: c }));
    }
  }
  this.add(c.subscribe(n));
}
function sw(t) {
  var e = t.value,
    r = t.subject;
  r.next(e), r.complete();
}
function rl(t) {
  var e = t.err,
    r = t.subject;
  r.error(e);
}
var gr = (function (t) {
    I(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (
      (e.prototype.notifyNext = function (r, n, i, s, o) {
        this.destination.next(n);
      }),
      (e.prototype.notifyError = function (r, n) {
        this.destination.error(r);
      }),
      (e.prototype.notifyComplete = function (r) {
        this.destination.complete();
      }),
      e
    );
  })(D),
  ow = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this) || this;
      return (
        (s.parent = r), (s.outerValue = n), (s.outerIndex = i), (s.index = 0), s
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.parent.notifyNext(
          this.outerValue,
          r,
          this.outerIndex,
          this.index++,
          this
        );
      }),
      (e.prototype._error = function (r) {
        this.parent.notifyError(r, this), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.parent.notifyComplete(this), this.unsubscribe();
      }),
      e
    );
  })(D),
  aw = function (t) {
    return function (e) {
      return (
        t
          .then(
            function (r) {
              e.closed || (e.next(r), e.complete());
            },
            function (r) {
              return e.error(r);
            }
          )
          .then(null, kr),
        e
      );
    };
  };
function cw() {
  return typeof Symbol != 'function' || !Symbol.iterator
    ? '@@iterator'
    : Symbol.iterator;
}
var Vt = cw(),
  uw = function (t) {
    return function (e) {
      var r = t[Vt]();
      do {
        var n = void 0;
        try {
          n = r.next();
        } catch (i) {
          return e.error(i), e;
        }
        if (n.done) {
          e.complete();
          break;
        }
        if ((e.next(n.value), e.closed)) break;
      } while (!0);
      return (
        typeof r.return == 'function' &&
          e.add(function () {
            r.return && r.return();
          }),
        e
      );
    };
  },
  lw = function (t) {
    return function (e) {
      var r = t[rn]();
      if (typeof r.subscribe != 'function')
        throw new TypeError(
          'Provided object does not correctly implement Symbol.observable'
        );
      return r.subscribe(e);
    };
  },
  Sh = function (t) {
    return t && typeof t.length == 'number' && typeof t != 'function';
  };
function Eh(t) {
  return !!t && typeof t.subscribe != 'function' && typeof t.then == 'function';
}
var Cn = function (t) {
  if (t && typeof t[rn] == 'function') return lw(t);
  if (Sh(t)) return dh(t);
  if (Eh(t)) return aw(t);
  if (t && typeof t[Vt] == 'function') return uw(t);
  var e = ic(t) ? 'an invalid object' : "'" + t + "'",
    r =
      'You provided ' +
      e +
      ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.';
  throw new TypeError(r);
};
function kt(t, e, r, n, i) {
  if ((i === void 0 && (i = new ow(t, r, n)), !i.closed))
    return e instanceof U ? e.subscribe(i) : Cn(e)(i);
}
var nl = {};
function fw() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = void 0,
    n = void 0;
  return (
    $e(t[t.length - 1]) && (n = t.pop()),
    typeof t[t.length - 1] == 'function' && (r = t.pop()),
    t.length === 1 && Te(t[0]) && (t = t[0]),
    qn(t, n).lift(new lc(r))
  );
}
var lc = (function () {
    function t(e) {
      this.resultSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new hw(e, this.resultSelector));
      }),
      t
    );
  })(),
  hw = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (
        (i.resultSelector = n),
        (i.active = 0),
        (i.values = []),
        (i.observables = []),
        i
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.values.push(nl), this.observables.push(r);
      }),
      (e.prototype._complete = function () {
        var r = this.observables,
          n = r.length;
        if (n === 0) this.destination.complete();
        else {
          (this.active = n), (this.toRespond = n);
          for (var i = 0; i < n; i++) {
            var s = r[i];
            this.add(kt(this, s, void 0, i));
          }
        }
      }),
      (e.prototype.notifyComplete = function (r) {
        (this.active -= 1) === 0 && this.destination.complete();
      }),
      (e.prototype.notifyNext = function (r, n, i) {
        var s = this.values,
          o = s[i],
          a = this.toRespond
            ? o === nl
              ? --this.toRespond
              : this.toRespond
            : 0;
        (s[i] = n),
          a === 0 &&
            (this.resultSelector
              ? this._tryResultSelector(s)
              : this.destination.next(s.slice()));
      }),
      (e.prototype._tryResultSelector = function (r) {
        var n;
        try {
          n = this.resultSelector.apply(this, r);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(gr);
function dw(t, e) {
  return new U(function (r) {
    var n = new ce();
    return (
      n.add(
        e.schedule(function () {
          var i = t[rn]();
          n.add(
            i.subscribe({
              next: function (s) {
                n.add(
                  e.schedule(function () {
                    return r.next(s);
                  })
                );
              },
              error: function (s) {
                n.add(
                  e.schedule(function () {
                    return r.error(s);
                  })
                );
              },
              complete: function () {
                n.add(
                  e.schedule(function () {
                    return r.complete();
                  })
                );
              },
            })
          );
        })
      ),
      n
    );
  });
}
function pw(t, e) {
  return new U(function (r) {
    var n = new ce();
    return (
      n.add(
        e.schedule(function () {
          return t.then(
            function (i) {
              n.add(
                e.schedule(function () {
                  r.next(i),
                    n.add(
                      e.schedule(function () {
                        return r.complete();
                      })
                    );
                })
              );
            },
            function (i) {
              n.add(
                e.schedule(function () {
                  return r.error(i);
                })
              );
            }
          );
        })
      ),
      n
    );
  });
}
function bw(t, e) {
  if (!t) throw new Error('Iterable cannot be null');
  return new U(function (r) {
    var n = new ce(),
      i;
    return (
      n.add(function () {
        i && typeof i.return == 'function' && i.return();
      }),
      n.add(
        e.schedule(function () {
          (i = t[Vt]()),
            n.add(
              e.schedule(function () {
                if (!r.closed) {
                  var s, o;
                  try {
                    var a = i.next();
                    (s = a.value), (o = a.done);
                  } catch (c) {
                    r.error(c);
                    return;
                  }
                  o ? r.complete() : (r.next(s), this.schedule());
                }
              })
            );
        })
      ),
      n
    );
  });
}
function gw(t) {
  return t && typeof t[rn] == 'function';
}
function yw(t) {
  return t && typeof t[Vt] == 'function';
}
function Ch(t, e) {
  if (t != null) {
    if (gw(t)) return dw(t, e);
    if (Eh(t)) return pw(t, e);
    if (Sh(t)) return ac(t, e);
    if (yw(t) || typeof t == 'string') return bw(t, e);
  }
  throw new TypeError(((t !== null && typeof t) || t) + ' is not observable');
}
function Mt(t, e) {
  return e ? Ch(t, e) : t instanceof U ? t : new U(Cn(t));
}
var ue = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this) || this;
      return (n.parent = r), n;
    }
    return (
      (e.prototype._next = function (r) {
        this.parent.notifyNext(r);
      }),
      (e.prototype._error = function (r) {
        this.parent.notifyError(r), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.parent.notifyComplete(), this.unsubscribe();
      }),
      e
    );
  })(D),
  le = (function (t) {
    I(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (
      (e.prototype.notifyNext = function (r) {
        this.destination.next(r);
      }),
      (e.prototype.notifyError = function (r) {
        this.destination.error(r);
      }),
      (e.prototype.notifyComplete = function () {
        this.destination.complete();
      }),
      e
    );
  })(D);
function fe(t, e) {
  if (!e.closed) {
    if (t instanceof U) return t.subscribe(e);
    var r;
    try {
      r = Cn(t)(e);
    } catch (n) {
      e.error(n);
    }
    return r;
  }
}
function or(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    typeof e == 'function'
      ? function (n) {
          return n.pipe(
            or(function (i, s) {
              return Mt(t(i, s)).pipe(
                Ye(function (o, a) {
                  return e(i, o, s, a);
                })
              );
            }, r)
          );
        }
      : (typeof e == 'number' && (r = e),
        function (n) {
          return n.lift(new vw(t, r));
        })
  );
}
var vw = (function () {
    function t(e, r) {
      r === void 0 && (r = Number.POSITIVE_INFINITY),
        (this.project = e),
        (this.concurrent = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new mw(e, this.project, this.concurrent));
      }),
      t
    );
  })(),
  mw = (function (t) {
    I(e, t);
    function e(r, n, i) {
      i === void 0 && (i = Number.POSITIVE_INFINITY);
      var s = t.call(this, r) || this;
      return (
        (s.project = n),
        (s.concurrent = i),
        (s.hasCompleted = !1),
        (s.buffer = []),
        (s.active = 0),
        (s.index = 0),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.active < this.concurrent ? this._tryNext(r) : this.buffer.push(r);
      }),
      (e.prototype._tryNext = function (r) {
        var n,
          i = this.index++;
        try {
          n = this.project(r, i);
        } catch (s) {
          this.destination.error(s);
          return;
        }
        this.active++, this._innerSub(n);
      }),
      (e.prototype._innerSub = function (r) {
        var n = new ue(this),
          i = this.destination;
        i.add(n);
        var s = fe(r, n);
        s !== n && i.add(s);
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.active === 0 &&
            this.buffer.length === 0 &&
            this.destination.complete(),
          this.unsubscribe();
      }),
      (e.prototype.notifyNext = function (r) {
        this.destination.next(r);
      }),
      (e.prototype.notifyComplete = function () {
        var r = this.buffer;
        this.active--,
          r.length > 0
            ? this._next(r.shift())
            : this.active === 0 &&
              this.hasCompleted &&
              this.destination.complete();
      }),
      e
    );
  })(le),
  ww = or;
function fc(t) {
  return t === void 0 && (t = Number.POSITIVE_INFINITY), or(Ht, t);
}
function xh() {
  return fc(1);
}
function xn() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return xh()(Xi.apply(void 0, t));
}
function hc(t) {
  return new U(function (e) {
    var r;
    try {
      r = t();
    } catch (i) {
      e.error(i);
      return;
    }
    var n = r ? Mt(r) : nn();
    return n.subscribe(e);
  });
}
function _w() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 1) {
    var r = t[0];
    if (Te(r)) return ii(r, null);
    if (ic(r) && Object.getPrototypeOf(r) === Object.prototype) {
      var n = Object.keys(r);
      return ii(
        n.map(function (s) {
          return r[s];
        }),
        n
      );
    }
  }
  if (typeof t[t.length - 1] == 'function') {
    var i = t.pop();
    return (
      (t = t.length === 1 && Te(t[0]) ? t[0] : t),
      ii(t, null).pipe(
        Ye(function (s) {
          return i.apply(void 0, s);
        })
      )
    );
  }
  return ii(t, null);
}
function ii(t, e) {
  return new U(function (r) {
    var n = t.length;
    if (n === 0) {
      r.complete();
      return;
    }
    for (
      var i = new Array(n),
        s = 0,
        o = 0,
        a = function (u) {
          var l = Mt(t[u]),
            f = !1;
          r.add(
            l.subscribe({
              next: function (h) {
                f || ((f = !0), o++), (i[u] = h);
              },
              error: function (h) {
                return r.error(h);
              },
              complete: function () {
                s++,
                  (s === n || !f) &&
                    (o === n &&
                      r.next(
                        e
                          ? e.reduce(function (h, y, _) {
                              return (h[y] = i[_]), h;
                            }, {})
                          : i
                      ),
                    r.complete());
              },
            })
          );
        },
        c = 0;
      c < n;
      c++
    )
      a(c);
  });
}
function Ih(t, e, r, n) {
  return (
    Hr(r) && ((n = r), (r = void 0)),
    n
      ? Ih(t, e, r).pipe(
          Ye(function (i) {
            return Te(i) ? n.apply(void 0, i) : n(i);
          })
        )
      : new U(function (i) {
          function s(o) {
            arguments.length > 1
              ? i.next(Array.prototype.slice.call(arguments))
              : i.next(o);
          }
          kh(t, e, s, i, r);
        })
  );
}
function kh(t, e, r, n, i) {
  var s;
  if (Cw(t)) {
    var o = t;
    t.addEventListener(e, r, i),
      (s = function () {
        return o.removeEventListener(e, r, i);
      });
  } else if (Ew(t)) {
    var a = t;
    t.on(e, r),
      (s = function () {
        return a.off(e, r);
      });
  } else if (Sw(t)) {
    var c = t;
    t.addListener(e, r),
      (s = function () {
        return c.removeListener(e, r);
      });
  } else if (t && t.length)
    for (var u = 0, l = t.length; u < l; u++) kh(t[u], e, r, n, i);
  else throw new TypeError('Invalid event target');
  n.add(s);
}
function Sw(t) {
  return (
    t &&
    typeof t.addListener == 'function' &&
    typeof t.removeListener == 'function'
  );
}
function Ew(t) {
  return t && typeof t.on == 'function' && typeof t.off == 'function';
}
function Cw(t) {
  return (
    t &&
    typeof t.addEventListener == 'function' &&
    typeof t.removeEventListener == 'function'
  );
}
function Mh(t, e, r) {
  return r
    ? Mh(t, e).pipe(
        Ye(function (n) {
          return Te(n) ? r.apply(void 0, n) : r(n);
        })
      )
    : new U(function (n) {
        var i = function () {
            for (var o = [], a = 0; a < arguments.length; a++)
              o[a] = arguments[a];
            return n.next(o.length === 1 ? o[0] : o);
          },
          s;
        try {
          s = t(i);
        } catch (o) {
          n.error(o);
          return;
        }
        if (Hr(e))
          return function () {
            return e(i, s);
          };
      });
}
function xw(t, e, r, n, i) {
  var s, o;
  if (arguments.length == 1) {
    var a = t;
    (o = a.initialState),
      (e = a.condition),
      (r = a.iterate),
      (s = a.resultSelector || Ht),
      (i = a.scheduler);
  } else
    n === void 0 || $e(n) ? ((o = t), (s = Ht), (i = n)) : ((o = t), (s = n));
  return new U(function (c) {
    var u = o;
    if (i)
      return i.schedule(Iw, 0, {
        subscriber: c,
        iterate: r,
        condition: e,
        resultSelector: s,
        state: u,
      });
    do {
      if (e) {
        var l = void 0;
        try {
          l = e(u);
        } catch (h) {
          c.error(h);
          return;
        }
        if (!l) {
          c.complete();
          break;
        }
      }
      var f = void 0;
      try {
        f = s(u);
      } catch (h) {
        c.error(h);
        return;
      }
      if ((c.next(f), c.closed)) break;
      try {
        u = r(u);
      } catch (h) {
        c.error(h);
        return;
      }
    } while (!0);
  });
}
function Iw(t) {
  var e = t.subscriber,
    r = t.condition;
  if (!e.closed) {
    if (t.needIterate)
      try {
        t.state = t.iterate(t.state);
      } catch (s) {
        e.error(s);
        return;
      }
    else t.needIterate = !0;
    if (r) {
      var n = void 0;
      try {
        n = r(t.state);
      } catch (s) {
        e.error(s);
        return;
      }
      if (!n) {
        e.complete();
        return;
      }
      if (e.closed) return;
    }
    var i;
    try {
      i = t.resultSelector(t.state);
    } catch (s) {
      e.error(s);
      return;
    }
    if (!e.closed && (e.next(i), !e.closed)) return this.schedule(t);
  }
}
function kw(t, e, r) {
  return (
    e === void 0 && (e = Vr),
    r === void 0 && (r = Vr),
    hc(function () {
      return t() ? e : r;
    })
  );
}
function zr(t) {
  return !Te(t) && t - parseFloat(t) + 1 >= 0;
}
function Mw(t, e) {
  return (
    t === void 0 && (t = 0),
    e === void 0 && (e = Oe),
    (!zr(t) || t < 0) && (t = 0),
    (!e || typeof e.schedule != 'function') && (e = Oe),
    new U(function (r) {
      return (
        r.add(e.schedule(Rw, t, { subscriber: r, counter: 0, period: t })), r
      );
    })
  );
}
function Rw(t) {
  var e = t.subscriber,
    r = t.counter,
    n = t.period;
  e.next(r), this.schedule({ subscriber: e, counter: r + 1, period: n }, n);
}
function Rh() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = Number.POSITIVE_INFINITY,
    n = null,
    i = t[t.length - 1];
  return (
    $e(i)
      ? ((n = t.pop()),
        t.length > 1 && typeof t[t.length - 1] == 'number' && (r = t.pop()))
      : typeof i == 'number' && (r = t.pop()),
    n === null && t.length === 1 && t[0] instanceof U ? t[0] : fc(r)(qn(t, n))
  );
}
var Ah = new U(ft);
function Aw() {
  return Ah;
}
function _a() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 0) return Vr;
  var r = t[0],
    n = t.slice(1);
  return t.length === 1 && Te(r)
    ? _a.apply(void 0, r)
    : new U(function (i) {
        var s = function () {
          return i.add(_a.apply(void 0, n).subscribe(i));
        };
        return Mt(r).subscribe({
          next: function (o) {
            i.next(o);
          },
          error: s,
          complete: s,
        });
      });
}
function Tw(t, e) {
  return e
    ? new U(function (r) {
        var n = Object.keys(t),
          i = new ce();
        return (
          i.add(
            e.schedule(Ow, 0, {
              keys: n,
              index: 0,
              subscriber: r,
              subscription: i,
              obj: t,
            })
          ),
          i
        );
      })
    : new U(function (r) {
        for (var n = Object.keys(t), i = 0; i < n.length && !r.closed; i++) {
          var s = n[i];
          t.hasOwnProperty(s) && r.next([s, t[s]]);
        }
        r.complete();
      });
}
function Ow(t) {
  var e = t.keys,
    r = t.index,
    n = t.subscriber,
    i = t.subscription,
    s = t.obj;
  if (!n.closed)
    if (r < e.length) {
      var o = e[r];
      n.next([o, s[o]]),
        i.add(
          this.schedule({
            keys: e,
            index: r + 1,
            subscriber: n,
            subscription: i,
            obj: s,
          })
        );
    } else n.complete();
}
function Th(t, e) {
  function r() {
    return !r.pred.apply(r.thisArg, arguments);
  }
  return (r.pred = t), (r.thisArg = e), r;
}
function Ut(t, e) {
  return function (n) {
    return n.lift(new Nw(t, e));
  };
}
var Nw = (function () {
    function t(e, r) {
      (this.predicate = e), (this.thisArg = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Lw(e, this.predicate, this.thisArg));
      }),
      t
    );
  })(),
  Lw = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.predicate = n), (s.thisArg = i), (s.count = 0), s;
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        try {
          n = this.predicate.call(this.thisArg, r, this.count++);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        n && this.destination.next(r);
      }),
      e
    );
  })(D);
function Pw(t, e, r) {
  return [Ut(e, r)(new U(Cn(t))), Ut(Th(e, r))(new U(Cn(t)))];
}
function Oh() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 1)
    if (Te(t[0])) t = t[0];
    else return t[0];
  return qn(t, void 0).lift(new Dw());
}
var Dw = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Bw(e));
      }),
      t
    );
  })(),
  Bw = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.hasFirst = !1), (n.observables = []), (n.subscriptions = []), n;
    }
    return (
      (e.prototype._next = function (r) {
        this.observables.push(r);
      }),
      (e.prototype._complete = function () {
        var r = this.observables,
          n = r.length;
        if (n === 0) this.destination.complete();
        else {
          for (var i = 0; i < n && !this.hasFirst; i++) {
            var s = r[i],
              o = kt(this, s, void 0, i);
            this.subscriptions && this.subscriptions.push(o), this.add(o);
          }
          this.observables = null;
        }
      }),
      (e.prototype.notifyNext = function (r, n, i) {
        if (!this.hasFirst) {
          this.hasFirst = !0;
          for (var s = 0; s < this.subscriptions.length; s++)
            if (s !== i) {
              var o = this.subscriptions[s];
              o.unsubscribe(), this.remove(o);
            }
          this.subscriptions = null;
        }
        this.destination.next(n);
      }),
      e
    );
  })(gr);
function jw(t, e, r) {
  return (
    t === void 0 && (t = 0),
    new U(function (n) {
      e === void 0 && ((e = t), (t = 0));
      var i = 0,
        s = t;
      if (r)
        return r.schedule(Fw, 0, {
          index: i,
          count: e,
          start: t,
          subscriber: n,
        });
      do {
        if (i++ >= e) {
          n.complete();
          break;
        }
        if ((n.next(s++), n.closed)) break;
      } while (!0);
    })
  );
}
function Fw(t) {
  var e = t.start,
    r = t.index,
    n = t.count,
    i = t.subscriber;
  if (r >= n) {
    i.complete();
    return;
  }
  i.next(e),
    !i.closed && ((t.index = r + 1), (t.start = e + 1), this.schedule(t));
}
function Nh(t, e, r) {
  t === void 0 && (t = 0);
  var n = -1;
  return (
    zr(e) ? (n = (Number(e) < 1 && 1) || Number(e)) : $e(e) && (r = e),
    $e(r) || (r = Oe),
    new U(function (i) {
      var s = zr(t) ? t : +t - r.now();
      return r.schedule($w, s, { index: 0, period: n, subscriber: i });
    })
  );
}
function $w(t) {
  var e = t.index,
    r = t.period,
    n = t.subscriber;
  if ((n.next(e), !n.closed)) {
    if (r === -1) return n.complete();
    (t.index = e + 1), this.schedule(t, r);
  }
}
function Ww(t, e) {
  return new U(function (r) {
    var n;
    try {
      n = t();
    } catch (a) {
      r.error(a);
      return;
    }
    var i;
    try {
      i = e(n);
    } catch (a) {
      r.error(a);
      return;
    }
    var s = i ? Mt(i) : Vr,
      o = s.subscribe(r);
    return function () {
      o.unsubscribe(), n && n.unsubscribe();
    };
  });
}
function Lh() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return typeof r == 'function' && t.pop(), qn(t, void 0).lift(new Ph(r));
}
var Ph = (function () {
    function t(e) {
      this.resultSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Hw(e, this.resultSelector));
      }),
      t
    );
  })(),
  Hw = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.resultSelector = n),
        (s.iterators = []),
        (s.active = 0),
        (s.resultSelector = typeof n == 'function' ? n : void 0),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.iterators;
        Te(r)
          ? n.push(new Uw(r))
          : typeof r[Vt] == 'function'
            ? n.push(new Vw(r[Vt]()))
            : n.push(new zw(this.destination, this, r));
      }),
      (e.prototype._complete = function () {
        var r = this.iterators,
          n = r.length;
        if ((this.unsubscribe(), n === 0)) {
          this.destination.complete();
          return;
        }
        this.active = n;
        for (var i = 0; i < n; i++) {
          var s = r[i];
          if (s.stillUnsubscribed) {
            var o = this.destination;
            o.add(s.subscribe());
          } else this.active--;
        }
      }),
      (e.prototype.notifyInactive = function () {
        this.active--, this.active === 0 && this.destination.complete();
      }),
      (e.prototype.checkIterators = function () {
        for (
          var r = this.iterators, n = r.length, i = this.destination, s = 0;
          s < n;
          s++
        ) {
          var o = r[s];
          if (typeof o.hasValue == 'function' && !o.hasValue()) return;
        }
        for (var a = !1, c = [], s = 0; s < n; s++) {
          var o = r[s],
            u = o.next();
          if ((o.hasCompleted() && (a = !0), u.done)) {
            i.complete();
            return;
          }
          c.push(u.value);
        }
        this.resultSelector ? this._tryresultSelector(c) : i.next(c),
          a && i.complete();
      }),
      (e.prototype._tryresultSelector = function (r) {
        var n;
        try {
          n = this.resultSelector.apply(this, r);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(D),
  Vw = (function () {
    function t(e) {
      (this.iterator = e), (this.nextResult = e.next());
    }
    return (
      (t.prototype.hasValue = function () {
        return !0;
      }),
      (t.prototype.next = function () {
        var e = this.nextResult;
        return (this.nextResult = this.iterator.next()), e;
      }),
      (t.prototype.hasCompleted = function () {
        var e = this.nextResult;
        return !!(e && e.done);
      }),
      t
    );
  })(),
  Uw = (function () {
    function t(e) {
      (this.array = e),
        (this.index = 0),
        (this.length = 0),
        (this.length = e.length);
    }
    return (
      (t.prototype[Vt] = function () {
        return this;
      }),
      (t.prototype.next = function (e) {
        var r = this.index++,
          n = this.array;
        return r < this.length
          ? { value: n[r], done: !1 }
          : { value: null, done: !0 };
      }),
      (t.prototype.hasValue = function () {
        return this.array.length > this.index;
      }),
      (t.prototype.hasCompleted = function () {
        return this.array.length === this.index;
      }),
      t
    );
  })(),
  zw = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.parent = n),
        (s.observable = i),
        (s.stillUnsubscribed = !0),
        (s.buffer = []),
        (s.isComplete = !1),
        s
      );
    }
    return (
      (e.prototype[Vt] = function () {
        return this;
      }),
      (e.prototype.next = function () {
        var r = this.buffer;
        return r.length === 0 && this.isComplete
          ? { value: null, done: !0 }
          : { value: r.shift(), done: !1 };
      }),
      (e.prototype.hasValue = function () {
        return this.buffer.length > 0;
      }),
      (e.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
      }),
      (e.prototype.notifyComplete = function () {
        this.buffer.length > 0
          ? ((this.isComplete = !0), this.parent.notifyInactive())
          : this.destination.complete();
      }),
      (e.prototype.notifyNext = function (r) {
        this.buffer.push(r), this.parent.checkIterators();
      }),
      (e.prototype.subscribe = function () {
        return fe(this.observable, new ue(this));
      }),
      e
    );
  })(le);
const qw = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        ArgumentOutOfRangeError: Ur,
        AsyncSubject: sn,
        BehaviorSubject: lh,
        ConnectableObservable: uh,
        EMPTY: Vr,
        EmptyError: Jn,
        GroupedObservable: ya,
        NEVER: Ah,
        Notification: xt,
        get NotificationKind() {
          return ma;
        },
        ObjectUnsubscribedError: Bt,
        Observable: U,
        ReplaySubject: uc,
        Scheduler: va,
        Subject: _e,
        Subscriber: D,
        Subscription: ce,
        TimeoutError: mh,
        UnsubscriptionError: mn,
        VirtualAction: vh,
        VirtualTimeScheduler: Qm,
        animationFrame: Gm,
        animationFrameScheduler: yh,
        asap: hi,
        asapScheduler: bh,
        async: Oe,
        asyncScheduler: gh,
        bindCallback: wh,
        bindNodeCallback: _h,
        combineLatest: fw,
        concat: xn,
        config: ze,
        defer: hc,
        empty: nn,
        forkJoin: _w,
        from: Mt,
        fromEvent: Ih,
        fromEventPattern: Mh,
        generate: xw,
        identity: Ht,
        iif: kw,
        interval: Mw,
        isObservable: Zm,
        merge: Rh,
        never: Aw,
        noop: ft,
        observable: rn,
        of: Xi,
        onErrorResumeNext: _a,
        pairs: Tw,
        partition: Pw,
        pipe: ga,
        queue: hh,
        queueScheduler: fh,
        race: Oh,
        range: jw,
        scheduled: Ch,
        throwError: cc,
        timer: Nh,
        using: Ww,
        zip: Lh,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  es = cr(qw);
var ts = {};
function Dh(t) {
  var e,
    r,
    n = '';
  if (typeof t == 'string' || typeof t == 'number') n += t;
  else if (typeof t == 'object')
    if (Array.isArray(t))
      for (e = 0; e < t.length; e++)
        t[e] && (r = Dh(t[e])) && (n && (n += ' '), (n += r));
    else for (e in t) t[e] && (n && (n += ' '), (n += e));
  return n;
}
function il() {
  for (var t, e, r = 0, n = ''; r < arguments.length; )
    (t = arguments[r++]) && (e = Dh(t)) && (n && (n += ' '), (n += e));
  return n;
}
const Jw = Object.freeze(
    Object.defineProperty(
      { __proto__: null, clsx: il, default: il },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  rs = cr(Jw),
  Gn = cr(dd);
var gt = {},
  ns = {};
Object.defineProperty(ns, '__esModule', { value: !0 });
ns.CloseIcon = void 0;
const sl = We;
function Gw(t) {
  return (0, sl.h)(
    'svg',
    Object.assign(
      {
        width: '40',
        height: '40',
        viewBox: '0 0 40 40',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      t
    ),
    (0, sl.h)('path', {
      d: 'M13.7677 13L12.3535 14.4142L18.3535 20.4142L12.3535 26.4142L13.7677 27.8284L19.7677 21.8284L25.7677 27.8284L27.1819 26.4142L21.1819 20.4142L27.1819 14.4142L25.7677 13L19.7677 19L13.7677 13Z',
    })
  );
}
ns.CloseIcon = Gw;
var dc = {};
Object.defineProperty(dc, '__esModule', { value: !0 });
dc.default =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiMwMDUyRkYiLz48cGF0aCBkPSJNMTQuMDM3IDE4LjkyNmMtMi43NSAwLTQuOTA3LTIuMjA1LTQuOTA3LTQuOTI2IDAtMi43MiAyLjIzLTQuOTI2IDQuOTA3LTQuOTI2YTQuODY2IDQuODY2IDAgMCAxIDQuODMzIDQuMTE4aDQuOTgyYy0uNDQ2LTUuMDczLTQuNjg0LTkuMDQ0LTkuODE1LTkuMDQ0QzguNjEgNC4xNDggNC4xNDkgOC41NiA0LjE0OSAxNHM0LjM4NyA5Ljg1MiA5Ljg5IDkuODUyYzUuMjA0IDAgOS4zNjgtMy45NyA5LjgxNC05LjA0M0gxOC44N2E0Ljg2NiA0Ljg2NiAwIDAgMS00LjgzMyA0LjExN1oiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';
var pc = {};
Object.defineProperty(pc, '__esModule', { value: !0 });
pc.default =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiMwMDUyRkYiLz48cGF0aCBkPSJNMjMuODUyIDE0QTkuODM0IDkuODM0IDAgMCAxIDE0IDIzLjg1MiA5LjgzNCA5LjgzNCAwIDAgMSA0LjE0OCAxNCA5LjgzNCA5LjgzNCAwIDAgMSAxNCA0LjE0OCA5LjgzNCA5LjgzNCAwIDAgMSAyMy44NTIgMTRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExLjE4NSAxMi41MDRjMC0uNDU2IDAtLjcxLjA5OC0uODYyLjA5OC0uMTUyLjE5Ni0uMzA0LjM0My0uMzU1LjE5Ni0uMTAyLjM5Mi0uMTAyLjg4MS0uMTAyaDIuOTg2Yy40OSAwIC42ODYgMCAuODgyLjEwMi4xNDYuMTAxLjI5My4yMDMuMzQyLjM1NS4wOTguMjAzLjA5OC40MDYuMDk4Ljg2MnYyLjk5MmMwIC40NTcgMCAuNzEtLjA5OC44NjMtLjA5OC4xNTItLjE5NS4zMDQtLjM0Mi4zNTUtLjE5Ni4xMDEtLjM5Mi4xMDEtLjg4Mi4xMDFoLTIuOTg2Yy0uNDkgMC0uNjg1IDAtLjg4LS4xMDEtLjE0OC0uMTAyLS4yOTUtLjIwMy0uMzQ0LS4zNTUtLjA5OC0uMjAzLS4wOTgtLjQwNi0uMDk4LS44NjN2LTIuOTkyWiIgZmlsbD0iIzAwNTJGRiIvPjwvc3ZnPg==';
var is = {};
Object.defineProperty(is, '__esModule', { value: !0 });
is.QRCodeIcon = void 0;
const ut = We;
function Qw(t) {
  return (0, ut.h)(
    'svg',
    Object.assign(
      {
        width: '10',
        height: '10',
        viewBox: '0 0 10 10',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      t
    ),
    (0, ut.h)('path', {
      d: 'M8.2271 1.77124L7.0271 1.77124V2.97124H8.2271V1.77124Z',
    }),
    (0, ut.h)('path', {
      d: 'M5.44922 0.199219L5.44922 4.54922L9.79922 4.54922V0.199219L5.44922 0.199219ZM8.89922 3.64922L6.34922 3.64922L6.34922 1.09922L8.89922 1.09922V3.64922Z',
    }),
    (0, ut.h)('path', {
      d: 'M2.97124 1.77124L1.77124 1.77124L1.77124 2.97124H2.97124V1.77124Z',
    }),
    (0, ut.h)('path', {
      d: 'M0.199219 4.54922L4.54922 4.54922L4.54922 0.199219L0.199219 0.199219L0.199219 4.54922ZM1.09922 1.09922L3.64922 1.09922L3.64922 3.64922L1.09922 3.64922L1.09922 1.09922Z',
    }),
    (0, ut.h)('path', {
      d: 'M2.97124 7.0271H1.77124L1.77124 8.2271H2.97124V7.0271Z',
    }),
    (0, ut.h)('path', {
      d: 'M0.199219 9.79922H4.54922L4.54922 5.44922L0.199219 5.44922L0.199219 9.79922ZM1.09922 6.34922L3.64922 6.34922L3.64922 8.89922H1.09922L1.09922 6.34922Z',
    }),
    (0, ut.h)('path', {
      d: 'M8.89922 7.39912H7.99922V5.40112H5.44922L5.44922 9.79912H6.34922L6.34922 6.30112H7.09922V8.29912H9.79922V5.40112H8.89922V7.39912Z',
    }),
    (0, ut.h)('path', {
      d: 'M7.99912 8.89917H7.09912V9.79917H7.99912V8.89917Z',
    }),
    (0, ut.h)('path', {
      d: 'M9.79917 8.89917H8.89917V9.79917H9.79917V8.89917Z',
    })
  );
}
is.QRCodeIcon = Qw;
var bc = {};
Object.defineProperty(bc, '__esModule', { value: !0 });
const Zw = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill="white"/>
        <path d="M50.512 94C74.2907 94 93.5673 74.5244 93.5673 50.5C93.5673 26.4756 74.2907 7 50.512 7C26.7332 7 7.45667 26.4756 7.45667 50.5C7.45667 74.5244 26.7332 94 50.512 94Z" fill="#0052FF"/>
        <path d="M50.6248 65.4335C42.3697 65.4335 35.8996 58.7469 35.8996 50.5C35.8996 42.2531 42.5928 35.5664 50.6248 35.5664C57.9873 35.5664 64.0111 40.9157 65.1267 48.0481H80.0749C78.7363 32.6688 66.0191 20.6328 50.6248 20.6328C34.3379 20.6328 20.9514 34.0062 20.9514 50.5C20.9514 66.9936 34.1148 80.3671 50.6248 80.3671C66.2422 80.3671 78.7363 68.331 80.0749 52.9516H65.1267C64.0111 60.0841 57.9873 65.4335 50.6248 65.4335Z" fill="white"/>
    </svg>
`;
bc.default = Zw;
var gc = {};
Object.defineProperty(gc, '__esModule', { value: !0 });
gc.default = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="white"/>
        <circle cx="49.9996" cy="49.9996" r="43.6363" fill="#1B53E4"/>
        <circle cx="49.9996" cy="49.9996" r="43.6363" stroke="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3379 49.9484C19.3379 66.8508 33.04 80.553 49.9425 80.553C66.8449 80.553 80.5471 66.8508 80.5471 49.9484C80.5471 33.0459 66.8449 19.3438 49.9425 19.3438C33.04 19.3438 19.3379 33.0459 19.3379 49.9484ZM44.0817 40.0799C41.8725 40.0799 40.0817 41.8708 40.0817 44.0799V55.8029C40.0817 58.012 41.8725 59.8029 44.0817 59.8029H55.8046C58.0138 59.8029 59.8046 58.012 59.8046 55.8029V44.0799C59.8046 41.8708 58.0138 40.0799 55.8046 40.0799H44.0817Z" fill="white"/>
    </svg>
`;
var ss = {};
Object.defineProperty(ss, '__esModule', { value: !0 });
ss.StatusDotIcon = void 0;
const ol = We;
function Yw(t) {
  return (0, ol.h)(
    'svg',
    Object.assign(
      {
        width: '10',
        height: '10',
        viewBox: '0 0 10 10',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      t
    ),
    (0, ol.h)('path', {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: 'M2.29995 4.99995C2.29995 5.57985 1.82985 6.04995 1.24995 6.04995C0.670052 6.04995 0.199951 5.57985 0.199951 4.99995C0.199951 4.42005 0.670052 3.94995 1.24995 3.94995C1.82985 3.94995 2.29995 4.42005 2.29995 4.99995ZM4.99995 6.04995C5.57985 6.04995 6.04995 5.57985 6.04995 4.99995C6.04995 4.42005 5.57985 3.94995 4.99995 3.94995C4.42005 3.94995 3.94995 4.42005 3.94995 4.99995C3.94995 5.57985 4.42005 6.04995 4.99995 6.04995ZM8.74995 6.04995C9.32985 6.04995 9.79995 5.57985 9.79995 4.99995C9.79995 4.42005 9.32985 3.94995 8.74995 3.94995C8.17005 3.94995 7.69995 4.42005 7.69995 4.99995C7.69995 5.57985 8.17005 6.04995 8.74995 6.04995Z',
    })
  );
}
ss.StatusDotIcon = Yw;
var os = {};
function Bh(t) {
  (this.mode = je.MODE_8BIT_BYTE), (this.data = t), (this.parsedData = []);
  for (var e = 0, r = this.data.length; e < r; e++) {
    var n = [],
      i = this.data.charCodeAt(e);
    i > 65536
      ? ((n[0] = 240 | ((i & 1835008) >>> 18)),
        (n[1] = 128 | ((i & 258048) >>> 12)),
        (n[2] = 128 | ((i & 4032) >>> 6)),
        (n[3] = 128 | (i & 63)))
      : i > 2048
        ? ((n[0] = 224 | ((i & 61440) >>> 12)),
          (n[1] = 128 | ((i & 4032) >>> 6)),
          (n[2] = 128 | (i & 63)))
        : i > 128
          ? ((n[0] = 192 | ((i & 1984) >>> 6)), (n[1] = 128 | (i & 63)))
          : (n[0] = i),
      this.parsedData.push(n);
  }
  (this.parsedData = Array.prototype.concat.apply([], this.parsedData)),
    this.parsedData.length != this.data.length &&
      (this.parsedData.unshift(191),
      this.parsedData.unshift(187),
      this.parsedData.unshift(239));
}
Bh.prototype = {
  getLength: function (t) {
    return this.parsedData.length;
  },
  write: function (t) {
    for (var e = 0, r = this.parsedData.length; e < r; e++)
      t.put(this.parsedData[e], 8);
  },
};
function yt(t, e) {
  (this.typeNumber = t),
    (this.errorCorrectLevel = e),
    (this.modules = null),
    (this.moduleCount = 0),
    (this.dataCache = null),
    (this.dataList = []);
}
yt.prototype = {
  addData: function (t) {
    var e = new Bh(t);
    this.dataList.push(e), (this.dataCache = null);
  },
  isDark: function (t, e) {
    if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e)
      throw new Error(t + ',' + e);
    return this.modules[t][e];
  },
  getModuleCount: function () {
    return this.moduleCount;
  },
  make: function () {
    this.makeImpl(!1, this.getBestMaskPattern());
  },
  makeImpl: function (t, e) {
    (this.moduleCount = this.typeNumber * 4 + 17),
      (this.modules = new Array(this.moduleCount));
    for (var r = 0; r < this.moduleCount; r++) {
      this.modules[r] = new Array(this.moduleCount);
      for (var n = 0; n < this.moduleCount; n++) this.modules[r][n] = null;
    }
    this.setupPositionProbePattern(0, 0),
      this.setupPositionProbePattern(this.moduleCount - 7, 0),
      this.setupPositionProbePattern(0, this.moduleCount - 7),
      this.setupPositionAdjustPattern(),
      this.setupTimingPattern(),
      this.setupTypeInfo(t, e),
      this.typeNumber >= 7 && this.setupTypeNumber(t),
      this.dataCache == null &&
        (this.dataCache = yt.createData(
          this.typeNumber,
          this.errorCorrectLevel,
          this.dataList
        )),
      this.mapData(this.dataCache, e);
  },
  setupPositionProbePattern: function (t, e) {
    for (var r = -1; r <= 7; r++)
      if (!(t + r <= -1 || this.moduleCount <= t + r))
        for (var n = -1; n <= 7; n++)
          e + n <= -1 ||
            this.moduleCount <= e + n ||
            ((0 <= r && r <= 6 && (n == 0 || n == 6)) ||
            (0 <= n && n <= 6 && (r == 0 || r == 6)) ||
            (2 <= r && r <= 4 && 2 <= n && n <= 4)
              ? (this.modules[t + r][e + n] = !0)
              : (this.modules[t + r][e + n] = !1));
  },
  getBestMaskPattern: function () {
    for (var t = 0, e = 0, r = 0; r < 8; r++) {
      this.makeImpl(!0, r);
      var n = oe.getLostPoint(this);
      (r == 0 || t > n) && ((t = n), (e = r));
    }
    return e;
  },
  createMovieClip: function (t, e, r) {
    var n = t.createEmptyMovieClip(e, r),
      i = 1;
    this.make();
    for (var s = 0; s < this.modules.length; s++)
      for (var o = s * i, a = 0; a < this.modules[s].length; a++) {
        var c = a * i,
          u = this.modules[s][a];
        u &&
          (n.beginFill(0, 100),
          n.moveTo(c, o),
          n.lineTo(c + i, o),
          n.lineTo(c + i, o + i),
          n.lineTo(c, o + i),
          n.endFill());
      }
    return n;
  },
  setupTimingPattern: function () {
    for (var t = 8; t < this.moduleCount - 8; t++)
      this.modules[t][6] == null && (this.modules[t][6] = t % 2 == 0);
    for (var e = 8; e < this.moduleCount - 8; e++)
      this.modules[6][e] == null && (this.modules[6][e] = e % 2 == 0);
  },
  setupPositionAdjustPattern: function () {
    for (
      var t = oe.getPatternPosition(this.typeNumber), e = 0;
      e < t.length;
      e++
    )
      for (var r = 0; r < t.length; r++) {
        var n = t[e],
          i = t[r];
        if (this.modules[n][i] == null)
          for (var s = -2; s <= 2; s++)
            for (var o = -2; o <= 2; o++)
              s == -2 || s == 2 || o == -2 || o == 2 || (s == 0 && o == 0)
                ? (this.modules[n + s][i + o] = !0)
                : (this.modules[n + s][i + o] = !1);
      }
  },
  setupTypeNumber: function (t) {
    for (var e = oe.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
      var n = !t && ((e >> r) & 1) == 1;
      this.modules[Math.floor(r / 3)][(r % 3) + this.moduleCount - 8 - 3] = n;
    }
    for (var r = 0; r < 18; r++) {
      var n = !t && ((e >> r) & 1) == 1;
      this.modules[(r % 3) + this.moduleCount - 8 - 3][Math.floor(r / 3)] = n;
    }
  },
  setupTypeInfo: function (t, e) {
    for (
      var r = (this.errorCorrectLevel << 3) | e,
        n = oe.getBCHTypeInfo(r),
        i = 0;
      i < 15;
      i++
    ) {
      var s = !t && ((n >> i) & 1) == 1;
      i < 6
        ? (this.modules[i][8] = s)
        : i < 8
          ? (this.modules[i + 1][8] = s)
          : (this.modules[this.moduleCount - 15 + i][8] = s);
    }
    for (var i = 0; i < 15; i++) {
      var s = !t && ((n >> i) & 1) == 1;
      i < 8
        ? (this.modules[8][this.moduleCount - i - 1] = s)
        : i < 9
          ? (this.modules[8][15 - i - 1 + 1] = s)
          : (this.modules[8][15 - i - 1] = s);
    }
    this.modules[this.moduleCount - 8][8] = !t;
  },
  mapData: function (t, e) {
    for (
      var r = -1,
        n = this.moduleCount - 1,
        i = 7,
        s = 0,
        o = this.moduleCount - 1;
      o > 0;
      o -= 2
    )
      for (o == 6 && o--; ; ) {
        for (var a = 0; a < 2; a++)
          if (this.modules[n][o - a] == null) {
            var c = !1;
            s < t.length && (c = ((t[s] >>> i) & 1) == 1);
            var u = oe.getMask(e, n, o - a);
            u && (c = !c),
              (this.modules[n][o - a] = c),
              i--,
              i == -1 && (s++, (i = 7));
          }
        if (((n += r), n < 0 || this.moduleCount <= n)) {
          (n -= r), (r = -r);
          break;
        }
      }
  },
};
yt.PAD0 = 236;
yt.PAD1 = 17;
yt.createData = function (t, e, r) {
  for (var n = dt.getRSBlocks(t, e), i = new jh(), s = 0; s < r.length; s++) {
    var o = r[s];
    i.put(o.mode, 4),
      i.put(o.getLength(), oe.getLengthInBits(o.mode, t)),
      o.write(i);
  }
  for (var a = 0, s = 0; s < n.length; s++) a += n[s].dataCount;
  if (i.getLengthInBits() > a * 8)
    throw new Error(
      'code length overflow. (' + i.getLengthInBits() + '>' + a * 8 + ')'
    );
  for (
    i.getLengthInBits() + 4 <= a * 8 && i.put(0, 4);
    i.getLengthInBits() % 8 != 0;

  )
    i.putBit(!1);
  for (
    ;
    !(
      i.getLengthInBits() >= a * 8 ||
      (i.put(yt.PAD0, 8), i.getLengthInBits() >= a * 8)
    );

  )
    i.put(yt.PAD1, 8);
  return yt.createBytes(i, n);
};
yt.createBytes = function (t, e) {
  for (
    var r = 0,
      n = 0,
      i = 0,
      s = new Array(e.length),
      o = new Array(e.length),
      a = 0;
    a < e.length;
    a++
  ) {
    var c = e[a].dataCount,
      u = e[a].totalCount - c;
    (n = Math.max(n, c)), (i = Math.max(i, u)), (s[a] = new Array(c));
    for (var l = 0; l < s[a].length; l++) s[a][l] = 255 & t.buffer[l + r];
    r += c;
    var f = oe.getErrorCorrectPolynomial(u),
      h = new Nr(s[a], f.getLength() - 1),
      y = h.mod(f);
    o[a] = new Array(f.getLength() - 1);
    for (var l = 0; l < o[a].length; l++) {
      var _ = l + y.getLength() - o[a].length;
      o[a][l] = _ >= 0 ? y.get(_) : 0;
    }
  }
  for (var x = 0, l = 0; l < e.length; l++) x += e[l].totalCount;
  for (var E = new Array(x), b = 0, l = 0; l < n; l++)
    for (var a = 0; a < e.length; a++) l < s[a].length && (E[b++] = s[a][l]);
  for (var l = 0; l < i; l++)
    for (var a = 0; a < e.length; a++) l < o[a].length && (E[b++] = o[a][l]);
  return E;
};
var je = {
    MODE_NUMBER: 1,
    MODE_ALPHA_NUM: 2,
    MODE_8BIT_BYTE: 4,
    MODE_KANJI: 8,
  },
  Ft = { L: 1, M: 0, Q: 3, H: 2 },
  Ot = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  },
  oe = {
    PATTERN_POSITION_TABLE: [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170],
    ],
    G15: 1335,
    G18: 7973,
    G15_MASK: 21522,
    getBCHTypeInfo: function (t) {
      for (var e = t << 10; oe.getBCHDigit(e) - oe.getBCHDigit(oe.G15) >= 0; )
        e ^= oe.G15 << (oe.getBCHDigit(e) - oe.getBCHDigit(oe.G15));
      return ((t << 10) | e) ^ oe.G15_MASK;
    },
    getBCHTypeNumber: function (t) {
      for (var e = t << 12; oe.getBCHDigit(e) - oe.getBCHDigit(oe.G18) >= 0; )
        e ^= oe.G18 << (oe.getBCHDigit(e) - oe.getBCHDigit(oe.G18));
      return (t << 12) | e;
    },
    getBCHDigit: function (t) {
      for (var e = 0; t != 0; ) e++, (t >>>= 1);
      return e;
    },
    getPatternPosition: function (t) {
      return oe.PATTERN_POSITION_TABLE[t - 1];
    },
    getMask: function (t, e, r) {
      switch (t) {
        case Ot.PATTERN000:
          return (e + r) % 2 == 0;
        case Ot.PATTERN001:
          return e % 2 == 0;
        case Ot.PATTERN010:
          return r % 3 == 0;
        case Ot.PATTERN011:
          return (e + r) % 3 == 0;
        case Ot.PATTERN100:
          return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
        case Ot.PATTERN101:
          return ((e * r) % 2) + ((e * r) % 3) == 0;
        case Ot.PATTERN110:
          return (((e * r) % 2) + ((e * r) % 3)) % 2 == 0;
        case Ot.PATTERN111:
          return (((e * r) % 3) + ((e + r) % 2)) % 2 == 0;
        default:
          throw new Error('bad maskPattern:' + t);
      }
    },
    getErrorCorrectPolynomial: function (t) {
      for (var e = new Nr([1], 0), r = 0; r < t; r++)
        e = e.multiply(new Nr([1, we.gexp(r)], 0));
      return e;
    },
    getLengthInBits: function (t, e) {
      if (1 <= e && e < 10)
        switch (t) {
          case je.MODE_NUMBER:
            return 10;
          case je.MODE_ALPHA_NUM:
            return 9;
          case je.MODE_8BIT_BYTE:
            return 8;
          case je.MODE_KANJI:
            return 8;
          default:
            throw new Error('mode:' + t);
        }
      else if (e < 27)
        switch (t) {
          case je.MODE_NUMBER:
            return 12;
          case je.MODE_ALPHA_NUM:
            return 11;
          case je.MODE_8BIT_BYTE:
            return 16;
          case je.MODE_KANJI:
            return 10;
          default:
            throw new Error('mode:' + t);
        }
      else if (e < 41)
        switch (t) {
          case je.MODE_NUMBER:
            return 14;
          case je.MODE_ALPHA_NUM:
            return 13;
          case je.MODE_8BIT_BYTE:
            return 16;
          case je.MODE_KANJI:
            return 12;
          default:
            throw new Error('mode:' + t);
        }
      else throw new Error('type:' + e);
    },
    getLostPoint: function (t) {
      for (var e = t.getModuleCount(), r = 0, n = 0; n < e; n++)
        for (var i = 0; i < e; i++) {
          for (var s = 0, o = t.isDark(n, i), a = -1; a <= 1; a++)
            if (!(n + a < 0 || e <= n + a))
              for (var c = -1; c <= 1; c++)
                i + c < 0 ||
                  e <= i + c ||
                  (a == 0 && c == 0) ||
                  (o == t.isDark(n + a, i + c) && s++);
          s > 5 && (r += 3 + s - 5);
        }
      for (var n = 0; n < e - 1; n++)
        for (var i = 0; i < e - 1; i++) {
          var u = 0;
          t.isDark(n, i) && u++,
            t.isDark(n + 1, i) && u++,
            t.isDark(n, i + 1) && u++,
            t.isDark(n + 1, i + 1) && u++,
            (u == 0 || u == 4) && (r += 3);
        }
      for (var n = 0; n < e; n++)
        for (var i = 0; i < e - 6; i++)
          t.isDark(n, i) &&
            !t.isDark(n, i + 1) &&
            t.isDark(n, i + 2) &&
            t.isDark(n, i + 3) &&
            t.isDark(n, i + 4) &&
            !t.isDark(n, i + 5) &&
            t.isDark(n, i + 6) &&
            (r += 40);
      for (var i = 0; i < e; i++)
        for (var n = 0; n < e - 6; n++)
          t.isDark(n, i) &&
            !t.isDark(n + 1, i) &&
            t.isDark(n + 2, i) &&
            t.isDark(n + 3, i) &&
            t.isDark(n + 4, i) &&
            !t.isDark(n + 5, i) &&
            t.isDark(n + 6, i) &&
            (r += 40);
      for (var l = 0, i = 0; i < e; i++)
        for (var n = 0; n < e; n++) t.isDark(n, i) && l++;
      var f = Math.abs((100 * l) / e / e - 50) / 5;
      return (r += f * 10), r;
    },
  },
  we = {
    glog: function (t) {
      if (t < 1) throw new Error('glog(' + t + ')');
      return we.LOG_TABLE[t];
    },
    gexp: function (t) {
      for (; t < 0; ) t += 255;
      for (; t >= 256; ) t -= 255;
      return we.EXP_TABLE[t];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256),
  };
for (var Ee = 0; Ee < 8; Ee++) we.EXP_TABLE[Ee] = 1 << Ee;
for (var Ee = 8; Ee < 256; Ee++)
  we.EXP_TABLE[Ee] =
    we.EXP_TABLE[Ee - 4] ^
    we.EXP_TABLE[Ee - 5] ^
    we.EXP_TABLE[Ee - 6] ^
    we.EXP_TABLE[Ee - 8];
for (var Ee = 0; Ee < 255; Ee++) we.LOG_TABLE[we.EXP_TABLE[Ee]] = Ee;
function Nr(t, e) {
  if (t.length == null) throw new Error(t.length + '/' + e);
  for (var r = 0; r < t.length && t[r] == 0; ) r++;
  this.num = new Array(t.length - r + e);
  for (var n = 0; n < t.length - r; n++) this.num[n] = t[n + r];
}
Nr.prototype = {
  get: function (t) {
    return this.num[t];
  },
  getLength: function () {
    return this.num.length;
  },
  multiply: function (t) {
    for (
      var e = new Array(this.getLength() + t.getLength() - 1), r = 0;
      r < this.getLength();
      r++
    )
      for (var n = 0; n < t.getLength(); n++)
        e[r + n] ^= we.gexp(we.glog(this.get(r)) + we.glog(t.get(n)));
    return new Nr(e, 0);
  },
  mod: function (t) {
    if (this.getLength() - t.getLength() < 0) return this;
    for (
      var e = we.glog(this.get(0)) - we.glog(t.get(0)),
        r = new Array(this.getLength()),
        n = 0;
      n < this.getLength();
      n++
    )
      r[n] = this.get(n);
    for (var n = 0; n < t.getLength(); n++)
      r[n] ^= we.gexp(we.glog(t.get(n)) + e);
    return new Nr(r, 0).mod(t);
  },
};
function dt(t, e) {
  (this.totalCount = t), (this.dataCount = e);
}
dt.RS_BLOCK_TABLE = [
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16],
];
dt.getRSBlocks = function (t, e) {
  var r = dt.getRsBlockTable(t, e);
  if (r == null)
    throw new Error(
      'bad rs block @ typeNumber:' + t + '/errorCorrectLevel:' + e
    );
  for (var n = r.length / 3, i = [], s = 0; s < n; s++)
    for (
      var o = r[s * 3 + 0], a = r[s * 3 + 1], c = r[s * 3 + 2], u = 0;
      u < o;
      u++
    )
      i.push(new dt(a, c));
  return i;
};
dt.getRsBlockTable = function (t, e) {
  switch (e) {
    case Ft.L:
      return dt.RS_BLOCK_TABLE[(t - 1) * 4 + 0];
    case Ft.M:
      return dt.RS_BLOCK_TABLE[(t - 1) * 4 + 1];
    case Ft.Q:
      return dt.RS_BLOCK_TABLE[(t - 1) * 4 + 2];
    case Ft.H:
      return dt.RS_BLOCK_TABLE[(t - 1) * 4 + 3];
    default:
      return;
  }
};
function jh() {
  (this.buffer = []), (this.length = 0);
}
jh.prototype = {
  get: function (t) {
    var e = Math.floor(t / 8);
    return ((this.buffer[e] >>> (7 - (t % 8))) & 1) == 1;
  },
  put: function (t, e) {
    for (var r = 0; r < e; r++) this.putBit(((t >>> (e - r - 1)) & 1) == 1);
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (t) {
    var e = Math.floor(this.length / 8);
    this.buffer.length <= e && this.buffer.push(0),
      t && (this.buffer[e] |= 128 >>> this.length % 8),
      this.length++;
  },
};
var Jo = [
  [17, 14, 11, 7],
  [32, 26, 20, 14],
  [53, 42, 32, 24],
  [78, 62, 46, 34],
  [106, 84, 60, 44],
  [134, 106, 74, 58],
  [154, 122, 86, 64],
  [192, 152, 108, 84],
  [230, 180, 130, 98],
  [271, 213, 151, 119],
  [321, 251, 177, 137],
  [367, 287, 203, 155],
  [425, 331, 241, 177],
  [458, 362, 258, 194],
  [520, 412, 292, 220],
  [586, 450, 322, 250],
  [644, 504, 364, 280],
  [718, 560, 394, 310],
  [792, 624, 442, 338],
  [858, 666, 482, 382],
  [929, 711, 509, 403],
  [1003, 779, 565, 439],
  [1091, 857, 611, 461],
  [1171, 911, 661, 511],
  [1273, 997, 715, 535],
  [1367, 1059, 751, 593],
  [1465, 1125, 805, 625],
  [1528, 1190, 868, 658],
  [1628, 1264, 908, 698],
  [1732, 1370, 982, 742],
  [1840, 1452, 1030, 790],
  [1952, 1538, 1112, 842],
  [2068, 1628, 1168, 898],
  [2188, 1722, 1228, 958],
  [2303, 1809, 1283, 983],
  [2431, 1911, 1351, 1051],
  [2563, 1989, 1423, 1093],
  [2699, 2099, 1499, 1139],
  [2809, 2213, 1579, 1219],
  [2953, 2331, 1663, 1273],
];
function Fh(t) {
  if (
    ((this.options = {
      padding: 4,
      width: 256,
      height: 256,
      typeNumber: 4,
      color: '#000000',
      background: '#ffffff',
      ecl: 'M',
      image: { svg: '', width: 0, height: 0 },
    }),
    typeof t == 'string' && (t = { content: t }),
    t)
  )
    for (var e in t) this.options[e] = t[e];
  if (typeof this.options.content != 'string')
    throw new Error("Expected 'content' as string!");
  if (this.options.content.length === 0)
    throw new Error("Expected 'content' to be non-empty!");
  if (!(this.options.padding >= 0))
    throw new Error("Expected 'padding' value to be non-negative!");
  if (!(this.options.width > 0) || !(this.options.height > 0))
    throw new Error(
      "Expected 'width' or 'height' value to be higher than zero!"
    );
  function r(c) {
    switch (c) {
      case 'L':
        return Ft.L;
      case 'M':
        return Ft.M;
      case 'Q':
        return Ft.Q;
      case 'H':
        return Ft.H;
      default:
        throw new Error('Unknwon error correction level: ' + c);
    }
  }
  function n(c, u) {
    for (var l = i(c), f = 1, h = 0, y = 0, _ = Jo.length; y <= _; y++) {
      var x = Jo[y];
      if (!x)
        throw new Error('Content too long: expected ' + h + ' but got ' + l);
      switch (u) {
        case 'L':
          h = x[0];
          break;
        case 'M':
          h = x[1];
          break;
        case 'Q':
          h = x[2];
          break;
        case 'H':
          h = x[3];
          break;
        default:
          throw new Error('Unknwon error correction level: ' + u);
      }
      if (l <= h) break;
      f++;
    }
    if (f > Jo.length) throw new Error('Content too long');
    return f;
  }
  function i(c) {
    var u = encodeURI(c)
      .toString()
      .replace(/\%[0-9a-fA-F]{2}/g, 'a');
    return u.length + (u.length != c ? 3 : 0);
  }
  var s = this.options.content,
    o = n(s, this.options.ecl),
    a = r(this.options.ecl);
  (this.qrcode = new yt(o, a)), this.qrcode.addData(s), this.qrcode.make();
}
Fh.prototype.svg = function (t) {
  var e = this.options || {},
    r = this.qrcode.modules;
  typeof t > 'u' && (t = { container: e.container || 'svg' });
  for (
    var n = typeof e.pretty < 'u' ? !!e.pretty : !0,
      i = n ? '  ' : '',
      s = n
        ? `\r
`
        : '',
      o = e.width,
      a = e.height,
      c = r.length,
      u = o / (c + 2 * e.padding),
      l = a / (c + 2 * e.padding),
      f = typeof e.join < 'u' ? !!e.join : !1,
      h = typeof e.swap < 'u' ? !!e.swap : !1,
      y = typeof e.xmlDeclaration < 'u' ? !!e.xmlDeclaration : !0,
      _ = typeof e.predefined < 'u' ? !!e.predefined : !1,
      x = _
        ? i +
          '<defs><path id="qrmodule" d="M0 0 h' +
          l +
          ' v' +
          u +
          ' H0 z" style="fill:' +
          e.color +
          ';shape-rendering:crispEdges;" /></defs>' +
          s
        : '',
      E =
        i +
        '<rect x="0" y="0" width="' +
        o +
        '" height="' +
        a +
        '" style="fill:' +
        e.background +
        ';shape-rendering:crispEdges;"/>' +
        s,
      b = '',
      g = '',
      w = 0;
    w < c;
    w++
  )
    for (var C = 0; C < c; C++) {
      var S = r[C][w];
      if (S) {
        var M = C * u + e.padding * u,
          P = w * l + e.padding * l;
        if (h) {
          var N = M;
          (M = P), (P = N);
        }
        if (f) {
          var A = u + M,
            F = l + P;
          (M = Number.isInteger(M) ? Number(M) : M.toFixed(2)),
            (P = Number.isInteger(P) ? Number(P) : P.toFixed(2)),
            (A = Number.isInteger(A) ? Number(A) : A.toFixed(2)),
            (F = Number.isInteger(F) ? Number(F) : F.toFixed(2)),
            (g +=
              'M' +
              M +
              ',' +
              P +
              ' V' +
              F +
              ' H' +
              A +
              ' V' +
              P +
              ' H' +
              M +
              ' Z ');
        } else
          _
            ? (b +=
                i +
                '<use x="' +
                M.toString() +
                '" y="' +
                P.toString() +
                '" href="#qrmodule" />' +
                s)
            : (b +=
                i +
                '<rect x="' +
                M.toString() +
                '" y="' +
                P.toString() +
                '" width="' +
                u +
                '" height="' +
                l +
                '" style="fill:' +
                e.color +
                ';shape-rendering:crispEdges;"/>' +
                s);
      }
    }
  f &&
    (b =
      i +
      '<path x="0" y="0" style="fill:' +
      e.color +
      ';shape-rendering:crispEdges;" d="' +
      g +
      '" />');
  let K = '';
  if (this.options.image !== void 0 && this.options.image.svg) {
    const J = (o * this.options.image.width) / 100,
      te = (a * this.options.image.height) / 100,
      se = o / 2 - J / 2,
      pe = a / 2 - te / 2;
    (K += `<svg x="${se}" y="${pe}" width="${J}" height="${te}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">`),
      (K += this.options.image.svg + s),
      (K += '</svg>');
  }
  var W = '';
  switch (t.container) {
    case 'svg':
      y && (W += '<?xml version="1.0" standalone="yes"?>' + s),
        (W +=
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' +
          o +
          '" height="' +
          a +
          '">' +
          s),
        (W += x + E + b),
        (W += K),
        (W += '</svg>');
      break;
    case 'svg-viewbox':
      y && (W += '<?xml version="1.0" standalone="yes"?>' + s),
        (W +=
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' +
          o +
          ' ' +
          a +
          '">' +
          s),
        (W += x + E + b),
        (W += K),
        (W += '</svg>');
      break;
    case 'g':
      (W += '<g width="' + o + '" height="' + a + '">' + s),
        (W += x + E + b),
        (W += K),
        (W += '</g>');
      break;
    default:
      W += (x + E + b + K).replace(/^\s+/, '');
      break;
  }
  return W;
};
var Kw = Fh,
  Xw =
    (O && O.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(os, '__esModule', { value: !0 });
os.QRCode = void 0;
const e_ = We,
  al = Gn,
  t_ = Xw(Kw),
  r_ = (t) => {
    const [e, r] = (0, al.useState)('');
    return (
      (0, al.useEffect)(() => {
        var n, i;
        const s = new t_.default({
            content: t.content,
            background: t.bgColor || '#ffffff',
            color: t.fgColor || '#000000',
            container: 'svg',
            ecl: 'M',
            width: (n = t.width) !== null && n !== void 0 ? n : 256,
            height: (i = t.height) !== null && i !== void 0 ? i : 256,
            padding: 0,
            image: t.image,
          }),
          o = Buffer.from(s.svg(), 'utf8').toString('base64');
        r(`data:image/svg+xml;base64,${o}`);
      }),
      e ? (0, e_.h)('img', { src: e, alt: 'QR Code' }) : null
    );
  };
os.QRCode = r_;
var as = {},
  yc = {};
Object.defineProperty(yc, '__esModule', { value: !0 });
yc.default =
  '.-cbwsdk-css-reset .-cbwsdk-spinner{display:inline-block}.-cbwsdk-css-reset .-cbwsdk-spinner svg{display:inline-block;animation:2s linear infinite -cbwsdk-spinner-svg}.-cbwsdk-css-reset .-cbwsdk-spinner svg circle{animation:1.9s ease-in-out infinite both -cbwsdk-spinner-circle;display:block;fill:rgba(0,0,0,0);stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -cbwsdk-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -cbwsdk-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}';
var n_ =
  (O && O.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(as, '__esModule', { value: !0 });
as.Spinner = void 0;
const si = We,
  i_ = n_(yc),
  s_ = (t) => {
    var e;
    const r = (e = t.size) !== null && e !== void 0 ? e : 64,
      n = t.color || '#000';
    return (0, si.h)(
      'div',
      { class: '-cbwsdk-spinner' },
      (0, si.h)('style', null, i_.default),
      (0, si.h)(
        'svg',
        {
          viewBox: '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg',
          style: { width: r, height: r },
        },
        (0, si.h)('circle', { style: { cx: 50, cy: 50, r: 45, stroke: n } })
      )
    );
  };
as.Spinner = s_;
var vc = {};
Object.defineProperty(vc, '__esModule', { value: !0 });
vc.default =
  '.-cbwsdk-css-reset .-cbwsdk-connect-content{height:430px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-connect-content.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-header{display:flex;align-items:center;justify-content:space-between;margin:0 0 30px}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading{font-style:normal;font-weight:500;font-size:28px;line-height:36px;margin:0}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-layout{display:flex;flex-direction:row}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-left{margin-right:30px;display:flex;flex-direction:column;justify-content:space-between}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-right{flex:25%;margin-right:34px}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-wrapper{width:220px;height:220px;border-radius:12px;display:flex;justify-content:center;align-items:center;background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light{background-color:rgba(255,255,255,.95)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light>p{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark{background-color:rgba(10,11,13,.9)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark>p{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting>p{font-size:12px;font-weight:bold;margin-top:16px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app{border-radius:8px;font-size:14px;line-height:20px;padding:12px;width:339px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.light{background:#eef0f3;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.dark{background:#1e2025;color:#8a919e}.-cbwsdk-css-reset .-cbwsdk-cancel-button{-webkit-appearance:none;border:none;background:none;cursor:pointer;padding:0;margin:0}.-cbwsdk-css-reset .-cbwsdk-cancel-button-x{position:relative;display:block;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-wallet-steps{padding:0 0 0 16px;margin:0;width:100%;list-style:decimal}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item{list-style-type:decimal;display:list-item;font-style:normal;font-weight:400;font-size:16px;line-height:24px;margin-top:20px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item-wrapper{display:flex;align-items:center}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-pad-left{margin-left:6px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon{display:flex;border-radius:50%;height:24px;width:24px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.light{background:#0052ff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.dark{background:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item{align-items:center;display:flex;flex-direction:row;padding:16px 24px;gap:12px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-connect-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-item.light.selected{background:#f5f8ff;color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark.selected{background:#001033;color:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item.selected{border-radius:100px;font-weight:600}.-cbwsdk-css-reset .-cbwsdk-connect-item-copy-wrapper{margin:0 4px 0 8px}.-cbwsdk-css-reset .-cbwsdk-connect-item-title{margin:0 0 0;font-size:16px;line-height:24px;font-weight:500}.-cbwsdk-css-reset .-cbwsdk-connect-item-description{font-weight:400;font-size:14px;line-height:20px;margin:0}';
var on =
  (O && O.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(gt, '__esModule', { value: !0 });
gt.CoinbaseAppSteps =
  gt.CoinbaseWalletSteps =
  gt.ConnectItem =
  gt.ConnectContent =
    void 0;
const Je = on(rs),
  j = We,
  cl = Gn,
  o_ = L,
  a_ = Qr,
  c_ = ns,
  u_ = on(dc),
  l_ = on(pc),
  $h = is,
  f_ = on(bc),
  h_ = on(gc),
  d_ = ss,
  p_ = os,
  b_ = as,
  g_ = on(vc),
  ul = {
    'coinbase-wallet-app': {
      title: 'Coinbase Wallet app',
      description: 'Connect with your self-custody wallet',
      icon: l_.default,
      steps: Hh,
    },
    'coinbase-app': {
      title: 'Coinbase app',
      description: 'Connect with your Coinbase account',
      icon: u_.default,
      steps: Vh,
    },
  },
  y_ = (t) => {
    switch (t) {
      case 'coinbase-app':
        return f_.default;
      case 'coinbase-wallet-app':
      default:
        return h_.default;
    }
  },
  Sa = (t) => (t === 'light' ? '#FFFFFF' : '#0A0B0D');
function v_(t) {
  const { theme: e } = t,
    [r, n] = (0, cl.useState)('coinbase-wallet-app'),
    i = (0, cl.useCallback)((u) => {
      n(u);
    }, []),
    s = (0, o_.createQrUrl)(
      t.sessionId,
      t.sessionSecret,
      t.linkAPIUrl,
      t.isParentConnection,
      t.version,
      t.chainId
    ),
    o = ul[r];
  if (!r) return null;
  const a = o.steps,
    c = r === 'coinbase-app';
  return (0, j.h)(
    'div',
    {
      'data-testid': 'connect-content',
      class: (0, Je.default)('-cbwsdk-connect-content', e),
    },
    (0, j.h)('style', null, g_.default),
    (0, j.h)(
      'div',
      { class: '-cbwsdk-connect-content-header' },
      (0, j.h)(
        'h2',
        { class: (0, Je.default)('-cbwsdk-connect-content-heading', e) },
        'Scan to connect with one of our mobile apps'
      ),
      t.onCancel &&
        (0, j.h)(
          'button',
          {
            type: 'button',
            class: '-cbwsdk-cancel-button',
            onClick: t.onCancel,
          },
          (0, j.h)(c_.CloseIcon, {
            fill: e === 'light' ? '#0A0B0D' : '#FFFFFF',
          })
        )
    ),
    (0, j.h)(
      'div',
      { class: '-cbwsdk-connect-content-layout' },
      (0, j.h)(
        'div',
        { class: '-cbwsdk-connect-content-column-left' },
        (0, j.h)(
          'div',
          null,
          Object.entries(ul).map(([u, l]) =>
            (0, j.h)(Wh, {
              key: u,
              title: l.title,
              description: l.description,
              icon: l.icon,
              selected: r === u,
              onClick: () => i(u),
              theme: e,
            })
          )
        ),
        c &&
          (0, j.h)(
            'div',
            { class: (0, Je.default)('-cbwsdk-connect-content-update-app', e) },
            'Don’t see a ',
            (0, j.h)('strong', null, 'Scan'),
            ' option? Update your Coinbase app to the latest version and try again.'
          )
      ),
      (0, j.h)(
        'div',
        { class: '-cbwsdk-connect-content-column-right' },
        (0, j.h)(
          'div',
          { class: '-cbwsdk-connect-content-qr-wrapper' },
          (0, j.h)(p_.QRCode, {
            content: s,
            width: 200,
            height: 200,
            fgColor: '#000',
            bgColor: 'transparent',
            image: { svg: y_(r), width: 25, height: 25 },
          }),
          (0, j.h)('input', {
            type: 'hidden',
            name: 'cbw-cbwsdk-version',
            value: a_.LIB_VERSION,
          }),
          (0, j.h)('input', { type: 'hidden', value: s })
        ),
        (0, j.h)(a, { theme: e }),
        !t.isConnected &&
          (0, j.h)(
            'div',
            {
              'data-testid': 'connecting-spinner',
              class: (0, Je.default)(
                '-cbwsdk-connect-content-qr-connecting',
                e
              ),
            },
            (0, j.h)(b_.Spinner, {
              size: 36,
              color: e === 'dark' ? '#FFF' : '#000',
            }),
            (0, j.h)('p', null, 'Connecting...')
          )
      )
    )
  );
}
gt.ConnectContent = v_;
function Wh({
  title: t,
  description: e,
  icon: r,
  selected: n,
  theme: i,
  onClick: s,
}) {
  return (0, j.h)(
    'div',
    {
      onClick: s,
      class: (0, Je.default)('-cbwsdk-connect-item', i, { selected: n }),
    },
    (0, j.h)('div', null, (0, j.h)('img', { src: r, alt: t })),
    (0, j.h)(
      'div',
      { class: '-cbwsdk-connect-item-copy-wrapper' },
      (0, j.h)('h3', { class: '-cbwsdk-connect-item-title' }, t),
      (0, j.h)('p', { class: '-cbwsdk-connect-item-description' }, e)
    )
  );
}
gt.ConnectItem = Wh;
function Hh({ theme: t }) {
  return (0, j.h)(
    'ol',
    { class: '-cbwsdk-wallet-steps' },
    (0, j.h)(
      'li',
      { class: (0, Je.default)('-cbwsdk-wallet-steps-item', t) },
      (0, j.h)(
        'div',
        { class: '-cbwsdk-wallet-steps-item-wrapper' },
        'Open Coinbase Wallet app'
      )
    ),
    (0, j.h)(
      'li',
      { class: (0, Je.default)('-cbwsdk-wallet-steps-item', t) },
      (0, j.h)(
        'div',
        { class: '-cbwsdk-wallet-steps-item-wrapper' },
        (0, j.h)('span', null, 'Tap ', (0, j.h)('strong', null, 'Scan'), ' '),
        (0, j.h)(
          'span',
          {
            class: (0, Je.default)(
              '-cbwsdk-wallet-steps-pad-left',
              '-cbwsdk-wallet-steps-icon',
              t
            ),
          },
          (0, j.h)($h.QRCodeIcon, { fill: Sa(t) })
        )
      )
    )
  );
}
gt.CoinbaseWalletSteps = Hh;
function Vh({ theme: t }) {
  return (0, j.h)(
    'ol',
    { class: '-cbwsdk-wallet-steps' },
    (0, j.h)(
      'li',
      { class: (0, Je.default)('-cbwsdk-wallet-steps-item', t) },
      (0, j.h)(
        'div',
        { class: '-cbwsdk-wallet-steps-item-wrapper' },
        'Open Coinbase app'
      )
    ),
    (0, j.h)(
      'li',
      { class: (0, Je.default)('-cbwsdk-wallet-steps-item', t) },
      (0, j.h)(
        'div',
        { class: '-cbwsdk-wallet-steps-item-wrapper' },
        (0, j.h)('span', null, 'Tap ', (0, j.h)('strong', null, 'More')),
        (0, j.h)(
          'span',
          {
            class: (0, Je.default)(
              '-cbwsdk-wallet-steps-pad-left',
              '-cbwsdk-wallet-steps-icon',
              t
            ),
          },
          (0, j.h)(d_.StatusDotIcon, { fill: Sa(t) })
        ),
        (0, j.h)(
          'span',
          { class: '-cbwsdk-wallet-steps-pad-left' },
          'then ',
          (0, j.h)('strong', null, 'Scan')
        ),
        (0, j.h)(
          'span',
          {
            class: (0, Je.default)(
              '-cbwsdk-wallet-steps-pad-left',
              '-cbwsdk-wallet-steps-icon',
              t
            ),
          },
          (0, j.h)($h.QRCodeIcon, { fill: Sa(t) })
        )
      )
    )
  );
}
gt.CoinbaseAppSteps = Vh;
var cs = {},
  us = {};
Object.defineProperty(us, '__esModule', { value: !0 });
us.ArrowLeftIcon = void 0;
const ll = We;
function m_(t) {
  return (0, ll.h)(
    'svg',
    Object.assign(
      {
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      t
    ),
    (0, ll.h)('path', {
      d: 'M8.60675 0.155884L7.37816 1.28209L12.7723 7.16662H0V8.83328H12.6548L6.82149 14.6666L8 15.8451L15.8201 8.02501L8.60675 0.155884Z',
    })
  );
}
us.ArrowLeftIcon = m_;
var ls = {};
Object.defineProperty(ls, '__esModule', { value: !0 });
ls.LaptopIcon = void 0;
const Go = We;
function w_(t) {
  return (0, Go.h)(
    'svg',
    Object.assign(
      {
        width: '14',
        height: '14',
        viewBox: '0 0 14 14',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      t
    ),
    (0, Go.h)('path', {
      d: 'M1.8001 2.2002H12.2001V9.40019H1.8001V2.2002ZM3.4001 3.8002V7.80019H10.6001V3.8002H3.4001Z',
    }),
    (0, Go.h)('path', {
      d: 'M13.4001 10.2002H0.600098C0.600098 11.0838 1.31644 11.8002 2.2001 11.8002H11.8001C12.6838 11.8002 13.4001 11.0838 13.4001 10.2002Z',
    })
  );
}
ls.LaptopIcon = w_;
var fs = {};
Object.defineProperty(fs, '__esModule', { value: !0 });
fs.SafeIcon = void 0;
const fl = We;
function __(t) {
  return (0, fl.h)(
    'svg',
    Object.assign(
      {
        width: '14',
        height: '14',
        viewBox: '0 0 14 14',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      t
    ),
    (0, fl.h)('path', {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: 'M0.600098 0.600098V11.8001H13.4001V0.600098H0.600098ZM7.0001 9.2001C5.3441 9.2001 4.0001 7.8561 4.0001 6.2001C4.0001 4.5441 5.3441 3.2001 7.0001 3.2001C8.6561 3.2001 10.0001 4.5441 10.0001 6.2001C10.0001 7.8561 8.6561 9.2001 7.0001 9.2001ZM0.600098 12.6001H3.8001V13.4001H0.600098V12.6001ZM10.2001 12.6001H13.4001V13.4001H10.2001V12.6001ZM8.8001 6.2001C8.8001 7.19421 7.99421 8.0001 7.0001 8.0001C6.00598 8.0001 5.2001 7.19421 5.2001 6.2001C5.2001 5.20598 6.00598 4.4001 7.0001 4.4001C7.99421 4.4001 8.8001 5.20598 8.8001 6.2001Z',
    })
  );
}
fs.SafeIcon = __;
var mc = {};
Object.defineProperty(mc, '__esModule', { value: !0 });
mc.default =
  '.-cbwsdk-css-reset .-cbwsdk-try-extension{display:flex;margin-top:12px;height:202px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-try-extension.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-column-half{flex:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading{font-style:normal;font-weight:500;font-size:25px;line-height:32px;margin:0;max-width:204px}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta{appearance:none;border:none;background:none;color:#0052ff;cursor:pointer;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.light{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.dark{color:#588af5}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-wrapper{display:flex;align-items:center;margin-top:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-icon{display:block;margin-left:4px;height:14px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0;padding:0;list-style:none;height:100%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item{display:flex;align-items:center;flex-flow:nowrap;margin-top:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item:first-of-type{margin-top:0}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon-wrapper{display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon{display:flex;height:32px;width:32px;border-radius:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.light{background:#eef0f3}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.dark{background:#1e2025}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy{display:block;font-weight:400;font-size:14px;line-height:20px;padding-left:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.light{color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.dark{color:#8a919e}';
var Uh =
  (O && O.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(cs, '__esModule', { value: !0 });
cs.TryExtensionContent = void 0;
const Gt = Uh(rs),
  de = We,
  Qo = Gn,
  S_ = us,
  E_ = ls,
  C_ = fs,
  x_ = Uh(mc);
function I_({ theme: t }) {
  const [e, r] = (0, Qo.useState)(!1),
    n = (0, Qo.useCallback)(() => {
      window.open(
        'https://api.wallet.coinbase.com/rpc/v2/desktop/chrome',
        '_blank'
      );
    }, []),
    i = (0, Qo.useCallback)(() => {
      e ? window.location.reload() : (n(), r(!0));
    }, [n, e]);
  return (0, de.h)(
    'div',
    { class: (0, Gt.default)('-cbwsdk-try-extension', t) },
    (0, de.h)('style', null, x_.default),
    (0, de.h)(
      'div',
      { class: '-cbwsdk-try-extension-column-half' },
      (0, de.h)(
        'h3',
        { class: (0, Gt.default)('-cbwsdk-try-extension-heading', t) },
        'Or try the Coinbase Wallet browser extension'
      ),
      (0, de.h)(
        'div',
        { class: '-cbwsdk-try-extension-cta-wrapper' },
        (0, de.h)(
          'button',
          {
            class: (0, Gt.default)('-cbwsdk-try-extension-cta', t),
            onClick: i,
          },
          e ? 'Refresh' : 'Install'
        ),
        (0, de.h)(
          'div',
          null,
          !e &&
            (0, de.h)(S_.ArrowLeftIcon, {
              class: '-cbwsdk-try-extension-cta-icon',
              fill: t === 'light' ? '#0052FF' : '#588AF5',
            })
        )
      )
    ),
    (0, de.h)(
      'div',
      { class: '-cbwsdk-try-extension-column-half' },
      (0, de.h)(
        'ul',
        { class: '-cbwsdk-try-extension-list' },
        (0, de.h)(
          'li',
          { class: '-cbwsdk-try-extension-list-item' },
          (0, de.h)(
            'div',
            { class: '-cbwsdk-try-extension-list-item-icon-wrapper' },
            (0, de.h)(
              'span',
              {
                class: (0, Gt.default)(
                  '-cbwsdk-try-extension-list-item-icon',
                  t
                ),
              },
              (0, de.h)(E_.LaptopIcon, {
                fill: t === 'light' ? '#0A0B0D' : '#FFFFFF',
              })
            )
          ),
          (0, de.h)(
            'div',
            {
              class: (0, Gt.default)('-cbwsdk-try-extension-list-item-copy', t),
            },
            'Connect with dapps with just one click on your desktop browser'
          )
        ),
        (0, de.h)(
          'li',
          { class: '-cbwsdk-try-extension-list-item' },
          (0, de.h)(
            'div',
            { class: '-cbwsdk-try-extension-list-item-icon-wrapper' },
            (0, de.h)(
              'span',
              {
                class: (0, Gt.default)(
                  '-cbwsdk-try-extension-list-item-icon',
                  t
                ),
              },
              (0, de.h)(C_.SafeIcon, {
                fill: t === 'light' ? '#0A0B0D' : '#FFFFFF',
              })
            )
          ),
          (0, de.h)(
            'div',
            {
              class: (0, Gt.default)('-cbwsdk-try-extension-list-item-copy', t),
            },
            'Add an additional layer of security by using a supported Ledger hardware wallet'
          )
        )
      )
    )
  );
}
cs.TryExtensionContent = I_;
var wc = {};
Object.defineProperty(wc, '__esModule', { value: !0 });
wc.default =
  '.-cbwsdk-css-reset .-cbwsdk-connect-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.light{background-color:rgba(0,0,0,.5)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.dark{background-color:rgba(50,53,61,.4)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box{display:flex;position:relative;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container{display:block}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container-hidden{display:none}';
var zh =
  (O && O.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(ts, '__esModule', { value: !0 });
ts.ConnectDialog = void 0;
const Zo = zh(rs),
  Qt = We,
  Yo = Gn,
  k_ = gt,
  M_ = cs,
  R_ = zh(wc),
  A_ = (t) => {
    const { isOpen: e, darkMode: r } = t,
      [n, i] = (0, Yo.useState)(!e),
      [s, o] = (0, Yo.useState)(!e);
    (0, Yo.useEffect)(() => {
      const c = [
        window.setTimeout(() => {
          o(!e);
        }, 10),
      ];
      return (
        e
          ? i(!1)
          : c.push(
              window.setTimeout(() => {
                i(!0);
              }, 360)
            ),
        () => {
          c.forEach(window.clearTimeout);
        }
      );
    }, [t.isOpen]);
    const a = r ? 'dark' : 'light';
    return (0, Qt.h)(
      'div',
      {
        class: (0, Zo.default)(
          '-cbwsdk-connect-dialog-container',
          n && '-cbwsdk-connect-dialog-container-hidden'
        ),
      },
      (0, Qt.h)('style', null, R_.default),
      (0, Qt.h)('div', {
        class: (0, Zo.default)(
          '-cbwsdk-connect-dialog-backdrop',
          a,
          s && '-cbwsdk-connect-dialog-backdrop-hidden'
        ),
      }),
      (0, Qt.h)(
        'div',
        { class: '-cbwsdk-connect-dialog' },
        (0, Qt.h)(
          'div',
          {
            class: (0, Zo.default)(
              '-cbwsdk-connect-dialog-box',
              s && '-cbwsdk-connect-dialog-box-hidden'
            ),
          },
          t.connectDisabled
            ? null
            : (0, Qt.h)(k_.ConnectContent, {
                theme: a,
                version: t.version,
                sessionId: t.sessionId,
                sessionSecret: t.sessionSecret,
                linkAPIUrl: t.linkAPIUrl,
                isConnected: t.isConnected,
                isParentConnection: t.isParentConnection,
                chainId: t.chainId,
                onCancel: t.onCancel,
              }),
          (0, Qt.h)(M_.TryExtensionContent, { theme: a })
        )
      )
    );
  };
ts.ConnectDialog = A_;
Object.defineProperty(Ki, '__esModule', { value: !0 });
Ki.LinkFlow = void 0;
const Ko = We,
  hl = es,
  T_ = ts;
class O_ {
  constructor(e) {
    (this.extensionUI$ = new hl.BehaviorSubject({})),
      (this.subscriptions = new hl.Subscription()),
      (this.isConnected = !1),
      (this.chainId = 1),
      (this.isOpen = !1),
      (this.onCancel = null),
      (this.root = null),
      (this.connectDisabled = !1),
      (this.darkMode = e.darkMode),
      (this.version = e.version),
      (this.sessionId = e.sessionId),
      (this.sessionSecret = e.sessionSecret),
      (this.linkAPIUrl = e.linkAPIUrl),
      (this.isParentConnection = e.isParentConnection),
      (this.connected$ = e.connected$),
      (this.chainId$ = e.chainId$);
  }
  attach(e) {
    (this.root = document.createElement('div')),
      (this.root.className = '-cbwsdk-link-flow-root'),
      e.appendChild(this.root),
      this.render(),
      this.subscriptions.add(
        this.connected$.subscribe((r) => {
          this.isConnected !== r && ((this.isConnected = r), this.render());
        })
      ),
      this.subscriptions.add(
        this.chainId$.subscribe((r) => {
          this.chainId !== r && ((this.chainId = r), this.render());
        })
      );
  }
  detach() {
    var e;
    this.root &&
      (this.subscriptions.unsubscribe(),
      (0, Ko.render)(null, this.root),
      (e = this.root.parentElement) === null ||
        e === void 0 ||
        e.removeChild(this.root));
  }
  setConnectDisabled(e) {
    this.connectDisabled = e;
  }
  open(e) {
    (this.isOpen = !0), (this.onCancel = e.onCancel), this.render();
  }
  close() {
    (this.isOpen = !1), (this.onCancel = null), this.render();
  }
  render() {
    if (!this.root) return;
    const e = this.extensionUI$.subscribe(() => {
      this.root &&
        (0, Ko.render)(
          (0, Ko.h)(T_.ConnectDialog, {
            darkMode: this.darkMode,
            version: this.version,
            sessionId: this.sessionId,
            sessionSecret: this.sessionSecret,
            linkAPIUrl: this.linkAPIUrl,
            isOpen: this.isOpen,
            isConnected: this.isConnected,
            isParentConnection: this.isParentConnection,
            chainId: this.chainId,
            onCancel: this.onCancel,
            connectDisabled: this.connectDisabled,
          }),
          this.root
        );
    });
    this.subscriptions.add(e);
  }
}
Ki.LinkFlow = O_;
var qh = {},
  _c = {};
Object.defineProperty(_c, '__esModule', { value: !0 });
_c.default =
  '.-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}';
(function (t) {
  var e =
    (O && O.__importDefault) ||
    function (f) {
      return f && f.__esModule ? f : { default: f };
    };
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.SnackbarInstance = t.SnackbarContainer = t.Snackbar = void 0);
  const r = e(rs),
    n = We,
    i = Gn,
    s = e(_c),
    o =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=';
  function a(f) {
    switch (f) {
      case 'coinbase-app':
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0LjY3NCAxOC44NThjLTIuMDQ1IDAtMy42NDgtMS43MjItMy42NDgtMy44NDVzMS42NTktMy44NDUgMy42NDgtMy44NDVjMS44MjQgMCAzLjMxNyAxLjM3NyAzLjU5MyAzLjIxNGgzLjcwM2MtLjMzMS0zLjk2LTMuNDgyLTcuMDU5LTcuMjk2LTcuMDU5LTQuMDM0IDAtNy4zNSAzLjQ0My03LjM1IDcuNjkgMCA0LjI0NiAzLjI2IDcuNjkgNy4zNSA3LjY5IDMuODcgMCA2Ljk2NS0zLjEgNy4yOTYtNy4wNTloLTMuNzAzYy0uMjc2IDEuODM2LTEuNzY5IDMuMjE0LTMuNTkzIDMuMjE0WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDEwLjY3OGMwLTMuNzExIDAtNS41OTYuNzQyLTcuMDIzQTYuNTMyIDYuNTMyIDAgMCAxIDMuNjU1Ljc0MkM1LjA4MiAwIDYuOTY3IDAgMTAuNjc4IDBoNy45MzhjMy43MTEgMCA1LjU5NiAwIDcuMDIzLjc0MmE2LjUzMSA2LjUzMSAwIDAgMSAyLjkxMyAyLjkxM2MuNzQyIDEuNDI3Ljc0MiAzLjMxMi43NDIgNy4wMjN2Ny45MzhjMCAzLjcxMSAwIDUuNTk2LS43NDIgNy4wMjNhNi41MzEgNi41MzEgMCAwIDEtMi45MTMgMi45MTNjLTEuNDI3Ljc0Mi0zLjMxMi43NDItNy4wMjMuNzQyaC03LjkzOGMtMy43MTEgMC01LjU5NiAwLTcuMDIzLS43NDJhNi41MzEgNi41MzEgMCAwIDEtMi45MTMtMi45MTNDMCAyNC4yMTIgMCAyMi4zODQgMCAxOC42MTZ2LTcuOTM4WiIgZmlsbD0iIzAwNTJGRiIvPjxwYXRoIGQ9Ik0xNC42ODQgMTkuNzczYy0yLjcyNyAwLTQuODY0LTIuMjk1LTQuODY0LTUuMTI2IDAtMi44MzEgMi4yMS01LjEyNyA0Ljg2NC01LjEyNyAyLjQzMiAwIDQuNDIyIDEuODM3IDQuNzkgNC4yODVoNC45MzhjLS40NDItNS4yOC00LjY0My05LjQxMS05LjcyOC05LjQxMS01LjM4IDAtOS44MDIgNC41OS05LjgwMiAxMC4yNTMgMCA1LjY2MiA0LjM0OCAxMC4yNTMgOS44MDIgMTAuMjUzIDUuMTU5IDAgOS4yODYtNC4xMzIgOS43MjgtOS40MTFoLTQuOTM4Yy0uMzY4IDIuNDQ4LTIuMzU4IDQuMjg0LTQuNzkgNC4yODRaIiBmaWxsPSIjZmZmIi8+PC9zdmc+';
      case 'coinbase-wallet-app':
      default:
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+';
    }
  }
  class c {
    constructor(h) {
      (this.items = new Map()),
        (this.nextItemKey = 0),
        (this.root = null),
        (this.darkMode = h.darkMode);
    }
    attach(h) {
      (this.root = document.createElement('div')),
        (this.root.className = '-cbwsdk-snackbar-root'),
        h.appendChild(this.root),
        this.render();
    }
    presentItem(h) {
      const y = this.nextItemKey++;
      return (
        this.items.set(y, h),
        this.render(),
        () => {
          this.items.delete(y), this.render();
        }
      );
    }
    clear() {
      this.items.clear(), this.render();
    }
    render() {
      this.root &&
        (0, n.render)(
          (0, n.h)(
            'div',
            null,
            (0, n.h)(
              t.SnackbarContainer,
              { darkMode: this.darkMode },
              Array.from(this.items.entries()).map(([h, y]) =>
                (0, n.h)(t.SnackbarInstance, Object.assign({}, y, { key: h }))
              )
            )
          ),
          this.root
        );
    }
  }
  t.Snackbar = c;
  const u = (f) =>
    (0, n.h)(
      'div',
      { class: (0, r.default)('-cbwsdk-snackbar-container') },
      (0, n.h)('style', null, s.default),
      (0, n.h)('div', { class: '-cbwsdk-snackbar' }, f.children)
    );
  t.SnackbarContainer = u;
  const l = ({ autoExpand: f, message: h, menuItems: y, appSrc: _ }) => {
    const [x, E] = (0, i.useState)(!0),
      [b, g] = (0, i.useState)(f ?? !1);
    (0, i.useEffect)(() => {
      const C = [
        window.setTimeout(() => {
          E(!1);
        }, 1),
        window.setTimeout(() => {
          g(!0);
        }, 1e4),
      ];
      return () => {
        C.forEach(window.clearTimeout);
      };
    });
    const w = () => {
      g(!b);
    };
    return (0, n.h)(
      'div',
      {
        class: (0, r.default)(
          '-cbwsdk-snackbar-instance',
          x && '-cbwsdk-snackbar-instance-hidden',
          b && '-cbwsdk-snackbar-instance-expanded'
        ),
      },
      (0, n.h)(
        'div',
        { class: '-cbwsdk-snackbar-instance-header', onClick: w },
        (0, n.h)('img', {
          src: a(_),
          class: '-cbwsdk-snackbar-instance-header-cblogo',
        }),
        (0, n.h)(
          'div',
          { class: '-cbwsdk-snackbar-instance-header-message' },
          h
        ),
        (0, n.h)(
          'div',
          { class: '-gear-container' },
          !b &&
            (0, n.h)(
              'svg',
              {
                width: '24',
                height: '24',
                viewBox: '0 0 24 24',
                fill: 'none',
                xmlns: 'http://www.w3.org/2000/svg',
              },
              (0, n.h)('circle', {
                cx: '12',
                cy: '12',
                r: '12',
                fill: '#F5F7F8',
              })
            ),
          (0, n.h)('img', { src: o, class: '-gear-icon', title: 'Expand' })
        )
      ),
      y &&
        y.length > 0 &&
        (0, n.h)(
          'div',
          { class: '-cbwsdk-snackbar-instance-menu' },
          y.map((C, S) =>
            (0, n.h)(
              'div',
              {
                class: (0, r.default)(
                  '-cbwsdk-snackbar-instance-menu-item',
                  C.isRed && '-cbwsdk-snackbar-instance-menu-item-is-red'
                ),
                onClick: C.onClick,
                key: S,
              },
              (0, n.h)(
                'svg',
                {
                  width: C.svgWidth,
                  height: C.svgHeight,
                  viewBox: '0 0 10 11',
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg',
                },
                (0, n.h)('path', {
                  'fill-rule': C.defaultFillRule,
                  'clip-rule': C.defaultClipRule,
                  d: C.path,
                  fill: '#AAAAAA',
                })
              ),
              (0, n.h)(
                'span',
                {
                  class: (0, r.default)(
                    '-cbwsdk-snackbar-instance-menu-item-info',
                    C.isRed && '-cbwsdk-snackbar-instance-menu-item-info-is-red'
                  ),
                },
                C.info
              )
            )
          )
        )
    );
  };
  t.SnackbarInstance = l;
})(qh);
var hs = {},
  Sc = {};
Object.defineProperty(Sc, '__esModule', { value: !0 });
Sc.default =
  '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}';
var N_ =
  (O && O.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(hs, '__esModule', { value: !0 });
hs.injectCssReset = void 0;
const L_ = N_(Sc);
function P_() {
  const t = document.createElement('style');
  (t.type = 'text/css'),
    t.appendChild(document.createTextNode(L_.default)),
    document.documentElement.appendChild(t);
}
hs.injectCssReset = P_;
Object.defineProperty(Yi, '__esModule', { value: !0 });
Yi.WalletSDKUI = void 0;
const D_ = Ki,
  B_ = qh,
  j_ = hs;
class F_ {
  constructor(e) {
    (this.standalone = null),
      (this.attached = !1),
      (this.appSrc = null),
      (this.snackbar = new B_.Snackbar({ darkMode: e.darkMode })),
      (this.linkFlow = new D_.LinkFlow({
        darkMode: e.darkMode,
        version: e.version,
        sessionId: e.session.id,
        sessionSecret: e.session.secret,
        linkAPIUrl: e.linkAPIUrl,
        connected$: e.connected$,
        chainId$: e.chainId$,
        isParentConnection: !1,
      }));
  }
  attach() {
    if (this.attached)
      throw new Error('Coinbase Wallet SDK UI is already attached');
    const e = document.documentElement,
      r = document.createElement('div');
    (r.className = '-cbwsdk-css-reset'),
      e.appendChild(r),
      this.linkFlow.attach(r),
      this.snackbar.attach(r),
      (this.attached = !0),
      (0, j_.injectCssReset)();
  }
  setConnectDisabled(e) {
    this.linkFlow.setConnectDisabled(e);
  }
  addEthereumChain(e) {}
  watchAsset(e) {}
  switchEthereumChain(e) {}
  requestEthereumAccounts(e) {
    this.linkFlow.open({ onCancel: e.onCancel });
  }
  hideRequestEthereumAccounts() {
    this.linkFlow.close();
  }
  signEthereumMessage(e) {}
  signEthereumTransaction(e) {}
  submitEthereumTransaction(e) {}
  ethereumAddressFromSignedMessage(e) {}
  showConnecting(e) {
    let r;
    return (
      e.isUnlinkedErrorState
        ? (r = {
            autoExpand: !0,
            message: 'Connection lost',
            appSrc: this.appSrc,
            menuItems: [
              {
                isRed: !1,
                info: 'Reset connection',
                svgWidth: '10',
                svgHeight: '11',
                path: 'M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z',
                defaultFillRule: 'evenodd',
                defaultClipRule: 'evenodd',
                onClick: e.onResetConnection,
              },
            ],
          })
        : (r = {
            message: 'Confirm on phone',
            appSrc: this.appSrc,
            menuItems: [
              {
                isRed: !0,
                info: 'Cancel transaction',
                svgWidth: '11',
                svgHeight: '11',
                path: 'M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z',
                defaultFillRule: 'inherit',
                defaultClipRule: 'inherit',
                onClick: e.onCancel,
              },
              {
                isRed: !1,
                info: 'Reset connection',
                svgWidth: '10',
                svgHeight: '11',
                path: 'M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z',
                defaultFillRule: 'evenodd',
                defaultClipRule: 'evenodd',
                onClick: e.onResetConnection,
              },
            ],
          }),
      this.snackbar.presentItem(r)
    );
  }
  setAppSrc(e) {
    this.appSrc = e;
  }
  reloadUI() {
    document.location.reload();
  }
  inlineAccountsResponse() {
    return !1;
  }
  inlineAddEthereumChain(e) {
    return !1;
  }
  inlineWatchAsset() {
    return !1;
  }
  inlineSwitchEthereumChain() {
    return !1;
  }
  setStandalone(e) {
    this.standalone = e;
  }
  isStandalone() {
    var e;
    return (e = this.standalone) !== null && e !== void 0 ? e : !1;
  }
}
Yi.WalletSDKUI = F_;
var ds = {},
  ps = {};
Object.defineProperty(ps, '__esModule', { value: !0 });
var Mr;
(function (t) {
  (t.typeOfFunction = 'function'), (t.boolTrue = !0);
})(Mr || (Mr = {}));
function Jh(t, e, r) {
  if (!r || typeof r.value !== Mr.typeOfFunction)
    throw new TypeError(
      'Only methods can be decorated with @bind. <' + e + '> is not a method!'
    );
  return {
    configurable: Mr.boolTrue,
    get: function () {
      var n = r.value.bind(this);
      return (
        Object.defineProperty(this, e, {
          value: n,
          configurable: Mr.boolTrue,
          writable: Mr.boolTrue,
        }),
        n
      );
    },
  };
}
ps.bind = Jh;
ps.default = Jh;
function Gh(t) {
  return function (r) {
    return r.lift(new $_(t));
  };
}
var $_ = (function () {
    function t(e) {
      this.durationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new W_(e, this.durationSelector));
      }),
      t
    );
  })(),
  W_ = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.durationSelector = n), (i.hasValue = !1), i;
    }
    return (
      (e.prototype._next = function (r) {
        if (((this.value = r), (this.hasValue = !0), !this.throttled)) {
          var n = void 0;
          try {
            var i = this.durationSelector;
            n = i(r);
          } catch (o) {
            return this.destination.error(o);
          }
          var s = fe(n, new ue(this));
          !s || s.closed
            ? this.clearThrottle()
            : this.add((this.throttled = s));
        }
      }),
      (e.prototype.clearThrottle = function () {
        var r = this,
          n = r.value,
          i = r.hasValue,
          s = r.throttled;
        s && (this.remove(s), (this.throttled = void 0), s.unsubscribe()),
          i &&
            ((this.value = void 0),
            (this.hasValue = !1),
            this.destination.next(n));
      }),
      (e.prototype.notifyNext = function () {
        this.clearThrottle();
      }),
      (e.prototype.notifyComplete = function () {
        this.clearThrottle();
      }),
      e
    );
  })(le);
function H_(t, e) {
  return (
    e === void 0 && (e = Oe),
    Gh(function () {
      return Nh(t, e);
    })
  );
}
function V_(t) {
  return function (r) {
    return r.lift(new U_(t));
  };
}
var U_ = (function () {
    function t(e) {
      this.closingNotifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new z_(e, this.closingNotifier));
      }),
      t
    );
  })(),
  z_ = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.buffer = []), i.add(fe(n, new ue(i))), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.buffer.push(r);
      }),
      (e.prototype.notifyNext = function () {
        var r = this.buffer;
        (this.buffer = []), this.destination.next(r);
      }),
      e
    );
  })(le);
function q_(t, e) {
  return (
    e === void 0 && (e = null),
    function (n) {
      return n.lift(new J_(t, e));
    }
  );
}
var J_ = (function () {
    function t(e, r) {
      (this.bufferSize = e),
        (this.startBufferEvery = r),
        !r || e === r
          ? (this.subscriberClass = G_)
          : (this.subscriberClass = Q_);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new this.subscriberClass(e, this.bufferSize, this.startBufferEvery)
        );
      }),
      t
    );
  })(),
  G_ = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.bufferSize = n), (i.buffer = []), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.buffer;
        n.push(r),
          n.length == this.bufferSize &&
            (this.destination.next(n), (this.buffer = []));
      }),
      (e.prototype._complete = function () {
        var r = this.buffer;
        r.length > 0 && this.destination.next(r),
          t.prototype._complete.call(this);
      }),
      e
    );
  })(D),
  Q_ = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.bufferSize = n),
        (s.startBufferEvery = i),
        (s.buffers = []),
        (s.count = 0),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        var n = this,
          i = n.bufferSize,
          s = n.startBufferEvery,
          o = n.buffers,
          a = n.count;
        this.count++, a % s === 0 && o.push([]);
        for (var c = o.length; c--; ) {
          var u = o[c];
          u.push(r),
            u.length === i && (o.splice(c, 1), this.destination.next(u));
        }
      }),
      (e.prototype._complete = function () {
        for (var r = this, n = r.buffers, i = r.destination; n.length > 0; ) {
          var s = n.shift();
          s.length > 0 && i.next(s);
        }
        t.prototype._complete.call(this);
      }),
      e
    );
  })(D);
function Z_(t) {
  var e = arguments.length,
    r = Oe;
  $e(arguments[arguments.length - 1]) &&
    ((r = arguments[arguments.length - 1]), e--);
  var n = null;
  e >= 2 && (n = arguments[1]);
  var i = Number.POSITIVE_INFINITY;
  return (
    e >= 3 && (i = arguments[2]),
    function (o) {
      return o.lift(new Y_(t, n, i, r));
    }
  );
}
var Y_ = (function () {
    function t(e, r, n, i) {
      (this.bufferTimeSpan = e),
        (this.bufferCreationInterval = r),
        (this.maxBufferSize = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new X_(
            e,
            this.bufferTimeSpan,
            this.bufferCreationInterval,
            this.maxBufferSize,
            this.scheduler
          )
        );
      }),
      t
    );
  })(),
  K_ = (function () {
    function t() {
      this.buffer = [];
    }
    return t;
  })(),
  X_ = (function (t) {
    I(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      (a.bufferTimeSpan = n),
        (a.bufferCreationInterval = i),
        (a.maxBufferSize = s),
        (a.scheduler = o),
        (a.contexts = []);
      var c = a.openContext();
      if (((a.timespanOnly = i == null || i < 0), a.timespanOnly)) {
        var u = { subscriber: a, context: c, bufferTimeSpan: n };
        a.add((c.closeAction = o.schedule(dl, n, u)));
      } else {
        var l = { subscriber: a, context: c },
          f = {
            bufferTimeSpan: n,
            bufferCreationInterval: i,
            subscriber: a,
            scheduler: o,
          };
        a.add((c.closeAction = o.schedule(Qh, n, l))),
          a.add(o.schedule(e2, i, f));
      }
      return a;
    }
    return (
      (e.prototype._next = function (r) {
        for (var n = this.contexts, i = n.length, s, o = 0; o < i; o++) {
          var a = n[o],
            c = a.buffer;
          c.push(r), c.length == this.maxBufferSize && (s = a);
        }
        s && this.onBufferFull(s);
      }),
      (e.prototype._error = function (r) {
        (this.contexts.length = 0), t.prototype._error.call(this, r);
      }),
      (e.prototype._complete = function () {
        for (var r = this, n = r.contexts, i = r.destination; n.length > 0; ) {
          var s = n.shift();
          i.next(s.buffer);
        }
        t.prototype._complete.call(this);
      }),
      (e.prototype._unsubscribe = function () {
        this.contexts = null;
      }),
      (e.prototype.onBufferFull = function (r) {
        this.closeContext(r);
        var n = r.closeAction;
        if (
          (n.unsubscribe(), this.remove(n), !this.closed && this.timespanOnly)
        ) {
          r = this.openContext();
          var i = this.bufferTimeSpan,
            s = { subscriber: this, context: r, bufferTimeSpan: i };
          this.add((r.closeAction = this.scheduler.schedule(dl, i, s)));
        }
      }),
      (e.prototype.openContext = function () {
        var r = new K_();
        return this.contexts.push(r), r;
      }),
      (e.prototype.closeContext = function (r) {
        this.destination.next(r.buffer);
        var n = this.contexts,
          i = n ? n.indexOf(r) : -1;
        i >= 0 && n.splice(n.indexOf(r), 1);
      }),
      e
    );
  })(D);
function dl(t) {
  var e = t.subscriber,
    r = t.context;
  r && e.closeContext(r),
    e.closed ||
      ((t.context = e.openContext()),
      (t.context.closeAction = this.schedule(t, t.bufferTimeSpan)));
}
function e2(t) {
  var e = t.bufferCreationInterval,
    r = t.bufferTimeSpan,
    n = t.subscriber,
    i = t.scheduler,
    s = n.openContext(),
    o = this;
  n.closed ||
    (n.add((s.closeAction = i.schedule(Qh, r, { subscriber: n, context: s }))),
    o.schedule(t, e));
}
function Qh(t) {
  var e = t.subscriber,
    r = t.context;
  e.closeContext(r);
}
function t2(t, e) {
  return function (n) {
    return n.lift(new r2(t, e));
  };
}
var r2 = (function () {
    function t(e, r) {
      (this.openings = e), (this.closingSelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new n2(e, this.openings, this.closingSelector));
      }),
      t
    );
  })(),
  n2 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.closingSelector = i), (s.contexts = []), s.add(kt(s, n)), s;
    }
    return (
      (e.prototype._next = function (r) {
        for (var n = this.contexts, i = n.length, s = 0; s < i; s++)
          n[s].buffer.push(r);
      }),
      (e.prototype._error = function (r) {
        for (var n = this.contexts; n.length > 0; ) {
          var i = n.shift();
          i.subscription.unsubscribe(),
            (i.buffer = null),
            (i.subscription = null);
        }
        (this.contexts = null), t.prototype._error.call(this, r);
      }),
      (e.prototype._complete = function () {
        for (var r = this.contexts; r.length > 0; ) {
          var n = r.shift();
          this.destination.next(n.buffer),
            n.subscription.unsubscribe(),
            (n.buffer = null),
            (n.subscription = null);
        }
        (this.contexts = null), t.prototype._complete.call(this);
      }),
      (e.prototype.notifyNext = function (r, n) {
        r ? this.closeBuffer(r) : this.openBuffer(n);
      }),
      (e.prototype.notifyComplete = function (r) {
        this.closeBuffer(r.context);
      }),
      (e.prototype.openBuffer = function (r) {
        try {
          var n = this.closingSelector,
            i = n.call(this, r);
          i && this.trySubscribe(i);
        } catch (s) {
          this._error(s);
        }
      }),
      (e.prototype.closeBuffer = function (r) {
        var n = this.contexts;
        if (n && r) {
          var i = r.buffer,
            s = r.subscription;
          this.destination.next(i),
            n.splice(n.indexOf(r), 1),
            this.remove(s),
            s.unsubscribe();
        }
      }),
      (e.prototype.trySubscribe = function (r) {
        var n = this.contexts,
          i = [],
          s = new ce(),
          o = { buffer: i, subscription: s };
        n.push(o);
        var a = kt(this, r, o);
        !a || a.closed
          ? this.closeBuffer(o)
          : ((a.context = o), this.add(a), s.add(a));
      }),
      e
    );
  })(gr);
function i2(t) {
  return function (e) {
    return e.lift(new s2(t));
  };
}
var s2 = (function () {
    function t(e) {
      this.closingSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new o2(e, this.closingSelector));
      }),
      t
    );
  })(),
  o2 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.closingSelector = n), (i.subscribing = !1), i.openBuffer(), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.buffer.push(r);
      }),
      (e.prototype._complete = function () {
        var r = this.buffer;
        r && this.destination.next(r), t.prototype._complete.call(this);
      }),
      (e.prototype._unsubscribe = function () {
        (this.buffer = void 0), (this.subscribing = !1);
      }),
      (e.prototype.notifyNext = function () {
        this.openBuffer();
      }),
      (e.prototype.notifyComplete = function () {
        this.subscribing ? this.complete() : this.openBuffer();
      }),
      (e.prototype.openBuffer = function () {
        var r = this.closingSubscription;
        r && (this.remove(r), r.unsubscribe());
        var n = this.buffer;
        this.buffer && this.destination.next(n), (this.buffer = []);
        var i;
        try {
          var s = this.closingSelector;
          i = s();
        } catch (o) {
          return this.error(o);
        }
        (r = new ce()),
          (this.closingSubscription = r),
          this.add(r),
          (this.subscribing = !0),
          r.add(fe(i, new ue(this))),
          (this.subscribing = !1);
      }),
      e
    );
  })(le);
function a2(t) {
  return function (r) {
    var n = new c2(t),
      i = r.lift(n);
    return (n.caught = i);
  };
}
var c2 = (function () {
    function t(e) {
      this.selector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new u2(e, this.selector, this.caught));
      }),
      t
    );
  })(),
  u2 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.selector = n), (s.caught = i), s;
    }
    return (
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = void 0;
          try {
            n = this.selector(r, this.caught);
          } catch (o) {
            t.prototype.error.call(this, o);
            return;
          }
          this._unsubscribeAndRecycle();
          var i = new ue(this);
          this.add(i);
          var s = fe(n, i);
          s !== i && this.add(s);
        }
      }),
      e
    );
  })(le);
function l2(t) {
  return function (e) {
    return e.lift(new lc(t));
  };
}
function f2() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = null;
  return (
    typeof t[t.length - 1] == 'function' && (r = t.pop()),
    t.length === 1 && Te(t[0]) && (t = t[0].slice()),
    function (n) {
      return n.lift.call(Mt([n].concat(t)), new lc(r));
    }
  );
}
function h2() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return r.lift.call(xn.apply(void 0, [r].concat(t)));
  };
}
function Zh(t, e) {
  return or(t, e, 1);
}
function d2(t, e) {
  return Zh(function () {
    return t;
  }, e);
}
function p2(t) {
  return function (e) {
    return e.lift(new b2(t, e));
  };
}
var b2 = (function () {
    function t(e, r) {
      (this.predicate = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new g2(e, this.predicate, this.source));
      }),
      t
    );
  })(),
  g2 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.predicate = n), (s.source = i), (s.count = 0), (s.index = 0), s;
    }
    return (
      (e.prototype._next = function (r) {
        this.predicate ? this._tryPredicate(r) : this.count++;
      }),
      (e.prototype._tryPredicate = function (r) {
        var n;
        try {
          n = this.predicate(r, this.index++, this.source);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        n && this.count++;
      }),
      (e.prototype._complete = function () {
        this.destination.next(this.count), this.destination.complete();
      }),
      e
    );
  })(D);
function y2(t) {
  return function (e) {
    return e.lift(new v2(t));
  };
}
var v2 = (function () {
    function t(e) {
      this.durationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new m2(e, this.durationSelector));
      }),
      t
    );
  })(),
  m2 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.durationSelector = n), (i.hasValue = !1), i;
    }
    return (
      (e.prototype._next = function (r) {
        try {
          var n = this.durationSelector.call(this, r);
          n && this._tryNext(r, n);
        } catch (i) {
          this.destination.error(i);
        }
      }),
      (e.prototype._complete = function () {
        this.emitValue(), this.destination.complete();
      }),
      (e.prototype._tryNext = function (r, n) {
        var i = this.durationSubscription;
        (this.value = r),
          (this.hasValue = !0),
          i && (i.unsubscribe(), this.remove(i)),
          (i = fe(n, new ue(this))),
          i && !i.closed && this.add((this.durationSubscription = i));
      }),
      (e.prototype.notifyNext = function () {
        this.emitValue();
      }),
      (e.prototype.notifyComplete = function () {
        this.emitValue();
      }),
      (e.prototype.emitValue = function () {
        if (this.hasValue) {
          var r = this.value,
            n = this.durationSubscription;
          n &&
            ((this.durationSubscription = void 0),
            n.unsubscribe(),
            this.remove(n)),
            (this.value = void 0),
            (this.hasValue = !1),
            t.prototype._next.call(this, r);
        }
      }),
      e
    );
  })(le);
function w2(t, e) {
  return (
    e === void 0 && (e = Oe),
    function (r) {
      return r.lift(new _2(t, e));
    }
  );
}
var _2 = (function () {
    function t(e, r) {
      (this.dueTime = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new S2(e, this.dueTime, this.scheduler));
      }),
      t
    );
  })(),
  S2 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.dueTime = n),
        (s.scheduler = i),
        (s.debouncedSubscription = null),
        (s.lastValue = null),
        (s.hasValue = !1),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.clearDebounce(),
          (this.lastValue = r),
          (this.hasValue = !0),
          this.add(
            (this.debouncedSubscription = this.scheduler.schedule(
              E2,
              this.dueTime,
              this
            ))
          );
      }),
      (e.prototype._complete = function () {
        this.debouncedNext(), this.destination.complete();
      }),
      (e.prototype.debouncedNext = function () {
        if ((this.clearDebounce(), this.hasValue)) {
          var r = this.lastValue;
          (this.lastValue = null),
            (this.hasValue = !1),
            this.destination.next(r);
        }
      }),
      (e.prototype.clearDebounce = function () {
        var r = this.debouncedSubscription;
        r !== null &&
          (this.remove(r),
          r.unsubscribe(),
          (this.debouncedSubscription = null));
      }),
      e
    );
  })(D);
function E2(t) {
  t.debouncedNext();
}
function Qn(t) {
  return (
    t === void 0 && (t = null),
    function (e) {
      return e.lift(new C2(t));
    }
  );
}
var C2 = (function () {
    function t(e) {
      this.defaultValue = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new x2(e, this.defaultValue));
      }),
      t
    );
  })(),
  x2 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.defaultValue = n), (i.isEmpty = !0), i;
    }
    return (
      (e.prototype._next = function (r) {
        (this.isEmpty = !1), this.destination.next(r);
      }),
      (e.prototype._complete = function () {
        this.isEmpty && this.destination.next(this.defaultValue),
          this.destination.complete();
      }),
      e
    );
  })(D);
function Yh(t) {
  return t instanceof Date && !isNaN(+t);
}
function I2(t, e) {
  e === void 0 && (e = Oe);
  var r = Yh(t),
    n = r ? +t - e.now() : Math.abs(t);
  return function (i) {
    return i.lift(new k2(n, e));
  };
}
var k2 = (function () {
    function t(e, r) {
      (this.delay = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new M2(e, this.delay, this.scheduler));
      }),
      t
    );
  })(),
  M2 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.delay = n),
        (s.scheduler = i),
        (s.queue = []),
        (s.active = !1),
        (s.errored = !1),
        s
      );
    }
    return (
      (e.dispatch = function (r) {
        for (
          var n = r.source, i = n.queue, s = r.scheduler, o = r.destination;
          i.length > 0 && i[0].time - s.now() <= 0;

        )
          i.shift().notification.observe(o);
        if (i.length > 0) {
          var a = Math.max(0, i[0].time - s.now());
          this.schedule(r, a);
        } else this.unsubscribe(), (n.active = !1);
      }),
      (e.prototype._schedule = function (r) {
        this.active = !0;
        var n = this.destination;
        n.add(
          r.schedule(e.dispatch, this.delay, {
            source: this,
            destination: this.destination,
            scheduler: r,
          })
        );
      }),
      (e.prototype.scheduleNotification = function (r) {
        if (this.errored !== !0) {
          var n = this.scheduler,
            i = new R2(n.now() + this.delay, r);
          this.queue.push(i), this.active === !1 && this._schedule(n);
        }
      }),
      (e.prototype._next = function (r) {
        this.scheduleNotification(xt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        (this.errored = !0),
          (this.queue = []),
          this.destination.error(r),
          this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.scheduleNotification(xt.createComplete()), this.unsubscribe();
      }),
      e
    );
  })(D),
  R2 = (function () {
    function t(e, r) {
      (this.time = e), (this.notification = r);
    }
    return t;
  })();
function A2(t, e) {
  return e
    ? function (r) {
        return new O2(r, e).lift(new pl(t));
      }
    : function (r) {
        return r.lift(new pl(t));
      };
}
var pl = (function () {
    function t(e) {
      this.delayDurationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new T2(e, this.delayDurationSelector));
      }),
      t
    );
  })(),
  T2 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (
        (i.delayDurationSelector = n),
        (i.completed = !1),
        (i.delayNotifierSubscriptions = []),
        (i.index = 0),
        i
      );
    }
    return (
      (e.prototype.notifyNext = function (r, n, i, s, o) {
        this.destination.next(r),
          this.removeSubscription(o),
          this.tryComplete();
      }),
      (e.prototype.notifyError = function (r, n) {
        this._error(r);
      }),
      (e.prototype.notifyComplete = function (r) {
        var n = this.removeSubscription(r);
        n && this.destination.next(n), this.tryComplete();
      }),
      (e.prototype._next = function (r) {
        var n = this.index++;
        try {
          var i = this.delayDurationSelector(r, n);
          i && this.tryDelay(i, r);
        } catch (s) {
          this.destination.error(s);
        }
      }),
      (e.prototype._complete = function () {
        (this.completed = !0), this.tryComplete(), this.unsubscribe();
      }),
      (e.prototype.removeSubscription = function (r) {
        r.unsubscribe();
        var n = this.delayNotifierSubscriptions.indexOf(r);
        return (
          n !== -1 && this.delayNotifierSubscriptions.splice(n, 1), r.outerValue
        );
      }),
      (e.prototype.tryDelay = function (r, n) {
        var i = kt(this, r, n);
        if (i && !i.closed) {
          var s = this.destination;
          s.add(i), this.delayNotifierSubscriptions.push(i);
        }
      }),
      (e.prototype.tryComplete = function () {
        this.completed &&
          this.delayNotifierSubscriptions.length === 0 &&
          this.destination.complete();
      }),
      e
    );
  })(gr),
  O2 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.source = r), (i.subscriptionDelay = n), i;
    }
    return (
      (e.prototype._subscribe = function (r) {
        this.subscriptionDelay.subscribe(new N2(r, this.source));
      }),
      e
    );
  })(U),
  N2 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.parent = r), (i.source = n), (i.sourceSubscribed = !1), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.subscribeToSource();
      }),
      (e.prototype._error = function (r) {
        this.unsubscribe(), this.parent.error(r);
      }),
      (e.prototype._complete = function () {
        this.unsubscribe(), this.subscribeToSource();
      }),
      (e.prototype.subscribeToSource = function () {
        this.sourceSubscribed ||
          ((this.sourceSubscribed = !0),
          this.unsubscribe(),
          this.source.subscribe(this.parent));
      }),
      e
    );
  })(D);
function L2() {
  return function (e) {
    return e.lift(new P2());
  };
}
var P2 = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new D2(e));
      }),
      t
    );
  })(),
  D2 = (function (t) {
    I(e, t);
    function e(r) {
      return t.call(this, r) || this;
    }
    return (
      (e.prototype._next = function (r) {
        r.observe(this.destination);
      }),
      e
    );
  })(D);
function B2(t, e) {
  return function (r) {
    return r.lift(new j2(t, e));
  };
}
var j2 = (function () {
    function t(e, r) {
      (this.keySelector = e), (this.flushes = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new F2(e, this.keySelector, this.flushes));
      }),
      t
    );
  })(),
  F2 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.keySelector = n),
        (s.values = new Set()),
        i && s.add(fe(i, new ue(s))),
        s
      );
    }
    return (
      (e.prototype.notifyNext = function () {
        this.values.clear();
      }),
      (e.prototype.notifyError = function (r) {
        this._error(r);
      }),
      (e.prototype._next = function (r) {
        this.keySelector ? this._useKeySelector(r) : this._finalizeNext(r, r);
      }),
      (e.prototype._useKeySelector = function (r) {
        var n,
          i = this.destination;
        try {
          n = this.keySelector(r);
        } catch (s) {
          i.error(s);
          return;
        }
        this._finalizeNext(n, r);
      }),
      (e.prototype._finalizeNext = function (r, n) {
        var i = this.values;
        i.has(r) || (i.add(r), this.destination.next(n));
      }),
      e
    );
  })(le);
function Kh(t, e) {
  return function (r) {
    return r.lift(new $2(t, e));
  };
}
var $2 = (function () {
    function t(e, r) {
      (this.compare = e), (this.keySelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new W2(e, this.compare, this.keySelector));
      }),
      t
    );
  })(),
  W2 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.keySelector = i),
        (s.hasKey = !1),
        typeof n == 'function' && (s.compare = n),
        s
      );
    }
    return (
      (e.prototype.compare = function (r, n) {
        return r === n;
      }),
      (e.prototype._next = function (r) {
        var n;
        try {
          var i = this.keySelector;
          n = i ? i(r) : r;
        } catch (a) {
          return this.destination.error(a);
        }
        var s = !1;
        if (this.hasKey)
          try {
            var o = this.compare;
            s = o(this.key, n);
          } catch (a) {
            return this.destination.error(a);
          }
        else this.hasKey = !0;
        s || ((this.key = n), this.destination.next(r));
      }),
      e
    );
  })(D);
function H2(t, e) {
  return Kh(function (r, n) {
    return e ? e(r[t], n[t]) : r[t] === n[t];
  });
}
function bs(t) {
  return (
    t === void 0 && (t = z2),
    function (e) {
      return e.lift(new V2(t));
    }
  );
}
var V2 = (function () {
    function t(e) {
      this.errorFactory = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new U2(e, this.errorFactory));
      }),
      t
    );
  })(),
  U2 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.errorFactory = n), (i.hasValue = !1), i;
    }
    return (
      (e.prototype._next = function (r) {
        (this.hasValue = !0), this.destination.next(r);
      }),
      (e.prototype._complete = function () {
        if (this.hasValue) return this.destination.complete();
        var r = void 0;
        try {
          r = this.errorFactory();
        } catch (n) {
          r = n;
        }
        this.destination.error(r);
      }),
      e
    );
  })(D);
function z2() {
  return new Jn();
}
function Ec(t) {
  return function (e) {
    return t === 0 ? nn() : e.lift(new q2(t));
  };
}
var q2 = (function () {
    function t(e) {
      if (((this.total = e), this.total < 0)) throw new Ur();
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new J2(e, this.total));
      }),
      t
    );
  })(),
  J2 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.total = n), (i.count = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.total,
          i = ++this.count;
        i <= n &&
          (this.destination.next(r),
          i === n && (this.destination.complete(), this.unsubscribe()));
      }),
      e
    );
  })(D);
function G2(t, e) {
  if (t < 0) throw new Ur();
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      Ut(function (i, s) {
        return s === t;
      }),
      Ec(1),
      r
        ? Qn(e)
        : bs(function () {
            return new Ur();
          })
    );
  };
}
function Q2() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return xn(r, Xi.apply(void 0, t));
  };
}
function Z2(t, e) {
  return function (r) {
    return r.lift(new Y2(t, e, r));
  };
}
var Y2 = (function () {
    function t(e, r, n) {
      (this.predicate = e), (this.thisArg = r), (this.source = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new K2(e, this.predicate, this.thisArg, this.source)
        );
      }),
      t
    );
  })(),
  K2 = (function (t) {
    I(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.predicate = n),
        (o.thisArg = i),
        (o.source = s),
        (o.index = 0),
        (o.thisArg = i || o),
        o
      );
    }
    return (
      (e.prototype.notifyComplete = function (r) {
        this.destination.next(r), this.destination.complete();
      }),
      (e.prototype._next = function (r) {
        var n = !1;
        try {
          n = this.predicate.call(this.thisArg, r, this.index++, this.source);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        n || this.notifyComplete(!1);
      }),
      (e.prototype._complete = function () {
        this.notifyComplete(!0);
      }),
      e
    );
  })(D);
function X2() {
  return function (t) {
    return t.lift(new eS());
  };
}
var eS = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new tS(e));
      }),
      t
    );
  })(),
  tS = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.hasCompleted = !1), (n.hasSubscription = !1), n;
    }
    return (
      (e.prototype._next = function (r) {
        this.hasSubscription ||
          ((this.hasSubscription = !0), this.add(fe(r, new ue(this))));
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.hasSubscription || this.destination.complete();
      }),
      (e.prototype.notifyComplete = function () {
        (this.hasSubscription = !1),
          this.hasCompleted && this.destination.complete();
      }),
      e
    );
  })(le);
function Xh(t, e) {
  return e
    ? function (r) {
        return r.pipe(
          Xh(function (n, i) {
            return Mt(t(n, i)).pipe(
              Ye(function (s, o) {
                return e(n, s, i, o);
              })
            );
          })
        );
      }
    : function (r) {
        return r.lift(new rS(t));
      };
}
var rS = (function () {
    function t(e) {
      this.project = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new nS(e, this.project));
      }),
      t
    );
  })(),
  nS = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (
        (i.project = n),
        (i.hasSubscription = !1),
        (i.hasCompleted = !1),
        (i.index = 0),
        i
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.hasSubscription || this.tryNext(r);
      }),
      (e.prototype.tryNext = function (r) {
        var n,
          i = this.index++;
        try {
          n = this.project(r, i);
        } catch (s) {
          this.destination.error(s);
          return;
        }
        (this.hasSubscription = !0), this._innerSub(n);
      }),
      (e.prototype._innerSub = function (r) {
        var n = new ue(this),
          i = this.destination;
        i.add(n);
        var s = fe(r, n);
        s !== n && i.add(s);
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.hasSubscription || this.destination.complete(),
          this.unsubscribe();
      }),
      (e.prototype.notifyNext = function (r) {
        this.destination.next(r);
      }),
      (e.prototype.notifyError = function (r) {
        this.destination.error(r);
      }),
      (e.prototype.notifyComplete = function () {
        (this.hasSubscription = !1),
          this.hasCompleted && this.destination.complete();
      }),
      e
    );
  })(le);
function iS(t, e, r) {
  return (
    e === void 0 && (e = Number.POSITIVE_INFINITY),
    (e = (e || 0) < 1 ? Number.POSITIVE_INFINITY : e),
    function (n) {
      return n.lift(new sS(t, e, r));
    }
  );
}
var sS = (function () {
    function t(e, r, n) {
      (this.project = e), (this.concurrent = r), (this.scheduler = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new oS(e, this.project, this.concurrent, this.scheduler)
        );
      }),
      t
    );
  })(),
  oS = (function (t) {
    I(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.project = n),
        (o.concurrent = i),
        (o.scheduler = s),
        (o.index = 0),
        (o.active = 0),
        (o.hasCompleted = !1),
        i < Number.POSITIVE_INFINITY && (o.buffer = []),
        o
      );
    }
    return (
      (e.dispatch = function (r) {
        var n = r.subscriber,
          i = r.result,
          s = r.value,
          o = r.index;
        n.subscribeToProjection(i, s, o);
      }),
      (e.prototype._next = function (r) {
        var n = this.destination;
        if (n.closed) {
          this._complete();
          return;
        }
        var i = this.index++;
        if (this.active < this.concurrent) {
          n.next(r);
          try {
            var s = this.project,
              o = s(r, i);
            if (!this.scheduler) this.subscribeToProjection(o, r, i);
            else {
              var a = { subscriber: this, result: o, value: r, index: i },
                c = this.destination;
              c.add(this.scheduler.schedule(e.dispatch, 0, a));
            }
          } catch (u) {
            n.error(u);
          }
        } else this.buffer.push(r);
      }),
      (e.prototype.subscribeToProjection = function (r, n, i) {
        this.active++;
        var s = this.destination;
        s.add(fe(r, new ue(this)));
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.hasCompleted && this.active === 0 && this.destination.complete(),
          this.unsubscribe();
      }),
      (e.prototype.notifyNext = function (r) {
        this._next(r);
      }),
      (e.prototype.notifyComplete = function () {
        var r = this.buffer;
        this.active--,
          r && r.length > 0 && this._next(r.shift()),
          this.hasCompleted && this.active === 0 && this.destination.complete();
      }),
      e
    );
  })(le);
function aS(t) {
  return function (e) {
    return e.lift(new cS(t));
  };
}
var cS = (function () {
    function t(e) {
      this.callback = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new uS(e, this.callback));
      }),
      t
    );
  })(),
  uS = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return i.add(new ce(n)), i;
    }
    return e;
  })(D);
function lS(t, e) {
  if (typeof t != 'function')
    throw new TypeError('predicate is not a function');
  return function (r) {
    return r.lift(new ed(t, r, !1, e));
  };
}
var ed = (function () {
    function t(e, r, n, i) {
      (this.predicate = e),
        (this.source = r),
        (this.yieldIndex = n),
        (this.thisArg = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new fS(e, this.predicate, this.source, this.yieldIndex, this.thisArg)
        );
      }),
      t
    );
  })(),
  fS = (function (t) {
    I(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      return (
        (a.predicate = n),
        (a.source = i),
        (a.yieldIndex = s),
        (a.thisArg = o),
        (a.index = 0),
        a
      );
    }
    return (
      (e.prototype.notifyComplete = function (r) {
        var n = this.destination;
        n.next(r), n.complete(), this.unsubscribe();
      }),
      (e.prototype._next = function (r) {
        var n = this,
          i = n.predicate,
          s = n.thisArg,
          o = this.index++;
        try {
          var a = i.call(s || this, r, o, this.source);
          a && this.notifyComplete(this.yieldIndex ? o : r);
        } catch (c) {
          this.destination.error(c);
        }
      }),
      (e.prototype._complete = function () {
        this.notifyComplete(this.yieldIndex ? -1 : void 0);
      }),
      e
    );
  })(D);
function hS(t, e) {
  return function (r) {
    return r.lift(new ed(t, r, !0, e));
  };
}
function dS(t, e) {
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      t
        ? Ut(function (i, s) {
            return t(i, s, n);
          })
        : Ht,
      Ec(1),
      r
        ? Qn(e)
        : bs(function () {
            return new Jn();
          })
    );
  };
}
function pS() {
  return function (e) {
    return e.lift(new bS());
  };
}
var bS = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new gS(e));
      }),
      t
    );
  })(),
  gS = (function (t) {
    I(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (e.prototype._next = function (r) {}), e;
  })(D);
function yS() {
  return function (t) {
    return t.lift(new vS());
  };
}
var vS = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new mS(e));
      }),
      t
    );
  })(),
  mS = (function (t) {
    I(e, t);
    function e(r) {
      return t.call(this, r) || this;
    }
    return (
      (e.prototype.notifyComplete = function (r) {
        var n = this.destination;
        n.next(r), n.complete();
      }),
      (e.prototype._next = function (r) {
        this.notifyComplete(!1);
      }),
      (e.prototype._complete = function () {
        this.notifyComplete(!0);
      }),
      e
    );
  })(D);
function Si(t) {
  return function (r) {
    return t === 0 ? nn() : r.lift(new wS(t));
  };
}
var wS = (function () {
    function t(e) {
      if (((this.total = e), this.total < 0)) throw new Ur();
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new _S(e, this.total));
      }),
      t
    );
  })(),
  _S = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.total = n), (i.ring = new Array()), (i.count = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.ring,
          i = this.total,
          s = this.count++;
        if (n.length < i) n.push(r);
        else {
          var o = s % i;
          n[o] = r;
        }
      }),
      (e.prototype._complete = function () {
        var r = this.destination,
          n = this.count;
        if (n > 0)
          for (
            var i = this.count >= this.total ? this.total : this.count,
              s = this.ring,
              o = 0;
            o < i;
            o++
          ) {
            var a = n++ % i;
            r.next(s[a]);
          }
        r.complete();
      }),
      e
    );
  })(D);
function SS(t, e) {
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      t
        ? Ut(function (i, s) {
            return t(i, s, n);
          })
        : Ht,
      Si(1),
      r
        ? Qn(e)
        : bs(function () {
            return new Jn();
          })
    );
  };
}
function ES(t) {
  return function (e) {
    return e.lift(new CS(t));
  };
}
var CS = (function () {
    function t(e) {
      this.value = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new xS(e, this.value));
      }),
      t
    );
  })(),
  xS = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.value = n), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.destination.next(this.value);
      }),
      e
    );
  })(D);
function IS() {
  return function (e) {
    return e.lift(new kS());
  };
}
var kS = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new MS(e));
      }),
      t
    );
  })(),
  MS = (function (t) {
    I(e, t);
    function e(r) {
      return t.call(this, r) || this;
    }
    return (
      (e.prototype._next = function (r) {
        this.destination.next(xt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        var n = this.destination;
        n.next(xt.createError(r)), n.complete();
      }),
      (e.prototype._complete = function () {
        var r = this.destination;
        r.next(xt.createComplete()), r.complete();
      }),
      e
    );
  })(D);
function Ei(t, e) {
  var r = !1;
  return (
    arguments.length >= 2 && (r = !0),
    function (i) {
      return i.lift(new RS(t, e, r));
    }
  );
}
var RS = (function () {
    function t(e, r, n) {
      n === void 0 && (n = !1),
        (this.accumulator = e),
        (this.seed = r),
        (this.hasSeed = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new AS(e, this.accumulator, this.seed, this.hasSeed)
        );
      }),
      t
    );
  })(),
  AS = (function (t) {
    I(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.accumulator = n), (o._seed = i), (o.hasSeed = s), (o.index = 0), o
      );
    }
    return (
      Object.defineProperty(e.prototype, 'seed', {
        get: function () {
          return this._seed;
        },
        set: function (r) {
          (this.hasSeed = !0), (this._seed = r);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e.prototype._next = function (r) {
        if (!this.hasSeed) (this.seed = r), this.destination.next(r);
        else return this._tryNext(r);
      }),
      (e.prototype._tryNext = function (r) {
        var n = this.index++,
          i;
        try {
          i = this.accumulator(this.seed, r, n);
        } catch (s) {
          this.destination.error(s);
        }
        (this.seed = i), this.destination.next(i);
      }),
      e
    );
  })(D);
function gs(t, e) {
  return arguments.length >= 2
    ? function (n) {
        return ga(Ei(t, e), Si(1), Qn(e))(n);
      }
    : function (n) {
        return ga(
          Ei(function (i, s, o) {
            return t(i, s, o + 1);
          }),
          Si(1)
        )(n);
      };
}
function TS(t) {
  var e =
    typeof t == 'function'
      ? function (r, n) {
          return t(r, n) > 0 ? r : n;
        }
      : function (r, n) {
          return r > n ? r : n;
        };
  return gs(e);
}
function OS() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return r.lift.call(Rh.apply(void 0, [r].concat(t)));
  };
}
function NS(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    typeof e == 'function'
      ? or(
          function () {
            return t;
          },
          e,
          r
        )
      : (typeof e == 'number' && (r = e),
        or(function () {
          return t;
        }, r))
  );
}
function LS(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    function (n) {
      return n.lift(new PS(t, e, r));
    }
  );
}
var PS = (function () {
    function t(e, r, n) {
      (this.accumulator = e), (this.seed = r), (this.concurrent = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new DS(e, this.accumulator, this.seed, this.concurrent)
        );
      }),
      t
    );
  })(),
  DS = (function (t) {
    I(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.accumulator = n),
        (o.acc = i),
        (o.concurrent = s),
        (o.hasValue = !1),
        (o.hasCompleted = !1),
        (o.buffer = []),
        (o.active = 0),
        (o.index = 0),
        o
      );
    }
    return (
      (e.prototype._next = function (r) {
        if (this.active < this.concurrent) {
          var n = this.index++,
            i = this.destination,
            s = void 0;
          try {
            var o = this.accumulator;
            s = o(this.acc, r, n);
          } catch (a) {
            return i.error(a);
          }
          this.active++, this._innerSub(s);
        } else this.buffer.push(r);
      }),
      (e.prototype._innerSub = function (r) {
        var n = new ue(this),
          i = this.destination;
        i.add(n);
        var s = fe(r, n);
        s !== n && i.add(s);
      }),
      (e.prototype._complete = function () {
        (this.hasCompleted = !0),
          this.active === 0 &&
            this.buffer.length === 0 &&
            (this.hasValue === !1 && this.destination.next(this.acc),
            this.destination.complete()),
          this.unsubscribe();
      }),
      (e.prototype.notifyNext = function (r) {
        var n = this.destination;
        (this.acc = r), (this.hasValue = !0), n.next(r);
      }),
      (e.prototype.notifyComplete = function () {
        var r = this.buffer;
        this.active--,
          r.length > 0
            ? this._next(r.shift())
            : this.active === 0 &&
              this.hasCompleted &&
              (this.hasValue === !1 && this.destination.next(this.acc),
              this.destination.complete());
      }),
      e
    );
  })(le);
function BS(t) {
  var e =
    typeof t == 'function'
      ? function (r, n) {
          return t(r, n) < 0 ? r : n;
        }
      : function (r, n) {
          return r < n ? r : n;
        };
  return gs(e);
}
function ar(t, e) {
  return function (n) {
    var i;
    if (
      (typeof t == 'function'
        ? (i = t)
        : (i = function () {
            return t;
          }),
      typeof e == 'function')
    )
      return n.lift(new jS(i, e));
    var s = Object.create(n, Im);
    return (s.source = n), (s.subjectFactory = i), s;
  };
}
var jS = (function () {
  function t(e, r) {
    (this.subjectFactory = e), (this.selector = r);
  }
  return (
    (t.prototype.call = function (e, r) {
      var n = this.selector,
        i = this.subjectFactory(),
        s = n(i).subscribe(e);
      return s.add(r.subscribe(i)), s;
    }),
    t
  );
})();
function FS() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return (
    t.length === 1 && Te(t[0]) && (t = t[0]),
    function (r) {
      return r.lift(new $S(t));
    }
  );
}
var $S = (function () {
    function t(e) {
      this.nextSources = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new WS(e, this.nextSources));
      }),
      t
    );
  })(),
  WS = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.destination = r), (i.nextSources = n), i;
    }
    return (
      (e.prototype.notifyError = function () {
        this.subscribeToNextSource();
      }),
      (e.prototype.notifyComplete = function () {
        this.subscribeToNextSource();
      }),
      (e.prototype._error = function (r) {
        this.subscribeToNextSource(), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.subscribeToNextSource(), this.unsubscribe();
      }),
      (e.prototype.subscribeToNextSource = function () {
        var r = this.nextSources.shift();
        if (r) {
          var n = new ue(this),
            i = this.destination;
          i.add(n);
          var s = fe(r, n);
          s !== n && i.add(s);
        } else this.destination.complete();
      }),
      e
    );
  })(le);
function HS() {
  return function (t) {
    return t.lift(new VS());
  };
}
var VS = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new US(e));
      }),
      t
    );
  })(),
  US = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.hasPrev = !1), n;
    }
    return (
      (e.prototype._next = function (r) {
        var n;
        this.hasPrev ? (n = [this.prev, r]) : (this.hasPrev = !0),
          (this.prev = r),
          n && this.destination.next(n);
      }),
      e
    );
  })(D);
function zS(t, e) {
  return function (r) {
    return [Ut(t, e)(r), Ut(Th(t, e))(r)];
  };
}
function qS() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t.length;
  if (r === 0) throw new Error('list of properties cannot be empty.');
  return function (n) {
    return Ye(JS(t, r))(n);
  };
}
function JS(t, e) {
  var r = function (n) {
    for (var i = n, s = 0; s < e; s++) {
      var o = i?.[t[s]];
      if (o !== void 0) i = o;
      else return;
    }
    return i;
  };
  return r;
}
function GS(t) {
  return t
    ? ar(function () {
        return new _e();
      }, t)
    : ar(new _e());
}
function QS(t) {
  return function (e) {
    return ar(new lh(t))(e);
  };
}
function ZS() {
  return function (t) {
    return ar(new sn())(t);
  };
}
function YS(t, e, r, n) {
  r && typeof r != 'function' && (n = r);
  var i = typeof r == 'function' ? r : void 0,
    s = new uc(t, e, n);
  return function (o) {
    return ar(function () {
      return s;
    }, i)(o);
  };
}
function KS() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (n) {
    return (
      t.length === 1 && Te(t[0]) && (t = t[0]),
      n.lift.call(Oh.apply(void 0, [n].concat(t)))
    );
  };
}
function XS(t) {
  return (
    t === void 0 && (t = -1),
    function (e) {
      return t === 0
        ? nn()
        : t < 0
          ? e.lift(new bl(-1, e))
          : e.lift(new bl(t - 1, e));
    }
  );
}
var bl = (function () {
    function t(e, r) {
      (this.count = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new eE(e, this.count, this.source));
      }),
      t
    );
  })(),
  eE = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.count = n), (s.source = i), s;
    }
    return (
      (e.prototype.complete = function () {
        if (!this.isStopped) {
          var r = this,
            n = r.source,
            i = r.count;
          if (i === 0) return t.prototype.complete.call(this);
          i > -1 && (this.count = i - 1),
            n.subscribe(this._unsubscribeAndRecycle());
        }
      }),
      e
    );
  })(D);
function tE(t) {
  return function (e) {
    return e.lift(new rE(t));
  };
}
var rE = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new nE(e, this.notifier, r));
      }),
      t
    );
  })(),
  nE = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.notifier = n), (s.source = i), (s.sourceIsBeingSubscribedTo = !0), s
      );
    }
    return (
      (e.prototype.notifyNext = function () {
        (this.sourceIsBeingSubscribedTo = !0), this.source.subscribe(this);
      }),
      (e.prototype.notifyComplete = function () {
        if (this.sourceIsBeingSubscribedTo === !1)
          return t.prototype.complete.call(this);
      }),
      (e.prototype.complete = function () {
        if (((this.sourceIsBeingSubscribedTo = !1), !this.isStopped)) {
          if (
            (this.retries || this.subscribeToRetries(),
            !this.retriesSubscription || this.retriesSubscription.closed)
          )
            return t.prototype.complete.call(this);
          this._unsubscribeAndRecycle(), this.notifications.next(void 0);
        }
      }),
      (e.prototype._unsubscribe = function () {
        var r = this,
          n = r.notifications,
          i = r.retriesSubscription;
        n && (n.unsubscribe(), (this.notifications = void 0)),
          i && (i.unsubscribe(), (this.retriesSubscription = void 0)),
          (this.retries = void 0);
      }),
      (e.prototype._unsubscribeAndRecycle = function () {
        var r = this._unsubscribe;
        return (
          (this._unsubscribe = null),
          t.prototype._unsubscribeAndRecycle.call(this),
          (this._unsubscribe = r),
          this
        );
      }),
      (e.prototype.subscribeToRetries = function () {
        this.notifications = new _e();
        var r;
        try {
          var n = this.notifier;
          r = n(this.notifications);
        } catch {
          return t.prototype.complete.call(this);
        }
        (this.retries = r), (this.retriesSubscription = fe(r, new ue(this)));
      }),
      e
    );
  })(le);
function iE(t) {
  return (
    t === void 0 && (t = -1),
    function (e) {
      return e.lift(new sE(t, e));
    }
  );
}
var sE = (function () {
    function t(e, r) {
      (this.count = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new oE(e, this.count, this.source));
      }),
      t
    );
  })(),
  oE = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.count = n), (s.source = i), s;
    }
    return (
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = this,
            i = n.source,
            s = n.count;
          if (s === 0) return t.prototype.error.call(this, r);
          s > -1 && (this.count = s - 1),
            i.subscribe(this._unsubscribeAndRecycle());
        }
      }),
      e
    );
  })(D);
function aE(t) {
  return function (e) {
    return e.lift(new cE(t, e));
  };
}
var cE = (function () {
    function t(e, r) {
      (this.notifier = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new uE(e, this.notifier, this.source));
      }),
      t
    );
  })(),
  uE = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.notifier = n), (s.source = i), s;
    }
    return (
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = this.errors,
            i = this.retries,
            s = this.retriesSubscription;
          if (i) (this.errors = void 0), (this.retriesSubscription = void 0);
          else {
            n = new _e();
            try {
              var o = this.notifier;
              i = o(n);
            } catch (a) {
              return t.prototype.error.call(this, a);
            }
            s = fe(i, new ue(this));
          }
          this._unsubscribeAndRecycle(),
            (this.errors = n),
            (this.retries = i),
            (this.retriesSubscription = s),
            n.next(r);
        }
      }),
      (e.prototype._unsubscribe = function () {
        var r = this,
          n = r.errors,
          i = r.retriesSubscription;
        n && (n.unsubscribe(), (this.errors = void 0)),
          i && (i.unsubscribe(), (this.retriesSubscription = void 0)),
          (this.retries = void 0);
      }),
      (e.prototype.notifyNext = function () {
        var r = this._unsubscribe;
        (this._unsubscribe = null),
          this._unsubscribeAndRecycle(),
          (this._unsubscribe = r),
          this.source.subscribe(this);
      }),
      e
    );
  })(le);
function lE(t) {
  return function (e) {
    return e.lift(new fE(t));
  };
}
var fE = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new hE(e),
          i = r.subscribe(n);
        return i.add(fe(this.notifier, new ue(n))), i;
      }),
      t
    );
  })(),
  hE = (function (t) {
    I(e, t);
    function e() {
      var r = (t !== null && t.apply(this, arguments)) || this;
      return (r.hasValue = !1), r;
    }
    return (
      (e.prototype._next = function (r) {
        (this.value = r), (this.hasValue = !0);
      }),
      (e.prototype.notifyNext = function () {
        this.emitValue();
      }),
      (e.prototype.notifyComplete = function () {
        this.emitValue();
      }),
      (e.prototype.emitValue = function () {
        this.hasValue &&
          ((this.hasValue = !1), this.destination.next(this.value));
      }),
      e
    );
  })(le);
function dE(t, e) {
  return (
    e === void 0 && (e = Oe),
    function (r) {
      return r.lift(new pE(t, e));
    }
  );
}
var pE = (function () {
    function t(e, r) {
      (this.period = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new bE(e, this.period, this.scheduler));
      }),
      t
    );
  })(),
  bE = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.period = n),
        (s.scheduler = i),
        (s.hasValue = !1),
        s.add(i.schedule(gE, n, { subscriber: s, period: n })),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        (this.lastValue = r), (this.hasValue = !0);
      }),
      (e.prototype.notifyNext = function () {
        this.hasValue &&
          ((this.hasValue = !1), this.destination.next(this.lastValue));
      }),
      e
    );
  })(D);
function gE(t) {
  var e = t.subscriber,
    r = t.period;
  e.notifyNext(), this.schedule(t, r);
}
function yE(t, e) {
  return function (r) {
    return r.lift(new vE(t, e));
  };
}
var vE = (function () {
    function t(e, r) {
      (this.compareTo = e), (this.comparator = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new mE(e, this.compareTo, this.comparator));
      }),
      t
    );
  })(),
  mE = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.compareTo = n),
        (s.comparator = i),
        (s._a = []),
        (s._b = []),
        (s._oneComplete = !1),
        s.destination.add(n.subscribe(new wE(r, s))),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        this._oneComplete && this._b.length === 0
          ? this.emit(!1)
          : (this._a.push(r), this.checkValues());
      }),
      (e.prototype._complete = function () {
        this._oneComplete
          ? this.emit(this._a.length === 0 && this._b.length === 0)
          : (this._oneComplete = !0),
          this.unsubscribe();
      }),
      (e.prototype.checkValues = function () {
        for (
          var r = this, n = r._a, i = r._b, s = r.comparator;
          n.length > 0 && i.length > 0;

        ) {
          var o = n.shift(),
            a = i.shift(),
            c = !1;
          try {
            c = s ? s(o, a) : o === a;
          } catch (u) {
            this.destination.error(u);
          }
          c || this.emit(!1);
        }
      }),
      (e.prototype.emit = function (r) {
        var n = this.destination;
        n.next(r), n.complete();
      }),
      (e.prototype.nextB = function (r) {
        this._oneComplete && this._a.length === 0
          ? this.emit(!1)
          : (this._b.push(r), this.checkValues());
      }),
      (e.prototype.completeB = function () {
        this._oneComplete
          ? this.emit(this._a.length === 0 && this._b.length === 0)
          : (this._oneComplete = !0);
      }),
      e
    );
  })(D),
  wE = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.parent = n), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.parent.nextB(r);
      }),
      (e.prototype._error = function (r) {
        this.parent.error(r), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.parent.completeB(), this.unsubscribe();
      }),
      e
    );
  })(D);
function _E() {
  return new _e();
}
function SE() {
  return function (t) {
    return oc()(ar(_E)(t));
  };
}
function EE(t, e, r) {
  var n;
  return (
    t && typeof t == 'object'
      ? (n = t)
      : (n = { bufferSize: t, windowTime: e, refCount: !1, scheduler: r }),
    function (i) {
      return i.lift(CE(n));
    }
  );
}
function CE(t) {
  var e = t.bufferSize,
    r = e === void 0 ? Number.POSITIVE_INFINITY : e,
    n = t.windowTime,
    i = n === void 0 ? Number.POSITIVE_INFINITY : n,
    s = t.refCount,
    o = t.scheduler,
    a,
    c = 0,
    u,
    l = !1,
    f = !1;
  return function (y) {
    c++;
    var _;
    !a || l
      ? ((l = !1),
        (a = new uc(r, i, o)),
        (_ = a.subscribe(this)),
        (u = y.subscribe({
          next: function (x) {
            a.next(x);
          },
          error: function (x) {
            (l = !0), a.error(x);
          },
          complete: function () {
            (f = !0), (u = void 0), a.complete();
          },
        })),
        f && (u = void 0))
      : (_ = a.subscribe(this)),
      this.add(function () {
        c--,
          _.unsubscribe(),
          (_ = void 0),
          u &&
            !f &&
            s &&
            c === 0 &&
            (u.unsubscribe(), (u = void 0), (a = void 0));
      });
  };
}
function xE(t) {
  return function (e) {
    return e.lift(new IE(t, e));
  };
}
var IE = (function () {
    function t(e, r) {
      (this.predicate = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new kE(e, this.predicate, this.source));
      }),
      t
    );
  })(),
  kE = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.predicate = n), (s.source = i), (s.seenValue = !1), (s.index = 0), s
      );
    }
    return (
      (e.prototype.applySingleValue = function (r) {
        this.seenValue
          ? this.destination.error('Sequence contains more than one element')
          : ((this.seenValue = !0), (this.singleValue = r));
      }),
      (e.prototype._next = function (r) {
        var n = this.index++;
        this.predicate ? this.tryNext(r, n) : this.applySingleValue(r);
      }),
      (e.prototype.tryNext = function (r, n) {
        try {
          this.predicate(r, n, this.source) && this.applySingleValue(r);
        } catch (i) {
          this.destination.error(i);
        }
      }),
      (e.prototype._complete = function () {
        var r = this.destination;
        this.index > 0
          ? (r.next(this.seenValue ? this.singleValue : void 0), r.complete())
          : r.error(new Jn());
      }),
      e
    );
  })(D);
function ME(t) {
  return function (e) {
    return e.lift(new RE(t));
  };
}
var RE = (function () {
    function t(e) {
      this.total = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new AE(e, this.total));
      }),
      t
    );
  })(),
  AE = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.total = n), (i.count = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        ++this.count > this.total && this.destination.next(r);
      }),
      e
    );
  })(D);
function TE(t) {
  return function (e) {
    return e.lift(new OE(t));
  };
}
var OE = (function () {
    function t(e) {
      if (((this._skipCount = e), this._skipCount < 0)) throw new Ur();
    }
    return (
      (t.prototype.call = function (e, r) {
        return this._skipCount === 0
          ? r.subscribe(new D(e))
          : r.subscribe(new NE(e, this._skipCount));
      }),
      t
    );
  })(),
  NE = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i._skipCount = n), (i._count = 0), (i._ring = new Array(n)), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this._skipCount,
          i = this._count++;
        if (i < n) this._ring[i] = r;
        else {
          var s = i % n,
            o = this._ring,
            a = o[s];
          (o[s] = r), this.destination.next(a);
        }
      }),
      e
    );
  })(D);
function LE(t) {
  return function (e) {
    return e.lift(new PE(t));
  };
}
var PE = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new DE(e, this.notifier));
      }),
      t
    );
  })(),
  DE = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      i.hasValue = !1;
      var s = new ue(i);
      i.add(s), (i.innerSubscription = s);
      var o = fe(n, s);
      return o !== s && (i.add(o), (i.innerSubscription = o)), i;
    }
    return (
      (e.prototype._next = function (r) {
        this.hasValue && t.prototype._next.call(this, r);
      }),
      (e.prototype.notifyNext = function () {
        (this.hasValue = !0),
          this.innerSubscription && this.innerSubscription.unsubscribe();
      }),
      (e.prototype.notifyComplete = function () {}),
      e
    );
  })(le);
function BE(t) {
  return function (e) {
    return e.lift(new jE(t));
  };
}
var jE = (function () {
    function t(e) {
      this.predicate = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new FE(e, this.predicate));
      }),
      t
    );
  })(),
  FE = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.predicate = n), (i.skipping = !0), (i.index = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.destination;
        this.skipping && this.tryCallPredicate(r), this.skipping || n.next(r);
      }),
      (e.prototype.tryCallPredicate = function (r) {
        try {
          var n = this.predicate(r, this.index++);
          this.skipping = !!n;
        } catch (i) {
          this.destination.error(i);
        }
      }),
      e
    );
  })(D);
function $E() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return $e(r)
    ? (t.pop(),
      function (n) {
        return xn(t, n, r);
      })
    : function (n) {
        return xn(t, n);
      };
}
var WE = (function (t) {
  I(e, t);
  function e(r, n, i) {
    n === void 0 && (n = 0), i === void 0 && (i = hi);
    var s = t.call(this) || this;
    return (
      (s.source = r),
      (s.delayTime = n),
      (s.scheduler = i),
      (!zr(n) || n < 0) && (s.delayTime = 0),
      (!i || typeof i.schedule != 'function') && (s.scheduler = hi),
      s
    );
  }
  return (
    (e.create = function (r, n, i) {
      return n === void 0 && (n = 0), i === void 0 && (i = hi), new e(r, n, i);
    }),
    (e.dispatch = function (r) {
      var n = r.source,
        i = r.subscriber;
      return this.add(n.subscribe(i));
    }),
    (e.prototype._subscribe = function (r) {
      var n = this.delayTime,
        i = this.source,
        s = this.scheduler;
      return s.schedule(e.dispatch, n, { source: i, subscriber: r });
    }),
    e
  );
})(U);
function HE(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new VE(t, e));
    }
  );
}
var VE = (function () {
  function t(e, r) {
    (this.scheduler = e), (this.delay = r);
  }
  return (
    (t.prototype.call = function (e, r) {
      return new WE(r, this.delay, this.scheduler).subscribe(e);
    }),
    t
  );
})();
function In(t, e) {
  return typeof e == 'function'
    ? function (r) {
        return r.pipe(
          In(function (n, i) {
            return Mt(t(n, i)).pipe(
              Ye(function (s, o) {
                return e(n, s, i, o);
              })
            );
          })
        );
      }
    : function (r) {
        return r.lift(new UE(t));
      };
}
var UE = (function () {
    function t(e) {
      this.project = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new zE(e, this.project));
      }),
      t
    );
  })(),
  zE = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.project = n), (i.index = 0), i;
    }
    return (
      (e.prototype._next = function (r) {
        var n,
          i = this.index++;
        try {
          n = this.project(r, i);
        } catch (s) {
          this.destination.error(s);
          return;
        }
        this._innerSub(n);
      }),
      (e.prototype._innerSub = function (r) {
        var n = this.innerSubscription;
        n && n.unsubscribe();
        var i = new ue(this),
          s = this.destination;
        s.add(i),
          (this.innerSubscription = fe(r, i)),
          this.innerSubscription !== i && s.add(this.innerSubscription);
      }),
      (e.prototype._complete = function () {
        var r = this.innerSubscription;
        (!r || r.closed) && t.prototype._complete.call(this),
          this.unsubscribe();
      }),
      (e.prototype._unsubscribe = function () {
        this.innerSubscription = void 0;
      }),
      (e.prototype.notifyComplete = function () {
        (this.innerSubscription = void 0),
          this.isStopped && t.prototype._complete.call(this);
      }),
      (e.prototype.notifyNext = function (r) {
        this.destination.next(r);
      }),
      e
    );
  })(le);
function qE() {
  return In(Ht);
}
function JE(t, e) {
  return e
    ? In(function () {
        return t;
      }, e)
    : In(function () {
        return t;
      });
}
function GE(t) {
  return function (e) {
    return e.lift(new QE(t));
  };
}
var QE = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new ZE(e),
          i = fe(this.notifier, new ue(n));
        return i && !n.seenValue ? (n.add(i), r.subscribe(n)) : n;
      }),
      t
    );
  })(),
  ZE = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.seenValue = !1), n;
    }
    return (
      (e.prototype.notifyNext = function () {
        (this.seenValue = !0), this.complete();
      }),
      (e.prototype.notifyComplete = function () {}),
      e
    );
  })(le);
function YE(t, e) {
  return (
    e === void 0 && (e = !1),
    function (r) {
      return r.lift(new KE(t, e));
    }
  );
}
var KE = (function () {
    function t(e, r) {
      (this.predicate = e), (this.inclusive = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new XE(e, this.predicate, this.inclusive));
      }),
      t
    );
  })(),
  XE = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.predicate = n), (s.inclusive = i), (s.index = 0), s;
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.destination,
          i;
        try {
          i = this.predicate(r, this.index++);
        } catch (s) {
          n.error(s);
          return;
        }
        this.nextOrComplete(r, i);
      }),
      (e.prototype.nextOrComplete = function (r, n) {
        var i = this.destination;
        n ? i.next(r) : (this.inclusive && i.next(r), i.complete());
      }),
      e
    );
  })(D);
function e3(t, e, r) {
  return function (i) {
    return i.lift(new t3(t, e, r));
  };
}
var t3 = (function () {
    function t(e, r, n) {
      (this.nextOrObserver = e), (this.error = r), (this.complete = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new r3(e, this.nextOrObserver, this.error, this.complete)
        );
      }),
      t
    );
  })(),
  r3 = (function (t) {
    I(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o._tapNext = ft),
        (o._tapError = ft),
        (o._tapComplete = ft),
        (o._tapError = i || ft),
        (o._tapComplete = s || ft),
        Hr(n)
          ? ((o._context = o), (o._tapNext = n))
          : n &&
            ((o._context = n),
            (o._tapNext = n.next || ft),
            (o._tapError = n.error || ft),
            (o._tapComplete = n.complete || ft)),
        o
      );
    }
    return (
      (e.prototype._next = function (r) {
        try {
          this._tapNext.call(this._context, r);
        } catch (n) {
          this.destination.error(n);
          return;
        }
        this.destination.next(r);
      }),
      (e.prototype._error = function (r) {
        try {
          this._tapError.call(this._context, r);
        } catch (n) {
          this.destination.error(n);
          return;
        }
        this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        try {
          this._tapComplete.call(this._context);
        } catch (r) {
          this.destination.error(r);
          return;
        }
        return this.destination.complete();
      }),
      e
    );
  })(D),
  td = { leading: !0, trailing: !1 };
function n3(t, e) {
  return (
    e === void 0 && (e = td),
    function (r) {
      return r.lift(new i3(t, !!e.leading, !!e.trailing));
    }
  );
}
var i3 = (function () {
    function t(e, r, n) {
      (this.durationSelector = e), (this.leading = r), (this.trailing = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new s3(e, this.durationSelector, this.leading, this.trailing)
        );
      }),
      t
    );
  })(),
  s3 = (function (t) {
    I(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o.destination = r),
        (o.durationSelector = n),
        (o._leading = i),
        (o._trailing = s),
        (o._hasValue = !1),
        o
      );
    }
    return (
      (e.prototype._next = function (r) {
        (this._hasValue = !0),
          (this._sendValue = r),
          this._throttled || (this._leading ? this.send() : this.throttle(r));
      }),
      (e.prototype.send = function () {
        var r = this,
          n = r._hasValue,
          i = r._sendValue;
        n && (this.destination.next(i), this.throttle(i)),
          (this._hasValue = !1),
          (this._sendValue = void 0);
      }),
      (e.prototype.throttle = function (r) {
        var n = this.tryDurationSelector(r);
        n && this.add((this._throttled = fe(n, new ue(this))));
      }),
      (e.prototype.tryDurationSelector = function (r) {
        try {
          return this.durationSelector(r);
        } catch (n) {
          return this.destination.error(n), null;
        }
      }),
      (e.prototype.throttlingDone = function () {
        var r = this,
          n = r._throttled,
          i = r._trailing;
        n && n.unsubscribe(), (this._throttled = void 0), i && this.send();
      }),
      (e.prototype.notifyNext = function () {
        this.throttlingDone();
      }),
      (e.prototype.notifyComplete = function () {
        this.throttlingDone();
      }),
      e
    );
  })(le);
function o3(t, e, r) {
  return (
    e === void 0 && (e = Oe),
    r === void 0 && (r = td),
    function (n) {
      return n.lift(new a3(t, e, r.leading, r.trailing));
    }
  );
}
var a3 = (function () {
    function t(e, r, n, i) {
      (this.duration = e),
        (this.scheduler = r),
        (this.leading = n),
        (this.trailing = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new c3(e, this.duration, this.scheduler, this.leading, this.trailing)
        );
      }),
      t
    );
  })(),
  c3 = (function (t) {
    I(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      return (
        (a.duration = n),
        (a.scheduler = i),
        (a.leading = s),
        (a.trailing = o),
        (a._hasTrailingValue = !1),
        (a._trailingValue = null),
        a
      );
    }
    return (
      (e.prototype._next = function (r) {
        this.throttled
          ? this.trailing &&
            ((this._trailingValue = r), (this._hasTrailingValue = !0))
          : (this.add(
              (this.throttled = this.scheduler.schedule(u3, this.duration, {
                subscriber: this,
              }))
            ),
            this.leading
              ? this.destination.next(r)
              : this.trailing &&
                ((this._trailingValue = r), (this._hasTrailingValue = !0)));
      }),
      (e.prototype._complete = function () {
        this._hasTrailingValue
          ? (this.destination.next(this._trailingValue),
            this.destination.complete())
          : this.destination.complete();
      }),
      (e.prototype.clearThrottle = function () {
        var r = this.throttled;
        r &&
          (this.trailing &&
            this._hasTrailingValue &&
            (this.destination.next(this._trailingValue),
            (this._trailingValue = null),
            (this._hasTrailingValue = !1)),
          r.unsubscribe(),
          this.remove(r),
          (this.throttled = null));
      }),
      e
    );
  })(D);
function u3(t) {
  var e = t.subscriber;
  e.clearThrottle();
}
function l3(t) {
  return (
    t === void 0 && (t = Oe),
    function (e) {
      return hc(function () {
        return e.pipe(
          Ei(
            function (r, n) {
              var i = r.current;
              return { value: n, current: t.now(), last: i };
            },
            { current: t.now(), value: void 0, last: void 0 }
          ),
          Ye(function (r) {
            var n = r.current,
              i = r.last,
              s = r.value;
            return new f3(s, n - i);
          })
        );
      });
    }
  );
}
var f3 = (function () {
  function t(e, r) {
    (this.value = e), (this.interval = r);
  }
  return t;
})();
function rd(t, e, r) {
  return (
    r === void 0 && (r = Oe),
    function (n) {
      var i = Yh(t),
        s = i ? +t - r.now() : Math.abs(t);
      return n.lift(new h3(s, i, e, r));
    }
  );
}
var h3 = (function () {
    function t(e, r, n, i) {
      (this.waitFor = e),
        (this.absoluteTimeout = r),
        (this.withObservable = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new d3(
            e,
            this.absoluteTimeout,
            this.waitFor,
            this.withObservable,
            this.scheduler
          )
        );
      }),
      t
    );
  })(),
  d3 = (function (t) {
    I(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      return (
        (a.absoluteTimeout = n),
        (a.waitFor = i),
        (a.withObservable = s),
        (a.scheduler = o),
        a.scheduleTimeout(),
        a
      );
    }
    return (
      (e.dispatchTimeout = function (r) {
        var n = r.withObservable;
        r._unsubscribeAndRecycle(), r.add(fe(n, new ue(r)));
      }),
      (e.prototype.scheduleTimeout = function () {
        var r = this.action;
        r
          ? (this.action = r.schedule(this, this.waitFor))
          : this.add(
              (this.action = this.scheduler.schedule(
                e.dispatchTimeout,
                this.waitFor,
                this
              ))
            );
      }),
      (e.prototype._next = function (r) {
        this.absoluteTimeout || this.scheduleTimeout(),
          t.prototype._next.call(this, r);
      }),
      (e.prototype._unsubscribe = function () {
        (this.action = void 0),
          (this.scheduler = null),
          (this.withObservable = null);
      }),
      e
    );
  })(le);
function p3(t, e) {
  return e === void 0 && (e = Oe), rd(t, cc(new mh()), e);
}
function b3(t) {
  return (
    t === void 0 && (t = Oe),
    Ye(function (e) {
      return new g3(e, t.now());
    })
  );
}
var g3 = (function () {
  function t(e, r) {
    (this.value = e), (this.timestamp = r);
  }
  return t;
})();
function y3(t, e, r) {
  return r === 0 ? [e] : (t.push(e), t);
}
function v3() {
  return gs(y3, []);
}
function m3(t) {
  return function (r) {
    return r.lift(new w3(t));
  };
}
var w3 = (function () {
    function t(e) {
      this.windowBoundaries = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new _3(e),
          i = r.subscribe(n);
        return i.closed || n.add(fe(this.windowBoundaries, new ue(n))), i;
      }),
      t
    );
  })(),
  _3 = (function (t) {
    I(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.window = new _e()), r.next(n.window), n;
    }
    return (
      (e.prototype.notifyNext = function () {
        this.openWindow();
      }),
      (e.prototype.notifyError = function (r) {
        this._error(r);
      }),
      (e.prototype.notifyComplete = function () {
        this._complete();
      }),
      (e.prototype._next = function (r) {
        this.window.next(r);
      }),
      (e.prototype._error = function (r) {
        this.window.error(r), this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        this.window.complete(), this.destination.complete();
      }),
      (e.prototype._unsubscribe = function () {
        this.window = null;
      }),
      (e.prototype.openWindow = function () {
        var r = this.window;
        r && r.complete();
        var n = this.destination,
          i = (this.window = new _e());
        n.next(i);
      }),
      e
    );
  })(le);
function S3(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new E3(t, e));
    }
  );
}
var E3 = (function () {
    function t(e, r) {
      (this.windowSize = e), (this.startWindowEvery = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new C3(e, this.windowSize, this.startWindowEvery));
      }),
      t
    );
  })(),
  C3 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.destination = r),
        (s.windowSize = n),
        (s.startWindowEvery = i),
        (s.windows = [new _e()]),
        (s.count = 0),
        r.next(s.windows[0]),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        for (
          var n =
              this.startWindowEvery > 0
                ? this.startWindowEvery
                : this.windowSize,
            i = this.destination,
            s = this.windowSize,
            o = this.windows,
            a = o.length,
            c = 0;
          c < a && !this.closed;
          c++
        )
          o[c].next(r);
        var u = this.count - s + 1;
        if (
          (u >= 0 && u % n === 0 && !this.closed && o.shift().complete(),
          ++this.count % n === 0 && !this.closed)
        ) {
          var l = new _e();
          o.push(l), i.next(l);
        }
      }),
      (e.prototype._error = function (r) {
        var n = this.windows;
        if (n) for (; n.length > 0 && !this.closed; ) n.shift().error(r);
        this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        var r = this.windows;
        if (r) for (; r.length > 0 && !this.closed; ) r.shift().complete();
        this.destination.complete();
      }),
      (e.prototype._unsubscribe = function () {
        (this.count = 0), (this.windows = null);
      }),
      e
    );
  })(D);
function x3(t) {
  var e = Oe,
    r = null,
    n = Number.POSITIVE_INFINITY;
  return (
    $e(arguments[3]) && (e = arguments[3]),
    $e(arguments[2])
      ? (e = arguments[2])
      : zr(arguments[2]) && (n = Number(arguments[2])),
    $e(arguments[1])
      ? (e = arguments[1])
      : zr(arguments[1]) && (r = Number(arguments[1])),
    function (s) {
      return s.lift(new I3(t, r, n, e));
    }
  );
}
var I3 = (function () {
    function t(e, r, n, i) {
      (this.windowTimeSpan = e),
        (this.windowCreationInterval = r),
        (this.maxWindowSize = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new M3(
            e,
            this.windowTimeSpan,
            this.windowCreationInterval,
            this.maxWindowSize,
            this.scheduler
          )
        );
      }),
      t
    );
  })(),
  k3 = (function (t) {
    I(e, t);
    function e() {
      var r = (t !== null && t.apply(this, arguments)) || this;
      return (r._numberOfNextedValues = 0), r;
    }
    return (
      (e.prototype.next = function (r) {
        this._numberOfNextedValues++, t.prototype.next.call(this, r);
      }),
      Object.defineProperty(e.prototype, 'numberOfNextedValues', {
        get: function () {
          return this._numberOfNextedValues;
        },
        enumerable: !0,
        configurable: !0,
      }),
      e
    );
  })(_e),
  M3 = (function (t) {
    I(e, t);
    function e(r, n, i, s, o) {
      var a = t.call(this, r) || this;
      (a.destination = r),
        (a.windowTimeSpan = n),
        (a.windowCreationInterval = i),
        (a.maxWindowSize = s),
        (a.scheduler = o),
        (a.windows = []);
      var c = a.openWindow();
      if (i !== null && i >= 0) {
        var u = { subscriber: a, window: c, context: null },
          l = {
            windowTimeSpan: n,
            windowCreationInterval: i,
            subscriber: a,
            scheduler: o,
          };
        a.add(o.schedule(nd, n, u)), a.add(o.schedule(A3, i, l));
      } else {
        var f = { subscriber: a, window: c, windowTimeSpan: n };
        a.add(o.schedule(R3, n, f));
      }
      return a;
    }
    return (
      (e.prototype._next = function (r) {
        for (var n = this.windows, i = n.length, s = 0; s < i; s++) {
          var o = n[s];
          o.closed ||
            (o.next(r),
            o.numberOfNextedValues >= this.maxWindowSize &&
              this.closeWindow(o));
        }
      }),
      (e.prototype._error = function (r) {
        for (var n = this.windows; n.length > 0; ) n.shift().error(r);
        this.destination.error(r);
      }),
      (e.prototype._complete = function () {
        for (var r = this.windows; r.length > 0; ) {
          var n = r.shift();
          n.closed || n.complete();
        }
        this.destination.complete();
      }),
      (e.prototype.openWindow = function () {
        var r = new k3();
        this.windows.push(r);
        var n = this.destination;
        return n.next(r), r;
      }),
      (e.prototype.closeWindow = function (r) {
        r.complete();
        var n = this.windows;
        n.splice(n.indexOf(r), 1);
      }),
      e
    );
  })(D);
function R3(t) {
  var e = t.subscriber,
    r = t.windowTimeSpan,
    n = t.window;
  n && e.closeWindow(n), (t.window = e.openWindow()), this.schedule(t, r);
}
function A3(t) {
  var e = t.windowTimeSpan,
    r = t.subscriber,
    n = t.scheduler,
    i = t.windowCreationInterval,
    s = r.openWindow(),
    o = this,
    a = { action: o, subscription: null },
    c = { subscriber: r, window: s, context: a };
  (a.subscription = n.schedule(nd, e, c)),
    o.add(a.subscription),
    o.schedule(t, i);
}
function nd(t) {
  var e = t.subscriber,
    r = t.window,
    n = t.context;
  n && n.action && n.subscription && n.action.remove(n.subscription),
    e.closeWindow(r);
}
function T3(t, e) {
  return function (r) {
    return r.lift(new O3(t, e));
  };
}
var O3 = (function () {
    function t(e, r) {
      (this.openings = e), (this.closingSelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new N3(e, this.openings, this.closingSelector));
      }),
      t
    );
  })(),
  N3 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.openings = n),
        (s.closingSelector = i),
        (s.contexts = []),
        s.add((s.openSubscription = kt(s, n, n))),
        s
      );
    }
    return (
      (e.prototype._next = function (r) {
        var n = this.contexts;
        if (n) for (var i = n.length, s = 0; s < i; s++) n[s].window.next(r);
      }),
      (e.prototype._error = function (r) {
        var n = this.contexts;
        if (((this.contexts = null), n))
          for (var i = n.length, s = -1; ++s < i; ) {
            var o = n[s];
            o.window.error(r), o.subscription.unsubscribe();
          }
        t.prototype._error.call(this, r);
      }),
      (e.prototype._complete = function () {
        var r = this.contexts;
        if (((this.contexts = null), r))
          for (var n = r.length, i = -1; ++i < n; ) {
            var s = r[i];
            s.window.complete(), s.subscription.unsubscribe();
          }
        t.prototype._complete.call(this);
      }),
      (e.prototype._unsubscribe = function () {
        var r = this.contexts;
        if (((this.contexts = null), r))
          for (var n = r.length, i = -1; ++i < n; ) {
            var s = r[i];
            s.window.unsubscribe(), s.subscription.unsubscribe();
          }
      }),
      (e.prototype.notifyNext = function (r, n, i, s, o) {
        if (r === this.openings) {
          var a = void 0;
          try {
            var c = this.closingSelector;
            a = c(n);
          } catch (y) {
            return this.error(y);
          }
          var u = new _e(),
            l = new ce(),
            f = { window: u, subscription: l };
          this.contexts.push(f);
          var h = kt(this, a, f);
          h.closed
            ? this.closeWindow(this.contexts.length - 1)
            : ((h.context = f), l.add(h)),
            this.destination.next(u);
        } else this.closeWindow(this.contexts.indexOf(r));
      }),
      (e.prototype.notifyError = function (r) {
        this.error(r);
      }),
      (e.prototype.notifyComplete = function (r) {
        r !== this.openSubscription &&
          this.closeWindow(this.contexts.indexOf(r.context));
      }),
      (e.prototype.closeWindow = function (r) {
        if (r !== -1) {
          var n = this.contexts,
            i = n[r],
            s = i.window,
            o = i.subscription;
          n.splice(r, 1), s.complete(), o.unsubscribe();
        }
      }),
      e
    );
  })(gr);
function L3(t) {
  return function (r) {
    return r.lift(new P3(t));
  };
}
var P3 = (function () {
    function t(e) {
      this.closingSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new D3(e, this.closingSelector));
      }),
      t
    );
  })(),
  D3 = (function (t) {
    I(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.destination = r), (i.closingSelector = n), i.openWindow(), i;
    }
    return (
      (e.prototype.notifyNext = function (r, n, i, s, o) {
        this.openWindow(o);
      }),
      (e.prototype.notifyError = function (r) {
        this._error(r);
      }),
      (e.prototype.notifyComplete = function (r) {
        this.openWindow(r);
      }),
      (e.prototype._next = function (r) {
        this.window.next(r);
      }),
      (e.prototype._error = function (r) {
        this.window.error(r),
          this.destination.error(r),
          this.unsubscribeClosingNotification();
      }),
      (e.prototype._complete = function () {
        this.window.complete(),
          this.destination.complete(),
          this.unsubscribeClosingNotification();
      }),
      (e.prototype.unsubscribeClosingNotification = function () {
        this.closingNotification && this.closingNotification.unsubscribe();
      }),
      (e.prototype.openWindow = function (r) {
        r === void 0 && (r = null), r && (this.remove(r), r.unsubscribe());
        var n = this.window;
        n && n.complete();
        var i = (this.window = new _e());
        this.destination.next(i);
        var s;
        try {
          var o = this.closingSelector;
          s = o();
        } catch (a) {
          this.destination.error(a), this.window.error(a);
          return;
        }
        this.add((this.closingNotification = kt(this, s)));
      }),
      e
    );
  })(gr);
function B3() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    var n;
    typeof t[t.length - 1] == 'function' && (n = t.pop());
    var i = t;
    return r.lift(new j3(i, n));
  };
}
var j3 = (function () {
    function t(e, r) {
      (this.observables = e), (this.project = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new F3(e, this.observables, this.project));
      }),
      t
    );
  })(),
  F3 = (function (t) {
    I(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      (s.observables = n), (s.project = i), (s.toRespond = []);
      var o = n.length;
      s.values = new Array(o);
      for (var a = 0; a < o; a++) s.toRespond.push(a);
      for (var a = 0; a < o; a++) {
        var c = n[a];
        s.add(kt(s, c, void 0, a));
      }
      return s;
    }
    return (
      (e.prototype.notifyNext = function (r, n, i) {
        this.values[i] = n;
        var s = this.toRespond;
        if (s.length > 0) {
          var o = s.indexOf(i);
          o !== -1 && s.splice(o, 1);
        }
      }),
      (e.prototype.notifyComplete = function () {}),
      (e.prototype._next = function (r) {
        if (this.toRespond.length === 0) {
          var n = [r].concat(this.values);
          this.project ? this._tryProject(n) : this.destination.next(n);
        }
      }),
      (e.prototype._tryProject = function (r) {
        var n;
        try {
          n = this.project.apply(this, r);
        } catch (i) {
          this.destination.error(i);
          return;
        }
        this.destination.next(n);
      }),
      e
    );
  })(gr);
function $3() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (n) {
    return n.lift.call(Lh.apply(void 0, [n].concat(t)));
  };
}
function W3(t) {
  return function (e) {
    return e.lift(new Ph(t));
  };
}
const H3 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        audit: Gh,
        auditTime: H_,
        buffer: V_,
        bufferCount: q_,
        bufferTime: Z_,
        bufferToggle: t2,
        bufferWhen: i2,
        catchError: a2,
        combineAll: l2,
        combineLatest: f2,
        concat: h2,
        concatAll: xh,
        concatMap: Zh,
        concatMapTo: d2,
        count: p2,
        debounce: y2,
        debounceTime: w2,
        defaultIfEmpty: Qn,
        delay: I2,
        delayWhen: A2,
        dematerialize: L2,
        distinct: B2,
        distinctUntilChanged: Kh,
        distinctUntilKeyChanged: H2,
        elementAt: G2,
        endWith: Q2,
        every: Z2,
        exhaust: X2,
        exhaustMap: Xh,
        expand: iS,
        filter: Ut,
        finalize: aS,
        find: lS,
        findIndex: hS,
        first: dS,
        flatMap: ww,
        groupBy: Mm,
        ignoreElements: pS,
        isEmpty: yS,
        last: SS,
        map: Ye,
        mapTo: ES,
        materialize: IS,
        max: TS,
        merge: OS,
        mergeAll: fc,
        mergeMap: or,
        mergeMapTo: NS,
        mergeScan: LS,
        min: BS,
        multicast: ar,
        observeOn: jm,
        onErrorResumeNext: FS,
        pairwise: HS,
        partition: zS,
        pluck: qS,
        publish: GS,
        publishBehavior: QS,
        publishLast: ZS,
        publishReplay: YS,
        race: KS,
        reduce: gs,
        refCount: oc,
        repeat: XS,
        repeatWhen: tE,
        retry: iE,
        retryWhen: aE,
        sample: lE,
        sampleTime: dE,
        scan: Ei,
        sequenceEqual: yE,
        share: SE,
        shareReplay: EE,
        single: xE,
        skip: ME,
        skipLast: TE,
        skipUntil: LE,
        skipWhile: BE,
        startWith: $E,
        subscribeOn: HE,
        switchAll: qE,
        switchMap: In,
        switchMapTo: JE,
        take: Ec,
        takeLast: Si,
        takeUntil: GE,
        takeWhile: YE,
        tap: e3,
        throttle: n3,
        throttleTime: o3,
        throwIfEmpty: bs,
        timeInterval: l3,
        timeout: p3,
        timeoutWith: rd,
        timestamp: b3,
        toArray: v3,
        window: m3,
        windowCount: S3,
        windowTime: x3,
        windowToggle: T3,
        windowWhen: L3,
        withLatestFrom: B3,
        zip: $3,
        zipAll: W3,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Cc = cr(H3);
var ys = {},
  qe = {};
Object.defineProperty(qe, '__esModule', { value: !0 });
qe.ClientMessagePublishEvent =
  qe.ClientMessageSetSessionConfig =
  qe.ClientMessageGetSessionConfig =
  qe.ClientMessageIsLinked =
  qe.ClientMessageHostSession =
    void 0;
function V3(t) {
  return Object.assign({ type: 'HostSession' }, t);
}
qe.ClientMessageHostSession = V3;
function U3(t) {
  return Object.assign({ type: 'IsLinked' }, t);
}
qe.ClientMessageIsLinked = U3;
function z3(t) {
  return Object.assign({ type: 'GetSessionConfig' }, t);
}
qe.ClientMessageGetSessionConfig = z3;
function q3(t) {
  return Object.assign({ type: 'SetSessionConfig' }, t);
}
qe.ClientMessageSetSessionConfig = q3;
function J3(t) {
  return Object.assign({ type: 'PublishEvent' }, t);
}
qe.ClientMessagePublishEvent = J3;
var id = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.RxWebSocket = t.ConnectionState = void 0);
  const e = es,
    r = Cc;
  var n;
  (function (s) {
    (s[(s.DISCONNECTED = 0)] = 'DISCONNECTED'),
      (s[(s.CONNECTING = 1)] = 'CONNECTING'),
      (s[(s.CONNECTED = 2)] = 'CONNECTED');
  })((n = t.ConnectionState || (t.ConnectionState = {})));
  class i {
    constructor(o, a = WebSocket) {
      (this.WebSocketClass = a),
        (this.webSocket = null),
        (this.connectionStateSubject = new e.BehaviorSubject(n.DISCONNECTED)),
        (this.incomingDataSubject = new e.Subject()),
        (this.url = o.replace(/^http/, 'ws'));
    }
    connect() {
      return this.webSocket
        ? (0, e.throwError)(new Error('webSocket object is not null'))
        : new e.Observable((o) => {
            let a;
            try {
              this.webSocket = a = new this.WebSocketClass(this.url);
            } catch (c) {
              o.error(c);
              return;
            }
            this.connectionStateSubject.next(n.CONNECTING),
              (a.onclose = (c) => {
                this.clearWebSocket(),
                  o.error(new Error(`websocket error ${c.code}: ${c.reason}`)),
                  this.connectionStateSubject.next(n.DISCONNECTED);
              }),
              (a.onopen = (c) => {
                o.next(),
                  o.complete(),
                  this.connectionStateSubject.next(n.CONNECTED);
              }),
              (a.onmessage = (c) => {
                this.incomingDataSubject.next(c.data);
              });
          }).pipe((0, r.take)(1));
    }
    disconnect() {
      const { webSocket: o } = this;
      if (o) {
        this.clearWebSocket(), this.connectionStateSubject.next(n.DISCONNECTED);
        try {
          o.close();
        } catch {}
      }
    }
    get connectionState$() {
      return this.connectionStateSubject.asObservable();
    }
    get incomingData$() {
      return this.incomingDataSubject.asObservable();
    }
    get incomingJSONData$() {
      return this.incomingData$.pipe(
        (0, r.flatMap)((o) => {
          let a;
          try {
            a = JSON.parse(o);
          } catch {
            return (0, e.empty)();
          }
          return (0, e.of)(a);
        })
      );
    }
    sendData(o) {
      const { webSocket: a } = this;
      if (!a) throw new Error('websocket is not connected');
      a.send(o);
    }
    clearWebSocket() {
      const { webSocket: o } = this;
      o &&
        ((this.webSocket = null),
        (o.onclose = null),
        (o.onerror = null),
        (o.onmessage = null),
        (o.onopen = null));
    }
  }
  t.RxWebSocket = i;
})(id);
var vs = {};
Object.defineProperty(vs, '__esModule', { value: !0 });
vs.isServerMessageFail = void 0;
function G3(t) {
  return (
    t &&
    t.type === 'Fail' &&
    typeof t.id == 'number' &&
    typeof t.sessionId == 'string' &&
    typeof t.error == 'string'
  );
}
vs.isServerMessageFail = G3;
Object.defineProperty(ys, '__esModule', { value: !0 });
ys.WalletSDKConnection = void 0;
const tt = es,
  Q = Cc,
  fn = Zr,
  Er = Nn,
  hn = qe,
  dn = Gr,
  oi = id,
  Xo = vs,
  gl = 1e4,
  Q3 = 6e4;
class Z3 {
  constructor(e, r, n, i, s = WebSocket) {
    (this.sessionId = e),
      (this.sessionKey = r),
      (this.diagnostic = i),
      (this.subscriptions = new tt.Subscription()),
      (this.destroyed = !1),
      (this.lastHeartbeatResponse = 0),
      (this.nextReqId = (0, Er.IntNumber)(1)),
      (this.connectedSubject = new tt.BehaviorSubject(!1)),
      (this.linkedSubject = new tt.BehaviorSubject(!1)),
      (this.sessionConfigSubject = new tt.ReplaySubject(1));
    const o = new oi.RxWebSocket(n + '/rpc', s);
    (this.ws = o),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, Q.tap)((a) => {
              var c;
              return (c = this.diagnostic) === null || c === void 0
                ? void 0
                : c.log(dn.EVENTS.CONNECTED_STATE_CHANGE, {
                    state: a,
                    sessionIdHash: fn.Session.hash(e),
                  });
            }),
            (0, Q.skip)(1),
            (0, Q.filter)(
              (a) => a === oi.ConnectionState.DISCONNECTED && !this.destroyed
            ),
            (0, Q.delay)(5e3),
            (0, Q.filter)((a) => !this.destroyed),
            (0, Q.flatMap)((a) => o.connect()),
            (0, Q.retry)()
          )
          .subscribe()
      ),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, Q.skip)(2),
            (0, Q.switchMap)((a) =>
              (0, tt.iif)(
                () => a === oi.ConnectionState.CONNECTED,
                this.authenticate().pipe(
                  (0, Q.tap)((c) => this.sendIsLinked()),
                  (0, Q.tap)((c) => this.sendGetSessionConfig()),
                  (0, Q.map)((c) => !0)
                ),
                (0, tt.of)(!1)
              )
            ),
            (0, Q.distinctUntilChanged)(),
            (0, Q.catchError)((a) => (0, tt.of)(!1))
          )
          .subscribe((a) => this.connectedSubject.next(a))
      ),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, Q.skip)(1),
            (0, Q.switchMap)((a) =>
              (0, tt.iif)(
                () => a === oi.ConnectionState.CONNECTED,
                (0, tt.timer)(0, gl)
              )
            )
          )
          .subscribe((a) =>
            a === 0 ? this.updateLastHeartbeat() : this.heartbeat()
          )
      ),
      this.subscriptions.add(
        o.incomingData$
          .pipe((0, Q.filter)((a) => a === 'h'))
          .subscribe((a) => this.updateLastHeartbeat())
      ),
      this.subscriptions.add(
        o.incomingJSONData$
          .pipe((0, Q.filter)((a) => ['IsLinkedOK', 'Linked'].includes(a.type)))
          .subscribe((a) => {
            var c;
            const u = a;
            (c = this.diagnostic) === null ||
              c === void 0 ||
              c.log(dn.EVENTS.LINKED, {
                sessionIdHash: fn.Session.hash(e),
                linked: u.linked,
                type: a.type,
                onlineGuests: u.onlineGuests,
              }),
              this.linkedSubject.next(u.linked || u.onlineGuests > 0);
          })
      ),
      this.subscriptions.add(
        o.incomingJSONData$
          .pipe(
            (0, Q.filter)((a) =>
              ['GetSessionConfigOK', 'SessionConfigUpdated'].includes(a.type)
            )
          )
          .subscribe((a) => {
            var c;
            const u = a;
            (c = this.diagnostic) === null ||
              c === void 0 ||
              c.log(dn.EVENTS.SESSION_CONFIG_RECEIVED, {
                sessionIdHash: fn.Session.hash(e),
                metadata_keys:
                  u && u.metadata ? Object.keys(u.metadata) : void 0,
              }),
              this.sessionConfigSubject.next({
                webhookId: u.webhookId,
                webhookUrl: u.webhookUrl,
                metadata: u.metadata,
              });
          })
      );
  }
  connect() {
    var e;
    if (this.destroyed) throw new Error('instance is destroyed');
    (e = this.diagnostic) === null ||
      e === void 0 ||
      e.log(dn.EVENTS.STARTED_CONNECTING, {
        sessionIdHash: fn.Session.hash(this.sessionId),
      }),
      this.ws.connect().subscribe();
  }
  destroy() {
    var e;
    this.subscriptions.unsubscribe(),
      this.ws.disconnect(),
      (e = this.diagnostic) === null ||
        e === void 0 ||
        e.log(dn.EVENTS.DISCONNECTED, {
          sessionIdHash: fn.Session.hash(this.sessionId),
        }),
      (this.destroyed = !0);
  }
  get isDestroyed() {
    return this.destroyed;
  }
  get connected$() {
    return this.connectedSubject.asObservable();
  }
  get onceConnected$() {
    return this.connected$.pipe(
      (0, Q.filter)((e) => e),
      (0, Q.take)(1),
      (0, Q.map)(() => {})
    );
  }
  get linked$() {
    return this.linkedSubject.asObservable();
  }
  get onceLinked$() {
    return this.linked$.pipe(
      (0, Q.filter)((e) => e),
      (0, Q.take)(1),
      (0, Q.map)(() => {})
    );
  }
  get sessionConfig$() {
    return this.sessionConfigSubject.asObservable();
  }
  get incomingEvent$() {
    return this.ws.incomingJSONData$.pipe(
      (0, Q.filter)((e) => {
        if (e.type !== 'Event') return !1;
        const r = e;
        return (
          typeof r.sessionId == 'string' &&
          typeof r.eventId == 'string' &&
          typeof r.event == 'string' &&
          typeof r.data == 'string'
        );
      }),
      (0, Q.map)((e) => e)
    );
  }
  setSessionMetadata(e, r) {
    const n = (0, hn.ClientMessageSetSessionConfig)({
      id: (0, Er.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      metadata: { [e]: r },
    });
    return this.onceConnected$.pipe(
      (0, Q.flatMap)((i) => this.makeRequest(n)),
      (0, Q.map)((i) => {
        if ((0, Xo.isServerMessageFail)(i))
          throw new Error(i.error || 'failed to set session metadata');
      })
    );
  }
  publishEvent(e, r, n = !1) {
    const i = (0, hn.ClientMessagePublishEvent)({
      id: (0, Er.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      event: e,
      data: r,
      callWebhook: n,
    });
    return this.onceLinked$.pipe(
      (0, Q.flatMap)((s) => this.makeRequest(i)),
      (0, Q.map)((s) => {
        if ((0, Xo.isServerMessageFail)(s))
          throw new Error(s.error || 'failed to publish event');
        return s.eventId;
      })
    );
  }
  sendData(e) {
    this.ws.sendData(JSON.stringify(e));
  }
  updateLastHeartbeat() {
    this.lastHeartbeatResponse = Date.now();
  }
  heartbeat() {
    if (Date.now() - this.lastHeartbeatResponse > gl * 2) {
      this.ws.disconnect();
      return;
    }
    try {
      this.ws.sendData('h');
    } catch {}
  }
  makeRequest(e, r = Q3) {
    const n = e.id;
    try {
      this.sendData(e);
    } catch (i) {
      return (0, tt.throwError)(i);
    }
    return this.ws.incomingJSONData$.pipe(
      (0, Q.timeoutWith)(
        r,
        (0, tt.throwError)(new Error(`request ${n} timed out`))
      ),
      (0, Q.filter)((i) => i.id === n),
      (0, Q.take)(1)
    );
  }
  authenticate() {
    const e = (0, hn.ClientMessageHostSession)({
      id: (0, Er.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      sessionKey: this.sessionKey,
    });
    return this.makeRequest(e).pipe(
      (0, Q.map)((r) => {
        if ((0, Xo.isServerMessageFail)(r))
          throw new Error(r.error || 'failed to authentcate');
      })
    );
  }
  sendIsLinked() {
    const e = (0, hn.ClientMessageIsLinked)({
      id: (0, Er.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
    });
    this.sendData(e);
  }
  sendGetSessionConfig() {
    const e = (0, hn.ClientMessageGetSessionConfig)({
      id: (0, Er.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
    });
    this.sendData(e);
  }
}
ys.WalletSDKConnection = Z3;
var qr = {};
Object.defineProperty(qr, '__esModule', { value: !0 });
qr.decrypt = qr.encrypt = void 0;
const Ci = L;
async function Y3(t, e) {
  if (e.length !== 64) throw Error('secret must be 256 bits');
  const r = crypto.getRandomValues(new Uint8Array(12)),
    n = await crypto.subtle.importKey(
      'raw',
      (0, Ci.hexStringToUint8Array)(e),
      { name: 'aes-gcm' },
      !1,
      ['encrypt', 'decrypt']
    ),
    i = new TextEncoder(),
    s = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: r },
      n,
      i.encode(t)
    ),
    o = 16,
    a = s.slice(s.byteLength - o),
    c = s.slice(0, s.byteLength - o),
    u = new Uint8Array(a),
    l = new Uint8Array(c),
    f = new Uint8Array([...r, ...u, ...l]);
  return (0, Ci.uint8ArrayToHex)(f);
}
qr.encrypt = Y3;
function K3(t, e) {
  if (e.length !== 64) throw Error('secret must be 256 bits');
  return new Promise((r, n) => {
    (async function () {
      const i = await crypto.subtle.importKey(
          'raw',
          (0, Ci.hexStringToUint8Array)(e),
          { name: 'aes-gcm' },
          !1,
          ['encrypt', 'decrypt']
        ),
        s = (0, Ci.hexStringToUint8Array)(t),
        o = s.slice(0, 12),
        a = s.slice(12, 28),
        c = s.slice(28),
        u = new Uint8Array([...c, ...a]),
        l = { name: 'AES-GCM', iv: new Uint8Array(o) };
      try {
        const f = await window.crypto.subtle.decrypt(l, i, u),
          h = new TextDecoder();
        r(h.decode(f));
      } catch (f) {
        n(f);
      }
    })();
  });
}
qr.decrypt = K3;
var ms = {},
  ws = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.RelayMessageType = void 0),
    (function (e) {
      (e.SESSION_ID_REQUEST = 'SESSION_ID_REQUEST'),
        (e.SESSION_ID_RESPONSE = 'SESSION_ID_RESPONSE'),
        (e.LINKED = 'LINKED'),
        (e.UNLINKED = 'UNLINKED'),
        (e.WEB3_REQUEST = 'WEB3_REQUEST'),
        (e.WEB3_REQUEST_CANCELED = 'WEB3_REQUEST_CANCELED'),
        (e.WEB3_RESPONSE = 'WEB3_RESPONSE');
    })(t.RelayMessageType || (t.RelayMessageType = {}));
})(ws);
Object.defineProperty(ms, '__esModule', { value: !0 });
ms.Web3RequestCanceledMessage = void 0;
const X3 = ws;
function e4(t) {
  return { type: X3.RelayMessageType.WEB3_REQUEST_CANCELED, id: t };
}
ms.Web3RequestCanceledMessage = e4;
var _s = {};
Object.defineProperty(_s, '__esModule', { value: !0 });
_s.Web3RequestMessage = void 0;
const t4 = ws;
function r4(t) {
  return Object.assign({ type: t4.RelayMessageType.WEB3_REQUEST }, t);
}
_s.Web3RequestMessage = r4;
var Jr = {};
Object.defineProperty(Jr, '__esModule', { value: !0 });
Jr.isWeb3ResponseMessage = Jr.Web3ResponseMessage = void 0;
const sd = ws;
function n4(t) {
  return Object.assign({ type: sd.RelayMessageType.WEB3_RESPONSE }, t);
}
Jr.Web3ResponseMessage = n4;
function i4(t) {
  return t && t.type === sd.RelayMessageType.WEB3_RESPONSE;
}
Jr.isWeb3ResponseMessage = i4;
var s4 =
    (O && O.__createBinding) ||
    (Object.create
      ? function (t, e, r, n) {
          n === void 0 && (n = r),
            Object.defineProperty(t, n, {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            });
        }
      : function (t, e, r, n) {
          n === void 0 && (n = r), (t[n] = e[r]);
        }),
  o4 =
    (O && O.__setModuleDefault) ||
    (Object.create
      ? function (t, e) {
          Object.defineProperty(t, 'default', { enumerable: !0, value: e });
        }
      : function (t, e) {
          t.default = e;
        }),
  od =
    (O && O.__decorate) ||
    function (t, e, r, n) {
      var i = arguments.length,
        s =
          i < 3
            ? e
            : n === null
              ? (n = Object.getOwnPropertyDescriptor(e, r))
              : n,
        o;
      if (typeof Reflect == 'object' && typeof Reflect.decorate == 'function')
        s = Reflect.decorate(t, e, r, n);
      else
        for (var a = t.length - 1; a >= 0; a--)
          (o = t[a]) &&
            (s = (i < 3 ? o(s) : i > 3 ? o(e, r, s) : o(e, r)) || s);
      return i > 3 && s && Object.defineProperty(e, r, s), s;
    },
  a4 =
    (O && O.__importStar) ||
    function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (t != null)
        for (var r in t)
          r !== 'default' &&
            Object.prototype.hasOwnProperty.call(t, r) &&
            s4(e, t, r);
      return o4(e, t), e;
    },
  c4 =
    (O && O.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(ds, '__esModule', { value: !0 });
ds.WalletSDKRelay = void 0;
const ad = c4(ps),
  Zt = es,
  be = Cc,
  Ie = Gr,
  u4 = ys,
  Cr = kn,
  l4 = Nn,
  ie = L,
  Nt = a4(qr),
  Lt = Zr,
  ai = it,
  Se = Ti,
  f4 = ms,
  h4 = _s,
  Ue = re,
  Pe = Jr;
class nt extends ai.WalletSDKRelayAbstract {
  constructor(e) {
    var r;
    super(),
      (this.accountsCallback = null),
      (this.chainCallback = null),
      (this.dappDefaultChainSubject = new Zt.BehaviorSubject(1)),
      (this.dappDefaultChain = 1),
      (this.appName = ''),
      (this.appLogoUrl = null),
      (this.subscriptions = new Zt.Subscription()),
      (this.linkAPIUrl = e.linkAPIUrl),
      (this.storage = e.storage),
      (this.options = e);
    const { session: n, ui: i, connection: s } = this.subscribe();
    if (
      ((this._session = n),
      (this.connection = s),
      (this.relayEventManager = e.relayEventManager),
      e.diagnosticLogger && e.eventListener)
    )
      throw new Error(
        "Can't have both eventListener and diagnosticLogger options, use only diagnosticLogger"
      );
    e.eventListener
      ? (this.diagnostic = { log: e.eventListener.onEvent })
      : (this.diagnostic = e.diagnosticLogger),
      (this._reloadOnDisconnect =
        (r = e.reloadOnDisconnect) !== null && r !== void 0 ? r : !0),
      (this.ui = i);
  }
  subscribe() {
    this.subscriptions.add(
      this.dappDefaultChainSubject.subscribe((i) => {
        this.dappDefaultChain !== i && (this.dappDefaultChain = i);
      })
    );
    const e =
        Lt.Session.load(this.storage) || new Lt.Session(this.storage).save(),
      r = new u4.WalletSDKConnection(
        e.id,
        e.key,
        this.linkAPIUrl,
        this.diagnostic
      );
    this.subscriptions.add(
      r.sessionConfig$.subscribe({
        next: (i) => {
          this.onSessionConfigChanged(i);
        },
        error: () => {
          var i;
          (i = this.diagnostic) === null ||
            i === void 0 ||
            i.log(Ie.EVENTS.GENERAL_ERROR, {
              message: 'error while invoking session config callback',
            });
        },
      })
    ),
      this.subscriptions.add(
        r.incomingEvent$
          .pipe((0, be.filter)((i) => i.event === 'Web3Response'))
          .subscribe({ next: this.handleIncomingEvent })
      ),
      this.subscriptions.add(
        r.linked$
          .pipe(
            (0, be.skip)(1),
            (0, be.tap)((i) => {
              var s;
              this.isLinked = i;
              const o = this.storage.getItem(ai.LOCAL_STORAGE_ADDRESSES_KEY);
              if (
                (i && (this.session.linked = i),
                (this.isUnlinkedErrorState = !1),
                o)
              ) {
                const a = o.split(' '),
                  c = this.storage.getItem('IsStandaloneSigning') === 'true';
                if (a[0] !== '' && !i && this.session.linked && !c) {
                  this.isUnlinkedErrorState = !0;
                  const u = this.getSessionIdHash();
                  (s = this.diagnostic) === null ||
                    s === void 0 ||
                    s.log(Ie.EVENTS.UNLINKED_ERROR_STATE, { sessionIdHash: u });
                }
              }
            })
          )
          .subscribe()
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, be.filter)(
              (i) => !!i.metadata && i.metadata.__destroyed === '1'
            )
          )
          .subscribe(() => {
            var i;
            const s = r.isDestroyed;
            return (
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Ie.EVENTS.METADATA_DESTROYED, {
                  alreadyDestroyed: s,
                  sessionIdHash: this.getSessionIdHash(),
                }),
              this.resetAndReload()
            );
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, be.filter)(
              (i) => i.metadata && i.metadata.WalletUsername !== void 0
            )
          )
          .pipe(
            (0, be.mergeMap)((i) =>
              Nt.decrypt(i.metadata.WalletUsername, e.secret)
            )
          )
          .subscribe({
            next: (i) => {
              this.storage.setItem(ai.WALLET_USER_NAME_KEY, i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Ie.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'username',
                });
            },
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, be.filter)(
              (i) => i.metadata && i.metadata.AppVersion !== void 0
            )
          )
          .pipe(
            (0, be.mergeMap)((i) => Nt.decrypt(i.metadata.AppVersion, e.secret))
          )
          .subscribe({
            next: (i) => {
              this.storage.setItem(ai.APP_VERSION_KEY, i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Ie.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'appversion',
                });
            },
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, be.filter)(
              (i) =>
                i.metadata &&
                i.metadata.ChainId !== void 0 &&
                i.metadata.JsonRpcUrl !== void 0
            )
          )
          .pipe(
            (0, be.mergeMap)((i) =>
              (0, Zt.zip)(
                Nt.decrypt(i.metadata.ChainId, e.secret),
                Nt.decrypt(i.metadata.JsonRpcUrl, e.secret)
              )
            )
          )
          .pipe((0, be.distinctUntilChanged)())
          .subscribe({
            next: ([i, s]) => {
              this.chainCallback && this.chainCallback(i, s);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Ie.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'chainId|jsonRpcUrl',
                });
            },
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, be.filter)(
              (i) => i.metadata && i.metadata.EthereumAddress !== void 0
            )
          )
          .pipe(
            (0, be.mergeMap)((i) =>
              Nt.decrypt(i.metadata.EthereumAddress, e.secret)
            )
          )
          .subscribe({
            next: (i) => {
              this.accountsCallback && this.accountsCallback([i]),
                nt.accountRequestCallbackIds.size > 0 &&
                  (Array.from(nt.accountRequestCallbackIds.values()).forEach(
                    (s) => {
                      const o = (0, Pe.Web3ResponseMessage)({
                        id: s,
                        response: (0, Ue.RequestEthereumAccountsResponse)([i]),
                      });
                      this.invokeCallback(
                        Object.assign(Object.assign({}, o), { id: s })
                      );
                    }
                  ),
                  nt.accountRequestCallbackIds.clear());
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Ie.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'selectedAddress',
                });
            },
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, be.filter)((i) => i.metadata && i.metadata.AppSrc !== void 0)
          )
          .pipe(
            (0, be.mergeMap)((i) => Nt.decrypt(i.metadata.AppSrc, e.secret))
          )
          .subscribe({
            next: (i) => {
              this.ui.setAppSrc(i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Ie.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'appSrc',
                });
            },
          })
      );
    const n = this.options.uiConstructor({
      linkAPIUrl: this.options.linkAPIUrl,
      version: this.options.version,
      darkMode: this.options.darkMode,
      session: e,
      connected$: r.connected$,
      chainId$: this.dappDefaultChainSubject,
    });
    return r.connect(), { session: e, ui: n, connection: r };
  }
  attachUI() {
    this.ui.attach();
  }
  resetAndReload() {
    this.connection
      .setSessionMetadata('__destroyed', '1')
      .pipe(
        (0, be.timeout)(1e3),
        (0, be.catchError)((e) => (0, Zt.of)(null))
      )
      .subscribe(
        (e) => {
          var r, n, i;
          const s = this.ui.isStandalone();
          try {
            this.subscriptions.unsubscribe();
          } catch {
            (r = this.diagnostic) === null ||
              r === void 0 ||
              r.log(Ie.EVENTS.GENERAL_ERROR, {
                message: 'Had error unsubscribing',
              });
          }
          (n = this.diagnostic) === null ||
            n === void 0 ||
            n.log(Ie.EVENTS.SESSION_STATE_CHANGE, {
              method: 'relay::resetAndReload',
              sessionMetadataChange: '__destroyed, 1',
              sessionIdHash: this.getSessionIdHash(),
            }),
            this.connection.destroy();
          const o = Lt.Session.load(this.storage);
          if (
            (o?.id === this._session.id
              ? this.storage.clear()
              : o &&
                ((i = this.diagnostic) === null ||
                  i === void 0 ||
                  i.log(Ie.EVENTS.SKIPPED_CLEARING_SESSION, {
                    sessionIdHash: this.getSessionIdHash(),
                    storedSessionIdHash: Lt.Session.hash(o.id),
                  })),
            this._reloadOnDisconnect)
          ) {
            this.ui.reloadUI();
            return;
          }
          this.accountsCallback && this.accountsCallback([], !0),
            (this.subscriptions = new Zt.Subscription());
          const { session: a, ui: c, connection: u } = this.subscribe();
          (this._session = a),
            (this.connection = u),
            (this.ui = c),
            s && this.ui.setStandalone && this.ui.setStandalone(!0),
            this.attachUI();
        },
        (e) => {
          var r;
          (r = this.diagnostic) === null ||
            r === void 0 ||
            r.log(Ie.EVENTS.FAILURE, {
              method: 'relay::resetAndReload',
              message: `failed to reset and reload with ${e}`,
              sessionIdHash: this.getSessionIdHash(),
            });
        }
      );
  }
  setAppInfo(e, r) {
    (this.appName = e), (this.appLogoUrl = r);
  }
  getStorageItem(e) {
    return this.storage.getItem(e);
  }
  get session() {
    return this._session;
  }
  setStorageItem(e, r) {
    this.storage.setItem(e, r);
  }
  signEthereumMessage(e, r, n, i) {
    return this.sendRequest({
      method: Se.Web3Method.signEthereumMessage,
      params: {
        message: (0, ie.hexStringFromBuffer)(e, !0),
        address: r,
        addPrefix: n,
        typedDataJson: i || null,
      },
    });
  }
  ethereumAddressFromSignedMessage(e, r, n) {
    return this.sendRequest({
      method: Se.Web3Method.ethereumAddressFromSignedMessage,
      params: {
        message: (0, ie.hexStringFromBuffer)(e, !0),
        signature: (0, ie.hexStringFromBuffer)(r, !0),
        addPrefix: n,
      },
    });
  }
  signEthereumTransaction(e) {
    return this.sendRequest({
      method: Se.Web3Method.signEthereumTransaction,
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: (0, ie.bigIntStringFromBN)(e.weiValue),
        data: (0, ie.hexStringFromBuffer)(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei
          ? (0, ie.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxFeePerGas: e.gasPriceInWei
          ? (0, ie.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxPriorityFeePerGas: e.gasPriceInWei
          ? (0, ie.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        gasLimit: e.gasLimit ? (0, ie.bigIntStringFromBN)(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !1,
      },
    });
  }
  signAndSubmitEthereumTransaction(e) {
    return this.sendRequest({
      method: Se.Web3Method.signEthereumTransaction,
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: (0, ie.bigIntStringFromBN)(e.weiValue),
        data: (0, ie.hexStringFromBuffer)(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei
          ? (0, ie.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxFeePerGas: e.maxFeePerGas
          ? (0, ie.bigIntStringFromBN)(e.maxFeePerGas)
          : null,
        maxPriorityFeePerGas: e.maxPriorityFeePerGas
          ? (0, ie.bigIntStringFromBN)(e.maxPriorityFeePerGas)
          : null,
        gasLimit: e.gasLimit ? (0, ie.bigIntStringFromBN)(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !0,
      },
    });
  }
  submitEthereumTransaction(e, r) {
    return this.sendRequest({
      method: Se.Web3Method.submitEthereumTransaction,
      params: {
        signedTransaction: (0, ie.hexStringFromBuffer)(e, !0),
        chainId: r,
      },
    });
  }
  scanQRCode(e) {
    return this.sendRequest({
      method: Se.Web3Method.scanQRCode,
      params: { regExp: e },
    });
  }
  getQRCodeUrl() {
    return (0, ie.createQrUrl)(
      this._session.id,
      this._session.secret,
      this.linkAPIUrl,
      !1,
      this.options.version,
      this.dappDefaultChain
    );
  }
  genericRequest(e, r) {
    return this.sendRequest({
      method: Se.Web3Method.generic,
      params: { action: r, data: e },
    });
  }
  sendGenericMessage(e) {
    return this.sendRequest(e);
  }
  sendRequest(e) {
    let r = null;
    const n = (0, ie.randomBytesHex)(8),
      i = (o) => {
        this.publishWeb3RequestCanceledEvent(n),
          this.handleErrorResponse(n, e.method, o),
          r?.();
      };
    return {
      promise: new Promise((o, a) => {
        this.ui.isStandalone() ||
          (r = this.ui.showConnecting({
            isUnlinkedErrorState: this.isUnlinkedErrorState,
            onCancel: i,
            onResetConnection: this.resetAndReload,
          })),
          this.relayEventManager.callbacks.set(n, (c) => {
            if ((r?.(), c.errorMessage)) return a(new Error(c.errorMessage));
            o(c);
          }),
          this.ui.isStandalone()
            ? this.sendRequestStandalone(n, e)
            : this.publishWeb3RequestEvent(n, e);
      }),
      cancel: i,
    };
  }
  setConnectDisabled(e) {
    this.ui.setConnectDisabled(e);
  }
  setAccountsCallback(e) {
    this.accountsCallback = e;
  }
  setChainCallback(e) {
    this.chainCallback = e;
  }
  setDappDefaultChainCallback(e) {
    this.dappDefaultChainSubject.next(e);
  }
  publishWeb3RequestEvent(e, r) {
    var n;
    const i = (0, h4.Web3RequestMessage)({ id: e, request: r }),
      s = Lt.Session.load(this.storage);
    (n = this.diagnostic) === null ||
      n === void 0 ||
      n.log(Ie.EVENTS.WEB3_REQUEST, {
        eventId: i.id,
        method: `relay::${i.request.method}`,
        sessionIdHash: this.getSessionIdHash(),
        storedSessionIdHash: s ? Lt.Session.hash(s.id) : '',
        isSessionMismatched: (s?.id !== this._session.id).toString(),
      }),
      this.subscriptions.add(
        this.publishEvent('Web3Request', i, !0).subscribe({
          next: (o) => {
            var a;
            (a = this.diagnostic) === null ||
              a === void 0 ||
              a.log(Ie.EVENTS.WEB3_REQUEST_PUBLISHED, {
                eventId: i.id,
                method: `relay::${i.request.method}`,
                sessionIdHash: this.getSessionIdHash(),
                storedSessionIdHash: s ? Lt.Session.hash(s.id) : '',
                isSessionMismatched: (s?.id !== this._session.id).toString(),
              });
          },
          error: (o) => {
            this.handleWeb3ResponseMessage(
              (0, Pe.Web3ResponseMessage)({
                id: i.id,
                response: { method: i.request.method, errorMessage: o.message },
              })
            );
          },
        })
      );
  }
  publishWeb3RequestCanceledEvent(e) {
    const r = (0, f4.Web3RequestCanceledMessage)(e);
    this.subscriptions.add(
      this.publishEvent('Web3RequestCanceled', r, !1).subscribe()
    );
  }
  publishEvent(e, r, n) {
    const i = this.session.secret;
    return new Zt.Observable((s) => {
      Nt.encrypt(
        JSON.stringify(
          Object.assign(Object.assign({}, r), { origin: location.origin })
        ),
        i
      ).then((o) => {
        s.next(o), s.complete();
      });
    }).pipe((0, be.mergeMap)((s) => this.connection.publishEvent(e, s, n)));
  }
  handleIncomingEvent(e) {
    try {
      this.subscriptions.add(
        (0, Zt.from)(Nt.decrypt(e.data, this.session.secret))
          .pipe((0, be.map)((r) => JSON.parse(r)))
          .subscribe({
            next: (r) => {
              const n = (0, Pe.isWeb3ResponseMessage)(r) ? r : null;
              n && this.handleWeb3ResponseMessage(n);
            },
            error: () => {
              var r;
              (r = this.diagnostic) === null ||
                r === void 0 ||
                r.log(Ie.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'incomingEvent',
                });
            },
          })
      );
    } catch {
      return;
    }
  }
  handleWeb3ResponseMessage(e) {
    var r;
    const { response: n } = e;
    if (
      ((r = this.diagnostic) === null ||
        r === void 0 ||
        r.log(Ie.EVENTS.WEB3_RESPONSE, {
          eventId: e.id,
          method: `relay::${n.method}`,
          sessionIdHash: this.getSessionIdHash(),
        }),
      (0, Ue.isRequestEthereumAccountsResponse)(n))
    ) {
      nt.accountRequestCallbackIds.forEach((i) =>
        this.invokeCallback(Object.assign(Object.assign({}, e), { id: i }))
      ),
        nt.accountRequestCallbackIds.clear();
      return;
    }
    this.invokeCallback(e);
  }
  handleErrorResponse(e, r, n, i) {
    var s;
    const o =
      (s = n?.message) !== null && s !== void 0
        ? s
        : (0, Cr.standardErrorMessage)(i);
    this.handleWeb3ResponseMessage(
      (0, Pe.Web3ResponseMessage)({
        id: e,
        response: { method: r, errorMessage: o, errorCode: i },
      })
    );
  }
  invokeCallback(e) {
    const r = this.relayEventManager.callbacks.get(e.id);
    r && (r(e.response), this.relayEventManager.callbacks.delete(e.id));
  }
  requestEthereumAccounts() {
    const e = {
        method: Se.Web3Method.requestEthereumAccounts,
        params: { appName: this.appName, appLogoUrl: this.appLogoUrl || null },
      },
      r = (0, ie.randomBytesHex)(8),
      n = (s) => {
        this.publishWeb3RequestCanceledEvent(r),
          this.handleErrorResponse(r, e.method, s);
      };
    return {
      promise: new Promise((s, o) => {
        var a;
        this.relayEventManager.callbacks.set(r, (u) => {
          if ((this.ui.hideRequestEthereumAccounts(), u.errorMessage))
            return o(new Error(u.errorMessage));
          s(u);
        });
        const c =
          ((a = window?.navigator) === null || a === void 0
            ? void 0
            : a.userAgent) || null;
        if (
          c &&
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            c
          )
        ) {
          let u;
          try {
            (0, ie.isInIFrame)() && window.top
              ? (u = window.top.location)
              : (u = window.location);
          } catch {
            u = window.location;
          }
          u.href = `https://www.coinbase.com/connect-dapp?uri=${encodeURIComponent(u.href)}`;
          return;
        }
        if (this.ui.inlineAccountsResponse()) {
          const u = (l) => {
            this.handleWeb3ResponseMessage(
              (0, Pe.Web3ResponseMessage)({
                id: r,
                response: (0, Ue.RequestEthereumAccountsResponse)(l),
              })
            );
          };
          this.ui.requestEthereumAccounts({ onCancel: n, onAccounts: u });
        } else {
          const u = Cr.standardErrors.provider.userRejectedRequest(
            'User denied account authorization'
          );
          this.ui.requestEthereumAccounts({ onCancel: () => n(u) });
        }
        nt.accountRequestCallbackIds.add(r),
          !this.ui.inlineAccountsResponse() &&
            !this.ui.isStandalone() &&
            this.publishWeb3RequestEvent(r, e);
      }),
      cancel: n,
    };
  }
  selectProvider(e) {
    const r = {
        method: Se.Web3Method.selectProvider,
        params: { providerOptions: e },
      },
      n = (0, ie.randomBytesHex)(8),
      i = (o) => {
        this.publishWeb3RequestCanceledEvent(n),
          this.handleErrorResponse(n, r.method, o);
      },
      s = new Promise((o, a) => {
        this.relayEventManager.callbacks.set(n, (l) => {
          if (l.errorMessage) return a(new Error(l.errorMessage));
          o(l);
        });
        const c = (l) => {
            this.handleWeb3ResponseMessage(
              (0, Pe.Web3ResponseMessage)({
                id: n,
                response: (0, Ue.SelectProviderResponse)(
                  l4.ProviderType.Unselected
                ),
              })
            );
          },
          u = (l) => {
            this.handleWeb3ResponseMessage(
              (0, Pe.Web3ResponseMessage)({
                id: n,
                response: (0, Ue.SelectProviderResponse)(l),
              })
            );
          };
        this.ui.selectProvider &&
          this.ui.selectProvider({
            onApprove: u,
            onCancel: c,
            providerOptions: e,
          });
      });
    return { cancel: i, promise: s };
  }
  watchAsset(e, r, n, i, s, o) {
    const a = {
      method: Se.Web3Method.watchAsset,
      params: {
        type: e,
        options: { address: r, symbol: n, decimals: i, image: s },
        chainId: o,
      },
    };
    let c = null;
    const u = (0, ie.randomBytesHex)(8),
      l = (h) => {
        this.publishWeb3RequestCanceledEvent(u),
          this.handleErrorResponse(u, a.method, h),
          c?.();
      };
    this.ui.inlineWatchAsset() ||
      (c = this.ui.showConnecting({
        isUnlinkedErrorState: this.isUnlinkedErrorState,
        onCancel: l,
        onResetConnection: this.resetAndReload,
      }));
    const f = new Promise((h, y) => {
      this.relayEventManager.callbacks.set(u, (E) => {
        if ((c?.(), E.errorMessage)) return y(new Error(E.errorMessage));
        h(E);
      });
      const _ = (E) => {
          this.handleWeb3ResponseMessage(
            (0, Pe.Web3ResponseMessage)({
              id: u,
              response: (0, Ue.WatchAssetReponse)(!1),
            })
          );
        },
        x = () => {
          this.handleWeb3ResponseMessage(
            (0, Pe.Web3ResponseMessage)({
              id: u,
              response: (0, Ue.WatchAssetReponse)(!0),
            })
          );
        };
      this.ui.inlineWatchAsset() &&
        this.ui.watchAsset({
          onApprove: x,
          onCancel: _,
          type: e,
          address: r,
          symbol: n,
          decimals: i,
          image: s,
          chainId: o,
        }),
        !this.ui.inlineWatchAsset() &&
          !this.ui.isStandalone() &&
          this.publishWeb3RequestEvent(u, a);
    });
    return { cancel: l, promise: f };
  }
  addEthereumChain(e, r, n, i, s, o) {
    const a = {
      method: Se.Web3Method.addEthereumChain,
      params: {
        chainId: e,
        rpcUrls: r,
        blockExplorerUrls: i,
        chainName: s,
        iconUrls: n,
        nativeCurrency: o,
      },
    };
    let c = null;
    const u = (0, ie.randomBytesHex)(8),
      l = (h) => {
        this.publishWeb3RequestCanceledEvent(u),
          this.handleErrorResponse(u, a.method, h),
          c?.();
      };
    return (
      this.ui.inlineAddEthereumChain(e) ||
        (c = this.ui.showConnecting({
          isUnlinkedErrorState: this.isUnlinkedErrorState,
          onCancel: l,
          onResetConnection: this.resetAndReload,
        })),
      {
        promise: new Promise((h, y) => {
          this.relayEventManager.callbacks.set(u, (E) => {
            if ((c?.(), E.errorMessage)) return y(new Error(E.errorMessage));
            h(E);
          });
          const _ = (E) => {
              this.handleWeb3ResponseMessage(
                (0, Pe.Web3ResponseMessage)({
                  id: u,
                  response: (0, Ue.AddEthereumChainResponse)({
                    isApproved: !1,
                    rpcUrl: '',
                  }),
                })
              );
            },
            x = (E) => {
              this.handleWeb3ResponseMessage(
                (0, Pe.Web3ResponseMessage)({
                  id: u,
                  response: (0, Ue.AddEthereumChainResponse)({
                    isApproved: !0,
                    rpcUrl: E,
                  }),
                })
              );
            };
          this.ui.inlineAddEthereumChain(e) &&
            this.ui.addEthereumChain({
              onCancel: _,
              onApprove: x,
              chainId: a.params.chainId,
              rpcUrls: a.params.rpcUrls,
              blockExplorerUrls: a.params.blockExplorerUrls,
              chainName: a.params.chainName,
              iconUrls: a.params.iconUrls,
              nativeCurrency: a.params.nativeCurrency,
            }),
            !this.ui.inlineAddEthereumChain(e) &&
              !this.ui.isStandalone() &&
              this.publishWeb3RequestEvent(u, a);
        }),
        cancel: l,
      }
    );
  }
  switchEthereumChain(e, r) {
    const n = {
        method: Se.Web3Method.switchEthereumChain,
        params: Object.assign({ chainId: e }, { address: r }),
      },
      i = (0, ie.randomBytesHex)(8),
      s = (a) => {
        this.publishWeb3RequestCanceledEvent(i),
          this.handleErrorResponse(i, n.method, a);
      };
    return {
      promise: new Promise((a, c) => {
        this.relayEventManager.callbacks.set(i, (f) => {
          if ((0, Ue.isErrorResponse)(f) && f.errorCode)
            return c(
              Cr.standardErrors.provider.custom({
                code: f.errorCode,
                message:
                  'Unrecognized chain ID. Try adding the chain using addEthereumChain first.',
              })
            );
          if (f.errorMessage) return c(new Error(f.errorMessage));
          a(f);
        });
        const u = (f) => {
            var h;
            if (f) {
              const y =
                (h = (0, Cr.getErrorCode)(f)) !== null && h !== void 0
                  ? h
                  : Cr.standardErrorCodes.provider.unsupportedChain;
              this.handleErrorResponse(
                i,
                Se.Web3Method.switchEthereumChain,
                f instanceof Error
                  ? f
                  : Cr.standardErrors.provider.unsupportedChain(e),
                y
              );
            } else
              this.handleWeb3ResponseMessage(
                (0, Pe.Web3ResponseMessage)({
                  id: i,
                  response: (0, Ue.SwitchEthereumChainResponse)({
                    isApproved: !1,
                    rpcUrl: '',
                  }),
                })
              );
          },
          l = (f) => {
            this.handleWeb3ResponseMessage(
              (0, Pe.Web3ResponseMessage)({
                id: i,
                response: (0, Ue.SwitchEthereumChainResponse)({
                  isApproved: !0,
                  rpcUrl: f,
                }),
              })
            );
          };
        this.ui.switchEthereumChain({
          onCancel: u,
          onApprove: l,
          chainId: n.params.chainId,
          address: n.params.address,
        }),
          !this.ui.inlineSwitchEthereumChain() &&
            !this.ui.isStandalone() &&
            this.publishWeb3RequestEvent(i, n);
      }),
      cancel: s,
    };
  }
  inlineAddEthereumChain(e) {
    return this.ui.inlineAddEthereumChain(e);
  }
  getSessionIdHash() {
    return Lt.Session.hash(this._session.id);
  }
  sendRequestStandalone(e, r) {
    const n = (s) => {
        this.handleErrorResponse(e, r.method, s);
      },
      i = (s) => {
        this.handleWeb3ResponseMessage(
          (0, Pe.Web3ResponseMessage)({ id: e, response: s })
        );
      };
    switch (r.method) {
      case Se.Web3Method.signEthereumMessage:
        this.ui.signEthereumMessage({ request: r, onSuccess: i, onCancel: n });
        break;
      case Se.Web3Method.signEthereumTransaction:
        this.ui.signEthereumTransaction({
          request: r,
          onSuccess: i,
          onCancel: n,
        });
        break;
      case Se.Web3Method.submitEthereumTransaction:
        this.ui.submitEthereumTransaction({
          request: r,
          onSuccess: i,
          onCancel: n,
        });
        break;
      case Se.Web3Method.ethereumAddressFromSignedMessage:
        this.ui.ethereumAddressFromSignedMessage({ request: r, onSuccess: i });
        break;
      default:
        n();
        break;
    }
  }
  onSessionConfigChanged(e) {}
}
nt.accountRequestCallbackIds = new Set();
od([ad.default], nt.prototype, 'resetAndReload', null);
od([ad.default], nt.prototype, 'handleIncomingEvent', null);
ds.WalletSDKRelay = nt;
var Ss = {};
Object.defineProperty(Ss, '__esModule', { value: !0 });
Ss.WalletSDKRelayEventManager = void 0;
const d4 = L;
class p4 {
  constructor() {
    (this._nextRequestId = 0), (this.callbacks = new Map());
  }
  makeRequestId() {
    this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
    const e = this._nextRequestId,
      r = (0, d4.prepend0x)(e.toString(16));
    return this.callbacks.get(r) && this.callbacks.delete(r), e;
  }
}
Ss.WalletSDKRelayEventManager = p4;
Object.defineProperty(wn, '__esModule', { value: !0 });
wn.CoinbaseWalletSDK = void 0;
const b4 = ki,
  g4 = Mi,
  y4 = Ri,
  v4 = Lr,
  m4 = Yi,
  w4 = ds,
  _4 = Ss,
  S4 = L,
  cd = Qr;
class Es {
  constructor(e) {
    var r, n, i;
    (this._appName = ''),
      (this._appLogoUrl = null),
      (this._relay = null),
      (this._relayEventManager = null);
    const s = e.linkAPIUrl || g4.LINK_API_URL;
    let o;
    if (
      (e.uiConstructor
        ? (o = e.uiConstructor)
        : (o = (u) => new m4.WalletSDKUI(u)),
      typeof e.overrideIsMetaMask > 'u'
        ? (this._overrideIsMetaMask = !1)
        : (this._overrideIsMetaMask = e.overrideIsMetaMask),
      (this._overrideIsCoinbaseWallet =
        (r = e.overrideIsCoinbaseWallet) !== null && r !== void 0 ? r : !0),
      (this._overrideIsCoinbaseBrowser =
        (n = e.overrideIsCoinbaseBrowser) !== null && n !== void 0 ? n : !1),
      e.diagnosticLogger && e.eventListener)
    )
      throw new Error(
        "Can't have both eventListener and diagnosticLogger options, use only diagnosticLogger"
      );
    e.eventListener
      ? (this._diagnosticLogger = { log: e.eventListener.onEvent })
      : (this._diagnosticLogger = e.diagnosticLogger),
      (this._reloadOnDisconnect =
        (i = e.reloadOnDisconnect) !== null && i !== void 0 ? i : !0);
    const a = new URL(s),
      c = `${a.protocol}//${a.host}`;
    (this._storage = new y4.ScopedLocalStorage(`-walletlink:${c}`)),
      this._storage.setItem('version', Es.VERSION),
      !(this.walletExtension || this.coinbaseBrowser) &&
        ((this._relayEventManager = new _4.WalletSDKRelayEventManager()),
        (this._relay = new w4.WalletSDKRelay({
          linkAPIUrl: s,
          version: cd.LIB_VERSION,
          darkMode: !!e.darkMode,
          uiConstructor: o,
          storage: this._storage,
          relayEventManager: this._relayEventManager,
          diagnosticLogger: this._diagnosticLogger,
          reloadOnDisconnect: this._reloadOnDisconnect,
        })),
        this.setAppInfo(e.appName, e.appLogoUrl),
        !e.headlessMode && this._relay.attachUI());
  }
  makeWeb3Provider(e = '', r = 1) {
    const n = this.walletExtension;
    if (n)
      return (
        this.isCipherProvider(n) || n.setProviderInfo(e, r),
        this._reloadOnDisconnect === !1 &&
          typeof n.disableReloadOnDisconnect == 'function' &&
          n.disableReloadOnDisconnect(),
        n
      );
    const i = this.coinbaseBrowser;
    if (i) return i;
    const s = this._relay;
    if (!s || !this._relayEventManager || !this._storage)
      throw new Error('Relay not initialized, should never happen');
    return (
      e || s.setConnectDisabled(!0),
      new v4.CoinbaseWalletProvider({
        relayProvider: () => Promise.resolve(s),
        relayEventManager: this._relayEventManager,
        storage: this._storage,
        jsonRpcUrl: e,
        chainId: r,
        qrUrl: this.getQrUrl(),
        diagnosticLogger: this._diagnosticLogger,
        overrideIsMetaMask: this._overrideIsMetaMask,
        overrideIsCoinbaseWallet: this._overrideIsCoinbaseWallet,
        overrideIsCoinbaseBrowser: this._overrideIsCoinbaseBrowser,
      })
    );
  }
  setAppInfo(e, r) {
    var n;
    (this._appName = e || 'DApp'),
      (this._appLogoUrl = r || (0, S4.getFavicon)());
    const i = this.walletExtension;
    i
      ? this.isCipherProvider(i) ||
        i.setAppInfo(this._appName, this._appLogoUrl)
      : (n = this._relay) === null ||
        n === void 0 ||
        n.setAppInfo(this._appName, this._appLogoUrl);
  }
  disconnect() {
    var e;
    const r = this.walletExtension;
    r
      ? r.close()
      : (e = this._relay) === null || e === void 0 || e.resetAndReload();
  }
  getQrUrl() {
    var e, r;
    return (r =
      (e = this._relay) === null || e === void 0
        ? void 0
        : e.getQRCodeUrl()) !== null && r !== void 0
      ? r
      : null;
  }
  getCoinbaseWalletLogo(e, r = 240) {
    return (0, b4.walletLogo)(e, r);
  }
  get walletExtension() {
    var e;
    return (e = window.coinbaseWalletExtension) !== null && e !== void 0
      ? e
      : window.walletLinkExtension;
  }
  get coinbaseBrowser() {
    var e, r;
    try {
      const n =
        (e = window.ethereum) !== null && e !== void 0
          ? e
          : (r = window.top) === null || r === void 0
            ? void 0
            : r.ethereum;
      return n && 'isCoinbaseBrowser' in n && n.isCoinbaseBrowser ? n : void 0;
    } catch {
      return;
    }
  }
  isCipherProvider(e) {
    return typeof e.isCipher == 'boolean' && e.isCipher;
  }
}
wn.CoinbaseWalletSDK = Es;
Es.VERSION = cd.LIB_VERSION;
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.CoinbaseWalletProvider = t.CoinbaseWalletSDK = void 0);
  const e = wn,
    r = Lr;
  var n = wn;
  Object.defineProperty(t, 'CoinbaseWalletSDK', {
    enumerable: !0,
    get: function () {
      return n.CoinbaseWalletSDK;
    },
  });
  var i = Lr;
  Object.defineProperty(t, 'CoinbaseWalletProvider', {
    enumerable: !0,
    get: function () {
      return i.CoinbaseWalletProvider;
    },
  }),
    (t.default = e.CoinbaseWalletSDK),
    typeof window < 'u' &&
      ((window.CoinbaseWalletSDK = e.CoinbaseWalletSDK),
      (window.CoinbaseWalletProvider = r.CoinbaseWalletProvider),
      (window.WalletLink = e.CoinbaseWalletSDK),
      (window.WalletLinkProvider = r.CoinbaseWalletProvider));
})(xa);
const E4 = fd(xa),
  N4 = pd({ __proto__: null, default: E4 }, [xa]);
export { N4 as i };
