import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import store from './store'
import http from './api/request'
import 'element-plus/dist/index.css'
import { vue_best_verify } from 'vue-best-verify'
import 'vue-best-verify/dist/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.config.globalProperties.$http = http // 自定义添加
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).use(ElementPlus).use(vue_best_verify).mount('#app')

// // vue挂载axios
// const app = createApp(App);
// app.use(router).use(ElementPlus).mount('#app')
// app.config.globalProperties.$http = axios;
// // 使用:
// getCurrentInstance().$http.post("/login/xxx", ruleForm).then((res) => {
//       //请求成功
//});
