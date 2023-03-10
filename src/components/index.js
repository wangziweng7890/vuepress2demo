const path = require('path')
const { parse } = require('vue-docgen-api') // 引入资源包
async function init() {
    const res = await parse(path.resolve(__dirname, './Counter.vue'))
    console.log(res)
}
init()
