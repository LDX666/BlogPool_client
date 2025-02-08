import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'
import App from './App.vue'
//下面这四个是elementplus的按需导入配置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'





const app = createApp(App)

const pinia = createPinia()          //初始化pinia
pinia.use(piniaPluginPersistedstate) //pinia持久化存储的插件

app.use(pinia)                       //挂载pinia到主函数

app.use(router)

app.use(ElementPlus,{locale: zhCn})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }


app.mount('#app')


