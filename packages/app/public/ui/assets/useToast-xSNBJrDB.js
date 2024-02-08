import{a as s}from"./component-GWnuE1KC.js";import{r as m}from"./index-4g5l5LRQ.js";import{I as c}from"./Icon-yMpA7scP.js";import{I as D}from"./IconCheck-XJaya_tx.js";import{I}from"./IconHelpCircle-FBk8PWX2.js";import{I as E}from"./IconAlertCircle-GEP1tBG_.js";import{c as M}from"./createReactComponent-rTvSjvh2.js";var h=M("alert-triangle","IconAlertTriangle",[["path",{d:"M12 9v4",key:"svg-0"}],["path",{d:"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z",key:"svg-1"}],["path",{d:"M12 16h.01",key:"svg-2"}]]);const g=3,O=2e3,i={ADD_TOAST:"ADD_TOAST",UPDATE_TOAST:"UPDATE_TOAST",DISMISS_TOAST:"DISMISS_TOAST",REMOVE_TOAST:"REMOVE_TOAST"};let l=0;function v(){return l=(l+1)%Number.MAX_VALUE,l.toString()}const f=new Map;function d(e,t=O){if(f.has(e))return;const n=setTimeout(()=>{f.delete(e),T({type:i.REMOVE_TOAST,toastId:e})},t);f.set(e,n)}const y=(e,t)=>{switch(t.type){case i.ADD_TOAST:return{...e,toasts:[t.toast,...e.toasts].slice(0,t.toast.limit||g)};case i.UPDATE_TOAST:return{...e,toasts:e.toasts.map(n=>n.id===t.toast.id?{...n,...t.toast}:n)};case i.DISMISS_TOAST:{const{toastId:n,duration:r=O}=t;return n?d(n,r):e.toasts.forEach(({id:a})=>{d(a,r)}),{...e,toasts:e.toasts.map(a=>a.id===n||!n?{...a,open:!1}:a)}}case i.REMOVE_TOAST:return{...e,toasts:t.toastId?e.toasts.filter(n=>n.id!==t.toastId):[]};default:return e}},u=[];let S={toasts:[]};function T(e){S=y(S,e),u.forEach(t=>t(S))}function o(e){const t=v(),n=e.duration||O;function r(A){T({type:i.UPDATE_TOAST,toast:{...A,id:t}})}function a(){T({duration:e.duration,type:i.DISMISS_TOAST,toastId:t})}return T({type:i.ADD_TOAST,toast:{...e,id:t,open:!0,duration:n,onOpenChange:A=>{A||a()}}}),{id:t,dismiss:a,update:r}}function k(){const[e,t]=m.useState(S);return m.useEffect(()=>(u.push(t),()=>{const n=u.indexOf(t);n>-1&&u.splice(n,1)}),[e]),{...e,toast:o,dismiss:n=>{T({type:i.DISMISS_TOAST,toastId:n})}}}let _=o;_=Object.assign(_,{success:(e,t)=>{o({...t,title:e,variant:"success",icon:(t==null?void 0:t.icon)||s(c,{icon:D})})},base:(e,t)=>{o({...t,title:e,variant:"base",icon:(t==null?void 0:t.icon)||s(c,{icon:I})})},info:(e,t)=>{o({...t,title:e,variant:"info",icon:(t==null?void 0:t.icon)||s(c,{icon:I})})},warning:(e,t)=>{o({...t,title:e,variant:"warning",icon:(t==null?void 0:t.icon)||s(c,{icon:E})})},error:(e,t)=>{o({...t,title:e,variant:"error",icon:(t==null?void 0:t.icon)||s(c,{icon:h})})}});export{_ as t,k as u};
