import{F as r}from"./model.2a91cd51.js";import{J as a,G as i,Y as l,M as o,K as s,a0 as n}from"./clientConfigs.e860e5b4.js";import"./index.60b99fcd.js";const m=i({__name:"ValidateFormExample",setup(f){const t=l(new r({rule:[{type:"input",title:"\u59D3\u540D",field:"input",effect:{required:!0}},{type:"select",title:"\u6027\u522B",field:"select",options:[{value:"0",label:"\u7537"},{value:"1",label:"\u5973"}],effect:{required:!0}},{type:"radio",title:"\u51FA\u884C\u65B9\u5F0F",field:"travelMode",options:[{value:"104",label:"\u6B65\u884C"},{value:"105",label:"\u5730\u94C1"}],validate:[{required:!0,message:"\u8BF7\u9009\u62E9\u4F60\u7684\u51FA\u884C\u65B9\u5F0F",trigger:"change"}]},{type:"DatePicker",title:"\u51FA\u751F\u65E5\u671F",field:"birthday",validate:[{required:!0,message:"\u8BF7\u9009\u62E9\u51FA\u751F\u65E5\u671F",trigger:"change"}]}],option:{form:{labelPosition:"right"},onSubmit:e=>{alert(JSON.stringify(e))}}}));return(e,p)=>{const u=o("fits-form-create");return s(),n(u,{form:t},null,8,["form"])}}});var _=a(m,[["__file","ValidateFormExample.vue"]]);export{_ as default};