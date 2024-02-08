import{c as t,w as $,j as d,a as o}from"./component-GWnuE1KC.js";import{r as a}from"./index-4g5l5LRQ.js";import{c as n}from"./index-PzP5oypK.js";import{S as z}from"./scroll-area-PVfwx509.js";import{e as A,w as f,a as S}from"./margin.props-PzJgsS8k.js";import{a as k,b as I}from"./layout.props-sNWQDR2x.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-RWLJoJqn.js";import"./extends-dGVwEr9R.js";import"./index-OvZZPJzn.js";import"./index-jmm5gWkb.js";import"./index-YxBGvUbs.js";import"./index-uUL8xeMH.js";import"./index-RaHu7lN4.js";import"./index-f2GGseSc.js";import"./index-pbeB-vsG.js";import"./radius.prop-eqdedovG.js";import"./theme-options-gOxTq-NJ.js";const J=["1","2","3"],U=["surface","ghost"],R={size:{type:"enum",values:J,default:"2",responsive:!0},variant:{type:"enum",values:U,default:"ghost"}},F=["start","center","end","baseline"],G={align:{type:"enum",values:F,default:void 0,responsive:!0}},M=["start","center","end"],H={justify:{type:"enum",values:M,default:void 0,responsive:!0},width:{type:"string | number",default:void 0}},g=a.forwardRef((l,r)=>{const{rest:m,...i}=A(l),{className:c,children:T,size:p=R.size.default,variant:u=R.variant.default,...w}=m;return a.createElement("div",{ref:r,className:n("rt-TableRoot",c,`rt-variant-${u}`,f(p,"rt-r-size"),S(i)),...w},a.createElement(z,null,a.createElement("table",{className:"rt-TableRootTable"},T)))});g.displayName="Table";const E=a.forwardRef((l,r)=>a.createElement("thead",{...l,ref:r,className:n("rt-TableHeader",l.className)}));E.displayName="TableHeader";const v=a.forwardRef((l,r)=>a.createElement("tbody",{...l,ref:r,className:n("rt-TableBody",l.className)}));v.displayName="TableBody";const x=a.forwardRef((l,r)=>{const{className:m,align:i=G.align.default,...c}=l;return a.createElement("tr",{...c,ref:r,className:n("rt-TableRow",m,f(i,"rt-r-va",{baseline:"baseline",start:"top",center:"middle",end:"bottom"}))})});x.displayName="TableRow";const C=a.forwardRef((l,r)=>{const{rest:m,...i}=k(l),{tag:c="td",className:T,style:p,justify:u=H.justify.default,width:w=H.width.default,...D}=m;return a.createElement(c,{...D,ref:r,className:n("rt-TableCell",T,I(i),f(u,"rt-r-ta",{start:"left",center:"center",end:"right"})),style:{width:w,...p}})});C.displayName="TableCellImpl";const P=a.forwardRef((l,r)=>a.createElement(C,{...l,tag:"td",ref:r}));P.displayName="TableCell";const B=a.forwardRef((l,r)=>a.createElement(C,{scope:"col",...l,tag:"th",ref:r,className:n("rt-TableColumnHeaderCell",l.className)}));B.displayName="TableColumnHeaderCell";const j=a.forwardRef((l,r)=>a.createElement(C,{scope:"row",...l,tag:"th",ref:r,className:n("rt-TableRowHeaderCell",l.className)}));j.displayName="TableRowHeaderCell";const s=Object.assign({},{Root:g,Header:E,Body:v,Row:x,Cell:P,ColumnHeaderCell:B,RowHeaderCell:j}),O=t({id:"Table",baseElement:s.Root}),Z=t({id:"TableHeader",baseElement:s.Header}),_=t({id:"TableBody",baseElement:s.Body}),q=t({id:"TableRow",baseElement:s.Row}),K=t({id:"TableCell",baseElement:s.Cell}),L=t({id:"TableColumnHeaderCell",baseElement:s.ColumnHeaderCell}),Q=t({id:"TableRowHeaderCell",baseElement:s.RowHeaderCell}),e=$(O,{Header:Z,Body:_,Row:q,Cell:K,ColumnHeaderCell:L,RowHeaderCell:Q}),Te={title:"UI/Table",component:e},b={render:()=>d(e,{className:"w-[400px]",variant:"surface",children:[o(e.Header,{children:d(e.Row,{children:[o(e.ColumnHeaderCell,{children:"Full name"}),o(e.ColumnHeaderCell,{children:"Email"}),o(e.ColumnHeaderCell,{children:"Group"})]})}),d(e.Body,{children:[d(e.Row,{children:[o(e.RowHeaderCell,{children:"Danilo Sousa"}),o(e.Cell,{children:"danilo@example.com"}),o(e.Cell,{children:"Developer"})]}),d(e.Row,{children:[o(e.RowHeaderCell,{children:"Zahra Ambessa"}),o(e.Cell,{children:"zahra@example.com"}),o(e.Cell,{children:"Admin"})]}),d(e.Row,{children:[o(e.RowHeaderCell,{children:"Jasper Eriksson"}),o(e.Cell,{children:"jasper@example.com"}),o(e.Cell,{children:"Developer"})]})]})]})};var h,y,N;b.parameters={...b.parameters,docs:{...(h=b.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Table className="w-[400px]" variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
          <Table.Cell>danilo@example.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
          <Table.Cell>zahra@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
          <Table.Cell>jasper@example.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
}`,...(N=(y=b.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};const pe=["Usage"];export{b as Usage,pe as __namedExportsOrder,Te as default};
