
import App from './App.vue';
import { setupRouter } from '@/router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入svg注册脚本
import 'virtual:svg-icons-register';
// default-passive-events会影响工作流范例的使用
import 'default-passive-events'
import setupOtherImports from './other-imports';

const app = createApp(App);


// 挂载路由
setupRouter(app);
// 全局注册更多第三方的组件库、插件等内容
setupOtherImports(app)

// 注册全局组件
app.use(ElementPlus).mount('#app');
