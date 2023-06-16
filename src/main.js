import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
// import '../rem'
// import store from './store'
import {createPinia} from 'pinia'   //使用pinia代替vuex
const pinia = createPinia()
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import {Icon} from 'vant';
import VueWechatTitle from 'vue-wechat-title'       //动态设置页面标题
import vClickOutside from "click-outside-vue3"      //点击设定的div外部
// import Api from "./util/utils"; // 主要是这里，引入配置好的Api
import axios from "./util/axios"; // 主要是这里，引入配置好的Api
import './mock/index'   //导入mock，伪网络请求
import 'animate.css'
import '@/assets/icon/topbar/index.css' //顶部top栏 iconfont链接

const app = createApp(App)
// app.use(store)
app.use(pinia)
app.use(vClickOutside)
// app.config.globalProperties.$request = Api; //网络请求，方法挂载到全局
app.config.globalProperties.$axios = axios; //网络请求，方法挂载到全局
app.use(router)
app.use(VueWechatTitle)
app.use(ElementPlus)
app.use(Vant)
// app.use(Icon)

app.mount('#app')
