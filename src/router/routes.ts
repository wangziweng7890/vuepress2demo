import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'

// 固定路由（默认路由）
// eslint-disable-next-line import/no-mutable-exports
let constantRoutes: any = [
    {
        name: 'index',
        path: '/',
        redirect: '/index',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/:all(.*)*',
        name: 'notFound',
        component: () => import('@/pages/[...all].vue'),
        meta: {
            title: '找不到页面',
        },
    },
]

// 前端非文件路由
// 需要设置meta frontend: "true"
const systemRoutes = [
    {
        path: '/home',
        component: () => import('@/layouts/default.vue'),
        meta: {
            title: 'home',
            breadcrumb: false,
        },
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/pages/home/index.vue'),
                meta: {
                    title: 'home',
                },
            },
        ],
    },
]

// 动态路由（异步路由、可以根据权限动态addRoute）
// eslint-disable-next-line import/no-mutable-exports
let asyncRoutes = [
]
if (useSettingsStore(pinia).app.routeBaseOn === 'fileSystem') {
    constantRoutes = generatedRoutes.filter((item) => {
        return !item.meta?.disabled && item.meta?.constant === true && !item.meta?.frontend
    })
    asyncRoutes = setupLayouts(generatedRoutes.filter((item) => {
        return !item.meta?.disabled && item.meta?.constant !== true && item.meta?.layout !== false && !item.meta?.frontend
    }))
}
console.log(constantRoutes)

export {
    constantRoutes,
    systemRoutes,
    asyncRoutes,
}
