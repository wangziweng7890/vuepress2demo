<!--
 * @Author: Feng
 * @Description: 登录页面
-->
<route>
{
    meta: {
        title: "登录",
        constant: true,
        layout: false
    }
}
</route>

<script setup name="Login">
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(null)

const banner = new URL('../assets/images/login.png', import.meta.url).href
const title = import.meta.env.VITE_APP_TITLE

// 表单类型，login 登录，reset 重置密码
const formType = ref('login')

// 登录
const loginForm = ref({
    account: localStorage.login_account || '',
    password: '',
    remember: !!localStorage.login_account,
})
const loginRules = ref({
    account: [
        { required: true, trigger: 'blur', message: '请输入用户名' },
    ],
    password: [
        { required: true, trigger: 'blur', message: '请输入密码' },
        { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
    ],
})
function handleLogin() {
    proxy.$refs.loginFormRef.validate((valid) => {
        if (valid) {
            loading.value = true
            userStore.login(loginForm.value).then(() => {
                loading.value = false
                if (loginForm.value.remember)
                    localStorage.setItem('login_account', loginForm.value.account)

                else
                    localStorage.removeItem('login_account')

                router.push(redirect.value)
            }).catch(() => {
                loading.value = false
            })
        }
    })
}

onMounted(() => {
    redirect.value = route.query.redirect ?? '/'
})

function testAccount(account) {
    loginForm.value.account = account
    loginForm.value.password = '123456'
    handleLogin()
}
</script>

<template>
  <div>
    <div class="bg-banner" />
    <div id="login-box">
      <div class="login-banner">
        <img :src="banner" class="banner">
      </div>
      <el-form v-show="formType === 'login'" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on">
        <div class="title-container">
          <h3 class="title">
            欢迎来到 {{ title }} ! 👋🏻
          </h3>
        </div>
        <div>
          <el-form-item prop="account">
            <el-input ref="name" v-model="loginForm.account" placeholder="用户名" text tabindex="1" autocomplete="on" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" tabindex="2" autocomplete="on" @keyup.enter="handleLogin" />
          </el-form-item>
        </div>
        <div class="flex-bar">
          <el-checkbox v-model="loginForm.remember">
            记住我
          </el-checkbox>
        </div>
        <el-button :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleLogin">
          登录
        </el-button>
        <div style="margin-top: 20px; margin-bottom: -20px; text-align: center;">
          <el-divider>演示账号一键登录</el-divider>
          <el-button type="primary" size="small" plain @click="testAccount('admin')">
            admin
          </el-button>
          <el-button size="small" plain @click="testAccount('test')">
            test
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(input[type="password"]::-ms-reveal) {
    display: none;
}
.bg-banner {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, var(--el-fill-color-lighter), var(--el-bg-color-page));
}
#login-box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: var(--el-bg-color);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--el-box-shadow);
    .login-banner {
        position: relative;
        width: 500px;
        height: 500px;
        background-color: gray;
        .banner {
            @include position-center(xy);
        }
        .logo {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 30px;
            height: 30px;
            border-radius: 4px;
            box-shadow: var(--el-box-shadow-light);
        }
    }
    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 500px;
        width: 500px;
        padding: 50px;
        overflow: hidden;
        .title-container {
            position: relative;
            .title {
                font-size: 1.3em;
                color: var(--el-text-color-primary);
                margin: 0 auto 30px;
                font-weight: bold;
            }
        }
    }
    .el-form-item {
        margin-bottom: 24px;
        :deep(.el-input) {
            height: 48px;
            line-height: inherit;
            width: 100%;
            input {
                height: 48px;
            }
            .el-input__prefix,
            .el-input__suffix {
                display: flex;
                align-items: center;
            }
            .el-input__prefix {
                left: 10px;
            }
            .el-input__suffix {
                right: 10px;
            }
        }
    }
    .flex-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .sub-link {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        font-size: 14px;
        color: var(--el-text-color-secondary);
        .text {
            margin-right: 10px;
        }
    }
}
</style>
