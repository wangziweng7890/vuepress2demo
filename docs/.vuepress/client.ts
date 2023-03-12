import { defineClientConfig } from '@vuepress/client';
import 'ant-design-vue/dist/antd.css';
import Counter from '../../src/components/Counter.vue';
import a from './components/test.vue';
export default defineClientConfig({
  enhance({ app }) {
    // 注册组件
    app.component('Counter', Counter);
    app.component('Test', a);
  }
});
