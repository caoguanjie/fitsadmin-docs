---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2023-10-13
---

# 数据持久化存储方案

在前端开发中，数据的存储是一个非常重要的主题。随着HTML5的发展，我们可以使用新的API来进行数据的存储和操作，这给开发人员带来了很多便利。
在实际开发中，数据的存储需要考虑很多种场景下的存储方式相互兼容，至少要满足存储大小要足够大、数据存储安全性问题、兼容性要好，要覆盖全多种设备多种浏览器等等。

本文将详细介绍HTML5中几种常见的存储方式，包括Local Storage、Session Storage、IndexedDB和Cookies，并讲解它们的特点、使用场景、优缺点，并举例说明每种存储方式在什么情况下最适用，并且详细介绍针对以上存储方式，提出最全最好的解决方案：<a style="color: red;font-size: 20px" href="https://www.npmjs.com/package/vue3-persist-storages" target="_bank">vue3-persist-storages</a>

## Local Storage 本地存储

#### 特点：

* Local Storage 提供了一种持久化的客户端存储方式，数据在浏览器关闭后仍然保留。

* 使用键值对的方式来存储数据，可以通过键名来获取对应的值。

* 存储的数据是以字符串的形式存储的。

#### 使用场景：

* 适用于需要在多个页面或会话之间共享数据的场景，例如用户的偏好设置、历史记录等。
* 适用于需要在用户下次访问网站时仍然保存数据的场景。

#### 优点：

* 数据持久化，即使关闭浏览器后再次打开，数据仍然存在。
* 支持存储大量数据，不能超过**5M**的容量大小
* 简单易用，只需要调用对应的API即可进行数据的存取操作。

#### 缺点：

* 存储的数据类型受限，只能存储字符串。
* 运行在同一个域下的页面可以访问和修改相同的 Local Storage 数据，可能会出现数据冲突的问题。
* 不能像cookie存储那样有设置过期时间，控制数据的有效期。

#### 示例：

```ts
localStorage.setItem('username', 'caoguanjie');
localStorage.setItem('age', '30');

// 获取数据
const username = localStorage.getItem('username');
console.log(username); // 输出：caoguanjie
```

#### 最适用情况：

Local Storage 最适合用于需要长期持久化存储大量数据，并且需要在多个页面或会话之间共享数据的场景。

<br>

----

<br>

### 使用LocalStorage最佳方案：CreateStorage

`CreateStorage`能做到的是就是保留LocalStorage的优点，同时解决了LocalStorage的缺点，

#### 特点：
* 支持设置过期时间，控制数据的有效期。
* 支持数据的加密和解密功能
* 支持设置数据的前缀、后缀， 保证运行在同一个域下的父子应用不会造成数据污染
  
#### 示例：
```js
import { CreateStorage } from 'vue3-persist-storages'

const storage = new CreateStorage()
//  普通使用 string/boolean/number 基本类型
storage.setItem('name', '张三')
console.log(storage.getItem('name')) // 输出 张三

// 保存对象，直接传入即可
storage.setItem('name', {id: '张三'})

// 可以开启有效期、数据加密、前后缀防止数据污染
const storage = new CreateCookies({
  storage: sessionStorage,
  prefix: '前缀',
  suffix: '后缀',
  isOpenExpires: true,
  storage: ,
  day: 0.5,
  encryption: false,
})
```

#### 配置项：

```ts
export interface IStorageOption {
     // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // storage类型，有localStorage、sessionStroage（可选）
    storage?: Storage;
    // 是否开启有效期, 默认值：false
    isOpenExpires?: boolean;
    // 有效期默认几天, 默认值: 7天
    day?: number;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
}

```


#### CreateStorage方法：

```ts
// 这里的api几乎跟localstorages的原生api一致，只是在原生api的基础至少，解决过期时间设置、数据加密解密设置的问题
export interface Vue3PersistStorages {
    // 通过键值获取数据
    getItem<T>(key: string): Promise<T | null> | T;
    // 通过键值对设置数据
    setItem<T>(key: string, value: T, expires?: number, isOpenExpires?: boolean): Promise<T | null> | T;
    // 通过键名，删除数据
    removeItem<T>(key: string): Promise<T | null> | T;
    // 清除storage存储的所有数据
    clear<T>(): Promise<T | null> | T;
}
```

## Session Storage 会话存储

#### 特点：

* Session Storage 与 Local Storage 类似，但数据仅在当前会话中有效。
* 数据在用户关闭浏览器或标签页后会自动清除。


#### 使用场景：

* 适用于需要在用户当前会话中临时保存数据的场景，例如购物车数据、表单临时存储等

#### 优点：

* 数据只在当前会话中有效，不会长期存储占用本地存储空间。
* 数据不会被其他页面或会话所共享。

#### 缺点：

