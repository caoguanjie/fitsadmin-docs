# 更新日志


## [1.1.0](https://caoguanjie.github.io/fitsadmin-docs/guide/CHANGELOG.html#_1-1-0-2023-7-10)(2023-7-10)

### BUG修复（Bug Fixes）

-  **EventBus:** 避免函数的重复绑定，解决清除不完全，导致闭包的内存泄露


::: details 
直接把框架文件`src/utils/base/EventBus.ts`的代码进行替换即可
```ts
import mitt, { EventType } from "mitt";
import { onUnmounted } from "vue";

/**
 * on 绑定的事件是一个数组，也就是说相同的名字可以绑定多个callback
 * off 是解绑callback，但是emit有个漏洞，是如果绑定的事件是多个相同的callback的话，只会解绑第一个。
 * off 函数还有一个坑，就是取消绑定之后，没有删除绑定的关键词`eventName`属性。
 */
const emitter = mitt();

const eventBus = {
  on(eventName: EventType, callback: any) {
    const handlers = emitter.all!.get(eventName);
    // 是否存在相同的函数
    let hasSameFunction = false;

    handlers && handlers.map((handler) => {
      // 判断绑定的事件中是否有相同的函数
      if (Function.prototype.toString.call(callback) !== Function.prototype.toString.call(handler)) {
        hasSameFunction = true
      }
    });
    if (!handlers || hasSameFunction) {
      // 如果没有绑定过值，直接绑定
      emitter.on(eventName, callback);
      onUnmounted(() => {
        eventBus.off(eventName, callback);
      });
    }
  },
  emit(eventName: EventType, params?: any) {
    emitter.emit(eventName, params);
  },
  off(eventName: EventType, callback?: any) {
    emitter.off(eventName, callback);
    const handlers = emitter.all!.get(eventName);
    handlers?.length === 0 && emitter.all.delete(eventName);
  },
};
export default eventBus;

```

:::


- **keep-alive:** 修复当全局配置页面不缓存时，每次进入新的页面组件都会刷新两次的bug
::: details 
直接把框架文件`src/router/utils.ts`的代码中的函数`deleteCache`方法进行替换即可

```ts
/**
 * 清除缓存，利用了keep-alive组件的exclude属性：任何匹配name名称的组件都不会被缓存
 * 这里要注意一点，如果发现缓存页面不生效，要先去检查组件有没有对其进行name的命名，组件的名字和route表中name要对应上，才能匹配
 * @param router 
 * @param reload 传入这个属性，可以出现进度条，其实是模拟页面刷新的交互效果，主要作用于组件取消缓存之后，刷新组件的时候一个好的交互效果
 */
export async function deleteCache(router: RouteLocationNormalized, reload = false) {
    const { tagsView } = useStore();
    // 通过reload属性决定当前组件是否刷新，解决页面如果没有缓存的情况下，第一次打开会刷新两次的效果
    if (!reload) return
    // 开启进度条
    NProgress.start();
    tagsView.addExcludeView(router)
    await nextTick()
    // 防抖设置，防止频繁点击组件刷新导致性能问题
    const _debounce = debounce(async () => {
        tagsView.delExcludeView(router)
        NProgress.done()
    }, 100)
    /**
     * 这里200ms对应的是transition组件router-fade的动画效果，设置200ms的动画持续时间
     * 如果要改，记得要去修改src/styles/transition.scss文件的样式
     */
    _debounce()
}

```
:::




### 性能优化（Performance Improvements）
- **vite.config.ts:** 优化组件自动导入在开发环境时，打开新页面存在卡顿问题
  
::: details 
1. 使用unplugin-vue-components按需加载样式，开发环境会导致项目异常卡顿，相关问题的地址是：https://github.com/antfu/unplugin-vue-components/issues/361
2. 主要问题是：vite会预加载style，当首次启动 vite 服务时会对 style 进行依赖预构建，，因为element-plus的按需样式会导入大量style文件，导致页面会卡住直至style构建完成
3. 解决方案是：写一个自定义vite插件，在开发环境下全部导入element-plus，在生产环境或者其他环境，按需导入。主要代码片段如下：

