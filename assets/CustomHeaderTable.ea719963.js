import{u as h}from"./FitsTableProHook.e36d816a.js";import{J as m,G as D,t as E,M as t,K as f,a0 as b,T as e,X as A,O as i,P as a,U as v,W as B,N as x}from"./clientConfigs.7ea3e47f.js";import"./index.3ae8f1ac.js";const V=u=>(v("data-v-34c00243"),u=u(),B(),u),T=a(" \u59D3\u540D "),w=a(" \u6309\u94AE "),y=a(" \u51FA\u751F\u65E5\u671F "),I=V(()=>x("span",{class:"vxe-icon-chart-bar-y"},null,-1)),N=D({__name:"CustomHeaderTable",setup(u){const o=E(""),l={columns:[{field:"name",title:"\u59D3\u540D",slots:{header:"name_header"}},{field:"phone",title:"\u7535\u8BDD"},{field:"birth",title:"\u51FA\u751F\u65E5\u671F",slots:{header:"birth_header"},headerClassName:"birthHeader"},{field:"address",title:"\u5730\u5740",width:320},{field:"operation",title:"\u64CD\u4F5C",slots:{header:"operation_header"}}],data:[{name:"\u738B\u4E94",phone:"13224452121",birth:"1999-10-08",address:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u5929\u6CB3\u533A\u4E94\u5C71\u8DEF\u4E1C\u57CE\u5C0F\u533A5\u53F7\u697C401"},{name:"\u674E\u6653\u660E",phone:"13754456492",birth:"2015-05-18",address:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u5929\u6CB3\u533A\u4E94\u5C71\u8DEF\u4E1C\u57CE\u5C0F\u533A5\u53F7\u697C403"},{name:"\u738B\u5927\u9646",phone:"13324459856",birth:"2000-01-05",address:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u5929\u6CB3\u533A\u4E94\u5C71\u8DEF\u4E1C\u57CE\u5C0F\u533A5\u53F7\u697C404 "},{name:"\u674E\u840C\u840C",phone:"18712458736",birth:"1879-12-13",address:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u6D77\u73E0\u533A\u4E94\u5C71\u8DEF\u5E78\u798F\u5C0F\u533A6\u53F7\u697C101 "},{name:"\u5F20\u5174",phone:"18924584265",birth:"1954-03-25",address:"\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02\u6D77\u73E0\u533A\u4E94\u5C71\u8DEF\u5E78\u798F\u5C0F\u533A7\u53F7\u697C102 "}]},s=E(),{fitsTablePro:_}=h(l,s);return(H,r)=>{const p=t("el-button"),C=t("el-input"),F=t("fits-table");return f(),b(F,{option:A(_),ref_key:"xGrid",ref:s},{name_header:e(({name:n,row:d})=>[T,i(p,{size:"small",type:"primary"},{default:e(()=>[w]),_:1})]),birth_header:e(({name:n,row:d})=>[y,I]),operation_header:e(({name:n,row:d})=>[i(C,{placeholder:"\u81EA\u5B9A\u4E49",modelValue:o.value,"onUpdate:modelValue":r[0]||(r[0]=c=>o.value=c)},null,8,["modelValue"])]),_:1},8,["option"])}}});var S=m(N,[["__scopeId","data-v-34c00243"],["__file","CustomHeaderTable.vue"]]);export{S as default};