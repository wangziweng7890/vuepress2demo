import { defaultTheme, viteBundler } from 'vuepress'
import { type App } from 'vuepress'
import navbar from './configs/navbar'
import sidebar from './configs/sidebar'
import { demoblockPlugin } from 'vuepress-plugin-demoblock-plus'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { searchPlugin } from '@vuepress/plugin-search'
export default {
    lang: 'zh-CN',
    title: '组件库',
    description: '基于Vue3 + Vuepress的UI组件库',
    theme: defaultTheme({
        navbar,
        sidebar,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
    }),
    bundler: viteBundler({
        viteOptions: {
            plugins: [AutoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/, /\.vue\?vue/, // .vue
                    /\.md$/, // .md
                ],
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
                vueTemplate: true,
            }),],
        }
    }),
    plugins: [
        // searchPlugin({
        //     maxSuggestions: 10
        // }),
        demoblockPlugin({
            // locales,
            customClass: 'demoblock-custom',
            theme: 'github-light',
            cssPreprocessor: 'scss',
            // customStyleTagName: 'style lang="scss"', // style标签会解析为<style lang="scss"><style>
            scriptReplaces: [
                {
                    searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g,
                    replaceValue: 'const { defineComponent: _defineComponent } = Vue',
                },
            ],
        }),
        {
            name: 'test1',
            multiple: false,
            onInitialized: async (app: App) => {
                debugger;

                console.log('=======3=========');
            }
        }
    ]
}
