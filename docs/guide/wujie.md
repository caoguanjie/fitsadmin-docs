# 微前端wujie

本文主要介绍如何在主应用和子应用接入微前端框架wujie（无界）

## 主应用改造

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
        plugins
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

/**
 * 这个插件是修改：vite4 子应用样式切换丢失
 * 用于 保活模式和单例模式
 */
const plugins = [
    {
        patchElementHook(element: any, iframeWindow: any) {
            if (element.nodeName === "STYLE") {
                element.insertAdjacentElement = function (_position: any, ele: any) {
                    iframeWindow.document.head.appendChild(ele);
                };
            }
        },
    },
]
```


## 子应用改造

::: note wujie的运行模式
由于无界有三种运行模式：单例模式、保活模式、重建模式

其中保活模式、重建模式子应用无需做过多改造，更多是做好兼容判断，因为子应用嵌入到主应用中，使用的shadow Dom的方式,因此产生window对象和css层级的影响，做些简单的兼容即可。

单例模式需要做对子应用做生命周期改造
:::


### 子应用`window`对象拓展

```ts
//  存放路径为：/src/env.d.ts
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
    // 无界对子应用注入了`$wujie`对象，可以通过`$wujie`或者`window.$wujie`获取
    $wujie: {
      bus: any;
      shadowRoot?: ShadowRoot;
      props?: { [key: string]: any };
      location?: any;
    }
  }
}
```

### 单例模式生命周期的改造

::: tabs
@tab:active 改造setupRouter函数
```ts
// 路径：/src/router/index.ts
/**
 * 定义一个方法，方便main.ts直接调用。
 * 拓展一个reload入参，只有是子应用的单例模式时，才需要修改这个方法
 * @param app
 */
export function setupRouter(app: App, reload = false) {
  if (reload) {
    // 如果在子应用的单例模式中，需要重新创建路由，不然会出现路由是上一个页面的情况
    const _router = createRouter({
      history: createWebHashHistory(),
      routes: constantRoutes as RouteRecordRaw[],
      // 刷新时，滚动条位置还原
      scrollBehavior: () => ({ left: 0, top: 0 })
    });
    // 用新创建的路由去替换原来的路由对象
    router = _router
  }
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
  // 路由方法的拓展，改写push、replace等写法
  RouterUtils(app.config.globalProperties.$router)
}

```

@tab 改造mian.ts
```ts
/**
 * 
 * @param app vue创建的实例
 * @param reload 拓展一个新的参数：是否要更新路由实例
 */
function init(app: App, reload = false) {
  Object.keys(directive).forEach((key) => {
    app.directive(key, (directive as { [key: string]: Directive })[key]);
  });

  formCreate.use(install)
  // 挂载路由
  setupRouter(app, reload);
  // 挂载pinia状态管理
  setupStore(app);
  // 全局注册更多第三方的组件库、插件等内容
  setupOtherImports(app)
  // 注册全局组件
  app.use(formCreate).mount('#app');
}

if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(AppComponent)
    init(instance, true)
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount()
} else {
  init(createApp(AppComponent))
}
```

:::


## wujie三种模式的应用

### 保活模式
子应用的 `alive` 设置为true时进入保活模式，内部的数据和路由的状态不会随着页面切换而丢失

在保活模式下，子应用只会进行一次渲染，页面发生切换时承载子应用dom的webcomponent会保留在内存中，当子应用重新激活时无界会将内存中的webcomponent重新挂载到容器上

由于子应用只会进行一次渲染，强烈建议用保活模式之前，一定要调用api`setupApp`和`preloadApp`进行预加载，因为进行预加载之后，子应用就可以绑定了`eventBus`的监听事件，到真的打开组件`Wujie`时，才能通过`eventBus`的钩子函数通知子应用去跳转相应的路由

保活模式下改变 url(这里的URL指的是，页面上组件WujieVue的props值`:url`) 子应用的路由不会发生变化，需要采用 `eventBus通讯` 的方式对子应用路由进行跳转

::: warning 注意
保活的子应用的实例不会销毁，子应用被切走了也可以响应 bus 事件，非保活的子应用切走了监听的事件也会全部销毁，需要等下次重新 mount 后重新监听。

如果子应用中的name相同的话，切换到新的tab页，原来的tab上组件wujie-vue就销毁了，如果tab有缓存意味切换回来tab的中组件wujie-vue组件不会重新渲染，看到页面就是空白，因此需要每次切换tab的时候 调用 startApp({name: 'xxx'，el: 'xxx'})，主动渲染
:::

用了保活模式一般是在减少内存开销的情况下去使用的，所以我们在确定只有一个子应用的时候，我们尽量保证只有一个`name`。为了保证切换tab不会出现空白页的同时，又能去到具体的页面，我们需要对主应用和子应用进行改造

::: tabs
@tab:active 主应用

```vue
<template>
    <div>
        <!-- 这个文件要注意一点内容，如果有注释，一定要使用一个空白div包裹住，不然会显示空白页，因为keepalive内只能存在一个组件的标签 -->
        <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
        <WujieVue v-if="loading" width="100%" height="100%" name="vite-vue3" :alive="true" :url="viteUrl" ref="wujie" />
    </div>
