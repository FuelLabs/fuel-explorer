import{c as P,a as t,j as a}from"./component-GWnuE1KC.js";import"./Box-Dyc_zsua.js";import{F as z}from"./Flex-ObvG_Y4q.js";import{H as T,V}from"./HStack-zWMSNjdx.js";import"./Container-ZHer_4Z-.js";import{C as A}from"./Card-tdnWjxaO.js";import{I as B}from"./Icon-yMpA7scP.js";import{T as n}from"./Text-dPTTbXey.js";import{r as i}from"./index-4g5l5LRQ.js";import{c as E}from"./index-PzP5oypK.js";import{e as F,w as e,a as H}from"./margin.props-PzJgsS8k.js";import{c as D}from"./createReactComponent-rTvSjvh2.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";import"./Heading--81FOStw.js";import"./useIconProps-CHWy8E0U.js";import"./Spinner-5v6R2VlX.js";import"./index-OVDJ2T7o.js";import"./text-od4ajCvi.js";import"./color.prop-2NeWmXkP.js";import"./theme-options-gOxTq-NJ.js";import"./high-contrast.prop-QxvwxEM2.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-tvtfaFq4.js";const G=["all","x","y","top","bottom","left","right"],M=["border-box","padding-box"],r=["current","0"],o={side:{type:"enum",values:G,default:"all",responsive:!0},clip:{type:"enum",values:M,default:"border-box",responsive:!0},p:{type:"enum",values:r,default:void 0,responsive:!0},px:{type:"enum",values:r,default:void 0,responsive:!0},py:{type:"enum",values:r,default:void 0,responsive:!0},pt:{type:"enum",values:r,default:void 0,responsive:!0},pr:{type:"enum",values:r,default:void 0,responsive:!0},pb:{type:"enum",values:r,default:void 0,responsive:!0},pl:{type:"enum",values:r,default:void 0,responsive:!0}},d=i.forwardRef((u,f)=>{const{rest:g,...b}=F(u),{className:x,side:v=o.side.default,clip:y=o.clip.default,p:h,px:I,py:N,pt:k,pr:j,pb:S,pl:w,...C}=g;return i.createElement("div",{...C,ref:f,className:E("rt-Inset",x,e(v,"rt-r-side"),e(y,"rt-r-clip"),e(h,"rt-r-p"),e(I,"rt-r-px"),e(N,"rt-r-py"),e(k,"rt-r-pt"),e(j,"rt-r-pr"),e(S,"rt-r-pb"),e(w,"rt-r-pl"),H(b))})});d.displayName="Inset";var O=D("brand-github","IconBrandGithub",[["path",{d:"M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",key:"svg-0"}]]);const m=P({id:"Inset",baseElement:d}),de={title:"UI/Inset",component:m},s={render:()=>t(A,{className:"max-w-xl py-0",children:a(T,{align:"center",gap:"4",children:[t(m,{side:"left",children:t(z,{align:"center",className:"bg-black/30 border-r border-border h-full p-7",justify:"center",children:t(B,{icon:O,size:50})})}),a(V,{className:"px-4 py-2 bg-panel",gap:"1",justify:"center",children:[t(n,{as:"div",color:"gray",size:"2",children:"github.com"}),t(n,{size:"4",children:"Official Node.js SDK for interacting with the AcmeCorp API."})]})]})})};var p,c,l;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Card className="max-w-xl py-0">
      <HStack align="center" gap="4">
        <Inset side="left">
          <Flex align="center" className="bg-black/30 border-r border-border h-full p-7" justify="center">
            <Icon icon={IconBrandGithub} size={50} />
          </Flex>
        </Inset>

        <VStack className="px-4 py-2 bg-panel" gap="1" justify="center">
          <Text as="div" color="gray" size="2">
            github.com
          </Text>
          <Text size="4">
            Official Node.js SDK for interacting with the AcmeCorp API.
          </Text>
        </VStack>
      </HStack>
    </Card>
}`,...(l=(c=s.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const me=["Usage"];export{s as Usage,me as __namedExportsOrder,de as default};
