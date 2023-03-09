import { createApp } from 'vue'
import VueGtag from 'vue-gtag-next'

import App from './App.vue'
import router from './router'

import '@unocss/reset/tailwind.css'
import './styles/index.scss'
import 'uno.css'

async function start() {
    const app = createApp(App)
    app.use(router)
    app.use(VueGtag, {
        property: {
            // 更多配置项 https://matteo-gabriele.gitbook.io/vue-gtag/v/next/
            // 跨网站衡量配置 https://matteo-gabriele.gitbook.io/vue-gtag/v/next/methods/linker
            // 跨网站衡量gtag文档https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain?hl=zh-cn
            id: 'G-BB4NRPEHCE', // google中的衡量id
        },
    }, router)
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(app))
    app.mount('#app')
}

start()
