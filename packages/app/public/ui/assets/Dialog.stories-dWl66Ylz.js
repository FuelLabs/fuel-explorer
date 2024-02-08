import{c as l,w as y,j as i,a as t}from"./component-GWnuE1KC.js";import"./Box-Dyc_zsua.js";import"./Flex-ObvG_Y4q.js";import{V as z,H as j}from"./HStack-zWMSNjdx.js";import"./Container-ZHer_4Z-.js";import{B as c}from"./Button-s2ABxHFH.js";import{I as d}from"./Input-muUsulI-.js";import{T as p}from"./Text-dPTTbXey.js";import{r as e}from"./index-4g5l5LRQ.js";import{c as v}from"./index-PzP5oypK.js";import{$ as R,a as k,b as B,c as S,d as V,e as F,f as H,g as I}from"./index-Vd4k5I1B.js";import{H as M,d as O}from"./dialog.props-e85QHoCz.js";import{T as J}from"./text-od4ajCvi.js";import{T as P}from"./theme-IUFKUlFK.js";import{w as U}from"./margin.props-PzJgsS8k.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";import"./useIconProps-CHWy8E0U.js";import"./Icon-yMpA7scP.js";import"./Spinner-5v6R2VlX.js";import"./useVariants-MCkVGt0e.js";import"./base-button-byKbQBcE.js";import"./color.prop-2NeWmXkP.js";import"./theme-options-gOxTq-NJ.js";import"./high-contrast.prop-QxvwxEM2.js";import"./radius.prop-eqdedovG.js";import"./index-pbeB-vsG.js";import"./index-OVDJ2T7o.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-uUL8xeMH.js";import"./index-i6iaJq_c.js";import"./index-uCXP6D8h.js";import"./index-K96gYvhf.js";import"./index-OvZZPJzn.js";import"./index-jmm5gWkb.js";import"./Combination-3g16u1mX.js";import"./index-YxBGvUbs.js";import"./extends-dGVwEr9R.js";import"./index-q_8alis5.js";import"./index-RaHu7lN4.js";const u=o=>e.createElement(I,{...o,modal:!0});u.displayName="DialogRoot";const b=e.forwardRef((o,a)=>e.createElement(R,{...o,ref:a,asChild:!0}));b.displayName="DialogTrigger";const h=e.forwardRef((o,a)=>{const{className:E,forceMount:T,container:x,size:N=O.size.default,...w}=o;return e.createElement(k,{container:x,forceMount:T},e.createElement(P,{asChild:!0},e.createElement(B,{className:"rt-DialogOverlay"},e.createElement(S,{...w,ref:a,className:v("rt-DialogContent",E,U(N,"rt-r-size"))}))))});h.displayName="DialogContent";const m=e.forwardRef((o,a)=>e.createElement(V,{asChild:!0},e.createElement(M,{size:"5",mb:"3",trim:"start",...o,ref:a})));m.displayName="DialogTitle";const C=e.forwardRef((o,a)=>e.createElement(F,{asChild:!0},e.createElement(J,{as:"p",size:"3",...o,ref:a})));C.displayName="DialogDescription";const $=e.forwardRef((o,a)=>e.createElement(H,{...o,ref:a,asChild:!0}));$.displayName="DialogClose";const n=Object.assign({},{Root:u,Trigger:b,Content:h,Title:m,Description:C,Close:$}),_=l({id:"Dialog",baseElement:n.Root}),q=l({id:"DialogTrigger",baseElement:n.Trigger}),A=l({id:"DialogContent",baseElement:n.Content}),G=l({id:"DialogClose",baseElement:n.Close}),K=l({id:"DialogDescription",baseElement:n.Description}),r=y(_,{Trigger:q,Content:A,Close:G,Description:K,Title:m}),Ve={title:"Overlay/Dialog",component:r,parameters:{layout:"centered"}},s={render:()=>i(r,{children:[t(r.Trigger,{children:t(c,{children:"Edit profile"})}),i(r.Content,{className:"max-w-sm",children:[t(r.Title,{children:"Edit profile"}),t(r.Description,{mb:"4",size:"2",children:"Make changes to your profile."}),i(z,{children:[i("label",{className:"w-full",children:[t(p,{as:"div",mb:"1",size:"2",weight:"bold",children:"Name"}),t(d.Field,{defaultValue:"Freja Johnsen",placeholder:"Enter your full name"})]}),i("label",{className:"w-full",children:[t(p,{as:"div",mb:"1",size:"2",weight:"bold",children:"Email"}),t(d.Field,{defaultValue:"freja@example.com",placeholder:"Enter your email"})]})]}),i(j,{className:"mt-4",justify:"end",children:[t(r.Close,{children:t(c,{color:"gray",variant:"ghost",children:"Cancel"})}),t(r.Close,{children:t(c,{children:"Save"})})]})]})]})};var g,f,D;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Dialog>
      <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-sm">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description mb="4" size="2">
          Make changes to your profile.
        </Dialog.Description>
        <VStack>
          <label className="w-full">
            <Text as="div" mb="1" size="2" weight="bold">
              Name
            </Text>
            <Input.Field defaultValue="Freja Johnsen" placeholder="Enter your full name" />
          </label>
          <label className="w-full">
            <Text as="div" mb="1" size="2" weight="bold">
              Email
            </Text>
            <Input.Field defaultValue="freja@example.com" placeholder="Enter your email" />
          </label>
        </VStack>
        <HStack className="mt-4" justify="end">
          <Dialog.Close>
            <Button color="gray" variant="ghost">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </HStack>
      </Dialog.Content>
    </Dialog>
}`,...(D=(f=s.parameters)==null?void 0:f.docs)==null?void 0:D.source}}};const Fe=["Usage"];export{s as Usage,Fe as __namedExportsOrder,Ve as default};