</template>
  
<script setup lang="ts">
import useStore from '@/store';
import WujieVue from 'wujie-vue3';
const { microFrontends: { subURL } } = useStore()
const { bus } = WujieVue;
// 拿到 WujieVue组件的实例对象
const wujie = ref()

const route = useRoute()
const viteUrl = ref(`${subURL}#${route.meta.path}`)

onMounted(() => {
    wujie.value.startApp({
      // 这里的name要跟组件的一样
        name: 'vite-vue3',
        // URL也是要跟组件的属性一样。
        url: viteUrl
    }).then(() => {
       // 主动渲染之后，执行 bus 通讯，告诉子应用要跳转的地址是啥， 这步很重要
       // 如果不在then之后执行，你会发现，bus不生效
        bus.$emit("move", {
            path: '这里的对象可以根据实现的项目需要进行命名'
        });
    })


})
</script>
```

@tab 子应用
在路径：`/src/App.vue`文件内设置bus的监听事件，用于接受主应用的路由控制

```vue

<script setup lang="ts" name="">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
window.$wujie?.bus.$on("事件的名字自定义，要唯一", (obj: any) => {
  router.push(obj)
});

</script>
```
:::


::: danger 保活模式有几个坑要注意
1. 如果在状态管理器中设置的`setupApp`方法中的URL中没有具体的地址，那么在`WujieVue`组件中再设置完整地址的URL属性无用，会直接打开子应用的首页，如果要跳转到具体地址，需要使用通讯功能bus，通知子应用自身跳转
2. 如果`WujieVue`组件所在的组件设置缓存，一定要在onActivated生命周期中重新调用`startApp`的方法，不然切换tab之后，再切换回来，页面会显示空白
3. 如果`WujieVue`组件所在的组件设置缓存，本身wujie也设置了保活模式，最好不要打开新的tab，跳转到新的子应用页面，这样当前组件的状态就保留不了，如果此刻连子应用的状态都想保留，还要子应用设置keepalive属性，这样改造的成本很大，不值得
   
:::


### 单例模式
子应用的alive为false且进行了[生命周期](../guide/wujie.md#单例模式生命周期的改造)改造时进入单例模式。

子应用页面如果切走，会调用`window.__WUJIE_UNMOUNT`销毁子应用当前实例，子应用页面如果切换回来,会调用`window.__WUJIE_MOUNT`渲染子应用新的子应用实例

在单例式下，改变 url(这里的URL指的是，页面上组件WujieVue的props值`:url`) 子应用的路由会发生跳转到对应路由

如果主应用上有多个菜单栏用到了子应用的不同页面，在每个页面启动该子应用的时候将name设置为同一个，这样可以共享一个wujie实例，承载子应用js的iframe也实现了共享，不同页面子应用的url不同，切换这个子应用的过程相当于：销毁当前应用实例 => 同步新路由 => 创建新应用实例

单例模式的使用场景是：当使用保活模式时，子应用的实例是不会销毁的，会占用一定的内存消耗，此时使用单例模式时，你离开当前页面，会及时销毁子应用的实例，释放一定的内存资源，用户体验方面会比保活模式会稍差点，比较创建和销毁时需要时间的。

使用单例模式要对子应用有个大改造，参考上面：[单例模式生命周期的改造](../guide/wujie.md#单例模式生命周期的改造)

主应用的是使用大概情况：

```vue
<template>
    <div>
        <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
        <WujieVue v-if="loading" width="100%" height="100%" name="vite-vue3" :alive="false" :url="viteUrl" ref="wujie" />
    </div>
</template>
  
