---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-23
---

# Pinia状态管理

::: tip
Pinia 是 Vue.js 的轻量级状态管理库，Vuex 的替代方案。

尤雨溪于2021.11.24 在 Twitter 上宣布：Pinia 正式成为 vuejs 官方的状态库，意味着 Pinia 就是 Vuex 5 。

:::

![图 1](/images/20220823023939.png)  


## 目录说明

```sh
......                        
├── src                                 
│   ├── store                     # 状态管理器文件目录
│       ├── base                  # 框架封装已经封装好的基础文件
│           ├── app.ts            # 控制侧边栏是否显示，设备、语言，组件大小
│           ├── permission.ts     # 主要处理路由相关逻辑
│           ├── tagsView.ts       # 主要处理多页签的路由逻辑处理
│           ├── settings.ts       # 处理全局设置配置项、是否固定头部，是否显示多页签等等
│           └── user.ts           # 处理用户信息、登录、注销、重置密码等
│       ├── modules               # 主要存放是业务系统需要状态变量，以后每个业务系统根据自己需求，把需要定义的文件新建这个文件夹里面
│           └── example.ts        # 例子
│       └── index.ts              # 状态管理器的注册事件，各个模块的注册事件，全局注册事件
│       └── type.ts               # 预定义的相关类型
......    
```

## 如何新建Pinia模块

### 新建pinia文件
在目录`src/store/modules/`下新建一个`example.ts`文件
### 定义容器

在`src/store/modules/example`中存放业务的状态管理方法

```ts
import { ExampleState } from '@/store/type';
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';
const useExampleStore = defineStore({
  id: 'example',
  state: (): ExampleState => ({
    app: 'test',
  }),
  actions: {
    /**
     *  
     * @param withoutAnimation 
     */
    someThing() {
     
    },
  /**
     *  开启数据缓存
     * 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
     */
  persist: true
});

export default useExampleStore;
```

### 定义类型

在目录`src/store/type.ts`中定义新状态管理`example.ts`文件的`state`类型

```ts
// 预定义state的属性
export interface ExampleState {
    app: string;
}
```

### 局部注册

```ts
// 路径：src/store/index.ts
import useUserStore from './base/user';
import useAppStore from './base/app';
import usePermissionStore from './base/permission';
import useSettingStore from './base/settings';
import useTagsViewStore from './base/tagsView';
import useExampleStore from './modules/example.ts';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist'
import { App } from 'vue';

const store = createPinia()
store.use(piniaPluginPersist)

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore()
  example: useExampleStore();
});

export function setupStore(app: App) {
  app.use(store);
}

export default useStore;
```

::: tip 为什么是导出useStore对象，而不是直接导出store
有很多同学不是很理解，为啥这里要多做一个useStore对象，直接在页面上使用useAppStore不就可以了吗？

没错，在view的页面上，是可以直接调用`useAppStore()`,这里之所以要多做一个对象，是因为降低耦合性，举个例子，如果10个页面都直接调用`useAppStore()`方法，如果某一天我删除了`app.ts`文件后，是不是要去10个页面中，把这个10个路径导入给删除掉，这样就太麻烦了，如果多做这个`useStore`对象，当某个状态管理器文件删除掉，只需要在`index.ts`入口文件这里把映射关系给删除掉即可
:::

### 直接使用
```html
<script setup lang="ts">
import useStore from '@/store';

const { example } = useStore();

console.log(example.app)
</script>
```

## Pinia集成过程

### 安装Pinia

```sh
npm install pinia
# 数据持久化的插件
npm install vue3-persist-storages
```

### Pinia全局注册

```ts
// src/main.ts
// 挂载pinia状态管理
setupStore(app);

// src/store/index.ts
export function setupStore(app: App) {
  app.use(store);
}

```


### 数据持久化

这里要单独说一下数据持久化这块，FitsAdmin的框架的token存储主要采用的是cookie的存储方式，cookie存储主要的好处是，当浏览器所有窗口都关闭之后，token也会消失，下次打开浏览器就重新登录

除了以上原因，我们还自主研发了`vue3-persist-storages`这个终极存储方案，里面fitsadmin框架所有的存储方法，其特点如下：

