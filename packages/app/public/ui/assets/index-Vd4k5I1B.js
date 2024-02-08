import{$ as x,_ as l,a as I}from"./index-PzP5oypK.js";import{r as t}from"./index-4g5l5LRQ.js";import{$ as u}from"./index-pbeB-vsG.js";import{$ as M,c as F}from"./index-uUL8xeMH.js";import{$ as m}from"./index-i6iaJq_c.js";import{$ as N}from"./index-uCXP6D8h.js";import{$ as T,a as w}from"./index-K96gYvhf.js";import{$ as y,h as k,a as L,b as S}from"./Combination-3g16u1mX.js";import{$ as D}from"./index-YxBGvUbs.js";import{$ as p}from"./index-OvZZPJzn.js";const v="Dialog",[R,fe]=M(v),[G,i]=R(v),W=e=>{const{__scopeDialog:a,children:n,open:r,defaultOpen:c,onOpenChange:o,modal:s=!0}=e,d=t.useRef(null),$=t.useRef(null),[b=!1,g]=N({prop:r,defaultProp:c,onChange:o});return t.createElement(G,{scope:a,triggerRef:d,contentRef:$,contentId:m(),titleId:m(),descriptionId:m(),open:b,onOpenChange:g,onOpenToggle:t.useCallback(()=>g(A=>!A),[g]),modal:s},n)},K="DialogTrigger",U=t.forwardRef((e,a)=>{const{__scopeDialog:n,...r}=e,c=i(K,n),o=x(a,c.triggerRef);return t.createElement(p.button,l({type:"button","aria-haspopup":"dialog","aria-expanded":c.open,"aria-controls":c.contentId,"data-state":E(c.open)},r,{ref:o,onClick:u(e.onClick,c.onOpenToggle)}))}),C="DialogPortal",[V,O]=R(C,{forceMount:void 0}),Y=e=>{const{__scopeDialog:a,forceMount:n,children:r,container:c}=e,o=i(C,a);return t.createElement(V,{scope:a,forceMount:n},t.Children.map(r,s=>t.createElement(D,{present:n||o.open},t.createElement(T,{asChild:!0,container:c},s))))},_="DialogOverlay",Z=t.forwardRef((e,a)=>{const n=O(_,e.__scopeDialog),{forceMount:r=n.forceMount,...c}=e,o=i(_,e.__scopeDialog);return o.modal?t.createElement(D,{present:r||o.open},t.createElement(j,l({},c,{ref:a}))):null}),j=t.forwardRef((e,a)=>{const{__scopeDialog:n,...r}=e,c=i(_,n);return t.createElement(y,{as:I,allowPinchZoom:!0,shards:[c.contentRef]},t.createElement(p.div,l({"data-state":E(c.open)},r,{ref:a,style:{pointerEvents:"auto",...r.style}})))}),f="DialogContent",q=t.forwardRef((e,a)=>{const n=O(f,e.__scopeDialog),{forceMount:r=n.forceMount,...c}=e,o=i(f,e.__scopeDialog);return t.createElement(D,{present:r||o.open},o.modal?t.createElement(z,l({},c,{ref:a})):t.createElement(B,l({},c,{ref:a})))}),z=t.forwardRef((e,a)=>{const n=i(f,e.__scopeDialog),r=t.useRef(null),c=x(a,n.contentRef,r);return t.useEffect(()=>{const o=r.current;if(o)return k(o)},[]),t.createElement(h,l({},e,{ref:c,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:u(e.onCloseAutoFocus,o=>{var s;o.preventDefault(),(s=n.triggerRef.current)===null||s===void 0||s.focus()}),onPointerDownOutside:u(e.onPointerDownOutside,o=>{const s=o.detail.originalEvent,d=s.button===0&&s.ctrlKey===!0;(s.button===2||d)&&o.preventDefault()}),onFocusOutside:u(e.onFocusOutside,o=>o.preventDefault())}))}),B=t.forwardRef((e,a)=>{const n=i(f,e.__scopeDialog),r=t.useRef(!1),c=t.useRef(!1);return t.createElement(h,l({},e,{ref:a,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:o=>{var s;if((s=e.onCloseAutoFocus)===null||s===void 0||s.call(e,o),!o.defaultPrevented){var d;r.current||(d=n.triggerRef.current)===null||d===void 0||d.focus(),o.preventDefault()}r.current=!1,c.current=!1},onInteractOutside:o=>{var s,d;(s=e.onInteractOutside)===null||s===void 0||s.call(e,o),o.defaultPrevented||(r.current=!0,o.detail.originalEvent.type==="pointerdown"&&(c.current=!0));const $=o.target;((d=n.triggerRef.current)===null||d===void 0?void 0:d.contains($))&&o.preventDefault(),o.detail.originalEvent.type==="focusin"&&c.current&&o.preventDefault()}}))}),h=t.forwardRef((e,a)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:c,onCloseAutoFocus:o,...s}=e,d=i(f,n),$=t.useRef(null),b=x(a,$);return L(),t.createElement(t.Fragment,null,t.createElement(S,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:c,onUnmountAutoFocus:o},t.createElement(w,l({role:"dialog",id:d.contentId,"aria-describedby":d.descriptionId,"aria-labelledby":d.titleId,"data-state":E(d.open)},s,{ref:b,onDismiss:()=>d.onOpenChange(!1)}))),!1)}),P="DialogTitle",H=t.forwardRef((e,a)=>{const{__scopeDialog:n,...r}=e,c=i(P,n);return t.createElement(p.h2,l({id:c.titleId},r,{ref:a}))}),J="DialogDescription",Q=t.forwardRef((e,a)=>{const{__scopeDialog:n,...r}=e,c=i(J,n);return t.createElement(p.p,l({id:c.descriptionId},r,{ref:a}))}),X="DialogClose",ee=t.forwardRef((e,a)=>{const{__scopeDialog:n,...r}=e,c=i(X,n);return t.createElement(p.button,l({type:"button"},r,{ref:a,onClick:u(e.onClick,()=>c.onOpenChange(!1))}))});function E(e){return e?"open":"closed"}const te="DialogTitleWarning",[ue,pe]=F(te,{contentName:f,titleName:P,docsSlug:"dialog"}),be=W,ge=U,me=Y,_e=Z,xe=q,De=H,Ee=Q,ve=ee;export{ge as $,me as a,_e as b,xe as c,De as d,Ee as e,ve as f,be as g,fe as h,ue as i};