* 数据随着会话关闭而丢失，不适用于需要长期保存数据的场景。
* 仅限于同一浏览器窗口或同一标签页中的页面访问
* 不能像cookie存储那样有设置过期时间，控制数据的有效期。
* 跟localstorages一样，存储的数据类型受限，只能存储字符串。


#### 示例：

```ts
sessionStorage.setItem('username', 'caoguanjie');
sessionStorage.setItem('age', '30');

// 获取数据
const username = sessionStorage.getItem('username');
console.log(username); // 输出：caoguanjie
```

#### 最适用情况：
Session Storage 最适合用于需要在用户当前会话中临时保存数据的场景，不需要长期保存数据，也不需要与其他会话或页面共享数据。例如购物车数据、表单临时存储等

<br>

----

<br>


### 使用Session Storage最佳方案：CreateStorage
这部分的内容，Local Storage 本地存储的实现是一样的，里面封装的api和配置项都是一致的，通过`IStorageOption`配置里面`storage`属性决定`CreateStorage`实体类执行什么存储方案

<br>

----

<br>

## IndexedDB 数据库

#### 特点：
* IndexedDB 是 HTML5 提供的一种高级客户端存储方式，提供了类似关系型数据库的功能。
* 可以存储结构化数据，并支持索引进行高效查询。
* 需要使用 IndexedDB API 进行数据的存取和操作。

#### 使用场景：
* 适用于需要存储大量结构化数据或需要进行复杂查询的场景，例如离线应用、缓存数据等。

#### 优点：
* 支持事务处理，保证数据的一致性和完整性。
* 可以存储复杂的结构化数据，并支持使用索引进行高效查询。
* 数据存储在浏览器中，不需要依赖服务器端。
* 没有存储压力了，只要客户端的有足够的存储空间，都可以存储
  

#### 缺点：
* 使用 IndexedDB API 相对复杂，需要掌握一定的数据库操作知识，入门有一定的难度
* 兼容性问题，不同浏览器对 IndexedDB 的实现存在差异。
* 不能像cookie存储那样有设置过期时间，控制数据的有效期。

#### 示例：

```js
const request = indexedDB.open('myDB', 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('users', { keyPath: 'id' });
  // 创建索引
  objectStore.createIndex('name', 'name', { unique: false });
};

request.onsuccess = function(event) {
  const db = event.target.result;
  const transaction = db.transaction('users', 'readwrite');
  const objectStore = transaction.objectStore('users');
  const user = {
    id: 1,
    name: 'John',
    age: 25
  };
  objectStore.add(user);
};
```
#### 最适用情况：

IndexedDB 最适合用于需要存储大量结构化数据或需要进行复杂查询的场景，例如实现离线应用或需要在前端进行缓存数据的情况,离线存储就类似那种手机浏览器，没有网络时，打开app还能看到首页有很多图片数据和标题，这些数据是上一次离线缓存所保存的数据。

### 使用IndexedDB最佳方案：CreateLocalForage