<script setup lang="ts">
import useStore from '@/store';
import WujieVue from 'wujie-vue3';
const { microFrontends: { subURL } } = useStore()
const { bus } = WujieVue;
// 拿到 WujieVue组件的实例对象
const wujie = ref()

const route = useRoute()
const viteUrl = ref(`${subURL}#${route.meta.path}`)


/*
* 使用单例模式，是不需要下面的代码的，因为子应用进行了改造，改变上面的URL就可以去到具体的页面了。
onMounted(() => {
    wujie.value.startApp({
      // 这里的name要跟组件的一样
        name: 'vite-vue3',
        // URL也是要跟组件的属性一样。
        url: viteUrl
    }).then(() => {
       // 主动渲染之后，执行 bus 通讯，告诉子应用要跳转的地址是啥， 这步很重要
       // 如果不在then之后执行，你会发现，bus不生效
        bus.$emit("move", {
            path: '这里的对象可以根据实现的项目需要进行命名'
        });
    })


})
*/
</script>
```

### 重建模式

子应用既没有设置为保活模式，也没有进行生命周期的改造则进入了重建模式，每次页面切换不仅会销毁承载子应用dom的webcomponent，还会销毁承载子应用js的iframe，相应的wujie实例和子应用实例都会被销毁

重建模式下改变 url 子应用的路由会跳转对应路由，但是在` 路由同步 `场景并且子应用的路由同步参数已经同步到主应用url上时则无法生效，因为改变url后会导致子应用销毁重新渲染，此时如果有同步参数则同步参数的优先级最高

重建模式通俗点来说等同于`iframe`标签，随着vue组件的切换，会销毁iframe，每次打开新页面都是一个全新的iframe标签。因此如果使用重建模式最为简单，完全当`iframe`来使用即可，而且它有预加载的功能，可以让你提前加载到子应用的资源，体验感觉肯定比iframe要很多。

## 为什么使用wujie微前端子应用切换起来会比较快？

::: info 一个子应用的加载可以分为三个过程：
1. 静态资源的请求下载
2. 资源的运行，包括html的解析、js的解析执行
3. 子应用的实例mount
:::

其中 过程 1 可以无界通过 `preloadApp` 的api 来提前加载，过程 2 和 3 可以通过 `preloadApp `的 `exec(预加载)` 模式来提前执行，但是这个preloadApp是相当于将子应用的加载提前执行了。

如果子应用从来都没有加载也没有采用preloadApp预加载，那么就要经历过程1、2、3，白屏时间较长

如果子应用之前已经加载过了：

* 运行的是保活模式（sync = true），那么子应用重新打开过程1、2、3都不需要，无白屏时间
* 运行的是单例模式（sync = false && 子应用做了生命周期适配），那么子应用会重新进行只会过程3，白屏时间很短。对于做了生命周期适配的子应用，1、2 步只会执行一次，每次子应用的切换都是创建和销毁 Vue()实例，这个成本非常低。Vue 这样的构造函数在过程 2执行之后就一直在内存中，因此单例模式调用的都是大部分是缓存。
* 运行的是重建模式（sync = false && 子应用没有做生命周期适配），那么子应用重新打开会进行过程2、3，白屏时间较长

因此，我们要特别注意单例模式的使用

子应用不应该往` createApp(AppVue)` 实例 原型上放任何对象。每次渲染 new Vue() 实例如果放东西势必会影响一下的渲染，按道理来说，子应用被销毁后，子应用的vue实例原型中也要及时清理挂载的对象。例如：

```js
// 清理副作用
  onUnmounted(() => {
    app.config.globalProperties.$http = null;
  }),
