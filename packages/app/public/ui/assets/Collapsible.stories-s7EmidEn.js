import{c,a as l,b as V,j as t,w as P}from"./component-GWnuE1KC.js";import{B as U}from"./Box-Dyc_zsua.js";import"./Flex-ObvG_Y4q.js";import{H as _,V as z}from"./HStack-zWMSNjdx.js";import"./Container-ZHer_4Z-.js";import{r as n}from"./index-4g5l5LRQ.js";import{i as D}from"./index-OVDJ2T7o.js";import{C as y}from"./Card-tdnWjxaO.js";import{I as O}from"./IconButton-9L2R6k4w.js";import{T as R}from"./Text-dPTTbXey.js";import{I as q}from"./IconChevronDown-YYHZjwuS.js";import"./index-PzP5oypK.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./margin.props-PzJgsS8k.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";import"./Heading--81FOStw.js";import"./useIconProps-CHWy8E0U.js";import"./Icon-yMpA7scP.js";import"./Spinner-5v6R2VlX.js";import"./useVariants-MCkVGt0e.js";import"./base-button-byKbQBcE.js";import"./color.prop-2NeWmXkP.js";import"./theme-options-gOxTq-NJ.js";import"./high-contrast.prop-QxvwxEM2.js";import"./radius.prop-eqdedovG.js";import"./text-od4ajCvi.js";import"./createReactComponent-rTvSjvh2.js";import"./index-tvtfaFq4.js";const m=n.createContext({}),A=c({id:"Collapsible",baseElement:y,render:(o,{children:d,className:p,defaultOpened:i,hideIcon:r,opened:s,onOpenChange:a,variant:b="surface",...k})=>{const I=C(),[h,j]=n.useState(!!(i||s));return n.useEffect(()=>{a==null||a(h)},[h,a]),l(m.Provider,{value:{opened:h,setOpened:j,defaultOpened:i,variant:b,hideIcon:r},children:l(o,{...k,className:V(I.root({className:p}),r?"cursor-default":""),children:d})})}}),F=c({id:"CollapsibleHeader",baseElement:y.Header,render:(o,{children:d,className:p,...i})=>{const r=C(),{opened:s,setOpened:a,hideIcon:b}=n.useContext(m);return t(o,{...i,"data-state":s?"opened":"closed",className:V(r.header({className:p}),b?"cursor-default":""),onClick:()=>a(!s),children:[l(_,{align:"center",children:d}),!b&&l(O,{iconSize:20,iconColor:"text-muted",variant:"link",className:r.icon(),icon:q})]})}}),G=c({id:"CollapsibleContent",baseElement:y.Body,render:(o,{children:d,className:p,...i})=>{const{opened:r,variant:s}=n.useContext(m),a=C({variant:s});return r?l(o,{...i,className:a.content({variant:s,className:p}),children:d}):null}}),J=c({id:"CollapsibleTitle",baseElement:R,className:()=>{const{variant:o}=n.useContext(m);return C({variant:o}).title()}}),K=c({id:"CollapsibleBody",baseElement:U,className:()=>{const{variant:o}=n.useContext(m);return C({variant:o}).body()}}),e=P(A,{Header:F,Content:G,Title:J,Body:K}),C=D({slots:{root:"py-[10px]",header:"group grid grid-cols-[1fr_auto] grid-rows-1 gap-4 items-center cursor-pointer",icon:"transition-transform group-data-[state=opened]:-rotate-180 cursor-pointer",content:"mx-4 mb-2 border border-border",body:"",title:"flex items-center gap-2 text-sm font-medium"},variants:{variant:{surface:{content:"p-0 bg-gray-3 rounded-sm",body:"px-3 py-3",title:"py-3 px-3 border-b border-border"},ghost:{content:"p-3 rounded-sm",body:"pt-2"}}},defaultVariants:{variant:"surface"}}),Te={title:"UI/Collapsible",component:e},u={render:()=>t(e,{className:"max-w-[450px]",children:[l(e.Header,{children:"Header"}),t(e.Content,{children:[l(e.Title,{children:"Title"}),l(e.Body,{children:"Content"})]})]})},x={render:()=>t(z,{children:[t(e,{defaultOpened:!0,className:"max-w-[450px]",variant:"ghost",children:[l(e.Header,{children:"Header"}),t(e.Content,{children:[l(e.Title,{children:"Title"}),l(e.Body,{children:"Content"})]})]}),t(e,{defaultOpened:!0,className:"max-w-[450px]",variant:"surface",children:[l(e.Header,{children:"Header"}),t(e.Content,{children:[l(e.Title,{children:"Title"}),l(e.Body,{children:"Content"})]})]})]})},f={render:()=>t(e,{as:"article",className:"max-w-[450px]",children:[l(e.Header,{children:"Header"}),t(e.Content,{children:[l(e.Title,{children:"Title"}),l(e.Body,{children:"Content"})]})]})};var H,T,B;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <Collapsible className="max-w-[450px]">
      <Collapsible.Header>Header</Collapsible.Header>
      <Collapsible.Content>
        <Collapsible.Title>Title</Collapsible.Title>
        <Collapsible.Body>Content</Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
}`,...(B=(T=u.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var N,v,g;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <VStack>
      <Collapsible defaultOpened className="max-w-[450px]" variant="ghost">
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Title</Collapsible.Title>
          <Collapsible.Body>Content</Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible defaultOpened className="max-w-[450px]" variant="surface">
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Title</Collapsible.Title>
          <Collapsible.Body>Content</Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    </VStack>
}`,...(g=(v=x.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var w,S,E;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Collapsible as="article" className="max-w-[450px]">
      <Collapsible.Header>Header</Collapsible.Header>
      <Collapsible.Content>
        <Collapsible.Title>Title</Collapsible.Title>
        <Collapsible.Body>Content</Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
}`,...(E=(S=f.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};const Be=["Usage","Variants","Polymorphic"];export{f as Polymorphic,u as Usage,x as Variants,Be as __namedExportsOrder,Te as default};
