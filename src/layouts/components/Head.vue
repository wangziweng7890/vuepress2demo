<!--
 * @Author: Feng
 * @Description: 页面头部用于layout
-->
<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const { locale } = useI18n()
const router = useRouter()
function userCommand(command) {
    switch (command) {
    case 'dashboard':
        router.push({
            name: 'dashboard',
        })
        break
    case 'logout':
        userStore.logout().then(() => {
            router.push({
                name: 'login',
            })
        })
        break
    }
}
const userLanguageCommand = (command) => {
    locale.value = command
}
</script>

<template>
  <div class="head">
    <div class="headNav">
      Vue3基础脚手架
    </div>
    <div class="changeLanguage">
      <div>
        <el-dropdown @command="userLanguageCommand">
          <span class="el-dropdown-link">
            英文
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="en">
                en
              </el-dropdown-item>
              <el-dropdown-item command="zh-CN">
                zh-CN
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown class="user-container" size="default" @command="userCommand">
          <div class="user-wrapper">
            {{ userStore.account }}
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <el-dropdown-item command="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    background-color: #00193f;
    :deep(.el-dropdown) {
        color: #fff;
    }
}
.changeLanguage .el-icon--right,
.user-container .user-wrapper .el-avatar {
    vertical-align: middle;
    margin-top: -2px;
    margin-right: 4px;
}
.headNav {
    width: 220px;
    padding-left: 36px;
    color: #fff;
}
.changeLanguage {
    display: flex;
    align-items: center;
    padding-right: 36px;
    color: #fff;
}
</style>
