import{c as o,a as e,j as t,d as f,w as E}from"./component-GWnuE1KC.js";import{B as g}from"./Box-Dyc_zsua.js";import"./Flex-ObvG_Y4q.js";import{H as N,V as p}from"./HStack-zWMSNjdx.js";import"./Container-ZHer_4Z-.js";import{B as n}from"./Button-s2ABxHFH.js";import{I as d}from"./Input-muUsulI-.js";import{g as P,$ as k,a as F,b as H,f as I,c as S,e as O,d as j}from"./index-Vd4k5I1B.js";import{B as R}from"./ButtonClose-pfvK4f5j.js";import{T as U}from"./Theme-ElRRBZX-.js";import{i as V}from"./index-OVDJ2T7o.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-PzP5oypK.js";import"./margin.props-PzJgsS8k.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";import"./useIconProps-CHWy8E0U.js";import"./Icon-yMpA7scP.js";import"./Spinner-5v6R2VlX.js";import"./useVariants-MCkVGt0e.js";import"./base-button-byKbQBcE.js";import"./color.prop-2NeWmXkP.js";import"./theme-options-gOxTq-NJ.js";import"./high-contrast.prop-QxvwxEM2.js";import"./radius.prop-eqdedovG.js";import"./index-pbeB-vsG.js";import"./index-uUL8xeMH.js";import"./index-i6iaJq_c.js";import"./index-uCXP6D8h.js";import"./index-K96gYvhf.js";import"./index-OvZZPJzn.js";import"./index-jmm5gWkb.js";import"./Combination-3g16u1mX.js";import"./index-YxBGvUbs.js";import"./IconButton-9L2R6k4w.js";import"./IconX-6LOxEXLl.js";import"./createReactComponent-rTvSjvh2.js";import"./index-tvtfaFq4.js";import"./theme-IUFKUlFK.js";import"./extends-dGVwEr9R.js";import"./index-q_8alis5.js";import"./index-RaHu7lN4.js";const a=V({slots:{overlay:["fixed inset-0 z-50 backdrop-blur-sm","state-open:animate-in state-closed:animate-out","state-closed:fade-out-0 state-open:fade-in-0"],closeIcon:["absolute right-4 top-4 rounded-sm opacity-70","transition-opacity hover:opacity-100 focus:outline-none","focus:ring-2 focus:ring-gray-4 focus:ring-offset-2","disabled:pointer-events-none state-open:bg-secondary"],content:["flex flex-col fixed z-50 gap-4 bg-card-bg p-6","text-color border-border shadow-lg transition ease-in-out","state-open:animate-in state-closed:animate-out","state-closed:duration-500 state-open:duration-700"],header:["flex flex-col space-y-2"],description:["text-sm text-muted"],footer:["flex flex-col-reverse","tablet:flex-row tablet:justify-end tablet:space-x-2"],title:["text-lg font-semibold text-heading"],body:["py-4 flex-1"]},variants:{side:{top:{content:["inset-x-0 top-0 border-b","state-closed:slide-out-to-top state-open:slide-in-from-top"]},bottom:{content:["inset-x-0 bottom-0 border-t","state-closed:slide-out-to-bottom state-open:slide-in-from-bottom"]},left:{content:["inset-y-0 left-0 h-full w-3/4 border-r","state-closed:slide-out-to-left state-open:slide-in-from-left","tablet:max-w-sm"]},right:{content:["inset-y-0 right-0 h-full w-3/4 border-l","state-closed:slide-out-to-right state-open:slide-in-from-right","tablet:max-w-sm"]}}},defaultVariants:{side:"right"}}),z=o({id:"Drawer",baseElement:P}),L=o({id:"DrawerTrigger",baseElement:k,defaultProps:{asChild:!0}}),_=o({id:"DrawerPortal",baseElement:F}),M=o({id:"DrawerOverlay",baseElement:H,className:()=>a().overlay()}),y=o({id:"DrawerClose",baseElement:I,defaultProps:{asChild:!0}}),T=o({id:"DrawerCloseIcon",className:()=>a().closeIcon(),baseElement:R,render:(i,m)=>e(y,{asChild:!0,children:e(i,{...m})}),defaultProps:{variant:"link",color:"gray"}}),q=o({id:"DrawerContent",baseElement:S,render:(i,{className:m,children:C,side:$="right",...v})=>{const B=a({side:$});return e(_,{children:t(U,{children:[e(M,{}),t(i,{...v,className:B.content({className:m}),children:[C,e(T,{})]})]})})}}),A=o({id:"DrawerDescription",baseElement:O,className:()=>a().description()}),G=o({id:"DrawerTitle",baseElement:j,className:()=>a().title()}),J=f({id:"DrawerHeader",baseElement:g,className:()=>a().header(),defaultProps:{as:"header"}}),K=f({id:"DrawerBody",baseElement:g,className:()=>a().body()}),Q=f({id:"DrawerFooter",baseElement:g,className:()=>a().footer(),defaultProps:{as:"header"}}),r=E(z,{Trigger:L,Close:y,CloseIcon:T,Content:q,Header:J,Description:A,Title:G,Body:K,Footer:Q}),Ve={title:"Overlay/Drawer",component:r,parameters:{layout:"centered"}};function s(i){return t(r.Content,{...i,children:[t(r.Header,{children:[e(r.Title,{children:"Edit profile"}),e(r.Description,{children:"Make changes to your profile here. Click save when you're done."})]}),e(r.Body,{asChild:!0,children:t(p,{children:[t(p,{gap:"2",children:[e("label",{htmlFor:"name",children:"Name"}),e(d,{children:e(d.Field,{className:"w-full",id:"name",value:"Pedro Duarte"})})]}),t(p,{gap:"2",children:[e("label",{htmlFor:"username",children:"Username"}),e(d,{children:e(d.Field,{className:"col-span-3",id:"username",value:"@peduarte"})})]})]})}),e(r.Footer,{children:e(r.Close,{children:e(n,{type:"submit",children:"Save changes"})})})]})}const l={render:()=>t(r,{children:[e(r.Trigger,{children:e(n,{variant:"solid",children:"Open"})}),e(s,{})]})},c={render:()=>t(N,{children:[t(r,{children:[e(r.Trigger,{children:e(n,{variant:"solid",children:"Top"})}),e(s,{side:"top"})]}),t(r,{children:[e(r.Trigger,{children:e(n,{variant:"solid",children:"Left"})}),e(s,{side:"left"})]}),t(r,{children:[e(r.Trigger,{children:e(n,{variant:"solid",children:"Bottom"})}),e(s,{side:"bottom"})]}),t(r,{children:[e(r.Trigger,{children:e(n,{variant:"solid",children:"Right"})}),e(s,{side:"right"})]})]})};var h,u,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Drawer>
      <Drawer.Trigger>
        <Button variant="solid">Open</Button>
      </Drawer.Trigger>
      <Content />
    </Drawer>
}`,...(b=(u=l.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var w,D,x;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <HStack>
      <Drawer>
        <Drawer.Trigger>
          <Button variant="solid">Top</Button>
        </Drawer.Trigger>
        <Content side="top" />
      </Drawer>
      <Drawer>
        <Drawer.Trigger>
          <Button variant="solid">Left</Button>
        </Drawer.Trigger>
        <Content side="left" />
      </Drawer>
      <Drawer>
        <Drawer.Trigger>
          <Button variant="solid">Bottom</Button>
        </Drawer.Trigger>
        <Content side="bottom" />
      </Drawer>
      <Drawer>
        <Drawer.Trigger>
          <Button variant="solid">Right</Button>
        </Drawer.Trigger>
        <Content side="right" />
      </Drawer>
    </HStack>
}`,...(x=(D=c.parameters)==null?void 0:D.docs)==null?void 0:x.source}}};const ze=["Usage","Position"];export{c as Position,l as Usage,ze as __namedExportsOrder,Ve as default};
