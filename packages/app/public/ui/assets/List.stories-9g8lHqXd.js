import{c as l,a as t,j as n,w as j}from"./component-GWnuE1KC.js";import{I as k}from"./Icon-yMpA7scP.js";import{T as B}from"./Text-dPTTbXey.js";import{i as N}from"./index-OVDJ2T7o.js";import{r as y}from"./index-4g5l5LRQ.js";import{I as z}from"./IconCheck-XJaya_tx.js";import"./useIconProps-CHWy8E0U.js";import"./Spinner-5v6R2VlX.js";import"./index-PzP5oypK.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./text-od4ajCvi.js";import"./color.prop-2NeWmXkP.js";import"./theme-options-gOxTq-NJ.js";import"./high-contrast.prop-QxvwxEM2.js";import"./margin.props-PzJgsS8k.js";import"./createReactComponent-rTvSjvh2.js";import"./index-tvtfaFq4.js";const v=N({slots:{root:"m-0 p-0 fuel-[Text]:leading-relaxed",item:"marker:text-icon"},variants:{type:{ol:{root:"list-decimal pl-4"},ul:{root:"list-disc pl-4"},none:{root:"list-none"}},withIcon:{true:{root:"list-none",item:"flex items-center gap-2"}}},defaultVariants:{type:"ul",withIcon:!1}}),P=y.createContext({});function D(){return y.useContext(P)}const W=P.Provider,h=l({id:"List",className:({className:r,icon:i,type:s="none"})=>v({type:s,withIcon:!!i}).root({className:r}),render:(r,{type:i="none",icon:s,iconColor:L,iconSize:o,iconAriaLabel:I,...p})=>t(W,{value:{icon:s,iconColor:L,iconSize:o,iconAriaLabel:I},children:t(i==="ol"?"ol":"ul",{...p})})}),A=l({id:"ListItem",render:(r,{children:i,className:s,...L})=>{const{icon:o,iconColor:I,iconSize:p,iconAriaLabel:u}=D(),_=v({withIcon:!!o}).item({className:s});return n(B,{as:"li",...L,className:_,children:[o&&t(k,{"aria-label":u,color:I,icon:o,size:p})," ",i]})}}),R=l({id:"ListUL",baseElement:h,defaultProps:{type:"ul"}}),V=l({id:"ListOL",baseElement:h,defaultProps:{type:"ol"}}),e=j(h,{UL:R,OL:V,Item:A}),me={title:"Base/List",component:e},m={render:r=>n(e,{...r,children:[t(e.Item,{children:"First item"}),t(e.Item,{children:"Second item"}),t(e.Item,{children:"Third item"})]})},c={render:()=>n(e.UL,{children:[t(e.Item,{children:"First item"}),t(e.Item,{children:"Second item"}),t(e.Item,{children:"Third item"})]})},a={render:()=>n(e.OL,{children:[t(e.Item,{children:"First item"}),t(e.Item,{children:"Second item"}),t(e.Item,{children:"Third item"})]})},d={render:()=>n(e,{icon:z,iconColor:"text-brand",children:[t(e.Item,{children:"First item"}),t(e.Item,{children:"Second item"}),t(e.Item,{children:"Third item"})]})};var f,x,S;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <List {...args}>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List>
}`,...(S=(x=m.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var T,C,O;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <List.UL>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List.UL>
}`,...(O=(C=c.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};var g,E,F;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <List.OL>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List.OL>
}`,...(F=(E=a.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var U,b,w;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <List icon={IconCheck} iconColor="text-brand">
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List>
}`,...(w=(b=d.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};const ce=["Default","Unordered","Ordered","WithIcon"];export{m as Default,a as Ordered,c as Unordered,d as WithIcon,ce as __namedExportsOrder,me as default};
