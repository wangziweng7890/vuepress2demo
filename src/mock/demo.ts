export default [
    {
        url: '/mock/demo',
        method: 'post',
        response: (option: any) => {
            return {
                error: '',
                status: 1,
                data: {
                    url: option.url,
                    result: '@string',
                    failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60,
                },
            }
        },
    },
]