- ✅ 囊括了`Cookies`、`LocalStorage`、`SessionStorage`、`indexedDB`、`WebSQL`所有存储方案，可以自定义选择
- ✅ 支持普通对象和`代理对象proxy`的存储
- ✅ 支持本地持久化存储的`有效期设置`
- ✅ 支持通过配置` 前缀、后缀 `，防止父子项目之间持久化数据互相污染
- ✅ 支持本地存储的数据自定义配置`AES加密`和`解密`
- ✅ 封装了pinia plugin 插件，支持pinia 的持久化存储，具体特点如下：
     - 与 [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) 相似的 API
     - 所有 Store 均可单独配置，也可以全局设置
     - 恢复持久化数据前后的 hook
     - 同样支持`有效期`、`数据加密和解密`、`自定义storage`设置


#### 初始化持久化插件

```ts
// 直接配置插件
import { createPinia } from 'pinia'
import piniaPluginPersisted from 'vue3-persist-storages'

const pinia = createPinia()
pinia.use(piniaPluginPersisted)
```


#### 全局配置
如果你不想要同域名下子项目持久化数据之间互相污染，可以全局配置前缀或后缀、数据库名、表名、是否开启调试、是否开启加密
```ts
export interface IPluginOption {
    // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // 数据库名称, 默认值：Vue3PersistStorage
    name?: string;
    // 数据库中表名，默认值：DataShee
    storeName?: string;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
}
```

具体使用：

```ts
import { createPinia } from 'pinia'
import {createPlugin} from 'vue3-persist-storages'

const pinia = createPinia()
pinia.use(createPlugin({
  // 前缀
   prefix: '子项目id', 
   // 开启数据加密
   encryption: true,
   // 开启调试
   debug: true
   // 全局配置默认数据库名
   name: 'TestDataBase'
}))
```

#### 模块配置

模块想要启用持久化，可以配置 persist 参数，它的类型是 TPersist

```ts
// 全局的配置，单个模块也可以继承，重新配置
export interface IPluginOption {
    // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // 数据库名称, 默认值：Vue3PersistStorage
    name?: string;
    // 数据库中表名，默认值：DataShee
    storeName?: string;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
}

export interface IStorageOption extends IPluginOption {
    // storage类型，有localStorage、sessionStroage（可选）,可配合type使用
    storage?: Storage;
    // 是否开启有效期, 默认值：false
    isOpenExpires?: boolean;
    // 有效期默认几天, 默认值: 7天
    day?: number;
}

export interface PersistOptions extends IStorageOption {
    // 使用 indexedDB 或 storage（可选）
    type?: 'storage' | 'indexedDB' | 'cookies';
    // 持久化存储的key（可选）
    key?: string;
    // 需要持久化的数据的路径（可选）
    paths?: string[];
    // 还原前执行函数（可选）
    beforeRestore?: (context: PiniaPluginContext) => void;
    // 还原后执行函数（可选）
    afterRestore?: (context: PiniaPluginContext) => void;
}

export type TPersist = boolean | PersistOptions | PersistOptions[];
```

当你要启用持久化时，可以这么做
```ts
export const useUserStore = defineStore({
  id: 'user',
  persist: true, // 开启持久化
  state: () => ({
    name: 'caoguanjie'
  })
});
```
当你设置 persist = true 时，此模块开启了持久化功能，相当于传入了默认配置：

```ts
 persist: {
    type: 'indexedDB',
    name: 'Vue3PersistStorage'
    storeName: 'DataSheet'
    key: $store.id, // 此模块的默认id
    paths: undefined,
    encryption: false,
    beforeRestore: undefined,
    afterRestore: undefined,
    debug: false,
  }
```

当然，你也可以传入`persist`相关对象属性，进行配置，如下：

```ts
export const useUserStore = defineStore({
  id: 'user',
  persist: {
      type: 'indexedDB',
      name: 'TestDataBase'
      storeName: 'DataSheet'
      key: 'customKey', // 自定义id，不传就是默认模块id
      paths: ['name'],
      encryption: true,
      beforeRestore: () =>{
        console.log('beforeRestore');
      },
      afterRestore: () => {
        console.log('afterRestore');
      },
      debug: false
  }, // 开启持久化
  state: () => ({
    name: 'caoguanjie'
  })
});
```

如果遇到模块不同的变量需要用不同的存储方式时，你也可以传入`数组`结构的数据，如下方法：
```ts
persist: [
    {
      type: 'indexedDB',
      encryption: true, // 用户信息可以设置加密
      paths: ["userInfo", "isRememberme", "loginInfo"],
    },
    {
      key: 'accessToken',
      type: 'cookies', // token可以cookies保存，并且可以自定义设置键名为accessToken
      paths: ["token"],
    },
  ],
```



::: tip
想学习更多「Pinia」更多用法，可以点击[Pinia.js上手指南](http://192.168.32.108:8012/#/knowledge/docs/piniajs)查看
:::