```




## 如何做好主应用和子应用的组件缓存方案

在[Keepalive页面缓存机制](../guide/keepalive.md)一文中，我们可以知道，单一项目fitsadmin框架的组件缓存方案主要依靠`keepalive`组件做各种状态的管理，从而达到组件缓存的目的。在无界框架中，我们有`保活`、`单例`、`重建`三种状态可以选择，到底哪一种更符合我们的组件缓存的方案呢？这是我们将要讨论的内容





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


### 单例模式下切换tab，子应用只是第一次成功加载，第二次之后出现白屏

原因：子应用加载第一次之后，Pinia状态管理器中的用户信息已经存在，销毁Vue的实例，并不会销毁状态管理器上面的值，因此第二次打开子应用时，发现在路由守卫（routerGuard.ts）中的关键代码` if (user.roles.length === 0) `判断用户角色已经存在了，因此没有执行里面的生成动态路由的逻辑，导致了没有生成完整路由，导致页面空白。

解决方案：
1. 给子应用的所有状态管理器文件加上`路径前缀`，让子应用在创建状态时跟主应用不要共用相同的状态和变量。

```ts
// 给子应用的id加上路径前缀，区分主应用和子应用的状态
const usePermissionStore = defineStore({
  id: import.meta.env.BASE_URL + 'permission',
})
```

::: warning 注意
加路径的前缀这个操作，更多是在主应用和子应用在相同域名底下部署，必须要这样操作，但是如果主应用和子应用在不同的域名底下部署的话，则不需要改造，因为不会影响到它们数据持久化，window.localstorge等api本身就是不同域名有不同的作用域
:::

2. 然后改造`main.ts`文件和`@/store/index.ts`文件
::: tabs
@tab:active main.ts
```ts
if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(AppComponent)
    init(instance, true)
  };
  /**
   * 每次销毁之前，先清空用户信息，在路由守卫方法中，是根据用户的角色是否存在，去执行动态路由生成。
   * 因此每次创建新的vue实例时，需要先清空用户信息，才保证路由守卫重新执行动态路由的生成
   */
  window.__WUJIE_UNMOUNT = () => {
     /** ----------关键代码在这里 ------------- */
      clearUserInfo();
     /** ----------关键代码在这里 ------------- */
    instance.unmount();
  };
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount()
} else {
  init(createApp(AppComponent))
}
```
@tab @/store/index.ts
```ts
/**
 * 清理用户信息
 */
export function clearUserInfo() {
  const { user } = useStore();
  user.roles = []
}
```
:::


::: tips 温馨提醒
不同项目组获取的动态菜单逻辑不一样，有些项目是通过写死的，有些项目是后端返回的菜单树，因此开发人员要懂得相应进行调整，上面解决方案是作为一个参考方案。
:::



### 子应用被多次切换导致el-popover报错，程度直接挂掉
> 相关问题在[issue](https://github.com/Tencent/wujie/issues/325)有相应的解决办法

![图 2](/images/20230802034310.png)  


原因：在 `element-plus` 中，将所有的` el-popper` 插入到一个根元素` .el-popper-container-N` 中，当一个应用被联想后，这个根元素` .el-popper-container-N `被 wujie 来自 dom树上被移除了，当这个应用再次启动时，这个根元素没有被创建，但是被引用了。

解决方案：

1. 框架已经把关键代码写在了状态管理器文件`src/store/base/micro-frontends.ts`

```ts
    /**
     * 修复element-plus中有使用Teleport组件带来的副作用，导致的页面报错奔溃
     * @returns 
     */
    function fixElementPlusTeleportCrash() {
        const { id, selector } = usePopperContainerId()
        if (!document.body.querySelector(selector.value)) {
            const createContainer = (id: string) => {
                const container = document.createElement('div')
                container.id = id
                document.body.appendChild(container)
                return container
            }
            const container = createContainer(id.value)
            return () => {
                container.remove()
            }
        }
        return () => { }
    }
```

2. 子应用需要改造`main.ts`文件和`@/store/index.ts`文件
::: tabs
@tab:active main.ts
```ts
if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(AppComponent)
    init(instance, true)
    /** ----------关键代码在这里 ------------- */
    instance.dispose = fixElementPlusTeleportCrash()
    /** ----------关键代码在这里 ------------- */
    console.error('创建了', instance)
  };
  /**
   * 每次销毁之前，先清空用户信息，在路由守卫方法中，是根据用户的角色是否存在，去执行动态路由生成。
   * 因此每次创建新的vue实例时，需要先清空用户信息，才保证路由守卫重新执行动态路由的生成
   */
  window.__WUJIE_UNMOUNT = () => {
    console.error('销毁了')
    clearUserInfo();
     /** ----------关键代码在这里 ------------- */
    instance.dispose();
     /** ----------关键代码在这里 ------------- */
    instance.unmount();
  };
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount()
} else {
  init(createApp(AppComponent))
}
```
@tab @/store/index.ts
```ts
/**
 * 修复element-plus中有使用Teleport组件带来的副作用
 */
export function fixElementPlusTeleportCrash() {
  const micro = useMicroFrontendsStore();
  return micro.fixElementPlusTeleportCrash();
}
```
:::
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