import{u as r}from"./FitsTableProHook.e36d816a.js";import{J as o,G as s,t as d,M as E,K as l,a0 as p,X as m}from"./clientConfigs.7ea3e47f.js";import"./index.3ae8f1ac.js";const F=s({__name:"ProxyTableDocs",setup(f){const e=d(),i={columns:[{field:"Checkbox",type:"checkbox",width:50},{field:"name",title:"\u59D3\u540D",editRender:{name:"input",defaultValue:"\u5C0F\u660E"}},{field:"phone",title:"\u7535\u8BDD",editRender:{name:"input",defaultValue:"13578459562"}},{field:"birth",title:"\u51FA\u751F\u65E5\u671F",editRender:{name:"input",defaultValue:"2006-11-07"}},{field:"address",title:"\u5730\u5740",editRender:{name:"input",defaultValue:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u8D8A\u79C0\u533A\u4E2D\u5C71\u8DEF\u5FEB\u4E50\u5C0F\u533A6\u53F7\u697C801"},width:320}],formConfig:{items:[{field:"name",title:"\u59D3\u540D",itemRender:{name:"ElInput",props:{placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D"}}}]},proxyConfig:{enabled:!0,form:!0,autoLoad:!1,ajax:{query:({form:a})=>new Promise(t=>{const u=[{id:"530000198307057387",birth:"2000-12-01",phone:"13254548965",name:"\u5F20\u6653\u660E",address:"\u4E0A\u6D77\u5FEB\u4E50\u5927\u905311111"},{id:"820000199611275163",birth:"2011-07-26",phone:"18752365489",name:"\u9648\u7F8E\u7F8E",address:"\u4E0A\u6D77\u5FEB\u4E50\u5927\u905311111"},{id:"81000019751226373X",birth:"1987-05-12",phone:"13784525698",name:"\u738B\u660E",address:"\u4E0A\u6D77\u5FEB\u4E50\u5927\u905311111"},{id:"12000020130303977X",birth:"1988-10-06",phone:"13784525698",name:"\u674E\u6676\u6676",address:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u5929\u6CB3\u533A\u4E94\u5C71\u5C0F\u8DEF2\u8857101"},{id:"510000201010286614",birth:"2011-07-26",phone:"18952364784",name:"\u738B\u660E",address:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u5929\u6CB3\u533A\u4E94\u5C71\u5C0F\u8DEF2\u8857101"},{id:"310000200307208631",birth:"1987-05-12",phone:"18952364784",name:"\u738B\u660E",address:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u5929\u6CB3\u533A\u4E94\u5C71\u5C0F\u8DEF1\u8857545"},{id:"340000197608296947",birth:"1987-05-12",phone:"18952364784",name:"\u9EC4\u767D",address:"\u5317\u4EAC\u5E02\u671D\u9633\u533A\u7FA4\u8857\u9053\u529E"}];setTimeout(()=>{t({list:u})},500)})},props:{list:"list"}}},{fitsTablePro:n}=r(i,e);return(a,t)=>{const u=E("fits-table");return l(),p(u,{option:m(n),ref_key:"xGrid",ref:e},null,8,["option"])}}});var h=o(F,[["__file","ProxyTableDocs.vue"]]);export{h as default};