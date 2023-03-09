/// <reference types="vitest" />

import path from 'path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import { createHtmlPlugin } from 'vite-plugin-html'
import Layouts from 'vite-plugin-vue-layouts'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Unocss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
const fs = require('fs')

export default ({ mode, command }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd())
    // 全局 scss 资源
    const scssResources: string[] = []
    fs.readdirSync('src/styles/resources').forEach((dirname: string) => {
        if (fs.statSync(`src/styles/resources/${dirname}`).isFile())
            scssResources.push(`@use "src/styles/resources/${dirname}" as *;`)
    })
    return defineConfig({
        resolve: {
            alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`,
                '@/': `${path.resolve(__dirname, 'src')}/`,
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: scssResources.join(''),
                },
            },
        },
        server: {
            open: true,
            port: 9000,
            proxy: {
                '/proxy': {
                    target: env.VITE_APP_API_BASEURL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/\/proxy/, ''),
                },
            },
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        },
        optimizeDeps: {
            include: [
                'element-plus/es',
                'element-plus/es/components/message/style/css',
                'element-plus/es/components/notification/style/css',
                'element-plus/es/components/message-box/style/css',
            ],
        },
        plugins: [
            Vue({
                reactivityTransform: true,
            }),
            viteMockServe({
                mockPath: 'src/mock',
                localEnabled: command !== 'build',
                prodEnabled: false,
            }),
            vueSetupExtend(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: 'index',
                    },
                },
            }),

            // https://github.com/hannoeru/vite-plugin-pages
            Pages(),
            // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
            Layouts(),

            // https://github.com/antfu/unplugin-auto-import
            AutoImport({
                imports: [
                    'vue',
                    'vue/macros',
                    'vue-router',
                    {
                        vue: [
                            'defineProps',
                            'defineEmits',
                            'defineExpose',
                            'withDefaults',
                        ],
                    },
                    'pinia',
                    'vue-i18n',
                    '@vueuse/core',
                ],
                resolvers: [
                    ElementPlusResolver(),
                ],
                dts: true,
                dirs: [
                    './src/composables',
                    'src/store',
                ],
                vueTemplate: true,
            }),

            // https://github.com/antfu/vite-plugin-components
            Components({
                dts: true,
                resolvers: [ElementPlusResolver()],
                include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/],
            }),

            // https://github.com/antfu/unocss
            // see unocss.config.ts for config
            Unocss(),
            // BUG https://github.com/antfu/unplugin-vue-components/issues/361
            {
                name: 'dev-auto-import-element-plus',
                transform(code, id) {
                    if (command === 'serve' && /src\/main.js$/.test(id)) {
                        return {
                            code: code.replace('/* importElementPlusPlaceholder */', `
                        import ElementPlus from 'element-plus';
                        import 'element-plus/dist/index.css';
                        app.use(ElementPlus);
                    `),
                            map: null,
                        }
                    }
                },
            },

            // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
            VueI18n({
                runtimeOnly: true,
                compositionOnly: true,
                include: [path.resolve(__dirname, 'locales/**')],
            }),
        ],

        // https://github.com/vitest-dev/vitest
        test: {
            environment: 'jsdom',
        },
    })
}
