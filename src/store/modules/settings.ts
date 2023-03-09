const useSettingStore = defineStore(
    // 唯一ID
    'settings',
    {
        state: () => ({
            app: {
                /**
         * 路由数据来源
         * frontend 前端
         * filesystem 文件系统
         */
                routeBaseOn: 'fileSystem',
                title: '',
            },
        }),
        actions: {
            // 设置网页标题
            setTitle(title) {
                this.title = title
            },
        },
    },
)

export default useSettingStore
