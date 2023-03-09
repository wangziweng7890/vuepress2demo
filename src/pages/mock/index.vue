<script setup lang="ts" name="mock">
import api from '~/api'
const mockData = ref({
    url: '',
    result: '',
    failure_time: '',
})
const testMock = () => {
    api.post('demo', {
        url: '/mock/demo',
    }, {
        baseURL: '/mock',
    }).then((res: any) => {
        mockData.value = res.data
        console.log(mockData)
    })
}
</script>

<template>
  <div>
    <h2 class="title">
      Mock Demo
    </h2>
    <el-button @click="testMock">
      点击请求Mock数据
    </el-button>
    <el-descriptions
      title="Mock Data"
      :column="4"
      size="large"
      direction="vertical"
    >
      <el-descriptions-item label="Mock Url">
        {{ mockData.url }}
      </el-descriptions-item>
      <el-descriptions-item label="Mock Result">
        {{ mockData.result }}
      </el-descriptions-item>
      <el-descriptions-item label="Mock Time">
        {{ mockData.failure_time }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<route>
{
    name: 'dashboard',
    meta: {
        title: "纯前端路由",
        layout: 'default'
    }
}
</route>

<style lang="scss" scoped>
.title {
    margin-bottom: 36px;
    font-size: 30px;
    text-align: center;
}
</style>
