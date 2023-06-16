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
            title: 'yabaiz'
        }
    },
    {
        path: '/home',
        name: "home",
        redirect: '/home/ybz',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: 'yabaiz',
            keepAlive: false,
            tabShow: true
        },
        children: [
            {
                path: '/home/ybz',
                name: 'home/ybz',
                component: () => import('@/views/home/pages/index.vue'),
                meta: {
                    title: 'home'
                },
            },
            {
                path: '/home/doctor',
                name: 'doctor/doctor',
                component: () => import('@/views/home/pages/doctor/doctorIndex.vue'),
                meta: {title: 'Doctor'}
            }
        ]
    },
]

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
})

export default router
