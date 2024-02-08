import{a as t,j as C}from"./component-GWnuE1KC.js";import"./Box-Dyc_zsua.js";import"./Flex-ObvG_Y4q.js";import{H as w}from"./HStack-zWMSNjdx.js";import"./Container-ZHer_4Z-.js";import{B as o}from"./Button-s2ABxHFH.js";import{I as S}from"./Icon-yMpA7scP.js";import{T as B}from"./Toast-NEmckpPz.js";import{u as y,t as r}from"./useToast-xSNBJrDB.js";import{I as f}from"./IconHelpCircle-FBk8PWX2.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-PzP5oypK.js";import"./margin.props-PzJgsS8k.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";import"./useIconProps-CHWy8E0U.js";import"./Spinner-5v6R2VlX.js";import"./useVariants-MCkVGt0e.js";import"./base-button-byKbQBcE.js";import"./color.prop-2NeWmXkP.js";import"./theme-options-gOxTq-NJ.js";import"./high-contrast.prop-QxvwxEM2.js";import"./radius.prop-eqdedovG.js";import"./index-jmm5gWkb.js";import"./index-pbeB-vsG.js";import"./index-nXA7x1aK.js";import"./index-uUL8xeMH.js";import"./index-K96gYvhf.js";import"./index-OvZZPJzn.js";import"./index-YxBGvUbs.js";import"./index-uCXP6D8h.js";import"./ButtonClose-pfvK4f5j.js";import"./IconButton-9L2R6k4w.js";import"./IconX-6LOxEXLl.js";import"./createReactComponent-rTvSjvh2.js";import"./index-tvtfaFq4.js";import"./index-OVDJ2T7o.js";import"./IconCheck-XJaya_tx.js";import"./IconAlertCircle-GEP1tBG_.js";const pt={title:"Overlay/Toast",component:B,parameters:{layout:"centered"}},n={render:()=>{const{toast:k}=y();return t(o,{onClick:()=>{k({title:"Scheduled: Catch up",description:"Friday, February 10, 2023 at 5:57 PM"})},children:"Show toast"})}},e={title:"Some title",description:"Some description",icon:t(S,{icon:f,size:24}),action:t(B.Action,{altText:"Try again",children:"Action"})},i={render:()=>C(w,{children:[t(o,{color:"gray",onClick:()=>r.base(e.title),children:"Base"}),t(o,{color:"blue",onClick:()=>r.info(e.title),children:"Info"}),t(o,{color:"yellow",onClick:()=>r.warning(e.title),children:"Warning"}),t(o,{color:"green",onClick:()=>r.success(e.title),children:"Success"}),t(o,{color:"red",onClick:()=>r.error(e.title),children:"Error"})]})},s={render:()=>t(o,{color:"red",variant:"ghost",onClick:()=>r({...e,title:"Uh oh! Something went wrong.",description:"There was a problem with your request.",variant:"error",width:"auto",duration:2e3}),children:"Remove Access"})};var a,c,p;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => {
    const {
      toast
    } = useToast();
    return <Button onClick={() => {
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM'
      });
    }}>
        Show toast
      </Button>;
  }
}`,...(p=(c=n.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var l,m,u;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    return <HStack>
        <Button color="gray" onClick={() => toast.base(toastProps.title)}>
          Base
        </Button>
        <Button color="blue" onClick={() => toast.info(toastProps.title)}>
          Info
        </Button>
        <Button color="yellow" onClick={() => toast.warning(toastProps.title)}>
          Warning
        </Button>
        <Button color="green" onClick={() => toast.success(toastProps.title)}>
          Success
        </Button>
        <Button color="red" onClick={() => toast.error(toastProps.title)}>
          Error
        </Button>
      </HStack>;
  }
}`,...(u=(m=i.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var d,h,g;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    return <Button color="red" variant="ghost" onClick={() => toast({
      ...toastProps,
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'error',
      width: 'auto',
      duration: 2000
    })}>
        Remove Access
      </Button>;
  }
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const lt=["Usage","Variants","WithAction"];export{n as Usage,i as Variants,s as WithAction,lt as __namedExportsOrder,pt as default};
