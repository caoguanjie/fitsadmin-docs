import{J as _,G as r,t as v,Y as F,M as s,K as c,L as D,O as l,T as a,P as p,N as t}from"./clientConfigs.3933146b.js";const f={class:"drag-dialog"},g=p(" \u6253\u5F00\u5F39\u7A97 "),m=t("div",null,"\u6211\u662F\u62D6\u62FD\u5F39\u7A97",-1),b=t("div",null,"\u6211\u662F\u62D6\u62FD\u5F39\u7A97",-1),A=t("div",null,"\u6211\u662F\u62D6\u62FD\u5F39\u7A97",-1),x=t("div",null,"\u6211\u662F\u62D6\u62FD\u5F39\u7A97",-1),C=t("div",null,"\u6211\u662F\u62D6\u62FD\u5F39\u7A97",-1),V=r({__name:"DragDialog",setup(h){const u=v(!1),n=F({title:"\u62D6\u62FD\u5F39\u7A97",width:"30%",draggable:!0});return(N,e)=>{const i=s("el-button"),d=s("fits-dialog");return c(),D("div",f,[l(i,{onClick:e[0]||(e[0]=o=>u.value=!0),type:"primary"},{default:a(()=>[g]),_:1}),l(d,{visible:u.value,dialogProp:n,onCancel:e[1]||(e[1]=o=>u.value=!1),onSubmit:e[2]||(e[2]=o=>u.value=!1)},{default:a(()=>[m,b,A,x,C]),_:1},8,["visible","dialogProp"])])}}});var B=_(V,[["__file","DragDialog.vue"]]);export{B as default};