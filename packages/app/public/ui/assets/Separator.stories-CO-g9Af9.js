import{c as S,a as n,j as f}from"./component-GWnuE1KC.js";import{B as z}from"./Box-Dyc_zsua.js";import{F as I}from"./Flex-ObvG_Y4q.js";import"./HStack-zWMSNjdx.js";import"./Container-ZHer_4Z-.js";import{T as P}from"./Text-dPTTbXey.js";import{r as p}from"./index-4g5l5LRQ.js";import{c as E}from"./index-PzP5oypK.js";import{_ as N}from"./extends-dGVwEr9R.js";import{$ as O}from"./index-OvZZPJzn.js";import{c as w}from"./color.prop-2NeWmXkP.js";import{e as y,w as b,a as U}from"./margin.props-PzJgsS8k.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";import"./index-OVDJ2T7o.js";import"./useIconProps-CHWy8E0U.js";import"./Icon-yMpA7scP.js";import"./Spinner-5v6R2VlX.js";import"./text-od4ajCvi.js";import"./high-contrast.prop-QxvwxEM2.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./theme-options-gOxTq-NJ.js";const m="horizontal",B=["horizontal","vertical"],g=p.forwardRef((r,o)=>{const{decorative:t,orientation:e=m,...a}=r,i=h(e)?e:m,l=t?{role:"none"}:{"aria-orientation":i==="vertical"?i:void 0,role:"separator"};return p.createElement(O.div,N({"data-orientation":i},l,a,{ref:o}))});g.propTypes={orientation(r,o,t){const e=r[o],a=String(e);return e&&!h(e)?new Error(F(a,t)):null}};function F(r,o){return`Invalid prop \`orientation\` of value \`${r}\` supplied to \`${o}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${m}\`.`}function h(r){return B.includes(r)}const R=g,_=["1","2","3","4"],u={size:{type:"enum",values:_,default:"1",responsive:!0},color:{...w,default:"gray"}},T=p.forwardRef((r,o)=>{const{rest:t,...e}=y(r),{className:a,size:i=u.size.default,color:d=u.color.default,...l}=t;return p.createElement(R,{"data-accent-color":d,...l,ref:o,className:E("rt-Separator",a,b(i,"rt-r-size"),U(e))})});T.displayName="Separator";const s=S({id:"Separator",baseElement:T}),ir={title:"UI/Separator",component:s},c={render:()=>n(z,{className:"w-[400px]",children:f(P,{size:"2",children:["Tools for building high-quality, accessible UI.",n(s,{my:"3",size:"4"}),f(I,{align:"center",gap:"3",children:["Themes",n(s,{orientation:"vertical"}),"Primitives",n(s,{orientation:"vertical"}),"Icons",n(s,{orientation:"vertical"}),"Colors"]})]})})};var $,v,x;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <Box className="w-[400px]">
      <Text size="2">
        Tools for building high-quality, accessible UI.
        <Separator my="3" size="4" />
        <Flex align="center" gap="3">
          Themes
          <Separator orientation="vertical" />
          Primitives
          <Separator orientation="vertical" />
          Icons
          <Separator orientation="vertical" />
          Colors
        </Flex>
      </Text>
    </Box>
}`,...(x=(v=c.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const nr=["Usage"];export{c as Usage,nr as __namedExportsOrder,ir as default};
