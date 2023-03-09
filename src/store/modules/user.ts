import api from '~/api'

const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            account: localStorage.account || '',
            token: localStorage.token || '',
            failure_time: localStorage.failure_time || '',
        }),
        getters: {
            isLogin: (state) => {
                let retn = false
                if (state.token) {
                    if (new Date().getTime() < state.failure_time * 1000)
                        retn = true
                }
                return retn
            },
        },
        actions: {
            login(data: any) {
                return new Promise((resolve, reject) => {
                    // 通过 mock 进行登录
                    api.post('member/login', data, {
                        baseURL: '/mock/',
                    }).then((res: any) => {
                        localStorage.setItem('account', res.data.account)
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('failure_time', res.data.failure_time)
                        console.log(res)
                        this.account = res.data.account
                        this.token = res.data.token
                        this.failure_time = res.data.failure_time
                        resolve(res)
                    }).catch((error: any) => {
                        reject(error)
                    })
                })
            },
            logout() {
                return new Promise((resolve) => {
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    localStorage.removeItem('failure_time')
                    this.account = ''
                    this.token = ''
                    this.failure_time = ''
                    resolve('')
                })
            },
        },
    },
)

export default useUserStore
