# 微前端wujie

本文主要介绍如何在主应用和子应用接入微前端框架wujie（无界）

## 主应用

### 安装
```sh
pnpm install wujie-vue3 -S
```

### 设置子应用

为了统一管理所有微前端的接入方法，方便以后做脚手架的时候，方便剥离相关代码，所以统一所有方法都在状态管理器文件：`main/src/store/base/micro-frontends.ts`做封装处理。

```ts
 /**
 * 设置子应用的app属性
 * 这里其实就是做子应用的一些默认信息的预设置处理
 * 主要方便：启动app-startApp、预加载preloadApp两个api直接调用预先设置的参数，不用重复进行传入
 */
function setupSubApp() {
    setupApp({
        /** 唯一性用户必须保证 */
        name: "vite-vue3",
        /** 需要渲染的url */
        url: "//localhost:3001/",
        /** 预执行 */
        exec: true,
    });
}

 /**
 * @description 预加载api
 * 在入口文件mian.ts中使用该方法，可以提前把子应用的js、css等文件提前加载到项目中，并且生成iframe表
 * 预加载可以极大的提升子应用首次打开速度
 * 但是要注意它的缺点：资源的预执行会阻塞主应用的渲染线程，遇到复杂的业务，或者首页复杂时，要考虑子应用预加载的时机，在合适的时候进行预加载。
 */
function preloadSubApp() {
    preloadApp({
        /** 唯一性用户必须保证 */
        name: "vite-vue3",
        /** 需要渲染的url */
        url: "//localhost:3001/",
    })
}
```


## 子应用改造

::: note wujie的运行模式
由于无界有三种运行模式：单例模式、保活模式、重建模式

其中保活模式、重建模式子应用无需做过多改造，更多是做好兼容判断，因为子应用嵌入到主应用中，使用的shadow Dom的方式,因此产生window对象和css层级的影响，做些简单的兼容即可。

单例模式需要做对主应用做生命周期改造
:::


### 子应用`window`对象拓展

```ts
//  存放路径为：packages/vite-vue3/src/env.d.ts
// 拓展window对象后，直接使用拓展的属性，不会报ts错误
declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用mount函数
    __WUJIE_MOUNT: () => void;
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void;
    // 子应用无界实例
    __WUJIE: { mount: () => void };
  }
}
```

### 单例模式生命周期的改造

## 发现的问题

### 子应用的相对地址图片没有替换成绝对地址

原因：vite中没有webpack的`__webpack_public_path__`相对地址的概念，子应用中的`import.meta.url`在主应用中调用时会变成主应用的域名，导致图片地址失败。例如你的子应用的图片资源是`http://localhost:3001/vite-vue3/src/assets/Base/logotext.png`，在主应用中会自动请求`http://localhost:3000/src/assets/Base/logotext.png`

### 子应用的中不能使用 固定定位（fixed）

原因：固定定位是针对浏览器器视图窗口进行定位的，所以如果子应用用了固定定位，会导致布局错乱问题

### 子应用存在window对象调用层级不对的问题
原因：子应用嵌入主应用内，子应用中的`window.document.body`指向的就不是主应用中的body属性，而是shadow dom中内部body属性。

解决：子应用使用window的父节点document dom。例如：
```
# 在子应用中设置
const _document = window.__POWERED_BY_WUJIE__ ? window.parent.document.body : window.document.body
```

### 子应用冒泡系列组件（比如下拉框）弹出位置不正确

原因： 比如element-plus采用了popper.js2.0 版本，这个版本计算位置会递归元素一直计算到window.visualViewport，但是子应用的dom挂载在shadowRoot上，并没有window.visualViewport这部分滚动量，导致偏移计算失败

解决方案： 将子应用将body设置为position: relative即可

## IIS设置允许跨域

### 1. 找到HTTP响应头
![图 0](/images/20230727071629.png)  

### 2. 添加两组标头属性
```
Access-Control-Allow-Headers：Content-Type, api_key, Authorization
Access-Control-Allow-Origin：*
```
![图 1](/images/20230727071741.png)  

根据上面的设置，浏览器跨域访问就已经设置好了，不过要注意的是，`*`星号代表的时候允许所有源访问，在正式项目上是不安全的设置，可以设置主应用的域名，更为安全。
记得要设置常用标头，不然每次发布都会清掉上次设置的跨域配置