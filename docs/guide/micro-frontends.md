# 微前端架构技术选型

## 背景

随着SPA大规模的应用，紧接着就带来一个新问题：**`一个规模化应用需要拆分`**。

1. 在技术浪潮的推动下，由vue、react所主导的单页面应用已成为主流，但在开发中，随着业务的深入和项目的复杂，带来了逻辑定位问题、打包速度问题、部署上线等等问题，往往我们可能只是更改了一行JS代码，到最后发布的时候，整个项目却要整个重新打包编译发布。一方面功能快速增加导致打包时间成比例上升，而紧急发布时要求是越短越好，这是矛盾的。另一方面当一个代码库集成了所有功能时，日常协作绝对是非常困难的。

2. 公司可能存在旧系统框架开发维护的项目，我们需要对以前的项目进行迭代或维护的时候，就不得不适应之前项目的开发环境，如果想要使用新技术，将会遇到阻碍。而且最近十多年，前端技术的发展是非常快的，每隔两年就是一个时代，导致同志们必须升级项目甚至于换一个框架。但如果大家想在一个规模化应用中一个版本做好这件事，基本上是不可能的。

3. 单页面应用在应对大型项目的场景下，不可避免的会造成用户在首次进入的时候加载时间较长，因为几乎所有JS都在打包在一起，即使采用路由懒加载的技术进行优化，也依然无法避免这其中产生的DNS解析、三次握手、网络传输、代码解析等耗费的时间代价。

## 我们所需要的

1. 能够使各个子模块或者子系统进行隔离。我们在开发或更新一个子模块的时候，只需要对这个子模块单独进行打包，发布上线，而不会影响到其他模块。各个子系统由于相互隔离，不会受限于技术栈的影响，更加轻量化，打包速度，前端性能等也会上去。

2. 不同开发团队之间的系统能够相互调用，能够使各个子系统之间进行数据共享，例如用户信息，状态。

3. 不同应用集成的时候代码改动尽可能少，耦合性低，能够对JS，CSS等进行相互隔离，各自子应用之间路由相对独立，防止出现方法或样式污染问题。

::: tip
最早的解决方案是采用iframe的方法，根据功能主要模块拆分规模化应用，子应用之间使用跳转。但这个方案最大问题是有非常多的不足，这个放在后续慢慢分析

那还有什么好的解决方案呢？微前端这样具有跨应用的解决方案在此背景下应运而生了！
:::



## 微前端是什么
::: info
“微前端”一词最早于2016年底在ThoughtWorks Technology Radar中提出。它将微服务的概念扩展到了前端世界。当前的趋势是构建一个功能强大且功能强大的浏览器应用程序（也称为单页应用程序），该应用程序位于微服务架构之上。随着时间的流逝，通常由一个单独的团队开发的前端层会不断增长，并且变得更加难以维护。这就是我们所谓的Frontfront Monolith。
:::

<strong style="color: red">微前端（Micro-Frontends）</strong>是一种类似于微服务的架构，它将微服务的理念应用于前端，是一种由独立交付的多个前端应用组成整体的架构风格，将前端应用分解成一些更小、更简单的能够独立开发、测试、部署的应用，而在用户看来仍然是内聚的单个产品。有一个基座应用（主应用），来管理各个子应用的加载和卸载。

![图 0](/images/20230719031752.png)  

简而言之，微前端就是将大而可怕的东西切成更小、更易于管理的部分，然后明确它们之间的依赖关系。我们的技术选择、代码库、团队和发布流程都应该能够独立运行和演变，而不会过度协调。

所以微前端不是指`具体的库`，不是指`具体的框架`，不是指`具体的工具`，而是一种`理想与架构模式`。




## 微前端的特点和价值

微前端架构具备以下几个核心价值：

* **技术栈无关**

&ensp;主框架不限制接入应用的技术栈，微应用具备完全自主权

* **独立开发、独立部署**
  
&ensp; 微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

* **增量升级**

&ensp; 在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略

* **独立运行时**
  
&ensp; 每个微应用之间状态隔离，运行时状态不共享

![图 1](/images/20230720020839.png)  



## 微前端的实现方案有哪些

### **路由转发方案**

