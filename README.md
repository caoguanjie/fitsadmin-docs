<p align="center">
    <img src="https://img.shields.io/badge/Vue-3.2.25-brightgreen.svg"/>
    <img src="https://img.shields.io/badge/Vite-2.9.7-green.svg"/>
    <img src="https://img.shields.io/badge/pinia-2.0.12-blueviolet.svg"/>
    <img src="https://img.shields.io/badge/Element Plus-2.2.9-blue.svg"/>
    <a src="https://github.com/caoguanjie" target="_blank">
        <img src="https://img.shields.io/github/stars/caoguanjie/fitsadmin.svg?style=social&label=Stars"/>
    </a>
    <br/>
    <a href="https://github.com/caoguanjie" target="_blank">
        <img src="https://img.shields.io/badge/Author-丰德前端框架组-orange.svg"/>
    </a>
</p>
<p align="center">
    <a target="_blank" href="https://caoguanjie.github.io/fitsadmin/">在线预览</a> |  <a target="_blank" href="https://caoguanjie.github.io/fitsadmin/">官方文档</a> 
</p>

# 介绍

## 项目简介
**FitsAdmin** 是基于[vue3-element-admin](https://gitee.com/youlaiorg/vue3-element-admin)升级的 Vue3 + Element Plus 版本的后台管理前端解决方案。

项目使用 Vue3 + Vite2 + TypeScript + Element Plus + Vue Router + Pinia + Volar 等前端主流技术栈，基于此项目模板生成的前端框架相信能解决您们大部分的难题，里面内置动态路由，权限验证，提炼了典型的业务模型、封装了通用型各种业务组件，提供了丰富的范例展示，可以帮助你快速搭建企业级的中后台产品原型


## 功能清单

![图 2](https://github.com/caoguanjie/fitsadmin/blob/master/docs/.vuepress/public/images/20220810044534.png)  

## 官方文档
> 由于fitsadmin的项目需要不断更新vue的版本和element-plus版本，文档却不需要时刻更新，如果再合相同的项目，会造成文档编译失败

[传送门](https://caoguanjie.github.io/fitsadmin/)


## 安装
```sh
# 下载项目
git clone https://github.com/caoguanjie/fitsadmin-docs.git

# 进入项目目录
cd fitsadmin-docs

# 安装依赖
npm install

#建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题, 也可以通过VPN科学上网的方式解决npm带来的问题
yarn 
# 或者
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run docs:dev
```