indexedDB的API相对更难一些，为了更方便使用和入门，vue3PersistStorages采取了[localForage](https://github.com/localForage/localForage)作为接入`indexedDB`的解决方案，`localForage`只需要通过简单类似 `localStorage API` 的异步存储来改进你的 Web 应用程序的离线体验，它能存储多种类型的数据，而不仅仅是字符串，针对浏览器进行了兼容处理，当浏览器无法兼容`indexedDB`会自动降级使用`localStorage`进行存储。它还有一个优势，就是后续可以拓展方法与`sqlite`进行联动使用。
#### 示例：
```js
import { CreateLocalForage } from 'vue3-persist-storages'

// 直接使用localforage的api和相关方法
const localforage = new CreateLocalForage({
  name:'test',
  storeName: 'sheet',
  driver: [localforage.LOCALSTORAGE],
})
// 生成的localforage对象，会直接存放在`CreateLocalForage`的storages属性中，这样可以随时调用，CreateLocalForage没有封装过的关于localforage api的方法，
// 关于localforage更具体的api，可以参考： https://localforage.docschina.org/
localforage.storage.keys((key: any) => { console.log(key); })


// 可以开启有效期、数据加密、前后缀防止数据污染
const localforage = new CreateLocalForage({
  prefix: '前缀',
  suffix: '后缀',
  storage: localStorage,
  isOpenExpires: true,
  day: 0.5,
  encryption: false,
})
localforage.setItem('name', { id: 1 })
console.log(localforage.getItem('name'))

// 可以为单个键值为name，独立设置数据有效期为0.5天，其他数据不设有效期
localforage.setItem('name', { id: 1 }, true, 0.5)
```





####  LocalForageOptions 配置项：

如果你想单纯只使用`LocalForage API`的话，可以只配置`LocalForageOptions`属性，即可跟官方配置一样

|  属性名  |  类型    | 说明    |默认值    | 
| ------- | ------- | --------- |  --------- |
| driver  | string | string[]  | 驱动，也就是选择是存储方式 |      [localforage.INDEXEDDB, localforage.WEBSQL,localforage.LOCALSTORAGE]                          | 
| size | string  | 数据库的大小（以字节为单位）。目前仅在 WebSQL 中使用  | - |
| version | string | 数据库的架构版本。仅在 WebSQL 和 IndexedDB 中使用 | - |
| description | string  | 数据库的描述，主要供开发人员使用 | - |
| name | string  | 数据库的名称 | Vue3PersistStorage |
| storeName | string  | 数据库建表的名称 | DataSheet |

#### IStorageOption 配置项：
如果在希望给`LocalForage`的使用上，加上`有效期设置`、`数据加密解密功能`、`添加前缀后缀`防止数据污染，则需要额外添加`IStorageOption`属性
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

export interface IStorageOption extends IPluginOption {
    // 是否开启有效期, 默认值：false
    isOpenExpires?: boolean;
    // 有效期默认几天, 默认值: 7天
    day?: number;
}
```

## Cookies


#### 特点：

* Cookies 是一种在客户端存储小型数据的方式，通过 HTTP 协议在客户端和服务器之间传递。
* 可以设置 Cookies 的过期时间，控制数据的有效期。

#### 使用场景：

* 适用于需要在客户端和服务器之间共享数据的场景。

#### 优点：

* 可以方便地在客户端和服务器之间共享数据。
* 可以设置过期时间，控制数据的有效期。

#### 缺点：

* 存储的数据量较小，一般不能超过4KB。
* 每次 HTTP 请求都会携带 Cookies，增加了网络传输的开销。
* Cookies 存储在浏览器中，有一定的安全风险。

#### 示例：

```js
document.cookie = 'username=John; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/';

// 获取数据
const cookies = document.cookie;
console.log(cookies);
```

#### 最适用情况：
Cookies 最适合用于需要在客户端和服务器之间共享数据的场景，一般用于用户身份验证、跟踪用户行为等需求。Fitsadmin的框架中主要用于token的记录，cookie存储主要的好处是，多窗口访问站点cookit不会消失，只有当浏览器所有窗口都关闭之后，token才会消失，下次打开浏览器就重新登录。

## 使用Cookies最佳方案：CreateCookies
cookies的存储主要采用[js-cookie](https://github.com/js-cookie/js-cookie#readme)作为解决方案，api调用也相对简单

#### 示例：

```js
import { CreateCookies } from 'vue3-persist-storages'

const cookies = new CreateCookies()
//  普通使用 string/boolean/number 基本类型
cookies.setItem('name', '张三')
console.log(cookies.getItem('name')) // 输出 张三

// 保存对象，直接传入即可
cookies.setItem('name', {id: '张三'})

// 可以开启有效期、数据加密、前后缀防止数据污染
const cookies = new CreateCookies({
  prefix: '前缀',
  suffix: '后缀',
  isOpenExpires: true,
  day: 0.5,
  encryption: false,
})
```

#### 配置项：
```ts
export interface IStorageOption {
     // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // 是否开启有效期, 默认值：false
    isOpenExpires?: boolean;
    // 有效期默认几天, 默认值: 7天
    day?: number;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
}

```

#### CreateCookies方法：

```ts
// 这里的api几乎跟cookie的原生api一致，只是在原生api的基础至少，解决过期时间设置、数据加密解密设置的问题
export interface Vue3PersistStorages {
    // 通过键值获取数据
    getItem<T>(key: string): Promise<T | null> | T;
    // 通过键值对设置数据
    setItem<T>(key: string, value: T, expires?: number, isOpenExpires?: boolean): Promise<T | null> | T;
    // 通过键名，删除数据
    removeItem<T>(key: string): Promise<T | null> | T;
}
```

### Web SQL Database

Web SQL Database 是一种已被废弃的客户端存储方式，在 HTML5 中已经不推荐使用。它提供了一个类似关系型数据库的存储解决方案，通过 SQL 语句进行数据的操作。然而，由于缺乏官方支持，Web SQL Database 不再被广泛使用，推荐使用 IndexedDB 替代。

适用情况：

* 不推荐在新的项目中使用，建议使用 IndexedDB 替代。
* 如果实在要使用，可以使用LocalForage内置的websql驱动即可使用

## 结论

以上是几种常见的前端HTML5存储方式。每种存储方式都有自己的特点、使用场景、优缺点。在选择存储方式时，需要根据具体的需求来决定使用哪种方式。

在vue3的项目中，通常结合`Vue3PersistStorages`的[piniaplugin](/guide/piniajs)的插件使用的话，这样不需要关注`CreateCookies`、`CreateLocalForage`、`CreateStorage`的方法如何实现，只需要关注pinia的state对象的数据变化即可，它会通过pinia的持久化插件，自动把数据保存起来。
