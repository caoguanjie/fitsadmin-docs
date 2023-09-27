---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2023-09-27
---

# 常见问题

## 多页签切换会丢失`history.state`的参数

之前[app视图导航](http://192.168.32.60:3006/zh/FitsApp%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%A1%86%E6%9E%B6/%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87/App%E8%A7%86%E5%9B%BE%E5%AF%BC%E8%88%AA#h-231-params%E4%BC%A0%E5%8F%82)文章，提过关于vue页面如何通过`params传参`

上面介绍了一个`history.state`页面传参不需要明文的传参方式，下面大体回顾一下：

```ts
// 只需在 push 时 将参数传递到 state 字段中，vue-router 就会将参数存到 window.history.state 中。
// 路由的定义与普通方式无异
const routes: Array<RouteRecordRaw> = [
  {
    name: "APage",
    path: "/Apage",
    component: () => import("@/views/WebVue/components/APage.vue"),
    meta: { title: 'A页面' }
  },
];

// 传参
router.push({
  name:'APage',
  state: { id: 123 }
})

// 获取参数
let id = window.history.state.id;
// 或者
const { id, name } = window.history.state;
```

### 发现问题
有开发成员在使用上面的传参方式中发现了新的bug，就是通过`history.state`传参后，通过框架的多页签切换去到其他页面，再通过多页签切换回来之后，`history.state`参数消失了，举个例子：页面a ----> 页面b ---> 页面a，页面a通过tabviews组件跳转到页面b，再通过页签回到页面a之后，a页面的`history.state`参数消失了

### 原因
开发者是通过主动调用`router.push({state: 参数})`进行跳转页面传参的，然而多页签组件`/src/layout/components/TagsView/index.vue`是通过`<router-link>`进行页面的切换。关键代码：
```html
<router-link :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath, cache: true } as any" class="tags-view__item">
</router-link>
```

由上面的关键代码我们可以推断以下几点内容：
1. `to`属性是没有包括history的传参的，因此切换tab的时候，不可能会带上`history.state`参数
2. `to`属性实际上是往历史堆栈新增一条历史记录的，而不是`后退`，当新增历史记录时，没有带上`state`参数的话，自然不会存在`history.state`这个api中

### 解决方案

1. 给`Router`对象拓展一个`state`属性，存放每个路径需要`history.state`参数

```ts
/**
 * 重写router的push、go方法后，需要拓展cache属性
 */
declare module 'vue-router' {
    interface ObjectOf<state> {
        [fullPath: string]: state
    }
    interface Router {
        go(delta: number, option?: { cache: boolean }): void;
        back(option?: { cache: boolean }): void;
        forward(option?: { cache: boolean }): void;
        reload(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
        /** 判断是否需要刷新组件 */
        routerRefresh: boolean
        /** 判断是否需要对当前组件进行缓存 */
        keepAlive: boolean
        /** 新增state对象，通过fullpath作为键，history.state作为值，进行保存参数 */
        state: ObjectOf<any>
    }
}
```

2. 重写`router.push`和`router.replace`的方法，把每个路由的`history.state`参数保存到`router.state`对象里面，关键代码如下：

```ts
 /* =======================记录history.state的值  of  start============================================= */
if (!router.state) {
    // 初始化state属性
    router.state = {}
    // 这步是关键代码，当页面刷新时，当前路由的history.state对象虽然保留了，但是并没有记录在router.state属性中。因此这里要做一个预防操作
    // 通过解构赋值得到stateParams，back/current/forward这些参数是vue-router源码中要记录在history api的固定属性。
    const { back, current, forward, replaced, position, scroll, ...stateParams } = history.state;
    if (Object.keys(stateParams).length !== 0) {
        router.state[currentRoute.value.fullPath] = stateParams
    }
}
if (!location.state && router.state[_router.fullPath]) {
    location.state = router.state[_router.fullPath]
    to[0] = location
}

if (location.state) {
    // 如果前往的路径没值，需要赋值，如果前往的路由有值，也需要重新赋值，不然保存的参数就是旧的了。
    router.state[_router.fullPath] = location.state
}
/* =======================记录history.state的值  of  end============================================= */
```

3. 前端们只需要把文件`main/src/router/utils.ts`最新的代码进行更新，复制到你们的项目，即可以解决问题，不需要调整其他页面