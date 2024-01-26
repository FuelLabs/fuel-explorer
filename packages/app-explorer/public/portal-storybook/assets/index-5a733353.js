import { c as N, a as Gt, g as fh } from './_commonjsHelpers-de833af9.js';
import {
  z as So,
  bd as Wn,
  be as et,
  bf as k,
} from './AccountConnectionInput-7bc330b7.js';
import { i as Hn, r as Pc, s as dh, t as ph } from './index-0c70cacd.js';
import { l as bh } from './index-578a7485.js';
import { f as gh, i as vh } from './hooks.module-835c4290.js';
function yh(t, e) {
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
var Eo = {},
  Ur = {},
  Vn = {};
Object.defineProperty(Vn, '__esModule', { value: !0 });
Vn.walletLogo = void 0;
const mh = (t, e) => {
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
Vn.walletLogo = mh;
var zn = {};
Object.defineProperty(zn, '__esModule', { value: !0 });
zn.LINK_API_URL = void 0;
zn.LINK_API_URL = 'https://www.walletlink.org';
var Un = {};
Object.defineProperty(Un, '__esModule', { value: !0 });
Un.ScopedLocalStorage = void 0;
class wh {
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
Un.ScopedLocalStorage = wh;
var br = {},
  Zt = {};
Object.defineProperty(Zt, '__esModule', { value: !0 });
const _h = So;
function ba(t, e, r) {
  try {
    Reflect.apply(t, e, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    });
  }
}
function Sh(t) {
  const e = t.length,
    r = new Array(e);
  for (let n = 0; n < e; n += 1) r[n] = t[n];
  return r;
}
let Eh = class extends _h.EventEmitter {
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
    if (typeof s == 'function') ba(s, this, r);
    else {
      const o = s.length,
        a = Sh(s);
      for (let c = 0; c < o; c += 1) ba(a[c], this, r);
    }
    return !0;
  }
};
Zt.default = Eh;
var kr = {};
Object.defineProperty(kr, '__esModule', { value: !0 });
kr.EVENTS = void 0;
kr.EVENTS = {
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
var Kr = {},
  Co = {},
  At = {},
  Ch = qr;
qr.default = qr;
qr.stable = Wc;
qr.stableStringify = Wc;
var On = '[...]',
  Fc = '[Circular]',
  zt = [],
  Ht = [];
function $c() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER,
  };
}
function qr(t, e, r, n) {
  typeof n > 'u' && (n = $c()), oo(t, '', 0, [], void 0, 0, n);
  var i;
  try {
    Ht.length === 0
      ? (i = JSON.stringify(t, e, r))
      : (i = JSON.stringify(t, Hc(e), r));
  } catch {
    return JSON.stringify(
      '[unable to serialize, circular reference is too complex to analyze]'
    );
  } finally {
    for (; zt.length !== 0; ) {
      var s = zt.pop();
      s.length === 4
        ? Object.defineProperty(s[0], s[1], s[3])
        : (s[0][s[1]] = s[2]);
    }
  }
  return i;
}
function hr(t, e, r, n) {
  var i = Object.getOwnPropertyDescriptor(n, r);
  i.get !== void 0
    ? i.configurable
      ? (Object.defineProperty(n, r, { value: t }), zt.push([n, r, e, i]))
      : Ht.push([e, r, t])
    : ((n[r] = t), zt.push([n, r, e]));
}
function oo(t, e, r, n, i, s, o) {
  s += 1;
  var a;
  if (typeof t == 'object' && t !== null) {
    for (a = 0; a < n.length; a++)
      if (n[a] === t) {
        hr(Fc, t, e, i);
        return;
      }
    if (typeof o.depthLimit < 'u' && s > o.depthLimit) {
      hr(On, t, e, i);
      return;
    }
    if (typeof o.edgesLimit < 'u' && r + 1 > o.edgesLimit) {
      hr(On, t, e, i);
      return;
    }
    if ((n.push(t), Array.isArray(t)))
      for (a = 0; a < t.length; a++) oo(t[a], a, a, n, t, s, o);
    else {
      var c = Object.keys(t);
      for (a = 0; a < c.length; a++) {
        var u = c[a];
        oo(t[u], u, a, n, t, s, o);
      }
    }
    n.pop();
  }
}
function xh(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function Wc(t, e, r, n) {
  typeof n > 'u' && (n = $c());
  var i = ao(t, '', 0, [], void 0, 0, n) || t,
    s;
  try {
    Ht.length === 0
      ? (s = JSON.stringify(i, e, r))
      : (s = JSON.stringify(i, Hc(e), r));
  } catch {
    return JSON.stringify(
      '[unable to serialize, circular reference is too complex to analyze]'
    );
  } finally {
    for (; zt.length !== 0; ) {
      var o = zt.pop();
      o.length === 4
        ? Object.defineProperty(o[0], o[1], o[3])
        : (o[0][o[1]] = o[2]);
    }
  }
  return s;
}
function ao(t, e, r, n, i, s, o) {
  s += 1;
  var a;
  if (typeof t == 'object' && t !== null) {
    for (a = 0; a < n.length; a++)
      if (n[a] === t) {
        hr(Fc, t, e, i);
        return;
      }
    try {
      if (typeof t.toJSON == 'function') return;
    } catch {
      return;
    }
    if (typeof o.depthLimit < 'u' && s > o.depthLimit) {
      hr(On, t, e, i);
      return;
    }
    if (typeof o.edgesLimit < 'u' && r + 1 > o.edgesLimit) {
      hr(On, t, e, i);
      return;
    }
    if ((n.push(t), Array.isArray(t)))
      for (a = 0; a < t.length; a++) ao(t[a], a, a, n, t, s, o);
    else {
      var c = {},
        u = Object.keys(t).sort(xh);
      for (a = 0; a < u.length; a++) {
        var l = u[a];
        ao(t[l], l, a, n, t, s, o), (c[l] = t[l]);
      }
      if (typeof i < 'u') zt.push([i, e, t]), (i[e] = c);
      else return c;
    }
    n.pop();
  }
}
function Hc(t) {
  return (
    (t =
      typeof t < 'u'
        ? t
        : function (e, r) {
            return r;
          }),
    function (e, r) {
      if (Ht.length > 0)
        for (var n = 0; n < Ht.length; n++) {
          var i = Ht[n];
          if (i[1] === e && i[0] === r) {
            (r = i[2]), Ht.splice(n, 1);
            break;
          }
        }
      return t.call(this, e, r);
    }
  );
}
Object.defineProperty(At, '__esModule', { value: !0 });
At.EthereumProviderError = At.EthereumRpcError = void 0;
const kh = Ch;
class Vc extends Error {
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
    return kh.default(this.serialize(), Rh, 2);
  }
}
At.EthereumRpcError = Vc;
class Ih extends Vc {
  constructor(e, r, n) {
    if (!Mh(e))
      throw new Error(
        '"code" must be an integer such that: 1000 <= code <= 4999'
      );
    super(e, r, n);
  }
}
At.EthereumProviderError = Ih;
function Mh(t) {
  return Number.isInteger(t) && t >= 1e3 && t <= 4999;
}
function Rh(t, e) {
  if (e !== '[Circular]') return e;
}
var xo = {},
  Tt = {};
Object.defineProperty(Tt, '__esModule', { value: !0 });
Tt.errorValues = Tt.errorCodes = void 0;
Tt.errorCodes = {
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
Tt.errorValues = {
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
  const e = Tt,
    r = At,
    n = e.errorCodes.rpc.internal,
    i = 'Unspecified error message. This is a bug, please report it.',
    s = { code: n, message: o(n) };
  t.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.';
  function o(p, m = i) {
    if (Number.isInteger(p)) {
      const C = p.toString();
      if (h(e.errorValues, C)) return e.errorValues[C].message;
      if (u(p)) return t.JSON_RPC_SERVER_ERROR_MESSAGE;
    }
    return m;
  }
  t.getMessageFromCode = o;
  function a(p) {
    if (!Number.isInteger(p)) return !1;
    const m = p.toString();
    return !!(e.errorValues[m] || u(p));
  }
  t.isValidCode = a;
  function c(p, { fallbackError: m = s, shouldIncludeStack: C = !1 } = {}) {
    var x, S;
    if (!m || !Number.isInteger(m.code) || typeof m.message != 'string')
      throw new Error(
        'Must provide fallback error with integer number code and string message.'
      );
    if (p instanceof r.EthereumRpcError) return p.serialize();
    const b = {};
    if (
      p &&
      typeof p == 'object' &&
      !Array.isArray(p) &&
      h(p, 'code') &&
      a(p.code)
    ) {
      const w = p;
      (b.code = w.code),
        w.message && typeof w.message == 'string'
          ? ((b.message = w.message), h(w, 'data') && (b.data = w.data))
          : ((b.message = o(b.code)), (b.data = { originalError: l(p) }));
    } else {
      b.code = m.code;
      const w = (x = p) === null || x === void 0 ? void 0 : x.message;
      (b.message = w && typeof w == 'string' ? w : m.message),
        (b.data = { originalError: l(p) });
    }
    const g = (S = p) === null || S === void 0 ? void 0 : S.stack;
    return C && p && g && typeof g == 'string' && (b.stack = g), b;
  }
  t.serializeError = c;
  function u(p) {
    return p >= -32099 && p <= -32e3;
  }
  function l(p) {
    return p && typeof p == 'object' && !Array.isArray(p)
      ? Object.assign({}, p)
      : p;
  }
  function h(p, m) {
    return Object.prototype.hasOwnProperty.call(p, m);
  }
})(xo);
var qn = {};
Object.defineProperty(qn, '__esModule', { value: !0 });
qn.ethErrors = void 0;
const ko = At,
  zc = xo,
  _e = Tt;
qn.ethErrors = {
  rpc: {
    parse: (t) => Be(_e.errorCodes.rpc.parse, t),
    invalidRequest: (t) => Be(_e.errorCodes.rpc.invalidRequest, t),
    invalidParams: (t) => Be(_e.errorCodes.rpc.invalidParams, t),
    methodNotFound: (t) => Be(_e.errorCodes.rpc.methodNotFound, t),
    internal: (t) => Be(_e.errorCodes.rpc.internal, t),
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
      return Be(e, t);
    },
    invalidInput: (t) => Be(_e.errorCodes.rpc.invalidInput, t),
    resourceNotFound: (t) => Be(_e.errorCodes.rpc.resourceNotFound, t),
    resourceUnavailable: (t) => Be(_e.errorCodes.rpc.resourceUnavailable, t),
    transactionRejected: (t) => Be(_e.errorCodes.rpc.transactionRejected, t),
    methodNotSupported: (t) => Be(_e.errorCodes.rpc.methodNotSupported, t),
    limitExceeded: (t) => Be(_e.errorCodes.rpc.limitExceeded, t),
  },
  provider: {
    userRejectedRequest: (t) =>
      Fr(_e.errorCodes.provider.userRejectedRequest, t),
    unauthorized: (t) => Fr(_e.errorCodes.provider.unauthorized, t),
    unsupportedMethod: (t) => Fr(_e.errorCodes.provider.unsupportedMethod, t),
    disconnected: (t) => Fr(_e.errorCodes.provider.disconnected, t),
    chainDisconnected: (t) => Fr(_e.errorCodes.provider.chainDisconnected, t),
    custom: (t) => {
      if (!t || typeof t != 'object' || Array.isArray(t))
        throw new Error(
          'Ethereum Provider custom errors must provide single object argument.'
        );
      const { code: e, message: r, data: n } = t;
      if (!r || typeof r != 'string')
        throw new Error('"message" must be a nonempty string');
      return new ko.EthereumProviderError(e, r, n);
    },
  },
};
function Be(t, e) {
  const [r, n] = Uc(e);
  return new ko.EthereumRpcError(t, r || zc.getMessageFromCode(t), n);
}
function Fr(t, e) {
  const [r, n] = Uc(e);
  return new ko.EthereumProviderError(t, r || zc.getMessageFromCode(t), n);
}
function Uc(t) {
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
  const e = At;
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
  const r = xo;
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
  const n = qn;
  Object.defineProperty(t, 'ethErrors', {
    enumerable: !0,
    get: function () {
      return n.ethErrors;
    },
  });
  const i = Tt;
  Object.defineProperty(t, 'errorCodes', {
    enumerable: !0,
    get: function () {
      return i.errorCodes;
    },
  });
})(Co);
var X = {},
  Jn = {};
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
})(Jn);
Object.defineProperty(X, '__esModule', { value: !0 });
X.EthereumAddressFromSignedMessageResponse =
  X.SubmitEthereumTransactionResponse =
  X.SignEthereumTransactionResponse =
  X.SignEthereumMessageResponse =
  X.isRequestEthereumAccountsResponse =
  X.SelectProviderResponse =
  X.WatchAssetReponse =
  X.RequestEthereumAccountsResponse =
  X.SwitchEthereumChainResponse =
  X.AddEthereumChainResponse =
  X.isErrorResponse =
    void 0;
const ht = Jn;
function Ah(t) {
  var e, r;
  return (
    ((e = t) === null || e === void 0 ? void 0 : e.method) !== void 0 &&
    ((r = t) === null || r === void 0 ? void 0 : r.errorMessage) !== void 0
  );
}
X.isErrorResponse = Ah;
function Th(t) {
  return { method: ht.Web3Method.addEthereumChain, result: t };
}
X.AddEthereumChainResponse = Th;
function Nh(t) {
  return { method: ht.Web3Method.switchEthereumChain, result: t };
}
X.SwitchEthereumChainResponse = Nh;
function Oh(t) {
  return { method: ht.Web3Method.requestEthereumAccounts, result: t };
}
X.RequestEthereumAccountsResponse = Oh;
function Lh(t) {
  return { method: ht.Web3Method.watchAsset, result: t };
}
X.WatchAssetReponse = Lh;
function Dh(t) {
  return { method: ht.Web3Method.selectProvider, result: t };
}
X.SelectProviderResponse = Dh;
function jh(t) {
  return t && t.method === ht.Web3Method.requestEthereumAccounts;
}
X.isRequestEthereumAccountsResponse = jh;
function Bh(t) {
  return { method: ht.Web3Method.signEthereumMessage, result: t };
}
X.SignEthereumMessageResponse = Bh;
function Ph(t) {
  return { method: ht.Web3Method.signEthereumTransaction, result: t };
}
X.SignEthereumTransactionResponse = Ph;
function Fh(t) {
  return { method: ht.Web3Method.submitEthereumTransaction, result: t };
}
X.SubmitEthereumTransactionResponse = Fh;
function $h(t) {
  return { method: ht.Web3Method.ethereumAddressFromSignedMessage, result: t };
}
X.EthereumAddressFromSignedMessageResponse = $h;
var Ir = {};
Object.defineProperty(Ir, '__esModule', { value: !0 });
Ir.LIB_VERSION = void 0;
Ir.LIB_VERSION = '3.7.2';
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.getErrorCode =
      t.serializeError =
      t.standardErrors =
      t.standardErrorMessage =
      t.standardErrorCodes =
        void 0);
  const e = Co,
    r = X,
    n = Ir;
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
  function s(l, h) {
    const p = (0, e.serializeError)(o(l), { shouldIncludeStack: !0 }),
      m = new URL('https://docs.cloud.coinbase.com/wallet-sdk/docs/errors');
    m.searchParams.set('version', n.LIB_VERSION),
      m.searchParams.set('code', p.code.toString());
    const C = a(p.data, h);
    return (
      C && m.searchParams.set('method', C),
      m.searchParams.set('message', p.message),
      Object.assign(Object.assign({}, p), { docUrl: m.href })
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
  function a(l, h) {
    var p;
    const m = (p = l) === null || p === void 0 ? void 0 : p.method;
    if (m) return m;
    if (h !== void 0)
      return typeof h == 'string'
        ? h
        : Array.isArray(h)
          ? h.length > 0
            ? h[0].method
            : void 0
          : h.method;
  }
  function c(l) {
    var h;
    if (typeof l == 'number') return l;
    if (u(l)) return (h = l.code) !== null && h !== void 0 ? h : l.errorCode;
  }
  t.getErrorCode = c;
  function u(l) {
    return (
      typeof l == 'object' &&
      l !== null &&
      (typeof l.code == 'number' || typeof l.errorCode == 'number')
    );
  }
})(Kr);
var Mr = {},
  qc = { exports: {} },
  co = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ (function (
  t,
  e
) {
  var r = Wn,
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
})(co, co.exports);
var Dt = co.exports,
  Jc = Dt.Buffer;
function Gn(t, e) {
  (this._block = Jc.alloc(t)),
    (this._finalSize = e),
    (this._blockSize = t),
    (this._len = 0);
}
Gn.prototype.update = function (t, e) {
  typeof t == 'string' && ((e = e || 'utf8'), (t = Jc.from(t, e)));
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
Gn.prototype.digest = function (t) {
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
Gn.prototype._update = function () {
  throw new Error('_update must be implemented by subclass');
};
var Rr = Gn,
  Wh = et,
  Gc = Rr,
  Hh = Dt.Buffer,
  Vh = [1518500249, 1859775393, -1894007588, -899497514],
  zh = new Array(80);
function Xr() {
  this.init(), (this._w = zh), Gc.call(this, 64, 56);
}
Wh(Xr, Gc);
Xr.prototype.init = function () {
  return (
    (this._a = 1732584193),
    (this._b = 4023233417),
    (this._c = 2562383102),
    (this._d = 271733878),
    (this._e = 3285377520),
    this
  );
};
function Uh(t) {
  return (t << 5) | (t >>> 27);
}
function qh(t) {
  return (t << 30) | (t >>> 2);
}
function Jh(t, e, r, n) {
  return t === 0
    ? (e & r) | (~e & n)
    : t === 2
      ? (e & r) | (e & n) | (r & n)
      : e ^ r ^ n;
}
Xr.prototype._update = function (t) {
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
      l = (Uh(r) + Jh(u, n, i, s) + o + e[c] + Vh[u]) | 0;
    (o = s), (s = i), (i = qh(n)), (n = r), (r = l);
  }
  (this._a = (r + this._a) | 0),
    (this._b = (n + this._b) | 0),
    (this._c = (i + this._c) | 0),
    (this._d = (s + this._d) | 0),
    (this._e = (o + this._e) | 0);
};
Xr.prototype._hash = function () {
  var t = Hh.allocUnsafe(20);
  return (
    t.writeInt32BE(this._a | 0, 0),
    t.writeInt32BE(this._b | 0, 4),
    t.writeInt32BE(this._c | 0, 8),
    t.writeInt32BE(this._d | 0, 12),
    t.writeInt32BE(this._e | 0, 16),
    t
  );
};
var Gh = Xr,
  Zh = et,
  Zc = Rr,
  Qh = Dt.Buffer,
  Yh = [1518500249, 1859775393, -1894007588, -899497514],
  Kh = new Array(80);
function en() {
  this.init(), (this._w = Kh), Zc.call(this, 64, 56);
}
Zh(en, Zc);
en.prototype.init = function () {
  return (
    (this._a = 1732584193),
    (this._b = 4023233417),
    (this._c = 2562383102),
    (this._d = 271733878),
    (this._e = 3285377520),
    this
  );
};
function Xh(t) {
  return (t << 1) | (t >>> 31);
}
function ef(t) {
  return (t << 5) | (t >>> 27);
}
function tf(t) {
  return (t << 30) | (t >>> 2);
}
function rf(t, e, r, n) {
  return t === 0
    ? (e & r) | (~e & n)
    : t === 2
      ? (e & r) | (e & n) | (r & n)
      : e ^ r ^ n;
}
en.prototype._update = function (t) {
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
  for (; a < 80; ++a) e[a] = Xh(e[a - 3] ^ e[a - 8] ^ e[a - 14] ^ e[a - 16]);
  for (var c = 0; c < 80; ++c) {
    var u = ~~(c / 20),
      l = (ef(r) + rf(u, n, i, s) + o + e[c] + Yh[u]) | 0;
    (o = s), (s = i), (i = tf(n)), (n = r), (r = l);
  }
  (this._a = (r + this._a) | 0),
    (this._b = (n + this._b) | 0),
    (this._c = (i + this._c) | 0),
    (this._d = (s + this._d) | 0),
    (this._e = (o + this._e) | 0);
};
en.prototype._hash = function () {
  var t = Qh.allocUnsafe(20);
  return (
    t.writeInt32BE(this._a | 0, 0),
    t.writeInt32BE(this._b | 0, 4),
    t.writeInt32BE(this._c | 0, 8),
    t.writeInt32BE(this._d | 0, 12),
    t.writeInt32BE(this._e | 0, 16),
    t
  );
};
var nf = en,
  sf = et,
  Qc = Rr,
  of = Dt.Buffer,
  af = [
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
  cf = new Array(64);
function tn() {
  this.init(), (this._w = cf), Qc.call(this, 64, 56);
}
sf(tn, Qc);
tn.prototype.init = function () {
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
function uf(t, e, r) {
  return r ^ (t & (e ^ r));
}
function lf(t, e, r) {
  return (t & e) | (r & (t | e));
}
function hf(t) {
  return (
    ((t >>> 2) | (t << 30)) ^
    ((t >>> 13) | (t << 19)) ^
    ((t >>> 22) | (t << 10))
  );
}
function ff(t) {
  return (
    ((t >>> 6) | (t << 26)) ^ ((t >>> 11) | (t << 21)) ^ ((t >>> 25) | (t << 7))
  );
}
function df(t) {
  return ((t >>> 7) | (t << 25)) ^ ((t >>> 18) | (t << 14)) ^ (t >>> 3);
}
function pf(t) {
  return ((t >>> 17) | (t << 15)) ^ ((t >>> 19) | (t << 13)) ^ (t >>> 10);
}
tn.prototype._update = function (t) {
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
    e[l] = (pf(e[l - 2]) + e[l - 7] + df(e[l - 15]) + e[l - 16]) | 0;
  for (var h = 0; h < 64; ++h) {
    var p = (u + ff(o) + uf(o, a, c) + af[h] + e[h]) | 0,
      m = (hf(r) + lf(r, n, i)) | 0;
    (u = c),
      (c = a),
      (a = o),
      (o = (s + p) | 0),
      (s = i),
      (i = n),
      (n = r),
      (r = (p + m) | 0);
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
tn.prototype._hash = function () {
  var t = of.allocUnsafe(32);
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
var Yc = tn,
  bf = et,
  gf = Yc,
  vf = Rr,
  yf = Dt.Buffer,
  mf = new Array(64);
function Zn() {
  this.init(), (this._w = mf), vf.call(this, 64, 56);
}
bf(Zn, gf);
Zn.prototype.init = function () {
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
Zn.prototype._hash = function () {
  var t = yf.allocUnsafe(28);
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
var wf = Zn,
  _f = et,
  Kc = Rr,
  Sf = Dt.Buffer,
  ga = [
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
  Ef = new Array(160);
function rn() {
  this.init(), (this._w = Ef), Kc.call(this, 128, 112);
}
_f(rn, Kc);
rn.prototype.init = function () {
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
function va(t, e, r) {
  return r ^ (t & (e ^ r));
}
function ya(t, e, r) {
  return (t & e) | (r & (t | e));
}
function ma(t, e) {
  return (
    ((t >>> 28) | (e << 4)) ^ ((e >>> 2) | (t << 30)) ^ ((e >>> 7) | (t << 25))
  );
}
function wa(t, e) {
  return (
    ((t >>> 14) | (e << 18)) ^
    ((t >>> 18) | (e << 14)) ^
    ((e >>> 9) | (t << 23))
  );
}
function Cf(t, e) {
  return ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ (t >>> 7);
}
function xf(t, e) {
  return (
    ((t >>> 1) | (e << 31)) ^ ((t >>> 8) | (e << 24)) ^ ((t >>> 7) | (e << 25))
  );
}
function kf(t, e) {
  return ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ (t >>> 6);
}
function If(t, e) {
  return (
    ((t >>> 19) | (e << 13)) ^ ((e >>> 29) | (t << 3)) ^ ((t >>> 6) | (e << 26))
  );
}
function be(t, e) {
  return t >>> 0 < e >>> 0 ? 1 : 0;
}
rn.prototype._update = function (t) {
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
      h = this._bl | 0,
      p = this._cl | 0,
      m = this._dl | 0,
      C = this._el | 0,
      x = this._fl | 0,
      S = this._gl | 0,
      b = this._hl | 0,
      g = 0;
    g < 32;
    g += 2
  )
    (e[g] = t.readInt32BE(g * 4)), (e[g + 1] = t.readInt32BE(g * 4 + 4));
  for (; g < 160; g += 2) {
    var w = e[g - 30],
      E = e[g - 15 * 2 + 1],
      _ = Cf(w, E),
      R = xf(E, w);
    (w = e[g - 2 * 2]), (E = e[g - 2 * 2 + 1]);
    var P = kf(w, E),
      j = If(E, w),
      A = e[g - 7 * 2],
      $ = e[g - 7 * 2 + 1],
      re = e[g - 16 * 2],
      G = e[g - 16 * 2 + 1],
      K = (R + $) | 0,
      he = (_ + A + be(K, R)) | 0;
    (K = (K + j) | 0),
      (he = (he + P + be(K, j)) | 0),
      (K = (K + G) | 0),
      (he = (he + re + be(K, G)) | 0),
      (e[g] = he),
      (e[g + 1] = K);
  }
  for (var pe = 0; pe < 160; pe += 2) {
    (he = e[pe]), (K = e[pe + 1]);
    var je = ya(r, n, i),
      Ie = ya(l, h, p),
      Je = ma(r, l),
      Me = ma(l, r),
      Ge = wa(o, C),
      _t = wa(C, o),
      ft = ga[pe],
      Te = ga[pe + 1],
      St = va(o, a, c),
      dt = va(C, x, S),
      y = (b + _t) | 0,
      v = (u + Ge + be(y, b)) | 0;
    (y = (y + dt) | 0),
      (v = (v + St + be(y, dt)) | 0),
      (y = (y + Te) | 0),
      (v = (v + ft + be(y, Te)) | 0),
      (y = (y + K) | 0),
      (v = (v + he + be(y, K)) | 0);
    var M = (Me + Ie) | 0,
      D = (Je + je + be(M, Me)) | 0;
    (u = c),
      (b = S),
      (c = a),
      (S = x),
      (a = o),
      (x = C),
      (C = (m + y) | 0),
      (o = (s + v + be(C, m)) | 0),
      (s = i),
      (m = p),
      (i = n),
      (p = h),
      (n = r),
      (h = l),
      (l = (y + M) | 0),
      (r = (v + D + be(l, y)) | 0);
  }
  (this._al = (this._al + l) | 0),
    (this._bl = (this._bl + h) | 0),
    (this._cl = (this._cl + p) | 0),
    (this._dl = (this._dl + m) | 0),
    (this._el = (this._el + C) | 0),
    (this._fl = (this._fl + x) | 0),
    (this._gl = (this._gl + S) | 0),
    (this._hl = (this._hl + b) | 0),
    (this._ah = (this._ah + r + be(this._al, l)) | 0),
    (this._bh = (this._bh + n + be(this._bl, h)) | 0),
    (this._ch = (this._ch + i + be(this._cl, p)) | 0),
    (this._dh = (this._dh + s + be(this._dl, m)) | 0),
    (this._eh = (this._eh + o + be(this._el, C)) | 0),
    (this._fh = (this._fh + a + be(this._fl, x)) | 0),
    (this._gh = (this._gh + c + be(this._gl, S)) | 0),
    (this._hh = (this._hh + u + be(this._hl, b)) | 0);
};
rn.prototype._hash = function () {
  var t = Sf.allocUnsafe(64);
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
var Xc = rn,
  Mf = et,
  Rf = Xc,
  Af = Rr,
  Tf = Dt.Buffer,
  Nf = new Array(160);
function Qn() {
  this.init(), (this._w = Nf), Af.call(this, 128, 112);
}
Mf(Qn, Rf);
Qn.prototype.init = function () {
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
Qn.prototype._hash = function () {
  var t = Tf.allocUnsafe(48);
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
var Of = Qn,
  Qt = (qc.exports = function (e) {
    e = e.toLowerCase();
    var r = Qt[e];
    if (!r) throw new Error(e + ' is not supported (we accept pull requests)');
    return new r();
  });
Qt.sha = Gh;
Qt.sha1 = nf;
Qt.sha224 = wf;
Qt.sha256 = Yc;
Qt.sha384 = Of;
Qt.sha512 = Xc;
var Lf = qc.exports,
  O = {},
  nn = {};
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
})(nn);
var Df =
  (N && N.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(O, '__esModule', { value: !0 });
O.isInIFrame =
  O.createQrUrl =
  O.getFavicon =
  O.range =
  O.isBigNumber =
  O.ensureParsedJSONObject =
  O.ensureBN =
  O.ensureRegExpString =
  O.ensureIntNumber =
  O.ensureBuffer =
  O.ensureAddressString =
  O.ensureEvenLengthHexString =
  O.ensureHexString =
  O.isHexString =
  O.prepend0x =
  O.strip0x =
  O.has0xPrefix =
  O.hexStringFromIntNumber =
  O.intNumberFromHexString =
  O.bigIntStringFromBN =
  O.hexStringFromBuffer =
  O.hexStringToUint8Array =
  O.uint8ArrayToHex =
  O.randomBytesHex =
    void 0;
const It = Df(Hn),
  jf = bh,
  Yt = Kr,
  Ve = nn,
  eu = /^[0-9]*$/,
  tu = /^[a-f0-9]*$/;
function Bf(t) {
  return ru(crypto.getRandomValues(new Uint8Array(t)));
}
O.randomBytesHex = Bf;
function ru(t) {
  return [...t].map((e) => e.toString(16).padStart(2, '0')).join('');
}
O.uint8ArrayToHex = ru;
function Pf(t) {
  return new Uint8Array(t.match(/.{1,2}/g).map((e) => parseInt(e, 16)));
}
O.hexStringToUint8Array = Pf;
function Ff(t, e = !1) {
  const r = t.toString('hex');
  return (0, Ve.HexString)(e ? '0x' + r : r);
}
O.hexStringFromBuffer = Ff;
function $f(t) {
  return (0, Ve.BigIntString)(t.toString(10));
}
O.bigIntStringFromBN = $f;
function Wf(t) {
  return (0, Ve.IntNumber)(new It.default(on(t, !1), 16).toNumber());
}
O.intNumberFromHexString = Wf;
function Hf(t) {
  return (0, Ve.HexString)('0x' + new It.default(t).toString(16));
}
O.hexStringFromIntNumber = Hf;
function Io(t) {
  return t.startsWith('0x') || t.startsWith('0X');
}
O.has0xPrefix = Io;
function Yn(t) {
  return Io(t) ? t.slice(2) : t;
}
O.strip0x = Yn;
function nu(t) {
  return Io(t) ? '0x' + t.slice(2) : '0x' + t;
}
O.prepend0x = nu;
function sn(t) {
  if (typeof t != 'string') return !1;
  const e = Yn(t).toLowerCase();
  return tu.test(e);
}
O.isHexString = sn;
function iu(t, e = !1) {
  if (typeof t == 'string') {
    const r = Yn(t).toLowerCase();
    if (tu.test(r)) return (0, Ve.HexString)(e ? '0x' + r : r);
  }
  throw Yt.standardErrors.rpc.invalidParams(
    `"${String(t)}" is not a hexadecimal string`
  );
}
O.ensureHexString = iu;
function on(t, e = !1) {
  let r = iu(t, !1);
  return (
    r.length % 2 === 1 && (r = (0, Ve.HexString)('0' + r)),
    e ? (0, Ve.HexString)('0x' + r) : r
  );
}
O.ensureEvenLengthHexString = on;
function Vf(t) {
  if (typeof t == 'string') {
    const e = Yn(t).toLowerCase();
    if (sn(e) && e.length === 40) return (0, Ve.AddressString)(nu(e));
  }
  throw Yt.standardErrors.rpc.invalidParams(
    `Invalid Ethereum address: ${String(t)}`
  );
}
O.ensureAddressString = Vf;
function zf(t) {
  if (Buffer.isBuffer(t)) return t;
  if (typeof t == 'string')
    if (sn(t)) {
      const e = on(t, !1);
      return Buffer.from(e, 'hex');
    } else return Buffer.from(t, 'utf8');
  throw Yt.standardErrors.rpc.invalidParams(`Not binary data: ${String(t)}`);
}
O.ensureBuffer = zf;
function su(t) {
  if (typeof t == 'number' && Number.isInteger(t)) return (0, Ve.IntNumber)(t);
  if (typeof t == 'string') {
    if (eu.test(t)) return (0, Ve.IntNumber)(Number(t));
    if (sn(t))
      return (0, Ve.IntNumber)(new It.default(on(t, !1), 16).toNumber());
  }
  throw Yt.standardErrors.rpc.invalidParams(`Not an integer: ${String(t)}`);
}
O.ensureIntNumber = su;
function Uf(t) {
  if (t instanceof RegExp) return (0, Ve.RegExpString)(t.toString());
  throw Yt.standardErrors.rpc.invalidParams(`Not a RegExp: ${String(t)}`);
}
O.ensureRegExpString = Uf;
function qf(t) {
  if (t !== null && (It.default.isBN(t) || ou(t)))
    return new It.default(t.toString(10), 10);
  if (typeof t == 'number') return new It.default(su(t));
  if (typeof t == 'string') {
    if (eu.test(t)) return new It.default(t, 10);
    if (sn(t)) return new It.default(on(t, !1), 16);
  }
  throw Yt.standardErrors.rpc.invalidParams(`Not an integer: ${String(t)}`);
}
O.ensureBN = qf;
function Jf(t) {
  if (typeof t == 'string') return JSON.parse(t);
  if (typeof t == 'object') return t;
  throw Yt.standardErrors.rpc.invalidParams(
    `Not a JSON string or an object: ${String(t)}`
  );
}
O.ensureParsedJSONObject = Jf;
function ou(t) {
  if (t == null || typeof t.constructor != 'function') return !1;
  const { constructor: e } = t;
  return typeof e.config == 'function' && typeof e.EUCLID == 'number';
}
O.isBigNumber = ou;
function Gf(t, e) {
  return Array.from({ length: e - t }, (r, n) => t + n);
}
O.range = Gf;
function Zf() {
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
O.getFavicon = Zf;
function Qf(t, e, r, n, i, s) {
  const o = n ? 'parent-id' : 'id',
    a = (0, jf.stringify)({ [o]: t, secret: e, server: r, v: i, chainId: s });
  return `${r}/#/link?${a}`;
}
O.createQrUrl = Qf;
function Yf() {
  try {
    return window.frameElement !== null;
  } catch {
    return !1;
  }
}
O.isInIFrame = Yf;
Object.defineProperty(Mr, '__esModule', { value: !0 });
Mr.Session = void 0;
const _a = Lf,
  Sa = O,
  Ea = 'session:id',
  Ca = 'session:secret',
  xa = 'session:linked';
class Mo {
  constructor(e, r, n, i) {
    (this._storage = e),
      (this._id = r || (0, Sa.randomBytesHex)(16)),
      (this._secret = n || (0, Sa.randomBytesHex)(32)),
      (this._key = new _a.sha256()
        .update(`${this._id}, ${this._secret} WalletLink`)
        .digest('hex')),
      (this._linked = !!i);
  }
  static load(e) {
    const r = e.getItem(Ea),
      n = e.getItem(xa),
      i = e.getItem(Ca);
    return r && i ? new Mo(e, r, i, n === '1') : null;
  }
  static hash(e) {
    return new _a.sha256().update(e).digest('hex');
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
      this._storage.setItem(Ea, this._id),
      this._storage.setItem(Ca, this._secret),
      this.persistLinked(),
      this
    );
  }
  persistLinked() {
    this._storage.setItem(xa, this._linked ? '1' : '0');
  }
}
Mr.Session = Mo;
var Xe = {};
Object.defineProperty(Xe, '__esModule', { value: !0 });
Xe.WalletSDKRelayAbstract =
  Xe.APP_VERSION_KEY =
  Xe.LOCAL_STORAGE_ADDRESSES_KEY =
  Xe.WALLET_USER_NAME_KEY =
    void 0;
const ka = Kr;
Xe.WALLET_USER_NAME_KEY = 'walletUsername';
Xe.LOCAL_STORAGE_ADDRESSES_KEY = 'Addresses';
Xe.APP_VERSION_KEY = 'AppVersion';
class Kf {
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
        if (!n) throw ka.standardErrors.rpc.parse({});
        const i = n,
          { error: s } = i;
        if (s) throw (0, ka.serializeError)(s, e.method);
        return i;
      });
  }
}
Xe.WalletSDKRelayAbstract = Kf;
var uo = { exports: {} },
  au = So.EventEmitter,
  Ds,
  Ia;
function Xf() {
  if (Ia) return Ds;
  Ia = 1;
  function t(C, x) {
    var S = Object.keys(C);
    if (Object.getOwnPropertySymbols) {
      var b = Object.getOwnPropertySymbols(C);
      x &&
        (b = b.filter(function (g) {
          return Object.getOwnPropertyDescriptor(C, g).enumerable;
        })),
        S.push.apply(S, b);
    }
    return S;
  }
  function e(C) {
    for (var x = 1; x < arguments.length; x++) {
      var S = arguments[x] != null ? arguments[x] : {};
      x % 2
        ? t(Object(S), !0).forEach(function (b) {
            r(C, b, S[b]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(C, Object.getOwnPropertyDescriptors(S))
          : t(Object(S)).forEach(function (b) {
              Object.defineProperty(
                C,
                b,
                Object.getOwnPropertyDescriptor(S, b)
              );
            });
    }
    return C;
  }
  function r(C, x, S) {
    return (
      (x = o(x)),
      x in C
        ? Object.defineProperty(C, x, {
            value: S,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (C[x] = S),
      C
    );
  }
  function n(C, x) {
    if (!(C instanceof x))
      throw new TypeError('Cannot call a class as a function');
  }
  function i(C, x) {
    for (var S = 0; S < x.length; S++) {
      var b = x[S];
      (b.enumerable = b.enumerable || !1),
        (b.configurable = !0),
        'value' in b && (b.writable = !0),
        Object.defineProperty(C, o(b.key), b);
    }
  }
  function s(C, x, S) {
    return (
      x && i(C.prototype, x),
      S && i(C, S),
      Object.defineProperty(C, 'prototype', { writable: !1 }),
      C
    );
  }
  function o(C) {
    var x = a(C, 'string');
    return typeof x == 'symbol' ? x : String(x);
  }
  function a(C, x) {
    if (typeof C != 'object' || C === null) return C;
    var S = C[Symbol.toPrimitive];
    if (S !== void 0) {
      var b = S.call(C, x || 'default');
      if (typeof b != 'object') return b;
      throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (x === 'string' ? String : Number)(C);
  }
  var c = Wn,
    u = c.Buffer,
    l = Pc,
    h = l.inspect,
    p = (h && h.custom) || 'inspect';
  function m(C, x, S) {
    u.prototype.copy.call(C, x, S);
  }
  return (
    (Ds = (function () {
      function C() {
        n(this, C), (this.head = null), (this.tail = null), (this.length = 0);
      }
      return (
        s(C, [
          {
            key: 'push',
            value: function (S) {
              var b = { data: S, next: null };
              this.length > 0 ? (this.tail.next = b) : (this.head = b),
                (this.tail = b),
                ++this.length;
            },
          },
          {
            key: 'unshift',
            value: function (S) {
              var b = { data: S, next: this.head };
              this.length === 0 && (this.tail = b),
                (this.head = b),
                ++this.length;
            },
          },
          {
            key: 'shift',
            value: function () {
              if (this.length !== 0) {
                var S = this.head.data;
                return (
                  this.length === 1
                    ? (this.head = this.tail = null)
                    : (this.head = this.head.next),
                  --this.length,
                  S
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
            value: function (S) {
              if (this.length === 0) return '';
              for (var b = this.head, g = '' + b.data; (b = b.next); )
                g += S + b.data;
              return g;
            },
          },
          {
            key: 'concat',
            value: function (S) {
              if (this.length === 0) return u.alloc(0);
              for (var b = u.allocUnsafe(S >>> 0), g = this.head, w = 0; g; )
                m(g.data, b, w), (w += g.data.length), (g = g.next);
              return b;
            },
          },
          {
            key: 'consume',
            value: function (S, b) {
              var g;
              return (
                S < this.head.data.length
                  ? ((g = this.head.data.slice(0, S)),
                    (this.head.data = this.head.data.slice(S)))
                  : S === this.head.data.length
                    ? (g = this.shift())
                    : (g = b ? this._getString(S) : this._getBuffer(S)),
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
            value: function (S) {
              var b = this.head,
                g = 1,
                w = b.data;
              for (S -= w.length; (b = b.next); ) {
                var E = b.data,
                  _ = S > E.length ? E.length : S;
                if (
                  (_ === E.length ? (w += E) : (w += E.slice(0, S)),
                  (S -= _),
                  S === 0)
                ) {
                  _ === E.length
                    ? (++g,
                      b.next
                        ? (this.head = b.next)
                        : (this.head = this.tail = null))
                    : ((this.head = b), (b.data = E.slice(_)));
                  break;
                }
                ++g;
              }
              return (this.length -= g), w;
            },
          },
          {
            key: '_getBuffer',
            value: function (S) {
              var b = u.allocUnsafe(S),
                g = this.head,
                w = 1;
              for (g.data.copy(b), S -= g.data.length; (g = g.next); ) {
                var E = g.data,
                  _ = S > E.length ? E.length : S;
                if ((E.copy(b, b.length - S, 0, _), (S -= _), S === 0)) {
                  _ === E.length
                    ? (++w,
                      g.next
                        ? (this.head = g.next)
                        : (this.head = this.tail = null))
                    : ((this.head = g), (g.data = E.slice(_)));
                  break;
                }
                ++w;
              }
              return (this.length -= w), b;
            },
          },
          {
            key: p,
            value: function (S, b) {
              return h(this, e(e({}, b), {}, { depth: 0, customInspect: !1 }));
            },
          },
        ]),
        C
      );
    })()),
    Ds
  );
}
function ed(t, e) {
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
              process.nextTick(lo, this, t))
            : process.nextTick(lo, this, t)),
      this)
    : (this._readableState && (this._readableState.destroyed = !0),
      this._writableState && (this._writableState.destroyed = !0),
      this._destroy(t || null, function (s) {
        !e && s
          ? r._writableState
            ? r._writableState.errorEmitted
              ? process.nextTick(An, r)
              : ((r._writableState.errorEmitted = !0),
                process.nextTick(Ma, r, s))
            : process.nextTick(Ma, r, s)
          : e
            ? (process.nextTick(An, r), e(s))
            : process.nextTick(An, r);
      }),
      this);
}
function Ma(t, e) {
  lo(t, e), An(t);
}
function An(t) {
  (t._writableState && !t._writableState.emitClose) ||
    (t._readableState && !t._readableState.emitClose) ||
    t.emit('close');
}
function td() {
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
function lo(t, e) {
  t.emit('error', e);
}
function rd(t, e) {
  var r = t._readableState,
    n = t._writableState;
  (r && r.autoDestroy) || (n && n.autoDestroy)
    ? t.destroy(e)
    : t.emit('error', e);
}
var cu = { destroy: ed, undestroy: td, errorOrDestroy: rd },
  Kt = {};
function nd(t, e) {
  (t.prototype = Object.create(e.prototype)),
    (t.prototype.constructor = t),
    (t.__proto__ = e);
}
var uu = {};
function Ue(t, e, r) {
  r || (r = Error);
  function n(s, o, a) {
    return typeof e == 'string' ? e : e(s, o, a);
  }
  var i = (function (s) {
    nd(o, s);
    function o(a, c, u) {
      return s.call(this, n(a, c, u)) || this;
    }
    return o;
  })(r);
  (i.prototype.name = r.name), (i.prototype.code = t), (uu[t] = i);
}
function Ra(t, e) {
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
function id(t, e, r) {
  return t.substr(!r || r < 0 ? 0 : +r, e.length) === e;
}
function sd(t, e, r) {
  return (
    (r === void 0 || r > t.length) && (r = t.length),
    t.substring(r - e.length, r) === e
  );
}
function od(t, e, r) {
  return (
    typeof r != 'number' && (r = 0),
    r + e.length > t.length ? !1 : t.indexOf(e, r) !== -1
  );
}
Ue(
  'ERR_INVALID_OPT_VALUE',
  function (t, e) {
    return 'The value "' + e + '" is invalid for option "' + t + '"';
  },
  TypeError
);
Ue(
  'ERR_INVALID_ARG_TYPE',
  function (t, e, r) {
    var n;
    typeof e == 'string' && id(e, 'not ')
      ? ((n = 'must not be'), (e = e.replace(/^not /, '')))
      : (n = 'must be');
    var i;
    if (sd(t, ' argument'))
      i = 'The '.concat(t, ' ').concat(n, ' ').concat(Ra(e, 'type'));
    else {
      var s = od(t, '.') ? 'property' : 'argument';
      i = 'The "'
        .concat(t, '" ')
        .concat(s, ' ')
        .concat(n, ' ')
        .concat(Ra(e, 'type'));
    }
    return (i += '. Received type '.concat(typeof r)), i;
  },
  TypeError
);
Ue('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
Ue('ERR_METHOD_NOT_IMPLEMENTED', function (t) {
  return 'The ' + t + ' method is not implemented';
});
Ue('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
Ue('ERR_STREAM_DESTROYED', function (t) {
  return 'Cannot call ' + t + ' after a stream was destroyed';
});
Ue('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
Ue('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
Ue('ERR_STREAM_WRITE_AFTER_END', 'write after end');
Ue('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
Ue(
  'ERR_UNKNOWN_ENCODING',
  function (t) {
    return 'Unknown encoding: ' + t;
  },
  TypeError
);
Ue('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
Kt.codes = uu;
var ad = Kt.codes.ERR_INVALID_OPT_VALUE;
function cd(t, e, r) {
  return t.highWaterMark != null ? t.highWaterMark : e ? t[r] : null;
}
function ud(t, e, r, n) {
  var i = cd(e, n, r);
  if (i != null) {
    if (!(isFinite(i) && Math.floor(i) === i) || i < 0) {
      var s = n ? r : 'highWaterMark';
      throw new ad(s, i);
    }
    return Math.floor(i);
  }
  return t.objectMode ? 16 : 16 * 1024;
}
var lu = { getHighWaterMark: ud },
  ld = hd;
function hd(t, e) {
  if (js('noDeprecation')) return t;
  var r = !1;
  function n() {
    if (!r) {
      if (js('throwDeprecation')) throw new Error(e);
      js('traceDeprecation') ? console.trace(e) : console.warn(e), (r = !0);
    }
    return t.apply(this, arguments);
  }
  return n;
}
function js(t) {
  try {
    if (!N.localStorage) return !1;
  } catch {
    return !1;
  }
  var e = N.localStorage[t];
  return e == null ? !1 : String(e).toLowerCase() === 'true';
}
var Bs, Aa;
function hu() {
  if (Aa) return Bs;
  (Aa = 1), (Bs = j);
  function t(y) {
    var v = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        dt(v, y);
      });
  }
  var e;
  j.WritableState = R;
  var r = { deprecate: ld },
    n = au,
    i = Wn.Buffer,
    s =
      (typeof N < 'u'
        ? N
        : typeof window < 'u'
          ? window
          : typeof self < 'u'
            ? self
            : {}
      ).Uint8Array || function () {};
  function o(y) {
    return i.from(y);
  }
  function a(y) {
    return i.isBuffer(y) || y instanceof s;
  }
  var c = cu,
    u = lu,
    l = u.getHighWaterMark,
    h = Kt.codes,
    p = h.ERR_INVALID_ARG_TYPE,
    m = h.ERR_METHOD_NOT_IMPLEMENTED,
    C = h.ERR_MULTIPLE_CALLBACK,
    x = h.ERR_STREAM_CANNOT_PIPE,
    S = h.ERR_STREAM_DESTROYED,
    b = h.ERR_STREAM_NULL_VALUES,
    g = h.ERR_STREAM_WRITE_AFTER_END,
    w = h.ERR_UNKNOWN_ENCODING,
    E = c.errorOrDestroy;
  et(j, n);
  function _() {}
  function R(y, v, M) {
    (e = e || gr()),
      (y = y || {}),
      typeof M != 'boolean' && (M = v instanceof e),
      (this.objectMode = !!y.objectMode),
      M && (this.objectMode = this.objectMode || !!y.writableObjectMode),
      (this.highWaterMark = l(this, y, 'writableHighWaterMark', M)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var D = y.decodeStrings === !1;
    (this.decodeStrings = !D),
      (this.defaultEncoding = y.defaultEncoding || 'utf8'),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (z) {
        je(v, z);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.emitClose = y.emitClose !== !1),
      (this.autoDestroy = !!y.autoDestroy),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new t(this));
  }
  (R.prototype.getBuffer = function () {
    for (var v = this.bufferedRequest, M = []; v; ) M.push(v), (v = v.next);
    return M;
  }),
    (function () {
      try {
        Object.defineProperty(R.prototype, 'buffer', {
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
      Object.defineProperty(j, Symbol.hasInstance, {
        value: function (v) {
          return P.call(this, v)
            ? !0
            : this !== j
              ? !1
              : v && v._writableState instanceof R;
        },
      }))
    : (P = function (v) {
        return v instanceof this;
      });
  function j(y) {
    e = e || gr();
    var v = this instanceof e;
    if (!v && !P.call(j, this)) return new j(y);
    (this._writableState = new R(y, this, v)),
      (this.writable = !0),
      y &&
        (typeof y.write == 'function' && (this._write = y.write),
        typeof y.writev == 'function' && (this._writev = y.writev),
        typeof y.destroy == 'function' && (this._destroy = y.destroy),
        typeof y.final == 'function' && (this._final = y.final)),
      n.call(this);
  }
  j.prototype.pipe = function () {
    E(this, new x());
  };
  function A(y, v) {
    var M = new g();
    E(y, M), process.nextTick(v, M);
  }
  function $(y, v, M, D) {
    var z;
    return (
      M === null
        ? (z = new b())
        : typeof M != 'string' &&
          !v.objectMode &&
          (z = new p('chunk', ['string', 'Buffer'], M)),
      z ? (E(y, z), process.nextTick(D, z), !1) : !0
    );
  }
  (j.prototype.write = function (y, v, M) {
    var D = this._writableState,
      z = !1,
      f = !D.objectMode && a(y);
    return (
      f && !i.isBuffer(y) && (y = o(y)),
      typeof v == 'function' && ((M = v), (v = null)),
      f ? (v = 'buffer') : v || (v = D.defaultEncoding),
      typeof M != 'function' && (M = _),
      D.ending
        ? A(this, M)
        : (f || $(this, D, y, M)) &&
          (D.pendingcb++, (z = G(this, D, f, y, v, M))),
      z
    );
  }),
    (j.prototype.cork = function () {
      this._writableState.corked++;
    }),
    (j.prototype.uncork = function () {
      var y = this._writableState;
      y.corked &&
        (y.corked--,
        !y.writing &&
          !y.corked &&
          !y.bufferProcessing &&
          y.bufferedRequest &&
          Me(this, y));
    }),
    (j.prototype.setDefaultEncoding = function (v) {
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
    Object.defineProperty(j.prototype, 'writableBuffer', {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    });
  function re(y, v, M) {
    return (
      !y.objectMode &&
        y.decodeStrings !== !1 &&
        typeof v == 'string' &&
        (v = i.from(v, M)),
      v
    );
  }
  Object.defineProperty(j.prototype, 'writableHighWaterMark', {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function G(y, v, M, D, z, f) {
    if (!M) {
      var d = re(v, D, z);
      D !== d && ((M = !0), (z = 'buffer'), (D = d));
    }
    var I = v.objectMode ? 1 : D.length;
    v.length += I;
    var T = v.length < v.highWaterMark;
    if ((T || (v.needDrain = !0), v.writing || v.corked)) {
      var ee = v.lastBufferedRequest;
      (v.lastBufferedRequest = {
        chunk: D,
        encoding: z,
        isBuf: M,
        callback: f,
        next: null,
      }),
        ee
          ? (ee.next = v.lastBufferedRequest)
          : (v.bufferedRequest = v.lastBufferedRequest),
        (v.bufferedRequestCount += 1);
    } else K(y, v, !1, I, D, z, f);
    return T;
  }
  function K(y, v, M, D, z, f, d) {
    (v.writelen = D),
      (v.writecb = d),
      (v.writing = !0),
      (v.sync = !0),
      v.destroyed
        ? v.onwrite(new S('write'))
        : M
          ? y._writev(z, v.onwrite)
          : y._write(z, f, v.onwrite),
      (v.sync = !1);
  }
  function he(y, v, M, D, z) {
    --v.pendingcb,
      M
        ? (process.nextTick(z, D),
          process.nextTick(Te, y, v),
          (y._writableState.errorEmitted = !0),
          E(y, D))
        : (z(D), (y._writableState.errorEmitted = !0), E(y, D), Te(y, v));
  }
  function pe(y) {
    (y.writing = !1),
      (y.writecb = null),
      (y.length -= y.writelen),
      (y.writelen = 0);
  }
  function je(y, v) {
    var M = y._writableState,
      D = M.sync,
      z = M.writecb;
    if (typeof z != 'function') throw new C();
    if ((pe(M), v)) he(y, M, D, v, z);
    else {
      var f = Ge(M) || y.destroyed;
      !f && !M.corked && !M.bufferProcessing && M.bufferedRequest && Me(y, M),
        D ? process.nextTick(Ie, y, M, f, z) : Ie(y, M, f, z);
    }
  }
  function Ie(y, v, M, D) {
    M || Je(y, v), v.pendingcb--, D(), Te(y, v);
  }
  function Je(y, v) {
    v.length === 0 && v.needDrain && ((v.needDrain = !1), y.emit('drain'));
  }
  function Me(y, v) {
    v.bufferProcessing = !0;
    var M = v.bufferedRequest;
    if (y._writev && M && M.next) {
      var D = v.bufferedRequestCount,
        z = new Array(D),
        f = v.corkedRequestsFree;
      f.entry = M;
      for (var d = 0, I = !0; M; )
        (z[d] = M), M.isBuf || (I = !1), (M = M.next), (d += 1);
      (z.allBuffers = I),
        K(y, v, !0, v.length, z, '', f.finish),
        v.pendingcb++,
        (v.lastBufferedRequest = null),
        f.next
          ? ((v.corkedRequestsFree = f.next), (f.next = null))
          : (v.corkedRequestsFree = new t(v)),
        (v.bufferedRequestCount = 0);
    } else {
      for (; M; ) {
        var T = M.chunk,
          ee = M.encoding,
          W = M.callback,
          Q = v.objectMode ? 1 : T.length;
        if (
          (K(y, v, !1, Q, T, ee, W),
          (M = M.next),
          v.bufferedRequestCount--,
          v.writing)
        )
          break;
      }
      M === null && (v.lastBufferedRequest = null);
    }
    (v.bufferedRequest = M), (v.bufferProcessing = !1);
  }
  (j.prototype._write = function (y, v, M) {
    M(new m('_write()'));
  }),
    (j.prototype._writev = null),
    (j.prototype.end = function (y, v, M) {
      var D = this._writableState;
      return (
        typeof y == 'function'
          ? ((M = y), (y = null), (v = null))
          : typeof v == 'function' && ((M = v), (v = null)),
        y != null && this.write(y, v),
        D.corked && ((D.corked = 1), this.uncork()),
        D.ending || St(this, D, M),
        this
      );
    }),
    Object.defineProperty(j.prototype, 'writableLength', {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function Ge(y) {
    return (
      y.ending &&
      y.length === 0 &&
      y.bufferedRequest === null &&
      !y.finished &&
      !y.writing
    );
  }
  function _t(y, v) {
    y._final(function (M) {
      v.pendingcb--,
        M && E(y, M),
        (v.prefinished = !0),
        y.emit('prefinish'),
        Te(y, v);
    });
  }
  function ft(y, v) {
    !v.prefinished &&
      !v.finalCalled &&
      (typeof y._final == 'function' && !v.destroyed
        ? (v.pendingcb++, (v.finalCalled = !0), process.nextTick(_t, y, v))
        : ((v.prefinished = !0), y.emit('prefinish')));
  }
  function Te(y, v) {
    var M = Ge(v);
    if (
      M &&
      (ft(y, v),
      v.pendingcb === 0 && ((v.finished = !0), y.emit('finish'), v.autoDestroy))
    ) {
      var D = y._readableState;
      (!D || (D.autoDestroy && D.endEmitted)) && y.destroy();
    }
    return M;
  }
  function St(y, v, M) {
    (v.ending = !0),
      Te(y, v),
      M && (v.finished ? process.nextTick(M) : y.once('finish', M)),
      (v.ended = !0),
      (y.writable = !1);
  }
  function dt(y, v, M) {
    var D = y.entry;
    for (y.entry = null; D; ) {
      var z = D.callback;
      v.pendingcb--, z(M), (D = D.next);
    }
    v.corkedRequestsFree.next = y;
  }
  return (
    Object.defineProperty(j.prototype, 'destroyed', {
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
    (j.prototype.destroy = c.destroy),
    (j.prototype._undestroy = c.undestroy),
    (j.prototype._destroy = function (y, v) {
      v(y);
    }),
    Bs
  );
}
var Ps, Ta;
function gr() {
  if (Ta) return Ps;
  Ta = 1;
  var t =
    Object.keys ||
    function (u) {
      var l = [];
      for (var h in u) l.push(h);
      return l;
    };
  Ps = o;
  var e = du(),
    r = hu();
  et(o, e);
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
    Ps
  );
}
var Fs = {},
  Na;
function Oa() {
  if (Na) return Fs;
  Na = 1;
  var t = Dt.Buffer,
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
  Fs.StringDecoder = i;
  function i(b) {
    this.encoding = n(b);
    var g;
    switch (this.encoding) {
      case 'utf16le':
        (this.text = h), (this.end = p), (g = 4);
        break;
      case 'utf8':
        (this.fillLast = c), (g = 4);
        break;
      case 'base64':
        (this.text = m), (this.end = C), (g = 3);
        break;
      default:
        (this.write = x), (this.end = S);
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
    var E = g.length - 1;
    if (E < w) return 0;
    var _ = s(g[E]);
    return _ >= 0
      ? (_ > 0 && (b.lastNeed = _ - 1), _)
      : --E < w || _ === -2
        ? 0
        : ((_ = s(g[E])),
          _ >= 0
            ? (_ > 0 && (b.lastNeed = _ - 2), _)
            : --E < w || _ === -2
              ? 0
              : ((_ = s(g[E])),
                _ >= 0
                  ? (_ > 0 && (_ === 2 ? (_ = 0) : (b.lastNeed = _ - 3)), _)
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
    var E = b.length - (w - this.lastNeed);
    return b.copy(this.lastChar, 0, E), b.toString('utf8', g, E);
  }
  function l(b) {
    var g = b && b.length ? this.write(b) : '';
    return this.lastNeed ? g + '�' : g;
  }
  function h(b, g) {
    if ((b.length - g) % 2 === 0) {
      var w = b.toString('utf16le', g);
      if (w) {
        var E = w.charCodeAt(w.length - 1);
        if (E >= 55296 && E <= 56319)
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
  function p(b) {
    var g = b && b.length ? this.write(b) : '';
    if (this.lastNeed) {
      var w = this.lastTotal - this.lastNeed;
      return g + this.lastChar.toString('utf16le', 0, w);
    }
    return g;
  }
  function m(b, g) {
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
  function C(b) {
    var g = b && b.length ? this.write(b) : '';
    return this.lastNeed
      ? g + this.lastChar.toString('base64', 0, 3 - this.lastNeed)
      : g;
  }
  function x(b) {
    return b.toString(this.encoding);
  }
  function S(b) {
    return b && b.length ? this.write(b) : '';
  }
  return Fs;
}
var La = Kt.codes.ERR_STREAM_PREMATURE_CLOSE;
function fd(t) {
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
function dd() {}
function pd(t) {
  return t.setHeader && typeof t.abort == 'function';
}
function fu(t, e, r) {
  if (typeof e == 'function') return fu(t, null, e);
  e || (e = {}), (r = fd(r || dd));
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
    l = function (C) {
      r.call(t, C);
    },
    h = function () {
      var C;
      if (n && !c)
        return (
          (!t._readableState || !t._readableState.ended) && (C = new La()),
          r.call(t, C)
        );
      if (i && !o)
        return (
          (!t._writableState || !t._writableState.ended) && (C = new La()),
          r.call(t, C)
        );
    },
    p = function () {
      t.req.on('finish', a);
    };
  return (
    pd(t)
      ? (t.on('complete', a),
        t.on('abort', h),
        t.req ? p() : t.on('request', p))
      : i && !t._writableState && (t.on('end', s), t.on('close', s)),
    t.on('end', u),
    t.on('finish', a),
    e.error !== !1 && t.on('error', l),
    t.on('close', h),
    function () {
      t.removeListener('complete', a),
        t.removeListener('abort', h),
        t.removeListener('request', p),
        t.req && t.req.removeListener('finish', a),
        t.removeListener('end', s),
        t.removeListener('close', s),
        t.removeListener('finish', a),
        t.removeListener('end', u),
        t.removeListener('error', l),
        t.removeListener('close', h);
    }
  );
}
var Ro = fu,
  $s,
  Da;
function bd() {
  if (Da) return $s;
  Da = 1;
  var t;
  function e(w, E, _) {
    return (
      (E = r(E)),
      E in w
        ? Object.defineProperty(w, E, {
            value: _,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (w[E] = _),
      w
    );
  }
  function r(w) {
    var E = n(w, 'string');
    return typeof E == 'symbol' ? E : String(E);
  }
  function n(w, E) {
    if (typeof w != 'object' || w === null) return w;
    var _ = w[Symbol.toPrimitive];
    if (_ !== void 0) {
      var R = _.call(w, E || 'default');
      if (typeof R != 'object') return R;
      throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return (E === 'string' ? String : Number)(w);
  }
  var i = Ro,
    s = Symbol('lastResolve'),
    o = Symbol('lastReject'),
    a = Symbol('error'),
    c = Symbol('ended'),
    u = Symbol('lastPromise'),
    l = Symbol('handlePromise'),
    h = Symbol('stream');
  function p(w, E) {
    return { value: w, done: E };
  }
  function m(w) {
    var E = w[s];
    if (E !== null) {
      var _ = w[h].read();
      _ !== null && ((w[u] = null), (w[s] = null), (w[o] = null), E(p(_, !1)));
    }
  }
  function C(w) {
    process.nextTick(m, w);
  }
  function x(w, E) {
    return function (_, R) {
      w.then(function () {
        if (E[c]) {
          _(p(void 0, !0));
          return;
        }
        E[l](_, R);
      }, R);
    };
  }
  var S = Object.getPrototypeOf(function () {}),
    b = Object.setPrototypeOf(
      ((t = {
        get stream() {
          return this[h];
        },
        next: function () {
          var E = this,
            _ = this[a];
          if (_ !== null) return Promise.reject(_);
          if (this[c]) return Promise.resolve(p(void 0, !0));
          if (this[h].destroyed)
            return new Promise(function (A, $) {
              process.nextTick(function () {
                E[a] ? $(E[a]) : A(p(void 0, !0));
              });
            });
          var R = this[u],
            P;
          if (R) P = new Promise(x(R, this));
          else {
            var j = this[h].read();
            if (j !== null) return Promise.resolve(p(j, !1));
            P = new Promise(this[l]);
          }
          return (this[u] = P), P;
        },
      }),
      e(t, Symbol.asyncIterator, function () {
        return this;
      }),
      e(t, 'return', function () {
        var E = this;
        return new Promise(function (_, R) {
          E[h].destroy(null, function (P) {
            if (P) {
              R(P);
              return;
            }
            _(p(void 0, !0));
          });
        });
      }),
      t),
      S
    ),
    g = function (E) {
      var _,
        R = Object.create(
          b,
          ((_ = {}),
          e(_, h, { value: E, writable: !0 }),
          e(_, s, { value: null, writable: !0 }),
          e(_, o, { value: null, writable: !0 }),
          e(_, a, { value: null, writable: !0 }),
          e(_, c, { value: E._readableState.endEmitted, writable: !0 }),
          e(_, l, {
            value: function (j, A) {
              var $ = R[h].read();
              $
                ? ((R[u] = null), (R[s] = null), (R[o] = null), j(p($, !1)))
                : ((R[s] = j), (R[o] = A));
            },
            writable: !0,
          }),
          _)
        );
      return (
        (R[u] = null),
        i(E, function (P) {
          if (P && P.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
            var j = R[o];
            j !== null && ((R[u] = null), (R[s] = null), (R[o] = null), j(P)),
              (R[a] = P);
            return;
          }
          var A = R[s];
          A !== null &&
            ((R[u] = null), (R[s] = null), (R[o] = null), A(p(void 0, !0))),
            (R[c] = !0);
        }),
        E.on('readable', C.bind(null, R)),
        R
      );
    };
  return ($s = g), $s;
}
var Ws, ja;
function gd() {
  return (
    ja ||
      ((ja = 1),
      (Ws = function () {
        throw new Error('Readable.from is not available in the browser');
      })),
    Ws
  );
}
var Hs, Ba;
function du() {
  if (Ba) return Hs;
  (Ba = 1), (Hs = A);
  var t;
  (A.ReadableState = j), So.EventEmitter;
  var e = function (d, I) {
      return d.listeners(I).length;
    },
    r = au,
    n = Wn.Buffer,
    i =
      (typeof N < 'u'
        ? N
        : typeof window < 'u'
          ? window
          : typeof self < 'u'
            ? self
            : {}
      ).Uint8Array || function () {};
  function s(f) {
    return n.from(f);
  }
  function o(f) {
    return n.isBuffer(f) || f instanceof i;
  }
  var a = Pc,
    c;
  a && a.debuglog ? (c = a.debuglog('stream')) : (c = function () {});
  var u = Xf(),
    l = cu,
    h = lu,
    p = h.getHighWaterMark,
    m = Kt.codes,
    C = m.ERR_INVALID_ARG_TYPE,
    x = m.ERR_STREAM_PUSH_AFTER_EOF,
    S = m.ERR_METHOD_NOT_IMPLEMENTED,
    b = m.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
    g,
    w,
    E;
  et(A, r);
  var _ = l.errorOrDestroy,
    R = ['error', 'close', 'destroy', 'pause', 'resume'];
  function P(f, d, I) {
    if (typeof f.prependListener == 'function') return f.prependListener(d, I);
    !f._events || !f._events[d]
      ? f.on(d, I)
      : Array.isArray(f._events[d])
        ? f._events[d].unshift(I)
        : (f._events[d] = [I, f._events[d]]);
  }
  function j(f, d, I) {
    (t = t || gr()),
      (f = f || {}),
      typeof I != 'boolean' && (I = d instanceof t),
      (this.objectMode = !!f.objectMode),
      I && (this.objectMode = this.objectMode || !!f.readableObjectMode),
      (this.highWaterMark = p(this, f, 'readableHighWaterMark', I)),
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
      (this.emitClose = f.emitClose !== !1),
      (this.autoDestroy = !!f.autoDestroy),
      (this.destroyed = !1),
      (this.defaultEncoding = f.defaultEncoding || 'utf8'),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      f.encoding &&
        (g || (g = Oa().StringDecoder),
        (this.decoder = new g(f.encoding)),
        (this.encoding = f.encoding));
  }
  function A(f) {
    if (((t = t || gr()), !(this instanceof A))) return new A(f);
    var d = this instanceof t;
    (this._readableState = new j(f, this, d)),
      (this.readable = !0),
      f &&
        (typeof f.read == 'function' && (this._read = f.read),
        typeof f.destroy == 'function' && (this._destroy = f.destroy)),
      r.call(this);
  }
  Object.defineProperty(A.prototype, 'destroyed', {
    enumerable: !1,
    get: function () {
      return this._readableState === void 0
        ? !1
        : this._readableState.destroyed;
    },
    set: function (d) {
      this._readableState && (this._readableState.destroyed = d);
    },
  }),
    (A.prototype.destroy = l.destroy),
    (A.prototype._undestroy = l.undestroy),
    (A.prototype._destroy = function (f, d) {
      d(f);
    }),
    (A.prototype.push = function (f, d) {
      var I = this._readableState,
        T;
      return (
        I.objectMode
          ? (T = !0)
          : typeof f == 'string' &&
            ((d = d || I.defaultEncoding),
            d !== I.encoding && ((f = n.from(f, d)), (d = '')),
            (T = !0)),
        $(this, f, d, !1, T)
      );
    }),
    (A.prototype.unshift = function (f) {
      return $(this, f, null, !0, !1);
    });
  function $(f, d, I, T, ee) {
    c('readableAddChunk', d);
    var W = f._readableState;
    if (d === null) (W.reading = !1), je(f, W);
    else {
      var Q;
      if ((ee || (Q = G(W, d)), Q)) _(f, Q);
      else if (W.objectMode || (d && d.length > 0))
        if (
          (typeof d != 'string' &&
            !W.objectMode &&
            Object.getPrototypeOf(d) !== n.prototype &&
            (d = s(d)),
          T)
        )
          W.endEmitted ? _(f, new b()) : re(f, W, d, !0);
        else if (W.ended) _(f, new x());
        else {
          if (W.destroyed) return !1;
          (W.reading = !1),
            W.decoder && !I
              ? ((d = W.decoder.write(d)),
                W.objectMode || d.length !== 0 ? re(f, W, d, !1) : Me(f, W))
              : re(f, W, d, !1);
        }
      else T || ((W.reading = !1), Me(f, W));
    }
    return !W.ended && (W.length < W.highWaterMark || W.length === 0);
  }
  function re(f, d, I, T) {
    d.flowing && d.length === 0 && !d.sync
      ? ((d.awaitDrain = 0), f.emit('data', I))
      : ((d.length += d.objectMode ? 1 : I.length),
        T ? d.buffer.unshift(I) : d.buffer.push(I),
        d.needReadable && Ie(f)),
      Me(f, d);
  }
  function G(f, d) {
    var I;
    return (
      !o(d) &&
        typeof d != 'string' &&
        d !== void 0 &&
        !f.objectMode &&
        (I = new C('chunk', ['string', 'Buffer', 'Uint8Array'], d)),
      I
    );
  }
  (A.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  }),
    (A.prototype.setEncoding = function (f) {
      g || (g = Oa().StringDecoder);
      var d = new g(f);
      (this._readableState.decoder = d),
        (this._readableState.encoding = this._readableState.decoder.encoding);
      for (var I = this._readableState.buffer.head, T = ''; I !== null; )
        (T += d.write(I.data)), (I = I.next);
      return (
        this._readableState.buffer.clear(),
        T !== '' && this._readableState.buffer.push(T),
        (this._readableState.length = T.length),
        this
      );
    });
  var K = 1073741824;
  function he(f) {
    return (
      f >= K
        ? (f = K)
        : (f--,
          (f |= f >>> 1),
          (f |= f >>> 2),
          (f |= f >>> 4),
          (f |= f >>> 8),
          (f |= f >>> 16),
          f++),
      f
    );
  }
  function pe(f, d) {
    return f <= 0 || (d.length === 0 && d.ended)
      ? 0
      : d.objectMode
        ? 1
        : f !== f
          ? d.flowing && d.length
            ? d.buffer.head.data.length
            : d.length
          : (f > d.highWaterMark && (d.highWaterMark = he(f)),
            f <= d.length
              ? f
              : d.ended
                ? d.length
                : ((d.needReadable = !0), 0));
  }
  A.prototype.read = function (f) {
    c('read', f), (f = parseInt(f, 10));
    var d = this._readableState,
      I = f;
    if (
      (f !== 0 && (d.emittedReadable = !1),
      f === 0 &&
        d.needReadable &&
        ((d.highWaterMark !== 0 ? d.length >= d.highWaterMark : d.length > 0) ||
          d.ended))
    )
      return (
        c('read: emitReadable', d.length, d.ended),
        d.length === 0 && d.ended ? M(this) : Ie(this),
        null
      );
    if (((f = pe(f, d)), f === 0 && d.ended))
      return d.length === 0 && M(this), null;
    var T = d.needReadable;
    c('need readable', T),
      (d.length === 0 || d.length - f < d.highWaterMark) &&
        ((T = !0), c('length less than watermark', T)),
      d.ended || d.reading
        ? ((T = !1), c('reading or ended', T))
        : T &&
          (c('do read'),
          (d.reading = !0),
          (d.sync = !0),
          d.length === 0 && (d.needReadable = !0),
          this._read(d.highWaterMark),
          (d.sync = !1),
          d.reading || (f = pe(I, d)));
    var ee;
    return (
      f > 0 ? (ee = v(f, d)) : (ee = null),
      ee === null
        ? ((d.needReadable = d.length <= d.highWaterMark), (f = 0))
        : ((d.length -= f), (d.awaitDrain = 0)),
      d.length === 0 &&
        (d.ended || (d.needReadable = !0), I !== f && d.ended && M(this)),
      ee !== null && this.emit('data', ee),
      ee
    );
  };
  function je(f, d) {
    if ((c('onEofChunk'), !d.ended)) {
      if (d.decoder) {
        var I = d.decoder.end();
        I &&
          I.length &&
          (d.buffer.push(I), (d.length += d.objectMode ? 1 : I.length));
      }
      (d.ended = !0),
        d.sync
          ? Ie(f)
          : ((d.needReadable = !1),
            d.emittedReadable || ((d.emittedReadable = !0), Je(f)));
    }
  }
  function Ie(f) {
    var d = f._readableState;
    c('emitReadable', d.needReadable, d.emittedReadable),
      (d.needReadable = !1),
      d.emittedReadable ||
        (c('emitReadable', d.flowing),
        (d.emittedReadable = !0),
        process.nextTick(Je, f));
  }
  function Je(f) {
    var d = f._readableState;
    c('emitReadable_', d.destroyed, d.length, d.ended),
      !d.destroyed &&
        (d.length || d.ended) &&
        (f.emit('readable'), (d.emittedReadable = !1)),
      (d.needReadable = !d.flowing && !d.ended && d.length <= d.highWaterMark),
      y(f);
  }
  function Me(f, d) {
    d.readingMore || ((d.readingMore = !0), process.nextTick(Ge, f, d));
  }
  function Ge(f, d) {
    for (
      ;
      !d.reading &&
      !d.ended &&
      (d.length < d.highWaterMark || (d.flowing && d.length === 0));

    ) {
      var I = d.length;
      if ((c('maybeReadMore read 0'), f.read(0), I === d.length)) break;
    }
    d.readingMore = !1;
  }
  (A.prototype._read = function (f) {
    _(this, new S('_read()'));
  }),
    (A.prototype.pipe = function (f, d) {
      var I = this,
        T = this._readableState;
      switch (T.pipesCount) {
        case 0:
          T.pipes = f;
          break;
        case 1:
          T.pipes = [T.pipes, f];
          break;
        default:
          T.pipes.push(f);
          break;
      }
      (T.pipesCount += 1), c('pipe count=%d opts=%j', T.pipesCount, d);
      var ee =
          (!d || d.end !== !1) && f !== process.stdout && f !== process.stderr,
        W = ee ? pt : Et;
      T.endEmitted ? process.nextTick(W) : I.once('end', W), f.on('unpipe', Q);
      function Q(bt, tt) {
        c('onunpipe'),
          bt === I &&
            tt &&
            tt.hasUnpiped === !1 &&
            ((tt.hasUnpiped = !0), _n());
      }
      function pt() {
        c('onend'), f.end();
      }
      var jt = _t(I);
      f.on('drain', jt);
      var Br = !1;
      function _n() {
        c('cleanup'),
          f.removeListener('close', nr),
          f.removeListener('finish', ir),
          f.removeListener('drain', jt),
          f.removeListener('error', rr),
          f.removeListener('unpipe', Q),
          I.removeListener('end', pt),
          I.removeListener('end', Et),
          I.removeListener('data', Pr),
          (Br = !0),
          T.awaitDrain &&
            (!f._writableState || f._writableState.needDrain) &&
            jt();
      }
      I.on('data', Pr);
      function Pr(bt) {
        c('ondata');
        var tt = f.write(bt);
        c('dest.write', tt),
          tt === !1 &&
            (((T.pipesCount === 1 && T.pipes === f) ||
              (T.pipesCount > 1 && z(T.pipes, f) !== -1)) &&
              !Br &&
              (c('false write response, pause', T.awaitDrain), T.awaitDrain++),
            I.pause());
      }
      function rr(bt) {
        c('onerror', bt),
          Et(),
          f.removeListener('error', rr),
          e(f, 'error') === 0 && _(f, bt);
      }
      P(f, 'error', rr);
      function nr() {
        f.removeListener('finish', ir), Et();
      }
      f.once('close', nr);
      function ir() {
        c('onfinish'), f.removeListener('close', nr), Et();
      }
      f.once('finish', ir);
      function Et() {
        c('unpipe'), I.unpipe(f);
      }
      return f.emit('pipe', I), T.flowing || (c('pipe resume'), I.resume()), f;
    });
  function _t(f) {
    return function () {
      var I = f._readableState;
      c('pipeOnDrain', I.awaitDrain),
        I.awaitDrain && I.awaitDrain--,
        I.awaitDrain === 0 && e(f, 'data') && ((I.flowing = !0), y(f));
    };
  }
  (A.prototype.unpipe = function (f) {
    var d = this._readableState,
      I = { hasUnpiped: !1 };
    if (d.pipesCount === 0) return this;
    if (d.pipesCount === 1)
      return f && f !== d.pipes
        ? this
        : (f || (f = d.pipes),
          (d.pipes = null),
          (d.pipesCount = 0),
          (d.flowing = !1),
          f && f.emit('unpipe', this, I),
          this);
    if (!f) {
      var T = d.pipes,
        ee = d.pipesCount;
      (d.pipes = null), (d.pipesCount = 0), (d.flowing = !1);
      for (var W = 0; W < ee; W++)
        T[W].emit('unpipe', this, { hasUnpiped: !1 });
      return this;
    }
    var Q = z(d.pipes, f);
    return Q === -1
      ? this
      : (d.pipes.splice(Q, 1),
        (d.pipesCount -= 1),
        d.pipesCount === 1 && (d.pipes = d.pipes[0]),
        f.emit('unpipe', this, I),
        this);
  }),
    (A.prototype.on = function (f, d) {
      var I = r.prototype.on.call(this, f, d),
        T = this._readableState;
      return (
        f === 'data'
          ? ((T.readableListening = this.listenerCount('readable') > 0),
            T.flowing !== !1 && this.resume())
          : f === 'readable' &&
            !T.endEmitted &&
            !T.readableListening &&
            ((T.readableListening = T.needReadable = !0),
            (T.flowing = !1),
            (T.emittedReadable = !1),
            c('on readable', T.length, T.reading),
            T.length ? Ie(this) : T.reading || process.nextTick(Te, this)),
        I
      );
    }),
    (A.prototype.addListener = A.prototype.on),
    (A.prototype.removeListener = function (f, d) {
      var I = r.prototype.removeListener.call(this, f, d);
      return f === 'readable' && process.nextTick(ft, this), I;
    }),
    (A.prototype.removeAllListeners = function (f) {
      var d = r.prototype.removeAllListeners.apply(this, arguments);
      return (
        (f === 'readable' || f === void 0) && process.nextTick(ft, this), d
      );
    });
  function ft(f) {
    var d = f._readableState;
    (d.readableListening = f.listenerCount('readable') > 0),
      d.resumeScheduled && !d.paused
        ? (d.flowing = !0)
        : f.listenerCount('data') > 0 && f.resume();
  }
  function Te(f) {
    c('readable nexttick read 0'), f.read(0);
  }
  A.prototype.resume = function () {
    var f = this._readableState;
    return (
      f.flowing ||
        (c('resume'), (f.flowing = !f.readableListening), St(this, f)),
      (f.paused = !1),
      this
    );
  };
  function St(f, d) {
    d.resumeScheduled || ((d.resumeScheduled = !0), process.nextTick(dt, f, d));
  }
  function dt(f, d) {
    c('resume', d.reading),
      d.reading || f.read(0),
      (d.resumeScheduled = !1),
      f.emit('resume'),
      y(f),
      d.flowing && !d.reading && f.read(0);
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
  function y(f) {
    var d = f._readableState;
    for (c('flow', d.flowing); d.flowing && f.read() !== null; );
  }
  (A.prototype.wrap = function (f) {
    var d = this,
      I = this._readableState,
      T = !1;
    f.on('end', function () {
      if ((c('wrapped end'), I.decoder && !I.ended)) {
        var Q = I.decoder.end();
        Q && Q.length && d.push(Q);
      }
      d.push(null);
    }),
      f.on('data', function (Q) {
        if (
          (c('wrapped data'),
          I.decoder && (Q = I.decoder.write(Q)),
          !(I.objectMode && Q == null) && !(!I.objectMode && (!Q || !Q.length)))
        ) {
          var pt = d.push(Q);
          pt || ((T = !0), f.pause());
        }
      });
    for (var ee in f)
      this[ee] === void 0 &&
        typeof f[ee] == 'function' &&
        (this[ee] = (function (pt) {
          return function () {
            return f[pt].apply(f, arguments);
          };
        })(ee));
    for (var W = 0; W < R.length; W++) f.on(R[W], this.emit.bind(this, R[W]));
    return (
      (this._read = function (Q) {
        c('wrapped _read', Q), T && ((T = !1), f.resume());
      }),
      this
    );
  }),
    typeof Symbol == 'function' &&
      (A.prototype[Symbol.asyncIterator] = function () {
        return w === void 0 && (w = bd()), w(this);
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
      set: function (d) {
        this._readableState && (this._readableState.flowing = d);
      },
    }),
    (A._fromList = v),
    Object.defineProperty(A.prototype, 'readableLength', {
      enumerable: !1,
      get: function () {
        return this._readableState.length;
      },
    });
  function v(f, d) {
    if (d.length === 0) return null;
    var I;
    return (
      d.objectMode
        ? (I = d.buffer.shift())
        : !f || f >= d.length
          ? (d.decoder
              ? (I = d.buffer.join(''))
              : d.buffer.length === 1
                ? (I = d.buffer.first())
                : (I = d.buffer.concat(d.length)),
            d.buffer.clear())
          : (I = d.buffer.consume(f, d.decoder)),
      I
    );
  }
  function M(f) {
    var d = f._readableState;
    c('endReadable', d.endEmitted),
      d.endEmitted || ((d.ended = !0), process.nextTick(D, d, f));
  }
  function D(f, d) {
    if (
      (c('endReadableNT', f.endEmitted, f.length),
      !f.endEmitted &&
        f.length === 0 &&
        ((f.endEmitted = !0), (d.readable = !1), d.emit('end'), f.autoDestroy))
    ) {
      var I = d._writableState;
      (!I || (I.autoDestroy && I.finished)) && d.destroy();
    }
  }
  typeof Symbol == 'function' &&
    (A.from = function (f, d) {
      return E === void 0 && (E = gd()), E(A, f, d);
    });
  function z(f, d) {
    for (var I = 0, T = f.length; I < T; I++) if (f[I] === d) return I;
    return -1;
  }
  return Hs;
}
var pu = yt,
  Kn = Kt.codes,
  vd = Kn.ERR_METHOD_NOT_IMPLEMENTED,
  yd = Kn.ERR_MULTIPLE_CALLBACK,
  md = Kn.ERR_TRANSFORM_ALREADY_TRANSFORMING,
  wd = Kn.ERR_TRANSFORM_WITH_LENGTH_0,
  Xn = gr();
et(yt, Xn);
function _d(t, e) {
  var r = this._transformState;
  r.transforming = !1;
  var n = r.writecb;
  if (n === null) return this.emit('error', new yd());
  (r.writechunk = null), (r.writecb = null), e != null && this.push(e), n(t);
  var i = this._readableState;
  (i.reading = !1),
    (i.needReadable || i.length < i.highWaterMark) &&
      this._read(i.highWaterMark);
}
function yt(t) {
  if (!(this instanceof yt)) return new yt(t);
  Xn.call(this, t),
    (this._transformState = {
      afterTransform: _d.bind(this),
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
    this.on('prefinish', Sd);
}
function Sd() {
  var t = this;
  typeof this._flush == 'function' && !this._readableState.destroyed
    ? this._flush(function (e, r) {
        Pa(t, e, r);
      })
    : Pa(this, null, null);
}
yt.prototype.push = function (t, e) {
  return (
    (this._transformState.needTransform = !1),
    Xn.prototype.push.call(this, t, e)
  );
};
yt.prototype._transform = function (t, e, r) {
  r(new vd('_transform()'));
};
yt.prototype._write = function (t, e, r) {
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
yt.prototype._read = function (t) {
  var e = this._transformState;
  e.writechunk !== null && !e.transforming
    ? ((e.transforming = !0),
      this._transform(e.writechunk, e.writeencoding, e.afterTransform))
    : (e.needTransform = !0);
};
yt.prototype._destroy = function (t, e) {
  Xn.prototype._destroy.call(this, t, function (r) {
    e(r);
  });
};
function Pa(t, e, r) {
  if (e) return t.emit('error', e);
  if ((r != null && t.push(r), t._writableState.length)) throw new wd();
  if (t._transformState.transforming) throw new md();
  return t.push(null);
}
var Ed = Jr,
  bu = pu;
et(Jr, bu);
function Jr(t) {
  if (!(this instanceof Jr)) return new Jr(t);
  bu.call(this, t);
}
Jr.prototype._transform = function (t, e, r) {
  r(null, t);
};
var Vs;
function Cd(t) {
  var e = !1;
  return function () {
    e || ((e = !0), t.apply(void 0, arguments));
  };
}
var gu = Kt.codes,
  xd = gu.ERR_MISSING_ARGS,
  kd = gu.ERR_STREAM_DESTROYED;
function Fa(t) {
  if (t) throw t;
}
function Id(t) {
  return t.setHeader && typeof t.abort == 'function';
}
function Md(t, e, r, n) {
  n = Cd(n);
  var i = !1;
  t.on('close', function () {
    i = !0;
  }),
    Vs === void 0 && (Vs = Ro),
    Vs(t, { readable: e, writable: r }, function (o) {
      if (o) return n(o);
      (i = !0), n();
    });
  var s = !1;
  return function (o) {
    if (!i && !s) {
      if (((s = !0), Id(t))) return t.abort();
      if (typeof t.destroy == 'function') return t.destroy();
      n(o || new kd('pipe'));
    }
  };
}
function $a(t) {
  t();
}
function Rd(t, e) {
  return t.pipe(e);
}
function Ad(t) {
  return !t.length || typeof t[t.length - 1] != 'function' ? Fa : t.pop();
}
function Td() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  var n = Ad(e);
  if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
    throw new xd('streams');
  var i,
    s = e.map(function (o, a) {
      var c = a < e.length - 1,
        u = a > 0;
      return Md(o, c, u, function (l) {
        i || (i = l), l && s.forEach($a), !c && (s.forEach($a), n(i));
      });
    });
  return e.reduce(Rd);
}
var Nd = Td;
(function (t, e) {
  (e = t.exports = du()),
    (e.Stream = e),
    (e.Readable = e),
    (e.Writable = hu()),
    (e.Duplex = gr()),
    (e.Transform = pu),
    (e.PassThrough = Ed),
    (e.finished = Ro),
    (e.pipeline = Nd);
})(uo, uo.exports);
var vu = uo.exports;
const { Transform: Od } = vu;
var Ld = (t) =>
  class yu extends Od {
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
      const r = new yu(
        this._rate,
        this._capacity,
        this._delimitedSuffix,
        this._hashBitLength,
        this._options
      );
      return this._state.copy(r._state), (r._finalized = this._finalized), r;
    }
  };
const { Transform: Dd } = vu;
var jd = (t) =>
  class mu extends Dd {
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
      const r = new mu(
        this._rate,
        this._capacity,
        this._delimitedSuffix,
        this._options
      );
      return this._state.copy(r._state), (r._finalized = this._finalized), r;
    }
  };
const Bd = Ld,
  Pd = jd;
var Fd = function (t) {
    const e = Bd(t),
      r = Pd(t);
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
  wu = {};
const Wa = [
  1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
  2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0,
  2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
  2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0,
  2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649,
  0, 2147516424, 2147483648,
];
wu.p1600 = function (t) {
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
      h = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
    let p = l ^ ((i << 1) | (s >>> 31)),
      m = h ^ ((s << 1) | (i >>> 31));
    const C = t[0] ^ p,
      x = t[1] ^ m,
      S = t[10] ^ p,
      b = t[11] ^ m,
      g = t[20] ^ p,
      w = t[21] ^ m,
      E = t[30] ^ p,
      _ = t[31] ^ m,
      R = t[40] ^ p,
      P = t[41] ^ m;
    (p = r ^ ((o << 1) | (a >>> 31))), (m = n ^ ((a << 1) | (o >>> 31)));
    const j = t[2] ^ p,
      A = t[3] ^ m,
      $ = t[12] ^ p,
      re = t[13] ^ m,
      G = t[22] ^ p,
      K = t[23] ^ m,
      he = t[32] ^ p,
      pe = t[33] ^ m,
      je = t[42] ^ p,
      Ie = t[43] ^ m;
    (p = i ^ ((c << 1) | (u >>> 31))), (m = s ^ ((u << 1) | (c >>> 31)));
    const Je = t[4] ^ p,
      Me = t[5] ^ m,
      Ge = t[14] ^ p,
      _t = t[15] ^ m,
      ft = t[24] ^ p,
      Te = t[25] ^ m,
      St = t[34] ^ p,
      dt = t[35] ^ m,
      y = t[44] ^ p,
      v = t[45] ^ m;
    (p = o ^ ((l << 1) | (h >>> 31))), (m = a ^ ((h << 1) | (l >>> 31)));
    const M = t[6] ^ p,
      D = t[7] ^ m,
      z = t[16] ^ p,
      f = t[17] ^ m,
      d = t[26] ^ p,
      I = t[27] ^ m,
      T = t[36] ^ p,
      ee = t[37] ^ m,
      W = t[46] ^ p,
      Q = t[47] ^ m;
    (p = c ^ ((r << 1) | (n >>> 31))), (m = u ^ ((n << 1) | (r >>> 31)));
    const pt = t[8] ^ p,
      jt = t[9] ^ m,
      Br = t[18] ^ p,
      _n = t[19] ^ m,
      Pr = t[28] ^ p,
      rr = t[29] ^ m,
      nr = t[38] ^ p,
      ir = t[39] ^ m,
      Et = t[48] ^ p,
      bt = t[49] ^ m,
      tt = C,
      $i = x,
      Wi = (b << 4) | (S >>> 28),
      Hi = (S << 4) | (b >>> 28),
      Vi = (g << 3) | (w >>> 29),
      zi = (w << 3) | (g >>> 29),
      Ui = (_ << 9) | (E >>> 23),
      qi = (E << 9) | (_ >>> 23),
      Ji = (R << 18) | (P >>> 14),
      Gi = (P << 18) | (R >>> 14),
      Zi = (j << 1) | (A >>> 31),
      Qi = (A << 1) | (j >>> 31),
      Yi = (re << 12) | ($ >>> 20),
      Ki = ($ << 12) | (re >>> 20),
      Xi = (G << 10) | (K >>> 22),
      es = (K << 10) | (G >>> 22),
      ts = (pe << 13) | (he >>> 19),
      rs = (he << 13) | (pe >>> 19),
      ns = (je << 2) | (Ie >>> 30),
      is = (Ie << 2) | (je >>> 30),
      ss = (Me << 30) | (Je >>> 2),
      os = (Je << 30) | (Me >>> 2),
      as = (Ge << 6) | (_t >>> 26),
      cs = (_t << 6) | (Ge >>> 26),
      us = (Te << 11) | (ft >>> 21),
      ls = (ft << 11) | (Te >>> 21),
      hs = (St << 15) | (dt >>> 17),
      fs = (dt << 15) | (St >>> 17),
      ds = (v << 29) | (y >>> 3),
      ps = (y << 29) | (v >>> 3),
      bs = (M << 28) | (D >>> 4),
      gs = (D << 28) | (M >>> 4),
      vs = (f << 23) | (z >>> 9),
      ys = (z << 23) | (f >>> 9),
      ms = (d << 25) | (I >>> 7),
      ws = (I << 25) | (d >>> 7),
      _s = (T << 21) | (ee >>> 11),
      Ss = (ee << 21) | (T >>> 11),
      Es = (Q << 24) | (W >>> 8),
      Cs = (W << 24) | (Q >>> 8),
      xs = (pt << 27) | (jt >>> 5),
      ks = (jt << 27) | (pt >>> 5),
      Is = (Br << 20) | (_n >>> 12),
      Ms = (_n << 20) | (Br >>> 12),
      Rs = (rr << 7) | (Pr >>> 25),
      As = (Pr << 7) | (rr >>> 25),
      Ts = (nr << 8) | (ir >>> 24),
      Ns = (ir << 8) | (nr >>> 24),
      Os = (Et << 14) | (bt >>> 18),
      Ls = (bt << 14) | (Et >>> 18);
    (t[0] = tt ^ (~Yi & us)),
      (t[1] = $i ^ (~Ki & ls)),
      (t[10] = bs ^ (~Is & Vi)),
      (t[11] = gs ^ (~Ms & zi)),
      (t[20] = Zi ^ (~as & ms)),
      (t[21] = Qi ^ (~cs & ws)),
      (t[30] = xs ^ (~Wi & Xi)),
      (t[31] = ks ^ (~Hi & es)),
      (t[40] = ss ^ (~vs & Rs)),
      (t[41] = os ^ (~ys & As)),
      (t[2] = Yi ^ (~us & _s)),
      (t[3] = Ki ^ (~ls & Ss)),
      (t[12] = Is ^ (~Vi & ts)),
      (t[13] = Ms ^ (~zi & rs)),
      (t[22] = as ^ (~ms & Ts)),
      (t[23] = cs ^ (~ws & Ns)),
      (t[32] = Wi ^ (~Xi & hs)),
      (t[33] = Hi ^ (~es & fs)),
      (t[42] = vs ^ (~Rs & Ui)),
      (t[43] = ys ^ (~As & qi)),
      (t[4] = us ^ (~_s & Os)),
      (t[5] = ls ^ (~Ss & Ls)),
      (t[14] = Vi ^ (~ts & ds)),
      (t[15] = zi ^ (~rs & ps)),
      (t[24] = ms ^ (~Ts & Ji)),
      (t[25] = ws ^ (~Ns & Gi)),
      (t[34] = Xi ^ (~hs & Es)),
      (t[35] = es ^ (~fs & Cs)),
      (t[44] = Rs ^ (~Ui & ns)),
      (t[45] = As ^ (~qi & is)),
      (t[6] = _s ^ (~Os & tt)),
      (t[7] = Ss ^ (~Ls & $i)),
      (t[16] = ts ^ (~ds & bs)),
      (t[17] = rs ^ (~ps & gs)),
      (t[26] = Ts ^ (~Ji & Zi)),
      (t[27] = Ns ^ (~Gi & Qi)),
      (t[36] = hs ^ (~Es & xs)),
      (t[37] = fs ^ (~Cs & ks)),
      (t[46] = Ui ^ (~ns & ss)),
      (t[47] = qi ^ (~is & os)),
      (t[8] = Os ^ (~tt & Yi)),
      (t[9] = Ls ^ (~$i & Ki)),
      (t[18] = ds ^ (~bs & Is)),
      (t[19] = ps ^ (~gs & Ms)),
      (t[28] = Ji ^ (~Zi & as)),
      (t[29] = Gi ^ (~Qi & cs)),
      (t[38] = Es ^ (~xs & Wi)),
      (t[39] = Cs ^ (~ks & Hi)),
      (t[48] = ns ^ (~ss & vs)),
      (t[49] = is ^ (~os & ys)),
      (t[0] ^= Wa[e * 2]),
      (t[1] ^= Wa[e * 2 + 1]);
  }
};
const Ln = wu;
function Ar() {
  (this.state = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]),
    (this.blockSize = null),
    (this.count = 0),
    (this.squeezing = !1);
}
Ar.prototype.initialize = function (t, e) {
  for (let r = 0; r < 50; ++r) this.state[r] = 0;
  (this.blockSize = t / 8), (this.count = 0), (this.squeezing = !1);
};
Ar.prototype.absorb = function (t) {
  for (let e = 0; e < t.length; ++e)
    (this.state[~~(this.count / 4)] ^= t[e] << (8 * (this.count % 4))),
      (this.count += 1),
      this.count === this.blockSize && (Ln.p1600(this.state), (this.count = 0));
};
Ar.prototype.absorbLastFewBits = function (t) {
  (this.state[~~(this.count / 4)] ^= t << (8 * (this.count % 4))),
    t & 128 && this.count === this.blockSize - 1 && Ln.p1600(this.state),
    (this.state[~~((this.blockSize - 1) / 4)] ^=
      128 << (8 * ((this.blockSize - 1) % 4))),
    Ln.p1600(this.state),
    (this.count = 0),
    (this.squeezing = !0);
};
Ar.prototype.squeeze = function (t) {
  this.squeezing || this.absorbLastFewBits(1);
  const e = Buffer.alloc(t);
  for (let r = 0; r < t; ++r)
    (e[r] = (this.state[~~(this.count / 4)] >>> (8 * (this.count % 4))) & 255),
      (this.count += 1),
      this.count === this.blockSize && (Ln.p1600(this.state), (this.count = 0));
  return e;
};
Ar.prototype.copy = function (t) {
  for (let e = 0; e < 50; ++e) t.state[e] = this.state[e];
  (t.blockSize = this.blockSize),
    (t.count = this.count),
    (t.squeezing = this.squeezing);
};
var $d = Ar,
  Wd = Fd($d);
const Hd = Wd,
  Vd = Hn;
function _u(t) {
  return Buffer.allocUnsafe(t).fill(0);
}
function Su(t, e, r) {
  const n = _u(e);
  return (
    (t = ei(t)),
    r
      ? t.length < e
        ? (t.copy(n), n)
        : t.slice(0, e)
      : t.length < e
        ? (t.copy(n, e - t.length), n)
        : t.slice(-e)
  );
}
function zd(t, e) {
  return Su(t, e, !0);
}
function ei(t) {
  if (!Buffer.isBuffer(t))
    if (Array.isArray(t)) t = Buffer.from(t);
    else if (typeof t == 'string')
      Eu(t) ? (t = Buffer.from(Jd(Cu(t)), 'hex')) : (t = Buffer.from(t));
    else if (typeof t == 'number') t = intToBuffer(t);
    else if (t == null) t = Buffer.allocUnsafe(0);
    else if (Vd.isBN(t)) t = t.toArrayLike(Buffer);
    else if (t.toArray) t = Buffer.from(t.toArray());
    else throw new Error('invalid type');
  return t;
}
function Ud(t) {
  return (t = ei(t)), '0x' + t.toString('hex');
}
function qd(t, e) {
  return (
    (t = ei(t)),
    e || (e = 256),
    Hd('keccak' + e)
      .update(t)
      .digest()
  );
}
function Jd(t) {
  return t.length % 2 ? '0' + t : t;
}
function Eu(t) {
  return typeof t == 'string' && t.match(/^0x[0-9A-Fa-f]*$/);
}
function Cu(t) {
  return typeof t == 'string' && t.startsWith('0x') ? t.slice(2) : t;
}
var xu = {
  zeros: _u,
  setLength: Su,
  setLengthRight: zd,
  isHexString: Eu,
  stripHexPrefix: Cu,
  toBuffer: ei,
  bufferToHex: Ud,
  keccak: qd,
};
const Ut = xu,
  Vt = Hn;
function ku(t) {
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
function fr(t) {
  return parseInt(/^\D+(\d+)$/.exec(t)[1], 10);
}
function Ha(t) {
  var e = /^\D+(\d+)x(\d+)$/.exec(t);
  return [parseInt(e[1], 10), parseInt(e[2], 10)];
}
function Iu(t) {
  var e = t.match(/(.*)\[(.*?)\]$/);
  return e ? (e[2] === '' ? 'dynamic' : parseInt(e[2], 10)) : null;
}
function $t(t) {
  var e = typeof t;
  if (e === 'string')
    return Ut.isHexString(t) ? new Vt(Ut.stripHexPrefix(t), 16) : new Vt(t, 10);
  if (e === 'number') return new Vt(t);
  if (t.toArray) return t;
  throw new Error('Argument is not a number');
}
function it(t, e) {
  var r, n, i, s;
  if (t === 'address') return it('uint160', $t(e));
  if (t === 'bool') return it('uint8', e ? 1 : 0);
  if (t === 'string') return it('bytes', new Buffer(e, 'utf8'));
  if (Zd(t)) {
    if (typeof e.length > 'u') throw new Error('Not an array?');
    if (((r = Iu(t)), r !== 'dynamic' && r !== 0 && e.length > r))
      throw new Error('Elements exceed array size: ' + r);
    (i = []),
      (t = t.slice(0, t.lastIndexOf('['))),
      typeof e == 'string' && (e = JSON.parse(e));
    for (s in e) i.push(it(t, e[s]));
    if (r === 'dynamic') {
      var o = it('uint256', e.length);
      i.unshift(o);
    }
    return Buffer.concat(i);
  } else {
    if (t === 'bytes')
      return (
        (e = new Buffer(e)),
        (i = Buffer.concat([it('uint256', e.length), e])),
        e.length % 32 !== 0 &&
          (i = Buffer.concat([i, Ut.zeros(32 - (e.length % 32))])),
        i
      );
    if (t.startsWith('bytes')) {
      if (((r = fr(t)), r < 1 || r > 32))
        throw new Error('Invalid bytes<N> width: ' + r);
      return Ut.setLengthRight(e, 32);
    } else if (t.startsWith('uint')) {
      if (((r = fr(t)), r % 8 || r < 8 || r > 256))
        throw new Error('Invalid uint<N> width: ' + r);
      if (((n = $t(e)), n.bitLength() > r))
        throw new Error(
          'Supplied uint exceeds width: ' + r + ' vs ' + n.bitLength()
        );
      if (n < 0) throw new Error('Supplied uint is negative');
      return n.toArrayLike(Buffer, 'be', 32);
    } else if (t.startsWith('int')) {
      if (((r = fr(t)), r % 8 || r < 8 || r > 256))
        throw new Error('Invalid int<N> width: ' + r);
      if (((n = $t(e)), n.bitLength() > r))
        throw new Error(
          'Supplied int exceeds width: ' + r + ' vs ' + n.bitLength()
        );
      return n.toTwos(256).toArrayLike(Buffer, 'be', 32);
    } else if (t.startsWith('ufixed')) {
      if (((r = Ha(t)), (n = $t(e)), n < 0))
        throw new Error('Supplied ufixed is negative');
      return it('uint256', n.mul(new Vt(2).pow(new Vt(r[1]))));
    } else if (t.startsWith('fixed'))
      return (r = Ha(t)), it('int256', $t(e).mul(new Vt(2).pow(new Vt(r[1]))));
  }
  throw new Error('Unsupported or invalid type: ' + t);
}
function Gd(t) {
  return t === 'string' || t === 'bytes' || Iu(t) === 'dynamic';
}
function Zd(t) {
  return t.lastIndexOf(']') === t.length - 1;
}
function Qd(t, e) {
  var r = [],
    n = [],
    i = 32 * t.length;
  for (var s in t) {
    var o = ku(t[s]),
      a = e[s],
      c = it(o, a);
    Gd(o) ? (r.push(it('uint256', i)), n.push(c), (i += c.length)) : r.push(c);
  }
  return Buffer.concat(r.concat(n));
}
function Mu(t, e) {
  if (t.length !== e.length)
    throw new Error('Number of types are not matching the values');
  for (var r, n, i = [], s = 0; s < t.length; s++) {
    var o = ku(t[s]),
      a = e[s];
    if (o === 'bytes') i.push(a);
    else if (o === 'string') i.push(new Buffer(a, 'utf8'));
    else if (o === 'bool') i.push(new Buffer(a ? '01' : '00', 'hex'));
    else if (o === 'address') i.push(Ut.setLength(a, 20));
    else if (o.startsWith('bytes')) {
      if (((r = fr(o)), r < 1 || r > 32))
        throw new Error('Invalid bytes<N> width: ' + r);
      i.push(Ut.setLengthRight(a, r));
    } else if (o.startsWith('uint')) {
      if (((r = fr(o)), r % 8 || r < 8 || r > 256))
        throw new Error('Invalid uint<N> width: ' + r);
      if (((n = $t(a)), n.bitLength() > r))
        throw new Error(
          'Supplied uint exceeds width: ' + r + ' vs ' + n.bitLength()
        );
      i.push(n.toArrayLike(Buffer, 'be', r / 8));
    } else if (o.startsWith('int')) {
      if (((r = fr(o)), r % 8 || r < 8 || r > 256))
        throw new Error('Invalid int<N> width: ' + r);
      if (((n = $t(a)), n.bitLength() > r))
        throw new Error(
          'Supplied int exceeds width: ' + r + ' vs ' + n.bitLength()
        );
      i.push(n.toTwos(r).toArrayLike(Buffer, 'be', r / 8));
    } else throw new Error('Unsupported or invalid type: ' + o);
  }
  return Buffer.concat(i);
}
function Yd(t, e) {
  return Ut.keccak(Mu(t, e));
}
var Kd = { rawEncode: Qd, solidityPack: Mu, soliditySHA3: Yd };
const Ye = xu,
  Vr = Kd,
  Ru = {
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
  zs = {
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
                : Ye.keccak(this.encodeData(c, u, r, n)),
            ];
          if (u === void 0)
            throw new Error(`missing value for field ${a} of type ${c}`);
          if (c === 'bytes') return ['bytes32', Ye.keccak(u)];
          if (c === 'string')
            return (
              typeof u == 'string' && (u = Buffer.from(u, 'utf8')),
              ['bytes32', Ye.keccak(u)]
            );
          if (c.lastIndexOf(']') === c.length - 1) {
            const l = c.slice(0, c.lastIndexOf('[')),
              h = u.map((p) => o(a, l, p));
            return [
              'bytes32',
              Ye.keccak(
                Vr.rawEncode(
                  h.map(([p]) => p),
                  h.map(([, p]) => p)
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
              i.push('bytes32'), (a = Ye.keccak(a)), s.push(a);
            else if (o.type === 'string')
              i.push('bytes32'),
                typeof a == 'string' && (a = Buffer.from(a, 'utf8')),
                (a = Ye.keccak(a)),
                s.push(a);
            else if (r[o.type] !== void 0)
              i.push('bytes32'),
                (a = Ye.keccak(this.encodeData(o.type, a, r, n))),
                s.push(a);
            else {
              if (o.type.lastIndexOf(']') === o.type.length - 1)
                throw new Error('Arrays currently unimplemented in encodeData');
              i.push(o.type), s.push(a);
            }
        }
      return Vr.rawEncode(i, s);
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
      return Ye.keccak(this.encodeData(t, e, r, n));
    },
    hashType(t, e) {
      return Ye.keccak(this.encodeType(t, e));
    },
    sanitizeData(t) {
      const e = {};
      for (const r in Ru.properties) t[r] && (e[r] = t[r]);
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
        Ye.keccak(Buffer.concat(n))
      );
    },
  };
var Xd = {
  TYPED_MESSAGE_SCHEMA: Ru,
  TypedDataUtils: zs,
  hashForSignTypedDataLegacy: function (t) {
    return ep(t.data);
  },
  hashForSignTypedData_v3: function (t) {
    return zs.hash(t.data, !1);
  },
  hashForSignTypedData_v4: function (t) {
    return zs.hash(t.data);
  },
};
function ep(t) {
  const e = new Error('Expect argument to be non-empty array');
  if (typeof t != 'object' || !t.length) throw e;
  const r = t.map(function (s) {
      return s.type === 'bytes' ? Ye.toBuffer(s.value) : s.value;
    }),
    n = t.map(function (s) {
      return s.type;
    }),
    i = t.map(function (s) {
      if (!s.name) throw e;
      return s.type + ' ' + s.name;
    });
  return Vr.soliditySHA3(
    ['bytes32', 'bytes32'],
    [
      Vr.soliditySHA3(new Array(t.length).fill('string'), i),
      Vr.soliditySHA3(n, r),
    ]
  );
}
var vr = {};
Object.defineProperty(vr, '__esModule', { value: !0 });
vr.filterFromParam = vr.FilterPolyfill = void 0;
const cr = nn,
  Ee = O,
  tp = 5 * 60 * 1e3,
  Wt = { jsonrpc: '2.0', id: 0 };
class rp {
  constructor(e) {
    (this.logFilters = new Map()),
      (this.blockFilters = new Set()),
      (this.pendingTransactionFilters = new Set()),
      (this.cursors = new Map()),
      (this.timeouts = new Map()),
      (this.nextFilterId = (0, cr.IntNumber)(1)),
      (this.provider = e);
  }
  async newFilter(e) {
    const r = Au(e),
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
      (0, Ee.hexStringFromIntNumber)(n)
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
      (0, Ee.hexStringFromIntNumber)(e)
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
      (0, Ee.hexStringFromIntNumber)(e)
    );
  }
  uninstallFilter(e) {
    const r = (0, Ee.intNumberFromHexString)(e);
    return console.log(`Uninstalling filter (${r})`), this.deleteFilter(r), !0;
  }
  getFilterChanges(e) {
    const r = (0, Ee.intNumberFromHexString)(e);
    return (
      this.timeouts.has(r) && this.setFilterTimeout(r),
      this.logFilters.has(r)
        ? this.getLogFilterChanges(r)
        : this.blockFilters.has(r)
          ? this.getBlockFilterChanges(r)
          : this.pendingTransactionFilters.has(r)
            ? this.getPendingTransactionFilterChanges(r)
            : Promise.resolve(Sn())
    );
  }
  async getFilterLogs(e) {
    const r = (0, Ee.intNumberFromHexString)(e),
      n = this.logFilters.get(r);
    return n
      ? this.sendAsyncPromise(
          Object.assign(Object.assign({}, Wt), {
            method: 'eth_getLogs',
            params: [Va(n)],
          })
        )
      : Sn();
  }
  makeFilterId() {
    return (0, cr.IntNumber)(++this.nextFilterId);
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
    if (!n || !r) return Sn();
    const i = await this.getCurrentBlockHeight(),
      s = r.toBlock === 'latest' ? i : r.toBlock;
    if (n > i || n > r.toBlock) return En();
    console.log(`Fetching logs from ${n} to ${s} for filter ${e}`);
    const o = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, Wt), {
        method: 'eth_getLogs',
        params: [
          Va(Object.assign(Object.assign({}, r), { fromBlock: n, toBlock: s })),
        ],
      })
    );
    if (Array.isArray(o.result)) {
      const a = o.result.map((u) =>
          (0, Ee.intNumberFromHexString)(u.blockNumber || '0x0')
        ),
        c = Math.max(...a);
      if (c && c > n) {
        const u = (0, cr.IntNumber)(c + 1);
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
    if (!r) return Sn();
    const n = await this.getCurrentBlockHeight();
    if (r > n) return En();
    console.log(`Fetching blocks from ${r} to ${n} for filter (${e})`);
    const i = (
        await Promise.all(
          (0, Ee.range)(r, n + 1).map((o) =>
            this.getBlockHashByNumber((0, cr.IntNumber)(o))
          )
        )
      ).filter((o) => !!o),
      s = (0, cr.IntNumber)(r + i.length);
    return (
      console.log(`Moving cursor position for filter (${e}) from ${r} to ${s}`),
      this.cursors.set(e, s),
      Object.assign(Object.assign({}, Wt), { result: i })
    );
  }
  async getPendingTransactionFilterChanges(e) {
    return Promise.resolve(En());
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
    }, tp);
    this.timeouts.set(e, n);
  }
  async getCurrentBlockHeight() {
    const { result: e } = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, Wt), {
        method: 'eth_blockNumber',
        params: [],
      })
    );
    return (0, Ee.intNumberFromHexString)((0, Ee.ensureHexString)(e));
  }
  async getBlockHashByNumber(e) {
    const r = await this.sendAsyncPromise(
      Object.assign(Object.assign({}, Wt), {
        method: 'eth_getBlockByNumber',
        params: [(0, Ee.hexStringFromIntNumber)(e), !1],
      })
    );
    return r.result && typeof r.result.hash == 'string'
      ? (0, Ee.ensureHexString)(r.result.hash)
      : null;
  }
}
vr.FilterPolyfill = rp;
function Au(t) {
  return {
    fromBlock: za(t.fromBlock),
    toBlock: za(t.toBlock),
    addresses:
      t.address === void 0
        ? null
        : Array.isArray(t.address)
          ? t.address
          : [t.address],
    topics: t.topics || [],
  };
}
vr.filterFromParam = Au;
function Va(t) {
  const e = {
    fromBlock: Ua(t.fromBlock),
    toBlock: Ua(t.toBlock),
    topics: t.topics,
  };
  return t.addresses !== null && (e.address = t.addresses), e;
}
function za(t) {
  if (t === void 0 || t === 'latest' || t === 'pending') return 'latest';
  if (t === 'earliest') return (0, cr.IntNumber)(0);
  if ((0, Ee.isHexString)(t)) return (0, Ee.intNumberFromHexString)(t);
  throw new Error(`Invalid block option: ${String(t)}`);
}
function Ua(t) {
  return t === 'latest' ? t : (0, Ee.hexStringFromIntNumber)(t);
}
function Sn() {
  return Object.assign(Object.assign({}, Wt), {
    error: { code: -32e3, message: 'filter not found' },
  });
}
function En() {
  return Object.assign(Object.assign({}, Wt), { result: [] });
}
var Tu = {};
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
})(Tu);
var ti = {},
  Nu = {},
  ri = {},
  Ao = np;
function np(t) {
  t = t || {};
  var e = t.max || Number.MAX_SAFE_INTEGER,
    r = typeof t.start < 'u' ? t.start : Math.floor(Math.random() * e);
  return function () {
    return (r = r % e), r++;
  };
}
const qa = (t, e) =>
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
var ip = (t, e) => {
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
            : qa(t, e).apply(this, arguments);
        })
      : (n = Object.create(Object.getPrototypeOf(t)));
    for (const i in t) {
      const s = t[i];
      n[i] = typeof s == 'function' && r(i) ? qa(s, e) : s;
    }
    return n;
  },
  an = {},
  sp =
    (N && N.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(an, '__esModule', { value: !0 });
an.BaseBlockTracker = void 0;
const op = sp(Zt),
  ap = 1e3,
  cp = (t, e) => t + e,
  Ja = ['sync', 'latest'];
class up extends op.default {
  constructor(e) {
    super(),
      (this._blockResetDuration = e.blockResetDuration || 20 * ap),
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
    Ja.includes(e) && this._maybeStart();
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
    return Ja.map((e) => this.listenerCount(e)).reduce(cp);
  }
  _newPotentialLatest(e) {
    const r = this._currentBlock;
    (r && Ga(e) <= Ga(r)) || this._setCurrentBlock(e);
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
an.BaseBlockTracker = up;
function Ga(t) {
  return Number.parseInt(t, 16);
}
var Ou = {},
  Lu = {},
  we = {};
class Du extends TypeError {
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
function lp(t) {
  return ze(t) && typeof t[Symbol.iterator] == 'function';
}
function ze(t) {
  return typeof t == 'object' && t != null;
}
function Za(t) {
  if (Object.prototype.toString.call(t) !== '[object Object]') return !1;
  const e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype;
}
function de(t) {
  return typeof t == 'symbol'
    ? t.toString()
    : typeof t == 'string'
      ? JSON.stringify(t)
      : `${t}`;
}
function hp(t) {
  const { done: e, value: r } = t.next();
  return e ? void 0 : r;
}
function fp(t, e, r, n) {
  if (t === !0) return;
  t === !1 ? (t = {}) : typeof t == 'string' && (t = { message: t });
  const { path: i, branch: s } = e,
    { type: o } = r,
    {
      refinement: a,
      message:
        c = `Expected a value of type \`${o}\`${a ? ` with refinement \`${a}\`` : ''}, but received: \`${de(n)}\``,
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
function* ho(t, e, r, n) {
  lp(t) || (t = [t]);
  for (const i of t) {
    const s = fp(i, e, r, n);
    s && (yield s);
  }
}
function* To(t, e, r = {}) {
  const { path: n = [], branch: i = [t], coerce: s = !1, mask: o = !1 } = r,
    a = { path: n, branch: i };
  if (
    s &&
    ((t = e.coercer(t, a)),
    o && e.type !== 'type' && ze(e.schema) && ze(t) && !Array.isArray(t))
  )
    for (const u in t) e.schema[u] === void 0 && delete t[u];
  let c = 'valid';
  for (const u of e.validator(t, a))
    (u.explanation = r.message), (c = 'not_valid'), yield [u, void 0];
  for (let [u, l, h] of e.entries(t, a)) {
    const p = To(l, h, {
      path: u === void 0 ? n : [...n, u],
      branch: u === void 0 ? i : [...i, l],
      coerce: s,
      mask: o,
      message: r.message,
    });
    for (const m of p)
      m[0]
        ? ((c = m[0].refinement != null ? 'not_refined' : 'not_valid'),
          yield [m[0], void 0])
        : s &&
          ((l = m[1]),
          u === void 0
            ? (t = l)
            : t instanceof Map
              ? t.set(u, l)
              : t instanceof Set
                ? t.add(l)
                : ze(t) && (l !== void 0 || u in t) && (t[u] = l));
  }
  if (c !== 'not_valid')
    for (const u of e.refiner(t, a))
      (u.explanation = r.message), (c = 'not_refined'), yield [u, void 0];
  c === 'valid' && (yield [void 0, t]);
}
class ue {
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
            return ho(l, u, this, c);
          })
        : (this.validator = () => []),
      s
        ? (this.refiner = (c, u) => {
            const l = s(c, u);
            return ho(l, u, this, c);
          })
        : (this.refiner = () => []);
  }
  assert(e, r) {
    return ju(e, this, r);
  }
  create(e, r) {
    return Bu(e, this, r);
  }
  is(e) {
    return No(e, this);
  }
  mask(e, r) {
    return Pu(e, this, r);
  }
  validate(e, r = {}) {
    return Tr(e, this, r);
  }
}
function ju(t, e, r) {
  const n = Tr(t, e, { message: r });
  if (n[0]) throw n[0];
}
function Bu(t, e, r) {
  const n = Tr(t, e, { coerce: !0, message: r });
  if (n[0]) throw n[0];
  return n[1];
}
function Pu(t, e, r) {
  const n = Tr(t, e, { coerce: !0, mask: !0, message: r });
  if (n[0]) throw n[0];
  return n[1];
}
function No(t, e) {
  return !Tr(t, e)[0];
}
function Tr(t, e, r = {}) {
  const n = To(t, e, r),
    i = hp(n);
  return i[0]
    ? [
        new Du(i[0], function* () {
          for (const o of n) o[0] && (yield o[0]);
        }),
        void 0,
      ]
    : [void 0, i[1]];
}
function dp(...t) {
  const e = t[0].type === 'type',
    r = t.map((i) => i.schema),
    n = Object.assign({}, ...r);
  return e ? Lo(n) : cn(n);
}
function Ae(t, e) {
  return new ue({ type: t, schema: null, validator: e });
}
function pp(t, e) {
  return new ue({
    ...t,
    refiner: (r, n) => r === void 0 || t.refiner(r, n),
    validator(r, n) {
      return r === void 0 ? !0 : (e(r, n), t.validator(r, n));
    },
  });
}
function bp(t) {
  return new ue({
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
function gp(t) {
  let e;
  return new ue({
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
function vp(t, e) {
  const { schema: r } = t,
    n = { ...r };
  for (const i of e) delete n[i];
  switch (t.type) {
    case 'type':
      return Lo(n);
    default:
      return cn(n);
  }
}
function yp(t) {
  const e = t instanceof ue ? { ...t.schema } : { ...t };
  for (const r in e) e[r] = Fu(e[r]);
  return cn(e);
}
function mp(t, e) {
  const { schema: r } = t,
    n = {};
  for (const i of e) n[i] = r[i];
  return cn(n);
}
function wp(t, e) {
  return (
    console.warn(
      'superstruct@0.11 - The `struct` helper has been renamed to `define`.'
    ),
    Ae(t, e)
  );
}
function _p() {
  return Ae('any', () => !0);
}
function Sp(t) {
  return new ue({
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
        Array.isArray(e) || `Expected an array value, but received: ${de(e)}`
      );
    },
  });
}
function Ep() {
  return Ae('bigint', (t) => typeof t == 'bigint');
}
function Cp() {
  return Ae('boolean', (t) => typeof t == 'boolean');
}
function xp() {
  return Ae(
    'date',
    (t) =>
      (t instanceof Date && !isNaN(t.getTime())) ||
      `Expected a valid \`Date\` object, but received: ${de(t)}`
  );
}
function kp(t) {
  const e = {},
    r = t.map((n) => de(n)).join();
  for (const n of t) e[n] = n;
  return new ue({
    type: 'enums',
    schema: e,
    validator(n) {
      return (
        t.includes(n) || `Expected one of \`${r}\`, but received: ${de(n)}`
      );
    },
  });
}
function Ip() {
  return Ae(
    'func',
    (t) =>
      typeof t == 'function' || `Expected a function, but received: ${de(t)}`
  );
}
function Mp(t) {
  return Ae(
    'instance',
    (e) =>
      e instanceof t ||
      `Expected a \`${t.name}\` instance, but received: ${de(e)}`
  );
}
function Rp() {
  return Ae(
    'integer',
    (t) =>
      (typeof t == 'number' && !isNaN(t) && Number.isInteger(t)) ||
      `Expected an integer, but received: ${de(t)}`
  );
}
function Ap(t) {
  return new ue({
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
function Tp(t) {
  const e = de(t),
    r = typeof t;
  return new ue({
    type: 'literal',
    schema: r === 'string' || r === 'number' || r === 'boolean' ? t : null,
    validator(n) {
      return n === t || `Expected the literal \`${e}\`, but received: ${de(n)}`;
    },
  });
}
function Np(t, e) {
  return new ue({
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
        r instanceof Map || `Expected a \`Map\` object, but received: ${de(r)}`
      );
    },
  });
}
function Oo() {
  return Ae('never', () => !1);
}
function Op(t) {
  return new ue({
    ...t,
    validator: (e, r) => e === null || t.validator(e, r),
    refiner: (e, r) => e === null || t.refiner(e, r),
  });
}
function Lp() {
  return Ae(
    'number',
    (t) =>
      (typeof t == 'number' && !isNaN(t)) ||
      `Expected a number, but received: ${de(t)}`
  );
}
function cn(t) {
  const e = t ? Object.keys(t) : [],
    r = Oo();
  return new ue({
    type: 'object',
    schema: t || null,
    *entries(n) {
      if (t && ze(n)) {
        const i = new Set(Object.keys(n));
        for (const s of e) i.delete(s), yield [s, n[s], t[s]];
        for (const s of i) yield [s, n[s], r];
      }
    },
    validator(n) {
      return ze(n) || `Expected an object, but received: ${de(n)}`;
    },
    coercer(n) {
      return ze(n) ? { ...n } : n;
    },
  });
}
function Fu(t) {
  return new ue({
    ...t,
    validator: (e, r) => e === void 0 || t.validator(e, r),
    refiner: (e, r) => e === void 0 || t.refiner(e, r),
  });
}
function Dp(t, e) {
  return new ue({
    type: 'record',
    schema: null,
    *entries(r) {
      if (ze(r))
        for (const n in r) {
          const i = r[n];
          yield [n, n, t], yield [n, i, e];
        }
    },
    validator(r) {
      return ze(r) || `Expected an object, but received: ${de(r)}`;
    },
  });
}
function jp() {
  return Ae('regexp', (t) => t instanceof RegExp);
}
function Bp(t) {
  return new ue({
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
        e instanceof Set || `Expected a \`Set\` object, but received: ${de(e)}`
      );
    },
  });
}
function $u() {
  return Ae(
    'string',
    (t) => typeof t == 'string' || `Expected a string, but received: ${de(t)}`
  );
}
function Pp(t) {
  const e = Oo();
  return new ue({
    type: 'tuple',
    schema: null,
    *entries(r) {
      if (Array.isArray(r)) {
        const n = Math.max(t.length, r.length);
        for (let i = 0; i < n; i++) yield [i, r[i], t[i] || e];
      }
    },
    validator(r) {
      return Array.isArray(r) || `Expected an array, but received: ${de(r)}`;
    },
  });
}
function Lo(t) {
  const e = Object.keys(t);
  return new ue({
    type: 'type',
    schema: t,
    *entries(r) {
      if (ze(r)) for (const n of e) yield [n, r[n], t[n]];
    },
    validator(r) {
      return ze(r) || `Expected an object, but received: ${de(r)}`;
    },
    coercer(r) {
      return ze(r) ? { ...r } : r;
    },
  });
}
function Fp(t) {
  const e = t.map((r) => r.type).join(' | ');
  return new ue({
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
        const [...o] = To(r, s, n),
          [a] = o;
        if (a[0]) for (const [c] of o) c && i.push(c);
        else return [];
      }
      return [
        `Expected the value to satisfy a union of \`${e}\`, but received: ${de(r)}`,
        ...i,
      ];
    },
  });
}
function Wu() {
  return Ae('unknown', () => !0);
}
function Do(t, e, r) {
  return new ue({
    ...t,
    coercer: (n, i) => (No(n, e) ? t.coercer(r(n, i), i) : t.coercer(n, i)),
  });
}
function $p(t, e, r = {}) {
  return Do(t, Wu(), (n) => {
    const i = typeof e == 'function' ? e() : e;
    if (n === void 0) return i;
    if (!r.strict && Za(n) && Za(i)) {
      const s = { ...n };
      let o = !1;
      for (const a in i) s[a] === void 0 && ((s[a] = i[a]), (o = !0));
      if (o) return s;
    }
    return n;
  });
}
function Wp(t) {
  return Do(t, $u(), (e) => e.trim());
}
function Hp(t) {
  return Xt(t, 'empty', (e) => {
    const r = Hu(e);
    return (
      r === 0 ||
      `Expected an empty ${t.type} but received one with a size of \`${r}\``
    );
  });
}
function Hu(t) {
  return t instanceof Map || t instanceof Set ? t.size : t.length;
}
function Vp(t, e, r = {}) {
  const { exclusive: n } = r;
  return Xt(t, 'max', (i) =>
    n
      ? i < e
      : i <= e ||
        `Expected a ${t.type} less than ${n ? '' : 'or equal to '}${e} but received \`${i}\``
  );
}
function zp(t, e, r = {}) {
  const { exclusive: n } = r;
  return Xt(t, 'min', (i) =>
    n
      ? i > e
      : i >= e ||
        `Expected a ${t.type} greater than ${n ? '' : 'or equal to '}${e} but received \`${i}\``
  );
}
function Up(t) {
  return Xt(
    t,
    'nonempty',
    (e) =>
      Hu(e) > 0 || `Expected a nonempty ${t.type} but received an empty one`
  );
}
function qp(t, e) {
  return Xt(
    t,
    'pattern',
    (r) =>
      e.test(r) ||
      `Expected a ${t.type} matching \`/${e.source}/\` but received "${r}"`
  );
}
function Jp(t, e, r = e) {
  const n = `Expected a ${t.type}`,
    i = e === r ? `of \`${e}\`` : `between \`${e}\` and \`${r}\``;
  return Xt(t, 'size', (s) => {
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
function Xt(t, e, r) {
  return new ue({
    ...t,
    *refiner(n, i) {
      yield* t.refiner(n, i);
      const s = r(n, i),
        o = ho(s, i, t, n);
      for (const a of o) yield { ...a, refinement: e };
    },
  });
}
const Gp = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Struct: ue,
        StructError: Du,
        any: _p,
        array: Sp,
        assert: ju,
        assign: dp,
        bigint: Ep,
        boolean: Cp,
        coerce: Do,
        create: Bu,
        date: xp,
        defaulted: $p,
        define: Ae,
        deprecated: pp,
        dynamic: bp,
        empty: Hp,
        enums: kp,
        func: Ip,
        instance: Mp,
        integer: Rp,
        intersection: Ap,
        is: No,
        lazy: gp,
        literal: Tp,
        map: Np,
        mask: Pu,
        max: Vp,
        min: zp,
        never: Oo,
        nonempty: Up,
        nullable: Op,
        number: Lp,
        object: cn,
        omit: vp,
        optional: Fu,
        partial: yp,
        pattern: qp,
        pick: mp,
        record: Dp,
        refine: Xt,
        regexp: jp,
        set: Bp,
        size: Jp,
        string: $u,
        struct: wp,
        trimmed: Wp,
        tuple: Pp,
        type: Lo,
        union: Fp,
        unknown: Wu,
        validate: Tr,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  er = Gt(Gp);
Object.defineProperty(we, '__esModule', { value: !0 });
we.assertExhaustive = we.assertStruct = we.assert = we.AssertionError = void 0;
const Zp = er;
function Qp(t) {
  return typeof t == 'object' && t !== null && 'message' in t;
}
function Yp(t) {
  var e, r;
  return (
    typeof ((r =
      (e = t == null ? void 0 : t.prototype) === null || e === void 0
        ? void 0
        : e.constructor) === null || r === void 0
      ? void 0
      : r.name) == 'string'
  );
}
function Kp(t) {
  const e = Qp(t) ? t.message : String(t);
  return e.endsWith('.') ? e.slice(0, -1) : e;
}
function Vu(t, e) {
  return Yp(t) ? new t({ message: e }) : t({ message: e });
}
class jo extends Error {
  constructor(e) {
    super(e.message), (this.code = 'ERR_ASSERTION');
  }
}
we.AssertionError = jo;
function Xp(t, e = 'Assertion failed.', r = jo) {
  if (!t) throw e instanceof Error ? e : Vu(r, e);
}
we.assert = Xp;
function e0(t, e, r = 'Assertion failed', n = jo) {
  try {
    (0, Zp.assert)(t, e);
  } catch (i) {
    throw Vu(n, `${r}: ${Kp(i)}.`);
  }
}
we.assertStruct = e0;
function t0(t) {
  throw new Error(
    'Invalid branch reached. Should be detected during compilation.'
  );
}
we.assertExhaustive = t0;
var un = {};
Object.defineProperty(un, '__esModule', { value: !0 });
un.base64 = void 0;
const r0 = er,
  n0 = we,
  i0 = (t, e = {}) => {
    var r, n;
    const i = (r = e.paddingRequired) !== null && r !== void 0 ? r : !1,
      s = (n = e.characterSet) !== null && n !== void 0 ? n : 'base64';
    let o;
    s === 'base64'
      ? (o = String.raw`[A-Za-z0-9+\/]`)
      : ((0, n0.assert)(s === 'base64url'), (o = String.raw`[-_A-Za-z0-9]`));
    let a;
    return (
      i
        ? (a = new RegExp(`^(?:${o}{4})*(?:${o}{3}=|${o}{2}==)?$`, 'u'))
        : (a = new RegExp(
            `^(?:${o}{4})*(?:${o}{2,3}|${o}{3}=|${o}{2}==)?$`,
            'u'
          )),
      (0, r0.pattern)(t, a)
    );
  };
un.base64 = i0;
var J = {},
  ln = {};
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
  const e = er,
    r = we;
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
})(ln);
Object.defineProperty(J, '__esModule', { value: !0 });
J.createDataView =
  J.concatBytes =
  J.valueToBytes =
  J.stringToBytes =
  J.numberToBytes =
  J.signedBigIntToBytes =
  J.bigIntToBytes =
  J.hexToBytes =
  J.bytesToString =
  J.bytesToNumber =
  J.bytesToSignedBigInt =
  J.bytesToBigInt =
  J.bytesToHex =
  J.assertIsBytes =
  J.isBytes =
    void 0;
const Oe = we,
  fo = ln,
  Qa = 48,
  Ya = 58,
  Ka = 87;
function s0() {
  const t = [];
  return () => {
    if (t.length === 0)
      for (let e = 0; e < 256; e++) t.push(e.toString(16).padStart(2, '0'));
    return t;
  };
}
const o0 = s0();
function Bo(t) {
  return t instanceof Uint8Array;
}
J.isBytes = Bo;
function Nr(t) {
  (0, Oe.assert)(Bo(t), 'Value must be a Uint8Array.');
}
J.assertIsBytes = Nr;
function zu(t) {
  if ((Nr(t), t.length === 0)) return '0x';
  const e = o0(),
    r = new Array(t.length);
  for (let n = 0; n < t.length; n++) r[n] = e[t[n]];
  return (0, fo.add0x)(r.join(''));
}
J.bytesToHex = zu;
function Uu(t) {
  Nr(t);
  const e = zu(t);
  return BigInt(e);
}
J.bytesToBigInt = Uu;
function a0(t) {
  Nr(t);
  let e = BigInt(0);
  for (const r of t) e = (e << BigInt(8)) + BigInt(r);
  return BigInt.asIntN(t.length * 8, e);
}
J.bytesToSignedBigInt = a0;
function c0(t) {
  Nr(t);
  const e = Uu(t);
  return (
    (0, Oe.assert)(
      e <= BigInt(Number.MAX_SAFE_INTEGER),
      'Number is not a safe integer. Use `bytesToBigInt` instead.'
    ),
    Number(e)
  );
}
J.bytesToNumber = c0;
function u0(t) {
  return Nr(t), new TextDecoder().decode(t);
}
J.bytesToString = u0;
function ni(t) {
  var e;
  if (
    ((e = t == null ? void 0 : t.toLowerCase) === null || e === void 0
      ? void 0
      : e.call(t)) === '0x'
  )
    return new Uint8Array();
  (0, fo.assertIsHexString)(t);
  const r = (0, fo.remove0x)(t).toLowerCase(),
    n = r.length % 2 === 0 ? r : `0${r}`,
    i = new Uint8Array(n.length / 2);
  for (let s = 0; s < i.length; s++) {
    const o = n.charCodeAt(s * 2),
      a = n.charCodeAt(s * 2 + 1),
      c = o - (o < Ya ? Qa : Ka),
      u = a - (a < Ya ? Qa : Ka);
    i[s] = c * 16 + u;
  }
  return i;
}
J.hexToBytes = ni;
function qu(t) {
  (0, Oe.assert)(typeof t == 'bigint', 'Value must be a bigint.'),
    (0, Oe.assert)(t >= BigInt(0), 'Value must be a non-negative bigint.');
  const e = t.toString(16);
  return ni(e);
}
J.bigIntToBytes = qu;
function l0(t, e) {
  (0, Oe.assert)(e > 0);
  const r = t >> BigInt(31);
  return !(((~t & r) + (t & ~r)) >> BigInt(e * 8 + -1));
}
function h0(t, e) {
  (0, Oe.assert)(typeof t == 'bigint', 'Value must be a bigint.'),
    (0, Oe.assert)(typeof e == 'number', 'Byte length must be a number.'),
    (0, Oe.assert)(e > 0, 'Byte length must be greater than 0.'),
    (0, Oe.assert)(
      l0(t, e),
      'Byte length is too small to represent the given value.'
    );
  let r = t;
  const n = new Uint8Array(e);
  for (let i = 0; i < n.length; i++)
    (n[i] = Number(BigInt.asUintN(8, r))), (r >>= BigInt(8));
  return n.reverse();
}
J.signedBigIntToBytes = h0;
function Ju(t) {
  (0, Oe.assert)(typeof t == 'number', 'Value must be a number.'),
    (0, Oe.assert)(t >= 0, 'Value must be a non-negative number.'),
    (0, Oe.assert)(
      Number.isSafeInteger(t),
      'Value is not a safe integer. Use `bigIntToBytes` instead.'
    );
  const e = t.toString(16);
  return ni(e);
}
J.numberToBytes = Ju;
function Gu(t) {
  return (
    (0, Oe.assert)(typeof t == 'string', 'Value must be a string.'),
    new TextEncoder().encode(t)
  );
}
J.stringToBytes = Gu;
function Zu(t) {
  if (typeof t == 'bigint') return qu(t);
  if (typeof t == 'number') return Ju(t);
  if (typeof t == 'string') return t.startsWith('0x') ? ni(t) : Gu(t);
  if (Bo(t)) return t;
  throw new TypeError(`Unsupported value type: "${typeof t}".`);
}
J.valueToBytes = Zu;
function f0(t) {
  const e = new Array(t.length);
  let r = 0;
  for (let i = 0; i < t.length; i++) {
    const s = Zu(t[i]);
    (e[i] = s), (r += s.length);
  }
  const n = new Uint8Array(r);
  for (let i = 0, s = 0; i < e.length; i++) n.set(e[i], s), (s += e[i].length);
  return n;
}
J.concatBytes = f0;
function d0(t) {
  if (typeof Buffer < 'u' && t instanceof Buffer) {
    const e = t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
    return new DataView(e);
  }
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
J.createDataView = d0;
var ii = {};
Object.defineProperty(ii, '__esModule', { value: !0 });
ii.ChecksumStruct = void 0;
const Xa = er,
  p0 = un;
ii.ChecksumStruct = (0, Xa.size)(
  (0, p0.base64)((0, Xa.string)(), { paddingRequired: !0 }),
  44,
  44
);
var at = {};
Object.defineProperty(at, '__esModule', { value: !0 });
at.createHex = at.createBytes = at.createBigInt = at.createNumber = void 0;
const ie = er,
  b0 = we,
  Qu = J,
  si = ln,
  Yu = (0, ie.union)([
    (0, ie.number)(),
    (0, ie.bigint)(),
    (0, ie.string)(),
    si.StrictHexStruct,
  ]),
  g0 = (0, ie.coerce)((0, ie.number)(), Yu, Number),
  v0 = (0, ie.coerce)((0, ie.bigint)(), Yu, BigInt);
(0, ie.union)([si.StrictHexStruct, (0, ie.instance)(Uint8Array)]);
const y0 = (0, ie.coerce)(
    (0, ie.instance)(Uint8Array),
    (0, ie.union)([si.StrictHexStruct]),
    Qu.hexToBytes
  ),
  m0 = (0, ie.coerce)(
    si.StrictHexStruct,
    (0, ie.instance)(Uint8Array),
    Qu.bytesToHex
  );
function w0(t) {
  try {
    const e = (0, ie.create)(t, g0);
    return (
      (0, b0.assert)(
        Number.isFinite(e),
        `Expected a number-like value, got "${t}".`
      ),
      e
    );
  } catch (e) {
    throw e instanceof ie.StructError
      ? new Error(`Expected a number-like value, got "${t}".`)
      : e;
  }
}
at.createNumber = w0;
function _0(t) {
  try {
    return (0, ie.create)(t, v0);
  } catch (e) {
    throw e instanceof ie.StructError
      ? new Error(`Expected a number-like value, got "${String(e.value)}".`)
      : e;
  }
}
at.createBigInt = _0;
function S0(t) {
  if (typeof t == 'string' && t.toLowerCase() === '0x') return new Uint8Array();
  try {
    return (0, ie.create)(t, y0);
  } catch (e) {
    throw e instanceof ie.StructError
      ? new Error(`Expected a bytes-like value, got "${String(e.value)}".`)
      : e;
  }
}
at.createBytes = S0;
function E0(t) {
  if (
    (t instanceof Uint8Array && t.length === 0) ||
    (typeof t == 'string' && t.toLowerCase() === '0x')
  )
    return '0x';
  try {
    return (0, ie.create)(t, m0);
  } catch (e) {
    throw e instanceof ie.StructError
      ? new Error(`Expected a bytes-like value, got "${String(e.value)}".`)
      : e;
  }
}
at.createHex = E0;
var yr = {},
  Ku =
    (N && N.__classPrivateFieldSet) ||
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
  Ce =
    (N && N.__classPrivateFieldGet) ||
    function (t, e, r, n) {
      if (r === 'a' && !n)
        throw new TypeError('Private accessor was defined without a getter');
      if (typeof e == 'function' ? t !== e || !n : !e.has(t))
        throw new TypeError(
          'Cannot read private member from an object whose class did not declare it'
        );
      return r === 'm' ? n : r === 'a' ? n.call(t) : n ? n.value : e.get(t);
    },
  Ze,
  rt;
Object.defineProperty(yr, '__esModule', { value: !0 });
yr.FrozenSet = yr.FrozenMap = void 0;
class Po {
  constructor(e) {
    Ze.set(this, void 0), Ku(this, Ze, new Map(e), 'f'), Object.freeze(this);
  }
  get size() {
    return Ce(this, Ze, 'f').size;
  }
  [((Ze = new WeakMap()), Symbol.iterator)]() {
    return Ce(this, Ze, 'f')[Symbol.iterator]();
  }
  entries() {
    return Ce(this, Ze, 'f').entries();
  }
  forEach(e, r) {
    return Ce(this, Ze, 'f').forEach((n, i, s) => e.call(r, n, i, this));
  }
  get(e) {
    return Ce(this, Ze, 'f').get(e);
  }
  has(e) {
    return Ce(this, Ze, 'f').has(e);
  }
  keys() {
    return Ce(this, Ze, 'f').keys();
  }
  values() {
    return Ce(this, Ze, 'f').values();
  }
  toString() {
    return `FrozenMap(${this.size}) {${this.size > 0 ? ` ${[...this.entries()].map(([e, r]) => `${String(e)} => ${String(r)}`).join(', ')} ` : ''}}`;
  }
}
yr.FrozenMap = Po;
class Fo {
  constructor(e) {
    rt.set(this, void 0), Ku(this, rt, new Set(e), 'f'), Object.freeze(this);
  }
  get size() {
    return Ce(this, rt, 'f').size;
  }
  [((rt = new WeakMap()), Symbol.iterator)]() {
    return Ce(this, rt, 'f')[Symbol.iterator]();
  }
  entries() {
    return Ce(this, rt, 'f').entries();
  }
  forEach(e, r) {
    return Ce(this, rt, 'f').forEach((n, i, s) => e.call(r, n, i, this));
  }
  has(e) {
    return Ce(this, rt, 'f').has(e);
  }
  keys() {
    return Ce(this, rt, 'f').keys();
  }
  values() {
    return Ce(this, rt, 'f').values();
  }
  toString() {
    return `FrozenSet(${this.size}) {${this.size > 0 ? ` ${[...this.values()].map((e) => String(e)).join(', ')} ` : ''}}`;
  }
}
yr.FrozenSet = Fo;
Object.freeze(Po);
Object.freeze(Po.prototype);
Object.freeze(Fo);
Object.freeze(Fo.prototype);
var Xu = {},
  $o = {};
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
      u.split('').reduce((p, m) => (o(m) ? p + 1 : p + 2), 0) +
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
})($o);
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
  const e = er,
    r = we,
    n = $o;
  t.JsonStruct = (0, e.define)('Json', (_) => {
    const [R] = E(_, !0);
    return R ? !0 : 'Expected a valid JSON-serializable value';
  });
  function i(_) {
    return (0, e.is)(_, t.JsonStruct);
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
  function s(_) {
    return (0, e.is)(_, t.JsonRpcNotificationStruct);
  }
  t.isJsonRpcNotification = s;
  function o(_, R) {
    (0, r.assertStruct)(
      _,
      t.JsonRpcNotificationStruct,
      'Invalid JSON-RPC notification',
      R
    );
  }
  t.assertIsJsonRpcNotification = o;
  function a(_) {
    return (0, e.is)(_, t.JsonRpcRequestStruct);
  }
  t.isJsonRpcRequest = a;
  function c(_, R) {
    (0, r.assertStruct)(
      _,
      t.JsonRpcRequestStruct,
      'Invalid JSON-RPC request',
      R
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
  function u(_) {
    return (0, e.is)(_, t.PendingJsonRpcResponseStruct);
  }
  t.isPendingJsonRpcResponse = u;
  function l(_, R) {
    (0, r.assertStruct)(
      _,
      t.PendingJsonRpcResponseStruct,
      'Invalid pending JSON-RPC response',
      R
    );
  }
  t.assertIsPendingJsonRpcResponse = l;
  function h(_) {
    return (0, e.is)(_, t.JsonRpcResponseStruct);
  }
  t.isJsonRpcResponse = h;
  function p(_, R) {
    (0, r.assertStruct)(
      _,
      t.JsonRpcResponseStruct,
      'Invalid JSON-RPC response',
      R
    );
  }
  t.assertIsJsonRpcResponse = p;
  function m(_) {
    return (0, e.is)(_, t.JsonRpcSuccessStruct);
  }
  t.isJsonRpcSuccess = m;
  function C(_, R) {
    (0, r.assertStruct)(
      _,
      t.JsonRpcSuccessStruct,
      'Invalid JSON-RPC success response',
      R
    );
  }
  t.assertIsJsonRpcSuccess = C;
  function x(_) {
    return (0, e.is)(_, t.JsonRpcFailureStruct);
  }
  t.isJsonRpcFailure = x;
  function S(_, R) {
    (0, r.assertStruct)(
      _,
      t.JsonRpcFailureStruct,
      'Invalid JSON-RPC failure response',
      R
    );
  }
  t.assertIsJsonRpcFailure = S;
  function b(_) {
    return (0, e.is)(_, t.JsonRpcErrorStruct);
  }
  t.isJsonRpcError = b;
  function g(_, R) {
    (0, r.assertStruct)(_, t.JsonRpcErrorStruct, 'Invalid JSON-RPC error', R);
  }
  t.assertIsJsonRpcError = g;
  function w(_) {
    const {
      permitEmptyString: R,
      permitFractions: P,
      permitNull: j,
    } = Object.assign(
      { permitEmptyString: !0, permitFractions: !1, permitNull: !0 },
      _
    );
    return ($) =>
      !!(
        (typeof $ == 'number' && (P || Number.isInteger($))) ||
        (typeof $ == 'string' && (R || $.length > 0)) ||
        (j && $ === null)
      );
  }
  t.getJsonRpcIdValidator = w;
  function E(_, R = !1) {
    const P = new Set();
    function j(A, $) {
      if (A === void 0) return [!1, 0];
      if (A === null) return [!0, $ ? 0 : n.JsonSize.Null];
      const re = typeof A;
      try {
        if (re === 'function') return [!1, 0];
        if (re === 'string' || A instanceof String)
          return [
            !0,
            $ ? 0 : (0, n.calculateStringSize)(A) + n.JsonSize.Quote * 2,
          ];
        if (re === 'boolean' || A instanceof Boolean)
          return $
            ? [!0, 0]
            : [!0, A == !0 ? n.JsonSize.True : n.JsonSize.False];
        if (re === 'number' || A instanceof Number)
          return $ ? [!0, 0] : [!0, (0, n.calculateNumberSize)(A)];
        if (A instanceof Date)
          return $
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
            (G, [K, he], pe, je) => {
              let [Ie, Je] = j(he, $);
              if (!Ie)
                throw new Error(
                  'JSON validation did not pass. Validation process stopped.'
                );
              if ((P.delete(A), $)) return 0;
              const Me = Array.isArray(A)
                  ? 0
                  : K.length + n.JsonSize.Comma + n.JsonSize.Colon * 2,
                Ge = pe < je.length - 1 ? n.JsonSize.Comma : 0;
              return G + Me + Je + Ge;
            },
            $ ? 0 : n.JsonSize.Wrapper * 2
          ),
        ];
      } catch {
        return [!1, 0];
      }
    }
    return j(_, R);
  }
  t.validateJsonAndGetSize = E;
})(Xu);
var mr = {},
  po = { exports: {} },
  Us,
  ec;
function C0() {
  if (ec) return Us;
  ec = 1;
  var t = 1e3,
    e = t * 60,
    r = e * 60,
    n = r * 24,
    i = n * 7,
    s = n * 365.25;
  Us = function (l, h) {
    h = h || {};
    var p = typeof l;
    if (p === 'string' && l.length > 0) return o(l);
    if (p === 'number' && isFinite(l)) return h.long ? c(l) : a(l);
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(l)
    );
  };
  function o(l) {
    if (((l = String(l)), !(l.length > 100))) {
      var h =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          l
        );
      if (h) {
        var p = parseFloat(h[1]),
          m = (h[2] || 'ms').toLowerCase();
        switch (m) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return p * s;
          case 'weeks':
          case 'week':
          case 'w':
            return p * i;
          case 'days':
          case 'day':
          case 'd':
            return p * n;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return p * r;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return p * e;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return p * t;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return p;
          default:
            return;
        }
      }
    }
  }
  function a(l) {
    var h = Math.abs(l);
    return h >= n
      ? Math.round(l / n) + 'd'
      : h >= r
        ? Math.round(l / r) + 'h'
        : h >= e
          ? Math.round(l / e) + 'm'
          : h >= t
            ? Math.round(l / t) + 's'
            : l + 'ms';
  }
  function c(l) {
    var h = Math.abs(l);
    return h >= n
      ? u(l, h, n, 'day')
      : h >= r
        ? u(l, h, r, 'hour')
        : h >= e
          ? u(l, h, e, 'minute')
          : h >= t
            ? u(l, h, t, 'second')
            : l + ' ms';
  }
  function u(l, h, p, m) {
    var C = h >= p * 1.5;
    return Math.round(l / p) + ' ' + m + (C ? 's' : '');
  }
  return Us;
}
function x0(t) {
  (r.debug = r),
    (r.default = r),
    (r.coerce = c),
    (r.disable = s),
    (r.enable = i),
    (r.enabled = o),
    (r.humanize = C0()),
    (r.destroy = u),
    Object.keys(t).forEach((l) => {
      r[l] = t[l];
    }),
    (r.names = []),
    (r.skips = []),
    (r.formatters = {});
  function e(l) {
    let h = 0;
    for (let p = 0; p < l.length; p++)
      (h = (h << 5) - h + l.charCodeAt(p)), (h |= 0);
    return r.colors[Math.abs(h) % r.colors.length];
  }
  r.selectColor = e;
  function r(l) {
    let h,
      p = null,
      m,
      C;
    function x(...S) {
      if (!x.enabled) return;
      const b = x,
        g = Number(new Date()),
        w = g - (h || g);
      (b.diff = w),
        (b.prev = h),
        (b.curr = g),
        (h = g),
        (S[0] = r.coerce(S[0])),
        typeof S[0] != 'string' && S.unshift('%O');
      let E = 0;
      (S[0] = S[0].replace(/%([a-zA-Z%])/g, (R, P) => {
        if (R === '%%') return '%';
        E++;
        const j = r.formatters[P];
        if (typeof j == 'function') {
          const A = S[E];
          (R = j.call(b, A)), S.splice(E, 1), E--;
        }
        return R;
      })),
        r.formatArgs.call(b, S),
        (b.log || r.log).apply(b, S);
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
          p !== null
            ? p
            : (m !== r.namespaces && ((m = r.namespaces), (C = r.enabled(l))),
              C),
        set: (S) => {
          p = S;
        },
      }),
      typeof r.init == 'function' && r.init(x),
      x
    );
  }
  function n(l, h) {
    const p = r(this.namespace + (typeof h > 'u' ? ':' : h) + l);
    return (p.log = this.log), p;
  }
  function i(l) {
    r.save(l), (r.namespaces = l), (r.names = []), (r.skips = []);
    let h;
    const p = (typeof l == 'string' ? l : '').split(/[\s,]+/),
      m = p.length;
    for (h = 0; h < m; h++)
      p[h] &&
        ((l = p[h].replace(/\*/g, '.*?')),
        l[0] === '-'
          ? r.skips.push(new RegExp('^' + l.slice(1) + '$'))
          : r.names.push(new RegExp('^' + l + '$')));
  }
  function s() {
    const l = [...r.names.map(a), ...r.skips.map(a).map((h) => '-' + h)].join(
      ','
    );
    return r.enable(''), l;
  }
  function o(l) {
    if (l[l.length - 1] === '*') return !0;
    let h, p;
    for (h = 0, p = r.skips.length; h < p; h++)
      if (r.skips[h].test(l)) return !1;
    for (h = 0, p = r.names.length; h < p; h++)
      if (r.names[h].test(l)) return !0;
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
var k0 = x0;
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
      h = 0;
    c[0].replace(/%[a-zA-Z%]/g, (p) => {
      p !== '%%' && (l++, p === '%c' && (h = l));
    }),
      c.splice(h, 0, u);
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
  t.exports = k0(e);
  const { formatters: a } = t.exports;
  a.j = function (c) {
    try {
      return JSON.stringify(c);
    } catch (u) {
      return '[UnexpectedJSONParseError]: ' + u.message;
    }
  };
})(po, po.exports);
var I0 = po.exports,
  M0 =
    (N && N.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(mr, '__esModule', { value: !0 });
mr.createModuleLogger = mr.createProjectLogger = void 0;
const R0 = M0(I0),
  A0 = (0, R0.default)('metamask');
function T0(t) {
  return A0.extend(t);
}
mr.createProjectLogger = T0;
function N0(t, e) {
  return t.extend(e);
}
mr.createModuleLogger = N0;
var ct = {};
Object.defineProperty(ct, '__esModule', { value: !0 });
ct.hexToBigInt = ct.hexToNumber = ct.bigIntToHex = ct.numberToHex = void 0;
const dr = we,
  Gr = ln,
  O0 = (t) => (
    (0, dr.assert)(typeof t == 'number', 'Value must be a number.'),
    (0, dr.assert)(t >= 0, 'Value must be a non-negative number.'),
    (0, dr.assert)(
      Number.isSafeInteger(t),
      'Value is not a safe integer. Use `bigIntToHex` instead.'
    ),
    (0, Gr.add0x)(t.toString(16))
  );
ct.numberToHex = O0;
const L0 = (t) => (
  (0, dr.assert)(typeof t == 'bigint', 'Value must be a bigint.'),
  (0, dr.assert)(t >= 0, 'Value must be a non-negative bigint.'),
  (0, Gr.add0x)(t.toString(16))
);
ct.bigIntToHex = L0;
const D0 = (t) => {
  (0, Gr.assertIsHexString)(t);
  const e = parseInt(t, 16);
  return (
    (0, dr.assert)(
      Number.isSafeInteger(e),
      'Value is not a safe integer. Use `hexToBigInt` instead.'
    ),
    e
  );
};
ct.hexToNumber = D0;
const j0 = (t) => ((0, Gr.assertIsHexString)(t), BigInt((0, Gr.add0x)(t)));
ct.hexToBigInt = j0;
var el = {};
Object.defineProperty(el, '__esModule', { value: !0 });
var tl = {};
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
})(tl);
var rl = {};
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
  const e = dh,
    r = er,
    n = we;
  (t.VersionStruct = (0, r.refine)((0, r.string)(), 'Version', (h) =>
    (0, e.valid)(h) === null ? `Expected SemVer version, got "${h}"` : !0
  )),
    (t.VersionRangeStruct = (0, r.refine)(
      (0, r.string)(),
      'Version range',
      (h) =>
        (0, e.validRange)(h) === null ? `Expected SemVer range, got "${h}"` : !0
    ));
  function i(h) {
    return (0, r.is)(h, t.VersionStruct);
  }
  t.isValidSemVerVersion = i;
  function s(h) {
    return (0, r.is)(h, t.VersionRangeStruct);
  }
  t.isValidSemVerRange = s;
  function o(h) {
    (0, n.assertStruct)(h, t.VersionStruct);
  }
  t.assertIsSemVerVersion = o;
  function a(h) {
    (0, n.assertStruct)(h, t.VersionRangeStruct);
  }
  t.assertIsSemVerRange = a;
  function c(h, p) {
    return (0, e.gt)(h, p);
  }
  t.gtVersion = c;
  function u(h, p) {
    return (0, e.gtr)(h, p);
  }
  t.gtRange = u;
  function l(h, p) {
    return (0, e.satisfies)(h, p, { includePrerelease: !0 });
  }
  t.satisfiesVersionRange = l;
})(rl);
(function (t) {
  var e =
      (N && N.__createBinding) ||
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
      (N && N.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== 'default' &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, '__esModule', { value: !0 }),
    r(we, t),
    r(un, t),
    r(J, t),
    r(ii, t),
    r(at, t),
    r(yr, t),
    r(ln, t),
    r(Xu, t),
    r(mr, t),
    r($o, t),
    r(ct, t),
    r(el, t),
    r(tl, t),
    r(rl, t);
})(Lu);
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.createModuleLogger = t.projectLogger = void 0);
  const e = Lu;
  Object.defineProperty(t, 'createModuleLogger', {
    enumerable: !0,
    get: function () {
      return e.createModuleLogger;
    },
  }),
    (t.projectLogger = (0, e.createProjectLogger)('eth-block-tracker'));
})(Ou);
var nl =
  (N && N.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(ri, '__esModule', { value: !0 });
ri.PollingBlockTracker = void 0;
const B0 = nl(Ao),
  P0 = nl(ip),
  F0 = an,
  tc = Ou,
  rc = (0, tc.createModuleLogger)(tc.projectLogger, 'polling-block-tracker'),
  $0 = (0, B0.default)(),
  W0 = 1e3;
class H0 extends F0.BaseBlockTracker {
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
      (this._pollingInterval = e.pollingInterval || 20 * W0),
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
        const r = nc(this._pollingInterval, !this._keepEventLoopActive);
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
        const i = nc(this._retryTimeout, !this._keepEventLoopActive);
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
      id: $0(),
      method: 'eth_blockNumber',
      params: [],
    };
    this._setSkipCacheFlag && (e.skipCache = !0), rc('Making request', e);
    const r = await (0, P0.default)((n) => this._provider.sendAsync(e, n))();
    if ((rc('Got response', r), r.error))
      throw new Error(`PollingBlockTracker - encountered error fetching block:
${r.error.message}`);
    return r.result;
  }
}
ri.PollingBlockTracker = H0;
function nc(t, e) {
  return new Promise((r) => {
    const n = setTimeout(r, t);
    n.unref && e && n.unref();
  });
}
var oi = {},
  V0 =
    (N && N.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(oi, '__esModule', { value: !0 });
oi.SubscribeBlockTracker = void 0;
const z0 = V0(Ao),
  U0 = an,
  q0 = (0, z0.default)();
class J0 extends U0.BaseBlockTracker {
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
        { id: q0(), method: e, params: r, jsonrpc: '2.0' },
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
oi.SubscribeBlockTracker = J0;
var il = {};
Object.defineProperty(il, '__esModule', { value: !0 });
(function (t) {
  var e =
      (N && N.__createBinding) ||
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
      (N && N.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== 'default' &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, '__esModule', { value: !0 }),
    r(ri, t),
    r(oi, t),
    r(il, t);
})(Nu);
var Wo = {},
  ai = {},
  hn = {};
Object.defineProperty(hn, '__esModule', { value: !0 });
hn.getUniqueId = void 0;
const sl = 4294967295;
let qs = Math.floor(Math.random() * sl);
function G0() {
  return (qs = (qs + 1) % sl), qs;
}
hn.getUniqueId = G0;
Object.defineProperty(ai, '__esModule', { value: !0 });
ai.createIdRemapMiddleware = void 0;
const Z0 = hn;
function Q0() {
  return (t, e, r, n) => {
    const i = t.id,
      s = Z0.getUniqueId();
    (t.id = s),
      (e.id = s),
      r((o) => {
        (t.id = i), (e.id = i), o();
      });
  };
}
ai.createIdRemapMiddleware = Q0;
var ci = {};
Object.defineProperty(ci, '__esModule', { value: !0 });
ci.createAsyncMiddleware = void 0;
function Y0(t) {
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
ci.createAsyncMiddleware = Y0;
var ui = {};
Object.defineProperty(ui, '__esModule', { value: !0 });
ui.createScaffoldMiddleware = void 0;
function K0(t) {
  return (e, r, n, i) => {
    const s = t[e.method];
    return s === void 0
      ? n()
      : typeof s == 'function'
        ? s(e, r, n, i)
        : ((r.result = s), i());
  };
}
ui.createScaffoldMiddleware = K0;
var fn = {},
  X0 =
    (N && N.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(fn, '__esModule', { value: !0 });
fn.JsonRpcEngine = void 0;
const eb = X0(Zt),
  Pe = Co;
class gt extends eb.default {
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
        const [s, o, a] = await gt._runAllMiddleware(e, r, this._middleware);
        return o
          ? (await gt._runReturnHandlers(a), i(s))
          : n(async (c) => {
              try {
                await gt._runReturnHandlers(a);
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
      const o = new Pe.EthereumRpcError(
        Pe.errorCodes.rpc.invalidRequest,
        `Requests must be plain objects. Received: ${typeof e}`,
        { request: e }
      );
      return r(o, { id: void 0, jsonrpc: '2.0', error: o });
    }
    if (typeof e.method != 'string') {
      const o = new Pe.EthereumRpcError(
        Pe.errorCodes.rpc.invalidRequest,
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
      s && (delete i.result, i.error || (i.error = Pe.serializeError(s))),
      r(s, i)
    );
  }
  async _processRequest(e, r) {
    const [n, i, s] = await gt._runAllMiddleware(e, r, this._middleware);
    if ((gt._checkForCompletion(e, r, i), await gt._runReturnHandlers(s), n))
      throw n;
  }
  static async _runAllMiddleware(e, r, n) {
    const i = [];
    let s = null,
      o = !1;
    for (const a of n)
      if ((([s, o] = await gt._runMiddleware(e, r, a, i)), o)) break;
    return [s, o, i.reverse()];
  }
  static _runMiddleware(e, r, n, i) {
    return new Promise((s) => {
      const o = (c) => {
          const u = c || r.error;
          u && (r.error = Pe.serializeError(u)), s([u, !0]);
        },
        a = (c) => {
          r.error
            ? o(r.error)
            : (c &&
                (typeof c != 'function' &&
                  o(
                    new Pe.EthereumRpcError(
                      Pe.errorCodes.rpc.internal,
                      `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof c}" for request:
${Js(e)}`,
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
      throw new Pe.EthereumRpcError(
        Pe.errorCodes.rpc.internal,
        `JsonRpcEngine: Response has no error or result for request:
${Js(e)}`,
        { request: e }
      );
    if (!n)
      throw new Pe.EthereumRpcError(
        Pe.errorCodes.rpc.internal,
        `JsonRpcEngine: Nothing ended request:
${Js(e)}`,
        { request: e }
      );
  }
}
fn.JsonRpcEngine = gt;
function Js(t) {
  return JSON.stringify(t, null, 2);
}
var li = {};
Object.defineProperty(li, '__esModule', { value: !0 });
li.mergeMiddleware = void 0;
const tb = fn;
function rb(t) {
  const e = new tb.JsonRpcEngine();
  return t.forEach((r) => e.push(r)), e.asMiddleware();
}
li.mergeMiddleware = rb;
(function (t) {
  var e =
      (N && N.__createBinding) ||
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
      (N && N.__exportStar) ||
      function (n, i) {
        for (var s in n)
          s !== 'default' &&
            !Object.prototype.hasOwnProperty.call(i, s) &&
            e(i, n, s);
      };
  Object.defineProperty(t, '__esModule', { value: !0 }),
    r(ai, t),
    r(ci, t),
    r(ui, t),
    r(hn, t),
    r(fn, t),
    r(li, t);
})(Wo);
var ol = {},
  Ho = {};
const Vo = Gt(ph);
var hi = {};
Object.defineProperty(hi, '__esModule', { value: !0 });
var ic = Vo,
  nb = (function () {
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
        return ic.__awaiter(this, void 0, void 0, function () {
          var r, n, i;
          return ic.__generator(this, function (s) {
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
hi.default = nb;
Object.defineProperty(Ho, '__esModule', { value: !0 });
var sc = Vo,
  ib = hi,
  sb = (function () {
    function t() {
      this._semaphore = new ib.default(1);
    }
    return (
      (t.prototype.acquire = function () {
        return sc.__awaiter(this, void 0, void 0, function () {
          var e, r;
          return sc.__generator(this, function (n) {
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
Ho.default = sb;
var fi = {};
Object.defineProperty(fi, '__esModule', { value: !0 });
fi.withTimeout = void 0;
var Cn = Vo;
function ob(t, e, r) {
  var n = this;
  return (
    r === void 0 && (r = new Error('timeout')),
    {
      acquire: function () {
        return new Promise(function (i, s) {
          return Cn.__awaiter(n, void 0, void 0, function () {
            var o, a, c;
            return Cn.__generator(this, function (u) {
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
        return Cn.__awaiter(this, void 0, void 0, function () {
          var s, o;
          return Cn.__generator(this, function (a) {
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
fi.withTimeout = ob;
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.withTimeout = t.Semaphore = t.Mutex = void 0);
  var e = Ho;
  Object.defineProperty(t, 'Mutex', {
    enumerable: !0,
    get: function () {
      return e.default;
    },
  });
  var r = hi;
  Object.defineProperty(t, 'Semaphore', {
    enumerable: !0,
    get: function () {
      return r.default;
    },
  });
  var n = fi;
  Object.defineProperty(t, 'withTimeout', {
    enumerable: !0,
    get: function () {
      return n.withTimeout;
    },
  });
})(ol);
var ab = ub,
  cb = Object.prototype.hasOwnProperty;
function ub() {
  for (var t = {}, e = 0; e < arguments.length; e++) {
    var r = arguments[e];
    for (var n in r) cb.call(r, n) && (t[n] = r[n]);
  }
  return t;
}
const lb = ab,
  hb = Ao();
var fb = F;
function F(t) {
  const e = this;
  e.currentProvider = t;
}
F.prototype.getBalance = dn(2, 'eth_getBalance');
F.prototype.getCode = dn(2, 'eth_getCode');
F.prototype.getTransactionCount = dn(2, 'eth_getTransactionCount');
F.prototype.getStorageAt = dn(3, 'eth_getStorageAt');
F.prototype.call = dn(2, 'eth_call');
F.prototype.protocolVersion = U('eth_protocolVersion');
F.prototype.syncing = U('eth_syncing');
F.prototype.coinbase = U('eth_coinbase');
F.prototype.mining = U('eth_mining');
F.prototype.hashrate = U('eth_hashrate');
F.prototype.gasPrice = U('eth_gasPrice');
F.prototype.accounts = U('eth_accounts');
F.prototype.blockNumber = U('eth_blockNumber');
F.prototype.getBlockTransactionCountByHash = U(
  'eth_getBlockTransactionCountByHash'
);
F.prototype.getBlockTransactionCountByNumber = U(
  'eth_getBlockTransactionCountByNumber'
);
F.prototype.getUncleCountByBlockHash = U('eth_getUncleCountByBlockHash');
F.prototype.getUncleCountByBlockNumber = U('eth_getUncleCountByBlockNumber');
F.prototype.sign = U('eth_sign');
F.prototype.sendTransaction = U('eth_sendTransaction');
F.prototype.sendRawTransaction = U('eth_sendRawTransaction');
F.prototype.estimateGas = U('eth_estimateGas');
F.prototype.getBlockByHash = U('eth_getBlockByHash');
F.prototype.getBlockByNumber = U('eth_getBlockByNumber');
F.prototype.getTransactionByHash = U('eth_getTransactionByHash');
F.prototype.getTransactionByBlockHashAndIndex = U(
  'eth_getTransactionByBlockHashAndIndex'
);
F.prototype.getTransactionByBlockNumberAndIndex = U(
  'eth_getTransactionByBlockNumberAndIndex'
);
F.prototype.getTransactionReceipt = U('eth_getTransactionReceipt');
F.prototype.getUncleByBlockHashAndIndex = U('eth_getUncleByBlockHashAndIndex');
F.prototype.getUncleByBlockNumberAndIndex = U(
  'eth_getUncleByBlockNumberAndIndex'
);
F.prototype.getCompilers = U('eth_getCompilers');
F.prototype.compileLLL = U('eth_compileLLL');
F.prototype.compileSolidity = U('eth_compileSolidity');
F.prototype.compileSerpent = U('eth_compileSerpent');
F.prototype.newFilter = U('eth_newFilter');
F.prototype.newBlockFilter = U('eth_newBlockFilter');
F.prototype.newPendingTransactionFilter = U('eth_newPendingTransactionFilter');
F.prototype.uninstallFilter = U('eth_uninstallFilter');
F.prototype.getFilterChanges = U('eth_getFilterChanges');
F.prototype.getFilterLogs = U('eth_getFilterLogs');
F.prototype.getLogs = U('eth_getLogs');
F.prototype.getWork = U('eth_getWork');
F.prototype.submitWork = U('eth_submitWork');
F.prototype.submitHashrate = U('eth_submitHashrate');
F.prototype.sendAsync = function (t, e) {
  this.currentProvider.sendAsync(db(t), function (n, i) {
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
function U(t) {
  return function () {
    const e = this;
    var r = [].slice.call(arguments),
      n = r.pop();
    e.sendAsync({ method: t, params: r }, n);
  };
}
function dn(t, e) {
  return function () {
    const r = this;
    var n = [].slice.call(arguments),
      i = n.pop();
    n.length < t && n.push('latest'), r.sendAsync({ method: e, params: n }, i);
  };
}
function db(t) {
  return lb({ id: hb(), jsonrpc: '2.0', params: [] }, t);
}
const oc = (t, e, r, n) =>
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
  ac = new WeakMap();
var pb = (t, e) => {
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
      let c = ac.get(o);
      if ((c || ((c = {}), ac.set(o, c)), a in c)) return c[a];
      const u = (C) =>
          typeof C == 'string' || typeof a == 'symbol' ? a === C : C.test(a),
        l = Reflect.getOwnPropertyDescriptor(o, a),
        h = l === void 0 || l.writable || l.configurable,
        m = (e.include ? e.include.some(u) : !e.exclude.some(u)) && h;
      return (c[a] = m), m;
    },
    i = new WeakMap(),
    s = new Proxy(t, {
      apply(o, a, c) {
        const u = i.get(o);
        if (u) return Reflect.apply(u, a, c);
        const l = e.excludeMain ? o : oc(o, e, s, o);
        return i.set(o, l), Reflect.apply(l, a, c);
      },
      get(o, a) {
        const c = o[a];
        if (!n(o, a) || c === Function.prototype[a]) return c;
        const u = i.get(c);
        if (u) return u;
        if (typeof c == 'function') {
          const l = oc(c, e, s, o);
          return i.set(c, l), l;
        }
        return c;
      },
    });
  return s;
};
const bb = Zt.default;
let gb = class extends bb {
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
var zo = gb;
const vb = zo;
let yb = class extends vb {
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
var mb = yb,
  pn = {
    minBlockRef: wb,
    maxBlockRef: _b,
    sortBlockRefs: Uo,
    bnToHex: Sb,
    blockRefIsNumber: Eb,
    hexToInt: Dn,
    incrementHexInt: Cb,
    intToHex: al,
    unsafeRandomBytes: xb,
  };
function wb(...t) {
  return Uo(t)[0];
}
function _b(...t) {
  const e = Uo(t);
  return e[e.length - 1];
}
function Uo(t) {
  return t.sort((e, r) =>
    e === 'latest' || r === 'earliest'
      ? 1
      : r === 'latest' || e === 'earliest'
        ? -1
        : Dn(e) - Dn(r)
  );
}
function Sb(t) {
  return '0x' + t.toString(16);
}
function Eb(t) {
  return t && !['earliest', 'latest', 'pending'].includes(t);
}
function Dn(t) {
  return t == null ? t : Number.parseInt(t, 16);
}
function Cb(t) {
  if (t == null) return t;
  const e = Dn(t);
  return al(e + 1);
}
function al(t) {
  if (t == null) return t;
  let e = t.toString(16);
  return e.length % 2 && (e = '0' + e), '0x' + e;
}
function xb(t) {
  let e = '0x';
  for (let r = 0; r < t; r++) (e += cc()), (e += cc());
  return e;
}
function cc() {
  return Math.floor(Math.random() * 16).toString(16);
}
const kb = fb,
  Ib = pb,
  Mb = mb,
  {
    bnToHex: N2,
    hexToInt: xn,
    incrementHexInt: Rb,
    minBlockRef: Ab,
    blockRefIsNumber: Tb,
  } = pn;
let Nb = class extends Mb {
  constructor({ provider: e, params: r }) {
    super(),
      (this.type = 'log'),
      (this.ethQuery = new kb(e)),
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
    const n = Ab(this.params.toBlock, e),
      i = Object.assign({}, this.params, { toBlock: n }),
      s = await this._fetchLogs(i);
    this.addInitialResults(s);
  }
  async update({ oldBlock: e, newBlock: r }) {
    const n = r;
    let i;
    e ? (i = Rb(e)) : (i = r);
    const s = Object.assign({}, this.params, { fromBlock: i, toBlock: n }),
      a = (await this._fetchLogs(s)).filter((c) => this.matchLog(c));
    this.addResults(a);
  }
  async _fetchLogs(e) {
    return await Ib((n) => this.ethQuery.getLogs(e, n))();
  }
  matchLog(e) {
    if (
      xn(this.params.fromBlock) >= xn(e.blockNumber) ||
      (Tb(this.params.toBlock) && xn(this.params.toBlock) <= xn(e.blockNumber))
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
var Ob = Nb,
  qo = Lb;
async function Lb({ provider: t, fromBlock: e, toBlock: r }) {
  e || (e = r);
  const n = uc(e),
    s = uc(r) - n + 1,
    o = Array(s)
      .fill()
      .map((c, u) => n + u)
      .map(Db);
  return await Promise.all(
    o.map((c) => Bb(t, 'eth_getBlockByNumber', [c, !1]))
  );
}
function uc(t) {
  return t == null ? t : Number.parseInt(t, 16);
}
function Db(t) {
  return t == null ? t : '0x' + t.toString(16);
}
function jb(t, e) {
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
async function Bb(t, e, r) {
  for (let n = 0; n < 3; n++)
    try {
      return await jb(t, { id: 1, jsonrpc: '2.0', method: e, params: r });
    } catch (i) {
      console.error(`provider.sendAsync failed: ${i.stack || i.message || i}`);
    }
  throw new Error(`Block not found for params: ${JSON.stringify(r)}`);
}
const Pb = zo,
  Fb = qo,
  { incrementHexInt: $b } = pn;
let Wb = class extends Pb {
  constructor({ provider: e, params: r }) {
    super(), (this.type = 'block'), (this.provider = e);
  }
  async update({ oldBlock: e, newBlock: r }) {
    const n = r,
      i = $b(e),
      o = (await Fb({ provider: this.provider, fromBlock: i, toBlock: n })).map(
        (a) => a.hash
      );
    this.addResults(o);
  }
};
var Hb = Wb;
const Vb = zo,
  zb = qo,
  { incrementHexInt: Ub } = pn;
let qb = class extends Vb {
  constructor({ provider: e }) {
    super(), (this.type = 'tx'), (this.provider = e);
  }
  async update({ oldBlock: e }) {
    const r = e,
      n = Ub(e),
      i = await zb({ provider: this.provider, fromBlock: n, toBlock: r }),
      s = [];
    for (const o of i) s.push(...o.transactions);
    this.addResults(s);
  }
};
var Jb = qb;
const Gb = ol.Mutex,
  { createAsyncMiddleware: Zb, createScaffoldMiddleware: Qb } = Wo,
  Yb = Ob,
  Kb = Hb,
  Xb = Jb,
  { intToHex: cl, hexToInt: Gs } = pn;
var eg = tg;
function tg({ blockTracker: t, provider: e }) {
  let r = 0,
    n = {};
  const i = new Gb(),
    s = rg({ mutex: i }),
    o = Qb({
      eth_newFilter: s(Zs(c)),
      eth_newBlockFilter: s(Zs(u)),
      eth_newPendingTransactionFilter: s(Zs(l)),
      eth_uninstallFilter: s(Tn(m)),
      eth_getFilterChanges: s(Tn(h)),
      eth_getFilterLogs: s(Tn(p)),
    }),
    a = async ({ oldBlock: g, newBlock: w }) => {
      if (n.length === 0) return;
      const E = await i.acquire();
      try {
        await Promise.all(
          sr(n).map(async (_) => {
            try {
              await _.update({ oldBlock: g, newBlock: w });
            } catch (R) {
              console.error(R);
            }
          })
        );
      } catch (_) {
        console.error(_);
      }
      E();
    };
  return (
    (o.newLogFilter = c),
    (o.newBlockFilter = u),
    (o.newPendingTransactionFilter = l),
    (o.uninstallFilter = m),
    (o.getFilterChanges = h),
    (o.getFilterLogs = p),
    (o.destroy = () => {
      S();
    }),
    o
  );
  async function c(g) {
    const w = new Yb({ provider: e, params: g });
    return await C(w), w;
  }
  async function u() {
    const g = new Kb({ provider: e });
    return await C(g), g;
  }
  async function l() {
    const g = new Xb({ provider: e });
    return await C(g), g;
  }
  async function h(g) {
    const w = Gs(g),
      E = n[w];
    if (!E) throw new Error(`No filter for index "${w}"`);
    return E.getChangesAndClear();
  }
  async function p(g) {
    const w = Gs(g),
      E = n[w];
    if (!E) throw new Error(`No filter for index "${w}"`);
    let _ = [];
    return E.type === 'log' && (_ = E.getAllResults()), _;
  }
  async function m(g) {
    const w = Gs(g),
      _ = !!n[w];
    return _ && (await x(w)), _;
  }
  async function C(g) {
    const w = sr(n).length,
      E = await t.getLatestBlock();
    await g.initialize({ currentBlock: E }),
      r++,
      (n[r] = g),
      (g.id = r),
      (g.idHex = cl(r));
    const _ = sr(n).length;
    return b({ prevFilterCount: w, newFilterCount: _ }), r;
  }
  async function x(g) {
    const w = sr(n).length;
    delete n[g];
    const E = sr(n).length;
    b({ prevFilterCount: w, newFilterCount: E });
  }
  async function S() {
    const g = sr(n).length;
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
function Zs(t) {
  return Tn(async (...e) => {
    const r = await t(...e);
    return cl(r.id);
  });
}
function Tn(t) {
  return Zb(async (e, r) => {
    const n = await t.apply(null, e.params);
    r.result = n;
  });
}
function rg({ mutex: t }) {
  return (e) => async (r, n, i, s) => {
    (await t.acquire())(), e(r, n, i, s);
  };
}
function sr(t, e) {
  const r = [];
  for (let n in t) r.push(t[n]);
  return r;
}
const ng = Zt.default,
  { createAsyncMiddleware: lc, createScaffoldMiddleware: ig } = Wo,
  sg = eg,
  { unsafeRandomBytes: og, incrementHexInt: ag } = pn,
  cg = qo;
var ug = lg;
function lg({ blockTracker: t, provider: e }) {
  const r = {},
    n = sg({ blockTracker: t, provider: e });
  let i = !1;
  const s = new ng(),
    o = ig({ eth_subscribe: lc(a), eth_unsubscribe: lc(c) });
  return (o.destroy = l), { events: s, middleware: o };
  async function a(h, p) {
    if (i)
      throw new Error(
        'SubscriptionManager - attempting to use after destroying'
      );
    const m = h.params[0],
      C = og(16);
    let x;
    switch (m) {
      case 'newHeads':
        x = S({ subId: C });
        break;
      case 'logs':
        const g = h.params[1],
          w = await n.newLogFilter(g);
        x = b({ subId: C, filter: w });
        break;
      default:
        throw new Error(
          `SubscriptionManager - unsupported subscription type "${m}"`
        );
    }
    (r[C] = x), (p.result = C);
    return;
    function S({ subId: g }) {
      const w = {
        type: m,
        destroy: async () => {
          t.removeListener('sync', w.update);
        },
        update: async ({ oldBlock: E, newBlock: _ }) => {
          const R = _,
            P = ag(E);
          (await cg({ provider: e, fromBlock: P, toBlock: R }))
            .map(hg)
            .filter(($) => $ !== null)
            .forEach(($) => {
              u(g, $);
            });
        },
      };
      return t.on('sync', w.update), w;
    }
    function b({ subId: g, filter: w }) {
      return (
        w.on('update', (_) => u(g, _)),
        { type: m, destroy: async () => await n.uninstallFilter(w.idHex) }
      );
    }
  }
  async function c(h, p) {
    if (i)
      throw new Error(
        'SubscriptionManager - attempting to use after destroying'
      );
    const m = h.params[0],
      C = r[m];
    if (!C) {
      p.result = !1;
      return;
    }
    delete r[m], await C.destroy(), (p.result = !0);
  }
  function u(h, p) {
    s.emit('notification', {
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: { subscription: h, result: p },
    });
  }
  function l() {
    s.removeAllListeners();
    for (const h in r) r[h].destroy(), delete r[h];
    i = !0;
  }
}
function hg(t) {
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
Object.defineProperty(ti, '__esModule', { value: !0 });
ti.SubscriptionManager = void 0;
const fg = Nu,
  dg = ug,
  hc = () => {};
class pg {
  constructor(e) {
    const r = new fg.PollingBlockTracker({
        provider: e,
        pollingInterval: 15e3,
        setSkipCacheFlag: !0,
      }),
      { events: n, middleware: i } = dg({ blockTracker: r, provider: e });
    (this.events = n), (this.subscriptionMiddleware = i);
  }
  async handleRequest(e) {
    const r = {};
    return await this.subscriptionMiddleware(e, r, hc, hc), r;
  }
  destroy() {
    this.subscriptionMiddleware.destroy();
  }
}
ti.SubscriptionManager = pg;
var Jo =
  (N && N.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(br, '__esModule', { value: !0 });
br.CoinbaseWalletProvider = void 0;
const bg = Jo(Zt),
  gg = Jo(Hn),
  Qs = kr,
  Y = Kr,
  fc = Mr,
  dc = Xe,
  Ys = Jn,
  vg = X,
  H = O,
  Ks = Jo(Xd),
  yg = vr,
  Z = Tu,
  mg = ti,
  pc = 'DefaultChainId',
  bc = 'DefaultJsonRpcUrl';
class wg extends bg.default {
  constructor(e) {
    var r, n;
    super(),
      (this._filterPolyfill = new yg.FilterPolyfill(this)),
      (this._subscriptionManager = new mg.SubscriptionManager(this)),
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
      s = (0, H.prepend0x)(i.toString(16));
    this.emit('connect', { chainIdStr: s });
    const o = this._storage.getItem(dc.LOCAL_STORAGE_ADDRESSES_KEY);
    if (o) {
      const a = o.split(' ');
      a[0] !== '' &&
        ((this._addresses = a.map((c) => (0, H.ensureAddressString)(c))),
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
    return (0, H.prepend0x)(this.getChainId().toString(16));
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
    return (e = this._storage.getItem(bc)) !== null && e !== void 0
      ? e
      : this._jsonRpcUrlFromOpts;
  }
  set jsonRpcUrl(e) {
    this._storage.setItem(bc, e);
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
    this._storage.setItem(pc, r.toString(10)),
      ((0, H.ensureIntNumber)(r) !== n ||
        !this.hasMadeFirstChainChangedEmission) &&
        (this.emit('chainChanged', this.getChainId()),
        (this.hasMadeFirstChainChangedEmission = !0));
  }
  async watchAsset(e, r, n, i, s, o) {
    return !!(
      await (
        await this.initializeRelay()
      ).watchAsset(e, r, n, i, s, o == null ? void 0 : o.toString()).promise
    ).result;
  }
  async addEthereumChain(e, r, n, i, s, o) {
    var a, c;
    if ((0, H.ensureIntNumber)(e) === this.getChainId()) return !1;
    const u = await this.initializeRelay(),
      l = u.inlineAddEthereumChain(e.toString());
    !this._isAuthorized() && !l && (await u.requestEthereumAccounts().promise);
    const h = await u.addEthereumChain(e.toString(), r, s, n, i, o).promise;
    return (
      ((a = h.result) === null || a === void 0 ? void 0 : a.isApproved) ===
        !0 && this.updateProviderInfo(r[0], e),
      ((c = h.result) === null || c === void 0 ? void 0 : c.isApproved) === !0
    );
  }
  async switchEthereumChain(e) {
    const n = await (
      await this.initializeRelay()
    ).switchEthereumChain(e.toString(10), this.selectedAddress || void 0)
      .promise;
    if ((0, vg.isErrorResponse)(n) && n.errorCode)
      throw n.errorCode === Y.standardErrorCodes.provider.unsupportedChain
        ? Y.standardErrors.provider.unsupportedChain(e)
        : Y.standardErrors.provider.custom({
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
        e.log(Qs.EVENTS.ETH_ACCOUNTS_STATE, {
          method: 'provider::enable',
          addresses_length: this._addresses.length,
          sessionIdHash: this._relay
            ? fc.Session.hash(this._relay.session.id)
            : void 0,
        }),
      this._isAuthorized()
        ? [...this._addresses]
        : await this.send(Z.JSONRPCMethod.eth_requestAccounts)
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
          throw (0, Y.serializeError)(i, e);
        });
    } catch (n) {
      throw (0, Y.serializeError)(n, e);
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
        throw (0, Y.serializeError)(n, e);
      });
    } catch (n) {
      return Promise.reject((0, Y.serializeError)(n, e));
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
        throw (0, Y.serializeError)(r, e.method);
      });
    } catch (r) {
      return Promise.reject((0, Y.serializeError)(r, e.method));
    }
  }
  async _request(e) {
    if (!e || typeof e != 'object' || Array.isArray(e))
      throw Y.standardErrors.rpc.invalidRequest({
        message: 'Expected a single, non-array, object argument.',
        data: e,
      });
    const { method: r, params: n } = e;
    if (typeof r != 'string' || r.length === 0)
      throw Y.standardErrors.rpc.invalidRequest({
        message: "'args.method' must be a non-empty string.",
        data: e,
      });
    if (
      n !== void 0 &&
      !Array.isArray(n) &&
      (typeof n != 'object' || n === null)
    )
      throw Y.standardErrors.rpc.invalidRequest({
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
    ).scanQRCode((0, H.ensureRegExpString)(e)).promise;
    if (typeof i.result != 'string')
      throw (0, Y.serializeError)(
        (r = i.errorMessage) !== null && r !== void 0
          ? r
          : 'result was not a string',
        Ys.Web3Method.scanQRCode
      );
    return i.result;
  }
  async genericRequest(e, r) {
    var n;
    const s = await (await this.initializeRelay()).genericRequest(e, r).promise;
    if (typeof s.result != 'string')
      throw (0, Y.serializeError)(
        (n = s.errorMessage) !== null && n !== void 0
          ? n
          : 'result was not a string',
        Ys.Web3Method.generic
      );
    return s.result;
  }
  async selectProvider(e) {
    var r;
    const i = await (await this.initializeRelay()).selectProvider(e).promise;
    if (typeof i.result != 'string')
      throw (0, Y.serializeError)(
        (r = i.errorMessage) !== null && r !== void 0
          ? r
          : 'result was not a string',
        Ys.Web3Method.selectProvider
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
    const n = e.map((i) => (0, H.ensureAddressString)(i));
    JSON.stringify(n) !== JSON.stringify(this._addresses) &&
      ((this._addresses = n),
      this.emit('accountsChanged', this._addresses),
      this._storage.setItem(dc.LOCAL_STORAGE_ADDRESSES_KEY, n.join(' ')));
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
      case Z.JSONRPCMethod.eth_accounts:
        return this._eth_accounts();
      case Z.JSONRPCMethod.eth_coinbase:
        return this._eth_coinbase();
      case Z.JSONRPCMethod.eth_uninstallFilter:
        return this._eth_uninstallFilter(n);
      case Z.JSONRPCMethod.net_version:
        return this._net_version();
      case Z.JSONRPCMethod.eth_chainId:
        return this._eth_chainId();
      default:
        return;
    }
  }
  async _handleAsynchronousMethods(e) {
    const { method: r } = e,
      n = e.params || [];
    switch (r) {
      case Z.JSONRPCMethod.eth_requestAccounts:
        return this._eth_requestAccounts();
      case Z.JSONRPCMethod.eth_sign:
        return this._eth_sign(n);
      case Z.JSONRPCMethod.eth_ecRecover:
        return this._eth_ecRecover(n);
      case Z.JSONRPCMethod.personal_sign:
        return this._personal_sign(n);
      case Z.JSONRPCMethod.personal_ecRecover:
        return this._personal_ecRecover(n);
      case Z.JSONRPCMethod.eth_signTransaction:
        return this._eth_signTransaction(n);
      case Z.JSONRPCMethod.eth_sendRawTransaction:
        return this._eth_sendRawTransaction(n);
      case Z.JSONRPCMethod.eth_sendTransaction:
        return this._eth_sendTransaction(n);
      case Z.JSONRPCMethod.eth_signTypedData_v1:
        return this._eth_signTypedData_v1(n);
      case Z.JSONRPCMethod.eth_signTypedData_v2:
        return this._throwUnsupportedMethodError();
      case Z.JSONRPCMethod.eth_signTypedData_v3:
        return this._eth_signTypedData_v3(n);
      case Z.JSONRPCMethod.eth_signTypedData_v4:
      case Z.JSONRPCMethod.eth_signTypedData:
        return this._eth_signTypedData_v4(n);
      case Z.JSONRPCMethod.cbWallet_arbitrary:
        return this._cbwallet_arbitrary(n);
      case Z.JSONRPCMethod.wallet_addEthereumChain:
        return this._wallet_addEthereumChain(n);
      case Z.JSONRPCMethod.wallet_switchEthereumChain:
        return this._wallet_switchEthereumChain(n);
      case Z.JSONRPCMethod.wallet_watchAsset:
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
      case Z.JSONRPCMethod.eth_newFilter:
        return this._eth_newFilter(n);
      case Z.JSONRPCMethod.eth_newBlockFilter:
        return this._eth_newBlockFilter();
      case Z.JSONRPCMethod.eth_newPendingTransactionFilter:
        return this._eth_newPendingTransactionFilter();
      case Z.JSONRPCMethod.eth_getFilterChanges:
        return this._eth_getFilterChanges(n);
      case Z.JSONRPCMethod.eth_getFilterLogs:
        return this._eth_getFilterLogs(n);
    }
  }
  _handleSubscriptionMethods(e) {
    switch (e.method) {
      case Z.JSONRPCMethod.eth_subscribe:
      case Z.JSONRPCMethod.eth_unsubscribe:
        return this._subscriptionManager.handleRequest(e);
    }
  }
  _isKnownAddress(e) {
    try {
      const r = (0, H.ensureAddressString)(e);
      return this._addresses
        .map((i) => (0, H.ensureAddressString)(i))
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
          r.log(Qs.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED),
        new Error('Unknown Ethereum address'))
      );
  }
  _prepareTransactionParams(e) {
    const r = e.from
      ? (0, H.ensureAddressString)(e.from)
      : this.selectedAddress;
    if (!r) throw new Error('Ethereum address is unavailable');
    this._ensureKnownAddress(r);
    const n = e.to ? (0, H.ensureAddressString)(e.to) : null,
      i = e.value != null ? (0, H.ensureBN)(e.value) : new gg.default(0),
      s = e.data ? (0, H.ensureBuffer)(e.data) : Buffer.alloc(0),
      o = e.nonce != null ? (0, H.ensureIntNumber)(e.nonce) : null,
      a = e.gasPrice != null ? (0, H.ensureBN)(e.gasPrice) : null,
      c = e.maxFeePerGas != null ? (0, H.ensureBN)(e.maxFeePerGas) : null,
      u =
        e.maxPriorityFeePerGas != null
          ? (0, H.ensureBN)(e.maxPriorityFeePerGas)
          : null,
      l = e.gas != null ? (0, H.ensureBN)(e.gas) : null,
      h = this.getChainId();
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
      chainId: h,
    };
  }
  _isAuthorized() {
    return this._addresses.length > 0;
  }
  _requireAuthorization() {
    if (!this._isAuthorized()) throw Y.standardErrors.provider.unauthorized({});
  }
  _throwUnsupportedMethodError() {
    throw Y.standardErrors.provider.unsupportedMethod({});
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
        ? Y.standardErrors.provider.userRejectedRequest(
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
    return (0, H.hexStringFromIntNumber)(this.getChainId());
  }
  getChainId() {
    const e = this._storage.getItem(pc);
    if (!e) return (0, H.ensureIntNumber)(this._chainIdFromOpts);
    const r = parseInt(e, 10);
    return (0, H.ensureIntNumber)(r);
  }
  async _eth_requestAccounts() {
    var e;
    if (
      ((e = this.diagnostic) === null ||
        e === void 0 ||
        e.log(Qs.EVENTS.ETH_ACCOUNTS_STATE, {
          method: 'provider::_eth_requestAccounts',
          addresses_length: this._addresses.length,
          sessionIdHash: this._relay
            ? fc.Session.hash(this._relay.session.id)
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
        ? Y.standardErrors.provider.userRejectedRequest(
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
    const r = (0, H.ensureAddressString)(e[0]),
      n = (0, H.ensureBuffer)(e[1]);
    return this._signEthereumMessage(n, r, !1);
  }
  _eth_ecRecover(e) {
    const r = (0, H.ensureBuffer)(e[0]),
      n = (0, H.ensureBuffer)(e[1]);
    return this._ethereumAddressFromSignedMessage(r, n, !1);
  }
  _personal_sign(e) {
    this._requireAuthorization();
    const r = (0, H.ensureBuffer)(e[0]),
      n = (0, H.ensureAddressString)(e[1]);
    return this._signEthereumMessage(r, n, !0);
  }
  _personal_ecRecover(e) {
    const r = (0, H.ensureBuffer)(e[0]),
      n = (0, H.ensureBuffer)(e[1]);
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
        ? Y.standardErrors.provider.userRejectedRequest(
            'User denied transaction signature'
          )
        : n;
    }
  }
  async _eth_sendRawTransaction(e) {
    const r = (0, H.ensureBuffer)(e[0]);
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
        ? Y.standardErrors.provider.userRejectedRequest(
            'User denied transaction signature'
          )
        : n;
    }
  }
  async _eth_signTypedData_v1(e) {
    this._requireAuthorization();
    const r = (0, H.ensureParsedJSONObject)(e[0]),
      n = (0, H.ensureAddressString)(e[1]);
    this._ensureKnownAddress(n);
    const i = Ks.default.hashForSignTypedDataLegacy({ data: r }),
      s = JSON.stringify(r, null, 2);
    return this._signEthereumMessage(i, n, !1, s);
  }
  async _eth_signTypedData_v3(e) {
    this._requireAuthorization();
    const r = (0, H.ensureAddressString)(e[0]),
      n = (0, H.ensureParsedJSONObject)(e[1]);
    this._ensureKnownAddress(r);
    const i = Ks.default.hashForSignTypedData_v3({ data: n }),
      s = JSON.stringify(n, null, 2);
    return this._signEthereumMessage(i, r, !1, s);
  }
  async _eth_signTypedData_v4(e) {
    this._requireAuthorization();
    const r = (0, H.ensureAddressString)(e[0]),
      n = (0, H.ensureParsedJSONObject)(e[1]);
    this._ensureKnownAddress(r);
    const i = Ks.default.hashForSignTypedData_v4({ data: n }),
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
      throw Y.standardErrors.rpc.invalidParams('chainName is a required field');
    if (!o.nativeCurrency)
      throw Y.standardErrors.rpc.invalidParams(
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
    if (!r.type) throw Y.standardErrors.rpc.invalidParams('Type is required');
    if ((r == null ? void 0 : r.type) !== 'ERC20')
      throw Y.standardErrors.rpc.invalidParams(
        `Asset of type '${r.type}' is not supported`
      );
    if (!(r != null && r.options))
      throw Y.standardErrors.rpc.invalidParams('Options are required');
    if (!(r != null && r.options.address))
      throw Y.standardErrors.rpc.invalidParams('Address is required');
    const n = this.getChainId(),
      { address: i, symbol: s, image: o, decimals: a } = r.options;
    return {
      jsonrpc: '2.0',
      id: 0,
      result: await this.watchAsset(r.type, i, s, a, o, n),
    };
  }
  _eth_uninstallFilter(e) {
    const r = (0, H.ensureHexString)(e[0]);
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
    const r = (0, H.ensureHexString)(e[0]);
    return this._filterPolyfill.getFilterChanges(r);
  }
  _eth_getFilterLogs(e) {
    const r = (0, H.ensureHexString)(e[0]);
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
br.CoinbaseWalletProvider = wg;
var di = {},
  pi = {};
const De = Gt(gh);
function wr(t) {
  return typeof t == 'function';
}
var gc = !1,
  $e = {
    Promise: void 0,
    set useDeprecatedSynchronousErrorHandling(t) {
      if (t) {
        var e = new Error();
        '' + e.stack;
      }
      gc = t;
    },
    get useDeprecatedSynchronousErrorHandling() {
      return gc;
    },
  };
function ur(t) {
  setTimeout(function () {
    throw t;
  }, 0);
}
var jn = {
    closed: !0,
    next: function (t) {},
    error: function (t) {
      if ($e.useDeprecatedSynchronousErrorHandling) throw t;
      ur(t);
    },
    complete: function () {},
  },
  xe = (function () {
    return (
      Array.isArray ||
      function (t) {
        return t && typeof t.length == 'number';
      }
    );
  })();
function Go(t) {
  return t !== null && typeof t == 'object';
}
var _g = (function () {
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
  zr = _g,
  se = (function () {
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
          if (wr(s)) {
            i && (this._unsubscribe = void 0);
            try {
              s.call(this);
            } catch (h) {
              e = h instanceof zr ? vc(h.errors) : [h];
            }
          }
          if (xe(o))
            for (var a = -1, u = o.length; ++a < u; ) {
              var l = o[a];
              if (Go(l))
                try {
                  l.unsubscribe();
                } catch (p) {
                  (e = e || []),
                    p instanceof zr ? (e = e.concat(vc(p.errors))) : e.push(p);
                }
            }
          if (e) throw new zr(e);
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
function vc(t) {
  return t.reduce(function (e, r) {
    return e.concat(r instanceof zr ? r.errors : r);
  }, []);
}
var Bn = (function () {
    return typeof Symbol == 'function'
      ? Symbol('rxSubscriber')
      : '@@rxSubscriber_' + Math.random();
  })(),
  L = (function (t) {
    k(e, t);
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
          s.destination = jn;
          break;
        case 1:
          if (!r) {
            s.destination = jn;
            break;
          }
          if (typeof r == 'object') {
            r instanceof e
              ? ((s.syncErrorThrowable = r.syncErrorThrowable),
                (s.destination = r),
                r.add(s))
              : ((s.syncErrorThrowable = !0), (s.destination = new yc(s, r)));
            break;
          }
        default:
          (s.syncErrorThrowable = !0), (s.destination = new yc(s, r, n, i));
          break;
      }
      return s;
    }
    return (
      (e.prototype[Bn] = function () {
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
  })(se),
  yc = (function (t) {
    k(e, t);
    function e(r, n, i, s) {
      var o = t.call(this) || this;
      o._parentSubscriber = r;
      var a,
        c = o;
      return (
        wr(n)
          ? (a = n)
          : n &&
            ((a = n.next),
            (i = n.error),
            (s = n.complete),
            n !== jn &&
              ((c = Object.create(n)),
              wr(c.unsubscribe) && o.add(c.unsubscribe.bind(c)),
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
          !$e.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable
            ? this.__tryOrUnsub(this._next, r)
            : this.__tryOrSetError(n, this._next, r) && this.unsubscribe();
        }
      }),
      (e.prototype.error = function (r) {
        if (!this.isStopped) {
          var n = this._parentSubscriber,
            i = $e.useDeprecatedSynchronousErrorHandling;
          if (this._error)
            !i || !n.syncErrorThrowable
              ? (this.__tryOrUnsub(this._error, r), this.unsubscribe())
              : (this.__tryOrSetError(n, this._error, r), this.unsubscribe());
          else if (n.syncErrorThrowable)
            i ? ((n.syncErrorValue = r), (n.syncErrorThrown = !0)) : ur(r),
              this.unsubscribe();
          else {
            if ((this.unsubscribe(), i)) throw r;
            ur(r);
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
            !$e.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable
              ? (this.__tryOrUnsub(i), this.unsubscribe())
              : (this.__tryOrSetError(n, i), this.unsubscribe());
          } else this.unsubscribe();
        }
      }),
      (e.prototype.__tryOrUnsub = function (r, n) {
        try {
          r.call(this._context, n);
        } catch (i) {
          if ((this.unsubscribe(), $e.useDeprecatedSynchronousErrorHandling))
            throw i;
          ur(i);
        }
      }),
      (e.prototype.__tryOrSetError = function (r, n, i) {
        if (!$e.useDeprecatedSynchronousErrorHandling)
          throw new Error('bad call');
        try {
          n.call(this._context, i);
        } catch (s) {
          return $e.useDeprecatedSynchronousErrorHandling
            ? ((r.syncErrorValue = s), (r.syncErrorThrown = !0), !0)
            : (ur(s), !0);
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
  })(L);
function Zo(t) {
  for (; t; ) {
    var e = t,
      r = e.closed,
      n = e.destination,
      i = e.isStopped;
    if (r || i) return !1;
    n && n instanceof L ? (t = n) : (t = null);
  }
  return !0;
}
function Sg(t, e, r) {
  if (t) {
    if (t instanceof L) return t;
    if (t[Bn]) return t[Bn]();
  }
  return !t && !e && !r ? new L(jn) : new L(t, e, r);
}
var Or = (function () {
  return (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
})();
function Nt(t) {
  return t;
}
function bo() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return ul(t);
}
function ul(t) {
  return t.length === 0
    ? Nt
    : t.length === 1
      ? t[0]
      : function (r) {
          return t.reduce(function (n, i) {
            return i(n);
          }, r);
        };
}
var V = (function () {
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
        s = Sg(e, r, n);
      if (
        (i
          ? s.add(i.call(s, this.source))
          : s.add(
              this.source ||
                ($e.useDeprecatedSynchronousErrorHandling &&
                  !s.syncErrorThrowable)
                ? this._subscribe(s)
                : this._trySubscribe(s)
            ),
        $e.useDeprecatedSynchronousErrorHandling &&
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
        $e.useDeprecatedSynchronousErrorHandling &&
          ((e.syncErrorThrown = !0), (e.syncErrorValue = r)),
          Zo(e) ? e.error(r) : console.warn(r);
      }
    }),
    (t.prototype.forEach = function (e, r) {
      var n = this;
      return (
        (r = mc(r)),
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
    (t.prototype[Or] = function () {
      return this;
    }),
    (t.prototype.pipe = function () {
      for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
      return e.length === 0 ? this : ul(e)(this);
    }),
    (t.prototype.toPromise = function (e) {
      var r = this;
      return (
        (e = mc(e)),
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
function mc(t) {
  if ((t || (t = $e.Promise || Promise), !t))
    throw new Error('no Promise impl found');
  return t;
}
var Eg = (function () {
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
  Mt = Eg,
  ll = (function (t) {
    k(e, t);
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
  })(se),
  hl = (function (t) {
    k(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.destination = r), n;
    }
    return e;
  })(L),
  ve = (function (t) {
    k(e, t);
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
      (e.prototype[Bn] = function () {
        return new hl(this);
      }),
      (e.prototype.lift = function (r) {
        var n = new wc(this, this);
        return (n.operator = r), n;
      }),
      (e.prototype.next = function (r) {
        if (this.closed) throw new Mt();
        if (!this.isStopped)
          for (
            var n = this.observers, i = n.length, s = n.slice(), o = 0;
            o < i;
            o++
          )
            s[o].next(r);
      }),
      (e.prototype.error = function (r) {
        if (this.closed) throw new Mt();
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
        if (this.closed) throw new Mt();
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
        if (this.closed) throw new Mt();
        return t.prototype._trySubscribe.call(this, r);
      }),
      (e.prototype._subscribe = function (r) {
        if (this.closed) throw new Mt();
        return this.hasError
          ? (r.error(this.thrownError), se.EMPTY)
          : this.isStopped
            ? (r.complete(), se.EMPTY)
            : (this.observers.push(r), new ll(this, r));
      }),
      (e.prototype.asObservable = function () {
        var r = new V();
        return (r.source = this), r;
      }),
      (e.create = function (r, n) {
        return new wc(r, n);
      }),
      e
    );
  })(V),
  wc = (function (t) {
    k(e, t);
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
        return n ? this.source.subscribe(r) : se.EMPTY;
      }),
      e
    );
  })(ve);
function Qo() {
  return function (e) {
    return e.lift(new Cg(e));
  };
}
var Cg = (function () {
    function t(e) {
      this.connectable = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = this.connectable;
        n._refCount++;
        var i = new xg(e, n),
          s = r.subscribe(i);
        return i.closed || (i.connection = n.connect()), s;
      }),
      t
    );
  })(),
  xg = (function (t) {
    k(e, t);
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
  })(L),
  fl = (function (t) {
    k(e, t);
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
            (r = this._connection = new se()),
            r.add(this.source.subscribe(new Ig(this.getSubject(), this))),
            r.closed && ((this._connection = null), (r = se.EMPTY))),
          r
        );
      }),
      (e.prototype.refCount = function () {
        return Qo()(this);
      }),
      e
    );
  })(V),
  kg = (function () {
    var t = fl.prototype;
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
  Ig = (function (t) {
    k(e, t);
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
  })(hl);
function Mg(t, e, r, n) {
  return function (i) {
    return i.lift(new Rg(t, e, r, n));
  };
}
var Rg = (function () {
    function t(e, r, n, i) {
      (this.keySelector = e),
        (this.elementSelector = r),
        (this.durationSelector = n),
        (this.subjectSelector = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new Ag(
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
  Ag = (function (t) {
    k(e, t);
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
          (s = this.subjectSelector ? this.subjectSelector() : new ve()),
            i.set(n, s);
          var a = new go(n, s, this);
          if ((this.destination.next(a), this.durationSelector)) {
            var c = void 0;
            try {
              c = this.durationSelector(new go(n, s));
            } catch (u) {
              this.error(u);
              return;
            }
            this.add(c.subscribe(new Tg(n, s, this)));
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
  })(L),
  Tg = (function (t) {
    k(e, t);
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
  })(L),
  go = (function (t) {
    k(e, t);
    function e(r, n, i) {
      var s = t.call(this) || this;
      return (s.key = r), (s.groupSubject = n), (s.refCountSubscription = i), s;
    }
    return (
      (e.prototype._subscribe = function (r) {
        var n = new se(),
          i = this,
          s = i.refCountSubscription,
          o = i.groupSubject;
        return s && !s.closed && n.add(new Ng(s)), n.add(o.subscribe(r)), n;
      }),
      e
    );
  })(V),
  Ng = (function (t) {
    k(e, t);
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
  })(se),
  dl = (function (t) {
    k(e, t);
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
        if (this.closed) throw new Mt();
        return this._value;
      }),
      (e.prototype.next = function (r) {
        t.prototype.next.call(this, (this._value = r));
      }),
      e
    );
  })(ve),
  Og = (function (t) {
    k(e, t);
    function e(r, n) {
      return t.call(this) || this;
    }
    return (
      (e.prototype.schedule = function (r, n) {
        return this;
      }),
      e
    );
  })(se),
  bn = (function (t) {
    k(e, t);
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
  })(Og),
  Lg = (function (t) {
    k(e, t);
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
  })(bn),
  vo = (function () {
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
  gn = (function (t) {
    k(e, t);
    function e(r, n) {
      n === void 0 && (n = vo.now);
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
  })(vo),
  Dg = (function (t) {
    k(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return e;
  })(gn),
  pl = new Dg(Lg),
  bl = pl,
  _r = new V(function (t) {
    return t.complete();
  });
function Lr(t) {
  return t ? jg(t) : _r;
}
function jg(t) {
  return new V(function (e) {
    return t.schedule(function () {
      return e.complete();
    });
  });
}
function Le(t) {
  return t && typeof t.schedule == 'function';
}
var gl = function (t) {
  return function (e) {
    for (var r = 0, n = t.length; r < n && !e.closed; r++) e.next(t[r]);
    e.complete();
  };
};
function Yo(t, e) {
  return new V(function (r) {
    var n = new se(),
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
function vn(t, e) {
  return e ? Yo(t, e) : new V(gl(t));
}
function bi() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return Le(r) ? (t.pop(), Yo(t, r)) : vn(t);
}
function Ko(t, e) {
  return e
    ? new V(function (r) {
        return e.schedule(Bg, 0, { error: t, subscriber: r });
      })
    : new V(function (r) {
        return r.error(t);
      });
}
function Bg(t) {
  var e = t.error,
    r = t.subscriber;
  r.error(e);
}
var yo;
yo || (yo = {});
var vt = (function () {
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
          return bi(this.value);
        case 'E':
          return Ko(this.error);
        case 'C':
          return Lr();
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
function Pg(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new Fg(t, e));
    }
  );
}
var Fg = (function () {
    function t(e, r) {
      r === void 0 && (r = 0), (this.scheduler = e), (this.delay = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new vl(e, this.scheduler, this.delay));
      }),
      t
    );
  })(),
  vl = (function (t) {
    k(e, t);
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
            new $g(r, this.destination)
          )
        );
      }),
      (e.prototype._next = function (r) {
        this.scheduleMessage(vt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        this.scheduleMessage(vt.createError(r)), this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.scheduleMessage(vt.createComplete()), this.unsubscribe();
      }),
      e
    );
  })(L),
  $g = (function () {
    function t(e, r) {
      (this.notification = e), (this.destination = r);
    }
    return t;
  })(),
  Xo = (function (t) {
    k(e, t);
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
          (this._events.push(new Wg(this._getNow(), r)),
          this._trimBufferThenGetEvents()),
          t.prototype.next.call(this, r);
      }),
      (e.prototype._subscribe = function (r) {
        var n = this._infiniteTimeWindow,
          i = n ? this._events : this._trimBufferThenGetEvents(),
          s = this.scheduler,
          o = i.length,
          a;
        if (this.closed) throw new Mt();
        if (
          (this.isStopped || this.hasError
            ? (a = se.EMPTY)
            : (this.observers.push(r), (a = new ll(this, r))),
          s && r.add((r = new vl(r, s))),
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
        return (this.scheduler || bl).now();
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
  })(ve),
  Wg = (function () {
    function t(e, r) {
      (this.time = e), (this.value = r);
    }
    return t;
  })(),
  Dr = (function (t) {
    k(e, t);
    function e() {
      var r = (t !== null && t.apply(this, arguments)) || this;
      return (r.value = null), (r.hasNext = !1), (r.hasCompleted = !1), r;
    }
    return (
      (e.prototype._subscribe = function (r) {
        return this.hasError
          ? (r.error(this.thrownError), se.EMPTY)
          : this.hasCompleted && this.hasNext
            ? (r.next(this.value), r.complete(), se.EMPTY)
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
  })(ve),
  Hg = 1,
  Vg = (function () {
    return Promise.resolve();
  })(),
  mo = {};
function _c(t) {
  return t in mo ? (delete mo[t], !0) : !1;
}
var Sc = {
    setImmediate: function (t) {
      var e = Hg++;
      return (
        (mo[e] = !0),
        Vg.then(function () {
          return _c(e) && t();
        }),
        e
      );
    },
    clearImmediate: function (t) {
      _c(t);
    },
  },
  zg = (function (t) {
    k(e, t);
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
                (r.scheduled = Sc.setImmediate(r.flush.bind(r, null))))
        );
      }),
      (e.prototype.recycleAsyncId = function (r, n, i) {
        if (
          (i === void 0 && (i = 0),
          (i !== null && i > 0) || (i === null && this.delay > 0))
        )
          return t.prototype.recycleAsyncId.call(this, r, n, i);
        r.actions.length === 0 &&
          (Sc.clearImmediate(n), (r.scheduled = void 0));
      }),
      e
    );
  })(bn),
  Ug = (function (t) {
    k(e, t);
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
  })(gn),
  yl = new Ug(zg),
  Nn = yl,
  ml = new gn(bn),
  ke = ml,
  qg = (function (t) {
    k(e, t);
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
  })(bn),
  Jg = (function (t) {
    k(e, t);
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
  })(gn),
  wl = new Jg(qg),
  Gg = wl,
  Zg = (function (t) {
    k(e, t);
    function e(r, n) {
      r === void 0 && (r = _l), n === void 0 && (n = Number.POSITIVE_INFINITY);
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
  })(gn),
  _l = (function (t) {
    k(e, t);
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
  })(bn);
function st() {}
function Qg(t) {
  return (
    !!t &&
    (t instanceof V ||
      (typeof t.lift == 'function' && typeof t.subscribe == 'function'))
  );
}
var Yg = (function () {
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
  Sr = Yg,
  Kg = (function () {
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
  yn = Kg,
  Xg = (function () {
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
  Sl = Xg;
function qe(t, e) {
  return function (n) {
    if (typeof t != 'function')
      throw new TypeError(
        'argument is not a function. Are you looking for `mapTo()`?'
      );
    return n.lift(new e1(t, e));
  };
}
var e1 = (function () {
    function t(e, r) {
      (this.project = e), (this.thisArg = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new t1(e, this.project, this.thisArg));
      }),
      t
    );
  })(),
  t1 = (function (t) {
    k(e, t);
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
  })(L);
function El(t, e, r) {
  if (e)
    if (Le(e)) r = e;
    else
      return function () {
        for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
        return El(t, r)
          .apply(void 0, n)
          .pipe(
            qe(function (s) {
              return xe(s) ? e.apply(void 0, s) : e(s);
            })
          );
      };
  return function () {
    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
    var s = this,
      o,
      a = { context: s, subject: o, callbackFunc: t, scheduler: r };
    return new V(function (c) {
      if (r) {
        var l = { args: n, subscriber: c, params: a };
        return r.schedule(r1, 0, l);
      } else {
        if (!o) {
          o = new Dr();
          var u = function () {
            for (var h = [], p = 0; p < arguments.length; p++)
              h[p] = arguments[p];
            o.next(h.length <= 1 ? h[0] : h), o.complete();
          };
          try {
            t.apply(s, n.concat([u]));
          } catch (h) {
            Zo(o) ? o.error(h) : console.warn(h);
          }
        }
        return o.subscribe(c);
      }
    });
  };
}
function r1(t) {
  var e = this,
    r = t.args,
    n = t.subscriber,
    i = t.params,
    s = i.callbackFunc,
    o = i.context,
    a = i.scheduler,
    c = i.subject;
  if (!c) {
    c = i.subject = new Dr();
    var u = function () {
      for (var l = [], h = 0; h < arguments.length; h++) l[h] = arguments[h];
      var p = l.length <= 1 ? l[0] : l;
      e.add(a.schedule(n1, 0, { value: p, subject: c }));
    };
    try {
      s.apply(o, r.concat([u]));
    } catch (l) {
      c.error(l);
    }
  }
  this.add(c.subscribe(n));
}
function n1(t) {
  var e = t.value,
    r = t.subject;
  r.next(e), r.complete();
}
function Cl(t, e, r) {
  if (e)
    if (Le(e)) r = e;
    else
      return function () {
        for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
        return Cl(t, r)
          .apply(void 0, n)
          .pipe(
            qe(function (s) {
              return xe(s) ? e.apply(void 0, s) : e(s);
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
    return new V(function (o) {
      var a = s.context,
        c = s.subject;
      if (r) return r.schedule(i1, 0, { params: s, subscriber: o, context: a });
      if (!c) {
        c = s.subject = new Dr();
        var u = function () {
          for (var l = [], h = 0; h < arguments.length; h++)
            l[h] = arguments[h];
          var p = l.shift();
          if (p) {
            c.error(p);
            return;
          }
          c.next(l.length <= 1 ? l[0] : l), c.complete();
        };
        try {
          t.apply(a, n.concat([u]));
        } catch (l) {
          Zo(c) ? c.error(l) : console.warn(l);
        }
      }
      return c.subscribe(o);
    });
  };
}
function i1(t) {
  var e = this,
    r = t.params,
    n = t.subscriber,
    i = t.context,
    s = r.callbackFunc,
    o = r.args,
    a = r.scheduler,
    c = r.subject;
  if (!c) {
    c = r.subject = new Dr();
    var u = function () {
      for (var l = [], h = 0; h < arguments.length; h++) l[h] = arguments[h];
      var p = l.shift();
      if (p) e.add(a.schedule(Ec, 0, { err: p, subject: c }));
      else {
        var m = l.length <= 1 ? l[0] : l;
        e.add(a.schedule(s1, 0, { value: m, subject: c }));
      }
    };
    try {
      s.apply(i, o.concat([u]));
    } catch (l) {
      this.add(a.schedule(Ec, 0, { err: l, subject: c }));
    }
  }
  this.add(c.subscribe(n));
}
function s1(t) {
  var e = t.value,
    r = t.subject;
  r.next(e), r.complete();
}
function Ec(t) {
  var e = t.err,
    r = t.subject;
  r.error(e);
}
var tr = (function (t) {
    k(e, t);
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
  })(L),
  o1 = (function (t) {
    k(e, t);
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
  })(L),
  a1 = function (t) {
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
          .then(null, ur),
        e
      );
    };
  };
function c1() {
  return typeof Symbol != 'function' || !Symbol.iterator
    ? '@@iterator'
    : Symbol.iterator;
}
var Ot = c1(),
  u1 = function (t) {
    return function (e) {
      var r = t[Ot]();
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
  l1 = function (t) {
    return function (e) {
      var r = t[Or]();
      if (typeof r.subscribe != 'function')
        throw new TypeError(
          'Provided object does not correctly implement Symbol.observable'
        );
      return r.subscribe(e);
    };
  },
  xl = function (t) {
    return t && typeof t.length == 'number' && typeof t != 'function';
  };
function kl(t) {
  return !!t && typeof t.subscribe != 'function' && typeof t.then == 'function';
}
var Zr = function (t) {
  if (t && typeof t[Or] == 'function') return l1(t);
  if (xl(t)) return gl(t);
  if (kl(t)) return a1(t);
  if (t && typeof t[Ot] == 'function') return u1(t);
  var e = Go(t) ? 'an invalid object' : "'" + t + "'",
    r =
      'You provided ' +
      e +
      ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.';
  throw new TypeError(r);
};
function mt(t, e, r, n, i) {
  if ((i === void 0 && (i = new o1(t, r, n)), !i.closed))
    return e instanceof V ? e.subscribe(i) : Zr(e)(i);
}
var Cc = {};
function h1() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = void 0,
    n = void 0;
  return (
    Le(t[t.length - 1]) && (n = t.pop()),
    typeof t[t.length - 1] == 'function' && (r = t.pop()),
    t.length === 1 && xe(t[0]) && (t = t[0]),
    vn(t, n).lift(new ea(r))
  );
}
var ea = (function () {
    function t(e) {
      this.resultSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new f1(e, this.resultSelector));
      }),
      t
    );
  })(),
  f1 = (function (t) {
    k(e, t);
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
        this.values.push(Cc), this.observables.push(r);
      }),
      (e.prototype._complete = function () {
        var r = this.observables,
          n = r.length;
        if (n === 0) this.destination.complete();
        else {
          (this.active = n), (this.toRespond = n);
          for (var i = 0; i < n; i++) {
            var s = r[i];
            this.add(mt(this, s, void 0, i));
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
            ? o === Cc
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
  })(tr);
function d1(t, e) {
  return new V(function (r) {
    var n = new se();
    return (
      n.add(
        e.schedule(function () {
          var i = t[Or]();
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
function p1(t, e) {
  return new V(function (r) {
    var n = new se();
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
function b1(t, e) {
  if (!t) throw new Error('Iterable cannot be null');
  return new V(function (r) {
    var n = new se(),
      i;
    return (
      n.add(function () {
        i && typeof i.return == 'function' && i.return();
      }),
      n.add(
        e.schedule(function () {
          (i = t[Ot]()),
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
function g1(t) {
  return t && typeof t[Or] == 'function';
}
function v1(t) {
  return t && typeof t[Ot] == 'function';
}
function Il(t, e) {
  if (t != null) {
    if (g1(t)) return d1(t, e);
    if (kl(t)) return p1(t, e);
    if (xl(t)) return Yo(t, e);
    if (v1(t) || typeof t == 'string') return b1(t, e);
  }
  throw new TypeError(((t !== null && typeof t) || t) + ' is not observable');
}
function wt(t, e) {
  return e ? Il(t, e) : t instanceof V ? t : new V(Zr(t));
}
var oe = (function (t) {
    k(e, t);
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
  })(L),
  ae = (function (t) {
    k(e, t);
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
  })(L);
function ce(t, e) {
  if (!e.closed) {
    if (t instanceof V) return t.subscribe(e);
    var r;
    try {
      r = Zr(t)(e);
    } catch (n) {
      e.error(n);
    }
    return r;
  }
}
function qt(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    typeof e == 'function'
      ? function (n) {
          return n.pipe(
            qt(function (i, s) {
              return wt(t(i, s)).pipe(
                qe(function (o, a) {
                  return e(i, o, s, a);
                })
              );
            }, r)
          );
        }
      : (typeof e == 'number' && (r = e),
        function (n) {
          return n.lift(new y1(t, r));
        })
  );
}
var y1 = (function () {
    function t(e, r) {
      r === void 0 && (r = Number.POSITIVE_INFINITY),
        (this.project = e),
        (this.concurrent = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new m1(e, this.project, this.concurrent));
      }),
      t
    );
  })(),
  m1 = (function (t) {
    k(e, t);
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
        var n = new oe(this),
          i = this.destination;
        i.add(n);
        var s = ce(r, n);
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
  })(ae),
  w1 = qt;
function ta(t) {
  return t === void 0 && (t = Number.POSITIVE_INFINITY), qt(Nt, t);
}
function Ml() {
  return ta(1);
}
function Qr() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return Ml()(bi.apply(void 0, t));
}
function ra(t) {
  return new V(function (e) {
    var r;
    try {
      r = t();
    } catch (i) {
      e.error(i);
      return;
    }
    var n = r ? wt(r) : Lr();
    return n.subscribe(e);
  });
}
function _1() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 1) {
    var r = t[0];
    if (xe(r)) return kn(r, null);
    if (Go(r) && Object.getPrototypeOf(r) === Object.prototype) {
      var n = Object.keys(r);
      return kn(
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
      (t = t.length === 1 && xe(t[0]) ? t[0] : t),
      kn(t, null).pipe(
        qe(function (s) {
          return i.apply(void 0, s);
        })
      )
    );
  }
  return kn(t, null);
}
function kn(t, e) {
  return new V(function (r) {
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
          var l = wt(t[u]),
            h = !1;
          r.add(
            l.subscribe({
              next: function (p) {
                h || ((h = !0), o++), (i[u] = p);
              },
              error: function (p) {
                return r.error(p);
              },
              complete: function () {
                s++,
                  (s === n || !h) &&
                    (o === n &&
                      r.next(
                        e
                          ? e.reduce(function (p, m, C) {
                              return (p[m] = i[C]), p;
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
function Rl(t, e, r, n) {
  return (
    wr(r) && ((n = r), (r = void 0)),
    n
      ? Rl(t, e, r).pipe(
          qe(function (i) {
            return xe(i) ? n.apply(void 0, i) : n(i);
          })
        )
      : new V(function (i) {
          function s(o) {
            arguments.length > 1
              ? i.next(Array.prototype.slice.call(arguments))
              : i.next(o);
          }
          Al(t, e, s, i, r);
        })
  );
}
function Al(t, e, r, n, i) {
  var s;
  if (C1(t)) {
    var o = t;
    t.addEventListener(e, r, i),
      (s = function () {
        return o.removeEventListener(e, r, i);
      });
  } else if (E1(t)) {
    var a = t;
    t.on(e, r),
      (s = function () {
        return a.off(e, r);
      });
  } else if (S1(t)) {
    var c = t;
    t.addListener(e, r),
      (s = function () {
        return c.removeListener(e, r);
      });
  } else if (t && t.length)
    for (var u = 0, l = t.length; u < l; u++) Al(t[u], e, r, n, i);
  else throw new TypeError('Invalid event target');
  n.add(s);
}
function S1(t) {
  return (
    t &&
    typeof t.addListener == 'function' &&
    typeof t.removeListener == 'function'
  );
}
function E1(t) {
  return t && typeof t.on == 'function' && typeof t.off == 'function';
}
function C1(t) {
  return (
    t &&
    typeof t.addEventListener == 'function' &&
    typeof t.removeEventListener == 'function'
  );
}
function Tl(t, e, r) {
  return r
    ? Tl(t, e).pipe(
        qe(function (n) {
          return xe(n) ? r.apply(void 0, n) : r(n);
        })
      )
    : new V(function (n) {
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
        if (wr(e))
          return function () {
            return e(i, s);
          };
      });
}
function x1(t, e, r, n, i) {
  var s, o;
  if (arguments.length == 1) {
    var a = t;
    (o = a.initialState),
      (e = a.condition),
      (r = a.iterate),
      (s = a.resultSelector || Nt),
      (i = a.scheduler);
  } else
    n === void 0 || Le(n) ? ((o = t), (s = Nt), (i = n)) : ((o = t), (s = n));
  return new V(function (c) {
    var u = o;
    if (i)
      return i.schedule(k1, 0, {
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
        } catch (p) {
          c.error(p);
          return;
        }
        if (!l) {
          c.complete();
          break;
        }
      }
      var h = void 0;
      try {
        h = s(u);
      } catch (p) {
        c.error(p);
        return;
      }
      if ((c.next(h), c.closed)) break;
      try {
        u = r(u);
      } catch (p) {
        c.error(p);
        return;
      }
    } while (!0);
  });
}
function k1(t) {
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
function I1(t, e, r) {
  return (
    e === void 0 && (e = _r),
    r === void 0 && (r = _r),
    ra(function () {
      return t() ? e : r;
    })
  );
}
function Er(t) {
  return !xe(t) && t - parseFloat(t) + 1 >= 0;
}
function M1(t, e) {
  return (
    t === void 0 && (t = 0),
    e === void 0 && (e = ke),
    (!Er(t) || t < 0) && (t = 0),
    (!e || typeof e.schedule != 'function') && (e = ke),
    new V(function (r) {
      return (
        r.add(e.schedule(R1, t, { subscriber: r, counter: 0, period: t })), r
      );
    })
  );
}
function R1(t) {
  var e = t.subscriber,
    r = t.counter,
    n = t.period;
  e.next(r), this.schedule({ subscriber: e, counter: r + 1, period: n }, n);
}
function Nl() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = Number.POSITIVE_INFINITY,
    n = null,
    i = t[t.length - 1];
  return (
    Le(i)
      ? ((n = t.pop()),
        t.length > 1 && typeof t[t.length - 1] == 'number' && (r = t.pop()))
      : typeof i == 'number' && (r = t.pop()),
    n === null && t.length === 1 && t[0] instanceof V ? t[0] : ta(r)(vn(t, n))
  );
}
var Ol = new V(st);
function A1() {
  return Ol;
}
function wo() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 0) return _r;
  var r = t[0],
    n = t.slice(1);
  return t.length === 1 && xe(r)
    ? wo.apply(void 0, r)
    : new V(function (i) {
        var s = function () {
          return i.add(wo.apply(void 0, n).subscribe(i));
        };
        return wt(r).subscribe({
          next: function (o) {
            i.next(o);
          },
          error: s,
          complete: s,
        });
      });
}
function T1(t, e) {
  return e
    ? new V(function (r) {
        var n = Object.keys(t),
          i = new se();
        return (
          i.add(
            e.schedule(N1, 0, {
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
    : new V(function (r) {
        for (var n = Object.keys(t), i = 0; i < n.length && !r.closed; i++) {
          var s = n[i];
          t.hasOwnProperty(s) && r.next([s, t[s]]);
        }
        r.complete();
      });
}
function N1(t) {
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
function Ll(t, e) {
  function r() {
    return !r.pred.apply(r.thisArg, arguments);
  }
  return (r.pred = t), (r.thisArg = e), r;
}
function Lt(t, e) {
  return function (n) {
    return n.lift(new O1(t, e));
  };
}
var O1 = (function () {
    function t(e, r) {
      (this.predicate = e), (this.thisArg = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new L1(e, this.predicate, this.thisArg));
      }),
      t
    );
  })(),
  L1 = (function (t) {
    k(e, t);
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
  })(L);
function D1(t, e, r) {
  return [Lt(e, r)(new V(Zr(t))), Lt(Ll(e, r))(new V(Zr(t)))];
}
function Dl() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  if (t.length === 1)
    if (xe(t[0])) t = t[0];
    else return t[0];
  return vn(t, void 0).lift(new j1());
}
var j1 = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new B1(e));
      }),
      t
    );
  })(),
  B1 = (function (t) {
    k(e, t);
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
              o = mt(this, s, void 0, i);
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
  })(tr);
function P1(t, e, r) {
  return (
    t === void 0 && (t = 0),
    new V(function (n) {
      e === void 0 && ((e = t), (t = 0));
      var i = 0,
        s = t;
      if (r)
        return r.schedule(F1, 0, {
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
function F1(t) {
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
function jl(t, e, r) {
  t === void 0 && (t = 0);
  var n = -1;
  return (
    Er(e) ? (n = (Number(e) < 1 && 1) || Number(e)) : Le(e) && (r = e),
    Le(r) || (r = ke),
    new V(function (i) {
      var s = Er(t) ? t : +t - r.now();
      return r.schedule($1, s, { index: 0, period: n, subscriber: i });
    })
  );
}
function $1(t) {
  var e = t.index,
    r = t.period,
    n = t.subscriber;
  if ((n.next(e), !n.closed)) {
    if (r === -1) return n.complete();
    (t.index = e + 1), this.schedule(t, r);
  }
}
function W1(t, e) {
  return new V(function (r) {
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
    var s = i ? wt(i) : _r,
      o = s.subscribe(r);
    return function () {
      o.unsubscribe(), n && n.unsubscribe();
    };
  });
}
function Bl() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return typeof r == 'function' && t.pop(), vn(t, void 0).lift(new Pl(r));
}
var Pl = (function () {
    function t(e) {
      this.resultSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new H1(e, this.resultSelector));
      }),
      t
    );
  })(),
  H1 = (function (t) {
    k(e, t);
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
        xe(r)
          ? n.push(new z1(r))
          : typeof r[Ot] == 'function'
            ? n.push(new V1(r[Ot]()))
            : n.push(new U1(this.destination, this, r));
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
  })(L),
  V1 = (function () {
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
  z1 = (function () {
    function t(e) {
      (this.array = e),
        (this.index = 0),
        (this.length = 0),
        (this.length = e.length);
    }
    return (
      (t.prototype[Ot] = function () {
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
  U1 = (function (t) {
    k(e, t);
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
      (e.prototype[Ot] = function () {
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
        return ce(this.observable, new oe(this));
      }),
      e
    );
  })(ae);
const q1 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        ArgumentOutOfRangeError: Sr,
        AsyncSubject: Dr,
        BehaviorSubject: dl,
        ConnectableObservable: fl,
        EMPTY: _r,
        EmptyError: yn,
        GroupedObservable: go,
        NEVER: Ol,
        Notification: vt,
        get NotificationKind() {
          return yo;
        },
        ObjectUnsubscribedError: Mt,
        Observable: V,
        ReplaySubject: Xo,
        Scheduler: vo,
        Subject: ve,
        Subscriber: L,
        Subscription: se,
        TimeoutError: Sl,
        UnsubscriptionError: zr,
        VirtualAction: _l,
        VirtualTimeScheduler: Zg,
        animationFrame: Gg,
        animationFrameScheduler: wl,
        asap: Nn,
        asapScheduler: yl,
        async: ke,
        asyncScheduler: ml,
        bindCallback: El,
        bindNodeCallback: Cl,
        combineLatest: h1,
        concat: Qr,
        config: $e,
        defer: ra,
        empty: Lr,
        forkJoin: _1,
        from: wt,
        fromEvent: Rl,
        fromEventPattern: Tl,
        generate: x1,
        identity: Nt,
        iif: I1,
        interval: M1,
        isObservable: Qg,
        merge: Nl,
        never: A1,
        noop: st,
        observable: Or,
        of: bi,
        onErrorResumeNext: wo,
        pairs: T1,
        partition: D1,
        pipe: bo,
        queue: bl,
        queueScheduler: pl,
        race: Dl,
        range: P1,
        scheduled: Il,
        throwError: Ko,
        timer: jl,
        using: W1,
        zip: Bl,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  gi = Gt(q1);
var vi = {};
function Fl(t) {
  var e,
    r,
    n = '';
  if (typeof t == 'string' || typeof t == 'number') n += t;
  else if (typeof t == 'object')
    if (Array.isArray(t))
      for (e = 0; e < t.length; e++)
        t[e] && (r = Fl(t[e])) && (n && (n += ' '), (n += r));
    else for (e in t) t[e] && (n && (n += ' '), (n += e));
  return n;
}
function xc() {
  for (var t, e, r = 0, n = ''; r < arguments.length; )
    (t = arguments[r++]) && (e = Fl(t)) && (n && (n += ' '), (n += e));
  return n;
}
const J1 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, clsx: xc, default: xc },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  yi = Gt(J1),
  mn = Gt(vh);
var ut = {},
  mi = {};
Object.defineProperty(mi, '__esModule', { value: !0 });
mi.CloseIcon = void 0;
const kc = De;
function G1(t) {
  return (0, kc.h)(
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
    (0, kc.h)('path', {
      d: 'M13.7677 13L12.3535 14.4142L18.3535 20.4142L12.3535 26.4142L13.7677 27.8284L19.7677 21.8284L25.7677 27.8284L27.1819 26.4142L21.1819 20.4142L27.1819 14.4142L25.7677 13L19.7677 19L13.7677 13Z',
    })
  );
}
mi.CloseIcon = G1;
var na = {};
Object.defineProperty(na, '__esModule', { value: !0 });
na.default =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiMwMDUyRkYiLz48cGF0aCBkPSJNMTQuMDM3IDE4LjkyNmMtMi43NSAwLTQuOTA3LTIuMjA1LTQuOTA3LTQuOTI2IDAtMi43MiAyLjIzLTQuOTI2IDQuOTA3LTQuOTI2YTQuODY2IDQuODY2IDAgMCAxIDQuODMzIDQuMTE4aDQuOTgyYy0uNDQ2LTUuMDczLTQuNjg0LTkuMDQ0LTkuODE1LTkuMDQ0QzguNjEgNC4xNDggNC4xNDkgOC41NiA0LjE0OSAxNHM0LjM4NyA5Ljg1MiA5Ljg5IDkuODUyYzUuMjA0IDAgOS4zNjgtMy45NyA5LjgxNC05LjA0M0gxOC44N2E0Ljg2NiA0Ljg2NiAwIDAgMS00LjgzMyA0LjExN1oiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';
var ia = {};
Object.defineProperty(ia, '__esModule', { value: !0 });
ia.default =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMTQiIGZpbGw9IiMwMDUyRkYiLz48cGF0aCBkPSJNMjMuODUyIDE0QTkuODM0IDkuODM0IDAgMCAxIDE0IDIzLjg1MiA5LjgzNCA5LjgzNCAwIDAgMSA0LjE0OCAxNCA5LjgzNCA5LjgzNCAwIDAgMSAxNCA0LjE0OCA5LjgzNCA5LjgzNCAwIDAgMSAyMy44NTIgMTRaIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExLjE4NSAxMi41MDRjMC0uNDU2IDAtLjcxLjA5OC0uODYyLjA5OC0uMTUyLjE5Ni0uMzA0LjM0My0uMzU1LjE5Ni0uMTAyLjM5Mi0uMTAyLjg4MS0uMTAyaDIuOTg2Yy40OSAwIC42ODYgMCAuODgyLjEwMi4xNDYuMTAxLjI5My4yMDMuMzQyLjM1NS4wOTguMjAzLjA5OC40MDYuMDk4Ljg2MnYyLjk5MmMwIC40NTcgMCAuNzEtLjA5OC44NjMtLjA5OC4xNTItLjE5NS4zMDQtLjM0Mi4zNTUtLjE5Ni4xMDEtLjM5Mi4xMDEtLjg4Mi4xMDFoLTIuOTg2Yy0uNDkgMC0uNjg1IDAtLjg4LS4xMDEtLjE0OC0uMTAyLS4yOTUtLjIwMy0uMzQ0LS4zNTUtLjA5OC0uMjAzLS4wOTgtLjQwNi0uMDk4LS44NjN2LTIuOTkyWiIgZmlsbD0iIzAwNTJGRiIvPjwvc3ZnPg==';
var wi = {};
Object.defineProperty(wi, '__esModule', { value: !0 });
wi.QRCodeIcon = void 0;
const nt = De;
function Z1(t) {
  return (0, nt.h)(
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
    (0, nt.h)('path', {
      d: 'M8.2271 1.77124L7.0271 1.77124V2.97124H8.2271V1.77124Z',
    }),
    (0, nt.h)('path', {
      d: 'M5.44922 0.199219L5.44922 4.54922L9.79922 4.54922V0.199219L5.44922 0.199219ZM8.89922 3.64922L6.34922 3.64922L6.34922 1.09922L8.89922 1.09922V3.64922Z',
    }),
    (0, nt.h)('path', {
      d: 'M2.97124 1.77124L1.77124 1.77124L1.77124 2.97124H2.97124V1.77124Z',
    }),
    (0, nt.h)('path', {
      d: 'M0.199219 4.54922L4.54922 4.54922L4.54922 0.199219L0.199219 0.199219L0.199219 4.54922ZM1.09922 1.09922L3.64922 1.09922L3.64922 3.64922L1.09922 3.64922L1.09922 1.09922Z',
    }),
    (0, nt.h)('path', {
      d: 'M2.97124 7.0271H1.77124L1.77124 8.2271H2.97124V7.0271Z',
    }),
    (0, nt.h)('path', {
      d: 'M0.199219 9.79922H4.54922L4.54922 5.44922L0.199219 5.44922L0.199219 9.79922ZM1.09922 6.34922L3.64922 6.34922L3.64922 8.89922H1.09922L1.09922 6.34922Z',
    }),
    (0, nt.h)('path', {
      d: 'M8.89922 7.39912H7.99922V5.40112H5.44922L5.44922 9.79912H6.34922L6.34922 6.30112H7.09922V8.29912H9.79922V5.40112H8.89922V7.39912Z',
    }),
    (0, nt.h)('path', {
      d: 'M7.99912 8.89917H7.09912V9.79917H7.99912V8.89917Z',
    }),
    (0, nt.h)('path', {
      d: 'M9.79917 8.89917H8.89917V9.79917H9.79917V8.89917Z',
    })
  );
}
wi.QRCodeIcon = Z1;
var sa = {};
Object.defineProperty(sa, '__esModule', { value: !0 });
const Q1 = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill="white"/>
        <path d="M50.512 94C74.2907 94 93.5673 74.5244 93.5673 50.5C93.5673 26.4756 74.2907 7 50.512 7C26.7332 7 7.45667 26.4756 7.45667 50.5C7.45667 74.5244 26.7332 94 50.512 94Z" fill="#0052FF"/>
        <path d="M50.6248 65.4335C42.3697 65.4335 35.8996 58.7469 35.8996 50.5C35.8996 42.2531 42.5928 35.5664 50.6248 35.5664C57.9873 35.5664 64.0111 40.9157 65.1267 48.0481H80.0749C78.7363 32.6688 66.0191 20.6328 50.6248 20.6328C34.3379 20.6328 20.9514 34.0062 20.9514 50.5C20.9514 66.9936 34.1148 80.3671 50.6248 80.3671C66.2422 80.3671 78.7363 68.331 80.0749 52.9516H65.1267C64.0111 60.0841 57.9873 65.4335 50.6248 65.4335Z" fill="white"/>
    </svg>
`;
sa.default = Q1;
var oa = {};
Object.defineProperty(oa, '__esModule', { value: !0 });
oa.default = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="white"/>
        <circle cx="49.9996" cy="49.9996" r="43.6363" fill="#1B53E4"/>
        <circle cx="49.9996" cy="49.9996" r="43.6363" stroke="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3379 49.9484C19.3379 66.8508 33.04 80.553 49.9425 80.553C66.8449 80.553 80.5471 66.8508 80.5471 49.9484C80.5471 33.0459 66.8449 19.3438 49.9425 19.3438C33.04 19.3438 19.3379 33.0459 19.3379 49.9484ZM44.0817 40.0799C41.8725 40.0799 40.0817 41.8708 40.0817 44.0799V55.8029C40.0817 58.012 41.8725 59.8029 44.0817 59.8029H55.8046C58.0138 59.8029 59.8046 58.012 59.8046 55.8029V44.0799C59.8046 41.8708 58.0138 40.0799 55.8046 40.0799H44.0817Z" fill="white"/>
    </svg>
`;
var _i = {};
Object.defineProperty(_i, '__esModule', { value: !0 });
_i.StatusDotIcon = void 0;
const Ic = De;
function Y1(t) {
  return (0, Ic.h)(
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
    (0, Ic.h)('path', {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: 'M2.29995 4.99995C2.29995 5.57985 1.82985 6.04995 1.24995 6.04995C0.670052 6.04995 0.199951 5.57985 0.199951 4.99995C0.199951 4.42005 0.670052 3.94995 1.24995 3.94995C1.82985 3.94995 2.29995 4.42005 2.29995 4.99995ZM4.99995 6.04995C5.57985 6.04995 6.04995 5.57985 6.04995 4.99995C6.04995 4.42005 5.57985 3.94995 4.99995 3.94995C4.42005 3.94995 3.94995 4.42005 3.94995 4.99995C3.94995 5.57985 4.42005 6.04995 4.99995 6.04995ZM8.74995 6.04995C9.32985 6.04995 9.79995 5.57985 9.79995 4.99995C9.79995 4.42005 9.32985 3.94995 8.74995 3.94995C8.17005 3.94995 7.69995 4.42005 7.69995 4.99995C7.69995 5.57985 8.17005 6.04995 8.74995 6.04995Z',
    })
  );
}
_i.StatusDotIcon = Y1;
var Si = {};
function $l(t) {
  (this.mode = Ne.MODE_8BIT_BYTE), (this.data = t), (this.parsedData = []);
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
$l.prototype = {
  getLength: function (t) {
    return this.parsedData.length;
  },
  write: function (t) {
    for (var e = 0, r = this.parsedData.length; e < r; e++)
      t.put(this.parsedData[e], 8);
  },
};
function lt(t, e) {
  (this.typeNumber = t),
    (this.errorCorrectLevel = e),
    (this.modules = null),
    (this.moduleCount = 0),
    (this.dataCache = null),
    (this.dataList = []);
}
lt.prototype = {
  addData: function (t) {
    var e = new $l(t);
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
        (this.dataCache = lt.createData(
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
      var n = ne.getLostPoint(this);
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
      var t = ne.getPatternPosition(this.typeNumber), e = 0;
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
    for (var e = ne.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
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
        n = ne.getBCHTypeInfo(r),
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
            var u = ne.getMask(e, n, o - a);
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
lt.PAD0 = 236;
lt.PAD1 = 17;
lt.createData = function (t, e, r) {
  for (var n = ot.getRSBlocks(t, e), i = new Wl(), s = 0; s < r.length; s++) {
    var o = r[s];
    i.put(o.mode, 4),
      i.put(o.getLength(), ne.getLengthInBits(o.mode, t)),
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
      (i.put(lt.PAD0, 8), i.getLengthInBits() >= a * 8)
    );

  )
    i.put(lt.PAD1, 8);
  return lt.createBytes(i, n);
};
lt.createBytes = function (t, e) {
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
    var h = ne.getErrorCorrectPolynomial(u),
      p = new pr(s[a], h.getLength() - 1),
      m = p.mod(h);
    o[a] = new Array(h.getLength() - 1);
    for (var l = 0; l < o[a].length; l++) {
      var C = l + m.getLength() - o[a].length;
      o[a][l] = C >= 0 ? m.get(C) : 0;
    }
  }
  for (var x = 0, l = 0; l < e.length; l++) x += e[l].totalCount;
  for (var S = new Array(x), b = 0, l = 0; l < n; l++)
    for (var a = 0; a < e.length; a++) l < s[a].length && (S[b++] = s[a][l]);
  for (var l = 0; l < i; l++)
    for (var a = 0; a < e.length; a++) l < o[a].length && (S[b++] = o[a][l]);
  return S;
};
var Ne = {
    MODE_NUMBER: 1,
    MODE_ALPHA_NUM: 2,
    MODE_8BIT_BYTE: 4,
    MODE_KANJI: 8,
  },
  Rt = { L: 1, M: 0, Q: 3, H: 2 },
  Ct = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  },
  ne = {
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
      for (var e = t << 10; ne.getBCHDigit(e) - ne.getBCHDigit(ne.G15) >= 0; )
        e ^= ne.G15 << (ne.getBCHDigit(e) - ne.getBCHDigit(ne.G15));
      return ((t << 10) | e) ^ ne.G15_MASK;
    },
    getBCHTypeNumber: function (t) {
      for (var e = t << 12; ne.getBCHDigit(e) - ne.getBCHDigit(ne.G18) >= 0; )
        e ^= ne.G18 << (ne.getBCHDigit(e) - ne.getBCHDigit(ne.G18));
      return (t << 12) | e;
    },
    getBCHDigit: function (t) {
      for (var e = 0; t != 0; ) e++, (t >>>= 1);
      return e;
    },
    getPatternPosition: function (t) {
      return ne.PATTERN_POSITION_TABLE[t - 1];
    },
    getMask: function (t, e, r) {
      switch (t) {
        case Ct.PATTERN000:
          return (e + r) % 2 == 0;
        case Ct.PATTERN001:
          return e % 2 == 0;
        case Ct.PATTERN010:
          return r % 3 == 0;
        case Ct.PATTERN011:
          return (e + r) % 3 == 0;
        case Ct.PATTERN100:
          return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
        case Ct.PATTERN101:
          return ((e * r) % 2) + ((e * r) % 3) == 0;
        case Ct.PATTERN110:
          return (((e * r) % 2) + ((e * r) % 3)) % 2 == 0;
        case Ct.PATTERN111:
          return (((e * r) % 3) + ((e + r) % 2)) % 2 == 0;
        default:
          throw new Error('bad maskPattern:' + t);
      }
    },
    getErrorCorrectPolynomial: function (t) {
      for (var e = new pr([1], 0), r = 0; r < t; r++)
        e = e.multiply(new pr([1, ge.gexp(r)], 0));
      return e;
    },
    getLengthInBits: function (t, e) {
      if (1 <= e && e < 10)
        switch (t) {
          case Ne.MODE_NUMBER:
            return 10;
          case Ne.MODE_ALPHA_NUM:
            return 9;
          case Ne.MODE_8BIT_BYTE:
            return 8;
          case Ne.MODE_KANJI:
            return 8;
          default:
            throw new Error('mode:' + t);
        }
      else if (e < 27)
        switch (t) {
          case Ne.MODE_NUMBER:
            return 12;
          case Ne.MODE_ALPHA_NUM:
            return 11;
          case Ne.MODE_8BIT_BYTE:
            return 16;
          case Ne.MODE_KANJI:
            return 10;
          default:
            throw new Error('mode:' + t);
        }
      else if (e < 41)
        switch (t) {
          case Ne.MODE_NUMBER:
            return 14;
          case Ne.MODE_ALPHA_NUM:
            return 13;
          case Ne.MODE_8BIT_BYTE:
            return 16;
          case Ne.MODE_KANJI:
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
      var h = Math.abs((100 * l) / e / e - 50) / 5;
      return (r += h * 10), r;
    },
  },
  ge = {
    glog: function (t) {
      if (t < 1) throw new Error('glog(' + t + ')');
      return ge.LOG_TABLE[t];
    },
    gexp: function (t) {
      for (; t < 0; ) t += 255;
      for (; t >= 256; ) t -= 255;
      return ge.EXP_TABLE[t];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256),
  };
for (var me = 0; me < 8; me++) ge.EXP_TABLE[me] = 1 << me;
for (var me = 8; me < 256; me++)
  ge.EXP_TABLE[me] =
    ge.EXP_TABLE[me - 4] ^
    ge.EXP_TABLE[me - 5] ^
    ge.EXP_TABLE[me - 6] ^
    ge.EXP_TABLE[me - 8];
for (var me = 0; me < 255; me++) ge.LOG_TABLE[ge.EXP_TABLE[me]] = me;
function pr(t, e) {
  if (t.length == null) throw new Error(t.length + '/' + e);
  for (var r = 0; r < t.length && t[r] == 0; ) r++;
  this.num = new Array(t.length - r + e);
  for (var n = 0; n < t.length - r; n++) this.num[n] = t[n + r];
}
pr.prototype = {
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
        e[r + n] ^= ge.gexp(ge.glog(this.get(r)) + ge.glog(t.get(n)));
    return new pr(e, 0);
  },
  mod: function (t) {
    if (this.getLength() - t.getLength() < 0) return this;
    for (
      var e = ge.glog(this.get(0)) - ge.glog(t.get(0)),
        r = new Array(this.getLength()),
        n = 0;
      n < this.getLength();
      n++
    )
      r[n] = this.get(n);
    for (var n = 0; n < t.getLength(); n++)
      r[n] ^= ge.gexp(ge.glog(t.get(n)) + e);
    return new pr(r, 0).mod(t);
  },
};
function ot(t, e) {
  (this.totalCount = t), (this.dataCount = e);
}
ot.RS_BLOCK_TABLE = [
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
ot.getRSBlocks = function (t, e) {
  var r = ot.getRsBlockTable(t, e);
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
      i.push(new ot(a, c));
  return i;
};
ot.getRsBlockTable = function (t, e) {
  switch (e) {
    case Rt.L:
      return ot.RS_BLOCK_TABLE[(t - 1) * 4 + 0];
    case Rt.M:
      return ot.RS_BLOCK_TABLE[(t - 1) * 4 + 1];
    case Rt.Q:
      return ot.RS_BLOCK_TABLE[(t - 1) * 4 + 2];
    case Rt.H:
      return ot.RS_BLOCK_TABLE[(t - 1) * 4 + 3];
    default:
      return;
  }
};
function Wl() {
  (this.buffer = []), (this.length = 0);
}
Wl.prototype = {
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
var Xs = [
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
function Hl(t) {
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
        return Rt.L;
      case 'M':
        return Rt.M;
      case 'Q':
        return Rt.Q;
      case 'H':
        return Rt.H;
      default:
        throw new Error('Unknwon error correction level: ' + c);
    }
  }
  function n(c, u) {
    for (var l = i(c), h = 1, p = 0, m = 0, C = Xs.length; m <= C; m++) {
      var x = Xs[m];
      if (!x)
        throw new Error('Content too long: expected ' + p + ' but got ' + l);
      switch (u) {
        case 'L':
          p = x[0];
          break;
        case 'M':
          p = x[1];
          break;
        case 'Q':
          p = x[2];
          break;
        case 'H':
          p = x[3];
          break;
        default:
          throw new Error('Unknwon error correction level: ' + u);
      }
      if (l <= p) break;
      h++;
    }
    if (h > Xs.length) throw new Error('Content too long');
    return h;
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
  (this.qrcode = new lt(o, a)), this.qrcode.addData(s), this.qrcode.make();
}
Hl.prototype.svg = function (t) {
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
      h = typeof e.join < 'u' ? !!e.join : !1,
      p = typeof e.swap < 'u' ? !!e.swap : !1,
      m = typeof e.xmlDeclaration < 'u' ? !!e.xmlDeclaration : !0,
      C = typeof e.predefined < 'u' ? !!e.predefined : !1,
      x = C
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
      S =
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
    for (var E = 0; E < c; E++) {
      var _ = r[E][w];
      if (_) {
        var R = E * u + e.padding * u,
          P = w * l + e.padding * l;
        if (p) {
          var j = R;
          (R = P), (P = j);
        }
        if (h) {
          var A = u + R,
            $ = l + P;
          (R = Number.isInteger(R) ? Number(R) : R.toFixed(2)),
            (P = Number.isInteger(P) ? Number(P) : P.toFixed(2)),
            (A = Number.isInteger(A) ? Number(A) : A.toFixed(2)),
            ($ = Number.isInteger($) ? Number($) : $.toFixed(2)),
            (g +=
              'M' +
              R +
              ',' +
              P +
              ' V' +
              $ +
              ' H' +
              A +
              ' V' +
              P +
              ' H' +
              R +
              ' Z ');
        } else
          C
            ? (b +=
                i +
                '<use x="' +
                R.toString() +
                '" y="' +
                P.toString() +
                '" href="#qrmodule" />' +
                s)
            : (b +=
                i +
                '<rect x="' +
                R.toString() +
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
  h &&
    (b =
      i +
      '<path x="0" y="0" style="fill:' +
      e.color +
      ';shape-rendering:crispEdges;" d="' +
      g +
      '" />');
  let re = '';
  if (this.options.image !== void 0 && this.options.image.svg) {
    const K = (o * this.options.image.width) / 100,
      he = (a * this.options.image.height) / 100,
      pe = o / 2 - K / 2,
      je = a / 2 - he / 2;
    (re += `<svg x="${pe}" y="${je}" width="${K}" height="${he}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">`),
      (re += this.options.image.svg + s),
      (re += '</svg>');
  }
  var G = '';
  switch (t.container) {
    case 'svg':
      m && (G += '<?xml version="1.0" standalone="yes"?>' + s),
        (G +=
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' +
          o +
          '" height="' +
          a +
          '">' +
          s),
        (G += x + S + b),
        (G += re),
        (G += '</svg>');
      break;
    case 'svg-viewbox':
      m && (G += '<?xml version="1.0" standalone="yes"?>' + s),
        (G +=
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' +
          o +
          ' ' +
          a +
          '">' +
          s),
        (G += x + S + b),
        (G += re),
        (G += '</svg>');
      break;
    case 'g':
      (G += '<g width="' + o + '" height="' + a + '">' + s),
        (G += x + S + b),
        (G += re),
        (G += '</g>');
      break;
    default:
      G += (x + S + b + re).replace(/^\s+/, '');
      break;
  }
  return G;
};
var K1 = Hl,
  X1 =
    (N && N.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(Si, '__esModule', { value: !0 });
Si.QRCode = void 0;
const ev = De,
  Mc = mn,
  tv = X1(K1),
  rv = (t) => {
    const [e, r] = (0, Mc.useState)('');
    return (
      (0, Mc.useEffect)(() => {
        var n, i;
        const s = new tv.default({
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
      e ? (0, ev.h)('img', { src: e, alt: 'QR Code' }) : null
    );
  };
Si.QRCode = rv;
var Ei = {},
  aa = {};
Object.defineProperty(aa, '__esModule', { value: !0 });
aa.default =
  '.-cbwsdk-css-reset .-cbwsdk-spinner{display:inline-block}.-cbwsdk-css-reset .-cbwsdk-spinner svg{display:inline-block;animation:2s linear infinite -cbwsdk-spinner-svg}.-cbwsdk-css-reset .-cbwsdk-spinner svg circle{animation:1.9s ease-in-out infinite both -cbwsdk-spinner-circle;display:block;fill:rgba(0,0,0,0);stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -cbwsdk-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -cbwsdk-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}';
var nv =
  (N && N.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(Ei, '__esModule', { value: !0 });
Ei.Spinner = void 0;
const In = De,
  iv = nv(aa),
  sv = (t) => {
    var e;
    const r = (e = t.size) !== null && e !== void 0 ? e : 64,
      n = t.color || '#000';
    return (0, In.h)(
      'div',
      { class: '-cbwsdk-spinner' },
      (0, In.h)('style', null, iv.default),
      (0, In.h)(
        'svg',
        {
          viewBox: '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg',
          style: { width: r, height: r },
        },
        (0, In.h)('circle', { style: { cx: 50, cy: 50, r: 45, stroke: n } })
      )
    );
  };
Ei.Spinner = sv;
var ca = {};
Object.defineProperty(ca, '__esModule', { value: !0 });
ca.default =
  '.-cbwsdk-css-reset .-cbwsdk-connect-content{height:430px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-connect-content.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-header{display:flex;align-items:center;justify-content:space-between;margin:0 0 30px}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading{font-style:normal;font-weight:500;font-size:28px;line-height:36px;margin:0}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-layout{display:flex;flex-direction:row}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-left{margin-right:30px;display:flex;flex-direction:column;justify-content:space-between}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-right{flex:25%;margin-right:34px}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-wrapper{width:220px;height:220px;border-radius:12px;display:flex;justify-content:center;align-items:center;background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light{background-color:rgba(255,255,255,.95)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light>p{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark{background-color:rgba(10,11,13,.9)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark>p{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting>p{font-size:12px;font-weight:bold;margin-top:16px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app{border-radius:8px;font-size:14px;line-height:20px;padding:12px;width:339px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.light{background:#eef0f3;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.dark{background:#1e2025;color:#8a919e}.-cbwsdk-css-reset .-cbwsdk-cancel-button{-webkit-appearance:none;border:none;background:none;cursor:pointer;padding:0;margin:0}.-cbwsdk-css-reset .-cbwsdk-cancel-button-x{position:relative;display:block;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-wallet-steps{padding:0 0 0 16px;margin:0;width:100%;list-style:decimal}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item{list-style-type:decimal;display:list-item;font-style:normal;font-weight:400;font-size:16px;line-height:24px;margin-top:20px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item-wrapper{display:flex;align-items:center}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-pad-left{margin-left:6px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon{display:flex;border-radius:50%;height:24px;width:24px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.light{background:#0052ff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.dark{background:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item{align-items:center;display:flex;flex-direction:row;padding:16px 24px;gap:12px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-connect-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-item.light.selected{background:#f5f8ff;color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark.selected{background:#001033;color:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item.selected{border-radius:100px;font-weight:600}.-cbwsdk-css-reset .-cbwsdk-connect-item-copy-wrapper{margin:0 4px 0 8px}.-cbwsdk-css-reset .-cbwsdk-connect-item-title{margin:0 0 0;font-size:16px;line-height:24px;font-weight:500}.-cbwsdk-css-reset .-cbwsdk-connect-item-description{font-weight:400;font-size:14px;line-height:20px;margin:0}';
var jr =
  (N && N.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(ut, '__esModule', { value: !0 });
ut.CoinbaseAppSteps =
  ut.CoinbaseWalletSteps =
  ut.ConnectItem =
  ut.ConnectContent =
    void 0;
const He = jr(yi),
  B = De,
  Rc = mn,
  ov = O,
  av = Ir,
  cv = mi,
  uv = jr(na),
  lv = jr(ia),
  Vl = wi,
  hv = jr(sa),
  fv = jr(oa),
  dv = _i,
  pv = Si,
  bv = Ei,
  gv = jr(ca),
  Ac = {
    'coinbase-wallet-app': {
      title: 'Coinbase Wallet app',
      description: 'Connect with your self-custody wallet',
      icon: lv.default,
      steps: Ul,
    },
    'coinbase-app': {
      title: 'Coinbase app',
      description: 'Connect with your Coinbase account',
      icon: uv.default,
      steps: ql,
    },
  },
  vv = (t) => {
    switch (t) {
      case 'coinbase-app':
        return hv.default;
      case 'coinbase-wallet-app':
      default:
        return fv.default;
    }
  },
  _o = (t) => (t === 'light' ? '#FFFFFF' : '#0A0B0D');
function yv(t) {
  const { theme: e } = t,
    [r, n] = (0, Rc.useState)('coinbase-wallet-app'),
    i = (0, Rc.useCallback)((u) => {
      n(u);
    }, []),
    s = (0, ov.createQrUrl)(
      t.sessionId,
      t.sessionSecret,
      t.linkAPIUrl,
      t.isParentConnection,
      t.version,
      t.chainId
    ),
    o = Ac[r];
  if (!r) return null;
  const a = o.steps,
    c = r === 'coinbase-app';
  return (0, B.h)(
    'div',
    {
      'data-testid': 'connect-content',
      class: (0, He.default)('-cbwsdk-connect-content', e),
    },
    (0, B.h)('style', null, gv.default),
    (0, B.h)(
      'div',
      { class: '-cbwsdk-connect-content-header' },
      (0, B.h)(
        'h2',
        { class: (0, He.default)('-cbwsdk-connect-content-heading', e) },
        'Scan to connect with one of our mobile apps'
      ),
      t.onCancel &&
        (0, B.h)(
          'button',
          {
            type: 'button',
            class: '-cbwsdk-cancel-button',
            onClick: t.onCancel,
          },
          (0, B.h)(cv.CloseIcon, {
            fill: e === 'light' ? '#0A0B0D' : '#FFFFFF',
          })
        )
    ),
    (0, B.h)(
      'div',
      { class: '-cbwsdk-connect-content-layout' },
      (0, B.h)(
        'div',
        { class: '-cbwsdk-connect-content-column-left' },
        (0, B.h)(
          'div',
          null,
          Object.entries(Ac).map(([u, l]) =>
            (0, B.h)(zl, {
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
          (0, B.h)(
            'div',
            { class: (0, He.default)('-cbwsdk-connect-content-update-app', e) },
            'Don’t see a ',
            (0, B.h)('strong', null, 'Scan'),
            ' option? Update your Coinbase app to the latest version and try again.'
          )
      ),
      (0, B.h)(
        'div',
        { class: '-cbwsdk-connect-content-column-right' },
        (0, B.h)(
          'div',
          { class: '-cbwsdk-connect-content-qr-wrapper' },
          (0, B.h)(pv.QRCode, {
            content: s,
            width: 200,
            height: 200,
            fgColor: '#000',
            bgColor: 'transparent',
            image: { svg: vv(r), width: 25, height: 25 },
          }),
          (0, B.h)('input', {
            type: 'hidden',
            name: 'cbw-cbwsdk-version',
            value: av.LIB_VERSION,
          }),
          (0, B.h)('input', { type: 'hidden', value: s })
        ),
        (0, B.h)(a, { theme: e }),
        !t.isConnected &&
          (0, B.h)(
            'div',
            {
              'data-testid': 'connecting-spinner',
              class: (0, He.default)(
                '-cbwsdk-connect-content-qr-connecting',
                e
              ),
            },
            (0, B.h)(bv.Spinner, {
              size: 36,
              color: e === 'dark' ? '#FFF' : '#000',
            }),
            (0, B.h)('p', null, 'Connecting...')
          )
      )
    )
  );
}
ut.ConnectContent = yv;
function zl({
  title: t,
  description: e,
  icon: r,
  selected: n,
  theme: i,
  onClick: s,
}) {
  return (0, B.h)(
    'div',
    {
      onClick: s,
      class: (0, He.default)('-cbwsdk-connect-item', i, { selected: n }),
    },
    (0, B.h)('div', null, (0, B.h)('img', { src: r, alt: t })),
    (0, B.h)(
      'div',
      { class: '-cbwsdk-connect-item-copy-wrapper' },
      (0, B.h)('h3', { class: '-cbwsdk-connect-item-title' }, t),
      (0, B.h)('p', { class: '-cbwsdk-connect-item-description' }, e)
    )
  );
}
ut.ConnectItem = zl;
function Ul({ theme: t }) {
  return (0, B.h)(
    'ol',
    { class: '-cbwsdk-wallet-steps' },
    (0, B.h)(
      'li',
      { class: (0, He.default)('-cbwsdk-wallet-steps-item', t) },
      (0, B.h)(
        'div',
        { class: '-cbwsdk-wallet-steps-item-wrapper' },
        'Open Coinbase Wallet app'
      )
    ),
    (0, B.h)(
      'li',
      { class: (0, He.default)('-cbwsdk-wallet-steps-item', t) },
      (0, B.h)(
        'div',
        { class: '-cbwsdk-wallet-steps-item-wrapper' },
        (0, B.h)('span', null, 'Tap ', (0, B.h)('strong', null, 'Scan'), ' '),
        (0, B.h)(
          'span',
          {
            class: (0, He.default)(
              '-cbwsdk-wallet-steps-pad-left',
              '-cbwsdk-wallet-steps-icon',
              t
            ),
          },
          (0, B.h)(Vl.QRCodeIcon, { fill: _o(t) })
        )
      )
    )
  );
}
ut.CoinbaseWalletSteps = Ul;
function ql({ theme: t }) {
  return (0, B.h)(
    'ol',
    { class: '-cbwsdk-wallet-steps' },
    (0, B.h)(
      'li',
      { class: (0, He.default)('-cbwsdk-wallet-steps-item', t) },
      (0, B.h)(
        'div',
        { class: '-cbwsdk-wallet-steps-item-wrapper' },
        'Open Coinbase app'
      )
    ),
    (0, B.h)(
      'li',
      { class: (0, He.default)('-cbwsdk-wallet-steps-item', t) },
      (0, B.h)(
        'div',
        { class: '-cbwsdk-wallet-steps-item-wrapper' },
        (0, B.h)('span', null, 'Tap ', (0, B.h)('strong', null, 'More')),
        (0, B.h)(
          'span',
          {
            class: (0, He.default)(
              '-cbwsdk-wallet-steps-pad-left',
              '-cbwsdk-wallet-steps-icon',
              t
            ),
          },
          (0, B.h)(dv.StatusDotIcon, { fill: _o(t) })
        ),
        (0, B.h)(
          'span',
          { class: '-cbwsdk-wallet-steps-pad-left' },
          'then ',
          (0, B.h)('strong', null, 'Scan')
        ),
        (0, B.h)(
          'span',
          {
            class: (0, He.default)(
              '-cbwsdk-wallet-steps-pad-left',
              '-cbwsdk-wallet-steps-icon',
              t
            ),
          },
          (0, B.h)(Vl.QRCodeIcon, { fill: _o(t) })
        )
      )
    )
  );
}
ut.CoinbaseAppSteps = ql;
var Ci = {},
  xi = {};
Object.defineProperty(xi, '__esModule', { value: !0 });
xi.ArrowLeftIcon = void 0;
const Tc = De;
function mv(t) {
  return (0, Tc.h)(
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
    (0, Tc.h)('path', {
      d: 'M8.60675 0.155884L7.37816 1.28209L12.7723 7.16662H0V8.83328H12.6548L6.82149 14.6666L8 15.8451L15.8201 8.02501L8.60675 0.155884Z',
    })
  );
}
xi.ArrowLeftIcon = mv;
var ki = {};
Object.defineProperty(ki, '__esModule', { value: !0 });
ki.LaptopIcon = void 0;
const eo = De;
function wv(t) {
  return (0, eo.h)(
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
    (0, eo.h)('path', {
      d: 'M1.8001 2.2002H12.2001V9.40019H1.8001V2.2002ZM3.4001 3.8002V7.80019H10.6001V3.8002H3.4001Z',
    }),
    (0, eo.h)('path', {
      d: 'M13.4001 10.2002H0.600098C0.600098 11.0838 1.31644 11.8002 2.2001 11.8002H11.8001C12.6838 11.8002 13.4001 11.0838 13.4001 10.2002Z',
    })
  );
}
ki.LaptopIcon = wv;
var Ii = {};
Object.defineProperty(Ii, '__esModule', { value: !0 });
Ii.SafeIcon = void 0;
const Nc = De;
function _v(t) {
  return (0, Nc.h)(
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
    (0, Nc.h)('path', {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: 'M0.600098 0.600098V11.8001H13.4001V0.600098H0.600098ZM7.0001 9.2001C5.3441 9.2001 4.0001 7.8561 4.0001 6.2001C4.0001 4.5441 5.3441 3.2001 7.0001 3.2001C8.6561 3.2001 10.0001 4.5441 10.0001 6.2001C10.0001 7.8561 8.6561 9.2001 7.0001 9.2001ZM0.600098 12.6001H3.8001V13.4001H0.600098V12.6001ZM10.2001 12.6001H13.4001V13.4001H10.2001V12.6001ZM8.8001 6.2001C8.8001 7.19421 7.99421 8.0001 7.0001 8.0001C6.00598 8.0001 5.2001 7.19421 5.2001 6.2001C5.2001 5.20598 6.00598 4.4001 7.0001 4.4001C7.99421 4.4001 8.8001 5.20598 8.8001 6.2001Z',
    })
  );
}
Ii.SafeIcon = _v;
var ua = {};
Object.defineProperty(ua, '__esModule', { value: !0 });
ua.default =
  '.-cbwsdk-css-reset .-cbwsdk-try-extension{display:flex;margin-top:12px;height:202px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-try-extension.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-column-half{flex:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading{font-style:normal;font-weight:500;font-size:25px;line-height:32px;margin:0;max-width:204px}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta{appearance:none;border:none;background:none;color:#0052ff;cursor:pointer;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.light{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.dark{color:#588af5}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-wrapper{display:flex;align-items:center;margin-top:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-icon{display:block;margin-left:4px;height:14px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0;padding:0;list-style:none;height:100%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item{display:flex;align-items:center;flex-flow:nowrap;margin-top:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item:first-of-type{margin-top:0}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon-wrapper{display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon{display:flex;height:32px;width:32px;border-radius:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.light{background:#eef0f3}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.dark{background:#1e2025}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy{display:block;font-weight:400;font-size:14px;line-height:20px;padding-left:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.light{color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.dark{color:#8a919e}';
var Jl =
  (N && N.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(Ci, '__esModule', { value: !0 });
Ci.TryExtensionContent = void 0;
const Bt = Jl(yi),
  le = De,
  to = mn,
  Sv = xi,
  Ev = ki,
  Cv = Ii,
  xv = Jl(ua);
function kv({ theme: t }) {
  const [e, r] = (0, to.useState)(!1),
    n = (0, to.useCallback)(() => {
      window.open(
        'https://api.wallet.coinbase.com/rpc/v2/desktop/chrome',
        '_blank'
      );
    }, []),
    i = (0, to.useCallback)(() => {
      e ? window.location.reload() : (n(), r(!0));
    }, [n, e]);
  return (0, le.h)(
    'div',
    { class: (0, Bt.default)('-cbwsdk-try-extension', t) },
    (0, le.h)('style', null, xv.default),
    (0, le.h)(
      'div',
      { class: '-cbwsdk-try-extension-column-half' },
      (0, le.h)(
        'h3',
        { class: (0, Bt.default)('-cbwsdk-try-extension-heading', t) },
        'Or try the Coinbase Wallet browser extension'
      ),
      (0, le.h)(
        'div',
        { class: '-cbwsdk-try-extension-cta-wrapper' },
        (0, le.h)(
          'button',
          {
            class: (0, Bt.default)('-cbwsdk-try-extension-cta', t),
            onClick: i,
          },
          e ? 'Refresh' : 'Install'
        ),
        (0, le.h)(
          'div',
          null,
          !e &&
            (0, le.h)(Sv.ArrowLeftIcon, {
              class: '-cbwsdk-try-extension-cta-icon',
              fill: t === 'light' ? '#0052FF' : '#588AF5',
            })
        )
      )
    ),
    (0, le.h)(
      'div',
      { class: '-cbwsdk-try-extension-column-half' },
      (0, le.h)(
        'ul',
        { class: '-cbwsdk-try-extension-list' },
        (0, le.h)(
          'li',
          { class: '-cbwsdk-try-extension-list-item' },
          (0, le.h)(
            'div',
            { class: '-cbwsdk-try-extension-list-item-icon-wrapper' },
            (0, le.h)(
              'span',
              {
                class: (0, Bt.default)(
                  '-cbwsdk-try-extension-list-item-icon',
                  t
                ),
              },
              (0, le.h)(Ev.LaptopIcon, {
                fill: t === 'light' ? '#0A0B0D' : '#FFFFFF',
              })
            )
          ),
          (0, le.h)(
            'div',
            {
              class: (0, Bt.default)('-cbwsdk-try-extension-list-item-copy', t),
            },
            'Connect with dapps with just one click on your desktop browser'
          )
        ),
        (0, le.h)(
          'li',
          { class: '-cbwsdk-try-extension-list-item' },
          (0, le.h)(
            'div',
            { class: '-cbwsdk-try-extension-list-item-icon-wrapper' },
            (0, le.h)(
              'span',
              {
                class: (0, Bt.default)(
                  '-cbwsdk-try-extension-list-item-icon',
                  t
                ),
              },
              (0, le.h)(Cv.SafeIcon, {
                fill: t === 'light' ? '#0A0B0D' : '#FFFFFF',
              })
            )
          ),
          (0, le.h)(
            'div',
            {
              class: (0, Bt.default)('-cbwsdk-try-extension-list-item-copy', t),
            },
            'Add an additional layer of security by using a supported Ledger hardware wallet'
          )
        )
      )
    )
  );
}
Ci.TryExtensionContent = kv;
var la = {};
Object.defineProperty(la, '__esModule', { value: !0 });
la.default =
  '.-cbwsdk-css-reset .-cbwsdk-connect-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.light{background-color:rgba(0,0,0,.5)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.dark{background-color:rgba(50,53,61,.4)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box{display:flex;position:relative;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container{display:block}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container-hidden{display:none}';
var Gl =
  (N && N.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(vi, '__esModule', { value: !0 });
vi.ConnectDialog = void 0;
const ro = Gl(yi),
  Pt = De,
  no = mn,
  Iv = ut,
  Mv = Ci,
  Rv = Gl(la),
  Av = (t) => {
    const { isOpen: e, darkMode: r } = t,
      [n, i] = (0, no.useState)(!e),
      [s, o] = (0, no.useState)(!e);
    (0, no.useEffect)(() => {
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
    return (0, Pt.h)(
      'div',
      {
        class: (0, ro.default)(
          '-cbwsdk-connect-dialog-container',
          n && '-cbwsdk-connect-dialog-container-hidden'
        ),
      },
      (0, Pt.h)('style', null, Rv.default),
      (0, Pt.h)('div', {
        class: (0, ro.default)(
          '-cbwsdk-connect-dialog-backdrop',
          a,
          s && '-cbwsdk-connect-dialog-backdrop-hidden'
        ),
      }),
      (0, Pt.h)(
        'div',
        { class: '-cbwsdk-connect-dialog' },
        (0, Pt.h)(
          'div',
          {
            class: (0, ro.default)(
              '-cbwsdk-connect-dialog-box',
              s && '-cbwsdk-connect-dialog-box-hidden'
            ),
          },
          t.connectDisabled
            ? null
            : (0, Pt.h)(Iv.ConnectContent, {
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
          (0, Pt.h)(Mv.TryExtensionContent, { theme: a })
        )
      )
    );
  };
vi.ConnectDialog = Av;
Object.defineProperty(pi, '__esModule', { value: !0 });
pi.LinkFlow = void 0;
const io = De,
  Oc = gi,
  Tv = vi;
class Nv {
  constructor(e) {
    (this.extensionUI$ = new Oc.BehaviorSubject({})),
      (this.subscriptions = new Oc.Subscription()),
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
      (0, io.render)(null, this.root),
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
        (0, io.render)(
          (0, io.h)(Tv.ConnectDialog, {
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
pi.LinkFlow = Nv;
var Zl = {},
  ha = {};
Object.defineProperty(ha, '__esModule', { value: !0 });
ha.default =
  '.-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}';
(function (t) {
  var e =
    (N && N.__importDefault) ||
    function (h) {
      return h && h.__esModule ? h : { default: h };
    };
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.SnackbarInstance = t.SnackbarContainer = t.Snackbar = void 0);
  const r = e(yi),
    n = De,
    i = mn,
    s = e(ha),
    o =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=';
  function a(h) {
    switch (h) {
      case 'coinbase-app':
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0LjY3NCAxOC44NThjLTIuMDQ1IDAtMy42NDgtMS43MjItMy42NDgtMy44NDVzMS42NTktMy44NDUgMy42NDgtMy44NDVjMS44MjQgMCAzLjMxNyAxLjM3NyAzLjU5MyAzLjIxNGgzLjcwM2MtLjMzMS0zLjk2LTMuNDgyLTcuMDU5LTcuMjk2LTcuMDU5LTQuMDM0IDAtNy4zNSAzLjQ0My03LjM1IDcuNjkgMCA0LjI0NiAzLjI2IDcuNjkgNy4zNSA3LjY5IDMuODcgMCA2Ljk2NS0zLjEgNy4yOTYtNy4wNTloLTMuNzAzYy0uMjc2IDEuODM2LTEuNzY5IDMuMjE0LTMuNTkzIDMuMjE0WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDEwLjY3OGMwLTMuNzExIDAtNS41OTYuNzQyLTcuMDIzQTYuNTMyIDYuNTMyIDAgMCAxIDMuNjU1Ljc0MkM1LjA4MiAwIDYuOTY3IDAgMTAuNjc4IDBoNy45MzhjMy43MTEgMCA1LjU5NiAwIDcuMDIzLjc0MmE2LjUzMSA2LjUzMSAwIDAgMSAyLjkxMyAyLjkxM2MuNzQyIDEuNDI3Ljc0MiAzLjMxMi43NDIgNy4wMjN2Ny45MzhjMCAzLjcxMSAwIDUuNTk2LS43NDIgNy4wMjNhNi41MzEgNi41MzEgMCAwIDEtMi45MTMgMi45MTNjLTEuNDI3Ljc0Mi0zLjMxMi43NDItNy4wMjMuNzQyaC03LjkzOGMtMy43MTEgMC01LjU5NiAwLTcuMDIzLS43NDJhNi41MzEgNi41MzEgMCAwIDEtMi45MTMtMi45MTNDMCAyNC4yMTIgMCAyMi4zODQgMCAxOC42MTZ2LTcuOTM4WiIgZmlsbD0iIzAwNTJGRiIvPjxwYXRoIGQ9Ik0xNC42ODQgMTkuNzczYy0yLjcyNyAwLTQuODY0LTIuMjk1LTQuODY0LTUuMTI2IDAtMi44MzEgMi4yMS01LjEyNyA0Ljg2NC01LjEyNyAyLjQzMiAwIDQuNDIyIDEuODM3IDQuNzkgNC4yODVoNC45MzhjLS40NDItNS4yOC00LjY0My05LjQxMS05LjcyOC05LjQxMS01LjM4IDAtOS44MDIgNC41OS05LjgwMiAxMC4yNTMgMCA1LjY2MiA0LjM0OCAxMC4yNTMgOS44MDIgMTAuMjUzIDUuMTU5IDAgOS4yODYtNC4xMzIgOS43MjgtOS40MTFoLTQuOTM4Yy0uMzY4IDIuNDQ4LTIuMzU4IDQuMjg0LTQuNzkgNC4yODRaIiBmaWxsPSIjZmZmIi8+PC9zdmc+';
      case 'coinbase-wallet-app':
      default:
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+';
    }
  }
  class c {
    constructor(p) {
      (this.items = new Map()),
        (this.nextItemKey = 0),
        (this.root = null),
        (this.darkMode = p.darkMode);
    }
    attach(p) {
      (this.root = document.createElement('div')),
        (this.root.className = '-cbwsdk-snackbar-root'),
        p.appendChild(this.root),
        this.render();
    }
    presentItem(p) {
      const m = this.nextItemKey++;
      return (
        this.items.set(m, p),
        this.render(),
        () => {
          this.items.delete(m), this.render();
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
              Array.from(this.items.entries()).map(([p, m]) =>
                (0, n.h)(t.SnackbarInstance, Object.assign({}, m, { key: p }))
              )
            )
          ),
          this.root
        );
    }
  }
  t.Snackbar = c;
  const u = (h) =>
    (0, n.h)(
      'div',
      { class: (0, r.default)('-cbwsdk-snackbar-container') },
      (0, n.h)('style', null, s.default),
      (0, n.h)('div', { class: '-cbwsdk-snackbar' }, h.children)
    );
  t.SnackbarContainer = u;
  const l = ({ autoExpand: h, message: p, menuItems: m, appSrc: C }) => {
    const [x, S] = (0, i.useState)(!0),
      [b, g] = (0, i.useState)(h ?? !1);
    (0, i.useEffect)(() => {
      const E = [
        window.setTimeout(() => {
          S(!1);
        }, 1),
        window.setTimeout(() => {
          g(!0);
        }, 1e4),
      ];
      return () => {
        E.forEach(window.clearTimeout);
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
          src: a(C),
          class: '-cbwsdk-snackbar-instance-header-cblogo',
        }),
        (0, n.h)(
          'div',
          { class: '-cbwsdk-snackbar-instance-header-message' },
          p
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
      m &&
        m.length > 0 &&
        (0, n.h)(
          'div',
          { class: '-cbwsdk-snackbar-instance-menu' },
          m.map((E, _) =>
            (0, n.h)(
              'div',
              {
                class: (0, r.default)(
                  '-cbwsdk-snackbar-instance-menu-item',
                  E.isRed && '-cbwsdk-snackbar-instance-menu-item-is-red'
                ),
                onClick: E.onClick,
                key: _,
              },
              (0, n.h)(
                'svg',
                {
                  width: E.svgWidth,
                  height: E.svgHeight,
                  viewBox: '0 0 10 11',
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg',
                },
                (0, n.h)('path', {
                  'fill-rule': E.defaultFillRule,
                  'clip-rule': E.defaultClipRule,
                  d: E.path,
                  fill: '#AAAAAA',
                })
              ),
              (0, n.h)(
                'span',
                {
                  class: (0, r.default)(
                    '-cbwsdk-snackbar-instance-menu-item-info',
                    E.isRed && '-cbwsdk-snackbar-instance-menu-item-info-is-red'
                  ),
                },
                E.info
              )
            )
          )
        )
    );
  };
  t.SnackbarInstance = l;
})(Zl);
var Mi = {},
  fa = {};
Object.defineProperty(fa, '__esModule', { value: !0 });
fa.default =
  '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}';
var Ov =
  (N && N.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t };
  };
Object.defineProperty(Mi, '__esModule', { value: !0 });
Mi.injectCssReset = void 0;
const Lv = Ov(fa);
function Dv() {
  const t = document.createElement('style');
  (t.type = 'text/css'),
    t.appendChild(document.createTextNode(Lv.default)),
    document.documentElement.appendChild(t);
}
Mi.injectCssReset = Dv;
Object.defineProperty(di, '__esModule', { value: !0 });
di.WalletSDKUI = void 0;
const jv = pi,
  Bv = Zl,
  Pv = Mi;
class Fv {
  constructor(e) {
    (this.standalone = null),
      (this.attached = !1),
      (this.appSrc = null),
      (this.snackbar = new Bv.Snackbar({ darkMode: e.darkMode })),
      (this.linkFlow = new jv.LinkFlow({
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
      (0, Pv.injectCssReset)();
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
di.WalletSDKUI = Fv;
var Ri = {},
  Ai = {};
Object.defineProperty(Ai, '__esModule', { value: !0 });
var lr;
(function (t) {
  (t.typeOfFunction = 'function'), (t.boolTrue = !0);
})(lr || (lr = {}));
function Ql(t, e, r) {
  if (!r || typeof r.value !== lr.typeOfFunction)
    throw new TypeError(
      'Only methods can be decorated with @bind. <' + e + '> is not a method!'
    );
  return {
    configurable: lr.boolTrue,
    get: function () {
      var n = r.value.bind(this);
      return (
        Object.defineProperty(this, e, {
          value: n,
          configurable: lr.boolTrue,
          writable: lr.boolTrue,
        }),
        n
      );
    },
  };
}
Ai.bind = Ql;
Ai.default = Ql;
function Yl(t) {
  return function (r) {
    return r.lift(new $v(t));
  };
}
var $v = (function () {
    function t(e) {
      this.durationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Wv(e, this.durationSelector));
      }),
      t
    );
  })(),
  Wv = (function (t) {
    k(e, t);
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
          var s = ce(n, new oe(this));
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
  })(ae);
function Hv(t, e) {
  return (
    e === void 0 && (e = ke),
    Yl(function () {
      return jl(t, e);
    })
  );
}
function Vv(t) {
  return function (r) {
    return r.lift(new zv(t));
  };
}
var zv = (function () {
    function t(e) {
      this.closingNotifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Uv(e, this.closingNotifier));
      }),
      t
    );
  })(),
  Uv = (function (t) {
    k(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return (i.buffer = []), i.add(ce(n, new oe(i))), i;
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
  })(ae);
function qv(t, e) {
  return (
    e === void 0 && (e = null),
    function (n) {
      return n.lift(new Jv(t, e));
    }
  );
}
var Jv = (function () {
    function t(e, r) {
      (this.bufferSize = e),
        (this.startBufferEvery = r),
        !r || e === r
          ? (this.subscriberClass = Gv)
          : (this.subscriberClass = Zv);
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
  Gv = (function (t) {
    k(e, t);
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
  })(L),
  Zv = (function (t) {
    k(e, t);
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
  })(L);
function Qv(t) {
  var e = arguments.length,
    r = ke;
  Le(arguments[arguments.length - 1]) &&
    ((r = arguments[arguments.length - 1]), e--);
  var n = null;
  e >= 2 && (n = arguments[1]);
  var i = Number.POSITIVE_INFINITY;
  return (
    e >= 3 && (i = arguments[2]),
    function (o) {
      return o.lift(new Yv(t, n, i, r));
    }
  );
}
var Yv = (function () {
    function t(e, r, n, i) {
      (this.bufferTimeSpan = e),
        (this.bufferCreationInterval = r),
        (this.maxBufferSize = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new Xv(
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
  Kv = (function () {
    function t() {
      this.buffer = [];
    }
    return t;
  })(),
  Xv = (function (t) {
    k(e, t);
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
        a.add((c.closeAction = o.schedule(Lc, n, u)));
      } else {
        var l = { subscriber: a, context: c },
          h = {
            bufferTimeSpan: n,
            bufferCreationInterval: i,
            subscriber: a,
            scheduler: o,
          };
        a.add((c.closeAction = o.schedule(Kl, n, l))),
          a.add(o.schedule(ey, i, h));
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
          this.add((r.closeAction = this.scheduler.schedule(Lc, i, s)));
        }
      }),
      (e.prototype.openContext = function () {
        var r = new Kv();
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
  })(L);
function Lc(t) {
  var e = t.subscriber,
    r = t.context;
  r && e.closeContext(r),
    e.closed ||
      ((t.context = e.openContext()),
      (t.context.closeAction = this.schedule(t, t.bufferTimeSpan)));
}
function ey(t) {
  var e = t.bufferCreationInterval,
    r = t.bufferTimeSpan,
    n = t.subscriber,
    i = t.scheduler,
    s = n.openContext(),
    o = this;
  n.closed ||
    (n.add((s.closeAction = i.schedule(Kl, r, { subscriber: n, context: s }))),
    o.schedule(t, e));
}
function Kl(t) {
  var e = t.subscriber,
    r = t.context;
  e.closeContext(r);
}
function ty(t, e) {
  return function (n) {
    return n.lift(new ry(t, e));
  };
}
var ry = (function () {
    function t(e, r) {
      (this.openings = e), (this.closingSelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new ny(e, this.openings, this.closingSelector));
      }),
      t
    );
  })(),
  ny = (function (t) {
    k(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (s.closingSelector = i), (s.contexts = []), s.add(mt(s, n)), s;
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
          s = new se(),
          o = { buffer: i, subscription: s };
        n.push(o);
        var a = mt(this, r, o);
        !a || a.closed
          ? this.closeBuffer(o)
          : ((a.context = o), this.add(a), s.add(a));
      }),
      e
    );
  })(tr);
function iy(t) {
  return function (e) {
    return e.lift(new sy(t));
  };
}
var sy = (function () {
    function t(e) {
      this.closingSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new oy(e, this.closingSelector));
      }),
      t
    );
  })(),
  oy = (function (t) {
    k(e, t);
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
        (r = new se()),
          (this.closingSubscription = r),
          this.add(r),
          (this.subscribing = !0),
          r.add(ce(i, new oe(this))),
          (this.subscribing = !1);
      }),
      e
    );
  })(ae);
function ay(t) {
  return function (r) {
    var n = new cy(t),
      i = r.lift(n);
    return (n.caught = i);
  };
}
var cy = (function () {
    function t(e) {
      this.selector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new uy(e, this.selector, this.caught));
      }),
      t
    );
  })(),
  uy = (function (t) {
    k(e, t);
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
          var i = new oe(this);
          this.add(i);
          var s = ce(n, i);
          s !== i && this.add(s);
        }
      }),
      e
    );
  })(ae);
function ly(t) {
  return function (e) {
    return e.lift(new ea(t));
  };
}
function hy() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = null;
  return (
    typeof t[t.length - 1] == 'function' && (r = t.pop()),
    t.length === 1 && xe(t[0]) && (t = t[0].slice()),
    function (n) {
      return n.lift.call(wt([n].concat(t)), new ea(r));
    }
  );
}
function fy() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return r.lift.call(Qr.apply(void 0, [r].concat(t)));
  };
}
function Xl(t, e) {
  return qt(t, e, 1);
}
function dy(t, e) {
  return Xl(function () {
    return t;
  }, e);
}
function py(t) {
  return function (e) {
    return e.lift(new by(t, e));
  };
}
var by = (function () {
    function t(e, r) {
      (this.predicate = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new gy(e, this.predicate, this.source));
      }),
      t
    );
  })(),
  gy = (function (t) {
    k(e, t);
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
  })(L);
function vy(t) {
  return function (e) {
    return e.lift(new yy(t));
  };
}
var yy = (function () {
    function t(e) {
      this.durationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new my(e, this.durationSelector));
      }),
      t
    );
  })(),
  my = (function (t) {
    k(e, t);
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
          (i = ce(n, new oe(this))),
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
  })(ae);
function wy(t, e) {
  return (
    e === void 0 && (e = ke),
    function (r) {
      return r.lift(new _y(t, e));
    }
  );
}
var _y = (function () {
    function t(e, r) {
      (this.dueTime = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Sy(e, this.dueTime, this.scheduler));
      }),
      t
    );
  })(),
  Sy = (function (t) {
    k(e, t);
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
              Ey,
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
  })(L);
function Ey(t) {
  t.debouncedNext();
}
function wn(t) {
  return (
    t === void 0 && (t = null),
    function (e) {
      return e.lift(new Cy(t));
    }
  );
}
var Cy = (function () {
    function t(e) {
      this.defaultValue = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new xy(e, this.defaultValue));
      }),
      t
    );
  })(),
  xy = (function (t) {
    k(e, t);
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
  })(L);
function eh(t) {
  return t instanceof Date && !isNaN(+t);
}
function ky(t, e) {
  e === void 0 && (e = ke);
  var r = eh(t),
    n = r ? +t - e.now() : Math.abs(t);
  return function (i) {
    return i.lift(new Iy(n, e));
  };
}
var Iy = (function () {
    function t(e, r) {
      (this.delay = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new My(e, this.delay, this.scheduler));
      }),
      t
    );
  })(),
  My = (function (t) {
    k(e, t);
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
            i = new Ry(n.now() + this.delay, r);
          this.queue.push(i), this.active === !1 && this._schedule(n);
        }
      }),
      (e.prototype._next = function (r) {
        this.scheduleNotification(vt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        (this.errored = !0),
          (this.queue = []),
          this.destination.error(r),
          this.unsubscribe();
      }),
      (e.prototype._complete = function () {
        this.scheduleNotification(vt.createComplete()), this.unsubscribe();
      }),
      e
    );
  })(L),
  Ry = (function () {
    function t(e, r) {
      (this.time = e), (this.notification = r);
    }
    return t;
  })();
function Ay(t, e) {
  return e
    ? function (r) {
        return new Ny(r, e).lift(new Dc(t));
      }
    : function (r) {
        return r.lift(new Dc(t));
      };
}
var Dc = (function () {
    function t(e) {
      this.delayDurationSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Ty(e, this.delayDurationSelector));
      }),
      t
    );
  })(),
  Ty = (function (t) {
    k(e, t);
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
        var i = mt(this, r, n);
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
  })(tr),
  Ny = (function (t) {
    k(e, t);
    function e(r, n) {
      var i = t.call(this) || this;
      return (i.source = r), (i.subscriptionDelay = n), i;
    }
    return (
      (e.prototype._subscribe = function (r) {
        this.subscriptionDelay.subscribe(new Oy(r, this.source));
      }),
      e
    );
  })(V),
  Oy = (function (t) {
    k(e, t);
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
  })(L);
function Ly() {
  return function (e) {
    return e.lift(new Dy());
  };
}
var Dy = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new jy(e));
      }),
      t
    );
  })(),
  jy = (function (t) {
    k(e, t);
    function e(r) {
      return t.call(this, r) || this;
    }
    return (
      (e.prototype._next = function (r) {
        r.observe(this.destination);
      }),
      e
    );
  })(L);
function By(t, e) {
  return function (r) {
    return r.lift(new Py(t, e));
  };
}
var Py = (function () {
    function t(e, r) {
      (this.keySelector = e), (this.flushes = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Fy(e, this.keySelector, this.flushes));
      }),
      t
    );
  })(),
  Fy = (function (t) {
    k(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.keySelector = n),
        (s.values = new Set()),
        i && s.add(ce(i, new oe(s))),
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
  })(ae);
function th(t, e) {
  return function (r) {
    return r.lift(new $y(t, e));
  };
}
var $y = (function () {
    function t(e, r) {
      (this.compare = e), (this.keySelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Wy(e, this.compare, this.keySelector));
      }),
      t
    );
  })(),
  Wy = (function (t) {
    k(e, t);
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
  })(L);
function Hy(t, e) {
  return th(function (r, n) {
    return e ? e(r[t], n[t]) : r[t] === n[t];
  });
}
function Ti(t) {
  return (
    t === void 0 && (t = Uy),
    function (e) {
      return e.lift(new Vy(t));
    }
  );
}
var Vy = (function () {
    function t(e) {
      this.errorFactory = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new zy(e, this.errorFactory));
      }),
      t
    );
  })(),
  zy = (function (t) {
    k(e, t);
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
  })(L);
function Uy() {
  return new yn();
}
function da(t) {
  return function (e) {
    return t === 0 ? Lr() : e.lift(new qy(t));
  };
}
var qy = (function () {
    function t(e) {
      if (((this.total = e), this.total < 0)) throw new Sr();
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Jy(e, this.total));
      }),
      t
    );
  })(),
  Jy = (function (t) {
    k(e, t);
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
  })(L);
function Gy(t, e) {
  if (t < 0) throw new Sr();
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      Lt(function (i, s) {
        return s === t;
      }),
      da(1),
      r
        ? wn(e)
        : Ti(function () {
            return new Sr();
          })
    );
  };
}
function Zy() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return Qr(r, bi.apply(void 0, t));
  };
}
function Qy(t, e) {
  return function (r) {
    return r.lift(new Yy(t, e, r));
  };
}
var Yy = (function () {
    function t(e, r, n) {
      (this.predicate = e), (this.thisArg = r), (this.source = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new Ky(e, this.predicate, this.thisArg, this.source)
        );
      }),
      t
    );
  })(),
  Ky = (function (t) {
    k(e, t);
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
  })(L);
function Xy() {
  return function (t) {
    return t.lift(new em());
  };
}
var em = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new tm(e));
      }),
      t
    );
  })(),
  tm = (function (t) {
    k(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.hasCompleted = !1), (n.hasSubscription = !1), n;
    }
    return (
      (e.prototype._next = function (r) {
        this.hasSubscription ||
          ((this.hasSubscription = !0), this.add(ce(r, new oe(this))));
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
  })(ae);
function rh(t, e) {
  return e
    ? function (r) {
        return r.pipe(
          rh(function (n, i) {
            return wt(t(n, i)).pipe(
              qe(function (s, o) {
                return e(n, s, i, o);
              })
            );
          })
        );
      }
    : function (r) {
        return r.lift(new rm(t));
      };
}
var rm = (function () {
    function t(e) {
      this.project = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new nm(e, this.project));
      }),
      t
    );
  })(),
  nm = (function (t) {
    k(e, t);
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
        var n = new oe(this),
          i = this.destination;
        i.add(n);
        var s = ce(r, n);
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
  })(ae);
function im(t, e, r) {
  return (
    e === void 0 && (e = Number.POSITIVE_INFINITY),
    (e = (e || 0) < 1 ? Number.POSITIVE_INFINITY : e),
    function (n) {
      return n.lift(new sm(t, e, r));
    }
  );
}
var sm = (function () {
    function t(e, r, n) {
      (this.project = e), (this.concurrent = r), (this.scheduler = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new om(e, this.project, this.concurrent, this.scheduler)
        );
      }),
      t
    );
  })(),
  om = (function (t) {
    k(e, t);
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
        s.add(ce(r, new oe(this)));
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
  })(ae);
function am(t) {
  return function (e) {
    return e.lift(new cm(t));
  };
}
var cm = (function () {
    function t(e) {
      this.callback = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new um(e, this.callback));
      }),
      t
    );
  })(),
  um = (function (t) {
    k(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      return i.add(new se(n)), i;
    }
    return e;
  })(L);
function lm(t, e) {
  if (typeof t != 'function')
    throw new TypeError('predicate is not a function');
  return function (r) {
    return r.lift(new nh(t, r, !1, e));
  };
}
var nh = (function () {
    function t(e, r, n, i) {
      (this.predicate = e),
        (this.source = r),
        (this.yieldIndex = n),
        (this.thisArg = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new hm(e, this.predicate, this.source, this.yieldIndex, this.thisArg)
        );
      }),
      t
    );
  })(),
  hm = (function (t) {
    k(e, t);
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
  })(L);
function fm(t, e) {
  return function (r) {
    return r.lift(new nh(t, r, !0, e));
  };
}
function dm(t, e) {
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      t
        ? Lt(function (i, s) {
            return t(i, s, n);
          })
        : Nt,
      da(1),
      r
        ? wn(e)
        : Ti(function () {
            return new yn();
          })
    );
  };
}
function pm() {
  return function (e) {
    return e.lift(new bm());
  };
}
var bm = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new gm(e));
      }),
      t
    );
  })(),
  gm = (function (t) {
    k(e, t);
    function e() {
      return (t !== null && t.apply(this, arguments)) || this;
    }
    return (e.prototype._next = function (r) {}), e;
  })(L);
function vm() {
  return function (t) {
    return t.lift(new ym());
  };
}
var ym = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new mm(e));
      }),
      t
    );
  })(),
  mm = (function (t) {
    k(e, t);
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
  })(L);
function Pn(t) {
  return function (r) {
    return t === 0 ? Lr() : r.lift(new wm(t));
  };
}
var wm = (function () {
    function t(e) {
      if (((this.total = e), this.total < 0)) throw new Sr();
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new _m(e, this.total));
      }),
      t
    );
  })(),
  _m = (function (t) {
    k(e, t);
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
  })(L);
function Sm(t, e) {
  var r = arguments.length >= 2;
  return function (n) {
    return n.pipe(
      t
        ? Lt(function (i, s) {
            return t(i, s, n);
          })
        : Nt,
      Pn(1),
      r
        ? wn(e)
        : Ti(function () {
            return new yn();
          })
    );
  };
}
function Em(t) {
  return function (e) {
    return e.lift(new Cm(t));
  };
}
var Cm = (function () {
    function t(e) {
      this.value = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new xm(e, this.value));
      }),
      t
    );
  })(),
  xm = (function (t) {
    k(e, t);
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
  })(L);
function km() {
  return function (e) {
    return e.lift(new Im());
  };
}
var Im = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Mm(e));
      }),
      t
    );
  })(),
  Mm = (function (t) {
    k(e, t);
    function e(r) {
      return t.call(this, r) || this;
    }
    return (
      (e.prototype._next = function (r) {
        this.destination.next(vt.createNext(r));
      }),
      (e.prototype._error = function (r) {
        var n = this.destination;
        n.next(vt.createError(r)), n.complete();
      }),
      (e.prototype._complete = function () {
        var r = this.destination;
        r.next(vt.createComplete()), r.complete();
      }),
      e
    );
  })(L);
function Fn(t, e) {
  var r = !1;
  return (
    arguments.length >= 2 && (r = !0),
    function (i) {
      return i.lift(new Rm(t, e, r));
    }
  );
}
var Rm = (function () {
    function t(e, r, n) {
      n === void 0 && (n = !1),
        (this.accumulator = e),
        (this.seed = r),
        (this.hasSeed = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new Am(e, this.accumulator, this.seed, this.hasSeed)
        );
      }),
      t
    );
  })(),
  Am = (function (t) {
    k(e, t);
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
  })(L);
function Ni(t, e) {
  return arguments.length >= 2
    ? function (n) {
        return bo(Fn(t, e), Pn(1), wn(e))(n);
      }
    : function (n) {
        return bo(
          Fn(function (i, s, o) {
            return t(i, s, o + 1);
          }),
          Pn(1)
        )(n);
      };
}
function Tm(t) {
  var e =
    typeof t == 'function'
      ? function (r, n) {
          return t(r, n) > 0 ? r : n;
        }
      : function (r, n) {
          return r > n ? r : n;
        };
  return Ni(e);
}
function Nm() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    return r.lift.call(Nl.apply(void 0, [r].concat(t)));
  };
}
function Om(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    typeof e == 'function'
      ? qt(
          function () {
            return t;
          },
          e,
          r
        )
      : (typeof e == 'number' && (r = e),
        qt(function () {
          return t;
        }, r))
  );
}
function Lm(t, e, r) {
  return (
    r === void 0 && (r = Number.POSITIVE_INFINITY),
    function (n) {
      return n.lift(new Dm(t, e, r));
    }
  );
}
var Dm = (function () {
    function t(e, r, n) {
      (this.accumulator = e), (this.seed = r), (this.concurrent = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new jm(e, this.accumulator, this.seed, this.concurrent)
        );
      }),
      t
    );
  })(),
  jm = (function (t) {
    k(e, t);
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
        var n = new oe(this),
          i = this.destination;
        i.add(n);
        var s = ce(r, n);
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
  })(ae);
function Bm(t) {
  var e =
    typeof t == 'function'
      ? function (r, n) {
          return t(r, n) < 0 ? r : n;
        }
      : function (r, n) {
          return r < n ? r : n;
        };
  return Ni(e);
}
function Jt(t, e) {
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
      return n.lift(new Pm(i, e));
    var s = Object.create(n, kg);
    return (s.source = n), (s.subjectFactory = i), s;
  };
}
var Pm = (function () {
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
function Fm() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return (
    t.length === 1 && xe(t[0]) && (t = t[0]),
    function (r) {
      return r.lift(new $m(t));
    }
  );
}
var $m = (function () {
    function t(e) {
      this.nextSources = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Wm(e, this.nextSources));
      }),
      t
    );
  })(),
  Wm = (function (t) {
    k(e, t);
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
          var n = new oe(this),
            i = this.destination;
          i.add(n);
          var s = ce(r, n);
          s !== n && i.add(s);
        } else this.destination.complete();
      }),
      e
    );
  })(ae);
function Hm() {
  return function (t) {
    return t.lift(new Vm());
  };
}
var Vm = (function () {
    function t() {}
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new zm(e));
      }),
      t
    );
  })(),
  zm = (function (t) {
    k(e, t);
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
  })(L);
function Um(t, e) {
  return function (r) {
    return [Lt(t, e)(r), Lt(Ll(t, e))(r)];
  };
}
function qm() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t.length;
  if (r === 0) throw new Error('list of properties cannot be empty.');
  return function (n) {
    return qe(Jm(t, r))(n);
  };
}
function Jm(t, e) {
  var r = function (n) {
    for (var i = n, s = 0; s < e; s++) {
      var o = i != null ? i[t[s]] : void 0;
      if (o !== void 0) i = o;
      else return;
    }
    return i;
  };
  return r;
}
function Gm(t) {
  return t
    ? Jt(function () {
        return new ve();
      }, t)
    : Jt(new ve());
}
function Zm(t) {
  return function (e) {
    return Jt(new dl(t))(e);
  };
}
function Qm() {
  return function (t) {
    return Jt(new Dr())(t);
  };
}
function Ym(t, e, r, n) {
  r && typeof r != 'function' && (n = r);
  var i = typeof r == 'function' ? r : void 0,
    s = new Xo(t, e, n);
  return function (o) {
    return Jt(function () {
      return s;
    }, i)(o);
  };
}
function Km() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (n) {
    return (
      t.length === 1 && xe(t[0]) && (t = t[0]),
      n.lift.call(Dl.apply(void 0, [n].concat(t)))
    );
  };
}
function Xm(t) {
  return (
    t === void 0 && (t = -1),
    function (e) {
      return t === 0
        ? Lr()
        : t < 0
          ? e.lift(new jc(-1, e))
          : e.lift(new jc(t - 1, e));
    }
  );
}
var jc = (function () {
    function t(e, r) {
      (this.count = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new ew(e, this.count, this.source));
      }),
      t
    );
  })(),
  ew = (function (t) {
    k(e, t);
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
  })(L);
function tw(t) {
  return function (e) {
    return e.lift(new rw(t));
  };
}
var rw = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new nw(e, this.notifier, r));
      }),
      t
    );
  })(),
  nw = (function (t) {
    k(e, t);
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
        this.notifications = new ve();
        var r;
        try {
          var n = this.notifier;
          r = n(this.notifications);
        } catch {
          return t.prototype.complete.call(this);
        }
        (this.retries = r), (this.retriesSubscription = ce(r, new oe(this)));
      }),
      e
    );
  })(ae);
function iw(t) {
  return (
    t === void 0 && (t = -1),
    function (e) {
      return e.lift(new sw(t, e));
    }
  );
}
var sw = (function () {
    function t(e, r) {
      (this.count = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new ow(e, this.count, this.source));
      }),
      t
    );
  })(),
  ow = (function (t) {
    k(e, t);
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
  })(L);
function aw(t) {
  return function (e) {
    return e.lift(new cw(t, e));
  };
}
var cw = (function () {
    function t(e, r) {
      (this.notifier = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new uw(e, this.notifier, this.source));
      }),
      t
    );
  })(),
  uw = (function (t) {
    k(e, t);
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
            n = new ve();
            try {
              var o = this.notifier;
              i = o(n);
            } catch (a) {
              return t.prototype.error.call(this, a);
            }
            s = ce(i, new oe(this));
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
  })(ae);
function lw(t) {
  return function (e) {
    return e.lift(new hw(t));
  };
}
var hw = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new fw(e),
          i = r.subscribe(n);
        return i.add(ce(this.notifier, new oe(n))), i;
      }),
      t
    );
  })(),
  fw = (function (t) {
    k(e, t);
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
  })(ae);
function dw(t, e) {
  return (
    e === void 0 && (e = ke),
    function (r) {
      return r.lift(new pw(t, e));
    }
  );
}
var pw = (function () {
    function t(e, r) {
      (this.period = e), (this.scheduler = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new bw(e, this.period, this.scheduler));
      }),
      t
    );
  })(),
  bw = (function (t) {
    k(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.period = n),
        (s.scheduler = i),
        (s.hasValue = !1),
        s.add(i.schedule(gw, n, { subscriber: s, period: n })),
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
  })(L);
function gw(t) {
  var e = t.subscriber,
    r = t.period;
  e.notifyNext(), this.schedule(t, r);
}
function vw(t, e) {
  return function (r) {
    return r.lift(new yw(t, e));
  };
}
var yw = (function () {
    function t(e, r) {
      (this.compareTo = e), (this.comparator = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new mw(e, this.compareTo, this.comparator));
      }),
      t
    );
  })(),
  mw = (function (t) {
    k(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.compareTo = n),
        (s.comparator = i),
        (s._a = []),
        (s._b = []),
        (s._oneComplete = !1),
        s.destination.add(n.subscribe(new ww(r, s))),
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
  })(L),
  ww = (function (t) {
    k(e, t);
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
  })(L);
function _w() {
  return new ve();
}
function Sw() {
  return function (t) {
    return Qo()(Jt(_w)(t));
  };
}
function Ew(t, e, r) {
  var n;
  return (
    t && typeof t == 'object'
      ? (n = t)
      : (n = { bufferSize: t, windowTime: e, refCount: !1, scheduler: r }),
    function (i) {
      return i.lift(Cw(n));
    }
  );
}
function Cw(t) {
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
    h = !1;
  return function (m) {
    c++;
    var C;
    !a || l
      ? ((l = !1),
        (a = new Xo(r, i, o)),
        (C = a.subscribe(this)),
        (u = m.subscribe({
          next: function (x) {
            a.next(x);
          },
          error: function (x) {
            (l = !0), a.error(x);
          },
          complete: function () {
            (h = !0), (u = void 0), a.complete();
          },
        })),
        h && (u = void 0))
      : (C = a.subscribe(this)),
      this.add(function () {
        c--,
          C.unsubscribe(),
          (C = void 0),
          u &&
            !h &&
            s &&
            c === 0 &&
            (u.unsubscribe(), (u = void 0), (a = void 0));
      });
  };
}
function xw(t) {
  return function (e) {
    return e.lift(new kw(t, e));
  };
}
var kw = (function () {
    function t(e, r) {
      (this.predicate = e), (this.source = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Iw(e, this.predicate, this.source));
      }),
      t
    );
  })(),
  Iw = (function (t) {
    k(e, t);
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
          : r.error(new yn());
      }),
      e
    );
  })(L);
function Mw(t) {
  return function (e) {
    return e.lift(new Rw(t));
  };
}
var Rw = (function () {
    function t(e) {
      this.total = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Aw(e, this.total));
      }),
      t
    );
  })(),
  Aw = (function (t) {
    k(e, t);
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
  })(L);
function Tw(t) {
  return function (e) {
    return e.lift(new Nw(t));
  };
}
var Nw = (function () {
    function t(e) {
      if (((this._skipCount = e), this._skipCount < 0)) throw new Sr();
    }
    return (
      (t.prototype.call = function (e, r) {
        return this._skipCount === 0
          ? r.subscribe(new L(e))
          : r.subscribe(new Ow(e, this._skipCount));
      }),
      t
    );
  })(),
  Ow = (function (t) {
    k(e, t);
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
  })(L);
function Lw(t) {
  return function (e) {
    return e.lift(new Dw(t));
  };
}
var Dw = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new jw(e, this.notifier));
      }),
      t
    );
  })(),
  jw = (function (t) {
    k(e, t);
    function e(r, n) {
      var i = t.call(this, r) || this;
      i.hasValue = !1;
      var s = new oe(i);
      i.add(s), (i.innerSubscription = s);
      var o = ce(n, s);
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
  })(ae);
function Bw(t) {
  return function (e) {
    return e.lift(new Pw(t));
  };
}
var Pw = (function () {
    function t(e) {
      this.predicate = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Fw(e, this.predicate));
      }),
      t
    );
  })(),
  Fw = (function (t) {
    k(e, t);
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
  })(L);
function $w() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  var r = t[t.length - 1];
  return Le(r)
    ? (t.pop(),
      function (n) {
        return Qr(t, n, r);
      })
    : function (n) {
        return Qr(t, n);
      };
}
var Ww = (function (t) {
  k(e, t);
  function e(r, n, i) {
    n === void 0 && (n = 0), i === void 0 && (i = Nn);
    var s = t.call(this) || this;
    return (
      (s.source = r),
      (s.delayTime = n),
      (s.scheduler = i),
      (!Er(n) || n < 0) && (s.delayTime = 0),
      (!i || typeof i.schedule != 'function') && (s.scheduler = Nn),
      s
    );
  }
  return (
    (e.create = function (r, n, i) {
      return n === void 0 && (n = 0), i === void 0 && (i = Nn), new e(r, n, i);
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
})(V);
function Hw(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new Vw(t, e));
    }
  );
}
var Vw = (function () {
  function t(e, r) {
    (this.scheduler = e), (this.delay = r);
  }
  return (
    (t.prototype.call = function (e, r) {
      return new Ww(r, this.delay, this.scheduler).subscribe(e);
    }),
    t
  );
})();
function Yr(t, e) {
  return typeof e == 'function'
    ? function (r) {
        return r.pipe(
          Yr(function (n, i) {
            return wt(t(n, i)).pipe(
              qe(function (s, o) {
                return e(n, s, i, o);
              })
            );
          })
        );
      }
    : function (r) {
        return r.lift(new zw(t));
      };
}
var zw = (function () {
    function t(e) {
      this.project = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Uw(e, this.project));
      }),
      t
    );
  })(),
  Uw = (function (t) {
    k(e, t);
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
        var i = new oe(this),
          s = this.destination;
        s.add(i),
          (this.innerSubscription = ce(r, i)),
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
  })(ae);
function qw() {
  return Yr(Nt);
}
function Jw(t, e) {
  return e
    ? Yr(function () {
        return t;
      }, e)
    : Yr(function () {
        return t;
      });
}
function Gw(t) {
  return function (e) {
    return e.lift(new Zw(t));
  };
}
var Zw = (function () {
    function t(e) {
      this.notifier = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new Qw(e),
          i = ce(this.notifier, new oe(n));
        return i && !n.seenValue ? (n.add(i), r.subscribe(n)) : n;
      }),
      t
    );
  })(),
  Qw = (function (t) {
    k(e, t);
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
  })(ae);
function Yw(t, e) {
  return (
    e === void 0 && (e = !1),
    function (r) {
      return r.lift(new Kw(t, e));
    }
  );
}
var Kw = (function () {
    function t(e, r) {
      (this.predicate = e), (this.inclusive = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new Xw(e, this.predicate, this.inclusive));
      }),
      t
    );
  })(),
  Xw = (function (t) {
    k(e, t);
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
  })(L);
function e_(t, e, r) {
  return function (i) {
    return i.lift(new t_(t, e, r));
  };
}
var t_ = (function () {
    function t(e, r, n) {
      (this.nextOrObserver = e), (this.error = r), (this.complete = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new r_(e, this.nextOrObserver, this.error, this.complete)
        );
      }),
      t
    );
  })(),
  r_ = (function (t) {
    k(e, t);
    function e(r, n, i, s) {
      var o = t.call(this, r) || this;
      return (
        (o._tapNext = st),
        (o._tapError = st),
        (o._tapComplete = st),
        (o._tapError = i || st),
        (o._tapComplete = s || st),
        wr(n)
          ? ((o._context = o), (o._tapNext = n))
          : n &&
            ((o._context = n),
            (o._tapNext = n.next || st),
            (o._tapError = n.error || st),
            (o._tapComplete = n.complete || st)),
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
  })(L),
  ih = { leading: !0, trailing: !1 };
function n_(t, e) {
  return (
    e === void 0 && (e = ih),
    function (r) {
      return r.lift(new i_(t, !!e.leading, !!e.trailing));
    }
  );
}
var i_ = (function () {
    function t(e, r, n) {
      (this.durationSelector = e), (this.leading = r), (this.trailing = n);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new s_(e, this.durationSelector, this.leading, this.trailing)
        );
      }),
      t
    );
  })(),
  s_ = (function (t) {
    k(e, t);
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
        n && this.add((this._throttled = ce(n, new oe(this))));
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
  })(ae);
function o_(t, e, r) {
  return (
    e === void 0 && (e = ke),
    r === void 0 && (r = ih),
    function (n) {
      return n.lift(new a_(t, e, r.leading, r.trailing));
    }
  );
}
var a_ = (function () {
    function t(e, r, n, i) {
      (this.duration = e),
        (this.scheduler = r),
        (this.leading = n),
        (this.trailing = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new c_(e, this.duration, this.scheduler, this.leading, this.trailing)
        );
      }),
      t
    );
  })(),
  c_ = (function (t) {
    k(e, t);
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
              (this.throttled = this.scheduler.schedule(u_, this.duration, {
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
  })(L);
function u_(t) {
  var e = t.subscriber;
  e.clearThrottle();
}
function l_(t) {
  return (
    t === void 0 && (t = ke),
    function (e) {
      return ra(function () {
        return e.pipe(
          Fn(
            function (r, n) {
              var i = r.current;
              return { value: n, current: t.now(), last: i };
            },
            { current: t.now(), value: void 0, last: void 0 }
          ),
          qe(function (r) {
            var n = r.current,
              i = r.last,
              s = r.value;
            return new h_(s, n - i);
          })
        );
      });
    }
  );
}
var h_ = (function () {
  function t(e, r) {
    (this.value = e), (this.interval = r);
  }
  return t;
})();
function sh(t, e, r) {
  return (
    r === void 0 && (r = ke),
    function (n) {
      var i = eh(t),
        s = i ? +t - r.now() : Math.abs(t);
      return n.lift(new f_(s, i, e, r));
    }
  );
}
var f_ = (function () {
    function t(e, r, n, i) {
      (this.waitFor = e),
        (this.absoluteTimeout = r),
        (this.withObservable = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new d_(
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
  d_ = (function (t) {
    k(e, t);
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
        r._unsubscribeAndRecycle(), r.add(ce(n, new oe(r)));
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
  })(ae);
function p_(t, e) {
  return e === void 0 && (e = ke), sh(t, Ko(new Sl()), e);
}
function b_(t) {
  return (
    t === void 0 && (t = ke),
    qe(function (e) {
      return new g_(e, t.now());
    })
  );
}
var g_ = (function () {
  function t(e, r) {
    (this.value = e), (this.timestamp = r);
  }
  return t;
})();
function v_(t, e, r) {
  return r === 0 ? [e] : (t.push(e), t);
}
function y_() {
  return Ni(v_, []);
}
function m_(t) {
  return function (r) {
    return r.lift(new w_(t));
  };
}
var w_ = (function () {
    function t(e) {
      this.windowBoundaries = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        var n = new __(e),
          i = r.subscribe(n);
        return i.closed || n.add(ce(this.windowBoundaries, new oe(n))), i;
      }),
      t
    );
  })(),
  __ = (function (t) {
    k(e, t);
    function e(r) {
      var n = t.call(this, r) || this;
      return (n.window = new ve()), r.next(n.window), n;
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
          i = (this.window = new ve());
        n.next(i);
      }),
      e
    );
  })(ae);
function S_(t, e) {
  return (
    e === void 0 && (e = 0),
    function (n) {
      return n.lift(new E_(t, e));
    }
  );
}
var E_ = (function () {
    function t(e, r) {
      (this.windowSize = e), (this.startWindowEvery = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new C_(e, this.windowSize, this.startWindowEvery));
      }),
      t
    );
  })(),
  C_ = (function (t) {
    k(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.destination = r),
        (s.windowSize = n),
        (s.startWindowEvery = i),
        (s.windows = [new ve()]),
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
          var l = new ve();
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
  })(L);
function x_(t) {
  var e = ke,
    r = null,
    n = Number.POSITIVE_INFINITY;
  return (
    Le(arguments[3]) && (e = arguments[3]),
    Le(arguments[2])
      ? (e = arguments[2])
      : Er(arguments[2]) && (n = Number(arguments[2])),
    Le(arguments[1])
      ? (e = arguments[1])
      : Er(arguments[1]) && (r = Number(arguments[1])),
    function (s) {
      return s.lift(new k_(t, r, n, e));
    }
  );
}
var k_ = (function () {
    function t(e, r, n, i) {
      (this.windowTimeSpan = e),
        (this.windowCreationInterval = r),
        (this.maxWindowSize = n),
        (this.scheduler = i);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(
          new M_(
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
  I_ = (function (t) {
    k(e, t);
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
  })(ve),
  M_ = (function (t) {
    k(e, t);
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
        a.add(o.schedule(oh, n, u)), a.add(o.schedule(A_, i, l));
      } else {
        var h = { subscriber: a, window: c, windowTimeSpan: n };
        a.add(o.schedule(R_, n, h));
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
        var r = new I_();
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
  })(L);
function R_(t) {
  var e = t.subscriber,
    r = t.windowTimeSpan,
    n = t.window;
  n && e.closeWindow(n), (t.window = e.openWindow()), this.schedule(t, r);
}
function A_(t) {
  var e = t.windowTimeSpan,
    r = t.subscriber,
    n = t.scheduler,
    i = t.windowCreationInterval,
    s = r.openWindow(),
    o = this,
    a = { action: o, subscription: null },
    c = { subscriber: r, window: s, context: a };
  (a.subscription = n.schedule(oh, e, c)),
    o.add(a.subscription),
    o.schedule(t, i);
}
function oh(t) {
  var e = t.subscriber,
    r = t.window,
    n = t.context;
  n && n.action && n.subscription && n.action.remove(n.subscription),
    e.closeWindow(r);
}
function T_(t, e) {
  return function (r) {
    return r.lift(new N_(t, e));
  };
}
var N_ = (function () {
    function t(e, r) {
      (this.openings = e), (this.closingSelector = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new O_(e, this.openings, this.closingSelector));
      }),
      t
    );
  })(),
  O_ = (function (t) {
    k(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      return (
        (s.openings = n),
        (s.closingSelector = i),
        (s.contexts = []),
        s.add((s.openSubscription = mt(s, n, n))),
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
          } catch (m) {
            return this.error(m);
          }
          var u = new ve(),
            l = new se(),
            h = { window: u, subscription: l };
          this.contexts.push(h);
          var p = mt(this, a, h);
          p.closed
            ? this.closeWindow(this.contexts.length - 1)
            : ((p.context = h), l.add(p)),
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
  })(tr);
function L_(t) {
  return function (r) {
    return r.lift(new D_(t));
  };
}
var D_ = (function () {
    function t(e) {
      this.closingSelector = e;
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new j_(e, this.closingSelector));
      }),
      t
    );
  })(),
  j_ = (function (t) {
    k(e, t);
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
        var i = (this.window = new ve());
        this.destination.next(i);
        var s;
        try {
          var o = this.closingSelector;
          s = o();
        } catch (a) {
          this.destination.error(a), this.window.error(a);
          return;
        }
        this.add((this.closingNotification = mt(this, s)));
      }),
      e
    );
  })(tr);
function B_() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (r) {
    var n;
    typeof t[t.length - 1] == 'function' && (n = t.pop());
    var i = t;
    return r.lift(new P_(i, n));
  };
}
var P_ = (function () {
    function t(e, r) {
      (this.observables = e), (this.project = r);
    }
    return (
      (t.prototype.call = function (e, r) {
        return r.subscribe(new F_(e, this.observables, this.project));
      }),
      t
    );
  })(),
  F_ = (function (t) {
    k(e, t);
    function e(r, n, i) {
      var s = t.call(this, r) || this;
      (s.observables = n), (s.project = i), (s.toRespond = []);
      var o = n.length;
      s.values = new Array(o);
      for (var a = 0; a < o; a++) s.toRespond.push(a);
      for (var a = 0; a < o; a++) {
        var c = n[a];
        s.add(mt(s, c, void 0, a));
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
  })(tr);
function $_() {
  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
  return function (n) {
    return n.lift.call(Bl.apply(void 0, [n].concat(t)));
  };
}
function W_(t) {
  return function (e) {
    return e.lift(new Pl(t));
  };
}
const H_ = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        audit: Yl,
        auditTime: Hv,
        buffer: Vv,
        bufferCount: qv,
        bufferTime: Qv,
        bufferToggle: ty,
        bufferWhen: iy,
        catchError: ay,
        combineAll: ly,
        combineLatest: hy,
        concat: fy,
        concatAll: Ml,
        concatMap: Xl,
        concatMapTo: dy,
        count: py,
        debounce: vy,
        debounceTime: wy,
        defaultIfEmpty: wn,
        delay: ky,
        delayWhen: Ay,
        dematerialize: Ly,
        distinct: By,
        distinctUntilChanged: th,
        distinctUntilKeyChanged: Hy,
        elementAt: Gy,
        endWith: Zy,
        every: Qy,
        exhaust: Xy,
        exhaustMap: rh,
        expand: im,
        filter: Lt,
        finalize: am,
        find: lm,
        findIndex: fm,
        first: dm,
        flatMap: w1,
        groupBy: Mg,
        ignoreElements: pm,
        isEmpty: vm,
        last: Sm,
        map: qe,
        mapTo: Em,
        materialize: km,
        max: Tm,
        merge: Nm,
        mergeAll: ta,
        mergeMap: qt,
        mergeMapTo: Om,
        mergeScan: Lm,
        min: Bm,
        multicast: Jt,
        observeOn: Pg,
        onErrorResumeNext: Fm,
        pairwise: Hm,
        partition: Um,
        pluck: qm,
        publish: Gm,
        publishBehavior: Zm,
        publishLast: Qm,
        publishReplay: Ym,
        race: Km,
        reduce: Ni,
        refCount: Qo,
        repeat: Xm,
        repeatWhen: tw,
        retry: iw,
        retryWhen: aw,
        sample: lw,
        sampleTime: dw,
        scan: Fn,
        sequenceEqual: vw,
        share: Sw,
        shareReplay: Ew,
        single: xw,
        skip: Mw,
        skipLast: Tw,
        skipUntil: Lw,
        skipWhile: Bw,
        startWith: $w,
        subscribeOn: Hw,
        switchAll: qw,
        switchMap: Yr,
        switchMapTo: Jw,
        take: da,
        takeLast: Pn,
        takeUntil: Gw,
        takeWhile: Yw,
        tap: e_,
        throttle: n_,
        throttleTime: o_,
        throwIfEmpty: Ti,
        timeInterval: l_,
        timeout: p_,
        timeoutWith: sh,
        timestamp: b_,
        toArray: y_,
        window: m_,
        windowCount: S_,
        windowTime: x_,
        windowToggle: T_,
        windowWhen: L_,
        withLatestFrom: B_,
        zip: $_,
        zipAll: W_,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  pa = Gt(H_);
var Oi = {},
  We = {};
Object.defineProperty(We, '__esModule', { value: !0 });
We.ClientMessagePublishEvent =
  We.ClientMessageSetSessionConfig =
  We.ClientMessageGetSessionConfig =
  We.ClientMessageIsLinked =
  We.ClientMessageHostSession =
    void 0;
function V_(t) {
  return Object.assign({ type: 'HostSession' }, t);
}
We.ClientMessageHostSession = V_;
function z_(t) {
  return Object.assign({ type: 'IsLinked' }, t);
}
We.ClientMessageIsLinked = z_;
function U_(t) {
  return Object.assign({ type: 'GetSessionConfig' }, t);
}
We.ClientMessageGetSessionConfig = U_;
function q_(t) {
  return Object.assign({ type: 'SetSessionConfig' }, t);
}
We.ClientMessageSetSessionConfig = q_;
function J_(t) {
  return Object.assign({ type: 'PublishEvent' }, t);
}
We.ClientMessagePublishEvent = J_;
var ah = {};
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.RxWebSocket = t.ConnectionState = void 0);
  const e = gi,
    r = pa;
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
})(ah);
var Li = {};
Object.defineProperty(Li, '__esModule', { value: !0 });
Li.isServerMessageFail = void 0;
function G_(t) {
  return (
    t &&
    t.type === 'Fail' &&
    typeof t.id == 'number' &&
    typeof t.sessionId == 'string' &&
    typeof t.error == 'string'
  );
}
Li.isServerMessageFail = G_;
Object.defineProperty(Oi, '__esModule', { value: !0 });
Oi.WalletSDKConnection = void 0;
const Qe = gi,
  q = pa,
  $r = Mr,
  or = nn,
  Wr = We,
  Hr = kr,
  Mn = ah,
  so = Li,
  Bc = 1e4,
  Z_ = 6e4;
class Q_ {
  constructor(e, r, n, i, s = WebSocket) {
    (this.sessionId = e),
      (this.sessionKey = r),
      (this.diagnostic = i),
      (this.subscriptions = new Qe.Subscription()),
      (this.destroyed = !1),
      (this.lastHeartbeatResponse = 0),
      (this.nextReqId = (0, or.IntNumber)(1)),
      (this.connectedSubject = new Qe.BehaviorSubject(!1)),
      (this.linkedSubject = new Qe.BehaviorSubject(!1)),
      (this.sessionConfigSubject = new Qe.ReplaySubject(1));
    const o = new Mn.RxWebSocket(n + '/rpc', s);
    (this.ws = o),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, q.tap)((a) => {
              var c;
              return (c = this.diagnostic) === null || c === void 0
                ? void 0
                : c.log(Hr.EVENTS.CONNECTED_STATE_CHANGE, {
                    state: a,
                    sessionIdHash: $r.Session.hash(e),
                  });
            }),
            (0, q.skip)(1),
            (0, q.filter)(
              (a) => a === Mn.ConnectionState.DISCONNECTED && !this.destroyed
            ),
            (0, q.delay)(5e3),
            (0, q.filter)((a) => !this.destroyed),
            (0, q.flatMap)((a) => o.connect()),
            (0, q.retry)()
          )
          .subscribe()
      ),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, q.skip)(2),
            (0, q.switchMap)((a) =>
              (0, Qe.iif)(
                () => a === Mn.ConnectionState.CONNECTED,
                this.authenticate().pipe(
                  (0, q.tap)((c) => this.sendIsLinked()),
                  (0, q.tap)((c) => this.sendGetSessionConfig()),
                  (0, q.map)((c) => !0)
                ),
                (0, Qe.of)(!1)
              )
            ),
            (0, q.distinctUntilChanged)(),
            (0, q.catchError)((a) => (0, Qe.of)(!1))
          )
          .subscribe((a) => this.connectedSubject.next(a))
      ),
      this.subscriptions.add(
        o.connectionState$
          .pipe(
            (0, q.skip)(1),
            (0, q.switchMap)((a) =>
              (0, Qe.iif)(
                () => a === Mn.ConnectionState.CONNECTED,
                (0, Qe.timer)(0, Bc)
              )
            )
          )
          .subscribe((a) =>
            a === 0 ? this.updateLastHeartbeat() : this.heartbeat()
          )
      ),
      this.subscriptions.add(
        o.incomingData$
          .pipe((0, q.filter)((a) => a === 'h'))
          .subscribe((a) => this.updateLastHeartbeat())
      ),
      this.subscriptions.add(
        o.incomingJSONData$
          .pipe((0, q.filter)((a) => ['IsLinkedOK', 'Linked'].includes(a.type)))
          .subscribe((a) => {
            var c;
            const u = a;
            (c = this.diagnostic) === null ||
              c === void 0 ||
              c.log(Hr.EVENTS.LINKED, {
                sessionIdHash: $r.Session.hash(e),
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
            (0, q.filter)((a) =>
              ['GetSessionConfigOK', 'SessionConfigUpdated'].includes(a.type)
            )
          )
          .subscribe((a) => {
            var c;
            const u = a;
            (c = this.diagnostic) === null ||
              c === void 0 ||
              c.log(Hr.EVENTS.SESSION_CONFIG_RECEIVED, {
                sessionIdHash: $r.Session.hash(e),
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
      e.log(Hr.EVENTS.STARTED_CONNECTING, {
        sessionIdHash: $r.Session.hash(this.sessionId),
      }),
      this.ws.connect().subscribe();
  }
  destroy() {
    var e;
    this.subscriptions.unsubscribe(),
      this.ws.disconnect(),
      (e = this.diagnostic) === null ||
        e === void 0 ||
        e.log(Hr.EVENTS.DISCONNECTED, {
          sessionIdHash: $r.Session.hash(this.sessionId),
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
      (0, q.filter)((e) => e),
      (0, q.take)(1),
      (0, q.map)(() => {})
    );
  }
  get linked$() {
    return this.linkedSubject.asObservable();
  }
  get onceLinked$() {
    return this.linked$.pipe(
      (0, q.filter)((e) => e),
      (0, q.take)(1),
      (0, q.map)(() => {})
    );
  }
  get sessionConfig$() {
    return this.sessionConfigSubject.asObservable();
  }
  get incomingEvent$() {
    return this.ws.incomingJSONData$.pipe(
      (0, q.filter)((e) => {
        if (e.type !== 'Event') return !1;
        const r = e;
        return (
          typeof r.sessionId == 'string' &&
          typeof r.eventId == 'string' &&
          typeof r.event == 'string' &&
          typeof r.data == 'string'
        );
      }),
      (0, q.map)((e) => e)
    );
  }
  setSessionMetadata(e, r) {
    const n = (0, Wr.ClientMessageSetSessionConfig)({
      id: (0, or.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      metadata: { [e]: r },
    });
    return this.onceConnected$.pipe(
      (0, q.flatMap)((i) => this.makeRequest(n)),
      (0, q.map)((i) => {
        if ((0, so.isServerMessageFail)(i))
          throw new Error(i.error || 'failed to set session metadata');
      })
    );
  }
  publishEvent(e, r, n = !1) {
    const i = (0, Wr.ClientMessagePublishEvent)({
      id: (0, or.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      event: e,
      data: r,
      callWebhook: n,
    });
    return this.onceLinked$.pipe(
      (0, q.flatMap)((s) => this.makeRequest(i)),
      (0, q.map)((s) => {
        if ((0, so.isServerMessageFail)(s))
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
    if (Date.now() - this.lastHeartbeatResponse > Bc * 2) {
      this.ws.disconnect();
      return;
    }
    try {
      this.ws.sendData('h');
    } catch {}
  }
  makeRequest(e, r = Z_) {
    const n = e.id;
    try {
      this.sendData(e);
    } catch (i) {
      return (0, Qe.throwError)(i);
    }
    return this.ws.incomingJSONData$.pipe(
      (0, q.timeoutWith)(
        r,
        (0, Qe.throwError)(new Error(`request ${n} timed out`))
      ),
      (0, q.filter)((i) => i.id === n),
      (0, q.take)(1)
    );
  }
  authenticate() {
    const e = (0, Wr.ClientMessageHostSession)({
      id: (0, or.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
      sessionKey: this.sessionKey,
    });
    return this.makeRequest(e).pipe(
      (0, q.map)((r) => {
        if ((0, so.isServerMessageFail)(r))
          throw new Error(r.error || 'failed to authentcate');
      })
    );
  }
  sendIsLinked() {
    const e = (0, Wr.ClientMessageIsLinked)({
      id: (0, or.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
    });
    this.sendData(e);
  }
  sendGetSessionConfig() {
    const e = (0, Wr.ClientMessageGetSessionConfig)({
      id: (0, or.IntNumber)(this.nextReqId++),
      sessionId: this.sessionId,
    });
    this.sendData(e);
  }
}
Oi.WalletSDKConnection = Q_;
var Cr = {};
Object.defineProperty(Cr, '__esModule', { value: !0 });
Cr.decrypt = Cr.encrypt = void 0;
const $n = O;
async function Y_(t, e) {
  if (e.length !== 64) throw Error('secret must be 256 bits');
  const r = crypto.getRandomValues(new Uint8Array(12)),
    n = await crypto.subtle.importKey(
      'raw',
      (0, $n.hexStringToUint8Array)(e),
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
    h = new Uint8Array([...r, ...u, ...l]);
  return (0, $n.uint8ArrayToHex)(h);
}
Cr.encrypt = Y_;
function K_(t, e) {
  if (e.length !== 64) throw Error('secret must be 256 bits');
  return new Promise((r, n) => {
    (async function () {
      const i = await crypto.subtle.importKey(
          'raw',
          (0, $n.hexStringToUint8Array)(e),
          { name: 'aes-gcm' },
          !1,
          ['encrypt', 'decrypt']
        ),
        s = (0, $n.hexStringToUint8Array)(t),
        o = s.slice(0, 12),
        a = s.slice(12, 28),
        c = s.slice(28),
        u = new Uint8Array([...c, ...a]),
        l = { name: 'AES-GCM', iv: new Uint8Array(o) };
      try {
        const h = await window.crypto.subtle.decrypt(l, i, u),
          p = new TextDecoder();
        r(p.decode(h));
      } catch (h) {
        n(h);
      }
    })();
  });
}
Cr.decrypt = K_;
var Di = {},
  ji = {};
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
})(ji);
Object.defineProperty(Di, '__esModule', { value: !0 });
Di.Web3RequestCanceledMessage = void 0;
const X_ = ji;
function e2(t) {
  return { type: X_.RelayMessageType.WEB3_REQUEST_CANCELED, id: t };
}
Di.Web3RequestCanceledMessage = e2;
var Bi = {};
Object.defineProperty(Bi, '__esModule', { value: !0 });
Bi.Web3RequestMessage = void 0;
const t2 = ji;
function r2(t) {
  return Object.assign({ type: t2.RelayMessageType.WEB3_REQUEST }, t);
}
Bi.Web3RequestMessage = r2;
var xr = {};
Object.defineProperty(xr, '__esModule', { value: !0 });
xr.isWeb3ResponseMessage = xr.Web3ResponseMessage = void 0;
const ch = ji;
function n2(t) {
  return Object.assign({ type: ch.RelayMessageType.WEB3_RESPONSE }, t);
}
xr.Web3ResponseMessage = n2;
function i2(t) {
  return t && t.type === ch.RelayMessageType.WEB3_RESPONSE;
}
xr.isWeb3ResponseMessage = i2;
var s2 =
    (N && N.__createBinding) ||
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
  o2 =
    (N && N.__setModuleDefault) ||
    (Object.create
      ? function (t, e) {
          Object.defineProperty(t, 'default', { enumerable: !0, value: e });
        }
      : function (t, e) {
          t.default = e;
        }),
  uh =
    (N && N.__decorate) ||
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
  a2 =
    (N && N.__importStar) ||
    function (t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (t != null)
        for (var r in t)
          r !== 'default' &&
            Object.prototype.hasOwnProperty.call(t, r) &&
            s2(e, t, r);
      return o2(e, t), e;
    },
  c2 =
    (N && N.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
Object.defineProperty(Ri, '__esModule', { value: !0 });
Ri.WalletSDKRelay = void 0;
const lh = c2(Ai),
  Ft = gi,
  fe = pa,
  Se = kr,
  u2 = Oi,
  ar = Kr,
  l2 = nn,
  te = O,
  xt = a2(Cr),
  kt = Mr,
  Rn = Xe,
  ye = Jn,
  h2 = Di,
  f2 = Bi,
  Fe = X,
  Re = xr;
class Ke extends Rn.WalletSDKRelayAbstract {
  constructor(e) {
    var r;
    super(),
      (this.accountsCallback = null),
      (this.chainCallback = null),
      (this.dappDefaultChainSubject = new Ft.BehaviorSubject(1)),
      (this.dappDefaultChain = 1),
      (this.appName = ''),
      (this.appLogoUrl = null),
      (this.subscriptions = new Ft.Subscription()),
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
        kt.Session.load(this.storage) || new kt.Session(this.storage).save(),
      r = new u2.WalletSDKConnection(
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
            i.log(Se.EVENTS.GENERAL_ERROR, {
              message: 'error while invoking session config callback',
            });
        },
      })
    ),
      this.subscriptions.add(
        r.incomingEvent$
          .pipe((0, fe.filter)((i) => i.event === 'Web3Response'))
          .subscribe({ next: this.handleIncomingEvent })
      ),
      this.subscriptions.add(
        r.linked$
          .pipe(
            (0, fe.skip)(1),
            (0, fe.tap)((i) => {
              var s;
              this.isLinked = i;
              const o = this.storage.getItem(Rn.LOCAL_STORAGE_ADDRESSES_KEY);
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
                    s.log(Se.EVENTS.UNLINKED_ERROR_STATE, { sessionIdHash: u });
                }
              }
            })
          )
          .subscribe()
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, fe.filter)(
              (i) => !!i.metadata && i.metadata.__destroyed === '1'
            )
          )
          .subscribe(() => {
            var i;
            const s = r.isDestroyed;
            return (
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Se.EVENTS.METADATA_DESTROYED, {
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
            (0, fe.filter)(
              (i) => i.metadata && i.metadata.WalletUsername !== void 0
            )
          )
          .pipe(
            (0, fe.mergeMap)((i) =>
              xt.decrypt(i.metadata.WalletUsername, e.secret)
            )
          )
          .subscribe({
            next: (i) => {
              this.storage.setItem(Rn.WALLET_USER_NAME_KEY, i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Se.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'username',
                });
            },
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, fe.filter)(
              (i) => i.metadata && i.metadata.AppVersion !== void 0
            )
          )
          .pipe(
            (0, fe.mergeMap)((i) => xt.decrypt(i.metadata.AppVersion, e.secret))
          )
          .subscribe({
            next: (i) => {
              this.storage.setItem(Rn.APP_VERSION_KEY, i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Se.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'appversion',
                });
            },
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, fe.filter)(
              (i) =>
                i.metadata &&
                i.metadata.ChainId !== void 0 &&
                i.metadata.JsonRpcUrl !== void 0
            )
          )
          .pipe(
            (0, fe.mergeMap)((i) =>
              (0, Ft.zip)(
                xt.decrypt(i.metadata.ChainId, e.secret),
                xt.decrypt(i.metadata.JsonRpcUrl, e.secret)
              )
            )
          )
          .pipe((0, fe.distinctUntilChanged)())
          .subscribe({
            next: ([i, s]) => {
              this.chainCallback && this.chainCallback(i, s);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Se.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'chainId|jsonRpcUrl',
                });
            },
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, fe.filter)(
              (i) => i.metadata && i.metadata.EthereumAddress !== void 0
            )
          )
          .pipe(
            (0, fe.mergeMap)((i) =>
              xt.decrypt(i.metadata.EthereumAddress, e.secret)
            )
          )
          .subscribe({
            next: (i) => {
              this.accountsCallback && this.accountsCallback([i]),
                Ke.accountRequestCallbackIds.size > 0 &&
                  (Array.from(Ke.accountRequestCallbackIds.values()).forEach(
                    (s) => {
                      const o = (0, Re.Web3ResponseMessage)({
                        id: s,
                        response: (0, Fe.RequestEthereumAccountsResponse)([i]),
                      });
                      this.invokeCallback(
                        Object.assign(Object.assign({}, o), { id: s })
                      );
                    }
                  ),
                  Ke.accountRequestCallbackIds.clear());
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Se.EVENTS.GENERAL_ERROR, {
                  message: 'Had error decrypting',
                  value: 'selectedAddress',
                });
            },
          })
      ),
      this.subscriptions.add(
        r.sessionConfig$
          .pipe(
            (0, fe.filter)((i) => i.metadata && i.metadata.AppSrc !== void 0)
          )
          .pipe(
            (0, fe.mergeMap)((i) => xt.decrypt(i.metadata.AppSrc, e.secret))
          )
          .subscribe({
            next: (i) => {
              this.ui.setAppSrc(i);
            },
            error: () => {
              var i;
              (i = this.diagnostic) === null ||
                i === void 0 ||
                i.log(Se.EVENTS.GENERAL_ERROR, {
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
        (0, fe.timeout)(1e3),
        (0, fe.catchError)((e) => (0, Ft.of)(null))
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
              r.log(Se.EVENTS.GENERAL_ERROR, {
                message: 'Had error unsubscribing',
              });
          }
          (n = this.diagnostic) === null ||
            n === void 0 ||
            n.log(Se.EVENTS.SESSION_STATE_CHANGE, {
              method: 'relay::resetAndReload',
              sessionMetadataChange: '__destroyed, 1',
              sessionIdHash: this.getSessionIdHash(),
            }),
            this.connection.destroy();
          const o = kt.Session.load(this.storage);
          if (
            ((o == null ? void 0 : o.id) === this._session.id
              ? this.storage.clear()
              : o &&
                ((i = this.diagnostic) === null ||
                  i === void 0 ||
                  i.log(Se.EVENTS.SKIPPED_CLEARING_SESSION, {
                    sessionIdHash: this.getSessionIdHash(),
                    storedSessionIdHash: kt.Session.hash(o.id),
                  })),
            this._reloadOnDisconnect)
          ) {
            this.ui.reloadUI();
            return;
          }
          this.accountsCallback && this.accountsCallback([], !0),
            (this.subscriptions = new Ft.Subscription());
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
            r.log(Se.EVENTS.FAILURE, {
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
      method: ye.Web3Method.signEthereumMessage,
      params: {
        message: (0, te.hexStringFromBuffer)(e, !0),
        address: r,
        addPrefix: n,
        typedDataJson: i || null,
      },
    });
  }
  ethereumAddressFromSignedMessage(e, r, n) {
    return this.sendRequest({
      method: ye.Web3Method.ethereumAddressFromSignedMessage,
      params: {
        message: (0, te.hexStringFromBuffer)(e, !0),
        signature: (0, te.hexStringFromBuffer)(r, !0),
        addPrefix: n,
      },
    });
  }
  signEthereumTransaction(e) {
    return this.sendRequest({
      method: ye.Web3Method.signEthereumTransaction,
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: (0, te.bigIntStringFromBN)(e.weiValue),
        data: (0, te.hexStringFromBuffer)(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei
          ? (0, te.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxFeePerGas: e.gasPriceInWei
          ? (0, te.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxPriorityFeePerGas: e.gasPriceInWei
          ? (0, te.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        gasLimit: e.gasLimit ? (0, te.bigIntStringFromBN)(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !1,
      },
    });
  }
  signAndSubmitEthereumTransaction(e) {
    return this.sendRequest({
      method: ye.Web3Method.signEthereumTransaction,
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: (0, te.bigIntStringFromBN)(e.weiValue),
        data: (0, te.hexStringFromBuffer)(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei
          ? (0, te.bigIntStringFromBN)(e.gasPriceInWei)
          : null,
        maxFeePerGas: e.maxFeePerGas
          ? (0, te.bigIntStringFromBN)(e.maxFeePerGas)
          : null,
        maxPriorityFeePerGas: e.maxPriorityFeePerGas
          ? (0, te.bigIntStringFromBN)(e.maxPriorityFeePerGas)
          : null,
        gasLimit: e.gasLimit ? (0, te.bigIntStringFromBN)(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !0,
      },
    });
  }
  submitEthereumTransaction(e, r) {
    return this.sendRequest({
      method: ye.Web3Method.submitEthereumTransaction,
      params: {
        signedTransaction: (0, te.hexStringFromBuffer)(e, !0),
        chainId: r,
      },
    });
  }
  scanQRCode(e) {
    return this.sendRequest({
      method: ye.Web3Method.scanQRCode,
      params: { regExp: e },
    });
  }
  getQRCodeUrl() {
    return (0, te.createQrUrl)(
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
      method: ye.Web3Method.generic,
      params: { action: r, data: e },
    });
  }
  sendGenericMessage(e) {
    return this.sendRequest(e);
  }
  sendRequest(e) {
    let r = null;
    const n = (0, te.randomBytesHex)(8),
      i = (o) => {
        this.publishWeb3RequestCanceledEvent(n),
          this.handleErrorResponse(n, e.method, o),
          r == null || r();
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
            if ((r == null || r(), c.errorMessage))
              return a(new Error(c.errorMessage));
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
    const i = (0, f2.Web3RequestMessage)({ id: e, request: r }),
      s = kt.Session.load(this.storage);
    (n = this.diagnostic) === null ||
      n === void 0 ||
      n.log(Se.EVENTS.WEB3_REQUEST, {
        eventId: i.id,
        method: `relay::${i.request.method}`,
        sessionIdHash: this.getSessionIdHash(),
        storedSessionIdHash: s ? kt.Session.hash(s.id) : '',
        isSessionMismatched: (
          (s == null ? void 0 : s.id) !== this._session.id
        ).toString(),
      }),
      this.subscriptions.add(
        this.publishEvent('Web3Request', i, !0).subscribe({
          next: (o) => {
            var a;
            (a = this.diagnostic) === null ||
              a === void 0 ||
              a.log(Se.EVENTS.WEB3_REQUEST_PUBLISHED, {
                eventId: i.id,
                method: `relay::${i.request.method}`,
                sessionIdHash: this.getSessionIdHash(),
                storedSessionIdHash: s ? kt.Session.hash(s.id) : '',
                isSessionMismatched: (
                  (s == null ? void 0 : s.id) !== this._session.id
                ).toString(),
              });
          },
          error: (o) => {
            this.handleWeb3ResponseMessage(
              (0, Re.Web3ResponseMessage)({
                id: i.id,
                response: { method: i.request.method, errorMessage: o.message },
              })
            );
          },
        })
      );
  }
  publishWeb3RequestCanceledEvent(e) {
    const r = (0, h2.Web3RequestCanceledMessage)(e);
    this.subscriptions.add(
      this.publishEvent('Web3RequestCanceled', r, !1).subscribe()
    );
  }
  publishEvent(e, r, n) {
    const i = this.session.secret;
    return new Ft.Observable((s) => {
      xt.encrypt(
        JSON.stringify(
          Object.assign(Object.assign({}, r), { origin: location.origin })
        ),
        i
      ).then((o) => {
        s.next(o), s.complete();
      });
    }).pipe((0, fe.mergeMap)((s) => this.connection.publishEvent(e, s, n)));
  }
  handleIncomingEvent(e) {
    try {
      this.subscriptions.add(
        (0, Ft.from)(xt.decrypt(e.data, this.session.secret))
          .pipe((0, fe.map)((r) => JSON.parse(r)))
          .subscribe({
            next: (r) => {
              const n = (0, Re.isWeb3ResponseMessage)(r) ? r : null;
              n && this.handleWeb3ResponseMessage(n);
            },
            error: () => {
              var r;
              (r = this.diagnostic) === null ||
                r === void 0 ||
                r.log(Se.EVENTS.GENERAL_ERROR, {
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
        r.log(Se.EVENTS.WEB3_RESPONSE, {
          eventId: e.id,
          method: `relay::${n.method}`,
          sessionIdHash: this.getSessionIdHash(),
        }),
      (0, Fe.isRequestEthereumAccountsResponse)(n))
    ) {
      Ke.accountRequestCallbackIds.forEach((i) =>
        this.invokeCallback(Object.assign(Object.assign({}, e), { id: i }))
      ),
        Ke.accountRequestCallbackIds.clear();
      return;
    }
    this.invokeCallback(e);
  }
  handleErrorResponse(e, r, n, i) {
    var s;
    const o =
      (s = n == null ? void 0 : n.message) !== null && s !== void 0
        ? s
        : (0, ar.standardErrorMessage)(i);
    this.handleWeb3ResponseMessage(
      (0, Re.Web3ResponseMessage)({
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
        method: ye.Web3Method.requestEthereumAccounts,
        params: { appName: this.appName, appLogoUrl: this.appLogoUrl || null },
      },
      r = (0, te.randomBytesHex)(8),
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
          ((a = window == null ? void 0 : window.navigator) === null ||
          a === void 0
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
            (0, te.isInIFrame)() && window.top
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
              (0, Re.Web3ResponseMessage)({
                id: r,
                response: (0, Fe.RequestEthereumAccountsResponse)(l),
              })
            );
          };
          this.ui.requestEthereumAccounts({ onCancel: n, onAccounts: u });
        } else {
          const u = ar.standardErrors.provider.userRejectedRequest(
            'User denied account authorization'
          );
          this.ui.requestEthereumAccounts({ onCancel: () => n(u) });
        }
        Ke.accountRequestCallbackIds.add(r),
          !this.ui.inlineAccountsResponse() &&
            !this.ui.isStandalone() &&
            this.publishWeb3RequestEvent(r, e);
      }),
      cancel: n,
    };
  }
  selectProvider(e) {
    const r = {
        method: ye.Web3Method.selectProvider,
        params: { providerOptions: e },
      },
      n = (0, te.randomBytesHex)(8),
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
              (0, Re.Web3ResponseMessage)({
                id: n,
                response: (0, Fe.SelectProviderResponse)(
                  l2.ProviderType.Unselected
                ),
              })
            );
          },
          u = (l) => {
            this.handleWeb3ResponseMessage(
              (0, Re.Web3ResponseMessage)({
                id: n,
                response: (0, Fe.SelectProviderResponse)(l),
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
      method: ye.Web3Method.watchAsset,
      params: {
        type: e,
        options: { address: r, symbol: n, decimals: i, image: s },
        chainId: o,
      },
    };
    let c = null;
    const u = (0, te.randomBytesHex)(8),
      l = (p) => {
        this.publishWeb3RequestCanceledEvent(u),
          this.handleErrorResponse(u, a.method, p),
          c == null || c();
      };
    this.ui.inlineWatchAsset() ||
      (c = this.ui.showConnecting({
        isUnlinkedErrorState: this.isUnlinkedErrorState,
        onCancel: l,
        onResetConnection: this.resetAndReload,
      }));
    const h = new Promise((p, m) => {
      this.relayEventManager.callbacks.set(u, (S) => {
        if ((c == null || c(), S.errorMessage))
          return m(new Error(S.errorMessage));
        p(S);
      });
      const C = (S) => {
          this.handleWeb3ResponseMessage(
            (0, Re.Web3ResponseMessage)({
              id: u,
              response: (0, Fe.WatchAssetReponse)(!1),
            })
          );
        },
        x = () => {
          this.handleWeb3ResponseMessage(
            (0, Re.Web3ResponseMessage)({
              id: u,
              response: (0, Fe.WatchAssetReponse)(!0),
            })
          );
        };
      this.ui.inlineWatchAsset() &&
        this.ui.watchAsset({
          onApprove: x,
          onCancel: C,
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
    return { cancel: l, promise: h };
  }
  addEthereumChain(e, r, n, i, s, o) {
    const a = {
      method: ye.Web3Method.addEthereumChain,
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
    const u = (0, te.randomBytesHex)(8),
      l = (p) => {
        this.publishWeb3RequestCanceledEvent(u),
          this.handleErrorResponse(u, a.method, p),
          c == null || c();
      };
    return (
      this.ui.inlineAddEthereumChain(e) ||
        (c = this.ui.showConnecting({
          isUnlinkedErrorState: this.isUnlinkedErrorState,
          onCancel: l,
          onResetConnection: this.resetAndReload,
        })),
      {
        promise: new Promise((p, m) => {
          this.relayEventManager.callbacks.set(u, (S) => {
            if ((c == null || c(), S.errorMessage))
              return m(new Error(S.errorMessage));
            p(S);
          });
          const C = (S) => {
              this.handleWeb3ResponseMessage(
                (0, Re.Web3ResponseMessage)({
                  id: u,
                  response: (0, Fe.AddEthereumChainResponse)({
                    isApproved: !1,
                    rpcUrl: '',
                  }),
                })
              );
            },
            x = (S) => {
              this.handleWeb3ResponseMessage(
                (0, Re.Web3ResponseMessage)({
                  id: u,
                  response: (0, Fe.AddEthereumChainResponse)({
                    isApproved: !0,
                    rpcUrl: S,
                  }),
                })
              );
            };
          this.ui.inlineAddEthereumChain(e) &&
            this.ui.addEthereumChain({
              onCancel: C,
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
        method: ye.Web3Method.switchEthereumChain,
        params: Object.assign({ chainId: e }, { address: r }),
      },
      i = (0, te.randomBytesHex)(8),
      s = (a) => {
        this.publishWeb3RequestCanceledEvent(i),
          this.handleErrorResponse(i, n.method, a);
      };
    return {
      promise: new Promise((a, c) => {
        this.relayEventManager.callbacks.set(i, (h) => {
          if ((0, Fe.isErrorResponse)(h) && h.errorCode)
            return c(
              ar.standardErrors.provider.custom({
                code: h.errorCode,
                message:
                  'Unrecognized chain ID. Try adding the chain using addEthereumChain first.',
              })
            );
          if (h.errorMessage) return c(new Error(h.errorMessage));
          a(h);
        });
        const u = (h) => {
            var p;
            if (h) {
              const m =
                (p = (0, ar.getErrorCode)(h)) !== null && p !== void 0
                  ? p
                  : ar.standardErrorCodes.provider.unsupportedChain;
              this.handleErrorResponse(
                i,
                ye.Web3Method.switchEthereumChain,
                h instanceof Error
                  ? h
                  : ar.standardErrors.provider.unsupportedChain(e),
                m
              );
            } else
              this.handleWeb3ResponseMessage(
                (0, Re.Web3ResponseMessage)({
                  id: i,
                  response: (0, Fe.SwitchEthereumChainResponse)({
                    isApproved: !1,
                    rpcUrl: '',
                  }),
                })
              );
          },
          l = (h) => {
            this.handleWeb3ResponseMessage(
              (0, Re.Web3ResponseMessage)({
                id: i,
                response: (0, Fe.SwitchEthereumChainResponse)({
                  isApproved: !0,
                  rpcUrl: h,
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
    return kt.Session.hash(this._session.id);
  }
  sendRequestStandalone(e, r) {
    const n = (s) => {
        this.handleErrorResponse(e, r.method, s);
      },
      i = (s) => {
        this.handleWeb3ResponseMessage(
          (0, Re.Web3ResponseMessage)({ id: e, response: s })
        );
      };
    switch (r.method) {
      case ye.Web3Method.signEthereumMessage:
        this.ui.signEthereumMessage({ request: r, onSuccess: i, onCancel: n });
        break;
      case ye.Web3Method.signEthereumTransaction:
        this.ui.signEthereumTransaction({
          request: r,
          onSuccess: i,
          onCancel: n,
        });
        break;
      case ye.Web3Method.submitEthereumTransaction:
        this.ui.submitEthereumTransaction({
          request: r,
          onSuccess: i,
          onCancel: n,
        });
        break;
      case ye.Web3Method.ethereumAddressFromSignedMessage:
        this.ui.ethereumAddressFromSignedMessage({ request: r, onSuccess: i });
        break;
      default:
        n();
        break;
    }
  }
  onSessionConfigChanged(e) {}
}
Ke.accountRequestCallbackIds = new Set();
uh([lh.default], Ke.prototype, 'resetAndReload', null);
uh([lh.default], Ke.prototype, 'handleIncomingEvent', null);
Ri.WalletSDKRelay = Ke;
var Pi = {};
Object.defineProperty(Pi, '__esModule', { value: !0 });
Pi.WalletSDKRelayEventManager = void 0;
const d2 = O;
class p2 {
  constructor() {
    (this._nextRequestId = 0), (this.callbacks = new Map());
  }
  makeRequestId() {
    this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
    const e = this._nextRequestId,
      r = (0, d2.prepend0x)(e.toString(16));
    return this.callbacks.get(r) && this.callbacks.delete(r), e;
  }
}
Pi.WalletSDKRelayEventManager = p2;
Object.defineProperty(Ur, '__esModule', { value: !0 });
Ur.CoinbaseWalletSDK = void 0;
const b2 = Vn,
  g2 = zn,
  v2 = Un,
  y2 = br,
  m2 = di,
  w2 = Ri,
  _2 = Pi,
  S2 = O,
  hh = Ir;
class Fi {
  constructor(e) {
    var r, n, i;
    (this._appName = ''),
      (this._appLogoUrl = null),
      (this._relay = null),
      (this._relayEventManager = null);
    const s = e.linkAPIUrl || g2.LINK_API_URL;
    let o;
    if (
      (e.uiConstructor
        ? (o = e.uiConstructor)
        : (o = (u) => new m2.WalletSDKUI(u)),
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
    (this._storage = new v2.ScopedLocalStorage(`-walletlink:${c}`)),
      this._storage.setItem('version', Fi.VERSION),
      !(this.walletExtension || this.coinbaseBrowser) &&
        ((this._relayEventManager = new _2.WalletSDKRelayEventManager()),
        (this._relay = new w2.WalletSDKRelay({
          linkAPIUrl: s,
          version: hh.LIB_VERSION,
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
      new y2.CoinbaseWalletProvider({
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
      (this._appLogoUrl = r || (0, S2.getFavicon)());
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
    return (0, b2.walletLogo)(e, r);
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
Ur.CoinbaseWalletSDK = Fi;
Fi.VERSION = hh.LIB_VERSION;
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.CoinbaseWalletProvider = t.CoinbaseWalletSDK = void 0);
  const e = Ur,
    r = br;
  var n = Ur;
  Object.defineProperty(t, 'CoinbaseWalletSDK', {
    enumerable: !0,
    get: function () {
      return n.CoinbaseWalletSDK;
    },
  });
  var i = br;
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
})(Eo);
const E2 = fh(Eo),
  j2 = yh({ __proto__: null, default: E2 }, [Eo]);
export { j2 as i };
