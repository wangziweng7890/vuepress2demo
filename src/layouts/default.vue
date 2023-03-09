<!--
 * @Author: Feng
 * @Description: 默认的layout布局
-->
<script setup lang="ts" name="layout">
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import Head from './components/Head.vue'
</script>

<template>
  <main :class="$style.main">
    <Head />
    <div :class="$style.cont">
      <el-menu
        :class="$style.menu"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Location /></el-icon>
            <span>导航菜单一</span>
          </template>
          <el-menu-item index="1-1">
            <router-link :class="$style.link" to="/">
              首页
            </router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link :class="$style.link" to="/home">
              home
            </router-link>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <router-link :class="$style.link" to="/mock">
            Mock Demo
          </router-link>
        </el-menu-item>
      </el-menu>
      <RouterView :class="$style.view" />
    </div>
  </main>
</template>

<style lang="scss" module>
.main {
    background-color: #f2f6fa;
}
.link {
    display: inline-block;
    width: 100%;
    height: 100%;
}
.cont {
    display: flex;
    height: calc(100vh - 80px);
}
.menu {
    width: 220px;
    background-color: rgb(84 92 100);
}
.view {
    flex: 1;
    margin-left: 48px;
}
</style>
