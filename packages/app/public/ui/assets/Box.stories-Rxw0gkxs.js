import{a as r}from"./component-GWnuE1KC.js";import{B as o}from"./Box-Dyc_zsua.js";import{F as x}from"./Flex-ObvG_Y4q.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-PzP5oypK.js";import"./margin.props-PzJgsS8k.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";const S={title:"Layout/Box",component:o},g=n=>r(x,{...n,className:`w-full h-full bg-gray-a4 border border-dashed border-border ${n.className}`}),a={render:()=>r(o,{className:"block w-8 h-8",children:r(g,{})})},e={name:"AsChild",render:()=>r(o,{asChild:!0,className:"bg-gray-2",children:r("span",{children:"I'm a span"})})},s={render:()=>r(o,{as:"span",children:"I'm a span"})};var c,m,t;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Box className="block w-8 h-8">
      <DecorativeBox />
    </Box>
}`,...(t=(m=a.parameters)==null?void 0:m.docs)==null?void 0:t.source}}};var p,d,i;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'AsChild',
  render: () => <Box asChild className="bg-gray-2">
      <span>I&apos;m a span</span>
    </Box>
}`,...(i=(d=e.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var l,h,u;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Box as="span">I&apos;m a span</Box>
}`,...(u=(h=s.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};const k=["Usage","AsChild","Polymorphic"];export{e as AsChild,s as Polymorphic,a as Usage,k as __namedExportsOrder,S as default};
