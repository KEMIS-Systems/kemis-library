import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{C as D,M as _,u as i}from"./index-BDyG-ru8.js";import{I as C}from"./inputtext.esm-DVmo08Jq.js";import{c}from"./utils.esm-EFZ4im7q.js";import"./index-BGsE_GxY.js";import"./portal.esm-BU1Y9Kmv.js";import"./index-B9nXkq7N.js";import"./tooltip.esm-CT1wgoBD.js";const o=({className:r,name:N,label:j,type:V,rules:a,autoFocus:v,form:d,child:u,placeholder:I,disabled:p,inputStyle:E,...w})=>e.jsx("div",{className:r??"",children:d&&e.jsx(D,{name:N,control:d.control,rules:a,render:({field:{ref:R,...m},fieldState:l})=>e.jsxs(e.Fragment,{children:[e.jsxs("label",{htmlFor:m.name,className:c({"text-red-400 ":l.error})+" block",children:[j,a!=null&&a.required?e.jsx("span",{className:"text-slate-300",children:" *"}):""]}),e.jsxs("div",{className:"flex flex-row items-center justify-start gap-2 [&_.p-inputtext]:disabled:bg-slate-100",children:[e.jsx(C,{...m,ref:R,id:m.name,type:V??"text",autoFocus:v,className:c({"p-invalid ":l.error})+` w-full ${p?"bg-slate-100":""}`,disabled:p,placeholder:I??void 0,...w}),u&&e.jsx(e.Fragment,{children:u})]}),e.jsx(_,{fieldState:l})]})})});o.__docgenInfo={description:"",methods:[],displayName:"InputText",props:{className:{required:!1,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"FieldPath",elements:[{name:"T"}],raw:"FieldPath<T>"},description:""},label:{required:!0,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:'"text" | "email" | "number" | "password" | "date"',elements:[{name:"literal",value:'"text"'},{name:"literal",value:'"email"'},{name:"literal",value:'"number"'},{name:"literal",value:'"password"'},{name:"literal",value:'"date"'}]},description:""},rules:{required:!1,tsType:{name:"RegisterOptions"},description:""},autoFocus:{required:!1,tsType:{name:"boolean"},description:""},form:{required:!0,tsType:{name:"UseFormReturn",elements:[{name:"T"}],raw:"UseFormReturn<T>"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},inputStyle:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},child:{required:!1,tsType:{name:"ReactElement"},description:""}},composes:["Partial"]};const A={title:"Form/InputText",parameters:{layout:"padded"}},s={render:()=>{const r=i({defaultValues:{nome:""}});return e.jsx(o,{name:"nome",label:"Nome",form:r,placeholder:"Digite seu nome"})}},n={render:()=>{const r=i({defaultValues:{nome:""}});return e.jsx(o,{name:"nome",label:"Nome",form:r,rules:{required:"Nome é obrigatório"},placeholder:"Campo obrigatório"})}},t={render:()=>{const r=i({defaultValues:{nome:"Valor fixo"}});return e.jsx(o,{name:"nome",label:"Nome (desabilitado)",form:r,disabled:!0})}};var f,x,b;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const form = useForm<FormValues>({
      defaultValues: {
        nome: ""
      }
    });
    return <InputText<FormValues> name="nome" label="Nome" form={form} placeholder="Digite seu nome" />;
  }
}`,...(b=(x=s.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var g,T,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const form = useForm<FormValues>({
      defaultValues: {
        nome: ""
      }
    });
    return <InputText<FormValues> name="nome" label="Nome" form={form} rules={{
      required: "Nome é obrigatório"
    }} placeholder="Campo obrigatório" />;
  }
}`,...(F=(T=n.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var y,h,q;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const form = useForm<FormValues>({
      defaultValues: {
        nome: "Valor fixo"
      }
    });
    return <InputText<FormValues> name="nome" label="Nome (desabilitado)" form={form} disabled />;
  }
}`,...(q=(h=t.parameters)==null?void 0:h.docs)==null?void 0:q.source}}};const B=["Default","Required","Disabled"];export{s as Default,t as Disabled,n as Required,B as __namedExportsOrder,A as default};
