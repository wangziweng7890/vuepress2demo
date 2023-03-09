export default [
    {
        url: '/mock/member/login',
        method: 'post',
        response: (option: any) => {
            return {
                error: '',
                status: 1,
                data: {
                    account: option.body.account,
                    token: '@string',
                    failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60,
                },
            }
        },
    },
]
