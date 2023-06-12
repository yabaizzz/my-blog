import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import '../rem'
// import store from './store'
import {createPinia} from 'pinia'   //使用pinia代替vuex

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import {Icon} from 'vant';
import VueWechatTitle from 'vue-wechat-title'       //动态设置页面标题

const pinia = createPinia()
const app = createApp(App)
import Api from "./util/utils"; // 主要是这里，引入配置好的Api


// app.use(store)
app.use(pinia)
app.config.globalProperties.$request = Api; //方法挂载到全局
app.use(router)
app.use(VueWechatTitle)
app.use(ElementPlus)
app.use(Vant)
// app.use(Icon)

app.mount('#app')