我们知道单页面应用的路由控制都是在前端进行，当我们存在多个项目的时候，就算技术栈一样，A项目也指挥不了B里面的路由跳转。但是如果我们将路由跳转交给服务端，当我们访问一个路由的时候，后端进行重定向等操作，这样就会将我们的应用隔离开。由于不存在跨域，可通过cookie、localstorage等技术进行信息共享。因为每次路由匹配到的话，都会进行刷新，因此JS，CSS不会互相污染。

::: tip 优点
配置简单，可快速部署。
:::

::: danger 缺点
每次跳转都相当于重新刷新了一次页面，不是页面内跳转，体验较差
:::

### **iframe 方案**
从浏览器原生的方案来说，iframe 不从体验角度上来看几乎是最可靠的微前端方案了，主应用通过iframe 来加载子应用，iframe 自带的样式、环境隔离机制使得它具备天然的沙盒机制，但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。

这里部分原因可以查看微前端框架`qianku`的结论：[Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)

采用iframe的方案优点非常明显

::: tip 优点
* 非常简单，使用没有任何心智负担
* web应用隔离的非常完美，无论是js、css、dom都完全隔离开来
:::

由于其隔离的太完美导致缺点也非常明显
::: danger 缺点
1. url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
2. UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中..
3. 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登录效果。
4. 慢。使用iframe 会大幅增加内存和计算资源，因为 iframe 内所承载的页面需要一个全新并且完整的文档环境；每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。
5. iframe样式兼容问题。分别为功能性兼容性以及业务性兼容性的问题。并且可能会存在一些安全问题。
6. 主应用劫持快捷键操作
7. 事件无法冒泡到顶层，针对整个应用统一处理时效
8. 无法预加载缓存 iframe 内容
:::


### single-spa 方案

