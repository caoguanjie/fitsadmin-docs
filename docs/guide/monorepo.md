#  pnpm+changesets的monorepo实践

这篇文章是基于微前端框架选型之后，考虑到主应用+多个子应用可能存在同一个源码仓库底下进行开发，此时如果主应用和子应用的代码分开管理，独立发布，无疑给项目组和前端开发人员带来比较繁琐而重复的环节，因此我便思考如何解决多个项目源码既能保持统一管理，又可以独立管理的解决方案，从一开始我便看上了[lerna](https://segmentfault.com/a/1190000023160081)作为解决方案，从中我了解到`monorepo`的概念，于是便有这篇文章。

## 引言
大多数现代项目都是在 `Git` 上管理和托管的。`Git` 已经成为来自世界各地的分布式源代码管理、版本控制和协作的标准平台。`Git` 是快速和高效的，主要有两种方法来托管和管理` Git `代码:

* Mono-repo
* Multi-repo

在深入研究这些方法之前，让我们先了解一下 Repo 是如何工作的。


### Repos 是什么?


::: info 
* 仓库(Repo)包含项目的所有文件夹和文件。它还包含关于用户、人和计算机的信息.
* Git 仓库数据受版本控制，Git 仓库 可以由个人或团队成员拥有。
* Git 仓库可以是公开的，私人的，或者是内部的。GitHub 是 Git 仓库的一个托管服务，并且有一个用户操作界面。
* Git 提供了版本控制和代码共享功能
:::

Git 的特别之处在于，如果开发人员想对他们的文件做一些修改，他们可以将整个存储库复制到他们的本地系统中。因此，即使开发人员没有对特定项目的写入权限，他们也可以在本地复制内容并修改它们(我们称为 forking)。

此外，如果开发人员希望共享本地所做的更改，他们可以向项目所有者发送一个 “pull request”。

一个项目可以只有一个服务。如果你的项目有多个工作流，你可以为每个工作流创建多个服务。大多数开发人员喜欢将较大的项目拆分为具有一个或多个功能的较小的独立服务。每个服务都可以解决各种业务问题。

一旦你创建了这些函数——作为服务并部署它们，下一步就是对它们构造和版本控制——你可以将所有的服务放在一个存储库(mono-repo)中，或者为你拥有的每个服务拥有一个单独的存储库(multi-repo) !

![图 0](/images/20230725120521.png)  



## 什么是 Multi-repo
在 Multi-repo 方法中，存在多个存储库，它们承载一个项目的多个库和服务。如果服务发生更改，开发人员只需重新构建该服务，而不需要构建整个项目。个人和团队可以从事他们特定的服务，他们只能访问他们有权限的服务。
### Multi-repo 的优势?
采用 Multi-repo 的公司数量远远多于采用 Mono-repo 的公司，原因如下:
1. 每个服务和库都有自己的版本控制。
2. 代码 checkout 和 pull 是小型且独立的，因此即使项目规模增大，也不存在性能问题。
3. 团队可以独立工作，不需要访问整个代码库。
4. 更快的开发和灵活性。
5. 每个服务都可以单独发版，并有自己的部署周期，从而使 CI 和 CD 更易于实现。
6. 更好的权限访问控制——所有的团队不需要完全访问所有的库——需要的时候，再获得读访问权限。

### Multi-repo 的劣势 

1. 跨服务和项目使用的公共依赖和库必须定期同步以获得最新版本。
2. 某种程度上鼓励孤立文化，导致重复代码和各个团队试图解决相同问题。
3. 每个团队可能遵循不同的一组最佳实践来编写代码，从而导致难以遵循通用的最佳实践。

## 什么是 Mono-repo
在 mono-repo 方法中，你可以将所有服务保存在单一(mono)存储库中。你仍然可以独立地部署和管理每个服务。这些服务可以共享公共库和代码。

像vue和ionic这样的框架都使用 Mono-repo

### Mono-repo 的优势

1. 存储所有项目代码的单独位置，团队中的每个人都可以访问。
2. 易于重用和共享代码，与团队合作。
3. 很容易理解你的变更对整个项目的影响。
4. 代码重构和代码大变更的最佳选择。
5. 团队成员可以获得整个项目的总体视图。
6. 易于管理依赖关系。

### Mono-repo 的劣势

1. 性能差，如果你的项目增长，每隔一天都会添加更多的文件，那么 git checkout、pull 和其他操作可能变得缓慢，以及文件搜索可能需要更长的时间。
2. 同一个仓库多个项目，不能管理好成员之间的权限控制
3. 难以实现持续部署(Continuous deployation，CD)和持续集成(Continuous Integration，CI)

## Mono-Repo 和 Multi-Repo 的对比

|     对比参数       |     Mono-repo   |  Multi-repo |
| :-----------: | :-----------: | :-----------: |
| 项目管理 | 一个组织的某个项目的所有代码都驻留在中央存储库中 | 每个服务和项目都有一个单独的存储库 |
| 团队管理 | 团队可以一起协作和工作; 他们可以看到所有成员的提交记录 | 团队可以自主工作; 个人的变更不会影响其他团队或项目的变更 |
| 权限管理 | 不能限制组内成员只能看到某个项目源码，只要配置权限，这个仓库的所有代码都是裸露的 | 不同项目的不同的仓库可以分别给予相应的权限，更加细分和安全|

Mono-repo 和 Multi-repo 同样流行，哪一个更好取决于你的项目大小、项目需求以及你需要的版本控制和访问控制级别。

Mono-repo 侧重一致性，而 Multi-repo 侧重于解耦。在 Mono-repo 中，整个团队可以看到某一个人完成的更改，而 multi-repo 为每个团队创建一个单独的 repo，这些团队只能访问所需的仓库。


::: info 
从上面概述可以知道，最初的fitsadminv1.0.0版本的时候，小编把框架源码+技术文档+组件库源码都集成在一个仓库，其实用的就是Monorepo的方案，但是当时我没有找到工具对三个项目进行独立式管理，导致了三个项目共用同一个node_mudules，再后来因为要不断迭代框架源码，导致同时影响了`文档`和`组件库`的项目，后来我不得不把`文档`和`组件库`两个项目分离出来，分别部署在其他两个仓库，其实这种就是multirepo方案，三个项目虽然是独立出来了，管理上是更加方便了，但是也带了很多重复性操作，因为如果源码更新了范例，还要去文档中心把代码重新更新一遍，迁移代码过程很容易有问题。本次为了解决微前端框架存在主应用和多个子应用的情况，了解到了更多Monorepo方案的包管理工具，后期可以考虑把文档项目重新集成回到fitsadmin主仓库上。
:::

## 用 pnpm 管理 Monorepo 项目

这里使用 pnpm 的` workspace `来管理 monorepo 代码仓库，此外目前主流的还有 `yarn workspace + lerna`，`nx`，`turborepo`等等。

### Monorepo 项目结构

pnpm 内置了对单一存储库（也称为多包存储库、多项目存储库或单体存储库）的支持， 你可以创建一个` workspace `以将多个项目合并到一个仓库中。

pnpm 要使用 monorepo 的话，需要创建 pnpm-workspace.yaml 文件，其内容如下:

```yaml
packages:
  # 子应用模块
  - "packages/*"
  # 主应用代码
  - "main"

```

其中` packages `为多项目的存放路径（一般为公共代码, 微前端中的子应用），pnpm 将` packages `下的子目录都视为一个项目。此外如果项目还有`文档docs`或`在线演示的项目example`（这些不作为核心库），放在` packages` 有些许不妥，就可以像下面这样来配置 workspace

```yaml
# 举个例子，后面如果把docs迁移回来就是这样的
packages:
  - packages/*
  - docs
  - example
```

因此最后框架的源码的项目结构如下：

```sh
├── main                                 # 主应用，fitsadmin框架的主源码
|-- packages                             # 子应用项目包
    |   |-- vite-vue3                    # vite+vue3的项目，目前是代码是跟fitsadmin一样的，后续不一定会更新这个版本的代码
    |       |-- pnpm-lock.yaml           # 每个子项目都是有独立的package.json文件
    |       └-- package.json
    ：
    └── more things                      # 后续可以多拓展几个不同技术栈的子应用，项目的组件库、脚手架、插件、工具都可以放这里
├── README.md                            # 项目的说明文件
├── pnpm-lock.yaml                       
├── package.json                         # 这里的依赖一般是装多个项目源码的管理工具，例如统一的版本管理工具，编译工具等等
└── pnpm-workspace.yaml                  # 锁住各种包的版本号
```

其中 packages 下存放的就是多个项目代码库，每个项目的`package.json`中的name要唯一（因为到时候这些包是有可能要发布的，而名字就要保证唯一），那么项目的 package.json 如下演示：

::: tabs
@tab:active 根目录package.json
```json
{
    "name": "fitsadmin",
}
```

@tab 主应用main/package.json
```json
{
    "name": "@fitsadmin/main",
}
```

@tab 子应用packages/vite-vue3/package.json
```json
{
    "name": "@fitsadmin/vite-vue3",
}
```
:::

::: danger 各位开发要注意！！！
 `package.json`中的name一定要唯一，这是pnpm统一管理各个项目的基础，命名风格可以参考上面，根目录如果是`demo`，主应用和子应用都可以用`@demo/main`、`@demo/*****`等格式命名
:::

## pnpm 安装依赖
直接进入项目的根目录下，执行`pnpm install` 会根据 `pnpm-workspace`配置的项目路径，自动下载各个项目包的所有依赖，无需各位开发一个个`cd mian`到每个项目的目录底下，一个个项目执行`pnpm install`来安装依赖。

### 局部依赖
假设现在我要为`main`主要源码来添加依赖，例如我要为主应用main安装`lodash`依赖包的话， 有两种方式：
1. 按之前的做法，先`cd main`进入主应用后，执行`pnpm install lodash@latest`或者`pnpm add lodash@latest`
2. 新的做法，可以在`根目录`下使用pnpm的提供的`--filter`选型来指定安装包依赖，命令如下：

```sh
# package_selector这个参数其实就package.json中的name
# command 就是主应用需要执行的 命令
pnpm --filter <package_selector> <command>
```
例如：
```sh
# -F等价于--filter
pnpm -F "@fitsadmin/main" add lodash
```

`--filter`这个选项其实就是一个筛选器，就是筛选符合条件的package应用进行处理，所以它还有很多通配符的设置，可以参考：[Filtering](https://pnpm.io/filtering)

假设现在写好了 utils 模块，@fitsadmin/components 准备使用 utils 模块，可以按照如下操作

```sh
# 这个命令表示在@fitsadmin/components安装@fitsadmin/utils
# 其中的@*表示默认同步最新版本，省去每次都要同步最新版本的问题。
pnpm -F @fitsadmin/components add @fitsadmin/utils@*
```

### 全局依赖

我们知道不管是一个 web 项目还是一个 node 项目，它都是基于同一种语言编写，所以我们可以只安装一次 TypeScript，供三个项目使用，这就体现出了 monorepo 的优势。

类似于TypeScript或lodash这样通用的依赖，我们通常可以把他们安装到根目录，即使用下面这条命令：

```sh
# 这里的-D指令大家都很熟悉，就是把依赖作为devDependencies安装
# 其中 -W 的选项全称是--workspace-root，大概意思就是在根目录下执行的意思
pnpm install typescript -D -W
```
`-W`选项会把`typescript`安装在根目录下的node_modules文件夹内，不会显示在其他项目各个文件夹内。虽然`packages/*`和`main/*`下的项目都没有安装 ts，但是倘若在项目中使用到，就会通过依赖递归查找的原则逐级往上寻找，自然会找到 monorepo 中根目录的依赖。

::: warning
在monorepo项目中，就算你各个子项目里面没有ts，它都会依赖递归查找的原则逐级往上寻找，但是这样做法，不允许你单独再剥离其中某个项目，一旦你剥离某个项目后，你的某个项目中没有ts的依赖声明，即便你执行命令` pnpm install `也不会安装到ts。
因此我不推荐全局安装项目中的依赖，需要按照上面局部依赖的方案为某个子项目安装具体的依赖，或者批量为所有项目安装相同的依赖，维护好子项目中的package.json文件，这样即便你由于各种原因要剥离某个子项目时，不会影响项目运行。
:::

## 启动项目

### 局部启动
单个项目项目的命令启动，不需要我多言了，直接在各自的项目`package.json`自定义命令
```json
  "scripts": {
        "dev": "vite serve --mode dev",
        "build:prod": "vue-tsc --noEmit && vite build --mode prod",
        "build:dev": " vite build --mode dev",
        "build:github": " vite build --mode github",
    }
```

### 全局启动

这里主要依赖pnpm的两个选项 `-C` 和 `-F`。 其中 `-F`就是上面说过的`--filter`筛选器选项。 `-C`命令是
```sh
# path就是每个项目的路径，相对路径
# command 就是源码需要执行的 命令
pnpm -C <path> <command>
#  --dir 选项跟 -C 一样
pnpm --dir <path> <command>
```

举例，如果我们启动所有项目源码，我们可以在根目录执行以下几种命令：
```sh
# '@fitsadmin/*'采用通配方案，将所有符合条件的子应用都启动，所以为啥我们要保证命名格式一致，不然没法做通配
# dev是上面单个项目配置的命名
pnpm -F '@fitsadmin/*' dev
```


如果我们想启动某个项目源码，我们可以在根目录执行以下几种命令：
```sh
# 执行主应用main中的package.json文件中scripts配置好的dev命令
# 方案一
pnpm -C main dev
# 方案二
pnpm --dir main build:dev
# 方案三
pnpm -F '@fitsadmin/main' build:prod
```


## 什么是Changesets
[Changesets](https://github.com/changesets/changesets) 是一个用于 Monorepo 项目下版本以及 Changelog 文件管理的工具。目前一些比较火的 Monorepo 仓库都在使用该工具进行项目的发包例如 pnpm、mobx 等。


## Changesets 工作流介绍

changesets 主要关心 monorepo 项目下子项目版本的更新、changelog 文件生成、包的发布。一个 changeset 是个包含了在某个分支或者 commit 上改动信息的 md 文件，它会包含这样一些信息:
* 需要发布的包
* 包版本的更新层级(遵循 semver 规范)
* CHANGELOG(更新日志) 的信息，这部分信息会直接自动部署在CHANGELOG.md内

在 changesets 工作流会将开发者分为两类人，一类是项目的维护者，还有一类为项目的开发者，两者的职责可以通过如下流程图很简洁的表示出来:

![图 1](/images/20230725051058.png)

根据上图， changesets 的工作流程是这样：
1. 开发者在 Monorepo 项目下进行开发，开发完成后，给对应的子项目添加一个 changesets 文件。
2. 项目的维护者后面会通过 changesets 来消耗掉这些文件并自动修改掉对应包的版本以及生成 CHANGELOG 文件
3. 最后将对应的包发布出去。
以上就是一个简单的 changesets 工作流，当然这些工作流会对应到具体的 cli 命令以及 config 配置中去，下面我会基于此工作流介绍一些关于 changesets 最常用的几个子命令以及使用原理。

::: tip 温馨提示
changesets这部分的内容，旨在跟各位fitsadmin开发者讲述明白这个框架的版本发布原理，一般开发者无需关注这部分的内容，这里仅作为框架知识的补充，它主要是给项目的维护者使用的工具。
:::

## 使用 changesets 管理包版本和发布

### 安装和初始化 changesets

首先，我们需要安装 changesets。我们在项目根目录执行下面的命令：
```sh
pnpm i -Dw @changesets/cli
# 上面的命令等同于
pnpm i -D -W @changesets/cli
```
因为版本控制管理是针对整个项目的，所以可以采用全局安装的方式，无需同步到仓库中的其他子项目

安装完成以后，你可以在项目根目录执行以下命令以快速初始化 changesets：

```sh
pnpm changeset init
```

这时候，你会发现，项目根目录下多了一个 .changeset 目录，其中 config.json 是 changesets 的配置文件。请注意，我们需要把这个目录一起提交到 git 上。

![图 2](/images/20230725052250.png)  

### 生成 changeset 文件

假如我们的代码进行多次提交后，需要迭代一个新的版本，我们需要发布新的版本出来，这时候我们在项目根目录下执行以下命令来选择要发布的包以及包的版本类型（patch补丁版本、minor次要版本、major主要版本，严格遵循 [semver](https://semver.org/) 规范）：


```sh
pnpm changeset
```

changeset 通过` git diff `和构建依赖图来获得要发布的包。我们选择发布 `main `：

![图 3](/images/20230725052935.png)  

注意此刻，询问你是否发布`major主要版本`，按住空格才是选中效果，点击回车之后，将会重新询问你是否`发布次要版本`,以此类推，再点回车就是默认是补丁版本了。

我们选择更新到 patch 补丁版本：

![图 4](/images/20230725053355.png)  

填写 changelog变更日志，这里要注意一下，因为受限于shell工具的填写格式没有md那么好的体验，这里可以简单写点文字，后续生成changeset文件后，再按照规范的格式填写变更日志。

![图 5](/images/20230725053647.png) 

这时候，会发现多出来一个文件名随机的 changeset 文件：

![图 6](/images/20230725053821.png)  

这个文件的本质是对包的版本和 Changelog 做一个预存储，我们也可以在这些文件中修改信息（例如写变更日志）。随着不同开发者进行开发迭代积累，changeset 可能会有多个的。
这些 changeset 文件是需要一并提交到远程仓库中的。在后面的包发布后，这些 changeset 文件是会被自动消耗掉的。


### 发布测试版本
假设现在我们要发布一个测试的版本来看下功能是否正常 work，我们可以使用 changeset 的 [Prereleases](https://github.com/changesets/changesets/blob/main/docs/prereleases.md) 功能。

通过执行 `pnpm changeset pre enter <tag>` 命令进入先进入 pre 模式

```sh
pnpm changeset pre enter alpha   # 发布 alpha 版本
pnpm changeset pre enter beta    # 发布 beta 版本
pnpm changeset pre enter rc      # 发布 rc 版本
```

这里我运行第二条命令，选择发布 beta 版本。
```sh
# 这里我运行第二条命令，选择发布 beta 版本
pnpm changeset pre enter beta
# 执行下面命令修改包的版本，这条命令会自动关联上面的生成出来的changeset.md文件，所以只会影响到上面changeset文件选中的项目包，
# 它是根据当前仓库的测试包版本号再往上递增生成新的版本号。
pnpm changeset version
# 可以更加项目需要选择是否发布在npm平台， pnpm run build && pnpm changeset publish 
# 完成版本发布之后，退出 Prereleases 模式，一定要退出：
pnpm changeset pre exit
```

![图 7](/images/20230725055637.png)  


这时，我们需要把变更的内容提交到远程仓库中，一方面，便于后面查看每次测试版本发布的变更记录；另一方面，changesets 默认不会到 npm 中查找当前包最新的测试包版本号并自动加1，它是根据当前仓库的测试包版本号再往上递增生成新的版本号。

## 发布正式版本
当上面的测试包通过后，执行下面命令能把包版本修改成正式版本
不需要进入到changeset的Prereleases模式，直接执行

```sh
# 执行下面命令后，程序会销毁随机生成changeset 文件
pnpm changeset version
```

![图 8](/images/20230725060525.png)  

然后我们执行以下命令发布正式版本：


```sh
# changeset 会检查当前工作区中所有包的版本是否已经被发布过，如果没有则自动发布。
pnpm changeset publish
```