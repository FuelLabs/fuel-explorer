import{c as $e,a as X}from"./component-GWnuE1KC.js";import{B as pe}from"./Box-Dyc_zsua.js";import"./Flex-ObvG_Y4q.js";import"./HStack-zWMSNjdx.js";import"./Container-ZHer_4Z-.js";import{r}from"./index-4g5l5LRQ.js";import{$ as C,c as j}from"./index-PzP5oypK.js";import{_ as P}from"./extends-dGVwEr9R.js";import{$ as Z}from"./index-f2GGseSc.js";import{$ as _}from"./index-pbeB-vsG.js";import{$ as Se}from"./index-uUL8xeMH.js";import{$ as ve}from"./index-uCXP6D8h.js";import{$ as he}from"./index-RaHu7lN4.js";import{$ as ge}from"./index-FkhxRFYx.js";import{$ as be}from"./index-q_8alis5.js";import{$ as k}from"./index-OvZZPJzn.js";import{$ as xe}from"./index-nXA7x1aK.js";import{c as we}from"./color.prop-2NeWmXkP.js";import{h as Ee}from"./high-contrast.prop-QxvwxEM2.js";import{r as Pe}from"./radius.prop-eqdedovG.js";import{e as ye,w as De,a as Re}from"./margin.props-PzJgsS8k.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./theme-options-gOxTq-NJ.js";const ee=["PageUp","PageDown"],te=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],ne={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},B="Slider",[H,_e,Ce]=xe(B),[oe,Dt]=Se(B,[Ce]),[Me,z]=oe(B),Ke=r.forwardRef((e,t)=>{const{name:n,min:o=0,max:s=100,step:a=1,orientation:l="horizontal",disabled:c=!1,minStepsBetweenThumbs:f=0,defaultValue:m=[o],value:$,onValueChange:i=()=>{},onValueCommit:d=()=>{},inverted:v=!1,...g}=e,[p,h]=r.useState(null),w=C(t,S=>h(S)),D=r.useRef(new Set),u=r.useRef(0),E=l==="horizontal",M=p?!!p.closest("form"):!0,L=E?Ve:Ie,[b=[],de]=ve({prop:$,defaultProp:m,onChange:S=>{var x;(x=[...D.current][u.current])===null||x===void 0||x.focus(),i(S)}}),F=r.useRef(b);function fe(S){const x=Le(b,S);K(S,x)}function ue(S){K(S,u.current)}function me(){const S=F.current[u.current];b[u.current]!==S&&d(b)}function K(S,x,{commit:A}={commit:!1}){const U=Xe(a),N=je(Math.round((S-o)/a)*a+o,U),V=Z(N,[o,s]);de((R=[])=>{const y=He(R,V,x);if(Ye(y,f*a)){u.current=y.indexOf(V);const Y=String(y)!==String(R);return Y&&A&&d(y),Y?y:R}else return R})}return r.createElement(Me,{scope:e.__scopeSlider,disabled:c,min:o,max:s,valueIndexToChangeRef:u,thumbs:D.current,values:b,orientation:l},r.createElement(H.Provider,{scope:e.__scopeSlider},r.createElement(H.Slot,{scope:e.__scopeSlider},r.createElement(L,P({"aria-disabled":c,"data-disabled":c?"":void 0},g,{ref:w,onPointerDown:_(g.onPointerDown,()=>{c||(F.current=b)}),min:o,max:s,inverted:v,onSlideStart:c?void 0:fe,onSlideMove:c?void 0:ue,onSlideEnd:c?void 0:me,onHomeKeyDown:()=>!c&&K(o,0,{commit:!0}),onEndKeyDown:()=>!c&&K(s,b.length-1,{commit:!0}),onStepKeyDown:({event:S,direction:x})=>{if(!c){const N=ee.includes(S.key)||S.shiftKey&&te.includes(S.key)?10:1,V=u.current,R=b[V],y=a*N*x;K(R+y,V,{commit:!0})}}})))),M&&b.map((S,x)=>r.createElement(Ne,{key:x,name:n?n+(b.length>1?"[]":""):void 0,value:S})))}),[ae,re]=oe(B,{startEdge:"left",endEdge:"right",size:"width",direction:1}),Ve=r.forwardRef((e,t)=>{const{min:n,max:o,dir:s,inverted:a,onSlideStart:l,onSlideMove:c,onSlideEnd:f,onStepKeyDown:m,...$}=e,[i,d]=r.useState(null),v=C(t,u=>d(u)),g=r.useRef(),p=he(s),h=p==="ltr",w=h&&!a||!h&&a;function D(u){const E=g.current||i.getBoundingClientRect(),M=[0,E.width],b=O(M,w?[n,o]:[o,n]);return g.current=E,b(u-E.left)}return r.createElement(ae,{scope:e.__scopeSlider,startEdge:w?"left":"right",endEdge:w?"right":"left",direction:w?1:-1,size:"width"},r.createElement(ie,P({dir:p,"data-orientation":"horizontal"},$,{ref:v,style:{...$.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:u=>{const E=D(u.clientX);l==null||l(E)},onSlideMove:u=>{const E=D(u.clientX);c==null||c(E)},onSlideEnd:()=>{g.current=void 0,f==null||f()},onStepKeyDown:u=>{const M=ne[w?"from-left":"from-right"].includes(u.key);m==null||m({event:u,direction:M?-1:1})}})))}),Ie=r.forwardRef((e,t)=>{const{min:n,max:o,inverted:s,onSlideStart:a,onSlideMove:l,onSlideEnd:c,onStepKeyDown:f,...m}=e,$=r.useRef(null),i=C(t,$),d=r.useRef(),v=!s;function g(p){const h=d.current||$.current.getBoundingClientRect(),w=[0,h.height],u=O(w,v?[o,n]:[n,o]);return d.current=h,u(p-h.top)}return r.createElement(ae,{scope:e.__scopeSlider,startEdge:v?"bottom":"top",endEdge:v?"top":"bottom",size:"height",direction:v?1:-1},r.createElement(ie,P({"data-orientation":"vertical"},m,{ref:i,style:{...m.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:p=>{const h=g(p.clientY);a==null||a(h)},onSlideMove:p=>{const h=g(p.clientY);l==null||l(h)},onSlideEnd:()=>{d.current=void 0,c==null||c()},onStepKeyDown:p=>{const w=ne[v?"from-bottom":"from-top"].includes(p.key);f==null||f({event:p,direction:w?-1:1})}})))}),ie=r.forwardRef((e,t)=>{const{__scopeSlider:n,onSlideStart:o,onSlideMove:s,onSlideEnd:a,onHomeKeyDown:l,onEndKeyDown:c,onStepKeyDown:f,...m}=e,$=z(B,n);return r.createElement(k.span,P({},m,{ref:t,onKeyDown:_(e.onKeyDown,i=>{i.key==="Home"?(l(i),i.preventDefault()):i.key==="End"?(c(i),i.preventDefault()):ee.concat(te).includes(i.key)&&(f(i),i.preventDefault())}),onPointerDown:_(e.onPointerDown,i=>{const d=i.target;d.setPointerCapture(i.pointerId),i.preventDefault(),$.thumbs.has(d)?d.focus():o(i)}),onPointerMove:_(e.onPointerMove,i=>{i.target.hasPointerCapture(i.pointerId)&&s(i)}),onPointerUp:_(e.onPointerUp,i=>{const d=i.target;d.hasPointerCapture(i.pointerId)&&(d.releasePointerCapture(i.pointerId),a(i))})}))}),Be="SliderTrack",Ae=r.forwardRef((e,t)=>{const{__scopeSlider:n,...o}=e,s=z(Be,n);return r.createElement(k.span,P({"data-disabled":s.disabled?"":void 0,"data-orientation":s.orientation},o,{ref:t}))}),G="SliderRange",Te=r.forwardRef((e,t)=>{const{__scopeSlider:n,...o}=e,s=z(G,n),a=re(G,n),l=r.useRef(null),c=C(t,l),f=s.values.length,m=s.values.map(d=>se(d,s.min,s.max)),$=f>1?Math.min(...m):0,i=100-Math.max(...m);return r.createElement(k.span,P({"data-orientation":s.orientation,"data-disabled":s.disabled?"":void 0},o,{ref:c,style:{...e.style,[a.startEdge]:$+"%",[a.endEdge]:i+"%"}}))}),W="SliderThumb",ke=r.forwardRef((e,t)=>{const n=_e(e.__scopeSlider),[o,s]=r.useState(null),a=C(t,c=>s(c)),l=r.useMemo(()=>o?n().findIndex(c=>c.ref.current===o):-1,[n,o]);return r.createElement(ze,P({},e,{ref:a,index:l}))}),ze=r.forwardRef((e,t)=>{const{__scopeSlider:n,index:o,...s}=e,a=z(W,n),l=re(W,n),[c,f]=r.useState(null),m=C(t,h=>f(h)),$=be(c),i=a.values[o],d=i===void 0?0:se(i,a.min,a.max),v=Oe(o,a.values.length),g=$==null?void 0:$[l.size],p=g?Fe(g,d,l.direction):0;return r.useEffect(()=>{if(c)return a.thumbs.add(c),()=>{a.thumbs.delete(c)}},[c,a.thumbs]),r.createElement("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[l.startEdge]:`calc(${d}% + ${p}px)`}},r.createElement(H.ItemSlot,{scope:e.__scopeSlider},r.createElement(k.span,P({role:"slider","aria-label":e["aria-label"]||v,"aria-valuemin":a.min,"aria-valuenow":i,"aria-valuemax":a.max,"aria-orientation":a.orientation,"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,tabIndex:a.disabled?void 0:0},s,{ref:m,style:i===void 0?{display:"none"}:e.style,onFocus:_(e.onFocus,()=>{a.valueIndexToChangeRef.current=o})}))))}),Ne=e=>{const{value:t,...n}=e,o=r.useRef(null),s=ge(t);return r.useEffect(()=>{const a=o.current,l=window.HTMLInputElement.prototype,f=Object.getOwnPropertyDescriptor(l,"value").set;if(s!==t&&f){const m=new Event("input",{bubbles:!0});f.call(a,t),a.dispatchEvent(m)}},[s,t]),r.createElement("input",P({style:{display:"none"}},n,{ref:o,defaultValue:t}))};function He(e=[],t,n){const o=[...e];return o[n]=t,o.sort((s,a)=>s-a)}function se(e,t,n){const a=100/(n-t)*(e-t);return Z(a,[0,100])}function Oe(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function Le(e,t){if(e.length===1)return 0;const n=e.map(s=>Math.abs(s-t)),o=Math.min(...n);return n.indexOf(o)}function Fe(e,t,n){const o=e/2,a=O([0,50],[0,o]);return(o-a(t)*n)*n}function Ue(e){return e.slice(0,-1).map((t,n)=>e[n+1]-t)}function Ye(e,t){if(t>0){const n=Ue(e);return Math.min(...n)>=t}return!0}function O(e,t){return n=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const o=(t[1]-t[0])/(e[1]-e[0]);return t[0]+o*(n-e[0])}}function Xe(e){return(String(e).split(".")[1]||"").length}function je(e,t){const n=Math.pow(10,t);return Math.round(e*n)/n}const Ge=Ke,We=Ae,qe=Te,Je=ke,Qe=["1","2","3"],Ze=["classic","surface","soft"],I={size:{type:"enum",values:Qe,default:"2",responsive:!0},variant:{type:"enum",values:Ze,default:"surface"},color:we,highContrast:Ee,radius:Pe},ce=r.forwardRef((e,t)=>{var n,o;const{rest:s,...a}=ye(e),{className:l,size:c=I.size.default,variant:f=I.variant.default,color:m=I.color.default,highContrast:$=I.highContrast.default,radius:i=I.radius.default,tabIndex:d,...v}=s;return r.createElement(Ge,{"data-accent-color":m,"data-radius":i,ref:t,...v,className:j("rt-SliderRoot",l,De(c,"rt-r-size"),`rt-variant-${f}`,{"rt-high-contrast":$},Re(a))},r.createElement(We,{className:"rt-SliderTrack"},r.createElement(qe,{className:j("rt-SliderRange",{"rt-high-contrast":$}),"data-inverted":v.inverted?"":void 0})),((o=(n=v.value)!==null&&n!==void 0?n:v.defaultValue)!==null&&o!==void 0?o:[]).map((g,p)=>r.createElement(Je,{key:p,className:"rt-SliderThumb",...d!==void 0?{tabIndex:d}:void 0})))});ce.displayName="Slider";const le=$e({id:"Slider",baseElement:ce,defaultProps:{radius:"full"}}),Rt={title:"Form/Slider",component:le},T={render:()=>X(pe,{className:"w-[400px]",children:X(le,{defaultValue:[50]})})};var q,J,Q;T.parameters={...T.parameters,docs:{...(q=T.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <Box className="w-[400px]">
      <Slider defaultValue={[50]} />
    </Box>
}`,...(Q=(J=T.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const _t=["Usage"];export{T as Usage,_t as __namedExportsOrder,Rt as default};
