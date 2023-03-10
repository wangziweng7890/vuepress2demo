import { defineClientConfig } from '@vuepress/client';
import 'ant-design-vue/dist/antd.css';
import Counter from '../../src/components/Counter.vue';

export default defineClientConfig({
  enhance({ app }) {
    // 注册组件
    app.component('Counter', Counter);
  }
});