[single-spa](https://zh-hans.single-spa.js.org/docs/getting-started-overview/)是一个目前主流的微前端技术方案（ps:`它既是一种实现方案，也是一个微前端框架`），实现了路由劫持和应用加载（通过监听url change事件，在路由变化时匹配到子应用并进行渲染），其本身没有处理样式隔离和js执行隔离。其实，single-spa是一个子应用加载器与状态机的结合体,其主要实现思路：

* 预先注册子应用(激活路由、子应用资源、生命周期函数)
* 监听路由的变化，匹配到了激活的路由则加载子应用资源，顺序调用生命周期函数并最终渲染到容器


总结一下方案的优缺点：
::: tip 优点
* 监听路由自动的加载、卸载当前路由对应的子应用
* 完备的沙箱方案，js沙箱做了SnapshotSandbox、LegacySandbox、ProxySandbox三套渐进增强方案，css沙箱做了两套strictStyleIsolation、experimentalStyleIsolation两套适用不同场景的方案
* 路由保持，浏览器刷新、前进、后退，都可以作用到子应用
* 应用间通信简单，全局注入
:::


::: danger 缺点
* 基于路由匹配，无法同时激活多个子应用，也不支持子应用保活
* 改造成本较大，从 webpack、代码、路由等等都要做一系列的适配
* css 沙箱无法绝对的隔离，js 沙箱在某些场景下执行性能下降严重
* 无法支持 vite 等 ESM 脚本运行
:::

### **类 WebComponent 方案**
浏览器的原生组件，由三项主要技术组成，可以创建可重用的定制元素，不必担心代码冲突。

* Custom elements（自定义元素）：一组JavaScript API，允许定义custom elements及其行为，然后可以在页面中使用。
* Shadow DOM（影子DOM）：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其它部分发生冲突。
* HTML templates（HTML模板）：使用`<template>`和`<slot>`元素可以编写不在呈现页面中显示的标记模板，然后它们可以作为自定义元素结构的基础被多次重用。

可以看出来，Web Components是有能力以组件加载的方式将微应用整合在一起实现微前端架构的一种手段.

简单来说,就是通过CustomElement结合自定义的ShadowDom，将微前端封装成一个类似WebComponent组件，从而实现微前端的组件化渲染

总结一下该方案的优缺点：

::: tip 优点
* 是目前市面上接入微前端成本最低的方案
* 与技术栈无关：Web Components是浏览器原生组件，即可以在任何JS框架中使用。
* 独立开发：使用Web Components开发的应用无需依赖其它应用。
* 应用间隔离：Shadow DOM的特性，使得引入的微应用间可以达到相互隔离的效果
:::


::: danger 缺点
* 浏览器兼容性有限制，针对浏览器对`Shadow DOM`支持度较差的版本，无法实现。
:::


### **EMP 方案**

EMP 方案是基于 webpack 5 module federation 的微前端方案。通过cdn加载微应用，可以动态更新微应用，微应用只需要部署一次便可以提供给任何基于Module Federation的应用使用。每个微应用间都可以引入其它的微应用，无中心应用的概念。可以选择只加载微应用中需要的部分。每一个应用都可以进行状态共享。

总结一下该方案的优缺点：

::: tip 优点
* webpack 联邦编译可以保证所有子应用依赖解耦；
* 应用间去中心化的调用、共享模块。
* 模块远程 ts 支持；
:::

::: danger 缺点
* 对 webpack 强依赖，老旧项目不友好；
* 没有有效的 css 沙箱和 js 沙箱，需要靠用户自觉；
* 子应用保活、多应用激活无法实现；
* 主、子应用的路由可能发生冲突；
* **对我们公司而言，不支持vite项目，最大的原罪**
:::

### 微前端的细节实现
除了上面的概念架构，微前端的实现还有很多细节要走。
如图所示：

![图 0](/images/20230719051758.png)  

**目前微前端还在不断发展中，不断有新的方案被探索出来，期待更多新的方式方法的出现。**

## 微前端在企业项目中的使用场景

### 如何判断自己的项目需要使用微前端

1. 项目功能逐渐增多，代码规模庞大，导致代码维护和开发效率低下；
2. 项目需要集成多个不同技术栈的模块或服务；
3. 团队成员分散，各自负责开发不同的模块或服务，需要实现独立开发和部署；
4. 项目需要支持独立的生命周期管理和版本控制；
5. 需要实现高可用性和弹性伸缩；
6. 需要实现动态加载和卸载子应用等场景。

因此，如果你的项目具有上面这些特点，那么可以考虑使用微前端来优化项目架构和提升开发效率。

### 在我们公司内部实际应用场景

1. 例如运维开发团队想制作一个运维管理平台，把运维系统、资金系统、资产管理系统、客户关系管理系统等相关系统统一接入这个平台内，这就可以采取微前端的方式接入

2. 例如医疗项目中，不同的项目之间互相调用，每个项目项目的`开发团队不一样`，`上线时间不一样`，`迭代的时机也不一样`，可以使用微前端架构能优化项目架构和提升开发效率

3. 其他组别开发的企业内部通讯工具，类平台式的app，集成了我司不同项目组的各种项目以及外部第三方的OA系统，目前采用的iframe的集成模式，后期也可以往微前端的架构去考虑
   
4. 我司已存在的前端技术栈有多页面应用`Jquery旧框架`、单页面应用：`vue2`、`vue3`、`angular4`等不同框架的项目，目前用的就是`iframe 方案`进行接入的，后期可以慢慢尝试转入目前热门的微前端框架，统统在一个平台上兼容所有技术栈。


## 主流的微前端框架
::: info 国内的主流微前端框架主要有：
* 阿里：qiankun（乾坤）、 icestark
* 字节跳动：Garfish
* 腾讯无极低代码团队：wujie（无界）
* 京东零售团：Micro-App 
:::


### qiankun 方案

 [qiankun](https://qiankun.umijs.org/zh) 方案是蚂蚁金服团队基于 single-spa 的微前端方案。有兴趣的同学可以看看他们的官方宣讲稿：[可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)

至于另外一个微前端框架[icestark](https://micro-frontends.ice.work/)是阿里巴巴团队开发，一开始更多为了服务飞冰这个开源框架使用，对`react`应用来说支持度更好，跟qiankun类似，一样`single-spa` 的微前端方案,它们之间的api都差不多，但是显然`qiankun`发展最早，知名度最广，开发者更多，这里就不多介绍这个框架了。

::: tip 优点
1. html entry 的方式引入子应用，相比 js entry 极大的降低了应用改造的成本；
2. 完备的沙箱方案，js 沙箱做了 SnapshotSandbox、LegacySandbox、ProxySandbox 三套渐进增强方案，css 沙箱做了 strictStyleIsolation、experimentalStyleIsolation 两套适用不同场景的方案；
3. 做了静态资源预加载能力；
:::

::: danger 缺点
1. 适配成本比较高，工程化、生命周期、静态资源路径、路由等都要做一系列的适配工作；
2. css 沙箱采用严格隔离会有各种问题，js 沙箱在某些场景下执行性能下降严重；（ps：听说发布的v2.0版本解决主子应用样式冲突的问题，[目标是最完善的微前端解决方案 - qiankun 2.0](https://www.yuque.com/kuitos/gky7yw/viueoh)）
3. 无法同时激活多个子应用，也不支持子应用保活；
4. 无法支持 vite 等 esmodule 脚本运行；
:::

::: info 调研结果
 乾坤是虽然国内发展微前端框架最早的框架之一，用户基数大，迭代更新快，发布版本多，稳定性强。但是根据公司的前端项目而言，它并不是最适合我们的方案，例如：
 1. 它不支持 vite 构建，虽然社区有很多迂回的办法解决，但是代码入侵量大，改造麻烦，对子应用改造更大
 2. 它的样式隔离是被人吐槽最严重的缺陷之一，经常性css样式错乱
 3. 社区开发者一直呼吁它3.0版本尽快适配vite，但是官方没有任何答复，估计短时间内不会有好的解决办法
:::

### Garfish 方案

 [Garfish](https://www.garfishjs.org/) 方案是字节跳动的头条号团队也是基于 single-spa 的微前端方案。它的实现原理跟 qiankun 方案一样，有兴趣的同学可以阅读：[字节跳动是如何落地微前端的](https://blog.51cto.com/u_15204236/4162888)

 优缺点我就不重复赘叙了，我简单说一下我的看法

 ::: info 调研结果
 1. 虽然它比qiankun好一点，它支持了vite子应用，但是vite子应用要关闭沙箱，关闭了沙箱的话，不等于js、css污染问题就无法避免了吗，官方说法非常笼统，好像在挖一个大坑等我们去踩
![图 2](/images/20230720032439.png)  
2. 技术文档过于简单了，感觉很多东西都说不到点，我不敢轻易尝试。
:::

::: note 知识点补充：什么是沙箱?
沙箱隔离是一种安全机制，用于将不受信任的代码或程序隔离在一个受控的环境中，以防止其对系统造成损害。沙箱隔离可以限制代码的访问权限，限制其对系统资源的使用，并提供一种安全的执行环境。这种隔离可以防止恶意代码对系统进行攻击、传播病毒或访问敏感数据。沙箱隔离通常用于浏览器环境、操作系统环境和虚拟化环境等场景中，以确保系统的安全性和稳定性。
:::

以上两种方案都对vite支持不太好，为什么？

::: tip 知识点补充：qiankun 为什么不能和 vite 一起使用
* Vite 是一种新型的前端构建工具，与Webpack 相比，Vite 基于浏览器原生的ES Module
* Vite 构建模式在开发阶段基于浏览器加载ESM 模块，不支持require 语法的导入
* vite2 不支持`runtime publicPath`，这项能力在 `webpack` 中由内置变量`__webpack_public_path__`提供，`runtime publicPath`是 `qiankun` 加载子应用的核心 (由 `import-html-entry `模块提供) ，用于预加载及引入异步脚本。听说vite3版本已经解决这个问题。
* `ES Module` 会使`qiankun`的 js 沙箱失效，`qiankun` 内部的 js 沙箱使用将 window 对象进行了代理，以防止全局作用域被污染，但 esm 模块始终具有自己独立的顶级作用域，也就是说它访问到的 window 是全局作用域下的，而不是 qiankun 沙箱中提供的代理 window，虽然可以通过在生产环境打包为 `umd`格式的方式来避免使用 `esm`，但是这样改造更麻烦了。
:::




### micro-app 方案

[micro-app](https://zeroing.jd.com/micro-app/) 是京东新零售团队 基于 webcomponent + qiankun sandbox 的微前端方案。

micro-app并没有沿袭single-spa的思路，而是借鉴了WebComponent的思想，通过CustomElement结合自定义的ShadowDom，将微前端封装成一个类WebComponent组件，从而实现微前端的组件化渲染。并且由于自定义ShadowDom的隔离特性，micro-app不需要像single-spa和qiankun一样要求子应用修改渲染逻辑并暴露出方法，也不需要修改webpack配置，是目前市面上接入微前端成本最低的方案。

概念图

![图 3](/images/20230720035338.png)  


::: tip 优点
1. 使用 webcomponet 加载子应用相比 single-spa 这种注册监听方案更加优雅；
2. 复用经过大量项目验证过 qiankun 的沙箱机制也使得框架更加可靠；
3. 组件式的 api 更加符合使用习惯，支持子应用保活；
4. 降低子应用改造的成本，提供静态资源预加载能力；
:::

::: danger 缺点
1. 接入成本较 qiankun 有所降低，但是路由依然存在依赖（虚拟路由已解决）；
2. 多应用激活后无法保持各子应用的路由状态，刷新后全部丢失（虚拟路由已解决）；
3. css 沙箱依然无法绝对的隔离，js 沙箱做全局变量查找缓存，性能有所优化；
4. 支持 vite 运行，但必须使用 plugin 改造子应用，且 js 代码没办法做沙箱隔离；
5. 对于不支持 webcompnent 的浏览器没有做降级处理；
:::


::: info 调研结果
micro-app框架是我实践集成到fitsadmin框架里面的微前端框架之一，我用下来的感受和效果不太好。
1. vite支持度不够好，为了支持而支持的，子应用要增加很多代码才能生效，代码入侵性很强。
2. 路由控制很不好，主应用无法控制子应用的路由，需要传参数给子应用，然后子应用去调自身的路由去跳转，这样就很有问题了，有个时间差，就是主应用打开子应用时，会先看到子应用的默认首页，然后再跳转去目标页，这样的体验感太差了。
3. 为了兼容vite，它默认关闭沙箱，导致js污染了，只要切换子应用的页面，js绑定事件或者变量就会丢失，产生一堆报错，
:::

### wujie 方案
[无界](https://wujie-micro.github.io/doc/)微前端方案腾讯团队基于 webcomponent 容器 + iframe 沙箱，能够完善的解决适配成本、样式隔离、运行性能、页面白屏、子应用通信、子应用保活、多应用激活、vite 框架支持、应用共享等用户的核心诉求。

按官方说法，无界方案是 在乾坤的issue中一个[议题](https://github.com/umijs/qiankun/issues/286)觉得非常有意思：有个开发者提出能否利用iframe来实现js沙箱能力，这个idea启发了无界方案

它的优点都可以在这篇博文有详细的解析：[将微前端做到极致-无界微前端方案](https://zhuanlan.zhihu.com/p/551206945)。

::: danger 缺点
1. 内存占用较高，为了降低子应用的白屏时间，将未激活子应用的shadowRoot和iframe常驻内存并且保活模式下每张页面都需要独占一个wujie实例，内存开销较大
2. 兼容性一般，目前用到了浏览器的shadowRoot和proxy能力，并且没有做降级方案，iframe劫持document到shadowRoot时，某些第三方库可能无法兼容导致穿透
:::

可以说，从前面的微前端方案概念中， webcomponent 容器 、 iframe 沙箱都是非常好的方案，无界方案把它两结合在一起，给行业带了不一样的实现思路，我也深度体验了一下这个方案，我也尝试把它集成到fitsadmin框架里面，下面说说我的感受

::: info 调研结果
1. 子应用代码改动少
2. 主应用接入框架简单
3. 对vite的兼容性好，估计是因为iframe的原因吧
4. 路由控制模式很好，它接入子应用，完全可以根据iframe的特性来，iframe给什么地址，它的组件就给什么地址，它一打开就能去到子应用对应的地址上，在路由控制方面简单，但是界面显示和兼容性、交互体验比iframe好多了。
:::

### 各个框架的详细对比
> 截止时间2023年7月21日


|     对比参数       |     qiankun   |  Garfish      |   micro-app   |    wujie      |
| :-----------: | :-----------: | :-----------: | :-----------: | :-----------: |
|    大厂团队     | 阿里 | 字节跳动  | 京东  | 腾讯 |
|    首个版本  |  v1.1.4 (2019-08-01) |   v0.0.48-alpha.0（2021-09-22）| v0.1.0 (2021-07-09) | v1.0.0-rc.1 (2022-07-05) |
|    最近更新  |  v2.10.11（2023-07-06）| v1.16.2（2023-06-30）| v1.0.0-beta.5(2023-05-19) |  v1.0.18（2023-07-11）|
| github star | 14.6k :star: | 2.1k :star:  | 4.4k :star: | 3k :star: |
| 接入成本	| 中 | 中 |低（子应用不是vite的项目） | 较低 |
| 数据通信机制| 官方提供的Actions、window、props | eventBus | addDataListener | props、window、eventBus |
| 是否支持IE | :heavy_check_mark: | :x: |  :x: | :x: |
| 开箱即用  |  :x: |  :x: | :x: | :heavy_check_mark: |
| js沙箱 | :heavy_check_mark: | :heavy_check_mark:| :heavy_check_mark: | :heavy_check_mark: iframe来实现js沙箱 |
| 样式隔离 | :heavy_check_mark: | :heavy_check_mark:| :heavy_check_mark: |   :heavy_check_mark: webcomponent来实现页面的样式元素隔离 |
| 元素隔离 |  :x: | :heavy_check_mark:  | :heavy_check_mark: | :heavy_check_mark: |
| 静态资源地址补全 |  :x: |  :x: |  :heavy_check_mark: | :x: | 
| 子应用预加载| :heavy_check_mark:  | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| keep-alive |  :x: |  :x: |:heavy_check_mark: | :heavy_check_mark: | 
| 应用嵌套 | 	:heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | 
| 插件系统|  :x: |:heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| 子应用不改造接入 |  :x: |  :x: |  :x: | :heavy_check_mark: 满足跨域可以不改|
| 内置降级兼容处理	| :x: |  :x: | :x: |  :heavy_check_mark: 通过 babel 来添加 polyfill|

### 微前端框架选型最终方案

<p style="color: red; font-size:20px ">无界</p>



::: tip 选择wujie的原因：
1. vite支持度好，连技术文档都是用最新的vitePress，其他的框架还停留在vuepress等，最落后是京东micro-app还停留在docsify的阶段。
2. 子应用接入成本低，也就是说如果我司要接入其他项目的业务界面时，不需要子应用做过多的修改，接入第三方应用的时，还可以还原iframe的效果。
3. 路由控制隔离好，不用项目组之间可以独立开发自己的模块，拥有自己的路由，不用局限于主应用的路由规则
4. 文档比较详细，体验感好。
5. 官方提供的demo也比较丰富

总而言之，比较符合我们公司的实际应用场景，或许它不是上面框架中最好的一个，但是目前它是相对最适合的，后面其他框架有可能会迭代出更好的产品，到时候也许无界就不是最适合的方案了。
:::

::: danger 我们可能会面临的挑战
每个框架都会存在它们的优缺点，我们明确的他们的优点的同时，也要正视它的缺点，一旦Fitsadmin框架集成了wujie方案，我们将会面对以下情况：
1. 主应用的项目内存占用开销可能会比较大，这是无界这个框架最大的缺点了，vue3本来就存在很多内存泄露的bug，新增的wujie方案无疑会将我们的vue3的缺点放大，这个后续可能存在有`坑位`
2. wujie框架非常新，2022年才开始开源，这既是优点又是严重的缺点，新证明他的思路是新奇的，所以从上面的比较可以看出，各个方面都非常突出，但是新也意味着不够成熟，不如乾坤这个老大哥在微前端的领域定位那么稳定，新，也意味着集成之后，我们有可能会面临很多挑战，或许有不可控的bug还没有暴露出来等等。
3. 如果其他子应用要集成，或者公司内部老项目需要集成到一个主应用上，必须要求后端需要在服务器上配置`跨域允许`，这是所有微前端框架的能实现的前提。
:::





## 项目实战

### 某医疗平台微前端架构方案

![图 5](/images/20230721052443.png)  
