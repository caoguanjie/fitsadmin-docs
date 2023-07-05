import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import { createRouterGuards } from './routerGuard';


/**
 * 注意: sub-menu 仅在route children.length>=1 时出现
 * 详情请看: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item 不会显示在侧边栏中 sidebar(默认值为false)
 * alwaysShow: true               if set true, 将始终显示根菜单
 *                                 如果未设置alwaysShow，则当项目有多个子路线时,
 *                                 它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           重定向：如果设置为noRedirect，noRedirect将不会在面包屑中重定向
 * name:'router-name'             'router-name'该名称由<keep-alive>使用 (必须设置!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色 (你可以设置多个角色)
    title: 'title'               侧边栏和面包屑中显示的名称（推荐设置）、多页签的标签名字
    icon: 'svg-name'/'el-icon-x' 侧边栏要显示的图标
    breadcrumb: false            如果设置为false，则项目将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
    affix: true                  如果设置为true,可以固定在标签页，tag-view
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色都可以访问
 */
export const constantRoutes: Array<RouteRecordRaw> = [

  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },


  {
    path: '/',
    redirect: '/Home',
    meta: { title: '首页', icon: 'fits-home', affix: true, hidden: true }
  },
  {
    path: '/Home',
    component: () => import('@/views/Home/index.vue'),
    name: 'Home',
    meta: { title: '首页', icon: 'fits-home', affix: true, hidden: true }
  },


  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  },

  {
    path: "/EnclosureDownload",
    name: "EnclosureDownload",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "附件下载" },
  },
  {
    path: "/EnclosurePreview",
    name: "EnclosurePreview",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "附件预览" },
  },
  {
    path: "/EnclosureUpload",
    name: "EnclosureUpload",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "附件上传" },
  },
  {
    path: "/List",
    name: "EnclosureTable",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "综合附件列表" },
  },

  {
    path: "/AllTable",
    name: "AllTable",
    component: () => import("@/views/business-example/table/comprehensive-table/ComprehensiveTable.vue"),
    meta: { title: "综合表格" },
  },
  {
    path: "/ComplexReportTable",
    name: "ComplexReportTable",
    component: () => import("@/views/business-example/table/complex-report-table/ComplexReportTable.vue"),
    meta: { title: "复杂报表" },
  },

  {
    path: "/ExploreExcel",
    name: "ExploreExcel",
    component: () => import("@/views/business-example/excel/exportBase.vue"),
    meta: { title: "导出Excel" },
  },
  {
    path: "/ExploreSelected",
    name: "ExploreSelected",
    component: () => import("@/views/business-example/excel/exportSelected.vue"),
    meta: { title: "导出已选择项" },
  },
  {
    path: "/ExploreMultistageTableHead",
    name: "ExploreMultistageTableHead",
    component: () => import("@/views/business-example/excel/exportHeaders.vue"),
    meta: { title: "导出多级表头" },
  },
  {
    path: "/UploadExcel",
    name: "UploadExcel",
    component: () => import("@/views/business-example/excel/uploadExcel.vue"),
    meta: { title: "上传Excel" },
  },
  {
    path: "/DownloadExcel",
    name: "DownloadExcel",
    component: () => import("@/views/business-example/excel/downExcel.vue"),
    meta: { title: "下载Excel" },
  },
  {
    path: "/PreviewPDF",
    name: "PreviewPDF",
    component: () => import("@/views/components-manage/pdf/previewPdf.vue"),
    meta: { title: "预览pdf" },
  },

  {
    path: "/DownloadPDF",
    name: "DownloadPDF",
    component: () => import("@/views/components-manage/pdf/downloadPdf.vue"),
    meta: { title: "下载pdf" },
  },


  {
    // path (kebab-case) 是fitsAdmin的路由命名规范
    path: "/comprehensive-example1",
    name: "ComprehensiveExample1",
    component: () => import("@/views/components-manage/echarts/ComprehensiveExample1.vue"),
    meta: { title: "综合范例1" },
  },
  {
    // path (kebab-case) 是fitsAdmin的路由命名规范
    path: "/comprehensive-example2",
    name: "ComprehensiveExample2",
    component: () => import("@/views/components-manage/echarts/ComprehensiveExample2.vue"),
    meta: { title: "综合范例2" },
  },

  {
    // path (kebab-case) 是fitsAdmin的路由命名规范
    path: "/full-calendar",
    name: "fullCalendar",
    component: () => import("@/views/components-manage/calendars/fullCalendarExample.vue"),
    meta: { title: "日历范例" },
  },
  {
    // path (kebab-case) 是fitsAdmin的路由命名规范
    path: "/task-view",
    name: "taskView",
    component: () => import("@/views/components-manage/calendars/taskViewExample.vue"),
    meta: { title: "任务视图" },
  },
  {
    path: "/commonList",
    name: "commonList",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "JSON列表", roles: ["admin", "editor"] },
  },
  {
    path: "/commonDialog",
    name: "commonDialog",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "JSON弹窗", roles: ["admin", "editor"] },
  },
  {
    path: "/queryContent",
    name: "queryContent",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "选择项", roles: ["admin", "editor"] },
  },
  {
    path: "/transfer",
    name: "/Transfer",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "穿梭框", roles: ["admin", "editor"] },
  },

  {
    path: "/dialog",
    name: "Dialog",
    component: () => import("@/views/components-manage/dialog/DragDialog.vue"),
    meta: { title: "拖拽对话框", roles: ["admin", "editor"] },
  },
  {
    path: "/Scrollbar",
    name: "Scrollbar",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "滚动条范例", roles: ["admin", "editor"] },
  },


  {
    path: "/GuidePage",
    name: "GuidePage",
    component: () => import("@/views/components-manage/guide-page/index.vue"),
    meta: { title: "引导页" },
  },
  {
    path: "/FreshIcon",
    name: "FreshIcon",
    component: () => import("@/views/components-manage/fresh-icon/index.vue"),
    meta: { title: "小清新图标" },
  },
  {
    path: "/UploadComponent",
    name: "UploadComponent",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "上传组件" },
  },
  {
    path: "/GoTop",
    name: "GoTop",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "回到顶部", roles: ["admin", "editor"] },
  },
  {
    path: "/FixedTop",
    name: "FixedTop",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "吸附顶部" },
  },
  {
    path: "/DrapList",
    name: "DrapList",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "拖拽功能" },
  },
  {
    path: "/UploadComponents",
    name: "UploadComponents",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "上传组件" },
  },
  {
    path: "/CopyText",
    name: "CopyText",
    component: () => import("@/views/ready/index.vue"),
    meta: { title: "复制文本" },
  },
  {
    path: "/Workflow",
    name: "Workflow",
    component: () => import("@/views/components-manage/workflow/index.vue"),
    meta: { title: "工作流范例", roles: ["admin", "editor"] },
  },




];

const modules: Record<string, any> = import.meta.globEager("./modules/**/*.ts");
/** 原始静态路由（未做任何处理） */
const routes: any = [];
Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
});

export const asyncRoutes: Array<RouteRecordRaw> = [
  ...routes,
  //   404页必须放在末尾！！！
  { path: '/:catchAll(.*)', redirect: '/404', meta: { hidden: true } }
]



// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * 定义一个方法，方便main.ts直接调用。
 * @param app
 */
export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