```ts
export default ({ mode }: ConfigEnv): UserConfig => {
      return {
         plugins: [
            mode === 'dev' ? fullImportPlugin() : Components({
                dts: './src/components.d.ts',
                dirs: '',
                resolvers: [ElementPlusResolver()],
            }),
         ]
      }
}

/**
 * element全局导入插件
 * 通过修改编译后的代码，全局增加ele的js和ts
 * @returns 
 */
function fullImportPlugin() {
  let config: ResolvedConfig
  return <Plugin>{
    name: 'fullImportElementPlus',
    async configResolved(conf) {
      config = conf
    },
    transform(code, id) {
      // 判断当前处理的是否是 _src/main.ts_
      if (path.join(config.root, 'src/main.ts') === id) {
        const name = 'ElementPlus'

        // 引入 ElementPlus 和 样式
        const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/dist/index.css';\n`
        // 通过匹配字符串来使用 ElementPlus （此处替换规则根据 main.ts 的情况而定）
        // 相当于将字符串 `app.use(router).mount('#app')` 替换成 `app.use(router).use(ElementPlus).mount('#app')`
        code = code.replace('.mount(', ($1) => `.use(${name})` + $1)
        return prepend + code
      }
      return code
    }
  }
}


```
:::

- **内存泄露:** 优化vue的底层源码，解决内置组件的内存泄露问题
::: details 
详情请参考：[内存泄露（memory leak）](/guide/memory-leak.md)

总结下来就是：
1. 更新vue的版本至`v3.2.47`
```shell
npm i vue@3.2.47
```
2. 安装`@vue/runtime-core`.

```shell
npm i https://github.com/caoguanjie/vue3-runtime-core.git
```
:::


- **fits-admin-ui优化:** 删除fits-admin-ui的引用方式，改用`@/fits-components`
::: details 
**抛弃fits-admin-ui的原因：**
1. `VXETablePluginElement`插件引用`fits-admin-ui`之后，导致vxe-table出现重复引用，导致注册插件的方法消失。
2. `fits-admin-ui`编译之后，产生的包过大
3. `fits-admin-ui`编译之后，可拓展性差，就算插件存在bug，项目组的成员难以及时调整优化。
4. `fits-admin-ui`封装的组件不够成熟，带来很多小问题。

**旧项目删除fits-admin-ui的步骤：**
1. `npm uninstall fits-admin-ui`,卸载多余的依赖
2. 在代码编辑器中搜索`fits-admin-ui`,把关键词换成`@/fits-components`，即可完成平替。
3. 如果在文件`other-imports.ts`中，有全局注册组件的代码，请把相关代码删除： ~~` import FitsAdminUI from 'fits-admin-ui'; app.use(FitsAdminUI)`~~
:::

- **VXETablePluginElement插件优化:** 删除vxe-table兼容ELement样式的插件VXETablePluginElement，重新安装插件的最新代码
::: details 
**抛弃VXETablePluginElement的原因：**
1. 上面`fits-admin-ui`优化有说明其中一个原因
2. 存在内存泄露问题
3. 始终兼容代码不是github上最新的代码

**优化方案：**
1. 删除文件`src/utils/base/VXETablePluginElement.ts`
2. 安装最新的代码

```shell
npm i vxe-table-plugin-element@3.0.7
```
3. 创建`src/fits-components/Table/FitsTable/components/ToolsPluginElement.ts`文件。`ToolsPluginElement.ts`文件主要是为了兼容列表FitsTable组件的自定义工具栏，里面包括所有的工具栏的渲染器。直接在框架组复制该文件到项目即可
4. 安装新的``ToolsPluginElement.ts`插件
```ts
// 路径：src/other-imports.ts
import VXETablePluginFits from '@/fits-components/Table/FitsTable/components/ToolsPluginElement'
// 自定义工具栏
VXETable.use(VXETablePluginFits)
```
:::

### 新增功能（New features）

- **页面缓存机制:** 通过全局配置控制组件是否缓存
::: details 
详情请参考：[Keepalive页面缓存机制](/guide/keepalive.md)
:::





## [1.0.0](https://github.com/caoguanjie/fitsadmin/tree/v1.0.0) (2022-11-10)
FitsAdmin正式发布， FitsAdmin 是基于 Vue3 + Element Plus 版本的后台管理前端解决方案。框架项目使用 Vue3 + Vite2 + TypeScript + Element Plus + Vue Router + Pinia + Volar 等前端最主流技术栈，基于此项目模板生成的前端框架相信能解决您们大部分的难题，里面内置动态路由，权限验证，提炼了典型的业务模型、封装了通用型各种业务组件，包括后台管理系统中最重要的表格组件和表单组件，提供了丰富的范例展示，还有详细的文档支持，不仅可以帮助你们快速搭建的中后台产品项目框架，还能让你们前后端开发人员、项目管理人员、设计人员通过丰富的文档说明、组件展示和全新的设计标准等全方位了解FitsAdmin，