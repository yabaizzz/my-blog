import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

/*
*
* 1. import { useRouter,useRoute } from 'vue-router'
* 2. const router =  useRouter() // vue页面路由跳转
* 3. const route = useRoute()  // vue页面获取路由参数
* */


const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        name: "home",
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '书架',
            keepAlive: false,
            tabShow: true
        }
    },
    {
        path: '/tuijian',
        name: 'tuijian',
        component: () => import('@/views/tuijian/index.vue'),
        meta: {
            title: '推荐',
            keepAlive: true,
            tabShow: true
        }
    },
    {
        path: '/shequ',
        name: 'shequ',
        component: () => import('@/views/shequ/shequ.vue'),
        meta: {
            title: '社区',
            keepAlive: true,
            tabShow: true
        }
    },
    {
        path: '/profile',
        name: "profile",
        component: () => import('@/views/profile/index.vue'),
        meta: {
            title: '我的',
            keepAlive: true,
            tabShow: true
        }
    },
]

const router = createRouter({
    // history: createWebHistory(), //history
    history: createWebHashHistory(), //hash
    routes
})

export default router
