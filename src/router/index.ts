import { createRouter, createWebHashHistory } from 'vue-router'
import '@/styles/nprogress.scss'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { asyncRoutes, constantRoutes, systemRoutes } from './routes'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
const { isLoading } = useNProgress()

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...constantRoutes,
        ...systemRoutes,
        ...asyncRoutes,
    ],
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    isLoading.value = true
    if (userStore.isLogin) {
        if (to.name) {
            if (to.matched.length) {
                if (to.name === 'login') {
                    next({
                        path: '/',
                        replace: true,
                    })
                }
                else {
                    next()
                }
            }
            else {
                next({
                    path: '/404',
                })
            }
        }
        else {
            next()
        }
    }
    else {
        if (to.name !== 'login') {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath,
                },
            })
        }
        else {
            next()
        }
    }
})
router.afterEach((to) => {
    const settingsStore = useSettingsStore()
    isLoading.value = false
    // 设置页面 title
    to.meta.title && settingsStore.setTitle(typeof to.meta.title === 'function' ? to.meta.title() : to.meta.title)
})

export default router
