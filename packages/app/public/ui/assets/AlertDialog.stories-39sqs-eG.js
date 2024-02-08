import{c as p,w as B,j as A,a as i}from"./component-GWnuE1KC.js";import"./Box-Dyc_zsua.js";import"./Flex-ObvG_Y4q.js";import{H as z}from"./HStack-zWMSNjdx.js";import"./Container-ZHer_4Z-.js";import{B as D}from"./Button-s2ABxHFH.js";import{r as e}from"./index-4g5l5LRQ.js";import{$ as E,d as j,c as H}from"./index-PzP5oypK.js";import{_ as l}from"./extends-dGVwEr9R.js";import{$ as M}from"./index-uUL8xeMH.js";import{h as R,$ as F,a as I,b as L,i as U,c as q,d as G,e as J,f as T,g as K}from"./index-Vd4k5I1B.js";import{$ as Q}from"./index-pbeB-vsG.js";import{H as V,d as W}from"./dialog.props-e85QHoCz.js";import{T as X}from"./text-od4ajCvi.js";import{T as Y}from"./theme-IUFKUlFK.js";import{w as Z}from"./margin.props-PzJgsS8k.js";import"./layout.props-sNWQDR2x.js";import"./flex.props-EoqyxXXd.js";import"./useIconProps-CHWy8E0U.js";import"./Icon-yMpA7scP.js";import"./Spinner-5v6R2VlX.js";import"./useVariants-MCkVGt0e.js";import"./base-button-byKbQBcE.js";import"./color.prop-2NeWmXkP.js";import"./theme-options-gOxTq-NJ.js";import"./high-contrast.prop-QxvwxEM2.js";import"./radius.prop-eqdedovG.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-i6iaJq_c.js";import"./index-uCXP6D8h.js";import"./index-K96gYvhf.js";import"./index-OvZZPJzn.js";import"./index-jmm5gWkb.js";import"./Combination-3g16u1mX.js";import"./index-YxBGvUbs.js";import"./index-q_8alis5.js";import"./index-RaHu7lN4.js";const ee="AlertDialog",[ae,ga]=M(ee,[R]),n=R(),te=a=>{const{__scopeAlertDialog:t,...o}=a,r=n(t);return e.createElement(K,l({},r,o,{modal:!0}))},oe=e.forwardRef((a,t)=>{const{__scopeAlertDialog:o,...r}=a,c=n(o);return e.createElement(F,l({},c,r,{ref:t}))}),re=a=>{const{__scopeAlertDialog:t,...o}=a,r=n(t);return e.createElement(I,l({},r,o))},ce=e.forwardRef((a,t)=>{const{__scopeAlertDialog:o,...r}=a,c=n(o);return e.createElement(L,l({},c,r,{ref:t}))}),v="AlertDialogContent",[le,ne]=ae(v),ie=e.forwardRef((a,t)=>{const{__scopeAlertDialog:o,children:r,...c}=a,f=n(o),$=e.useRef(null),k=E(t,$),u=e.useRef(null);return e.createElement(U,{contentName:v,titleName:se,docsSlug:"alert-dialog"},e.createElement(le,{scope:o,cancelRef:u},e.createElement(q,l({role:"alertdialog"},f,c,{ref:k,onOpenAutoFocus:Q(c.onOpenAutoFocus,g=>{var b;g.preventDefault(),(b=u.current)===null||b===void 0||b.focus({preventScroll:!0})}),onPointerDownOutside:g=>g.preventDefault(),onInteractOutside:g=>g.preventDefault()}),e.createElement(j,null,r),!1)))}),se="AlertDialogTitle",pe=e.forwardRef((a,t)=>{const{__scopeAlertDialog:o,...r}=a,c=n(o);return e.createElement(G,l({},c,r,{ref:t}))}),de=e.forwardRef((a,t)=>{const{__scopeAlertDialog:o,...r}=a,c=n(o);return e.createElement(J,l({},c,r,{ref:t}))}),fe=e.forwardRef((a,t)=>{const{__scopeAlertDialog:o,...r}=a,c=n(o);return e.createElement(T,l({},c,r,{ref:t}))}),$e="AlertDialogCancel",ge=e.forwardRef((a,t)=>{const{__scopeAlertDialog:o,...r}=a,{cancelRef:c}=ne($e,o),f=n(o),$=E(t,c);return e.createElement(T,l({},f,r,{ref:$}))}),me=te,be=oe,Ae=re,De=ce,ue=ie,xe=fe,_e=ge,Ce=pe,Ee=de,h=a=>e.createElement(me,{...a});h.displayName="AlertDialogRoot";const N=e.forwardRef((a,t)=>e.createElement(be,{...a,ref:t,asChild:!0}));N.displayName="AlertDialogTrigger";const w=e.forwardRef((a,t)=>{const{className:o,forceMount:r,container:c,size:f=W.size.default,...$}=a;return e.createElement(Ae,{container:c,forceMount:r},e.createElement(Y,{asChild:!0},e.createElement(De,{className:"rt-DialogOverlay rt-AlertDialogOverlay"},e.createElement(ue,{...$,ref:t,className:H("rt-DialogContent","rt-AlertDialogContent",o,Z(f,"rt-r-size"))}))))});w.displayName="AlertDialogContent";const y=e.forwardRef((a,t)=>e.createElement(Ce,{asChild:!0},e.createElement(V,{size:"5",mb:"3",trim:"start",...a,ref:t})));y.displayName="AlertDialogTitle";const S=e.forwardRef((a,t)=>e.createElement(Ee,{asChild:!0},e.createElement(X,{as:"p",size:"3",...a,ref:t})));S.displayName="AlertDialogDescription";const P=e.forwardRef((a,t)=>e.createElement(xe,{...a,ref:t,asChild:!0}));P.displayName="AlertDialogAction";const O=e.forwardRef((a,t)=>e.createElement(_e,{...a,ref:t,asChild:!0}));O.displayName="AlertDialogCancel";const d=Object.assign({},{Root:h,Trigger:N,Content:w,Title:y,Description:S,Action:P,Cancel:O}),Re=p({id:"AlertDialog",baseElement:d.Root}),Te=p({id:"AlertDialogTrigger",baseElement:d.Trigger}),ve=p({id:"AlertDialogContent",baseElement:d.Content}),he=p({id:"AlertDialogTitle",baseElement:d.Title}),Ne=p({id:"AlertDialogDescription",baseElement:d.Description}),we=p({id:"AlertDialogAction",baseElement:d.Action}),ye=p({id:"AlertDialogCancel",baseElement:d.Cancel}),s=B(Re,{Trigger:Te,Content:ve,Title:he,Description:Ne,Action:we,Cancel:ye}),ma={title:"Overlay/AlertDialog",component:s,parameters:{layout:"centered"}},m={render:()=>A(s,{children:[i(s.Trigger,{children:i(D,{color:"red",children:"Revoke access"})}),A(s.Content,{className:"max-w-md",children:[i(s.Title,{children:"Revoke access"}),i(s.Description,{size:"2",children:"Are you sure? This application will no longer be accessible and any existing sessions will be expired."}),A(z,{className:"mt-4",justify:"end",children:[i(s.Cancel,{children:i(D,{color:"gray",variant:"ghost",children:"Cancel"})}),i(s.Action,{children:i(D,{color:"red",variant:"solid",children:"Revoke access"})})]})]})]})};var x,_,C;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <AlertDialog>
      <AlertDialog.Trigger>
        <Button color="red">Revoke access</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content className="max-w-md">
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This application will no longer be accessible and any
          existing sessions will be expired.
        </AlertDialog.Description>
        <HStack className="mt-4" justify="end">
          <AlertDialog.Cancel>
            <Button color="gray" variant="ghost">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" variant="solid">
              Revoke access
            </Button>
          </AlertDialog.Action>
        </HStack>
      </AlertDialog.Content>
    </AlertDialog>
}`,...(C=(_=m.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};const ba=["Usage"];export{m as Usage,ba as __namedExportsOrder,ma as default};
