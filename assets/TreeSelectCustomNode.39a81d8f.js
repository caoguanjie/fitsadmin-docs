import{F as u}from"./select.6897bcd8.js";import{J as c,G as p,Y as _,M as m,K as f,a0 as E}from"./clientConfigs.d60c235c.js";import"./index.60801fbb.js";import"./plugin-vue_export-helper.41ffa612.js";const b=p({__name:"TreeSelectCustomNode",setup(A){const n=_(new u({tree:{nodeKey:"id",defaultExpandAll:!0,expandOnClickNode:!1,data:[{id:"1",label:"\u603B\u7ECF\u529E",children:[{id:"4",label:"\u4E1A\u52A1\u90E8",children:[{id:"9",label:"\u4E1A\u52A1A\u90E8"},{id:"11",label:"\u4E1A\u52A1B\u90E8"}]}]},{id:"21",label:"\u7814\u53D1\u90E8",children:[{id:"5",label:"\u7814\u53D11\u90E8"},{id:"6",label:"\u7814\u53D12\u90E8"}]},{id:"3",label:"\u8D22\u52A1\u90E8",children:[{id:"7",label:"\u8D22\u52A11\u90E8"},{id:"8",label:"\u8D22\u52A12\u90E8"}]}],renderContent:s}})),o=e=>{let l=1e3;const t={id:l++,label:"testtest",children:[]};e.children||(e.children=[]),e.children.push(t),n.tree.data=[...n.tree.data]},r=(e,l)=>{const t=e.parent,i=t.data.children||t.data,a=i.findIndex(d=>d.id===l.id);i.splice(a,1),n.tree.data=[...n.tree.data]};function s(e,{node:l,data:t,store:i}){return e("span",{class:"custom-tree-node"},e("span",null,l.label),e("div",{style:"display: flex"},e("div",{onClick:a=>{a.stopPropagation(),o(t)},class:"operation"},"Append "),e("div",{style:"margin-left: 8px",class:"operation",onClick:a=>{a.stopPropagation(),r(l,t)}},"Delete")))}return(e,l)=>{const t=m("fits-tree-select");return f(),E(t,{options:n},null,8,["options"])}}});var D=c(b,[["__file","TreeSelectCustomNode.vue"]]);export{D as default};